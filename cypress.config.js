const { defineConfig } = require('cypress')

module.exports = defineConfig({
  screenshotsFolder: 'cypress/screenshots',
  viewportWidth: 1480,
  viewportHeight: 600,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  baseUrl: 'https://www.saucedemo.com',
  failOnStatusCode: false
  },
})
