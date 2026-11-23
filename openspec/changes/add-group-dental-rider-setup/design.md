# Design: Group dental rider setup

Use JavaScript ES modules, node:test and Cucumber.js, matching the OpenSpec baseline.

Implementation: [module](../../../src/dental-rider.js). Technical evidence: [unit tests](../../../tests/riders.test.js). Business evidence: [Gherkin](../../../features/dental-rider.feature).

Lead-time validation, catalog-version checks, independent approval and eight-result readiness. No request UI, vendor integration, persistent audit, business-day scheduler or actual claims adjudication.

Inputs are synthetic and injected. Flags and returned notification intents simulate external systems; they are not authentication, persisted approvals, message delivery or compliance controls. The caller supplies current age and privacy facts in 001, and current evidence in rider samples. The triage caller must persist a pause until a human authorizes resumption. Record conflicts between code, examples and requirements before changing any artifact.
