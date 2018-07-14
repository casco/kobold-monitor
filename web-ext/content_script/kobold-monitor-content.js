// The head is a logger that silently passes everything to the next one
var loggerChainHead = new InteractionLogger();
new UrlsVisitedMonitor(loggerChainHead).attach();

browser.storage.local.get("config").then(data => {
    var config = data.config;
    updateMonitorsAndLoggers(config);
});

browser.storage.onChanged.addListener((change, area) => {
    if (area == "local" && change.config.newValue) {
        updateMonitorsAndLoggers(change.config.newValue);
    }
});

var updateMonitorsAndLoggers = function(config) {
    loggerChainHead.setNextLogger(null);
    if (config.logToConsole) {
        loggerChainHead.setNextLogger(new ConsoleInteractionLogger());
    }
    if (config.wenExtensionId) {
        let newSecond = new WebExperimentsNotebookInteractionLogger(config.wenExtensionId);
        newSecond.setNextLogger(loggerChainHead.getNextLogger());
        loggerChainHead.setNextLogger(newSecond);
    }
    if (config.httpPostServer) {
        let newSecond = new XMLHttpRequestInteractionLogger(config.httpPostServer);
        newSecond.setNextLogger(loggerChainHead.getNextLogger());
        loggerChainHead.setNextLogger(newSecond);
    }
    if (config.UrlsVisitedMonitor) {
        enableMonitor(UrlsVisitedMonitor);
    };
    if (config.ClickAttemtpMonitor) {
        enableMonitor(ClickAttemtpMonitor);
    };
    if (config.FormSubmissionMonitor) {
        enableMonitor(FormSubmissionMonitor);
    }
    
}

var enableMonitor = function(monitorClass) {
    new monitorClass(loggerChainHead).attach();
}
