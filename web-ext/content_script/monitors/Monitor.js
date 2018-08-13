class Monitor {
    constructor(logger) {
        this.logger = logger;
        this.timer = new ObjectTimer();
    }

    logEvent(event, args) {
        let loc = window.top.location.href;
        this.logger.log(loc, event, args);
    }

    /**
     * My subclasses should implement this method attaching themselves to 
     * the required DOM events
     */
    attach() {

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


    getParents(el, parentSelector /* optional */) {
        // If no parentSelector defined will bubble up all the way to *document*
        if (parentSelector === undefined) {
            parentSelector = document;
        }
        var parents = [];
        var p = el.parentNode;
        while (p !== parentSelector && p != null) {
            var o = p;
            parents.push(o);
            p = o.parentNode;
        }
        parents.push(parentSelector); // Push that parentSelector you wanted to stop at
        return parents;
    }

    getTimeFor(key) {
        return this.timer.getTimeFor(key);
    }

    /**
     * No longer uses Jquery htmlClean plugin
     * @param {} element 
     */
    sanitizeContent(element) {
        var elementCopy = $(element).clone();
        $(elementCopy)
            .find("script")
            .remove();
        return ($(elementCopy)[0].outerHTML);
    }

   // PRIVATE MEHTODS
    getElementIdx(elt) {
        var count = 1;
        for (var sib = elt.previousSibling; sib; sib = sib.previousSibling) {
            if (sib.nodeType == 1 && sib.tagName == elt.tagName) count++;
        }
        return count;
    }
}


class ObjectTimer {
    constructor() {
        this.starTimes = {};
    }

    getTimeFor(key) {
        if (!this.starTimes.hasOwnProperty(key)) {
            this.starTimes[key] = new Date().getTime();
            return 0;
        }
        return new Date().getTime() - this.starTimes[key];
    }
}
