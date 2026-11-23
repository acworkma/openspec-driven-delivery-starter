# Bounded dependent-claim privacy capability

## Purpose

Determine which synthetic dependent claims a subscriber may view and prevent
hidden records from changing in-memory list or direct-lookup responses.

## ADDED Requirements

### Requirement: Dependent visibility
The in-memory policy MUST deny claims when age is unknown, negative or not an integer, or privacy flags are unknown. It MUST deny confidential claims and claims of dependents aged 18 or older. Otherwise it MUST permit claims under age 13, and only non-sensitive claims for ages 13 through 17.

#### Scenario: An adolescent sensitive claim is denied
- GIVEN a 16-year-old dependent with confirmed privacy facts
- WHEN a sensitive claim is evaluated
- THEN the policy denies visibility

#### Scenario: Unknown confidentiality fails closed
- GIVEN a 9-year-old dependent whose confidentiality flag is unknown
- WHEN a claim is evaluated
- THEN the policy denies visibility

### Requirement: No list trace
The in-memory list MUST project only visible claims and calculate counts and billed totals only from those claims. Adding hidden claims MUST NOT change any returned list field. An adult privacy message MUST be independent of claim existence.

#### Scenario: Adding a hidden claim changes nothing
- GIVEN a visible routine claim and a sensitive claim for a 16-year-old dependent
- WHEN the list is compared with the list containing only the routine claim
- THEN the complete returned objects are equal

### Requirement: Direct lookup parity
The in-memory lookup MUST return identical status and body for a hidden claim and a nonexistent claim. The sample MUST reject callers not explicitly marked authenticated and subscriber.

#### Scenario: Hidden and missing references match
- GIVEN a subscriber who cannot view a sensitive claim
- WHEN the subscriber requests that claim and a nonexistent claim
- THEN both responses have status 404 and the same body
