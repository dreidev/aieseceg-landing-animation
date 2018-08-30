var scenes = window.scenes || {};

scenes.companies = function companies (globals) {
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
    var vbWidth = globals.vbWidth;
    
    timeline.add('companies', startLabel+'+='+start);

    var prevText = scene.lastText;
    var text = objects.make.multilineText(["CO-DEVELOP","LEADERSHIP","WITH US"], 50, objects.textStyle);
    text = scene.lastText = s.g(text);
    TweenMax.set(text.node, {x: vbWidth/2 - 14});
    timeline.add(tweens.slideInOut(prevText, text, 300, Back.easeInOut, 0.5), 'companies');


    globals.startOffset = -1;

    return globals;
};
