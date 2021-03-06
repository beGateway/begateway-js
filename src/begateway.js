(function () {
  "use strict";

  Sentry.init({ dsn: 'https://ce8fc9d5a4854150b75072cac825e36a@sentry.ecomcharge.com/14' });
  var $bgw = jQuery.noConflict();

  function cssStyleForSpinner() {
    return "#circularGbeGateway{position:relative;width:58px;height:58px;margin:auto}.circularGbeGateway{position:absolute;background-color:#000;width:14px;height:14px;border-radius:9px;-o-border-radius:9px;-ms-border-radius:9px;-webkit-border-radius:9px;-moz-border-radius:9px;animation-name:bounce_circularGbeGateway;-o-animation-name:bounce_circularGbeGateway;-ms-animation-name:bounce_circularGbeGateway;-webkit-animation-name:bounce_circularGbeGateway;-moz-animation-name:bounce_circularGbeGateway;animation-duration:1.1s;-o-animation-duration:1.1s;-ms-animation-duration:1.1s;-webkit-animation-duration:1.1s;-moz-animation-duration:1.1s;animation-iteration-count:infinite;-o-animation-iteration-count:infinite;-ms-animation-iteration-count:infinite;-webkit-animation-iteration-count:infinite;-moz-animation-iteration-count:infinite;animation-direction:normal;-o-animation-direction:normal;-ms-animation-direction:normal;-webkit-animation-direction:normal;-moz-animation-direction:normal}#circularGbeGateway_1{left:0;top:23px;animation-delay:.41s;-o-animation-delay:.41s;-ms-animation-delay:.41s;-webkit-animation-delay:.41s;-moz-animation-delay:.41s}#circularGbeGateway_2{left:6px;top:6px;animation-delay:.55s;-o-animation-delay:.55s;-ms-animation-delay:.55s;-webkit-animation-delay:.55s;-moz-animation-delay:.55s}#circularGbeGateway_3{top:0;left:23px;animation-delay:.69s;-o-animation-delay:.69s;-ms-animation-delay:.69s;-webkit-animation-delay:.69s;-moz-animation-delay:.69s}#circularGbeGateway_4{right:6px;top:6px;animation-delay:.83s;-o-animation-delay:.83s;-ms-animation-delay:.83s;-webkit-animation-delay:.83s;-moz-animation-delay:.83s}#circularGbeGateway_5{right:0;top:23px;animation-delay:.97s;-o-animation-delay:.97s;-ms-animation-delay:.97s;-webkit-animation-delay:.97s;-moz-animation-delay:.97s}#circularGbeGateway_6{right:6px;bottom:6px;animation-delay:1.1s;-o-animation-delay:1.1s;-ms-animation-delay:1.1s;-webkit-animation-delay:1.1s;-moz-animation-delay:1.1s}#circularGbeGateway_7{left:23px;bottom:0;animation-delay:1.24s;-o-animation-delay:1.24s;-ms-animation-delay:1.24s;-webkit-animation-delay:1.24s;-moz-animation-delay:1.24s}#circularGbeGateway_8{left:6px;bottom:6px;animation-delay:1.38s;-o-animation-delay:1.38s;-ms-animation-delay:1.38s;-webkit-animation-delay:1.38s;-moz-animation-delay:1.38s}@keyframes bounce_circularGbeGateway{0%{transform:scale(1)}100%{transform:scale(.3)}}@-o-keyframes bounce_circularGbeGateway{0%{-o-transform:scale(1)}100%{-o-transform:scale(.3)}}@-ms-keyframes bounce_circularGbeGateway{0%{-ms-transform:scale(1)}100%{-ms-transform:scale(.3)}}@-webkit-keyframes bounce_circularGbeGateway{0%{-webkit-transform:scale(1)}100%{-webkit-transform:scale(.3)}}@-moz-keyframes bounce_circularGbeGateway{0%{-moz-transform:scale(1)}100%{-moz-transform:scale(.3)}}"
  }
  function cssDivWithSpinner() {
    return "<div class='beGatewaySpinner'><div id='circularGbeGateway'><div id='circularGbeGateway_1' class='circularGbeGateway'></div><div id='circularGbeGateway_2' class='circularGbeGateway'></div><div id='circularGbeGateway_3' class='circularGbeGateway'></div><div id='circularGbeGateway_4' class='circularGbeGateway'></div><div id='circularGbeGateway_5' class='circularGbeGateway'></div><div id='circularGbeGateway_6' class='circularGbeGateway'></div><div id='circularGbeGateway_7' class='circularGbeGateway'></div><div id='circularGbeGateway_8' class='circularGbeGateway'></div></div></div></div>";
  }
  function appendStyle() {
    $bgw('<style type="text/css">' + cssStyleForSpinner() + '</style>').appendTo($bgw('head'));
  }

  function getTokenFromURL(url) {
    var query = url.split('?')[1] || '';
    var params = query.split('&');
    var token = undefined;
    params.forEach(function (paramStr) {
      var param = paramStr.split('=') || [];
      if (param[0] && param[1] && param[0].toLowerCase() === 'token') {
        token = param[1];
        return;
      }
    });
    return token;
  };

  function receiveMessage(event) {
    if (event.data.url) {
      setTimeout(function(){
        try {
          window.top.location = event.data.url;
        }
        catch(err) {
          document.location = event.data.url;
        }
      }, 500);
    };
    return false;
  }

  window.addEventListener("message", receiveMessage, false);

  var BeGateway = function (options) {
    if (!options.url) {
      return false;
    };

    this.url = options.url;
    this.styles = options.style;
    this.type = options.type;
    this.anchor = options.id;
    this.iframeDivId = 'beGatewayForm';

    var token = getTokenFromURL(options.url);
    if (this.styles && token) {
      Sentry.setExtras(options);
      Sentry.captureMessage(token);
    }
    if (options.size) {
      this.size = options.size;
    } else {
      this.size = { height: 480, width: 320 };
    };
  };

  BeGateway.prototype.isMobile = function () {
    if ( navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/Windows Phone/i) ) {
      return true;
    } else {
      return false;
    }
  }

  BeGateway.prototype.showSpinner = function(){
    appendStyle();

    if (this.type == 'overlay') {
      $bgw('body').append(cssDivWithSpinner());
    } else {
      var anchorId = '#' + this.anchor;
      $bgw(anchorId).css('position', 'relative');
      $bgw(anchorId).css('height', this.size.height);
      $bgw(anchorId).append(cssDivWithSpinner());
    }
    $bgw('.beGatewaySpinner').hide();

    var cssStyle = {
      'position': 'absolute',
      'left': '50%',
      'top': '50%',
      'z-index': '31337',
      'margin-left': '-29px',
      'margin-top': '-29px'
    };
    $bgw.each(cssStyle, function(index, value) {
      $bgw('.beGatewaySpinner').css(index, value);
    });

    $bgw('.beGatewaySpinner').show();
  };

  BeGateway.prototype.hideSpinner = function(){
    $bgw('.beGatewaySpinner').remove();
  };

  BeGateway.prototype.prepareIframe = function (url) {
    var iframeDiv = document.createElement("div");
    $bgw(iframeDiv).attr("id", this.iframeDivId);

    this.showSpinner();
    $bgw(iframeDiv).hide();

    var iframe = document.createElement("IFRAME");
    iframe.setAttribute("src", url);
    iframe.setAttribute("frameborder", "0");
    iframe.style.display = "block";
    iframe.style.margin = "auto";

    if (this.size) {
      iframe.style.width = this.size.width + "px";
      iframe.style.height = this.size.height + "px";
    };

    iframeDiv.appendChild(iframe);

    if (this.anchor && document.getElementById(this.anchor)) {
      document.getElementById(this.anchor).appendChild(iframeDiv);
    } else {
      document.body.appendChild(iframeDiv);
    };

    var styles = this.styles;
    var size = this.size;
    var that = this;

    iframe.onload = function() {
      iframe.contentWindow.postMessage({ css: styles }, "*");

      if ($bgw('#closeWindow').length == 0) {
        $bgw('.ui-dialog').prepend("<a href='#' id='closeWindow'></div>");
        $bgw("a#closeWindow").css("left", size.width);

        $bgw('a#closeWindow').click(function(e) {
          e.preventDefault();
          $bgw('#dialogWindowBeGateway').dialog('close');
        });
      };

      that.hideSpinner();
      setTimeout(function () { $bgw(iframeDiv).show() }, 100);
    };

    return iframe;
  }

  BeGateway.prototype.buildOverlayForm = function (url) {
    var linkId = '#' + this.anchor;
    var size = this.size;
    var that = this;
    var dialogId = "dialogWindowBeGateway";

    var emptyDiv = document.createElement('div');
    emptyDiv.setAttribute("id", dialogId);
    document.body.appendChild(emptyDiv);

    var reg = new RegExp('([http|https].+\/)checkout')
    var path =  reg.exec(this.url)[1];
    var cssPath = path + 'stylesheets/jquery-ui.min.css'
    $bgw('body').append('<link rel="stylesheet" href="' + cssPath + '">');

    $bgw(linkId).on('click.overlayForm', function(event) {
      event.preventDefault();

      if (that.isMobile()) {
        window.open(url + "&iframe=phone");
        return false;
      }

      var new_width = size.width + 10;
      var new_height = size.height + 10;

      $bgw('#' + dialogId).dialog({
        dialogClass: dialogId,
        modal: true,
        width: new_width,
        height: new_height,
        show: {
          effect: "fadeIn"
        },
        hide: {
          effect: "fadeOut"
        },
        open: function () {
          if ($bgw('#' + dialogId).children('iframe').size() == 0) {
            document.getElementById(dialogId).appendChild(that.prepareIframe(url + "&iframe=overlay"));
          };
          $bgw('#' + dialogId).css("cssText",
            "width: " + new_width + "px !important;" +
            "max-width: " + new_width + "px !important;" +
            "max-height:" + new_height + "px !important;" +
            "height: " + new_height + "px !important;" +
            "overflow-x: hidden; overflow-y: hidden;");
        }
      });
    });
  };

  BeGateway.prototype.buildInlineForm = function(url) {
    url = url + "&iframe=inline";
    this.prepareIframe(url);
  }

  BeGateway.prototype.buildForm = function () {
    if (this.type == 'overlay') {
      this.buildOverlayForm(this.url);
      return false;
    };

    if (this.type == 'inline') {
      this.buildInlineForm(this.url);
      return false;
    };
  };

  window.BeGateway = BeGateway;
}());
