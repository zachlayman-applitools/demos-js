var webdriver = require("selenium-webdriver");
var Capabilities = webdriver.Capabilities;
var Builder = webdriver.Builder;
var By = webdriver.By;

var SeleniumSDK = require("eyes.selenium");
var Eyes = SeleniumSDK.Eyes;

var driver = new Builder().withCapabilities(Capabilities.chrome()).build();

var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
// eyes.setForceFullPageScreenshot(true);

try {
    eyes.open(driver, "I_28944", "I_28944 modal", { width: 1024, height: 768 });

    driver.get("https://testreading.imaginelearning.com/");
    driver.sleep(1000);

    var ele = driver.findElement(By.css("#root > div > div > div.StudentLogin.login-sections > div:nth-child(3) > form.Form > div:nth-child(1) > label > input[type=text]"));
    ele.sendKeys("ReaderOnly-SPQD48NB2");

    ele = driver.findElement(By.css("#root > div > div > div.StudentLogin.login-sections > div:nth-child(3) > form.Form > div:nth-child(2) > label > input"));
    ele.sendKeys("aaaa");

    ele = driver.findElement(By.css("#root > div > div > div.StudentLogin.login-sections > div:nth-child(3) > form.Form > div:nth-child(3) > label > div > input"));
    ele.sendKeys("reader-SPQD48NB2");
    
    driver.findElement(By.css("#login_button")).click();
    driver.sleep(5000);
    // book
    // driver.findElement(By.css("#root > div > div > ul > li > a > img")).click();
    // driver.sleep(5000);
    // demo africa
    driver.findElement(By.css("#unit-in-progress-10004")).click();
    driver.sleep(5000);
    // river section
    driver.findElement(By.css("body > app-root > student > student-unit > student-unit-articles > div > div.article-list-container > ul > li:nth-child(3) > a:nth-child(3)")).click();
    driver.sleep(5000);
    // canoe image
    driver.findElement(By.css("#reader > div > div > div.wnr-app-sidebar > div > div:nth-child(2) > img")).click();
    driver.sleep(5000);

    // eyes.check("large canoe", SeleniumSDK.Target.region(By.css("[class='wnr-modal-react-modal-overlay wnr-modal-react-modal-overlay-after-open']")));
    // eyes.check("large canoe", SeleniumSDK.Target.region(By.className("ReactModalPortal")));
    eyes.check("large canoe", SeleniumSDK.Target.window());

    eyes.close(false);
} finally {
    // driver.quit();
    eyes.abortIfNotClosed();
}