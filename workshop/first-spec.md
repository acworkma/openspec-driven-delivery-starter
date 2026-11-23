# Your first spec (pairs)

**Segment 11: 70 minutes.** Product owners, architects, developers and leaders
work in mixed-role pairs. Writing JavaScript is never required. Use a document,
Markdown, paper, or your team's existing template and Copilot Chat.
**AI drafts; humans decide.**

## Choose one problem

### A. Record identification

Contoso's intake team uses a matching rule to find a claim-like record for a
Northwind Traders request. The rule combines the submitted record number and
service date, which the team assumed would identify one record. A synthetic
test now returns two candidates with those same values from different source
systems; another input has no match. Staff need to know when they may select
a record, when they must stop, and who resolves ambiguity without exposing
unnecessary details. Define the rule, the collisions it must handle, the
evidence needed to trust the lookup, and the behavior for zero, one and
multiple matches. Do not assume a searchable index or a unique key exists.

Product-owner prompts, one at a time:

1. > Read option A above. Do not write code. Ask me to define intent, actors,
   > scope and non-goals, then the exact matching fields and normalization
   > rules. Ask one material question at a time. Separate confirmed decisions
   > from assumptions; do not invent a unique identifier or approve anything.
2. > Challenge our candidate matching rule with collisions across source
   > systems, missing fields and zero, one or multiple candidates. Ask what
   > staff may see and do for each result and who resolves ambiguity. After
   > our answers, draft at least three concrete Given/When/Then scenarios,
   > including edge cases. Keep unanswered outcomes marked as open decisions.
3. > Help complete the pair worksheet's "Assumptions, dependencies and test
   > data" section. Ask who can confirm the field, index, lookup or API and
   > how; list upstream/downstream owners and behavior if they are not ready.
   > Propose synthetic records and expected results for every scenario, with
   > a data source and owner. Never request production records.
4. > Review our outline against the Ready to build gate in
   > docs/operating-model.md. Find vague results, unconfirmed capabilities and
   > missing test data. Recommend ready or not ready with reasons, leaving
   > approval to us. Help choose 1-2 measures from docs/measures.md and record
   > how, when and by whom their baselines will be collected. Do not implement.

### B. Inbound document intake

Contoso receives faxed and scanned documents from Fabrikam in different
layouts, page orders and levels of legibility. The initial request says only
to put each document in the correct queue. The synthetic intake set also
contains an unreadable scan, a form missing identifiers, a document sent to
the wrong queue and a duplicate fax; a Proseware flyer is not a member
document at all. Build on [case 003](cases/003-inbound-document-triage/intent-brief.md)
to specify what people and systems do beyond the happy path, what remains
unattached, and how receipt time and page accountability survive handoffs.
Do not assume OCR, matching lookups or a receiving team's queue is available.

Product-owner prompts, one at a time:

1. > Read option B and the case 003 intent brief. Do not write code. Ask me
   > about intent, scope, document types, human responsibilities and non-goals.
   > Distinguish classification, routing and attachment from business decisions.
   > Keep assumptions and unanswered questions explicit; never invent approval.
2. > Challenge our draft with unreadable, incomplete, misrouted and duplicate
   > documents, not just normal intake. Ask what is observed, who acts next,
   > what happens to attachment, pages and receipt clocks, and what happens if
   > a receiving queue is unavailable. After our answers, draft concrete
   > Given/When/Then scenarios covering the happy path and all four exceptions.
3. > Help complete the pair worksheet's "Assumptions, dependencies and test
   > data" section. Ask who confirmed OCR, fields, searchable records, APIs and
   > queues, and how. Name upstream/downstream owners and not-ready behavior.
   > Map every scenario to a synthetic document, expected result and data
   > source/owner. Do not request real documents or treat mock flags as proof.
4. > Review our candidate against the Ready to build gate and the existing
   > case 003 OpenSpec delta. Report conflicts instead of changing approved
   > rules or feature files. List blockers and the humans needed to decide.
   > Help choose 1-2 measures from docs/measures.md with a baseline collection
   > plan. Leave the gate decision to us; do not implement.

### Or bring your own non-PHI problem

Use the same steps and outputs. Recreate it using only fictional organizations
already used here, such as Contoso, Fabrikam, Northwind or Proseware, and fully
synthetic inputs. Remove real people, customers, identifiers and internal
documents before discussing it or using Copilot. If that is not practical,
choose A or B. Do not paste a real work item and ask AI to sanitize it.

## Run the 70-minute exercise

| Minutes | Pair activity | Output |
| --- | --- | --- |
| 0-10 | Choose a problem; product owner explains the outcome, partner restates it | Intent, scope and non-goals |
| 10-30 | Draft rules and concrete Given/When/Then; challenge the happy path | At least three scenarios including edge cases; A covers zero/one/multiple matches, B covers normal intake and all four exceptions |
| 30-50 | Complete the worksheet's assumptions, dependencies and test data section | At least three edge cases, capability evidence, dependency owners/not-ready behavior and synthetic data for every scenario |
| 50-60 | Swap with a neighboring pair; pressure-test Ready to build | Human gate decision with reasons, missing facts, owners and next actions |
| 60-70 | Select measures and prepare the readout | 1-2 baseline plans and next-week handoff |

Use the [pair worksheet](pair-worksheet.md), especially
[Assumptions, dependencies and test data](pair-worksheet.md#assumptions-dependencies-and-test-data).
Record the confirmer's role and evidence, not an invented sign-off. For a
fictional exercise, label simulated confirmations explicitly. A complete
worksheet may correctly say **not ready**; naming a blocker is useful work.

## Leave with three outputs

1. **Candidate spec outline:** intent, scope/non-goals, rules and at least three
   Given/When/Then scenarios including edge cases. Use `Given` for concrete
   starting facts, `When` for one action, and `Then` for an observable result.
   Number scenarios so each can be linked to data and future evidence.
2. **Completed assumptions, dependencies and test data section:** capability
   confirmation, upstream/downstream owners and not-ready behavior, at least
   three edge cases, synthetic data per scenario and a reasoned gate decision.
3. **One or two measures to baseline:** choose from [measures](../docs/measures.md);
   record definitions, sample/period, collection source, owner and date.
   Do not invent baseline values or claim improved outcomes today.

These are candidate requirements, not approved changes to the supplied
OpenSpec contracts or Gherkin. Any conflict needs a human decision.
No implementation, executable tests, CLI use or PR is required in this segment.

Use the [readout template](readout-template.md) in segment 12. End with
**what we'll take to Azure Boards / our repo next week**: an owner, a bounded
work item or spec location, and the first confirmation or review to arrange.
