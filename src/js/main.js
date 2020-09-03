// ==========================================================================
// Infomentum Test Solution
// ==========================================================================


// ==========================================================================
// Scripts, helper widgets
// ==========================================================================
import Common from "../js/components/common.js";
import Templates from "../js/components/templates.js";
import Newsletter from "../js/components/newsletter.js";


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
      _self.newsletter = new Newsletter();
      
      _self.common.defineWindowLog();
      _self.common.resizeWindow();

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

            case 'panelFrame':
                compiled = _self.templates.buildTemplate__Panel();
                container.innerHTML = compiled;
                break; 

            case 'panelFooter':
                document.getElementById('panelFooterInner').innerHTML = _self.templates.buildTemplate__Footer('question', _self.appData.question_step);
                break; 

            case 'question':
                _self.loadQuestion();
                break; 

            case 'results':
                _self.loadResults();
                break; 

            case 'final':
                _self.loadFinal();
                break; 

        }
        
        _self.initEvents();
        _self.setCounter();
        _self.common.scrollBodyTo(0);

    },

    //
    // Initialise events for each screens
    // ==========================================================================
    initEvents: function( elm ) {
        let _self = this,
            step = elm ? elm : _self.appData.panel;

        log('XXX - initEvents: ' + step);

        switch ( step ) {

            case 'panelFrame':
                break; 

            case 'panelFooter':
               
                // previous button
                document.getElementById("previous-slide").addEventListener("click", (event) => {
                  log('go to previous slide');
                  if( _self.appData.question_step > 0) {
                      _self.appData.question_step--;
                      _self.loadTemplate('question');
                  }
                });

                // next button
                document.getElementById("next-slide").addEventListener("click", (event) => {
                  log('go to next slide');
                  
                  if( _self.appData.question_step < _self.questionData.length - 1 ) {
                      _self.appData.question_step++;
                      _self.loadTemplate('question');
                  } else if( _self.appData.question_step === _self.questionData.length - 1 ) {
                      log('let us show the result!');
                      _self.loadTemplate('results');
                  }
                });

                break; 

            case 'question':

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
                      _self.appData.results.answers[ _self.appData.question_step - 1 ] = event.target.getAttribute('data-score');
                  }

                  // remove disabled class from next button
                  document.getElementById('next-slide').classList.remove('disabled');

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
                  log('subscribe');
                  _self.populateModal('subscribe');
                  document.getElementById("survey").querySelectorAll(".popup-overlay").forEach(element => element.classList.add('active') );
                  document.getElementById("survey").querySelectorAll(".popup").forEach(element => element.classList.add('active') );
                });
                break; 

            case 'final':
                break; 


            case 'subscribe':
            case 'unsubscribe':
                // elements in the popup modal

                if( step === 'subscribe' ) {

                    document.getElementById('email_subscribe').addEventListener('keyup', (event) => {
                        let key = event.keyCode || event.which,
                            inputField = document.getElementById('email_subscribe'),
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
                                _self.newsletter.submitSubscription(inputValue);
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

                    document.getElementById('doSubscribe').addEventListener("click", (event) => {
                        event.preventDefault();

                        let inputValue = document.getElementById('email_subscribe').value;
                        
                        // send form
                        _self.newsletter.submitSubscription(inputValue);
                    });

                } else {

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
                                _self.newsletter.submitUnsubscription(inputValue);
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
                        _self.newsletter.submitUnsubscription(inputValue);
                    });

                }

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

            case 'landing':
            default:

                // unsubscribe trigger
                document.getElementById('unsubscribe').addEventListener("click", (event) => {
                  log('unsubscribe');
                  _self.populateModal('unsubscribe');
                  document.getElementById("survey").querySelectorAll(".popup-overlay").forEach(element => element.classList.add('active') );
                  document.getElementById("survey").querySelectorAll(".popup").forEach(element => element.classList.add('active') );
                });

                // start the survey button
                document.getElementById('start-form').addEventListener("click", (event) => {
                  log('start survey');
                  _self.loadTemplate('panelFrame');
                  _self.loadTemplate('panelFooter');
                  _self.loadTemplate('question');
                });

                break;
        }

    },



    


    //
    // Populate modal content
    // --------------------------------------------------------------------------
    populateModal: function( elm ) {
        let _self = this;

        document.getElementById('popupBody').innerHTML = _self.templates.buildTemplate__Modal( elm );
        _self.initEvents(elm);
        
    },

    //
    // Load next question into panel frame
    // --------------------------------------------------------------------------
    loadQuestion: function() {
        let _self = this,
            item = _self.questionData[ _self.appData.question_step ];

        log('item', item);
        
        document.getElementById('panelTitleId').innerHTML = (_self.appData.question_step + 1) + '.';
        document.getElementById('panelTitle').innerHTML = item.title;
        document.getElementById('panelContent').innerHTML = _self.templates.buildTemplate__Answers( item, _self.appData );
        
        // document.getElementById('rightImg').src = item.image.desktop;
        _self.common.loadImage( document.getElementById('rightImg'), item.image.desktop );
        document.getElementById('rightImg').setAttribute('data-desktop-src', item.image.desktop);
        document.getElementById('rightImg').setAttribute('data-mobile-src', item.image.mobile);
        document.getElementById('rightImg').setAttribute('alt', item.image.alt);
        
        //
        // Manage back / next buttons in footer
        // --------------------------------------------------------------------------
            if( !_self.appData.question_step ) {
                // very first question
                if( !_self.appData.results.age ) {
                    // not recorded answer yet
                    document.getElementById('next-slide').classList.add('disabled');
                } else {
                    // we already have answer to this question
                    document.getElementById('next-slide').classList.remove('disabled');
                }
            } else {
                // other questions
                if( _self.appData.results.answers.length  < _self.appData.question_step ) {
                    // not recorded answer yet
                    document.getElementById('next-slide').classList.add('disabled');
                } else {
                    // we already have answer to this question
                    document.getElementById('next-slide').classList.remove('disabled');
                }
            }


            // back button
            if( !_self.appData.question_step ) {
                document.getElementById('previous-slide').classList.add('disabled');
            } else {
                document.getElementById('previous-slide').classList.remove('disabled');
            }

            _self.common.setBodyPaddingBottom();

    },

    //
    // Load survey result
    // --------------------------------------------------------------------------
    loadResults: function() {
        let _self = this,
            answerScore = _self.appData.results.answers.reduce( (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue) ),
            finalScore = _self.appData.results.age * answerScore,
            resultIndex = 0,
            item;

        if( finalScore < 5 ) {
          resultIndex = 0;
        } else if( 5 <= finalScore && finalScore <= 10) {
          resultIndex = 1;
        } else if( 10 < finalScore ) {
          resultIndex = 2;
        }

        log('finalScore: ' + finalScore);
        log('resultIndex: ' + resultIndex);

        // get result based on score calculated above
        item = _self.resultsData.results[ resultIndex ];

        document.getElementById('leftCol').className = 'col col-6 v-middle';
        document.getElementById('rightCol').className = 'col col-6 text-center';
        
        // image
        document.getElementById('rightImg').className = 'box-body--img max-90p';
        // document.getElementById('rightImg').src = item.image.desktop;
        _self.common.loadImage( document.getElementById('rightImg'), item.image.desktop );
        document.getElementById('rightImg').setAttribute('data-desktop-src', item.image.desktop);
        document.getElementById('rightImg').setAttribute('data-mobile-src', item.image.mobile);
        document.getElementById('rightImg').setAttribute('alt', item.image.alt);

        // title
        document.getElementById('panelTitleContainer').className = 'bg-line-50-bottom';
        document.getElementById('panelTitleId').innerHTML = '';
        document.getElementById('panelTitle').innerHTML = item.title;

        // content
        document.getElementById('panelContent').innerHTML = item.content;

        // rebuild footer of panel
        document.getElementById('panelFooterInner').innerHTML = _self.templates.buildTemplate__Footer('results');
        document.getElementById('panelFooterInner').classList.add('separator');

        _self.common.setBodyPaddingBottom();

    },

    //
    // Load final screen: SEE YOU
    // --------------------------------------------------------------------------
    loadFinal: function() {
        let _self = this;

        // image
        // document.getElementById('rightImg').src = "{{final.image.desktop}}";
        _self.common.loadImage( document.getElementById('rightImg'), "{{final.image.desktop}}" );
        document.getElementById('rightImg').setAttribute('data-desktop-src', "{{final.image.desktop}}");
        document.getElementById('rightImg').setAttribute('data-mobile-src', "{{final.image.mobile}}");
        document.getElementById('rightImg').setAttribute('alt', "{{final.image.alt}}");

        // title
        document.getElementById('panelTitle').innerHTML = "{{final.title}}";

        // content
        document.getElementById('panelContent').innerHTML = "{{{final.content}}}";

        // empty footer
        document.getElementById('panelFooter').classList.add('hidden');
        document.getElementById('panelFooterInner').innerHTML = '';
        document.getElementById('panelFooterInner').classList.remove('separator');
        // document.getElementById('panelFooter').remove();
        
    },


    setCounter: function() {
        let _self = this;
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