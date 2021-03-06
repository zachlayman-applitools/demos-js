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
eyes.setForceFullPageScreenshot(true);

driver.get("http://speedrunslive.com");
try {
    // eyes.checkWindow("home page");
    // eyes.checkRegionByElement(By.css("body > footer"), "footer");
    eyes.check("footer", SeleniumSDK.Target.region(By.css("body > footer")));
    eyes.close();
} finally {
    driver.quit();
    eyes.abortIfNotClosed();
}