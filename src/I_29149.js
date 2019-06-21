var webdriver = require("selenium-webdriver");
var Capabilities = webdriver.Capabilities;
var Builder = webdriver.Builder;
var By = webdriver.By;

var SeleniumSDK = require("eyes.selenium");
var Eyes = SeleniumSDK.Eyes;

var driver = new Builder().withCapabilities(Capabilities.chrome()).build();
var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

eyes.open(driver, "demos-js I_29148", "my first test", { width: 1280, height: 720 });
eyes.setForceFullPageScreenshot(true);

driver.get("http://apple.com");
try {
    // eyes.checkWindow("home page");
    // eyes.checkRegionByElement(By.css("body > footer"), "footer");
    // eyes.check("header", SeleniumSDK.Target.region(By.id("ac-globalnav")));
    eyes.checkRegionByElement(By.id("ac-globalnav"), "header");
    eyes.close();
} finally {
    driver.quit();
    eyes.abortIfNotClosed();
}