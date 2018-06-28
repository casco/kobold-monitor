/** 
* This class implement the Facade pattern. It is the only entry point
* in the content script subsystem for remote messages from the background scripts. 
* See content.js to learn how I receive messages from a remote object (the background scripts)
* All my methods have one argument (arguments)
*/

let contentFacadeSingleton = null;

class ContentFacade extends Facade {

    static getSingleton() {
        if (contentFacadeSingleton == null) {
            contentFacadeSingleton = new ContentFacade();
        }  
        return contentFacadeSingleton
    }

    getTitle(args) {
       return document.title; 
    }

    getUrl(args) {
        return document.URL;
    }
   
}