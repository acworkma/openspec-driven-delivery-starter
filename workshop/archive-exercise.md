# Archive and inspect the living specification

OpenSpec validation checks structure. Archiving applies an approved delta to
the current capability contract and preserves the change as history.
Do this in the **learner sandbox branch**, not the facilitator reference.

1. Obtain product/engineering approval of the agreed behavior and complete
   the implementation and evidence tasks that actually occurred.
2. Review the task list for `implement-dependent-privacy`. Before archive,
   record the already-performed implementation, checks and review as
   complete in that sandbox. The samples intentionally keep real human
   approvals unchecked. Never mark them complete merely to suppress a prompt.
3. Commit or otherwise preserve your working state, then run:

```powershell
npx openspec archive implement-dependent-privacy
```

Read the interactive prompts. Stop if tasks or approvals are incomplete.
Do not use `--yes`, `--skip-specs`, or `--no-validate` to evade readiness.

4. Inspect the new `openspec/specs/member-claim-privacy/spec.md` and the dated
   directory under `openspec/changes/archive/`. The delta should appear in the
   current contract, and proposal/design/task history should still exist.
5. Update the work-item/PR links to the current or archived location as
   appropriate. The broader 001 source contract and coverage inventory remain
   unchanged: they still describe the full future case, not this accepted slice.
6. Run `npm run check` and `npm audit --audit-level=high`, inspect the complete
   diff, and obtain renewed approval if archiving changed an already reviewed
   PR. Merge through the chosen platform's policies, or use a reviewed
   follow-up PR if your team archives after merge.

Do not archive the broader 001 proposal, 002, 003 or 004 merely because they
are present. Their reference implementations do not establish approval for
those changes. Only the reviewed, fully demonstrated privacy slice becomes
the current contract in this exercise.
