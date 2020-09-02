// ==========================================================================
// Template builder functions
// ==========================================================================


export default class Templates {

    /* Constructor */
    constructor( questionData ) {
        var _this = this;
        _this.init( questionData );

        console.log( '{{webpage.title}}' );
    }

    init( questionData ) {
      var _this = this;
      _this.questionData = questionData;
    }
    

    // 
    // Template: question
    // ==========================================================================
    buildTemplate__Question( appData ) {
      var _this = this;

      // appData.panel
      let question = _this.questionData[ appData.question_step ];

      let temp = `<div class="panel-item box" data-step="{{question.id}}">

                      <div class="box-header">
                        <img class="box-header--img" src="{{images.logo.desktop}}" data-desktop-src="{{images.logo.desktop}}" data-mobile-src="{{images.logo.mobile}}" alt="{{images.logo.alt}}" aria-label="{{images.logo.alt}}" role="img"/>
                      </div>

                      <div class="box-body">

                        <div class="row">
                          <div class="col col-8">

                            <h2 class="panel-title" aria-label="${question.question}">
                                <span>${question.id}.</span> ${question.question}
                            </h2>
                            
                            <div class="panel-answers ${question.type}">`;
   
                            question.answers.map( item => {

                               temp += `<div class="panel-answer" data-score="${item.score}" data-math="${question.op}" aria-label="${item.label}">
                                          <span class="panel-icon ${item.icon}"></span>
                                          <span class="panel-label">${item.label}</span>
                                          <span class="panel-sublabel">${item.sublabel}</span>
                                        </div>`;
                            }); 


                    temp += `</div>

                          </div>
                          <div class="col col-4 text-center">
                              <img class="box-body--img" src="${question.image.desktop}" data-desktop-src="${question.image.desktop}" data-mobile-src="${question.image.mobile}" alt="${question.image.alt}" />
                          </div>
                        </div>

                      </div>
                      

                      <div class="box-footer">
                        <div class="box-footer-inner">

                          <div class="row">
                            <div class="col col-12">
                                
                              <button class="button button--round button--grey tiny ${ appData.question_step === 0 ? 'disabled' : '' }" id="previous-slide" aria-label="{{previous}}">
                                  {{previous}}
                              </button>
                              
                              <button class="button button--round button--green tiny" id="next-slide" aria-label="{{next}}">
                                  {{next}}
                              </button>
                                
                            </div>
                          </div>

                        </div>
                      </div>
                      
                  </div>`;

      return temp;

    }
  
}