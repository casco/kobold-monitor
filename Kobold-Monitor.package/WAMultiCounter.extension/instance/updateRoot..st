*Kobold-Monitor
updateRoot: anHtmlRoot
	super updateRoot: anHtmlRoot.
	anHtmlRoot javascript url: KoboldMonitorTempFileLibrary / #jqueryJs.
	anHtmlRoot javascript url: KoboldMonitorTempFileLibrary / #jqueryhtmlCleanminJs.
	anHtmlRoot javascript url: KoboldMonitorTempFileLibrary / #loggerJs