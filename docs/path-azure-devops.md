# Azure DevOps lab path

The JavaScript, Node.js, Cucumber.js, OpenSpec and npm checks are identical
to the GitHub path. Use local VS Code Copilot; neither GitHub-hosted issues
nor a GitHub cloud coding agent is required.

## Administrator setup before the workshop

1. Provide an Azure DevOps project, an empty Azure Repos repository, Boards
   access, and an eligible non-author reviewer. Push the learner checkpoint
   to `main` and the participant changes to a separate branch.
2. Create an Azure Pipeline from `pipelines/validate.yml`. Authorize the
   repository and confirm hosted parallel-job capacity (or use an approved
   compatible agent). The example uses Ubuntu and Node 22.
3. In **Repos > Branches > main > Branch policies**, require a minimum number
   of independent reviewers, prohibit counting the requestor's approval, and
   reset approvals appropriately when reviewed content changes.
4. Add required build validation using this pipeline, with automatic triggering
   on PR updates. Do not limit validation to spec paths: code, tests,
   dependencies, instructions and workflow changes can affect delivery.
5. Require linked work items and resolved comments. Configure automatically
   included required reviewers for spec/acceptance paths where appropriate.
   GitHub CODEOWNERS does not enforce Azure Repos policies.

**Important:** Azure Repos does not use a YAML `pr:` trigger for PR build
validation. The `pr: none` in the sample is deliberate; branch policy is the
enforcement mechanism. The YAML push trigger is not a substitute.

## Participant delivery loop

1. Create an Azure Boards item with the template below, selecting the
   appropriate item type for your process: User Story (Agile), Product Backlog
   Item (Scrum), Requirement (CMMI) or Issue (Basic).
2. Follow [lab 001](../workshop/lab-001.md), recording real product/engineering
   decisions before implementation.
3. Push the feature branch, create an Azure Repos PR, use
   `.azuredevops/pull_request_template.md`, and link the item using the PR's
   work-item control. Mention `AB#<actual-id>` where appropriate; do not assume
   GitHub closing keywords manage Boards state.
4. Confirm build validation actually ran and passed on the PR. Have a
   non-author reviewer inspect the requirement/scenario-to-code evidence.
5. Perform [the archive exercise](../workshop/archive-exercise.md), rerun
   checks and renew review as required. Complete the PR through the configured
   policies. Verify the work item's state according to your process.

## Boards item template

| Field | Content |
| --- | --- |
| Problem and outcome | Who needs the change and how success will be observed |
| Scope/non-goals | Bounded dependent-privacy policy, not the full claims portal |
| Requirements | Repository links to `implement-dependent-privacy` proposal and delta |
| Acceptance | Links to `features/claim-status.feature` and scenario IDs |
| Human decisions | Product/engineering agreement and any unresolved owner |
| Evidence | Pipeline run, unit/Gherkin results and independent PR review |
| Completion | Archive/current-spec diff and explicitly deferred responsibilities |

`pipelines/validate.yml` installs locked dependencies, runs `npm run check`
and `npm audit --audit-level=high`. There is no Spec Kit linter, Azure CLI
exporter or required MCP server.

Repository files cannot grant agent capacity, reviewer rights or organization
permissions. Record unavailable hosted checks as incomplete.
