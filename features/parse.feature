Feature:
  As user
  I want parse tripadvisor com

  Background:
    * I go to tripadvisor.com

  Scenario: Search for Paris hotels
    When I search for "Paris" hotels
    Then I write to file "paris-hotels-list.json" list of hotels

  Scenario: Grap info from hotels
    When I grap info for all hotels in file
    Then I write to file "paris-hotels-details.json" all info from "paris-hotels-list.json"
