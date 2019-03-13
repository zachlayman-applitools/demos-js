var webdriver = require("selenium-webdriver");
var LOCAL_APPIUM = "http://127.0.0.1:4723/wd/hub";

// Initialize the eyes SDK and set your private API key.
var Eyes = require("eyes.selenium").Eyes;
var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

// Open browser.
var driver = new webdriver.Builder().usingServer(LOCAL_APPIUM).withCapabilities(
    webdriver.Capabilities.safari()
    .set('platformName', 'iOS')
    .set('platformVersion', '12.1')
    .set('deviceName', 'iPhone XS Max')
    .set('browserName', 'Safari'))
    .build();

try {

    // Start the test.
    eyes.open(driver, "JS Demos", "iPhone JS Test")

    // Navigate the browser to the "hello world!" web-site.
    driver.get("https://applitools.com/helloworld");

    // Visual checkpoint #1.
    eyes.checkWindow("Hello!");

    // Click the "Click me!" button.
    driver.findElement(webdriver.By.tagName('button')).click();

    // Visual checkpoint #1.
    eyes.checkWindow("Click!");

    // End the test.
    eyes.close();

} finally {

    // Close the browser.
    driver.quit();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    eyes.abortIfNotClosed();

}