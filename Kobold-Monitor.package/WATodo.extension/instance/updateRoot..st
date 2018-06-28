*Kobold-Monitor
updateRoot: anHtmlRoot
	super updateRoot: anHtmlRoot.
	anHtmlRoot javascript url: KoboldMonitorTempFileLibrary / #loggerJs.