# Group dental rider setup

## Purpose
Define the business rules and observable acceptance behavior for group dental rider setup using fictional Contoso examples.

## ADDED Requirements

### Requirement: 002-FR-001
System MUST offer only the 2027 catalog's three standard dental riders, capturing effective date, eligible classes, dependent eligibility and each class's contribution split.

#### Scenario: 002-US1-AS1
- GIVEN Northwind Traders (GRP-10482) is active on a base plan compatible with Dental Plus
- WHEN the account manager submits complete request RR-2026-0117 on 2026-11-18, effective 2027-01-01
- THEN it is approved and moves to configuration.

### Requirement: 002-FR-002
System MUST check at submission that the group is active, the rider fits the base plan, required fields are complete and the effective date is the first of a month at least 30 calendar days after approval (the day it passes these checks).

#### Scenario: 002-US1-AS2
- GIVEN a request missing one class's contribution split and effective mid-month (2027-01-15)
- WHEN it is submitted
- THEN the system names both problems plainly and keeps it in draft.

#### Scenario: 002-US1-AS4
- GIVEN Tailspin Toys' base plan is incompatible with Dental Complete
- WHEN that rider is chosen
- THEN the request is blocked with a plain explanation and the compatible riders listed.

### Requirement: 002-FR-003
System MUST send shorter lead times to an exception route needing product owner and underwriting approval with a reason.

#### Scenario: 002-US1-AS3
- GIVEN today is 2026-11-18
- WHEN a request effective 2026-12-01 is submitted
- THEN it goes to the exception route, needing product owner and underwriting approval with a recorded reason.

### Requirement: 002-FR-004
System MUST NOT accept a retired rider or a duplicate open request for the same group and rider.

#### Scenario: 002-FR-004-review
- GIVEN a retired rider or a second open request for the same group and rider
- WHEN an account manager submits the request
- THEN the duplicate or retired choice is blocked

### Requirement: 002-FR-005
System MUST build the configuration package from catalog values only; non-standard benefits go to the custom-benefit process.

#### Scenario: 002-US2-AS1
- GIVEN approved request RR-2026-0117 for Dental Plus
- WHEN the analyst generates the package
- THEN deductible, annual maximum, preventive, basic and major coinsurance, waiting periods and frequency limits come from the catalog and cannot be typed in.

### Requirement: 002-FR-006
System MUST start deductibles and annual maximums at zero on the rider's effective date, unprorated, and apply the base plan's dependent age limit and new-hire waiting period.

#### Scenario: 002-US2-AS2
- GIVEN a rider effective 2027-07-01, midway through the group's plan year
- WHEN the package is generated
- THEN deductibles and annual maximums start at zero that day, with no proration.

### Requirement: 002-FR-007
System MUST require a second configuration analyst, never the author, to approve each package and each change.

#### Scenario: 002-US2-AS3
- GIVEN a generated package
- WHEN the analyst who generated it tries to approve it
- THEN the system refuses and asks for a second analyst.

### Requirement: 002-FR-008
System MUST re-validate a request when its catalog version changes and hold the package for product owner approval.

#### Scenario: 002-US2-AS4
- GIVEN the Dental Plus catalog version changed after approval
- WHEN the package is generated
- THEN the request is re-validated, differences are listed and the package waits for product owner approval.

### Requirement: 002-FR-009
System MUST send Fabrikam a synthetic test eligibility file covering every eligible class and record its response.

#### Scenario: 002-US3-AS1
- GIVEN an approved package for GRP-10482
- WHEN Fabrikam Dental Administrators accepts a synthetic test eligibility file that includes member CHP-0004417
- THEN the acceptance is recorded as readiness evidence.

### Requirement: 002-FR-010
System MUST alert the vendor manager after 5 business days without a Fabrikam response and count each request's days waiting on the administrator.

#### Scenario: 002-US3-AS3
- GIVEN Fabrikam has not responded within 5 business days
- WHEN the fifth business day ends
- THEN the vendor manager is alerted and the request shows as waiting on the administrator.

### Requirement: 002-FR-011
System MUST compare expected and actual results for the eight test claims, raise a defect on any mismatch, and re-run all eight after any change.

#### Scenario: 002-US4-AS2
- GIVEN the annual-maximum-reached test claim pays more than expected
- WHEN the result is recorded
- THEN go-live is blocked and a defect with both results returns the request to configuration.

### Requirement: 002-FR-012
System MUST block go-live until the package is approved, Fabrikam has accepted the test file and all eight test claims match.

#### Scenario: 002-US4-AS1
- GIVEN Fabrikam has accepted the test file
- WHEN all eight test claims match expected results in the claims test region
- THEN the request is ready to pay claims.

#### Scenario: 002-US3-AS2
- GIVEN Fabrikam rejects the test file
- WHEN the rejection is recorded
- THEN go-live stays blocked and the request returns to configuration with Fabrikam's errors attached.

### Requirement: 002-FR-013
System MUST re-validate a changed effective date as a new request and cancel requests for groups that terminate before go-live.

#### Scenario: 002-FR-013-review
- GIVEN an approved request whose effective date changes
- WHEN the change is recorded
- THEN the request is revalidated and readiness evidence is rerun

### Requirement: 002-FR-014
System MUST show each request's stage, owner, business days in stage and blockers, and flag to the product owner any request in one stage for more than 5 business days.

#### Scenario: 002-US5-AS1
- GIVEN RR-2026-0117 is waiting on Fabrikam
- WHEN the account manager or product owner opens it
- THEN they see its stage, owner, business days in stage and blocker.

#### Scenario: 002-US5-AS2
- GIVEN a request has been in one stage for more than 5 business days
- WHEN the sixth business day begins
- THEN it is flagged to the product owner.

### Requirement: 002-FR-015
System MUST hold only group, product and synthetic test data, never real member data; account managers see only their own groups' requests.

#### Scenario: 002-FR-015-review
- GIVEN an account manager with one assigned group
- WHEN the manager views requests
- THEN only assigned group requests are visible and test data is synthetic

### Requirement: 002-FR-016
System MUST log who did what and when for every change, approval, exception and stage change, kept per the records-retention schedule.

#### Scenario: 002-FR-016-review
- GIVEN a configuration exception approval
- WHEN the approver records the decision
- THEN actor, time, reason and stage change are retained in the audit history
