module.exports = {
    preset: "jest-puppeteer",
    globals: {
      URL: "https://www.wework.com/he-IL/info/the-future-of-work-is-flexible"
    },
    testMatch: [
      "**/tests_src/**/*.test.js"
    ],
    verbose: true
}