@002
Feature: Dental rider readiness
  @002-US2-AS3 @002-FR-007
  Scenario: The author cannot approve their configuration
    Given a dental package built by "SYN-ANALYST-A"
    When "SYN-ANALYST-A" attempts configuration approval
    Then configuration approval is refused

  @002-US4-AS1 @002-FR-012
  Scenario: All readiness evidence permits go-live
    Given an independently approved dental package with administrator acceptance
    And all eight dental test claims match
    When dental readiness is evaluated
    Then the dental request is ready

  @002-US4-AS2
  Scenario: A benefit mismatch blocks go-live
    Given an independently approved dental package with administrator acceptance
    And all eight dental test claims match
    But the annual maximum test pays too much
    When dental readiness is evaluated
    Then the dental request is blocked

  @002-US1-AS3 @002-FR-003
  Scenario: Short notice without approvals is not accepted
    Given a rider approved on "2026-11-18" and effective on "2026-12-01"
    When the rider request is validated without exception approvals
    Then the request needs product owner and underwriting approval
