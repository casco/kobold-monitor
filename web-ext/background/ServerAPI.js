class ServerAPI {
  submit(payload, service) {
    //console.log("About to post: ", payload);
    axios
      .post('http://localhost:8888' + service, payload) 
      .catch(function(error) {
        console.log("Error posting: ", error);
      });
  }

  report(report) {
    this.submit(report, "/reports/");
  }

}
