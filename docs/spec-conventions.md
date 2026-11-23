# OpenSpec and evidence conventions

Keep the inherited structure:

```text
openspec/specs/<capability>/spec.md
openspec/changes/<change>/proposal.md
openspec/changes/<change>/design.md
openspec/changes/<change>/tasks.md
openspec/changes/<change>/specs/<capability>/spec.md
features/<case>.feature
features/step-definitions/<steps>.js
src/<module>.js
tests/<module>.test.js
```

Current specs describe accepted promises. Proposed deltas use OpenSpec's
`ADDED`, `MODIFIED`, or `REMOVED Requirements` sections. Each requirement has
an explicit behavior (`MUST`/`SHALL`) and at least one concrete scenario.
Use the pinned CLI's strict validation, not a renamed Spec Kit regex linter.

The four imported case deltas preserve **all** source functional requirements
and acceptance scenarios. Original local IDs are namespaced, such as
`001-FR-011` or `004-US5-AS3`, so equal numbers in different cases do not collide.
Additional review examples make requirements without source scenarios concrete;
they are not falsely counted as original source scenarios.

`workshop/source-index.json` records the source revision and original behavior.
`workshop/coverage.json` provides dispositions and evidence. The checker verifies
identity, retained text and file references; it **does not prove test coverage
or the semantic correctness of an automated/partial claim**. People review that.
Changing imported behavior requires an explicit reviewed migration decision,
not quietly deleting an inventory entry.

The bounded `implement-dependent-privacy` change is the 001 learner slice.
It can become a current capability without accepting the full source case.
The full proposed contracts and their deferred responsibilities remain visible.

OpenSpec defines requirements and scope; Gherkin illustrates observable
acceptance behavior; JavaScript and tests provide evidence. Conflicts require
a human decision, not a test edit to match accidental code.

See [the official CLI reference](https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md)
and [Gherkin reference](https://cucumber.io/docs/gherkin/reference/).
