# Prerequisites and preflight

## Everyone

- Read the [agenda](agenda.md), [guardrails](../docs/guardrails.md) and
  [case catalog](cases/README.md).
- Work with fictional Contoso records only. Use the supplied cases if you
  cannot safely sanitize your own epic.
- Join a mixed-role pair/team. Product owners and architects need not write
  JavaScript; they must make acceptance and boundary decisions.

## Developer workstation

- Git, VS Code and Node.js/npm. Supported Node versions match package.json:
  22.12+ within 22.x, 24.x, or 26+. Use Node 22.x to match both example pipelines.
- GitHub Copilot signed in with the local editing capabilities permitted by
  your organization. MCP servers and cloud coding agents are not prerequisites.
- Network access to the repository and npm registry during initial setup.
  No production APIs, database, Python, OCR or model credentials are needed.
- Run `node --version`, `npm --version`, `npm ci`, `npm run check`, and
  `npm audit --audit-level=high` in the reference checkout.
- Before the event, create a learner copy with `npm run lab:prepare`, change
  into `context\lab-001` on Windows (or `context/lab-001` on macOS/Linux), and
  run `npm ci`. Do not implement the missing policy yet.

## GitHub path

Have a sandbox repository, rights to push a branch/open a PR, Actions enabled,
and an eligible independent reviewer. A repository administrator must configure
the [required checks and approvals](../docs/path-github.md) before the event.
Know whether your GitHub plan supports the desired rules on that repository.

## Azure DevOps path

Have an Azure DevOps project, Azure Repos repository, Boards item access,
permission to create/run a pipeline, and an eligible reviewer. Confirm a hosted
agent allocation or an approved self-hosted agent and configure
[build-validation policies](../docs/path-azure-devops.md) before the event.
Do not discover an unavailable parallel-job allocation during the lab.

## Facilitator go/no-go

Run the exact learner preparation and commands on workshop machines, check
Copilot sign-in and install dependencies before the day. Create a test PR on
each platform you will teach and confirm real policy enforcement with a
non-author reviewer. Repository files alone cannot validate account access.

If a hosted platform is unavailable, the local code/specification exercise can
continue with peer inspection, but record the PR/CI outcome as **not completed**.
Do not represent a local demonstration as an enforced hosted review.

For disconnected delivery, prepare each learner directory and its dependencies
in advance. OpenSpec usage here sets `OPENSPEC_TELEMETRY=0` in CI; facilitators
can also set it in their shell (`$env:OPENSPEC_TELEMETRY='0'` in PowerShell).
