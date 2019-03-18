var SDK = require("eyes.selenium");

var eyes = new SDK.Eyes();
var apiKey = process.env.APPLITOOLS_API_KEY;
eyes.setApiKey(apiKey);

eyes.setLogHandler(new SDK.ConsoleLogHandler(true));
eyes.setForceFullPageScreenshot(true);

it("Small Biz - Home page Visual Test", async (done) => {
    try {
        await eyes.open(browser, "Yahoo Small Business!", "Home Page Test", { width: 1024, height: 768 });
        await browser.waitForAngularEnabled(false);
        await browser.driver.manage().window().setSize(800, 600);
        await browser.get("https://www.yahoosmallbusiness.com");
        await browser.sleep(5000);

        await eyes.checkWindow("Home Page").catch((err) => {
            console.log("Promise Rejected - eyes.checkWindow :" + err.toString());
        });

        let result = await eyes.close(false);

        console.log("Test Name: [" + result.getName() + "], " +
            "Host Browser: [" + result.getHostApp() + "], " +
            "Host O/S: [" + result.getHostOS() + "], " +
            "Host Display Size: [" + result.getHostDisplaySize() + "]"
        );

        let isNewTest = result.getIsNew();
        console.log("Is a new Test ?:" + isNewTest);

        if (!isNewTest) {
            let testStatus = result.getStatus();

            expect(result.getIsDifferent()).toBe(false, "Image not matching with baseline for - " + result.getName());
            expect(testStatus).toBe(TestResultsStatus.Passed, "Test is not Passed. Its " + testStatus);
        }

    } finally {
        await eyes.abortIfNotClosed();
    }

    done();

});