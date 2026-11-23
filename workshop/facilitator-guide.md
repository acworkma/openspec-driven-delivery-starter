# Facilitator guide

## Outcome and boundaries

Each mixed-role pair leaves with a candidate first spec: intent, scope and
at least three Given/When/Then scenarios including edge cases; the completed
worksheet section on assumptions, dependencies and test data; and 1-2 measures
to baseline. A bounded 001 lab demonstrates delivery against agreed behavior.
Use [the agenda](agenda.md) as the fixed 480-minute run of show.
**AI drafts; humans decide.**

Product owners, architects and leaders can finish every non-lab-001 segment
without writing code. The facilitator runs reference commands; participants
can read and discuss examples. Existing Copilot agents, prompts and templates
are welcome. OpenSpec is this repo's example engine for a tool-neutral method.

The root checkout is the **completed reference**. Learners work in a separate
copy with one intentionally missing policy. Rehearse preparation before the
event; do not delete the answer from the facilitator's checkout.

## Roles

| Role | Responsibility |
| --- | --- |
| Product owner | Clarify intent, outcomes, rules, exceptions and non-goals; approve acceptance behavior |
| Developer | Restate behavior, challenge examples, write/inspect lab code and explain evidence |
| Architect | Confirm capabilities/dependencies, review boundaries and identify production gaps |
| Leader | Help name decision owners, unblock cross-team confirmation and choose baseline measures |
| Facilitator | Demonstrate the loop, reveal answers deliberately, enforce timeboxes and data hygiene |
| Peer reviewer | Independently inspect behavior-to-evidence traceability; never rubber-stamp a green build |

For two-person teams, rotate architecture/reviewer responsibilities with a
neighboring pair. A PR author cannot supply their own required approval.

## Before the session

