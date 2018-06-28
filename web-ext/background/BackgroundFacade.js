/** 
* This class implement the Facade pattern. It is the only entry point
* in the background script subsystem for remote messages from the content scripts. 
* See background.js to learn how I receive messages from a remote object (the content scripts)
* All my methods have one argument (arguments)
*  
*/

let backgroundFacadeSingleton = null;

class BackgroundFacade {

    static getSingleton() {
        if (backgroundFacadeSingleton == null) {
            backgroundFacadeSingleton = new BackgroundFacade();
        }  
        return backgroundFacadeSingleton
    }

    constructor() {
        /**
         * The Facade may rely on several background objects.
         * In this case there is only one. 
         */
        this.delegate = new ObjectInTheBackground();
    }

    searchInGoogle(someText) {
        console.log("Now I would search in google");
        return "google's response"
    }
    
}