@001
Feature: Dependent claim privacy
  These fictional age rules belong to Contoso, not to any jurisdiction.

  @001-US3-AS2 @001-FR-011 @001-FR-012
  Scenario: A sensitive adolescent claim leaves no list trace
    Given a subscriber with a 16 year old dependent
    And the dependent has a routine claim and a sensitive claim
    When the subscriber lists the dependent's claims
    Then only the routine claim is returned
    And removing the sensitive claim changes no response field

  @001-US3-AS4
  Scenario: A confidential child looks like one with no claims
    Given a subscriber with a 9 year old dependent
    And the dependent has a routine claim and a sensitive claim
    And the dependent has a confidential communication request
    When the subscriber lists the dependent's claims
    Then the response matches that for a child with no claims

  @001-US3-AS5
  Scenario: A hidden claim cannot be discovered through a direct lookup
    Given a subscriber with a 16 year old dependent
    And the dependent has a routine claim and a sensitive claim
    When the subscriber requests the sensitive claim directly
    Then the result matches a nonexistent claim

  @001-US3-AS3
  Scenario: An adult dependent's message reveals no claim existence
    Given a subscriber with a 19 year old dependent
    And the dependent has a routine claim and a sensitive claim
    When the subscriber lists the dependent's claims
    Then the adult privacy message is independent of claims
