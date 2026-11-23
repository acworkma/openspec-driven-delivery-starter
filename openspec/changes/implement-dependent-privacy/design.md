# Design: bounded 001 slice

Use the existing JavaScript ES-module, node:test and Cucumber.js stack.

`src/claim-visibility.js` owns the pure policy. `src/claim-status.js` calls it
before projecting fields or building list metadata. Direct lookup searches
only the filtered set. Returned objects omit clinical details entirely.

`features/claim-status.feature` and `tests/claim-status.test.js` exercise the
same reference functions. The learner start replaces only the policy with an
explicit not-implemented error. The planned participant code change is confined
to that file unless a separately reviewed discovery changes scope.

Age is an injected current integer, not computed from real birth dates.
Authentication and subscriber flags are test fixtures, not a production
identity/authorization design. No audit, EOB, network, UI or timing guarantee
is implemented. See the proposal's non-goals and the broader source inventory.
