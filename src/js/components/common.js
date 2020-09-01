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
      log('Common init');
      var _this = this;
      _this.config = config;
    }
    

    // ==========================================================================
    // Resize window
    // ==========================================================================
    resizeWindow() {
      // as new elements added to panel we need to resize window to activate amend height of Product Panels
      setTimeout(function() {
        $(window).resize();
        log('window resized');
      }, 100);
    }

    // ==========================================================================
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