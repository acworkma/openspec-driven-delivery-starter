# Member claim status

## Purpose
Define the business rules and observable acceptance behavior for member claim status using fictional Contoso examples.

## ADDED Requirements

### Requirement: 001-FR-001
System MUST show signed-in members their own claims from the last 24 months by date of service, newest first, including ended coverage; adjusted claims appear once, as the latest version.

#### Scenario: 001-US1-AS1
- GIVEN member CHP-0004417 has recent claims
- WHEN they open Claims
- THEN they see each claim's number, date of service, provider, status, amount billed, plan paid and what they may owe, newest first, with the "Updated" time.

#### Scenario: 001-US1-AS5
- GIVEN an adjusted claim
- WHEN the member opens Claims
- THEN it appears once, as its latest version, labeled Adjusted.

### Requirement: 001-FR-002
System MUST show each claim's number, date of service, provider, status, amount billed, plan paid and what the member may owe (once processed).

#### Scenario: 001-FR-002-review
- GIVEN a processed synthetic claim
- WHEN its summary is displayed
- THEN the claim number, service date, provider, status and all three financial amounts are present

### Requirement: 001-FR-003
System MUST show claim information no more than 24 hours behind the claims system, with its "Updated" time, and say plainly when it can't refresh.

#### Scenario: 001-US1-AS3
- GIVEN the claims system is down and claims were updated 6 hours ago
- WHEN the member opens Claims
- THEN those claims show with the "Updated" time and a note that recent changes may be missing.

#### Scenario: 001-US1-AS4
- GIVEN claims haven't been updated for over 24 hours
- WHEN the member opens Claims
- THEN no claims show, and a message explains how to get help.

### Requirement: 001-FR-004
System MUST show a plain-language empty state when there are no claims.

#### Scenario: 001-US1-AS2
- GIVEN a new member with no claims
- WHEN they open Claims
- THEN they're told claims usually appear a few weeks after a visit.

### Requirement: 001-FR-005
System MUST give each claim one of the six statuses, using Claims Operations' mapping, with plain-language text on what happens next.

#### Scenario: 001-FR-005-review
- GIVEN an internal status mapped by Claims Operations
- WHEN the member reads the claim
- THEN one of the six approved statuses and its next step are shown

### Requirement: 001-FR-006
System MUST say whom a Waiting for information claim awaits (provider or member) and what, if anything, the member must do.

#### Scenario: 001-US2-AS2
- GIVEN claims waiting on the provider and on the member's other-insurance details
- WHEN the member opens each
- THEN each says who we're waiting on and what, if anything, the member must do.

### Requirement: 001-FR-007
System MUST show every service line with a plain-language description, amounts and its own status, and say "Processed by your other plan first" when another plan paid first.

#### Scenario: 001-US2-AS4
- GIVEN one of a claim's three lines was denied
- WHEN the member opens it
- THEN each line shows its own status, and the denied line its reason.

### Requirement: 001-FR-008
System MUST show for denials the plain-language reason, how and by when to appeal, a link to the existing appeal process, and the EOB.

#### Scenario: 001-US2-AS3
- GIVEN a denied claim
- WHEN the member opens it
- THEN they see the plain-language reason, how to appeal and by when, and the EOB.

### Requirement: 001-FR-009
System MUST show "We're reviewing this claim. Please contact us." for unmapped codes, never the code, and log the gap for Claims Operations.

#### Scenario: 001-US2-AS5
- GIVEN a denial reason with no plain-language mapping
- WHEN the member opens the claim
- THEN a generic "We're reviewing this claim" message replaces the code, and the gap is logged for Claims Operations.

### Requirement: 001-FR-010
System MUST NOT show diagnosis codes, clinical notes or other clinical detail.

#### Scenario: 001-US2-AS1
- GIVEN processed claim CLM-2026-000183 has three lines
- WHEN the member opens it
- THEN each line shows a plain-language description and amounts, and no diagnosis codes or clinical notes appear.

### Requirement: 001-FR-011
System MUST let only the subscriber see dependents' claims, by age on the viewing day: under 13, all; 13–17, all but sensitive-service claims (per Contoso's privacy policy); 18 and over, none. It MUST show none for a dependent with a confidential communication request, or whose age or privacy status it can't confirm.

#### Scenario: 001-US3-AS1
- GIVEN the 9-year-old has claims, including CLM-2026-000201
- WHEN the subscriber opens them
- THEN all are shown, and each view is audit-logged.

#### Scenario: 001-US3-AS2
- GIVEN the 16-year-old has two routine claims and one sensitive-service claim
- WHEN the subscriber views that dependent
- THEN only the routine claims appear, and no count, total or message hints at a third.

#### Scenario: 001-US3-AS3
- GIVEN the 19-year-old
- WHEN the subscriber selects them
- THEN a message says adult dependents' claims are private, whether or not any exist.

#### Scenario: 001-US3-AS4
- GIVEN a 9-year-old with a confidential communication request on file
- WHEN the subscriber views that dependent
- THEN the page looks exactly like one for a dependent with no claims.

### Requirement: 001-FR-012
System MUST leave no trace of hidden claims in any list, count, total, message or EOB, and answer requests for them exactly as for nonexistent claims.

#### Scenario: 001-US3-AS5
- GIVEN a link to the 16-year-old's sensitive-service claim
- WHEN the subscriber opens it
- THEN they see the same "We can't find this claim" page as for a nonexistent claim.

#### Scenario: 001-US4-AS3
- GIVEN a dependent's hidden claim
- WHEN the subscriber requests its EOB
- THEN the response matches that for a nonexistent claim.

### Requirement: 001-FR-013
System MUST show one privacy note on every dependent's page and, for dependents 18 and over, that their claims are private, whether or not any exist.

#### Scenario: 001-FR-013-review
- GIVEN a dependent page with no claims
- WHEN the subscriber opens it
- THEN the standard privacy note is displayed without suggesting hidden records

### Requirement: 001-FR-014
System MUST offer an accessible EOB for Processed, Denied and Adjusted claims, explain other formats and languages, and say when one isn't ready (usually 3 business days after processing).

#### Scenario: 001-US4-AS1
- GIVEN a processed claim
- WHEN the member selects "Download Explanation of Benefits"
- THEN an accessible document opens, with help for other formats or languages.

#### Scenario: 001-US4-AS2
- GIVEN a claim processed yesterday
- WHEN the member opens it
- THEN it says the EOB is usually ready within 3 business days after processing.

### Requirement: 001-FR-015
System MUST audit-log every view of claim information and every EOB request: who, whose claim, which claim, what and when.

#### Scenario: 001-FR-015-review
- GIVEN a synthetic EOB request
- WHEN the member requests the document
- THEN an audit event records actor, subject, claim, action and time

### Requirement: 001-FR-016
System MUST show status labels, reason text and next steps in English or Spanish, per the member's language preference.

#### Scenario: 001-FR-016-review
- GIVEN a member preferring Spanish
- WHEN the member reads status, reason and next steps
- THEN those labels and messages are in reviewed Spanish

### Requirement: 001-FR-017
System MUST meet WCAG 2.2 AA on every member-facing page.

#### Scenario: 001-FR-017-review
- GIVEN a member-facing claims page
- WHEN the accessibility team audits it
- THEN it meets WCAG 2.2 AA before launch

### Requirement: 001-FR-018
System MUST clear claim information from the screen on session timeout and return the member to the same page after sign-in.

#### Scenario: 001-FR-018-review
- GIVEN claim details on screen
- WHEN the session times out and the member signs in again
- THEN details clear at timeout and the same page is restored after sign-in
