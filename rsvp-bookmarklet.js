/*
Copyright (c) 2012, Johan Forsberg
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

 *  Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.

 *  Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in
    the documentation and/or other materials provided with the
    distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function(){

    // the minimum version of jQuery we want
    var v = "1.4";

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
	var done = false;
	var script = document.createElement("script");
	script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
	script.onload = script.onreadystatechange = function(){
	    if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
		done = true;
		initBookmarklet();
	    }
	};
	document.getElementsByTagName("head")[0].appendChild(script);
    } else {
	initBookmarklet();
    }

    // Get user selection
    function sel(d) {
        return d.selection ? d.selection.createRange().text : d.getSelection();
    }

    function show_words(words, $el) {
        $.each(words, function() {
            $el.queue(function(next) {
                $el.html(words.shift());
                next();
            }).delay(1000/speed);
        });
    }

    function initBookmarklet() {
        $rsvp = $("#rsvp");
        $('head').append('<style>'
                         + '#rsvp {'
                         + '  position: absolute;'
                         + '  top: 0; left: 0;'
                         + '  width: 100%;'
                         + '  text-align: center;'
                         + '  color: white;'
                         + '  font-size: 50;'
                         + '  background: black;'
                         + '}'
                         + '</style>');
        $('body').append("<div id='rsvp'></div>");

        // Click the RSVP bar to close it
        $rsvp.click(function (ev) {
            $rsvp.remove();
        });

        // Spacebar to pause
        var stopped = false;
        $("body").keypress(function(event) {
            if ( event.which == 32 ) {
                event.preventDefault();
                if (!stopped) {
                    $rsvp.queue([]).stop();
                    stopped = true;
                } else {
                    show_words(words, $rsvp);
                    stopped = false;
                }
            }
        });

        var selection = sel(document).toString();
        var words = selection.split(/\s+/g);
        show_words(words, $rsvp);

    }

})();
