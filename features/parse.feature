Feature:
  As user
  I want parse tripadvisor com

  Background:
    * I go to tripadvisor.com

  Scenario: Search for Paris hotels
    When I search for "Paris" hotels
    Then I see list of hotels
