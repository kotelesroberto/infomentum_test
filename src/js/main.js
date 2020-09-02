// ==========================================================================
// Infomentum Test Solution
// ==========================================================================


// ==========================================================================
// Scripts, helper widgets
// ==========================================================================
import Common from "../js/components/common.js";
import Templates from "../js/components/templates.js";


var INFOMENTUM_FORM = {

    // 
    // Defining variables
    // ==========================================================================
    compiled: '',
    questionData: [[QUESTIONDATA]],
    resultsData: [[RESULTSDATA]],
    appData: {
        "panel": "landing",
        "question_step": 0,
        "results": {
            "age": 0,
            "answers": []
        }
    },


    // ==========================================================================
    // Init
    // ==========================================================================
    init: function() {
      var _self = this;

      _self.common = new Common();
      _self.templates = new Templates( _self.questionData, _self.resultsData );
      
      _self.common.defineWindowLog();
      log('XXX - init');

      _self.initLanding();
    },

    // 
    // Very first page that is Landing page
    // ==========================================================================
    initLanding: function() {
      var _self = this;
      log('XXX - startTheProject');

      _self.initEvents();
    },


    //
    // Initialise events for each screens
    // ==========================================================================
    initEvents: function() {
        let _self = this;
        log('XXX - initEvents: ' + _self.appData.panel);

        switch ( _self.appData.panel ) {

            case 'question':
                
                // previous button
                document.getElementById("previous-slide").addEventListener("click", (event) => {
                  log('go to previous slide');
                  if( _self.appData.question_step > 0) {
                      _self.appData.question_step--;
                      _self.loadTemplate('question')
                  }
                });

                // next button
                document.getElementById("next-slide").addEventListener("click", (event) => {
                  log('go to next slide');
                  
                  console.log( _self.appData.question_step + " ___ " + (_self.questionData.length - 1) );
                  if( _self.appData.question_step < _self.questionData.length - 1 ) {
                      _self.appData.question_step++;
                      _self.loadTemplate('question')
                  } else if( _self.appData.question_step === _self.questionData.length - 1 ) {
                      log('let us show the result!');
                      _self.loadTemplate('results');
                  }
                });

                // answers
                document.getElementById("survey").querySelectorAll(".panel-answer").forEach(element => element.addEventListener("click", (event) => {
                  
                  log(_self.appData);
                  log('item clicked and score is: ' + event.target.getAttribute('data-score') );

                  // remove selected state of previously selected items
                  document.getElementById("survey").querySelectorAll(".panel-answer.selected").forEach(element => element.classList.remove('selected') );
                  
                  //add seleted status to this item
                  event.target.classList.add('selected');

                  // save answer
                  if( !_self.appData.question_step  ) {
                      _self.appData.results.age = event.target.getAttribute('data-score');
                  } else {
                      _self.appData.results.answers[ _self.appData.question_step -1 ] = event.target.getAttribute('data-score');
                  }
                }));

                break; 

            case 'results':
                // no interested
                document.getElementById('hear-no').addEventListener("click", (event) => {
                  log('hear-no');
                  _self.loadTemplate('final');
                });

                // interested
                document.getElementById('hear-yes').addEventListener("click", (event) => {
                  log('hear-yes');
                  document.getElementById("survey").querySelectorAll(".popup-overlay").forEach(element => element.classList.add('active') );
                  document.getElementById("survey").querySelectorAll(".popup").forEach(element => element.classList.add('active') );
                });
                break; 

            case 'final':
                break; 

            case 'landing':
            default:

                // unsubscribe trigger
                document.getElementById('unsubscribe').addEventListener("click", (event) => {
                  log('unsubscribe');
                  document.getElementById("survey").querySelectorAll(".popup-overlay").forEach(element => element.classList.add('active') );
                  document.getElementById("survey").querySelectorAll(".popup").forEach(element => element.classList.add('active') );
                });

                // start the survey button
                document.getElementById('start-form').addEventListener("click", (event) => {
                  log('start');
                  _self.loadTemplate('question')
                });

                // elements in the popup modal
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

                    // reset input and all of belonging elements
                    document.getElementById("survey").querySelectorAll(".popup-body .valid").forEach(element => element.classList.remove('valid') );
                    document.getElementById("survey").querySelectorAll(".popup-body .error").forEach(element => element.classList.remove('error') );
                    document.getElementById('email_unsubscribe').value = '';
                });

                break;
        }

    },



    //
    // Build template by JavaScript.
    // @elm: string, name of panel to show 
    // ==========================================================================
    loadTemplate: function( elm ) {
        let _self = this,
            compiled = '',
            container = document.getElementById('populatedArea');

        log('XXX - loadTemplate: ' + elm);

        _self.appData.panel = elm;

        switch (elm) {
            case 'landing':
                break; 

            case 'question':
                compiled = _self.templates.buildTemplate__Question( _self.appData );
                break; 

            case 'results':
                compiled = _self.templates.buildTemplate__Question( _self.appData );
                break; 

            case 'final':
                break; 

        }
        
        container.innerHTML = compiled;
        _self.initEvents();
        _self.setCounter();

    },


    setCounter: function() {
        var _self = this;
        log('XXX - setCounter');

        let counter = document.getElementById('step-counter');
        let stepCurrent = document.getElementById('step-counter--current');
        let stepTotal = document.getElementById('step-counter--total');

        if( _self.appData.panel === 'question' ) {
            stepCurrent.innerHTML = _self.appData.question_step + 1;
            stepTotal.innerHTML = _self.questionData.length;
            counter.classList.add('active');
        } else {
            counter.classList.remove('active');
        }
    },

// ==========================================================================
// Landing page
// ==========================================================================
    
    //
    // Handle unsubscription request
    // --------------------------------------------------------------------------
    submitUnsubscription: function(email) {
        log('unsubscribed: ' + email);
        alert('Unsubscription is done! TODO: call a service that removes email from database');
    },

// ==========================================================================
// Questions
// ==========================================================================


// ==========================================================================
// Resolution
// ==========================================================================


// ==========================================================================
// Final message
// ==========================================================================

    

}



// ==========================================================================
// Load INIT
// ==========================================================================
INFOMENTUM_FORM.init()