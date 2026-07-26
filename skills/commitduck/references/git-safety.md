# Git safety

Apply these rules before any Git mutation.

## Scope

- Resolve the repository root and current branch.
- Inspect staged, unstaged, untracked, renamed, and deleted files.
- Preserve unrelated user changes and existing staging intent.
- Stop for unresolved conflicts or an in-progress merge/rebase unless the user
  explicitly asks to resolve that operation.
- Do not use destructive reset, checkout, restore, clean, or history-rewrite
  commands to make the worktree convenient.

## Staging

- Prefer explicit paths belonging to the confirmed change.
- Include required documentation with the implementation it describes.
- Include generated artifacts only when repository policy requires them.
- Use `git add -A` only when the whole worktree is one confirmed scope.
- Inspect the full staged diff before committing.

## Commit authorization

An explicit request to commit a clearly scoped change authorizes one local
commit. It does not authorize:

- amend;
- rebase;
- force-push;
- tag or release creation;
- pull request creation;
- merge;
- deleting branches;
- changing credentials or remotes.

Do not use `--no-verify` unless the user explicitly requests bypassing hooks and
understands the failed check.

## Remote actions

- Treat push as separate from commit.
- Push only the confirmed current branch.
- Avoid pushing directly to default/protected branches unless explicitly
  requested.
- Never force-push.
- Verify the remote and branch before pushing.
- Use provider-specific tools only when authenticated and requested.
- Confirm the returned remote URL, branch, PR, or merge state before reporting
  success.

## Completion

After a commit, verify:

```bash
git status --short
git log -1 --oneline
```

Report the commit SHA, message, included scope, excluded changes, validation,
and any separately authorized remote result.
