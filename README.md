rsvp-bookmarklet
================

A browser bookmarklet for rapid serial visual presentation

Use it by adding a bookmark to your browser with a URL something like this:

javascript:(function(){speed=2;document.body.appendChild(document.createElement('script')).src='http://localhost:8000/rsvp-bookmarklet.js';})();

(assuming that the rsvp-bookmarklet.js is available at localhost:8000)

Then mark some text and activate the bookmark. You can pause the display with spacebar.
