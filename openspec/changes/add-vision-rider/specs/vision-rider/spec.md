# Vision rider retrospective

## Purpose
Define the business rules and observable acceptance behavior for vision rider retrospective using fictional Contoso examples.

## ADDED Requirements

### Requirement: 004-FR-001
System MUST capture rider, effective date, eligible employee classes and dependent eligibility for every request.

#### Scenario: 004-US1-AS1
- GIVEN Woodgrove Bank (GRP-20417) is active on a compatible base plan
- WHEN complete request RR-2025-0042 is submitted on 2025-05-12, effective 2025-07-01
- THEN it is approved and moves to configuration.

### Requirement: 004-FR-002
System MUST accept only first-of-month effective dates at least 30 calendar days after approval, unless the product owner and underwriting approve an exception.

#### Scenario: 004-US1-AS2
- GIVEN today is 2025-06-10
- WHEN a request effective 2025-07-01 is submitted
- THEN it needs product owner and underwriting approval with a recorded reason.

### Requirement: 004-FR-003
System MUST block requests for groups that are inactive or whose coverage ends before the effective date.

#### Scenario: 004-US1-AS3
- GIVEN Alpine Ski House's coverage ends before the requested effective date
- WHEN a request is submitted
- THEN it is blocked with a plain explanation.

### Requirement: 004-FR-004
System MUST build configuration from the benefit grid only, with approval by a second configuration analyst.

#### Scenario: 004-US2-AS1
- GIVEN approved request RR-2025-0042
- WHEN the configuration analyst builds the package
- THEN copays, frame and contact lens allowances and frequency limits match the benefit grid.

#### Scenario: 004-US2-AS2
- GIVEN a built package
- WHEN the analyst who built it tries to approve it
- THEN approval is refused until a second analyst reviews it.

### Requirement: 004-FR-005
System MUST start allowances and frequency limits fresh on the rider's effective date, with no proration or carry-over.

#### Scenario: 004-US2-AS3
- GIVEN a rider effective 2025-07-01 for a group with a January plan year
- WHEN the package is built
- THEN allowances and frequency limits start fresh that day, with no proration.

### Requirement: 004-FR-006
System MUST apply the base plan's dependent age limit and new-hire waiting period.

#### Scenario: 004-US5-AS2
- GIVEN an employee in a new-hire waiting period
- WHEN the rider goes live
- THEN their rider starts when their medical coverage starts.

### Requirement: 004-FR-007
System MUST send Fabrikam Vision Services a synthetic test eligibility file before go-live, record its response, and alert the vendor manager after 5 business days without one.

#### Scenario: 004-US3-AS1
- GIVEN an approved package
- WHEN Fabrikam accepts a synthetic test file with an employee, a dependent child and a new hire
- THEN the acceptance is recorded as readiness evidence.

#### Scenario: 004-US3-AS2
- GIVEN Fabrikam rejects the file or is silent for 5 business days
- WHEN that is recorded
- THEN go-live stays blocked and the vendor manager is alerted.

### Requirement: 004-FR-008
System MUST compare expected and actual results for the eight standard test claims and return any mismatch to configuration.

#### Scenario: 004-US4-AS1
- GIVEN Fabrikam has accepted the test file
- WHEN the eight standard test claims run (exam, lenses, frames, contacts instead of glasses, frequency limit reached, out-of-network, dependent child, terminated member)
- THEN all match expected results.

#### Scenario: 004-US4-AS2
- GIVEN the frames claim pays above the allowance
- WHEN the result is recorded
- THEN go-live is blocked and the request returns to configuration with the evidence.

### Requirement: 004-FR-009
System MUST block go-live until configuration is approved, Fabrikam has accepted the test file and all eight test claims match.

#### Scenario: 004-US5-AS1
- GIVEN every readiness check has passed
- WHEN the effective date arrives
- THEN the rider is active for eligible employees and dependents.

### Requirement: 004-FR-010
System MUST cancel a request when its group terminates before go-live and tell Fabrikam to drop the group.

#### Scenario: 004-US5-AS3
- GIVEN the group terminates before go-live
- WHEN that is recorded
- THEN the request is cancelled and Fabrikam is told to drop the group.

### Requirement: 004-FR-011
System MUST log who approved what and when, and use only synthetic members, such as CHP-0002286, in tests.

#### Scenario: 004-FR-011-review
- GIVEN a second analyst approving a synthetic configuration
- WHEN the approval is recorded
- THEN the approver, decision and time are logged without real member data
