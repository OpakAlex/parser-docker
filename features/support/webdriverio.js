"use strict";

if (typeof(browser) === 'undefined') {
  let WebDriverIO = require('webdriverio');
  let browser = WebDriverIO.remote({
    baseUrl: process.env.APP_URL,
    host: '127.0.0.1',
    port: 4444,
    waitforTimeout: 30 * 1000,
    logLevel: 'silent',
    screenshotPath: `${__dirname}/../../screenshots/`,
    desiredCapabilities: {
      browserName: process.env.SELENIUM_BROWSER || 'chrome',
      'chromeOptions': {
        args: ['--disable-impl-side-painting']
      }
    }
  });

  global.browser = browser;

  module.exports = function() {
    this.registerHandler('BeforeFeatures', function(event, done) {
      browser.init().windowHandleSize({ width: 1280, height: 800 }).call(done);
    });

    this.registerHandler('AfterFeatures', function(event, done) {
      browser.end().call(done);
    });
  };
}

browser.addCommand('waitForAjaxRequestsToFinalize', function() {
  return this.waitUntil(function() {
    return this.execute(function() {
      return window.jQuery && window.jQuery.active > 0 ? false : true;
    }).then(function(response) {
      return response.value;
    });
  });
});
