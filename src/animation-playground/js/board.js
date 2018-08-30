var s = window.Snap('100%', '100%');
window.CSSPlugin.defaultSmoothOrigin = true;
var vbWidth = 1280;
var vbHeight = 720;
s.attr({
  preserveAspectRatio: 'xMidYMid meet',
  viewBox: '0 0 ' + vbWidth + ' ' + vbHeight
});

var $ = window.jQuery;

window.Snap.plugin(function(Snap, Element) {
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

var timeline = new TimelineMax({
  paused: true
});
