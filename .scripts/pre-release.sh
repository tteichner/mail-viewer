#!/bin/bash
set -e

# stage all changes
git add -A .

# config auto stash
git config pull.rebase true
git config rebase.autoStash true

# pull all changes
git pull

# check for conflict
status=$(git ls-files --unmerged)
if [[ -z "$status" ]] ; then
    # check if changes are there
    out=$(git status --porcelain)
    if [[ ! -z "${out}" ]] ; then
        git commit -m "DO: Automatic commit of changes" .
        if [[ ! $? -eq 0 ]]; then
            echo "ERROR: Commit changes failed"
            exit 2
        fi
    fi
else
    echo "ERROR: Repo is in conflict"
    exit 1
fi
