# GitHub lab path

Use the same code, OpenSpec changes, npm commands and learning outcomes as
the Azure DevOps path. Only work tracking, PR controls and CI hosting differ.

## Administrator setup before the workshop

1. Provide an empty sandbox repository per team and an eligible reviewer
   other than the participant PR author. Enable Issues and Actions.
2. Push the prepared learner checkpoint as the default branch. The
   `.github/CODEOWNERS` example names `@acworkma`; replace it with actual users
   or visible teams with write access in your sandbox before requiring review.
3. Configure a default-branch ruleset requiring a PR, independent approving
   review, resolved conversations and the **OpenSpec validation** and
   **Tests and dependency audit** checks from `.github/workflows/validate.yml`.
   The former also runs source traceability validation. Run the workflow once
   so check names can be selected.
4. Dismiss stale approvals when reviewed content changes, and restrict bypass
   as appropriate. Confirm these controls are available for the account/plan.
   One CODEOWNERS line does not require each listed role to approve.

See [governance](governance.md) for role-specific review limitations.

## Participant delivery loop

1. Create an issue with **Propose a change**, recording intent, examples,
   non-goals and the `implement-dependent-privacy` change path.
2. Follow [lab 001](../workshop/lab-001.md). Obtain product/engineering agreement
   on the delta, Gherkin and plan before implementing.
3. Push your feature branch to the sandbox. Open a PR using the provided
   template. Link the actual issue, scoped OpenSpec proposal, scenario IDs,
   policy diff and evidence. Use `Closes #<actual-number>` only for a real issue.
4. Confirm both workflow jobs ran on this PR and passed. Ask a non-author
   reviewer to inspect the approved behavior and the diff; a green check is
   not a semantic review.
5. Complete [the archive exercise](../workshop/archive-exercise.md) before
   final review, or in a reviewed follow-up after merge according to your
   chosen policy. Rerun checks and renew approvals if the diff changed.

The workflow uses Node 22, `npm ci`, the pinned OpenSpec CLI, traceability,
node:test, Cucumber.js and `npm audit --audit-level=high`. No cloud coding
agent or MCP integration is required.

If you cannot configure or execute hosted checks/reviews, record them as
outstanding rather than claiming that local checks enforce the branch policy.
