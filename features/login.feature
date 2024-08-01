Feature: Login API Testing

  Scenario: Successful Login
    Given I have valid login credentials
    When I perform a successful login
    Then I should receive a token

  Scenario: Unsuccessful Login
    Given I have invalid login credentials
    When I perform an unsuccessful login
    Then I should receive an error message
