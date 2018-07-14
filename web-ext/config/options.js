
browser.storage.local.get("config").then(data => {
    var config = data.config;
    if (config) {
        document.getElementById("wen-id").value = config.wenExtensionId;
        document.getElementById("http-endpoint").value = config.httpPostServer;
        document.getElementById("console").checked = config.logToConsole;
        document.getElementById("ClickAttemtpMonitor").checked =
            config.ClickAttemtpMonitor;
        document.getElementById("UrlsVisitedMonitor").checked =
            config.UrlsVisitedMonitor;
        document.getElementById("FormSubmissionMonitor").checked =
            config.FormSubmissionMonitor;
    }
});

var saveConfiguration = function() {
    var config = {};
    config.wenExtensionId = document.getElementById("wen-id").value;
    config.httpPostServer = document.getElementById("http-endpoint").value;
    config.logToConsole = document.getElementById("console").checked;
    config.ClickAttemtpMonitor = document.getElementById(
        "ClickAttemtpMonitor"
    ).checked;
    config.UrlsVisitedMonitor = document.getElementById(
        "UrlsVisitedMonitor"
    ).checked;
    config.FormSubmissionMonitor = document.getElementById(
        "FormSubmissionMonitor"
    ).checked;
    browser.storage.local.set({ config });
};

document.getElementById("submit-button").addEventListener("click", event => {
    saveConfiguration();
});
