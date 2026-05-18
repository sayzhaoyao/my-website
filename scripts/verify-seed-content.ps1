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

function Get-SeedArrayEntries {
  param(
    [string]$Content,
    [string]$ArrayName,
    [string]$NextPattern
  )

  $pattern = "const $ArrayName = \[([\s\S]*?)\];\s*\r?\n\r?\n$NextPattern"
  $match = [System.Text.RegularExpressions.Regex]::Match($Content, $pattern)

  if (-not $match.Success) {
    Add-Failure -Name $ArrayName -Message "Unable to locate $ArrayName seed array."
    return @()
  }

  return @([System.Text.RegularExpressions.Regex]::Matches($match.Groups[1].Value, "\{[\s\S]*?\n  \},"))
}

function Get-SeedEntryName {
  param([string]$Entry)

  $titleMatch = [System.Text.RegularExpressions.Regex]::Match($Entry, 'title: "([^"]+)"')
  if ($titleMatch.Success) {
    return $titleMatch.Groups[1].Value
  }

  $nameMatch = [System.Text.RegularExpressions.Regex]::Match($Entry, 'name: "([^"]+)"')
  if ($nameMatch.Success) {
    return $nameMatch.Groups[1].Value
  }

  return "unknown seed record"
}

function Test-RequiredFields {
  param(
    [string]$Type,
    [object[]]$Entries,
    [string[]]$RequiredFields
  )

  foreach ($entryMatch in $Entries) {
    $entry = $entryMatch.Value
    $name = Get-SeedEntryName $entry

    foreach ($field in $RequiredFields) {
      if (-not $entry.Contains("${field}:")) {
        Add-Failure -Name "${Type}: $name" -Message "Missing required seed field: $field."
      }
    }
  }

  Write-Host "[verify-seed-content] Checked $(@($Entries).Count) $Type seed record(s)"
}

Write-Host "[verify-seed-content] Checking tool seed review fields"

$content = [System.IO.File]::ReadAllText($seedPath, $utf8)
$toolEntries = Get-SeedArrayEntries -Content $content -ArrayName "tools" -NextPattern "const bestLists"
Test-RequiredFields -Type "tool" -Entries $toolEntries -RequiredFields @(
  "longDescription",
  "affiliateDisclosure",
  "sourceUrls",
  "seoTitle",
  "seoDescription"
)

Write-Host "[verify-seed-content] Checking decision page seed fields"

$bestListEntries = Get-SeedArrayEntries -Content $content -ArrayName "bestLists" -NextPattern "const comparisons"
Test-RequiredFields -Type "best list" -Entries $bestListEntries -RequiredFields @(
  "intro",
  "selectionCriteria",
  "verdict",
  "seoTitle",
  "seoDescription"
)

$comparisonEntries = Get-SeedArrayEntries -Content $content -ArrayName "comparisons" -NextPattern "const alternatives"
Test-RequiredFields -Type "comparison" -Entries $comparisonEntries -RequiredFields @(
  "summary",
  "recommendation",
  "featureNotes",
  "pricingNotes",
  "verdict",
  "seoTitle",
  "seoDescription"
)

$alternativeEntries = Get-SeedArrayEntries -Content $content -ArrayName "alternatives" -NextPattern "async function findFirst"
Test-RequiredFields -Type "alternative" -Entries $alternativeEntries -RequiredFields @(
  "intro",
  "whyLookForAlternatives",
  "selectionCriteria",
  "verdict",
  "seoTitle",
  "seoDescription"
)

if ($failures -gt 0) {
  Write-Host "[verify-seed-content] Failed checks: $failures"
  exit 1
}

Write-Host "[verify-seed-content] All seed content checks passed"
