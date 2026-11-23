# Measures: adoption and evidence, not generated code

For the workshop, record whether each team completed:

1. A [candidate first spec](../workshop/first-spec.md) with intent, scope and at
   least three Given/When/Then scenarios including edge cases.
2. The [worksheet's assumptions, dependencies and test data section](../workshop/pair-worksheet.md#assumptions-dependencies-and-test-data),
   with confirmed evidence or named blockers for the Ready to build gate.
3. One or two measures selected below, with a baseline owner and collection plan.
4. For lab 001: reviewed requirements and plan, a bounded implementation with
   passing evidence, independent PR review/hosted checks and an inspected
   archive diff, or explicit incomplete steps.

Track gaps discovered before build, decisions requiring another role, and
remaining unimplemented production obligations. The retro's eight gaps and
illustrative costs are fictional; do not report them as workshop ROI.

For subsequent real delivery, agree definitions and baselines before measuring
clarification loops, rework discovered in UAT/production, waiting on handoffs,
and requirement-to-evidence traceability. The source cases' business outcomes
(call reduction, misroutes, go-live accuracy) require operational observation;
unit tests cannot establish them.

For the first-spec readout, select 1-2 of those delivery measures. For each,
write what is counted, the baseline period/sample, a collection source, an
owner and when the baseline will be available. For example, count clarification
round-trips per work item over the next two weeks from Boards discussion
history, or days blocked on a dependency from recorded handoff dates. Agree
definitions first; an unavailable baseline is a collection task, not zero.

Do not use generated lines of code, number of AI prompts or checked task boxes
as substitutes for accepted outcomes.
