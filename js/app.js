
    window.onload = app;

    // runs when the DOM is loaded
    function app(){

        // load some scripts (uses promises :D)
        loader.load(
            {url: "./bower_components/jquery/dist/jquery.min.js"},
            {url: "./bower_components/lodash/dist/lodash.min.js"},
            {url: "./bower_components/backbone/backbone.js"},
            {url: "./bower_components/pathjs/path.min.js"},
            {url: "./js/MeetupClient.js"},
            {url: "./dist/style.css"}
        ).then(function(){
            _.templateSettings.interpolate = /{([\s\S]+?)}/g;

            var client = new MeetupClient();

            // start app?
        });

    }