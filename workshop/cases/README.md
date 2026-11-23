# Case catalog and reference boundaries

Every case retains its source business intent and has a JavaScript reference,
node:test evidence and executable Cucumber.js examples. Only 001 is the main
hands-on build. Begin 004 with the original epic, not its answer.

| Case | Input | OpenSpec change | Executable examples |
| --- | --- | --- | --- |
| 001 | [Claim-status brief](001-member-claim-status/intent-brief.md) | [Proposal](../../openspec/changes/add-member-claim-status/proposal.md) | [Gherkin](../../features/claim-status.feature) |
| 002 | [Dental-rider brief](002-group-dental-rider-setup/intent-brief.md) | [Proposal](../../openspec/changes/add-group-dental-rider-setup/proposal.md) | [Gherkin](../../features/dental-rider.feature) |
| 003 | [Triage brief](003-inbound-document-triage/intent-brief.md) | [Proposal](../../openspec/changes/add-inbound-document-triage/proposal.md) | [Gherkin](../../features/document-triage.feature) |
| 004 | [Original vision epic](004-vision-rider-retro/original-epic.md) | [Proposal / answer](../../openspec/changes/add-vision-rider/proposal.md) | [Gherkin / answer](../../features/vision-retro.feature) |

Each directory's `context.md` preserves clarifications, source scenarios,
outcomes, entities and edge cases for review. It is background, not a second
authority that overrides OpenSpec.

Run the references with `npx cucumber-js --tags @001` (or `@002`, `@003`,
`@004`). `npm test` includes all four plus the inherited eligibility warm-up.

## Follow-on exercise: 002 dental

Read the brief before the answer. Identify which approvals and evidence must
block go-live, then propose examples for missing/duplicate test results and a
changed catalog. Run the existing reference, inspect `src/dental-rider.js`
and `src/rider-readiness.js`, and distinguish a simulated acceptance flag from
an actual administrator response.

## Follow-on exercise: 003 triage

Predict routing at confidence 0.899 and 0.90, and pause behavior at misroute
rates 0.02 and 0.024. Add a reviewed example for a conflicting identifier.
Run the reference and explain why it receives a classification result rather
than calling a model. A returned alert or attachment intent is not delivered
to a real queue or record system.

## Coverage is explicit

[source-index.json](../source-index.json) records 67 requirements, 60 source
acceptance scenarios and 22 success criteria across the four cases.
[coverage.json](../coverage.json) gives each an `automated`, `partial`, or
`deferred` disposition with evidence links or an explanation.

`automated` is limited to the declared in-memory teaching boundary, not a
production certification. `partial` must not be presented as complete.
Success criteria such as reduced call volume require operational baselines
and post-release observation; this workshop does not fabricate those results.
