Feature: User API Testing

  Scenario: List Users
    Given I have a valid token
    When I retrieve the list of users
    Then the response should contain a list of users

  Scenario: Update User
    Given I have a valid token
    And I have a user to update
    When I update the user's details
    Then the user details should be updated successfully

  Scenario: Delete User
    Given I have a valid token
    And I have a user to delete
    When I delete the user
    Then the user should be deleted successfully
