# Walkthrough: case 003, inbound document triage

Use this **35-minute opening loop demo** in agenda segment 2. Participants read
and challenge behavior; only the facilitator runs commands. No participant
coding is required. The supplied artifacts are examples, not evidence that
business approval or a hosted PR already exists. **AI drafts; humans decide.**

## 1. Intent brief: what result matters? (5 minutes)

Open the [case 003 intent brief](../workshop/cases/003-inbound-document-triage/intent-brief.md).
Contoso wants inbound documents in the right queue quickly, attached only
when certain, with people handling uncertainty. Read its happy path before
opening the clarified requirements. A work item can live in Azure Boards or
GitHub Issues; it explains intent but cannot override an approved contract.

**Stop and ask:** "The readable fax matched a record. What if its pages are
blank or unreadable?" Have the room name the observable outcome, the human
owner and synthetic input that would prove it. The happy path did not specify
that outcome. Reveal `003-US1-AS2` in the
[requirement delta](../openspec/changes/add-inbound-document-triage/specs/inbound-document-triage/spec.md):
human review marked "unreadable". This requirement is preserved but not
implemented in the bounded reference; green tests do not prove OCR behavior.

## 2. OpenSpec proposal: what is proposed, not assumed? (8 minutes)

Read the [proposal](../openspec/changes/add-inbound-document-triage/proposal.md)
and requirement delta. Separate the broader business contract from the
teaching implementation's scope. Current accepted contracts belong under
`openspec/specs/`; this proposed triage capability belongs under
`openspec/changes/add-inbound-document-triage/`.

**Stop and ask:** "We assume member and claim records are searchable. Does
the field, index, lookup or API actually exist? Who confirmed it, and how?
What if the upstream lookup or downstream queue is not ready?"
Record unconfirmed capabilities, dependency owners and not-ready behavior in
the [worksheet's assumptions, dependencies and test data section](../workshop/pair-worksheet.md#assumptions-dependencies-and-test-data).
The reference receives synthetic exact-match flags; it does not implement a
record search. Do not treat those flags or a Copilot answer as confirmation.

Show how your own product-owner agent or prompt could draft the proposal and
challenge assumptions. OpenSpec is the example engine, not the method itself;
see [tool-neutral adoption](operating-model.md#use-the-concepts-bring-your-own-tooling).

## 3. Given/When/Then: what would we observe? (8 minutes)

Open [features/document-triage.feature](../features/document-triage.feature).
`Given` supplies concrete facts, `When` an action, `Then` an observable result.
Ask the room to predict the result before revealing each existing example.

| Existing example | Requirement | Evidence boundary |
| --- | --- | --- |
| Confidence 0.96, 0.90 and 0.72 | `003-FR-004`, `003-US1-AS1` | At/above 0.90 routes to claim-form; lower confidence goes to human review |
| Conflicting identifiers | `003-FR-009`, `003-US2-AS3` | Privacy hold, unattached; a flag does not prove trained-reviewer authorization |
| Weekly misroutes at 2.4% | `003-FR-006`, `003-US5-AS2` | Returns a pause; does not persist it or deliver an alert |
| Expedited weekend appeal | `003-FR-014`, `003-US4-AS3` | Retains receipt time; does not deliver an on-call notification |

Use [coverage](../workshop/coverage.json) to distinguish automated, partial
and deferred behavior. Map each scenario to a synthetic input and expected
result. Do not add/change feature files during this demo; record new questions
for human review if they would change a requirement.

## 4. Design and tasks: what work and evidence are needed? (6 minutes)

Read the [design](../openspec/changes/add-inbound-document-triage/design.md)
and [tasks](../openspec/changes/add-inbound-document-triage/tasks.md). Map a
scenario to [the module](../src/document-triage.js) and
[unit evidence](../tests/document-triage.test.js), without asking the room to
write JavaScript. An architect/developer agent can propose the task/evidence
map after humans settle behavior. It cannot confirm dependencies or approve.

In the completed reference, the facilitator runs:

```powershell
npm run test:bdd -- --tags=@003
```

Ask: "Which missing assumption or production obligation could still stop us?"
Unchecked approval, participant evidence and archive tasks stay unchecked.

## 5. Walk the four human gates (8 minutes)

Open [the operating model](operating-model.md#four-human-gates) and apply each
gate to the same triage example:

| Gate | Decision to demonstrate |
| --- | --- |
| Ready to build | Do intent and scenarios agree? Are matching/queue capabilities confirmed, material questions answered and synthetic data planned? An unconfirmed lookup blocks this gate. |
| Plan accepted | Are tasks bounded and mapped to evidence? Are OCR, persistence, authorization and delivery dependencies explicit? |
| Ready to merge | Do applicable checks pass and did independent humans inspect meaning? Green reference tests are not approval of a participant change. |
| Contract maintained | After acceptance, inspect the current-spec/archive diff and retain history. Do not archive this unapproved reference proposal. |

Show the equivalent work-item/PR evidence in either the
[Azure DevOps path](path-azure-devops.md) or [GitHub path](path-github.md).
Boards remains a work-tracking option when code is in GitHub as well as Azure
Repos; link the item, spec, scenario IDs, tasks and evidence.

The archive action is performed later only for the approved bounded 001
learner slice in [segment 10](../workshop/archive-exercise.md). This demo
explains that gate; it does not claim triage is approved or production-ready.

## Continue the day

Use the [004 retro drill](../workshop/retro-spec-drill.md), then
[lab 001](../workshop/lab-001.md): 55 minutes intent, 45 design/examples/tasks,
60 implementation and a combined 35-minute CI/review/archive block.
Protect the 70-minute [first-spec exercise](../workshop/first-spec.md) and
30-minute [readouts](../workshop/readout-template.md). The
[agenda](../workshop/agenda.md) totals 480 minutes; case 002 is optional self-study.
