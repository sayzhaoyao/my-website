param(
  [string]$OutputDir = "backups"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$backupRoot = Join-Path $repoRoot $OutputDir

New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupPath = Join-Path $backupRoot "postgres-$timestamp.sql"

Write-Host "[backup-postgres] Creating PostgreSQL dump"
Write-Host "[backup-postgres] Output: $backupPath"

$dump = docker compose exec -T postgres sh -c 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --no-owner --no-acl --clean --if-exists'

if (-not $dump) {
  throw "pg_dump returned empty output."
}

[System.IO.File]::WriteAllText($backupPath, ($dump -join [Environment]::NewLine), [System.Text.Encoding]::UTF8)

Write-Host "[backup-postgres] Backup complete"
