param(
  [string]$InputFile = "data/url-sources.sample.json",
  [string]$CurrentFile = "data/generated/url-metadata.tools.json",
  [string]$PreviousFile = "data/generated/url-metadata.previous.json",
  [string]$ReportFile = "data/generated/url-metadata.review-report.json",
  [switch]$UseExistingReport,
  [switch]$WriteQueue
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$workerDataDir = Join-Path $repoRoot "apps/worker/data/generated"
$currentHostPath = Join-Path $repoRoot ("apps/worker/" + $CurrentFile)
$previousHostPath = Join-Path $repoRoot ("apps/worker/" + $PreviousFile)
$envPath = Join-Path $repoRoot ".env"

function Get-DotEnvValue {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Name
  )

  if (-not (Test-Path -LiteralPath $envPath)) {
    return ""
  }

  $line = Get-Content -LiteralPath $envPath |
    Where-Object { $_ -match "^$([regex]::Escape($Name))=" } |
    Select-Object -First 1

  if (-not $line) {
    return ""
  }

  return ($line -split "=", 2)[1].Trim().Trim('"').Trim("'")
}

function Invoke-CheckedCommand {
  param(
    [Parameter(Mandatory = $true)]
    [scriptblock]$Command
  )

  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "Command failed with exit code $LASTEXITCODE."
  }
}

if ($WriteQueue -and [string]::IsNullOrWhiteSpace((Get-DotEnvValue "STRAPI_API_TOKEN")) -and [string]::IsNullOrWhiteSpace($env:STRAPI_API_TOKEN)) {
  throw "STRAPI_API_TOKEN is required in .env or the current shell when using -WriteQueue."
}

New-Item -ItemType Directory -Force -Path $workerDataDir | Out-Null

Write-Host "[content-review] Building worker image"
Invoke-CheckedCommand { docker compose --profile tools build worker }

if (-not $UseExistingReport) {
  if (Test-Path -LiteralPath $currentHostPath) {
    Write-Host "[content-review] Saving previous collector output"
    Copy-Item -LiteralPath $currentHostPath -Destination $previousHostPath -Force
  } elseif (-not (Test-Path -LiteralPath $previousHostPath)) {
    Write-Host "[content-review] No previous output found; collecting baseline first"
    Invoke-CheckedCommand { docker compose --profile tools run --rm worker npm run collect:url-metadata -- --input $InputFile --output $PreviousFile }
  }

  Write-Host "[content-review] Collecting current metadata"
  Invoke-CheckedCommand { docker compose --profile tools run --rm worker npm run collect:url-metadata -- --input $InputFile --output $CurrentFile }

  Write-Host "[content-review] Validating current metadata output"
  Invoke-CheckedCommand { docker compose --profile tools run --rm worker npm run import:tools -- --file $CurrentFile --dry-run --metadata-only }

  Write-Host "[content-review] Comparing current metadata against previous run"
  Invoke-CheckedCommand { docker compose --profile tools run --rm worker npm run compare:collections -- --previous $PreviousFile --current $CurrentFile --output $ReportFile }
} else {
  Write-Host "[content-review] Using existing report: $ReportFile"
  Write-Host "[content-review] Existing reports may contain stale review priorities. Run without -UseExistingReport after source or comparison rules change."
}

if ($WriteQueue) {
  Write-Host "[content-review] Syncing review queue to CMS"
  Invoke-CheckedCommand { docker compose --profile tools run --rm worker npm run sync:review-queue -- --file $ReportFile --write }
} else {
  Write-Host "[content-review] Dry-run review queue sync"
  Invoke-CheckedCommand { docker compose --profile tools run --rm worker npm run sync:review-queue -- --file $ReportFile --dry-run }
}

Write-Host "[content-review] Done"
