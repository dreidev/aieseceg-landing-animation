var scenes = window.scenes || {};

scenes.youngpeople = function youngpeople(globals) {
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
    var vbHeight = globals.vbHeight;
    globals.name = globals.name || 'youngpeople';

    timeline.add(globals.name, startLabel + '+=' + start);

    var map = scene.map;
    map.deactivateLocations();

    var prevText = scene.lastText;
    var text = objects.make.multilineText(["That's when a group", "of young people"], 50, objects.textStyle);
    text = s.g(text);
    TweenMax.set(text.node, {
        x: vbWidth - 300
    });
    timeline.add(tweens.slideInOut(prevText, text, 100, Back.easeInOut, 0.5), 'youngpeople-=0.3');
    var colorBack = TweenMax.to(objects.background.node, 0.5,{
        fill:"#3B363F"
    });
    timeline.add(colorBack, 'youngpeople');

    timeline.add(tweens.popIn(map.people), 'youngpeople');
    timeline.add(tweens.fadeOut(scene.deathpillar), 'youngpeople+=1');

    timeline.add('connect');
    // timeline.addCallback(map.activateLocations, 'youngpeople+=1');
    // map.locationAction = function(l) {
    //     if (map.activeLocations < 2) {
    //         l.connect();
    //         if (map.activeLocations >= 2) {
    //         }
    //     }
    // };
    map.connected = true;
    timeline.add(map.connectAll(), 'connect');
    // timeline.add(map.impolossionTween, 'connect');
    prevText = text;
    text = objects.make.multilineText(["Decided Cross", "Cultural Exchange"], 50, objects.textStyle);
    var hightlight = scene.rect(-183,60,366,50).attr({fill: '#0079fa'});

    text = s.g(hightlight,text);
    TweenMax.set(text.node, {
        x: vbWidth - 300
    });
    timeline.add(tweens.slideInOut(prevText, text, 100, Back.easeInOut, 0.5), 'connect+=0.2');


    // timeline.add(tweens.drawConnection(map.connection),'connect');
    // console.log(map);
    // var tCopy = scene.tweenExplosion.tweenFromTo(.duration(), 0, {ease:Power1.easeInOut});
    // timeline.add(scene.tweenExplosion.tweenFromTo(0, scene.tweenExplosion.duration()).reverse(), '-=0.5');
    // timeline.add(tweens.pullWorld(map), '-=2');

    prevText = text;
    text = objects.make.multilineText(["Was Esssential", "In Preventing", "Similar Conflicts"], 50, objects.textStyle);
    text = scene.g(text);
    TweenMax.set(text.node, {
        x: vbWidth - 300
    });
    timeline.add(tweens.slideInOut(prevText, text, 200, Back.easeInOut, 0.5), 'connect+=2.5');

    var dot = scene.circle(375, 390, 250).attr({fill:'#fff', stroke:'none'});
    TweenMax.set(dot.node, {
        autoAlpha:0,
        x: -10000
    }, 0);
    timeline.set(dot.node, {
        x: 0
    }, 'connect+=5').to(dot.node, 1, {
        autoAlpha: 1
    });

    timeline.to(text.node, 1, {
        opacity: 0
    }, 'connect+=5');


    return globals;
};
