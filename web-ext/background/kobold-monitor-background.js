var initializeKoboldConfiguration = function() {
    let config = {
        wenExtensionId: "",
        httpPostServer: "",
        logToConsole: true,
        ClickAttemtpMonitor: false,
        UrlsVisitedMonitor: false,
        FormSubmissionMonitor: false
    };
    browser.storage.local.set({config});
};

browser.storage.local.get("config").then(data => {
    console.log("data is:", data);
    if (! data.hasOwnProperty("config")) {
        console.log("Initializing");
        initializeKoboldConfiguration();
    }
});
