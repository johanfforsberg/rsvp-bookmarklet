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
