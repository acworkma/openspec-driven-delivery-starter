# OpenSpec-driven delivery: a full-day workshop

Write a first spec, pressure-test its assumptions, and agree when it is ready
to build. Practice the delivery loop with fictional health-plan cases.
**AI drafts; humans decide.**

**Audience:** product owners, architects, developers and leaders working together.
**Format:** one on-site day, 480 minutes including lunch and breaks.
**Outcome:** each pair leaves with a candidate spec outline, at least three
Given/When/Then scenarios including edge cases, assumptions/dependencies/test
data, and 1-2 measures to baseline. A bounded 001 lab demonstrates how approved
behavior reaches code, evidence, review and archive. No coding is required
outside lab 001. Both GitHub and Azure DevOps are first-class paths.

## Start here

- [Agenda](workshop/agenda.md) and [facilitator guide](workshop/facilitator-guide.md).
- [Prerequisites](workshop/prerequisites.md), including platform access checks.
- [Participant lab](workshop/lab-001.md): create a separate learner copy first.
- [GitHub path](docs/path-github.md) or [Azure DevOps path](docs/path-azure-devops.md).
- [Case catalog](workshop/cases/README.md), [pair worksheet](workshop/pair-worksheet.md)
  and [readout](workshop/readout-template.md).
- [Your first spec](workshop/first-spec.md): choose a fictional starter or bring
  a non-PHI problem, recreated with fictional organizations and synthetic data.

## Use the concepts, bring your own tooling

The method is tool-neutral: intent, a spec with Given/When/Then acceptance,
a plan, tasks, human gates and traceability. **OpenSpec is the example engine
this repo uses**, not a required toolkit for your team. Existing Copilot agents,
prompt files and templates can plug in at each step. Work items can live in
Azure Boards or GitHub Issues; code can live in GitHub or Azure Repos.

| Method step | Artifact in this repo | Where your own agent/prompt fits |
| --- | --- | --- |
| Frame intent | Case intent brief and issue/Boards item | Your product-owner agent asks clarification questions |
| Specify acceptance | OpenSpec delta and `features/` Given/When/Then | Your prompt drafts rules and challenges edge cases |
| Plan and slice tasks | Change `design.md` and `tasks.md` | Your architect/developer agent maps dependencies and evidence |
| Build and prove | Lab code, unit tests and Cucumber | Your implementation agent follows the human-approved plan |
| Gate and trace | Worksheet, linked PR evidence and archive diff | Your review template gathers evidence; humans decide |

Use the [Azure DevOps path](docs/path-azure-devops.md) or
[GitHub path](docs/path-github.md) without changing the method or human gates.

## Run the reference examples

Install Node.js **22.12 or later within 22.x**, Node.js 24, or Node.js 26
or later, matching the upstream package's supported engines. Use npm and
VS Code; GitHub Copilot is used for the workshop but is not needed to run tests.

```powershell
npm ci
npm run check
npm audit --audit-level=high
```

`npm run check` validates OpenSpec, verifies the source-coverage inventory,
and runs both `node:test` and Cucumber.js. Individually:

```powershell
npm run validate:spec
npm run check:traceability
npm run test:unit
npm run test:bdd
```

No Python, database, cloud deployment, payer integration, or real AI/OCR service
is required. The application behavior runs as JavaScript functions invoked
by tests; this is not a hosted web application.

## Cases and teaching order

| Case | What it teaches | Executable reference |
| --- | --- | --- |
| [003 Inbound document triage](workshop/cases/003-inbound-document-triage/intent-brief.md) | Opening loop demo: missing edge cases, assumptions and human decisions | [Code](src/document-triage.js), [Gherkin](features/document-triage.feature) |
| [004 Vision-rider retro](workshop/cases/004-vision-rider-retro/original-epic.md) | Find missing rules before seeing the clarified answer | [Code](src/vision-rider.js), [Gherkin](features/vision-retro.feature) |
| [001 Member claim status](workshop/cases/001-member-claim-status/intent-brief.md) | Privacy rules and hidden-claim non-disclosure; bounded hands-on lab | [Code](src/claim-status.js), [Gherkin](features/claim-status.feature) |
| [002 Group dental rider](workshop/cases/002-group-dental-rider-setup/intent-brief.md) | Optional self-study: handoffs, independent approval and go-live evidence | [Code](src/dental-rider.js), [Gherkin](features/dental-rider.feature) |

All four have real teaching code and tests, **not full production systems**.
[Coverage dispositions](workshop/coverage.json) account for every imported
requirement, source acceptance scenario, and success criterion. `partial`
means only the declared subset is demonstrated; `deferred` means preserved
for review, not implemented. Integration, audit, accessibility, translation,
and business-outcome obligations must not be inferred from green tests.

Follow the [case 003 walkthrough](docs/walkthrough.md) for the opening demo.
The [eligibility example](features/member-eligibility.feature) is an optional
small reference, not a required teaching block.

## The delivery loop

**Intent/work item → OpenSpec proposal and requirement delta → reviewed
Gherkin → design and tasks → human approval → Copilot-assisted build →
tests and CI → independent review → merge/archive → living contract.**

[`openspec/specs/`](openspec/specs/member-eligibility/spec.md) describes the
baseline contract. Each case is a proposed capability under
[`openspec/changes/`](openspec/changes/add-inbound-document-triage/proposal.md).
Reference code is supplied for learning; it is not evidence that these proposals
or anyone's PR have received business approval. Tasks for actual review remain
unchecked. Archive only after that review; do not pretend a future proposal is
already an accepted production contract.

See [artifact conventions](docs/spec-conventions.md),
[operating model](docs/operating-model.md), and
[governance](docs/governance.md). A workflow file or CODEOWNERS entry does not
configure the required approval policies by itself.
The [validation status](docs/validation-status.md) records local evidence and
the hosted-platform and dependency-audit checks still required before delivery.

## Data and reuse

Use synthetic examples only. Never put real member data, PHI, secrets or
customer identifiers in prompts, issues, code, tests, logs or screenshots.
The workshop is not compliance advice. See [guardrails](docs/guardrails.md).
