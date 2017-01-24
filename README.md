# api-cucumbers


### Install:
  * `npm install`
  * `docker-compose up`
  * `CITY=Rome ./node_modules/cucumber/bin/cucumber.js features/parse.feature`

### Details

All parser contains 2 part, first one it's parsion all urls for hotels in tripadvisor system, and next part - get details about each hotel

This is means, you can run first parsing all hotels with urls to file:
 * `CITY=Rome ./node_modules/cucumber/bin/cucumber.js features/parse.feature:8`

Then you can run detail parsing per hotel:
 * `CITY=Rome ./node_modules/cucumber/bin/cucumber.js features/parse.feature:12`

System has some log information, if parser find error, you can restart from position:
  * `HOTEL_INFO_INDEX=10 CITY=Rome ./node_modules/cucumber/bin/cucumber.js features/parse.feature:12`

You can tell system how many hotels you want parse:
  * `HOTELS_COUNT=6 CITY=Rome ./node_modules/cucumber/bin/cucumber.js features/parse.feature:12`
