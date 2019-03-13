var https = require("https");
var Eyes = require("eyes.images").Eyes;
var RSVP = require('rsvp');

var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
eyes.setOs("Windows 10");
eyes.setHostingApp("vs code");

var version = "0.1";

// Start visual testing.
var testPromise = eyes.open("Applitools site", "Image Test", {width: 785, height: 1087})
    .then(function () {
        // Load page image and validate.
        return getImage("store.applitools.com","/download/contact_us.png/" + version).then(function (img) {
            // Visual validation point #1
            return eyes.checkImage(img, 'Contact-us page');
        });
    })
    .then(function () {
        // Load another page image and validate
        return getImage("store.applitools.com", "/download/resources.png/" + version).then(function (img) {
            // Visual validation point #2
            return eyes.checkImage(img);
        });
    })
    .then(function () {
        // End visual testing. Validate visual correctness.
        return eyes.close(false);
    }, function () {
        return eyes.abortIfNotClosed();
    }
);

// Handle test results.
testPromise.then(function (results) {
    console.log("results", results);
});

function getImage(host, path) {
    var options = {
        host: host,
        path: path
    };

    var deferred = RSVP.defer();

    https.request(options, function (res) {
        res.setEncoding('binary'); // this

        var data = "";
        res.on('data', function(chunk) {
            return data += chunk;
        });
        res.on('end', function() {
            return deferred.resolve(new Buffer(data, 'binary'));
        });
        res.on('error', function(err) {
            console.log("Error during HTTP request");
            console.log(err.message);
            deferred.reject();
        });
    }).end();

    return deferred.promise;
}