Feature:
  As user
  I want parse tripadvisor com

  Background:
    * I go to tripadvisor.com

  Scenario: Search for Paris hotels
    When I search for "$City" hotels
    Then I write to file "$City-hotels-list.json" list of hotels

  Scenario: Grap info from hotels
    When I grap info for all hotels in file
    Then I write to file "$City-hotels-details.json" all info from "$City-hotels-list.json"
