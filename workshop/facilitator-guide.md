# Facilitator guide

## Outcome and boundaries

Each mixed-role team leaves with a scoped 001 change, reviewed requirements
and examples, a JavaScript implementation, test evidence and a peer-reviewed
PR. Explain all four cases, but do not attempt four builds during the day.
Use [the agenda](agenda.md) as the fixed run of show.

The root checkout is the **completed reference**. Learners work in a separate
copy with one intentionally missing policy. Rehearse preparation before the
event; do not delete the answer from the facilitator's checkout.

## Roles

| Role | Responsibility |
| --- | --- |
| Product owner | Clarify intent, outcomes, age bands, exceptions and non-goals; approve acceptance behavior |
| Developer | Restate the behavior, write/inspect code, run evidence, explain failures |
| Architect | Review boundaries, fail-closed behavior, simulations and deferred production responsibilities |
| Facilitator | Demonstrate the loop, reveal answers deliberately, enforce scope and data hygiene |
| Peer reviewer | Independently inspect behavior-to-evidence traceability; never rubber-stamp a green build |

For two-person teams, rotate the architecture/reviewer role with a neighboring
pair. Do not claim that a PR author can supply their own required approval.

## Before the session

Complete [preflight](prerequisites.md), particularly both hosted platform
paths. Read the [reference notes](reference-notes.md) privately. Have a
preinstalled learner copy and the completed root reference available.
Do not pre-check the human review tasks in the OpenSpec examples.

## Teaching script

### Welcome and complete-loop demonstration

Explain the five artifacts: intent/work item, OpenSpec requirement, proposed
delta, Gherkin example and implementation evidence. Show the small inherited
[eligibility walkthrough](../docs/walkthrough.md) before the richer cases.
Run `npm run check`. Ask: "What does this prove, and what does it not prove?"
Show that the current contract and proposed changes are different directories.

Explain that Copilot drafts and implements; people decide requirements,
trade-offs and readiness. Neither a checked task nor AI output is approval.

### 004 Retrospective

Open only the [original vision epic](cases/004-vision-rider-retro/original-epic.md).
Follow [the retro drill](retro-spec-drill.md): ask about approvers, waiting
periods, administrator readiness, termination and proration before revealing
the [gap log](cases/004-vision-rider-retro/gap-log.md).
Then run `npx cucumber-js --tags @004` in the reference. The code makes
selected clarified rules executable; it does not recreate a production rider.

### 001 Intent and OpenSpec lab

Use [the participant lab](lab-001.md). Ask the product owner to explain "no
trace" without implementation terminology. Have the developer restate the
observable difference between a 12-year-old and a 13-year-old.

Review the proposal and delta as drafts. Select the dependent-privacy slice,
not the entire claims portal. Use the worksheet to resolve boundary cases and
record actual human decisions. State that the age rules are fictional Contoso
policy, not legal advice.

### Design, examples and build

Review Gherkin with all roles. Ask the architect why filtering must precede
counts and totals. Agree what the sample does not expose: UI, EOB, logs, network
timing and enterprise identity are not implemented controls.

Run learner checks and show the expected explicit missing-policy failure.
Use [the prompt cards](prompts.md) for a plan and one bounded implementation.
Do not allow the agent to edit a failing scenario merely to obtain green.
Unit tests include additional boundaries beyond the Gherkin examples.

### CI, review, archive and readout

Split by [GitHub](../docs/path-github.md) or
[Azure DevOps](../docs/path-azure-devops.md). Require actual reviewers and
policies where available. Run a harmless failing check in the sandbox if
needed to demonstrate blocking; restore the agreed behavior afterward.

Use [the archive exercise](archive-exercise.md) only after actual review.
Inspect the diff and rerun checks. Do not archive all unrelated sample changes.
Collect [readouts](readout-template.md), including anything still incomplete.

### Compare 002 and 003; close

Run `npx cucumber-js --tags "@002 or @003"` in the reference.
Ask which rule is a handoff, which requires evidence, and which belongs to a
human rather than an AI. Pick an owner and a real follow-on case using the
[operating model](../docs/operating-model.md) and [measures](../docs/measures.md).

## Recovery without pretending success

If generation stalls, use the written prompt and reason manually. If Copilot
is unavailable, participants can edit the small policy by hand. If dependencies
were preinstalled, tests need no live model service. If the team gets stuck,
use a fresh learner directory, replay completed steps, or inspect the reference
with the facilitator; never overwrite another team's work.

If hosted CI or reviewer access fails, finish local work and record the
remaining hosted step. Unresolved policy decisions remain named blockers,
not guessed requirements or approvals.

## Facilitator presentation outline

1. Why intent and shared examples come before implementation.
2. The OpenSpec current/proposed/archive model.
3. Roles, authority and "AI drafts; humans decide."
4. The incomplete vision epic and what it hides.
5. Claim privacy as observable behavior rather than a UI filter.
6. Gherkin, technical boundaries and implementation planning.
7. JavaScript build evidence and what green checks cannot prove.
8. GitHub/Azure DevOps review controls.
9. Archive, living specifications and next-sprint adoption.
