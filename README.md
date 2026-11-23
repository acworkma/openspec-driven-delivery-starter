# OpenSpec-driven delivery: a full-day workshop

Agree on behavior, build against it, and prove the change. This workshop
combines the health-plan cases from
[spec-driven-delivery-starter](https://github.com/acworkma/spec-driven-delivery-starter/tree/acworkma-spec-kit-lab-setup)
with the delivery approach and **JavaScript, Node.js, Cucumber.js, and OpenSpec**
stack from [sdd-github](https://github.com/samueltauil/sdd-github).
It does not use Spec Kit.

**Audience:** product owners, architects, and developers working together.
**Format:** eight hours including lunch and breaks. **Outcome:** one bounded
001 change taken from intent to reviewed requirements, working JavaScript,
automated evidence and a peer-reviewed PR; inspect the living-spec/archive
step after approval. Both GitHub and Azure DevOps are supported.

## Start here

- [Agenda](workshop/agenda.md) and [facilitator guide](workshop/facilitator-guide.md).
- [Prerequisites](workshop/prerequisites.md), including platform access checks.
- [Participant lab](workshop/lab-001.md): create a separate learner copy first.
- [GitHub path](docs/path-github.md) or [Azure DevOps path](docs/path-azure-devops.md).
- [Case catalog](workshop/cases/README.md), [pair worksheet](workshop/pair-worksheet.md)
  and [readout](workshop/readout-template.md).

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

## Four cases, not three

| Case | What it teaches | Executable reference |
| --- | --- | --- |
| [001 Member claim status](workshop/cases/001-member-claim-status/intent-brief.md) | Privacy rules and hidden-claim non-disclosure; main hands-on lab | [Code](src/claim-status.js), [Gherkin](features/claim-status.feature) |
| [002 Group dental rider](workshop/cases/002-group-dental-rider-setup/intent-brief.md) | Handoffs, independent approval and go-live evidence | [Code](src/dental-rider.js), [Gherkin](features/dental-rider.feature) |
| [003 Inbound document triage](workshop/cases/003-inbound-document-triage/intent-brief.md) | Confidence boundaries, privacy holds and human decisions | [Code](src/document-triage.js), [Gherkin](features/document-triage.feature) |
| [004 Vision-rider retro](workshop/cases/004-vision-rider-retro/original-epic.md) | Find missing rules before seeing the clarified answer | [Code](src/vision-rider.js), [Gherkin](features/vision-retro.feature) |

All four have real teaching code and tests, **not full production systems**.
[Coverage dispositions](workshop/coverage.json) account for every imported
requirement, source acceptance scenario, and success criterion. `partial`
means only the declared subset is demonstrated; `deferred` means preserved
for review, not implemented. Integration, audit, accessibility, translation,
and business-outcome obligations must not be inferred from green tests.

The original [eligibility example](docs/walkthrough.md) remains a small warm-up,
not a fifth required business case.

## The delivery loop

**Intent/work item → OpenSpec proposal and requirement delta → reviewed
Gherkin → design and tasks → human approval → Copilot-assisted build →
tests and CI → independent review → merge/archive → living contract.**

[`openspec/specs/`](openspec/specs/member-eligibility/spec.md) describes the
baseline contract. Each case is a proposed capability under
[`openspec/changes/`](openspec/changes/add-member-claim-status/proposal.md).
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

Upstream attribution and the recorded permission limitation are in
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). Confirm redistribution terms
for the unlicensed OpenSpec sample before publication outside authorized use.
