// ==========================================================================
// Common functions
// ==========================================================================

export default class Common {

    /* Constructor */
    constructor( config ) {
        var _this = this;
        _this.init( config );
    }

    init( config ) {
      var _this = this;
      _this.config = config;
    }
    

    // 
    // Overdefine window log function
    // ==========================================================================
    defineWindowLog() {

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
    }
    
    // 
    // Get parameters from URL
    // ==========================================================================
    getParam(param) {
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
    }


    // 
    // Resize window
    // ==========================================================================
    resizeWindow() {
      var _self = this;

      window.onresize = function(event) {
        // as new elements added to panel we need to resize window to activate amend height of Product Panels
        setTimeout(function() {
          log('window resized');
          _self.setBodyPaddingBottom();
        }, 100);
      };

    }

    //
    // Image loader
    // @imgElement: image element in DOM (object)
    // @imgSrc: path of image to load (string)
    // --------------------------------------------------------------------------
    loadImage( imgElement, imgSrc ) {
        let _self = this,
            image = new Image();

        imgElement.classList.add('loading');
        imgElement.src = '';
           
        image.onload = function(){
          imgElement.src = imgSrc;
          imgElement.classList.remove('loading');
        };

        image.src = imgSrc;

        // fireing load event for cached images
        if (image.complete) {
          image.load();
        }
    }

    //
    // Smooth scroll to a point of the page
    // --------------------------------------------------------------------------
    scrollBodyTo( pos ) {
      window.scroll({
        top: pos,
        behavior: 'smooth'
      });
    }

    // 
    // Timestamp
    // ==========================================================================
    getCB() {
      // get cache buster
      var now = new Date();

      var year = now.getFullYear(),
              month = now.getMonth() + 1, // months are zero indexed
              day = now.getDate(),
              hour = now.getHours(),
              minute = now.getMinutes(),
              second = now.getSeconds();

      month = month < 10 ? "0" + month : month
      day = day < 10 ? "0" + day : day
      hour = hour < 10 ? "0" + hour : hour
      minute = minute < 10 ? "0" + minute : minute
      second = second < 10 ? "0" + second : second

      var cb = year + "" + month + "" + day + "" + hour + "" + minute + "" + second;

      return cb;
    }


// ==========================================================================
// Set body properties
// ==========================================================================

    setBodyPaddingBottom() {
      log('XXX - setBodyPaddingBottom');

      if( !document.getElementById('panelFooter') ) return;

      // set body's padding at bottom if we are on mobile. Idea: height of fixed footer panel is the value to use. It helps set all content of the page visible.
      if( document.body.offsetWidth < 768) {
          document.body.style.paddingBottom = document.getElementById('panelFooter').offsetHeight + 'px';
      }
    }

// ==========================================================================
// Email magic
// ==========================================================================

    // 
    // Validate email
    // ==========================================================================

    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


// ==========================================================================
// General Script loader
// How to use:

// var l = new Loader();
// l.require(
//     [
//     "url_1", 
//     "url_2"
//     ], 
// function() {
//     log('All Scripts Loaded');
// });
// ==========================================================================
    defineLoader() {
      var Loader = function(){}
      Loader.prototype = {
          require: function (scripts, callback) {
              this.loadCount      = 0;
              this.totalRequired  = scripts.length;
              this.callback       = callback;

              for (var i = 0; i < scripts.length; i++) {
                  this.writeScript(scripts[i]);
              }
          },
          loaded: function (evt) {
              this.loadCount++;
              if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
          },
          writeScript: function (src) {
              var self = this;
              var s = document.createElement('script');
              s.type = "text/javascript";
              s.async = true;
              s.src = src;
              s.addEventListener('load', function (e) { self.loaded(e); }, false);
              var head = document.getElementsByTagName('head')[0];
              head.appendChild(s);
          }
      }

      return Loader;
    }


// ==========================================================================
// Cookie handlers
// ==========================================================================
    setCookie(name, value) {
      log('XXX - setCookie: ' + name);
      document.cookie = name+"="+value;
    }

    setCookieDate(name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }

    getCookie(name) {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
    }

    getCookies(e) {
      log('XXX - getCookie');
        for (var t, o = e + "=", n = document.cookie.split(";"), i = 0, a = n.length; a > i; i++) {
            for (t = n[i]; " " === t.charAt(0); )
                t = t.substring(1);
            if (-1 !== t.indexOf(o))
                return t.substring(o.length, t.length)
        }
        return ""
    }

    deleteCookie(name) { 
      this.setCookieDate(name, '', -1); 
    }
  
}