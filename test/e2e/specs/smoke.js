module.exports = {
  'default e2e tests': function test(browser) {
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.welcome')
      .assert.containsText('div', 'Welcome to MBU Online')
      .end();
  }
}
