// ==========================================================================
// Template builder functions
// ==========================================================================


export default class Templates {

    /* Constructor */
    constructor( questionData, resultsData ) {
        var _this = this;
        _this.init( questionData, resultsData );

        console.log( '{{webpage.title}}' );
    }

    init( questionData, resultsData ) {
      var _this = this;
      _this.questionData = questionData;
      _this.resultsData = resultsData;
    }
    

    // 
    // Template: question
    // ==========================================================================
    buildTemplate__Question( appData ) {
      let _this = this,
          item,
          leftColClass = 'col col-8',
          rightColClass = 'col col-4 text-center',
          rightImgClass = 'box-body--img',
          titleClass = 'panel-title';

      // appData.panel
      if( appData.panel === 'question' ) {

        item = _this.questionData[ appData.question_step ];

      } else if( appData.panel === 'results' ) {

        let answerScore = appData.results.answers.reduce( (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue) );
        let finalScore = appData.results.age * answerScore;
        let resultIndex = 0;

        if( finalScore < 5 ) {
          resultIndex = 0;
        } else if( 5 <= finalScore && finalScore <= 10) {
          resultIndex = 1;
        } else if( 10 < finalScore ) {
          resultIndex = 2;
        }

        log('finalScore: ' + finalScore);
        log('resultIndex: ' + resultIndex);

        item = _this.resultsData.results[ resultIndex ];
        leftColClass = 'col col-6 v-middle';
        rightColClass = 'col col-6 text-center';
        rightImgClass = 'box-body--img max-90p';
        titleClass = 'bg-line-50-bottom';
      }

      let temp = `<div class="panel-item box">

                      <div class="box-header">
                        <img class="box-header--img" src="{{images.logo.desktop}}" data-desktop-src="{{images.logo.desktop}}" data-mobile-src="{{images.logo.mobile}}" alt="{{images.logo.alt}}" aria-label="{{images.logo.alt}}" role="img"/>
                      </div>

                      <div class="box-body">

                        <div class="row">
                          <div class="${leftColClass}">

                            <h2 class="${titleClass}" aria-label="${item.title}">`;

                            if( appData.panel === 'question' ) {
                                temp += `<span>${item.id}.</span>`;
                            }

                            temp += item.title;
                            temp += `</h2>`;

                            if( appData.panel === 'results' ) {
                              temp += item.content;
                            }
                            

                   if( item.answers ) {
                     // START ITERATION
                     temp += `<div class="panel-answers ${item.type}">`;
     
                              item.answers.map( item => {

                                 temp += `<div class="panel-answer ${ item.class ? item.class : '' }" data-score="${item.score}" aria-label="${item.label}">`;

                                   if( item.icon ) {
                                     temp += `<span class="panel-icon ${item.icon}"></span>`;
                                   }

                                   temp += `<span class="panel-label">${item.label}</span>
                                            <span class="panel-sublabel">${item.sublabel}</span>
                                          </div>`;
                              }); 


                      temp += `</div>`;
                      // END OF ITERATION
                   }


                    temp += `</div>
                          <div class="${rightColClass}">
                              <img class="${rightImgClass}" src="${item.image.desktop}" data-desktop-src="${item.image.desktop}" data-mobile-src="${item.image.mobile}" alt="${item.image.alt}" />
                          </div>
                        </div>

                      </div>
                      

                      <div class="box-footer">
                        <div class="box-footer-inner ${ appData.panel === 'results' ? 'separator' : '' }">`;


                   if( appData.panel === 'question' ) {
                    temp += `<div class="row">
                               <div class="col col-12">
                                <button class="button button--round button--grey tiny ${ appData.question_step === 0 ? 'disabled' : '' }" id="previous-slide" aria-label="{{previous}}">
                                    {{previous}}
                                </button>
                                
                                <button class="button button--round button--green tiny" id="next-slide" aria-label="{{next}}">
                                    {{next}}
                                </button>
                              </div>
                            </div>`;

                   } else if( appData.panel === 'results' ) {
                     temp += `<div class="row">
                                <div class="col col-12 h-middle">
                                  <p>${_this.resultsData.areyouinterested}</p>      
                                </div>
                              </div>

                              <div class="row">
                                <div class="col col-12 h-middle">
                                  <button class="button button--round button--grey tiny" id="hear-no" aria-label="${_this.resultsData.no}">
                                    ${_this.resultsData.no}
                                  </button>
                                  
                                  <button class="button button--round button--green tiny" id="hear-yes" aria-label="${_this.resultsData.yes}">
                                    ${_this.resultsData.yes}
                                  </button>
                                </div>
                              </div>`;
                   }


                   temp += `</div>
                      </div>
                      
                  </div>`;

      return temp;

    }
  
}