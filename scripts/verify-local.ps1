param(
  [string]$WebUrl = "http://localhost:3000",
  [string]$CmsUrl = "http://localhost:1337"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$failures = 0

function Convert-ResponseContentToText {
  param($Content)

  if ($Content -is [byte[]]) {
    return [System.Text.Encoding]::UTF8.GetString($Content)
  }

  return [string]$Content
}

function Test-Url {
  param(
    [string]$Name,
    [string]$Url,
    [string]$ExpectedText = "",
    [string]$ExpectedContentType = ""
  )

  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 20
    $content = Convert-ResponseContentToText $response.Content
    $contentType = [string]$response.Headers["Content-Type"]

    if ($response.StatusCode -lt 200 -or $response.StatusCode -ge 400) {
      throw "Unexpected status $($response.StatusCode)"
    }

    if ($ExpectedText -and -not $content.Contains($ExpectedText)) {
      throw "Expected text not found: $ExpectedText"
    }

    if ($ExpectedContentType -and -not $contentType.Contains($ExpectedContentType)) {
      throw "Expected content type not found: $ExpectedContentType"
    }

    Write-Host "[ok] $Name -> $Url"
  } catch {
    $script:failures += 1
    Write-Host "[fail] $Name -> $Url"
    Write-Host "       $($_.Exception.Message)"
  }
}

function Test-Canonical {
  param(
    [string]$Path,
    [string]$ExpectedUrl
  )

  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri "$WebUrl$Path" -TimeoutSec 20
    $content = Convert-ResponseContentToText $response.Content

    if (-not ($content.Contains('rel="canonical"') -or $content.Contains('rel=""canonical""'))) {
      throw "Canonical tag not found"
    }

    if (-not $content.Contains($ExpectedUrl)) {
      throw "Expected canonical URL not found: $ExpectedUrl"
    }

    Write-Host "[ok] Canonical $Path -> $ExpectedUrl"
  } catch {
    $script:failures += 1
    Write-Host "[fail] Canonical $Path -> $ExpectedUrl"
    Write-Host "       $($_.Exception.Message)"
  }
}

Write-Host "[verify-local] Checking Docker services"
docker compose ps

Write-Host "[verify-local] Checking website endpoints"
Test-Url -Name "Homepage" -Url $WebUrl -ExpectedText "Commerce Toolbase"
Test-Url -Name "Categories" -Url "$WebUrl/categories" -ExpectedText "Categories"
Test-Url -Name "Best lists" -Url "$WebUrl/best" -ExpectedText "Best"
Test-Url -Name "Comparisons" -Url "$WebUrl/compare" -ExpectedText "Compare"
Test-Url -Name "Alternatives" -Url "$WebUrl/alternatives" -ExpectedText "Alternatives"
Test-Url -Name "Methodology" -Url "$WebUrl/methodology" -ExpectedText "How Commerce Toolbase scores"
Test-Url -Name "Sitemap" -Url "$WebUrl/sitemap.xml" -ExpectedText "<urlset" -ExpectedContentType "xml"
Test-Url -Name "Robots" -Url "$WebUrl/robots.txt" -ExpectedText "Sitemap"
Test-Url -Name "RSS feed" -Url "$WebUrl/feed.xml" -ExpectedText "<rss" -ExpectedContentType "rss+xml"
Test-Url -Name "Manifest" -Url "$WebUrl/manifest.webmanifest" -ExpectedText "Commerce Toolbase"
Test-Url -Name "Icon" -Url "$WebUrl/icon" -ExpectedContentType "image/png"
Test-Url -Name "Apple icon" -Url "$WebUrl/apple-icon" -ExpectedContentType "image/png"
Test-Url -Name "Open Graph image" -Url "$WebUrl/opengraph-image" -ExpectedContentType "image/png"
Test-Url -Name "Twitter image" -Url "$WebUrl/twitter-image" -ExpectedContentType "image/png"

Write-Host "[verify-local] Checking canonical URLs"
Test-Canonical -Path "/" -ExpectedUrl $WebUrl
Test-Canonical -Path "/tools/klaviyo" -ExpectedUrl "$WebUrl/tools/klaviyo"
Test-Canonical -Path "/categories/email-marketing-tools" -ExpectedUrl "$WebUrl/categories/email-marketing-tools"
Test-Canonical -Path "/best/best-email-marketing-tools-for-ecommerce" -ExpectedUrl "$WebUrl/best/best-email-marketing-tools-for-ecommerce"
Test-Canonical -Path "/compare/klaviyo-vs-omnisend" -ExpectedUrl "$WebUrl/compare/klaviyo-vs-omnisend"
Test-Canonical -Path "/alternatives/klaviyo-alternatives" -ExpectedUrl "$WebUrl/alternatives/klaviyo-alternatives"
Test-Canonical -Path "/methodology" -ExpectedUrl "$WebUrl/methodology"

Write-Host "[verify-local] Checking CMS endpoint"
Test-Url -Name "CMS admin" -Url "$CmsUrl/admin" -ExpectedText "Strapi"

if ($failures -gt 0) {
  Write-Host "[verify-local] Failed checks: $failures"
  exit 1
}

Write-Host "[verify-local] All checks passed"
