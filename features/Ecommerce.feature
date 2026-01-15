Feature: Validate the Orders in the Ecommerce Application

  @RegressionTest
  Scenario: Verify the User in the Ecommerce Application
    Given I login to Ecommerce application using "Thalaivar@shivaji.com" and "Thalaivar@27"
    When I add product to the cart
    And I navigate to cart page and Verify the product in cart
    Then I place the order and verify the order in Orders page  


@Validate
Scenario Outline: Verify the error message with invalid credentials
  Given I login to Ecommerce2 application using "<invalid_email>" and "<invalid_password>"
  Then I verify the error message

    Examples:
        | invalid_email          | invalid_password |
        | test@example.com       | wrongpassword    |
        # | Ramu@gmail.com         | Ramu@123         |
