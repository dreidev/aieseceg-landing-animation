var scenes = window.scenes || {};

scenes.contact = function contact(globals) {
    var TweenMax = window.TweenMax;
    var Draggable = window.Draggable;
    var CubicBezier = window.CubicBezier;
    var Power1 = window.Power1;
    var Back = window.Back;
    var Elastic = window.Elastic;
    var Linear = window.Linear;
    var objects = window.objects;
    var tweens = window.tweens;
    var s = globals.s;
    var timeline = globals.timeline;
    var start = globals.startOffset;
    var startLabel = globals.startLabel;
    var scene = globals.scene;
    var prevScene = globals.prevScene;
    var vbWidth = globals.vbWidth;
    var vbHeight = globals.vbHeight;

    timeline.add('contact', startLabel + '+=' + start);

    var prevText = scene.lastText;
    // var text = objects.make.multilineText(["Contact Us"], 50, objects.textStyle);
    // text = s.g(text);
    // TweenMax.set(text.node, {
    //     x: vbWidth / 2 - 14
    // });
    timeline.add(tweens.slideInOut(prevText, null, 100, Back.easeInOut, 0.5), 'contact');

    globals.startOffset = -1;

    return globals;
};
