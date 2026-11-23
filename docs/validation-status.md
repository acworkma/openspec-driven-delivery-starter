# Validation status and delivery preflight

## Exercised locally

Environment: Windows, Node.js 26.13.0, npm 11.20.0.

| Check | Observed result |
| --- | --- |
| Locked dependency installation | `npm ci` installation succeeded for the reference and a fresh learner copy |
| OpenSpec strict validation | Seven items passed: six proposed changes and the inherited current capability |
| Source preservation inventory | All 149 entries accounted for: 67 requirements, 60 source scenarios, 22 outcomes |
| node:test suite | 30 tests passed, including behavior, learner setup, archive and agenda checks |
| Cucumber.js | 20 scenarios / 78 steps passed across the four cases and eligibility warm-up |
| Learner starting point | Missing policy caused the expected unit and Gherkin failures |
| Repaired learner | Targeted checks and the complete `npm run check` passed with reference behavior restored |
| Archive rehearsal | The actual pinned OpenSpec CLI updated only the scoped current capability and retained change history in a disposable copy |
| Agenda | Allocations total 480 minutes, including lunch and two breaks |
| Documentation | Relative Markdown file links resolved |
| CI configuration | GitHub workflow, Azure Pipeline and GitHub issue-form YAML parsed successfully |

Archive automation uses a completed disposable test fixture. It does not mark
real participant or business approvals complete. No source changes have been
archived in the reference repository.

## Still required before delivering a hosted workshop

1. **GitHub:** provision a sandbox, push the learner checkpoint, configure
   actual owners/rulesets, run the workflow on a PR, and confirm enforcement
   and independent reviewer approval. These hosted actions were not performed.
2. **Azure DevOps:** provision or select an authorized project/repository,
   verify agent capacity, create the YAML pipeline and branch policies, then
   run a PR build and independent review. These hosted actions were not performed.
3. **Dependency audit:** `npm audit --audit-level=high` could not obtain a
   report. The configured package-feed proxy returned HTTP 429; a direct
   public-registry attempt failed its TLS handshake. No clean vulnerability
   result is claimed, and the audit remains required in both CI paths.
4. **Agent environments:** the Node 22/Linux combinations used by the hosted
   pipelines were not executed here. Repeat the preflight on the actual
   teaching workstations and CI agents.

See the [prerequisites](../workshop/prerequisites.md), [GitHub path](path-github.md)
and [Azure DevOps path](path-azure-devops.md). Do not remove required checks
or disable TLS validation to work around an environmental failure.
