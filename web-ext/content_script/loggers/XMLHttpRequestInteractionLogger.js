class XMLHttpRequestInteractionLogger extends InteractionLogger{
  
  constructor(endpoint) {
    super();
    this.endpoint = endpoint;
  }

  /**
   * Logs the interaction to the console
   * @param {*} href The href where the interaction was obseved
   * @param {*} interactionDescriptor A string to name/identify this interaction
   * @param {*} data All other info that might be relevant
   */
  log(href, interactionDescriptor, data) {
    let postData = {
      href: href,
      interactionDescriptor: interactionDescriptor,
      data: data
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.endpoint, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
      //Call a function when the state changes.
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        //console.log("Success");
      }
    };
    xhr.send(JSON.stringify(postData));

    super.log(href, interactionDescriptor, data);
  }
}
