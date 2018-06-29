class ClickAttemtpMonitor {
  //   constructor(paramOc_Ev, paramOc_Elem, paramOc_T) {
  //     this._event = paramOc_Ev || "";
  //     this.element = paramOc_Elem || "";
  //     this.selectionText = "";
  //     this.oc_T = paramOc_T || false;
  //     this.threatName = "ClickAttempt";
  //   }

  constructor() {
    this._event = "";
    this.element = "";
    this.selectionText = "";
    this.oc_T = false;
    this.threatName = "ClickAttempt";
  }

  attach() {
    const me = this;
    $("*").on(
      "blur change focus focusout load submit focusin beforeunload",
      function(e) {
        me.oc_T = false;
        me._event = null;
        clickAmettempt.element = null;
      }
    );

    $("*").on("mousedown", function(e) {
      if (me.selectionText.length == 0) {
        me.selectionText = me.getSelectionText();
        me._event = e;
        me.element = e.currentTarget;
        me.oc_T = true;
        setTimeout(() => {
          me.timeout_trigger();
        }, 100);
      }
      e.stopPropagation();
    });

    $("*").on("mouseup", function(e) {
      setTimeout(() => {
        me.selectionText = me.getSelectionText();
      }, 25);
      e.stopPropagation();
    });
  }

  getSelectionText() {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  }

  timeout_trigger() {
    let notALargeContainer =
      $(this.element).outerWidth() < 1500 &&
      $(this.element).outerHeight() < 600;
    if (
      this.oc_T &&
      notALargeContainer &&
      $(this.element).attr("role") != "button" &&
      $(this.element).css("cursor") != "pointer" &&
      this.getSelectionText().length == 0 &&
      this.element.tagName != "INPUT" &&
      this.element.tagName != "BUTTON" &&
      this.element.tagName != "OPTION" &&
      this.element.tagName != "A" &&
      this.element.tagName != "SELECT" &&
      this.element.tagName != "BODY" &&
      this.element.tagName != "HTML" &&
      ($(this.element).parents("a").length == 0 ||
        ($(this.element).parents("a").length == 1 &&
          $(this.element)
            .parents("a")
            .first()
            .first()[0]
            .getAttribute("href") == "#"))
    ) {
      var xpath = xpathInstance.getElementXPath(this.element);
      var now = new Date().getTime();
      this.logEvent(this.threatName, { xpath: xpath });
      if (typeof MA_clickAttempt == "function") MA_clickAttempt(false);
    } else if (typeof MA_clickAttempt == "function") MA_clickAttempt(true);
  }

  logEvent(event) {
    console.log(this.threatName + " on " + xpath);
    // Enviar al server
  }
}

new ClickAttemtpMonitor().attach();
