class InteractionEventMonitor {

  constructor(logger) {
    this.logger = logger;
  }

  logEvent(event, args) {
    let loc = window.top.location.href;
    this.logger.log(loc, event, args)
  }

  getElementXPath(elt) {
    var path = "";
    for (; elt && elt.nodeType == 1; elt = elt.parentNode) {
      var idx = this.getElementIdx(elt);
      var xname = elt.tagName;
      if (idx > 1) xname += "[" + idx + "]";
      path = "/" + xname + path;
    }
    return path;
  }

  getElementIdx(elt) {
    var count = 1;
    for (var sib = elt.previousSibling; sib; sib = sib.previousSibling) {
      if (sib.nodeType == 1 && sib.tagName == elt.tagName) count++;
    }
    return count;
  }
}
