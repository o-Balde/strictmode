#!/usr/bin/env bash
# Keeps `npm run enrich` going for days.
#
# - Restarts the enricher whenever it dies (crash, OOM, killed) after 60 s;
#   each start skips whatever the bank already shows as enriched.
# - Stops for good once a run exits cleanly: the queue is empty, or you
#   pressed Ctrl+C (once = finish the current question, twice = now) —
#   or on a configuration error such as a model that is not pulled (exit 2).
# - Keeps the Mac awake for as long as this script lives.
# - Appends everything to scratch/ollama-enrich/run.log.
#
# Usage: npm run enrich:forever [-- <enrich flags>]
#   or detached: nohup npm run enrich:forever > /dev/null 2>&1 &
set -u
cd "$(dirname "$0")/.."
mkdir -p scratch/ollama-enrich
LOG=scratch/ollama-enrich/run.log

caffeinate -i -w $$ &

while true; do
  echo "[supervisor] start $(date '+%F %T')" | tee -a "$LOG"
  # node directly, not npx tsx: a wrapper would relay Ctrl+C a second time.
  # tee -i so Ctrl+C cannot kill the pipe out from under the enricher.
  node --import tsx scripts/ollama-enrich.ts "$@" 2>&1 | tee -i -a "$LOG"
  code=${PIPESTATUS[0]}
  if [ "$code" -eq 0 ]; then
    echo "[supervisor] enricher exited cleanly $(date '+%F %T')" | tee -a "$LOG"
    break
  fi
  if [ "$code" -eq 2 ]; then
    echo "[supervisor] configuration error (see above); not restarting" | tee -a "$LOG"
    break
  fi
  echo "[supervisor] enricher died with exit $code at $(date '+%F %T'); restarting in 60s" | tee -a "$LOG"
  sleep 60
done
