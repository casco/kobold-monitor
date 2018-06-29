/**
 * This class implement the Facade pattern. It is the only entry point
 * in the content script subsystem for remote messages from the background scripts.
 * See content.js to learn how I receive messages from a remote object (the background scripts)
 * All my methods have one argument (arguments)
 */

let backgroundFacadeSingleton = null;

class BackgroundFacade extends Facade {
  constructor() {
    super();
    this.serverApi = new ServerAPI();
  }

  static getSingleton() {
    if (backgroundFacadeSingleton == null) {
      backgroundFacadeSingleton = new BackgroundFacade();
    }
    return backgroundFacadeSingleton;
  }

  report(report) {
    this.serverApi.report(report);
  }

}
