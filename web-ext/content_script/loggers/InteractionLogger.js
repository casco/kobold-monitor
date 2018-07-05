class InteractionLogger {

    /**
     * Logs the interaction to the console
     * @param {*} href The href where the interaction was obseved
     * @param {*} interactionDescriptor A string to name/identify this interaction
     * @param {*} data All other info that might be relevant
     */
    log(href, interactionDescriptor, data) {
        if (this.nextLogger) {
            this.nextLogger.log(href, interactionDescriptor, data);
        }
    }

    setNextLogger(logger) {
        this.nextLogger = logger;
    }

    getNextLogger() {
        return this.nextLogger
    }
}
