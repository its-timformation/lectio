#!/bin/bash
set -e

MSG="${1:-Update}"

git add -A
git commit -m "$MSG"
git push

echo "Deployed."
