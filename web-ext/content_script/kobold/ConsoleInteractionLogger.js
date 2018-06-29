class ConsoleInteractionLogger {
    constructor(nextLogger) {
        this.nextLogger = nextLogger;
    }

    /**
     * Logs the interaction to the console
     * @param {*} href The href where the interaction was obseved
     * @param {*} interactionDescriptor A string to name/identify this interaction
     * @param {*} data All other info that might be relevant
     */
    log(href, interactionDescriptor, data) {
        console.log(href + ' - ' + interactionDescriptor + ' - ' + JSON.stringify(data));
        if (this.nextLogger) {
            this.nextLogger.log(href, interactionDescriptor, data);
        }
    }
}