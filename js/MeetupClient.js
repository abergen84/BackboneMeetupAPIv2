(function(window, undefined) { //serves 2 functions: 1) allows undefined to really be undefined and cannot be manipulated by giving it a new value
    "use strict";               //and 2) window is defined here for performance reasons. JS first checks local variables and when not found, switches to global.calling it here locally speeds it up


    var MeetupView = Backbone.View.extend({

        tagname: "div",
        className: "meetups",
        initialize: function(opts) {

            //console.log(opts);

            this.options = _.extend( //extend here takes the brand new object on line 11, and places line 13 in it, as well as line 15
                {}, {
                    $container: $('body')
                },
                opts
            );
            //console.log(this.options);
            this.options.$container.append(this.el);

            this.render();
        },

        template: "<div class='table'><h3>{name}</h3><hr><p>{description}</p></div>",
        
        render: function() {
        	//console.log(this.model.attributes);
            this.el.innerHTML = _.template(this.template, this.model.attributes);
        }
    });

    var meetupListing = Backbone.Model.extend({

        initialize: function(opts) {
            this.view = new MeetupView({
                model: this
            });
        }
    });

    var MeetupAllListings = Backbone.Collection.extend({
        
        createInputObject: function() {     //here i create an input object that takes in both the zip code and area of interest, and
            var input = {};                 //places it beneath, in the URL function
            $(':input').each(function() {   //finds all inputs via jQuery method, and for each input it finds, take that value and 
                input[this.name] = this.value;  //place into the empty object called "input"
            });
            console.log(input);
            return input;
        },

        model: meetupListing,
        
        apikey: "284b6a257c7c73785101a423976502c",
        
        url: function() {
        	
        	var input = this.createInputObject();
            return [
                "http://api.meetup.com/2/groups.json/",
                "?zip=",
                input.zipcode,
                "&topic=",
                input.group,
                "&order=members&key=",
                this.apikey,
                "&callback=?"
            ].join('');
        },
        
        parse: function(data) {
            return data.results;
        }
    });


    function MeetupClient(options) {

        this.meetupCollection = new MeetupAllListings();  //Starting point of program. Calling an instance of the collection.

        this.Routing();  //also calling the function "routing", below.
    }


    MeetupClient.prototype.Routing = function() {

        var self = this;

        Path.map("#/results").to(function() {    //when a user clicks submit on the page, it triggers the fetch of the collection (line 80)

            self.meetupCollection.fetch();
        });

        Path.root("#/");
        Path.listen();

    };


    window.MeetupClient = MeetupClient;

})(window, undefined);





// ORIGINAL WORKING CODE BEFORE ASKING FOR USER INPUT
// 
// (function(window, undefined){
// 	"use strict";

// 	var meetupView = Backbone.View.extend({

// 		tagname: "div",
// 		className: "meetups",
// 		initialize: function(opts){

// 			this.options = _.extend(
// 				{},
// 				{
// 					$container: $('body')
// 				},
// 				opts
// 				);

// 			this.options.$container.append(this.el);

// 			this.render();
// 		},

// 		//template: "<h3>{name}</h3><hr><h6>{description}</h6>",
// 		template: "<h3>{name}</h3><hr><p>{description}</p>",
// 		render: function(){
// 			this.el.innerHTML = _.template(this.template, this.options);
// 		}
// 	})


// function MeetupClient(options){

// 	this.options = {apikey: "284b6a257c7c73785101a423976502c"};

// 	this.init();
// }

// // MeetupClient.prototype.createInputObject = function(){

// // 	var input = {};
// // 	$(':input').each(function(){
// // 		input[this.name] = this.value;
// // 	})
// // 	console.log(input);
// // 	return input;
// // }

// MeetupClient.prototype.queryAPI = function(zipcode, search_term){

// 	var input = this.createInputObject();

// 	var url = [ "http://api.meetup.com/2/groups.json/",
// 				"?zip=",
// 				zipcode,
// 				//input.zipcode,
// 				"&topic=",
// 				search_term,
// 				//input.group,
// 				"&order=members&key=",
// 				this.options.apikey,
// 				"&callback=?" 

// 				];

// 	return $.getJSON(url.join('')).then(function(data){
// 		//console.log(data);
// 		return data;
// 	});

// };

// MeetupClient.prototype.makeRequest = function(){

// 	$.when(this.queryAPI("77002", "javascript")
// 		).then(function(data){

// 			console.log(data);

// 			arguments[0].results.forEach(function(data){
// 				new meetupView(data);
// 			})

// 		});
// };

// MeetupClient.prototype.init = function(){

// 	var self = this;

// 		self.makeRequest();


// };


// window.MeetupClient = MeetupClient;

// }) (window, undefined);

// // MeetupClient.prototype.getGeo = function(){

// // 	var promise = $.Deferred();

// // 	navigator.geolocation.getCurrentPosition(function(){
// // 		promise.resolve(arguments[0]);
// // 	});

// // 	console.log(promise);
// // 	return promise;
// // };



// // MeetupClient.prototype.Routing = function(){

// // 	var self = this;

// // 	Path.map("#/results").to(function(){
// // 		$.when()
// // 	})
// // };
