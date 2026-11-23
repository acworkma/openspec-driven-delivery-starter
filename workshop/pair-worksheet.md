# Pair worksheet

Team: ______ Product owner: ______ Developer: ______ Architect/reviewer: ______

**Synthetic data only.** Never paste an actual member record or identifier.

| Intent canvas | Team notes |
| --- | --- |
| Who is affected, what hurts today, and what outcome matters? | |
| What must change, and what is explicitly outside this slice? | |
| Which rules, exceptions and handoffs require a human decision? | |
| What evidence and observations would prove the outcome? | |

## Assumptions, dependencies and test data

Use this section in lab 001 and again for [your first spec](first-spec.md).
Write "unconfirmed" where evidence is missing; an AI draft is not confirmation.

| Question | Team notes / evidence / owner |
| --- | --- |
| What system capability are we assuming exists (a field, an index, a lookup, an API)? Who confirmed it, and how? | |
| Which upstream and downstream systems or teams does this depend on? What happens if one isn't ready? | |
| What does a real, non-happy-path input look like? List at least three edge cases, using fictional examples only. | |
| What synthetic test data would prove each acceptance scenario? Where will it come from? | |
| Is this "good enough" to pass the Ready to build gate? If not, what's missing? | |

| Acceptance scenario ID | Synthetic input and expected result | Data source / owner / availability |
| --- | --- | --- |
| | | |
| | | |
| | | |

Gate decision: ready / not ready ______ Decision owners: ______
Missing confirmation or data / owner / next action: ______

Use the [four human gates](../docs/operating-model.md#four-human-gates).
Unresolved material assumptions remain blockers, not implied approvals.

## Review checkpoints

For your first spec, use the intent and readiness rows; mark lab-only evidence
rows "not in scope". Plain-text Given/When/Then is enough for the candidate.

| Review checkpoint | Decision/evidence |
| --- | --- |
| Product owner and developer can restate the same behavior | |
| OpenSpec current contract and proposed change are distinguished | |
| Age 12/13 and 17/18 boundaries and unknown privacy facts are resolved | |
| No-trace list, total, message and lookup examples are agreed | |
| Design names simulated controls and deferred production obligations | |
| Assumptions, dependencies and test data section is complete; material blockers are resolved or named | |
| Actual product/engineering approval occurred before code changes | |
| Relevant unit and Gherkin checks pass without weakened expectations | |
| Independent PR review and hosted checks occurred, or remain blocked | |
| Archive/current-contract diff was inspected after review | |

**Open question / owner:** ______

**What surfaced earlier than it otherwise would:** ______

Use [the readout](readout-template.md) to distinguish completed evidence from
unfinished hosted or production responsibilities.
