# Design: Inbound document triage

Use JavaScript ES modules, node:test and Cucumber.js, matching the OpenSpec baseline.

Implementation: [module](../../../src/document-triage.js). Technical evidence: [unit tests](../../../tests/document-triage.test.js). Business evidence: [Gherkin](../../../features/document-triage.feature).

Deterministic routing of supplied classification results, exact-match corroboration, privacy holds, pause decisions and receipt clocks. No OCR/model, real attachments, persistent pause store, trained-reviewer authorization, reports or alerts delivery.

Inputs are synthetic and injected. Flags and returned notification intents simulate external systems; they are not authentication, persisted approvals, message delivery or compliance controls. The caller supplies current age and privacy facts in 001, and current evidence in rider samples. The triage caller must persist a pause until a human authorizes resumption. Record conflicts between code, examples and requirements before changing any artifact.
