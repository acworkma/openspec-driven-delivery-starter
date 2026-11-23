# Design: Member claim status

Use JavaScript ES modules, node:test and Cucumber.js, matching the OpenSpec baseline.

Implementation: [module](../../../src/claim-status.js). Technical evidence: [unit tests](../../../tests/claim-status.test.js). Business evidence: [Gherkin](../../../features/claim-status.feature).

Dependent visibility, list projection and direct lookup parity. No portal, EOB service, audit store, freshness integration, accessibility or translation implementation.

Inputs are synthetic and injected. Flags and returned notification intents simulate external systems; they are not authentication, persisted approvals, message delivery or compliance controls. The caller supplies current age and privacy facts in 001, and current evidence in rider samples. The triage caller must persist a pause until a human authorizes resumption. Record conflicts between code, examples and requirements before changing any artifact.
