Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$schemaRoot = Join-Path $repoRoot "apps/cms/src/api"
$utf8 = [System.Text.Encoding]::UTF8
$failures = 0

function Convert-UnicodeEscape {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Value
  )

  return [System.Text.RegularExpressions.Regex]::Unescape($Value)
}

$expectedDisplayNames = @{
  "alternative" = Convert-UnicodeEscape "\u66ff\u4ee3\u54c1\u9875\u9762"
  "best-list" = Convert-UnicodeEscape "\u6700\u4f73\u5de5\u5177\u699c\u5355"
  "category" = Convert-UnicodeEscape "\u5206\u7c7b"
  "comparison" = Convert-UnicodeEscape "\u5de5\u5177\u5bf9\u6bd4"
  "import-log" = Convert-UnicodeEscape "\u5bfc\u5165\u65e5\u5fd7"
  "review-queue" = Convert-UnicodeEscape "\u5ba1\u6838\u961f\u5217"
  "source" = Convert-UnicodeEscape "\u6765\u6e90"
  "tool" = Convert-UnicodeEscape "\u5de5\u5177"
}

$expectedDescriptions = @{
  "alternative" = Convert-UnicodeEscape "\u56f4\u7ed5\u67d0\u4e2a\u5de5\u5177\u7684 alternatives \u641c\u7d22\u610f\u56fe\u9875\u9762\u3002"
  "best-list" = Convert-UnicodeEscape "\u9762\u5411\u641c\u7d22\u610f\u56fe\u7684 Best Tools \u699c\u5355\u9875\u9762\u3002"
  "category" = Convert-UnicodeEscape "\u6309\u4f7f\u7528\u573a\u666f\u7ec4\u7ec7\u5de5\u5177\u7684 SEO \u5206\u7c7b\u3002"
  "comparison" = Convert-UnicodeEscape "\u4e24\u4e2a\u5de5\u5177\u4e4b\u95f4\u7684\u51b3\u7b56\u5bf9\u6bd4\u9875\u9762\u3002"
  "import-log" = Convert-UnicodeEscape "\u91c7\u96c6\u3001\u5bfc\u5165\u548c\u66f4\u65b0\u4efb\u52a1\u7684\u8fd0\u884c\u65e5\u5fd7\u3002"
  "review-queue" = Convert-UnicodeEscape "\u7528\u4e8e\u4eba\u5de5\u5ba1\u6838\u81ea\u52a8\u91c7\u96c6\u5185\u5bb9\u53d8\u66f4\u7684\u5185\u90e8\u961f\u5217\u3002"
  "source" = Convert-UnicodeEscape "\u7528\u4e8e\u91c7\u96c6\u3001\u5bfc\u5165\u548c\u4eba\u5de5\u6838\u9a8c\u7684\u6570\u636e\u6765\u6e90\u3002"
  "tool" = Convert-UnicodeEscape "\u76ee\u5f55\u4e2d\u6536\u5f55\u7684\u8f6f\u4ef6\u6216 AI \u5de5\u5177\u3002"
}

function Add-Failure {
  param(
    [string]$Path,
    [string]$Message
  )

  $script:failures += 1
  Write-Host "[fail] $Path"
  Write-Host "       $Message"
}

Write-Host "[verify-cms-schemas] Checking Strapi schema JSON files"

$schemaFiles = Get-ChildItem -Path $schemaRoot -Recurse -Filter schema.json

foreach ($file in $schemaFiles) {
  $relativePath = Resolve-Path -Relative $file.FullName

  try {
    $content = [System.IO.File]::ReadAllText($file.FullName, $utf8)
    $schema = $content | ConvertFrom-Json
  } catch {
    Add-Failure -Path $relativePath -Message $_.Exception.Message
    continue
  }

  if (-not $schema.info.singularName) {
    Add-Failure -Path $relativePath -Message "Missing info.singularName."
    continue
  }

  $singularName = [string]$schema.info.singularName
  if ($expectedDisplayNames.ContainsKey($singularName)) {
    $expectedDisplayName = $expectedDisplayNames[$singularName]
    $actualDisplayName = [string]$schema.info.displayName

    if ($actualDisplayName -ne $expectedDisplayName) {
      Add-Failure -Path $relativePath -Message "Expected displayName '$expectedDisplayName', got '$actualDisplayName'."
    }
  }

  if ($expectedDescriptions.ContainsKey($singularName)) {
    $expectedDescription = $expectedDescriptions[$singularName]
    $actualDescription = [string]$schema.info.description

    if ($actualDescription -ne $expectedDescription) {
      Add-Failure -Path $relativePath -Message "Expected description '$expectedDescription', got '$actualDescription'."
    }
  } elseif (-not $schema.info.description) {
      Add-Failure -Path $relativePath -Message "Missing info.description."
  }
}

if ($failures -gt 0) {
  Write-Host "[verify-cms-schemas] Failed checks: $failures"
  exit 1
}

Write-Host "[verify-cms-schemas] All schema checks passed"
