/**
 * I am a proxy for the BackgroundFacade.
 * If you see my protocol, it matches one to one the protocol of BackgroundFacade.
 * I encapsulate message serialization and transmission. 
 */

let backgroundProxySingleton = null;

class BackgroundProxy {

    static getSingleton() {
        if (backgroundProxySingleton == null) {
            backgroundProxySingleton = new BackgroundProxy();
        }
        return backgroundProxySingleton
    }
   
    async searchInGoogle(someText) {
        return await this.send({ methodName: 'searchInGoogle', arguments: {text: someText} });
    }

    // Private protocol down here
    async send(rmc) {
        try {
            return browser.runtime.sendMessage(rmc);
        } catch { console.log('Background are not ready yet: ') }
    }

}