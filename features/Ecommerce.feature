Feature: Validate the Orders in the Ecommerce Application

  Scenario: Verify the User in the Ecommerce Application
    Given I login to Ecommerce application using "Thalaivar@shivaji.com" and "Thalaivar@27"
    When I add product to the cart
    And I navigate to cart page and Verify the product in cart
    Then I place the order and verify the order in Orders page  
