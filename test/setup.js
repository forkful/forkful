var jsdom = require('jsdom');
// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
global.document = jsdom.jsdom('<!doctype html><html><body><div id="app"></div></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
