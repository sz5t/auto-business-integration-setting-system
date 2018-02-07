/**
Cookie consent init
**/

var CookieConsent = function () {

    var _init = function () {
        $('.mt-cookie-consent-bar').cookieBar({ 
            closeButton : '.mt-cookie-consent-btn' 
        });
    };

    return {
        init: function () {
            _init();
        }
    };

}();
jQuery(document).ready(function() {
  CookieConsent.init();
});
