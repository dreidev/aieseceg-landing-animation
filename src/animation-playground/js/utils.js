function tweenSnap(obj, dur, prop, ease) {
  var anim = obj.animate(prop, 1000);
  var animCtrl = anim.anims[Object.keys(anim.anims)[0]];
  animCtrl.pause();
  var tweenerObj = {
      progress: 0.0
  };
  return new TweenLite(tweenerObj, dur, {
    progress: 1,
    ease: ease || Linear.easeNone,
    onUpdate: function () {
      animCtrl.status(tweenerObj.progress);
      animCtrl.update();
    }
})
}

function createJoin (x, y, r) {
  var rControlRadius = 10
  var tControlSize = 15
  var rect = s.rect(x-tControlSize/2, y-tControlSize/2, tControlSize, tControlSize);
  var rTrace = s.circle(x, y, r);
  var rControl = s.circle(x+r, y+r, rControlRadius);
  rControl.attr({
    fill:'#FF8000',
    stroke : 'orangered',
    linewidth : 5
  });
  rTrace.attr({
    fill:'none',
    stroke : '#888',
    linewidth : 2,
    strokeDasharray: '5'
  });
  rect.attr({
    fill: 'rgb(0, 200, 255)',
    opacity: 0.75,
    stroke: 'none'
  });
  var controller = s.g(rTrace, rect, rControl);
  
  var start = function () {
    controller.data('origTrans', controller.transform().local);
    controller.data('origBB', controller.getBBox());
  }
  rControl.drag(function (dx, dy, s, x, y) {
    var bb = controller.data('origBB');
    var deg = Snap.deg(Math.atan2(dy, dx));
    console.log(deg);
    controller.transform(controller.data('origTrans') + 'R'+ [deg,bb.cx,bb.cy] );
  }, start);

  

  return controller;
}

function addInteractivity(shape) {

  var offset = shape.parent.translation;

  var drag = function(e) {
    e.preventDefault();
    var x = e.clientX - offset.x;
    var y = e.clientY - offset.y;
    shape.translation.set(x, y);
  };
  var touchDrag = function(e) {
    e.preventDefault();
    var touch = e.originalEvent.changedTouches[0];
    drag({
      preventDefault: _.identity,
      clientX: touch.pageX,
      clientY: touch.pageY
    });
    return false;
  };
  var dragEnd = function(e) {
    e.preventDefault();
    $window.unbind('mousemove', drag).unbind('mouseup', dragEnd);
  };
  var touchEnd = function(e) {
    e.preventDefault();
    $(window).unbind('touchmove', touchDrag).unbind('touchend', touchEnd);
    return false;
  };

  $(shape._renderer.elem).css({
      cursor: 'pointer'
    })
    .bind('mousedown', function(e) {
      console.log("mousedown");
      e.preventDefault();
      $window.bind('mousemove', drag).bind('mouseup', dragEnd);
    })
    .bind('touchstart', function(e) {
      e.preventDefault();
      $(window).bind('touchmove', touchDrag).bind('touchend', touchEnd);
      return false;
    });

}