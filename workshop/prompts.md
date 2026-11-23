# Copilot prompt cards

Use paths from your learner repository. These are plain-language prompts, not
invented slash commands. Review output before accepting edits.

## Intent and clarification (product owner leads)

> Read the 001 intent brief and the OpenSpec change proposal and requirements.
> Do not implement yet. Restate the desired outcome, name non-goals, and ask
> one material question at a time about missing behavior. Treat the supplied
> privacy rules as fictional Contoso policy, not legal advice. Record human
> decisions without fabricating approvals.

## Requirements and examples (all roles)

> Compare the OpenSpec delta with features/claim-status.feature. Identify
> disagreement, missing boundaries and assumptions about hidden records.
> Describe observable outputs, including counts, totals, messages and direct
> lookups. Do not weaken a requirement or scenario. Wait for our decisions.

## Plan (developer and architect)

> Read the approved proposal, delta, design, tasks and claim-status tests.
> Plan a change confined to src/claim-visibility.js. Map the age bands,
> confidential requests and unknown facts to tests. Identify simulated versus
> production controls. Do not edit files until we review the plan.

## Implement (after human approval)

> Implement the agreed visibility policy in src/claim-visibility.js only.
> Preserve the tests and acceptance examples. Unknown age or privacy state
> must fail closed. Run npm run lab:test and npm run lab:bdd, then npm run check.
> Report failures or requirement conflicts rather than changing the contract.

## Review (independent peer)

> Review the policy diff against the OpenSpec change and Gherkin. Look for
> age-boundary errors, confidentiality bypasses and indirect disclosure.
> Explain what the evidence does not establish about EOBs, identity, UI,
> audit, timing or production integrations. Do not approve on our behalf.

## Retro (before looking at the answer)

> Read only workshop/cases/004-vision-rider-retro/original-epic.md.
> Ask what must be clarified before building: actors, dates, readiness evidence,
> exceptions and termination. Do not invent business decisions. Draft an
> OpenSpec proposal and examples only after we answer. Keep an explicit gap log.
