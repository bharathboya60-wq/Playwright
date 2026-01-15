Feature: TO validate the error message

@Validate
Scenario Outline: Verify the error message with invalid credentials
  Given I login to Ecommerce2 application using "<invalid_email>" and "<invalid_password>"
  Then I verify the error message

    Examples:
        | invalid_email          | invalid_password |
        | test@example.com       | wrongpassword    |
        | Ramu@gmail.com         | Ramu@123         |