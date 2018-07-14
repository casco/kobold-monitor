class FormSubmissionMonitor extends Monitor {
    constructor(logger) {
        super(logger);
        this.searchTerms = [
            "search",
            "buscar",
            "b&uacute;squeda",
            "suche",
            "ricerca",
            "find"
        ];
        // fv_torelance seems to be a maximum time to wait before the form is submitted
        // to consider it a failure
        this.fv_tolerance = 1500;
        this.submitted = false;
        this.report = {};
    }

    attach() {
        this.currentHash = this.hashCodeFor($(document).text());
        const me = this;
        this.logEventIfPreviouslySubmitted();
        document.querySelectorAll("form").forEach(elem => {
            elem.addEventListener("submit", me.handleSubmit(elem));
        });

        $(window).on("beforeunload", function() {
            if (!this.submitted) {
                localStorage.removeItem("formSubmissionHashCode");
            }
        });
    }

    /**
     * I realize I was submited already in a previous
     * existence! Log the event
     */
    logEventIfPreviouslySubmitted() {
        if (localStorage.getItem("formSubmissionHashCode") != null) {
            var savedReport = JSON.parse(
                localStorage.getItem("formSubmissionHashCode")
            );
            var emptyInputs = JSON.parse(localStorage.getItem("emptyInputs"));
            savedReport["emptyTextInputs"] = emptyInputs["emptyTextInputs"];
            var lastHash = savedReport.hashCode;
            var xpathResult = document.evaluate(
                savedReport.xpath,
                document.body,
                null,
                XPathResult.ANY_UNORDERED_NODE_TYPE,
                null
            );
            if (xpathResult.singleNodeValue !== null) {
                let validation = lastHash != this.currentHash;
                let failed = savedReport.isSearchForm ? "false" : "true";
                let validationType = validation ? "server" : "none";
                let extraParameters = {
                    failed: failed,
                    validation: validationType
                };
                this.logEvent("FormSubmission", {
                    info: $.extend(this.report, extraParameters)
                });
            } else {
                let extraParameters = { failed: "false", validation: "none" };
                this.logEvent("FormSubmission", {
                    info: $.extend(this.report, extraParameters)
                });
            }
            localStorage.removeItem("formSubmissionHashCode");
        }
    }

    //array of emtpy text inputs xpaths
    getEmptyInputs(formElem) {
        var jQueryForm = $(formElem);
        var emptyInputs = jQueryForm.find("input:text").filter(function() {
            return $(this).val() == "";
        });
        var emptyInputsXpaths = [];
        for (let i = 0; i < emptyInputs.length; i++) {
            emptyInputsXpaths[i] = this.getElementXPath(emptyInputs[i]);
        }
        return emptyInputsXpaths;
    }

    handleSubmit(formElem) {
        this.submitted = true;
        var formXPath = this.getElementXPath(formElem);
        var time = this.getTimeFor(formXPath);
        var emptyInputs = this.getEmptyInputs(formElem);
        this.report = {
            url: document.URL,
            xpath: formXPath,
            hashCode: this.currentHash,
            isSearchForm: this.isSearchForm(formElem),
            elementLeft: formElem.getBoundingClientRect().x,
            elementTop: formElem.getBoundingClientRect().y,
            elementWidth: formElem.offsetWidth,
            elementHeight: formElem.offsetHeight,
            elementAlreadySet: true,
            elementContent: this.sanitizeContent(formElem),
            time: time
        };
        //If searchForm, save search param too
        if (this.isSearchForm(formElem)) {
            this.report["searchQuery"] = $(formElem)
                .find("input, textarea")
                .not(
                    ":input[type=button], :input[type=submit], :input[type=hidden], :input[type=reset]"
                )
                .val();
            localStorage.setItem("formSearchHashCode", JSON.stringify(this.report));
        }
        localStorage.setItem("formSubmissionHashCode", JSON.stringify(this.report));
        localStorage.setItem(
            "emptyInputs",
            JSON.stringify({
                emptyTextInputs: emptyInputs
            })
        );
        setTimeout(this.timeoutForFormSubmissionEllapsed(formElem), this.fv_tolerance);
    }

    timeoutForFormSubmissionEllapsed(formElem) {
        var newHash = this.hashCodeFor($(document).text());
        this.submitted = false;
        // validation = newHash != this.currentHash;
        var failed = this.report.isSearchForm ? "false" : "true";
        var extraParameters = {
            failed: failed,
            validation: "client",
            emptyTextInputs: this.getEmptyInputs(formElem)
        };
        this.logEvent("FormSubmission", {
            info: $.extend(this.report, extraParameters)
        });
    }

    isSearchForm(form) {
        var found = false;
        for (let i = this.searchTerms.length - 1; i >= 0; i--)
            found =
                found ||
                form.outerHTML.toLowerCase().indexOf(this.searchTerms[i]) != -1;
        return found;
    }

    hashCodeFor(string) {
        var hash = 0;
        var len = string.length;
        if (len == 0) return hash;
        for (let i = 0; i < string.length; i++) {
            let char = string.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
}
