# Proposal: Implement the bounded 001 privacy slice

## Why

Practice delivering observable dependent-claim privacy without pretending
to build the entire claims portal.

## What Changes

- Add an in-memory dependent-claim visibility policy.
- Filter before returning list counts, financial totals, and messages.
- Return the same direct-lookup response for hidden and nonexistent claims.

## Scope and relationship to the broader case

This is the learner's **001 delivery slice**, not a fifth business case.
The broader [001 proposal](../add-member-claim-status/proposal.md) preserves
the complete source intent and remains a separate, unapproved future change.
This slice illustrates subsets of 001-FR-011, 001-FR-012 and 001-FR-013.
Review its own delta, design and tasks before implementation.

## Non-goals

Real identity verification, age calculation, an HTTP service, UI, EOB download,
audit-store integration, cache freshness, timing side-channel guarantees,
production authorization and legal/compliance certification are not included.
Caller flags and age/privacy facts are synthetic, trusted fixture inputs.

## Approval

Reference code is supplied. Participants must obtain actual human agreement
and independent PR review for their own change; these are not pre-approved.
