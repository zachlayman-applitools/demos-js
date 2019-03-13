var webdriver = require("selenium-webdriver");
var Capabilities = webdriver.Capabilities;
var Builder = webdriver.Builder;
var By = webdriver.By;

var SeleniumSDK = require("eyes.selenium");
var Eyes = SeleniumSDK.Eyes;

var driver = new Builder().withCapabilities(Capabilities.chrome()).build();
var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

eyes.open(driver, "demos-js", "my first test", { width: 1024, height: 768 });

driver.get("http://google.com");

eyes.checkWindow("home page");

try {
    eyes.close();
} finally {
    driver.quit();
    eyes.abortIfNotClosed();
}