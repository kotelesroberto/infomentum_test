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
      // _self.addtoDOM();

      _self.initEvents();
    },

    initEvents: function( elm ) {

        var _self = this;

        switch (elm) {

            case 'step1':
                break; 

            case 'landing':
            default:

                document.getElementById('unsubscribe').addEventListener("click", (event) => {
                  log('unsubscribe');
                  document.getElementById("survey").querySelectorAll(".popup-overlay").forEach(element => element.classList.add('active') );
                  document.getElementById("survey").querySelectorAll(".popup").forEach(element => element.classList.add('active') );
                });

                document.getElementById('start-form').addEventListener("click", (event) => {
                  log('start');
                });

                document.getElementById('email_unsubscribe').addEventListener('keyup', (event) => {
                    
                    let key = event.keyCode || event.which,
                        inputField = document.getElementById('email_unsubscribe'),
                        inputValue = event.target.value;

                    // enter press
                    if( key === 13) {
                        log('enter pressed');
                        if( _self.common.validateEmail(inputValue) ) {
                            // valid email
                            log('valid email');
                            inputField.classList.remove('error');
                            inputField.classList.add('valid');
                            inputField.parentElement.classList.add('valid');

                            // send form
                            _self.submitUnsubscription(inputValue);
                        } else {
                            // invalid email
                            log('invalid email');
                            inputField.classList.add('error');
                            inputField.classList.remove('valid');
                            inputField.parentElement.classList.remove('valid');
                        }
                    } else {
                        // non-enter key
                        if( _self.common.validateEmail(inputValue) ) {
                            // valid email
                            log('valid email');
                            inputField.classList.remove('error');
                            inputField.classList.add('valid');
                            inputField.parentElement.classList.add('valid');
                        } else {
                            // invalid email
                            log('invalid email');
                            // inputField.classList.add('error');
                            inputField.classList.remove('valid');
                            inputField.parentElement.classList.remove('valid');
                        }

                    }
                });

                document.getElementById('doUnsubscribe').addEventListener("click", (event) => {
                    event.preventDefault();

                    let inputValue = document.getElementById('email_unsubscribe').value;
                    
                    // send form
                    INFOMENTUM_FORM.submitUnsubscription(inputValue);
                });


                document.getElementById('popup--close').addEventListener("click", function(){
                    log('popup--close');
                    // close popup by remove active class
                    document.getElementById("survey").querySelectorAll(".popup-overlay.active").forEach(element => element.classList.remove('active') );
                    document.getElementById("survey").querySelectorAll(".popup.active").forEach(element => element.classList.remove('active') );

                    // reset input and all of belongings
                    document.getElementById("survey").querySelectorAll(".popup-body .valid").forEach(element => element.classList.remove('valid') );
                    document.getElementById("survey").querySelectorAll(".popup-body .error").forEach(element => element.classList.remove('error') );
                    document.getElementById('email_unsubscribe').value = '';
                });

                break;
        }

    },


    submitUnsubscription: function(email) {
        log('unsubscribed: ' + email)
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