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

    function initBookmarklet() {

        function show_words(words) {
            $.each(words, function(i, word) {
                $rsvp.queue(function(next) {
                    $rsvp.text(word);
                    index = i;
                    next();
                }).delay(1000/speed);
            });
        }

        function toggle_pause(stop) {
            if (queue && !stop) {
                $rsvp.queue(queue).dequeue();
                queue = null;
            } else {
                queue = $rsvp.queue();
                $rsvp.queue([]);
            }
        }

        $('head').append('<style>'
                         + '#rsvp {'
                         + '  position: absolute;'
                         + '  top: 0; left: 0;'
                         + '  width: 100%;'
                         + '  text-align: center;'
                         + '  font-size: 50;'
                         + '  color: white;'
                         + '  background: rgba(0,0,0,0.8);'
                         + '}'
                         + '</style>');
        $('body').append("<div id='rsvp'></div>");
        var $rsvp = $("#rsvp");

        // Click the RSVP bar to close it
        $rsvp.click(function (ev) {
            $rsvp.remove();
        });

        // Spacebar to pause
        var queue;
        $("body").keypress(function(event) {
            console.log(event.which);
            if ( event.which == 32 ) {
                event.preventDefault();
                toggle_pause();
            }
        });
        var index = 0;
        var selection = sel(document).toString();
        var words = selection.split(/\s+/g);

        show_words(words);

    }

})();
