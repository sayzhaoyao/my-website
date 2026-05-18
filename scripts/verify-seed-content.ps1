Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$seedPath = Join-Path $repoRoot "apps/cms/src/bootstrap/seed.js"
$utf8 = [System.Text.Encoding]::UTF8
$failures = 0

function Add-Failure {
  param(
    [string]$Name,
    [string]$Message
  )

  $script:failures += 1
  Write-Host "[fail] $Name"
  Write-Host "       $Message"
}

Write-Host "[verify-seed-content] Checking tool seed review fields"

$content = [System.IO.File]::ReadAllText($seedPath, $utf8)
$toolsMatch = [System.Text.RegularExpressions.Regex]::Match(
  $content,
  "const tools = \[([\s\S]*?)\];\s*\r?\n\r?\nconst bestLists"
)

if (-not $toolsMatch.Success) {
  Add-Failure -Name "tools" -Message "Unable to locate tools seed array."
} else {
  $toolsBlock = $toolsMatch.Groups[1].Value
  $toolEntries = [System.Text.RegularExpressions.Regex]::Matches($toolsBlock, "\{[\s\S]*?\n  \},")
  $requiredFields = @(
    "longDescription",
    "affiliateDisclosure",
    "sourceUrls",
    "seoTitle",
    "seoDescription"
  )

  foreach ($entryMatch in $toolEntries) {
    $entry = $entryMatch.Value
    $nameMatch = [System.Text.RegularExpressions.Regex]::Match($entry, 'name: "([^"]+)"')
    $name = if ($nameMatch.Success) { $nameMatch.Groups[1].Value } else { "unknown tool" }

    foreach ($field in $requiredFields) {
      if (-not $entry.Contains("${field}:")) {
        Add-Failure -Name $name -Message "Missing required seed field: $field."
      }
    }
  }

  Write-Host "[verify-seed-content] Checked $($toolEntries.Count) tool seed record(s)"
}

if ($failures -gt 0) {
  Write-Host "[verify-seed-content] Failed checks: $failures"
  exit 1
}

Write-Host "[verify-seed-content] All seed content checks passed"
