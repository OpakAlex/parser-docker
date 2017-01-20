'use strict';

export default function() {
  this.Then(/^I go to tripadvisor\.com$/, function (done) {
    browser
      .url('https://www.tripadvisor.com')
      .call(done);
  });

  this.When(/^I search for "([^"]*)" hotels$/, function (city, done) {
    browser
      .waitForVisible('#mainSearch', 240000)
      .executeAsync(function(callback) {
        var el = document.getElementsByClassName('ui_backdrop dark')[0];
        if(!el){
          return callback();
        }
        var event = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        el.dispatchEvent(event);
        callback();
      })
      .click('#mainSearch')
      .waitForVisible('.poi_overview_item=Hotels', 240000)
      .click('.poi_overview_item*=Hotels')
      .setValue('#GEO_SCOPED_SEARCH_INPUT', city)
      .waitForVisible('.resultContainer.local')
      .click('.poi-name=Paris')
      .waitForVisible('#SEARCH_BUTTON')
      .click('#SEARCH_BUTTON')
      .waitForVisible('.p13n_geo_hotels*=Hotels')
      .call(done);
  });

  this.Then(/^I see list of hotels$/, function (done) {
    let hotels = [];
    let totalPages = 0;
    browser
      .waitForVisible('.listing_title')
      .waitForVisible('.pageNum.last')
      .getText('.pageNum.last').then(text => {
        totalPages = 1;
        // totalPages = Number(text);
      })
      .call(() => {
        return paginateHotels(1, totalPages, hotels);
      })
      .call(() => {
        return parseHotelInfo(0, hotels);
      })
      .call(() => {
        console.log(hotels);
      })
      .call(done);
  });

  let parseHotelInfo = (index, hotels) => {
    let url = hotels[index];
    hotels[index] = {
      url: url
    };
    return browser
      .url(url)
      .waitForVisible('#HEADING')
      .executeAsync(function(done) {
        var el = document.getElementsByClassName('ui_backdrop dark')[0];
        if(!el){
          return done();
        }
        var event = new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        el.dispatchEvent(event);
        done();
      })
      .getText('#HEADING').then(name => {
        hotels[index].name = name;
      })
      .getText('.heading_rating .more.taLnk').then(reviews => {
        hotels[index].total_reviews = reviews;
      })
      .getText('.contact_item').then(items => {
        hotels[index].phone = items[0];
        hotels[index].address = items[3];
      })
      .pause(400)
      .elements('.taLnk*=E-mail hotel').then(els => {
        if (els.value.length > 0){
          return browser
            .waitForVisible('.taLnk*=E-mail hotel')
            .click('.taLnk*=E-mail hotel')
            .waitForVisible('.emailOwnerTxt input')
            .getValue('input.emailOwnerReadonly').then(el => {
              hotels[index].email = el;
            })
            .executeAsync(function(done) {
              var el = document.getElementsByClassName('ui_backdrop dark')[0];
              if(!el){
                return done();
              }
              var event = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
              });
              el.dispatchEvent(event);
              done();
            })
        }
        return browser
      })
      .waitForVisible('span[data-datetype="CHECKIN"]')
      .click('span[data-datetype="CHECKIN"]')
      .waitForVisible('.dsdc-today')
      .click('.dsdc-today')
      .waitForVisible('.dsdc-day')
      .click('.dsdc-day[data-date="2017-0-20"]')
      .pause(2000)
      .elements('.price').then(els => {
        if (els.value.length > 0){
          return browser.getText('.price').then(text => {
            hotels[index].price = text;
          });
        }
        return browser;
      })
      .elements('.ib_price').then(els => {
        if (els.value.length > 0){
          return browser.getText('.ib_price').then(text => {
            hotels[index].price = text;
          })
        }
        return browser;
      })
      .call(() => {
        // browser.deleteCookie()
        // browser.localStorage('DELETE')
        return browser;
      })
      .elements('.taLnk*=Hotel website').then(els => {
        if (els.value.length > 0){
          return browser
            .waitForVisible('.taLnk*=Hotel website')
            .click('.taLnk*=Hotel website')
            .pause(1000)
            .waitForExist('body')
            .executeAsync(function(done) {
              done(window.location.href);
            }).then((location) => {
              hotels[index].website = location.value;
            });
        }
        return browser
      })
      .call(() => {
        if (index >= hotels.length){
          return browser;
        }
        // return parseHotelInfo(index + 1, hotels)
      });
  };

  let paginateHotels = (currentPage, totalPages, hotels) => {
      if (currentPage > totalPages){
        return browser;
      }
      let nextPage = currentPage + 1;
      return browser
        .call(() => {
          return getAllHotelsOnPage(hotels)
        })
        .executeAsync(function(done) {
          var el = document.getElementsByClassName('nav next ui_button primary taLnk')[0];
          if(!el){
            return done();
          }
          var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });
          el.dispatchEvent(event);
          done();
        })
        .waitForVisible("span[data-page-number='"+ nextPage +"']")
        .call(() => {
          return paginateHotels(nextPage, totalPages, hotels)
        });
    };

  let getAllHotelsOnPage = function(hotels){
    return browser.getAttribute('.listing_title a', 'href').then(attrs => {
      for(let attr of attrs){
        hotels.push(attr);
      }
    })
  };

};