Complete [preflight](prerequisites.md), particularly both hosted platform
paths. Read the [reference notes](reference-notes.md) privately. Have a
preinstalled learner copy and completed reference available; rehearse the
single-policy catch-up in [lab 001](lab-001.md#catch-up-and-move-on).
Do not pre-check human review tasks in the OpenSpec examples.

## Teaching script and timing

### 1. Welcome, goals, and the method in one picture (20 minutes)

Draw intent -> spec with Given/When/Then -> plan -> tasks -> build/evidence ->
review -> maintained contract, with human gates. Ask which artifact each role
owns. Explain [the operating model](../docs/operating-model.md), guardrails and
the distinction between spec readiness, code completion and production readiness.
Teams can use their own agents/prompts at each step. Work items can remain
in Azure Boards whether code is in GitHub or Azure Repos; GitHub Issues is
also supported. Neither AI output nor a checked task is human approval.

### 2. Loop demo on case 003 (35 minutes)

Follow [the case 003 walkthrough](../docs/walkthrough.md), not the 001 lab:
5 minutes intent, 8 proposal/assumptions, 8 Given/When/Then, 6 design/tasks/
evidence and 8 four-gate decisions.

Open [the triage brief](cases/003-inbound-document-triage/intent-brief.md),
then `openspec/changes/add-inbound-document-triage/proposal.md`, the requirement
delta, `features/document-triage.feature`, design and tasks. Ask participants
to predict outcomes, not read JavaScript.

**Stop and ask: missing edge case.** Show the readable-fax happy path, then
blank/unreadable pages. Ask who acts, what is observed and what synthetic
input proves it. Reveal `003-US1-AS2`; explain it is specified, not implemented
by the bounded reference. Do not present a passing routing test as OCR evidence.

**Stop and ask: unconfirmed capability.** "Do member/claim records have the
searchable field, index, lookup or API we assume? Who confirmed it, and how?
What if that dependency or the receiving queue is not ready?"
Fill a sample row in the worksheet's
[Assumptions, dependencies and test data](pair-worksheet.md#assumptions-dependencies-and-test-data)
section. Synthetic match flags do not prove a real lookup exists.

Show the four gates in `docs/operating-model.md`: Ready to build, Plan accepted,
Ready to merge and Contract maintained. An unconfirmed material lookup blocks
the first; existing reference code is not approval for any gate.
Run `npm run test:bdd -- --tags=@003` in the reference and explain its limits.
Demonstrate the archive gate conceptually; do not archive the triage proposal.

### 3. Retro-spec drill, case 004 (40 minutes)

Allow 5 minutes to read only the [original vision epic](cases/004-vision-rider-retro/original-epic.md),
15 to question/draft examples, 10 to compare with the gap log and 10 to discuss
earlier discovery. Follow [the retro drill](retro-spec-drill.md). Ask about
approvers, waiting periods, file-layout dependencies, administrator readiness,
termination and proration before revealing the answer.
The facilitator may run `npm run test:bdd -- --tags=@004`; participants need
not code. Costs are fictional, not measured benefits.

### 4. Break (15 minutes)

### 5. Lab 001, part 1: intent to OpenSpec change (55 minutes)

Use [the participant lab](lab-001.md), steps 1-2. Allow 10 minutes for the
prepared learner checkpoint, 20 for intent/clarification and 25 for reviewing
the bounded proposal and delta. The product owner explains "no trace"; the
developer restates the difference between ages 12 and 13.

Select dependent privacy, not the entire claims portal. Walk the worksheet's
intent canvas and **Assumptions, dependencies and test data** section. Ask
which privacy fields/lookups are confirmed, which teams supply them, what
not-ready means and which synthetic input proves each scenario. Record actual
decisions and owners. Age rules are fictional Contoso policy, not legal advice.

### 6. Lunch (60 minutes)

### 7. Lab 001, part 2: design, Given/When/Then and tasks (45 minutes)

Use step 3: 20 minutes examples, 15 design/task-to-evidence mapping and
10 readiness/plan review. Complete the worksheet's **Assumptions, dependencies
and test data** section, including at least three edge cases and data for every
acceptance scenario. Apply Ready to build and Plan accepted with named humans.

Ask why filtering precedes totals. UI, EOB, logs, network timing and enterprise
identity are not implemented controls. Run learner checks to show the expected
missing-policy failure. Use [the prompt cards](prompts.md), without letting
the agent weaken an expectation. Missing material facts remain blockers.

### 8. Lab 001, part 3: implement with Copilot (60 minutes)

Use step 4: 10 minutes to restate the approved plan, 30 to implement and
inspect the policy, 20 for targeted/full checks and catch-up. Keep all lab
rules, features and tests unchanged.

At minute 40, offer [reference-policy catch-up](lab-001.md#catch-up-and-move-on):
preserve the attempt, copy only `src/claim-visibility.js` from the main
reference tree into that pair's learner copy, inspect it and rerun checks.
Do not restore from the learner's `main` branch, which contains the stub.
Record reference-assisted catch-up, not independent completion. Move on;
do not borrow time from the first-spec exercise.

### 9. Break (15 minutes)

### 10. CI, PR review and archive, combined (35 minutes)

Use lab steps 5-6: 10 minutes hosted checks, 15 independent PR review and
10 archive/current-contract inspection. Use the [GitHub](../docs/path-github.md)
or [Azure DevOps](../docs/path-azure-devops.md) path with the same evidence and
human gates. Keep source platform instructions and required policies intact.

Follow [the archive exercise](archive-exercise.md) only after actual approval
and review of the bounded 001 slice. Inspect the diff, rerun checks and renew
review if needed. If hosted runs or approvals are still pending, name them
as incomplete; show the archive concept rather than bypassing a gate.
Capture lab evidence separately in [the readout](readout-template.md).

### 11. Your first spec, pairs (70 minutes)

Use [first-spec.md](first-spec.md): choose A record identification, B inbound
document intake or a safely fictionalized non-PHI problem. No code, CLI or PR
is required. Product owners can run the included draft/challenge prompts or
their own agents/templates; work manually if Copilot is unavailable.

Keep its timeboxes: 10 minutes intent/scope, 20 scenarios, 20 worksheet,
10 neighboring-pair pressure test and 10 measures/readout preparation.
Walk the **Assumptions, dependencies and test data** section explicitly:
who confirmed each capability and how, upstream/downstream ownership and
not-ready behavior, at least three edge cases, synthetic data per scenario,
and the reasoned Ready to build decision.

Challenge assumed uniqueness and assumed search/indexing. Ask who supplies
synthetic collisions or unreadable/incomplete/misrouted/duplicate documents.
An unresolved blocker is a valid finding, not a reason to fabricate approval.
Help pairs select 1-2 [measures](../docs/measures.md) with collection owners,
sources and baseline periods; no improved-result claims today.

### 12. Readouts and next steps (30 minutes)

Use [the readout template](readout-template.md) to show the candidate outline
and scenarios, completed **Assumptions, dependencies and test data** section,
and 1-2 baseline plans. Allocate 20 minutes across pairs (short neighboring-pair
readouts if the room is large), 5 for shared gaps and 5 for next-week actions.
Keep lab evidence and incomplete hosted steps separate from first-spec outputs.

End with **what we'll take to Azure Boards / our repo next week**: owner,
bounded work item/spec location, first capability confirmation or review,
and date. Case 002 remains [optional self-study](cases/README.md#optional-self-study-002-dental);
there is no separate 002/003 comparison block.

## Recovery without pretending success

If Copilot stalls, reason and write manually. If dependencies are preinstalled,
reference tests need no live model service. Use the single-policy catch-up
rather than destructive resets or overwriting another team's work.

If CI/reviewer access fails or checks exceed the timebox, record the remaining
step and owner; local green tests do not replace hosted review. Never bypass
approval or archive incomplete work to stay on schedule. Protect the first-spec
and closing blocks. Unresolved policy decisions remain named blockers.
