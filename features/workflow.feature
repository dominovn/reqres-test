Feature: End-to-End Workflow Testing

  Scenario: User Management Workflow
    Given I perform a successful login
    And I retrieve a list of users
    And I update a user's details
    When I delete the user
    Then the user should no longer exist

  Scenario: Error Handling Workflow
    Given I perform an unsuccessful login
    When I try to access resources without a valid token
    Then I should receive an unauthorized error
