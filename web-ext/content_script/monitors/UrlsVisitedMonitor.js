class UrlsVisitedMonitor extends Monitor {
    constructor(logger) {
        super(logger);
    }

    attach() {
        this.logEvent("UrlVisited", {
            tab: "NA",
            timestamp: JSON.stringify(new Date())
        });
    }
}
