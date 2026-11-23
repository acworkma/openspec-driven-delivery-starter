# Completed-reference notes (facilitator / reveal after the exercise)

The root checkout is the completed reference; `npm run lab:prepare` creates
the separate learner start. Do not open the completed visibility policy during
initial clarification. These notes are an answer guide, not approvals.

## 001

Read `src/claim-visibility.js` after the team has tried the lab. The policy
denies malformed/unknown ages and unknown confidentiality/sensitivity facts,
then denies confidential or adult-dependent claims. Under 13 can include
sensitive claims; 13-17 cannot. Filtering occurs before list projection,
counts and totals. Direct lookup considers only visible claims.

Compare whole response objects with and without a hidden claim. The sample
does not return hidden counts, raw clinical fields or a freshness marker
computed from hidden data. It does not model network timing, EOB retrieval,
audit-store behavior or production authentication; those are not proven safe.

## 002

`validateRiderRequest` handles lead time and an explicit short-notice exception;
`approveConfiguration` rejects the same author/reviewer.
`buildDentalConfiguration` copies catalog benefits and rejects stale versions.
`dentalReadiness` requires exactly the eight named, unique, finite matching
results as well as independent approval and administrator acceptance.

The expected/actual results are supplied test evidence, not output from an
implemented claims adjudicator. Catalog version differences block rather than
silently using new terms. A real exception/reapproval UI and audit are deferred.

## 003

Routing includes confidence exactly at the threshold. A weekly misroute rate
strictly above 2% pauses routing; an already supplied pause remains active.
The caller must persist that pause and require a human to resume it. Conflicting
identifiers override automatic attachment even when exact-match flags are true.
A receipt clock is not reset when a document enters human review.

## 004

Reveal the source gap log after discovery. Vision benefits start fresh,
readiness uses the vision-specific eight claim names, a waiting new hire starts
no earlier than medical coverage, and termination cancels activation while
returning a vendor-notification intent. That intent does not send a message.

## Recovery and review

If needed, compare a learner's policy to the root reference after explaining
the gap. Prefer a new learner copy to destructive reset commands. Re-run
targeted checks after any repair. Record unmet approvals and hosted-platform
checks honestly in the readout.
