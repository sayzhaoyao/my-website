Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "[verify-worker] Building worker image"
docker compose --profile tools build worker

Write-Host "[verify-worker] Validating URL source sample"
docker compose --profile tools run --rm worker npm run validate:url-sources -- --file data/url-sources.sample.json

Write-Host "[verify-worker] Running tool import dry-run"
docker compose --profile tools run --rm worker npm run import:tools -- --file data/tools.sample.json --dry-run

Write-Host "[verify-worker] Worker checks passed"
