var Snap = window.Snap;
var CSSPlugin = window.CSSPlugin;
var TimelineMax = window.TimelineMax;
var $ = window.jQuery;

Snap.plugin(function(Snap, Element) {
  var elproto = Element.prototype;
  elproto.toFront = function() {
    this.prependTo(this.paper);
  };
  elproto.before = function(el) {
    $(el.node).before(this.node);
  };
  elproto.after = function(el) {
    $(el.node).after(this.node);
  };
  elproto.toBack = function() {
    this.appendTo(this.paper);
  };
});

var s = Snap();
var stage = $('#stage');
stage.prepend(s.node);
stage.attr({
  style:
    '-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;',
  unselectable: 'on',
  onselectstart: 'return false;'
});
var vbWidth = (window.vbWidth = 1280); // stage.width();
var vbHeight = (window.vbHeight = 720); // stage.height();
s.attr({
  preserveAspectRatio: 'xMidYMid meet',
  viewBox: '0 0 ' + vbWidth + ' ' + vbHeight
});
CSSPlugin.defaultSmoothOrigin = true;
// $(window).resize(function () {
//     vbWidth = stage.width();
//     vbHeight = stage.height();
//     s.attr({viewBox:"0 0 "+vbWidth+" "+vbHeight});
// });
window.timeline = new TimelineMax({
  paused: true
});
var urlParams;
(function() {
  var match,
    pl = /\+/g, // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function(s) {
      return decodeURIComponent(s.replace(pl, ' '));
    },
    query = window.location.search.substring(1);

  urlParams = {};
  while ((match = search.exec(query))) {
    urlParams[decode(match[1])] = +decode(match[2]);
  }
})();

window.s = s;
