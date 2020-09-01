// ==========================================================================
// Infomentum Test Solution
// ==========================================================================


// ==========================================================================
// Scripts, helper widgets
// ==========================================================================
import Common from "../js/components/common.js";


var INFOMENTUM_FORM = {

    // ==========================================================================
    // Defining variables
    // ==========================================================================
    compiled: '',
    questionData: [[QUESTIONDATA]],

    // ==========================================================================
    // Overdefine window log function
    // ==========================================================================
    defineWindowLog: function() {

        var _self = this;

        window.log = function (...options) {
            var name = 'Infomentum';

            if ( _self.getParam('debug') === 'true' ) {
                window.log.history = log.history || [];
                window.log.history.push(options);

                options.unshift( '%c' + name, 'color: green; font-weight: bold; text-decoration: underline; text-decoration-style: dotted;' );

                if (window.console) {
                    console.log.apply(console, options);
                }
        
            }
        }
    },
    
    // ==========================================================================
    // Get parameters from URL
    // ==========================================================================
    getParam: function(param) {
        var pageURL = window.location.search.substring(1);
        var URLVariables = pageURL.split('&');

        // log('Query string values:');

        for(var i = 0; i < URLVariables.length; i++) {
            var queryString = URLVariables[i].split('=');

            // log('Key: ' + queryString[0] + ', Value:  ' + queryString[1]);

            if (queryString[0] == param) {
                return queryString[1];
            }
        }
    },


    // ==========================================================================
    // Init
    // ==========================================================================
    init: function() {

      this.defineWindowLog();
      log('XXX - init');

      var _self = this;

      _self.common = new Common();
      _self.startTheProject();
    },

    // ==========================================================================
    // YOUR FUNCTIONS
    // ==========================================================================

    startTheProject: function() {
      var _self = this;

      log('XXX - startTheProject');

      _self.buildTable();
      _self.addtoDOM();
    },


    // ==========================================================================
    // Managing the HTML markup
    // ==========================================================================
    buildTable: function() {

        var _self = this;

        _self.compiled = '<section id="spec-header" class="container">' +
                            '<div class="container--inner">' +
                                ' TEST ' +
                            ' </div> ' +
                         '</section>';

    },

    addtoDOM: function() {
        var _self = this;

        var populatedArea = document.getElementById('populatedArea');
        populatedArea.innerHTML = _self.compiled;
    }
    
    

}



// ==========================================================================
// Load INIT
// ==========================================================================
INFOMENTUM_FORM.init()