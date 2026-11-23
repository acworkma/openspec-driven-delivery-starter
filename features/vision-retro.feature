@004
Feature: Vision rider rules discovered by the retrospective
  @004-US2-AS3 @004-FR-005
  Scenario: Mid-year allowances are not halved
    Given a vision rider effective on "2027-07-01"
    When the vision benefit grid is configured
    Then allowances and frequency usage start at zero without proration

  @004-US5-AS2 @004-FR-006
  Scenario: A waiting new hire starts with medical coverage
    Given a ready vision rider effective on "2027-07-01"
    And medical coverage starts on "2027-08-01"
    When vision activation is scheduled
    Then vision coverage starts on "2027-08-01"

  @004-US5-AS3 @004-FR-010
  Scenario: Termination cancels activation and requests vendor notification
    Given a ready vision rider effective on "2027-07-01"
    And the group terminates before go-live
    When vision activation is scheduled
    Then the vision request is cancelled with administrator notification requested
