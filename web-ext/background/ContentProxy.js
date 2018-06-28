/**
 * I am a proxy for the ContentFacade of the current tab.
 * If you see my protoco, it matches one to one the protocol of ContentFacade.
 * I encapsulate message serialization and transmission. 
 */

 let contentProxySingleton = null;

 class ContentProxy {

    static getSingleton() {
        if (contentProxySingleton == null) {
            contentProxySingleton = new ContentProxy();
        }  
        return contentProxySingleton
    }

    /**
     * Send getUrl to the ContentFacade
     * Returns the response from the other side (if any)
     */
    async getUrl() {
        return await this.send({methodName: 'getUrl', arguments: {}});
    }

    /**
     * Send getTitle to the ContentFacade
     * Returns a Promise that resolves to the title string
     */
    async getTitle() {
        return await this.send({methodName: 'getTitle', arguments: {}});
    }

    // Private protocol down here
    async send(rmc) {
        let activeTabs = await browser.tabs.query({active: true});
        if (activeTabs.length > 0) {
            var response = await browser.tabs.sendMessage(activeTabs[0].id, rmc);
        } else { 
            console.log ("Sending a message to the content scripts when no tab is active")
        }   
        return response;
    }
    
}