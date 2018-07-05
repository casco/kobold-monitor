class ConsoleInteractionLogger extends InteractionLogger {

    /**
     * Logs the interaction to the console
     * @param {*} href The href where the interaction was obseved
     * @param {*} interactionDescriptor A string to name/identify this interaction
     * @param {*} data All other info that might be relevant
     */
    log(href, interactionDescriptor, data) {
        console.log(href + ' - ' + interactionDescriptor + ' - ' + JSON.stringify(data));
        super.log(href, interactionDescriptor, data);
    }
}