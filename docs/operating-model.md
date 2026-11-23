# Operating model: intent to a maintained contract

| Role | Owns | Approves |
| --- | --- | --- |
| Product owner | Outcome, business rules, acceptance and scope | Behavior readiness and business acceptance |
| Engineering lead | Feasibility, bounded design and evidence plan | Build readiness |
| Developers | Implementation, unit tests and executable examples | Independent peer code review, never their own PR |
| Architect | Boundaries, constraints, production gaps and exceptions | Changes to architecture or reference patterns |
| Privacy/security specialist | Applicable data and access rules | Relevant real-world controls; not supplied by a workshop sample |
| AI assistant | Drafts, questions, plans, code and review suggestions | Nothing |

## Four human gates

1. **Ready to build:** intent is clear; OpenSpec delta and Gherkin agree;
   material questions are answered by named people; scope is bounded.
2. **Plan accepted:** design separates business behavior from implementation,
   tasks map to evidence, and simulated/deferred controls are explicit.
3. **Ready to merge:** applicable automated checks pass, independent reviewers
   inspect meaning, and no requirement was weakened for convenience.
4. **Contract maintained:** archive/current-spec changes are reviewed, history
   is retained and production acceptance includes the controls the sample omits.

## Right-size the work

Use lightweight acceptance criteria for a simple, understood low-risk change.
Use a fuller proposal, constraints, design and examples when rules are ambiguous,
cross-team, privacy-sensitive or costly to discover late. Do not turn the four
large source cases into one enormous implementation task.

## When discovery changes the contract

Stop and name the conflict. Obtain the appropriate human decision, update the
proposed requirements and examples together, and rerun checks. Do not silently
choose code over an approved expectation. Archive only the behavior actually
accepted; keep broader unimplemented intent in proposed changes.

Spec readiness, code completion and production readiness are different states.
The workshop's passing in-memory tests establish none of the omitted identity,
integration, accessibility, audit or compliance controls.
