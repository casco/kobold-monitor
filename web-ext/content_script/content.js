/**
 * rmcRequest is a remote method call (RMC) with the following form:
 * 
 *  { methodName: 'messageX', arguments: { arg1: 'value', arg2: 'value'}}
 * 
 *  messageX: must be one of the messages that the ContentFacade object understands. 
 *  arguments: is an object 
 */

browser.runtime.onMessage.addListener(rmcRequest => {return ContentFacade.getSingleton().handle(rmcRequest)} );


