/**********************************************
 ===============================================
 **** The Almighty Handlebars Helpers File! ****
 ===============================================
 ***********************************************/

if (typeof module !== 'undefined') {
	module.exports.register = function (Handlebars) {

		/**
		 * If Divisible By
		 *        Returns back the options passed to it if the number passed to it is divisible by the input passed to it.
		 ***/
		Handlebars.registerHelper('if_divisible_by', function (number, input, options) {
			var fnTrue = options.fn,
				fnFalse = options.inverse;

			return input % number === 1 ? fnTrue(this) : fnFalse(this);
		});

		/**
		 * If Equals
		 *        Handlebars if with parameter value input.
		 ***/
		Handlebars.registerHelper('if_equals', function (v1, v2, options) {
			if (v1 === v2) {
				return options.fn(this);
			}
			return options.inverse(this);
		});

		/**
		 * Load Layout
		 *        Returns back one of the partials based on the slug & context (object data) passed to it
		 ***/
		Handlebars.registerHelper('load_layout', function (slug, json) {
			var fs = require("fs");

			var contents = fs.readFileSync('./src/data/' + json + ".json");
			var jsonContent = JSON.parse(contents);
			var loadedPartial = Handlebars.partials[slug];
			return new Handlebars.SafeString(loadedPartial(jsonContent));
		});

		/**
		 * JSON
		 *        Returns back JS object when passed in a Handlebars object
		 ***/
		Handlebars.registerHelper('json', function (context) {
			return JSON.stringify(context);
		});

		/**
		 * Object Length
		 *        Returns back length of object passed in.
		 ***/
		Handlebars.registerHelper("object_length", function (obj) {
			return Object.keys(obj).length;
		});

		/**
		 * Slugify
		 *      Returns slug version of string passed in
		 ***/
		Handlebars.registerHelper('slugify', function (str) {
			if (str) {
				var slug = str.replace(/[^\w\s]+/gi, '').replace(/ +/gi, '-');
				return slug.toLowerCase();
			}
			return '';
		});

		/**
		 * To Lower Case
		 *        Returns back the string passed in, in lower case
		 ***/
		Handlebars.registerHelper('to_lower_case', function (str) {
			if (str) {
				return str.toLowerCase();
			}
			return '';

		});



		Handlebars.registerHelper('if_eq', function (lvalue, rvalue, options) {
		    if (arguments.length < 3)
		        throw new Error("Handlebars Helper equal needs 2 parameters");
		    if( lvalue!=rvalue ) {
		        return options.inverse(this);
		    } else {
		        return options.fn(this);
		    }
		});

		Handlebars.registerHelper('ifCond', function(v1, v2, options) {
		  if(v1 === v2) {
		    return options.fn(this);
		  }
		  return options.inverse(this);
		});


		Handlebars.registerHelper('times', function(n, block) {
		    var accum = '';
		    for(var i = 0; i < n; ++i)
		        accum += block.fn(i);
		    return accum;
		});


		Handlebars.registerHelper('ifIn', function(elem, list, options) {
		  if(list.indexOf(elem) > -1) {
		    return options.fn(this);
		  }
		  return options.inverse(this);
		});


	};
}
