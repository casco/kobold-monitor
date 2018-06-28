/**
 * Your background logic will be programmed in various objects behind the Facade. 
 * I represent one of those objects.
 */

class ObjectInTheBackground {

    constructor() {
        this.collectedUrls = [];
    }

    collect() {
        ContentProxy.getSingleton().getUrl().then(url => {
            ContentProxy.getSingleton().getTitle().then(title => {
                console.log("Url: " + url);
                console.log("Title: " + title);
            })
        });
    }


}