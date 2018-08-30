var scenes = window.scenes || {};

scenes.leadership = function leadership(config) {
    var TweenMax = window.TweenMax;
    var Draggable = window.Draggable;
    var CubicBezier = window.CubicBezier;
    var Power1 = window.Power1;
    var Back = window.Back;
    var Elastic = window.Elastic;
    var Linear = window.Linear;
    var objects = window.objects;
    var tweens = window.tweens;
    var s = config.s;
    var timeline = config.timeline;
    var start = config.startOffset;
    var startLabel = config.startLabel;
    var scene = config.scene;
    var vbWidth = config.vbWidth;
    var vbHeight = config.vbHeight;

    timeline.add('leadership', startLabel + '+=' + start);
    var sideman = scene.sideman || objects.make.sideman({
        color: '#fff'
    });

    var key = objects.make.key();
    var hand = objects.make.hand();
    var stick = scene.stick = objects.make.stick();
    var pillar = scene.death;
    var enviroment = scene.enviroment;
    var poverty = scene.poverty;
    var illiteracy = scene.illiteracy;
    scene.add(stick, key, sideman);




    TweenMax.set(hand.node, {
        x: (vbWidth / 2) - 1200,
        y: (vbHeight / 2) - 800,
        scale: -0.6,
        opacity: 0
    });

    TweenMax.set(key.node, {
        x: vbWidth + 230,
        y: vbHeight * 2,
        opacity: 0,
        scale: 0.6
    });



    timeline.fromTo(stick.node,0.2, {
        opacity: 0,

    }, {
        opacity: 1,
        scaleX: 0.58,
        x: (vbWidth / 2) + 540,
        y: (vbHeight / 2) - 210,
    }, 'leadership');

    var prevText = scene.lastText || s.g();
    var text = objects.make.multilineText(["We believe Leadership", "is the fundemental solution", "for positive change"], 70, objects.textStyle3);
    text = scene.lastText = s.g(text);
    TweenMax.set(text.node, {
        x: vbWidth - 370,
        y: vbHeight / 2 - 650
    });

    timeline.add(tweens.slideInOut(prevText, text, 250, Back.easeInOut, 0.5), 'leadership');



    timeline.to(stick.node, 0.4, {
        opacity: 1,
        scaleX: 0.57,
        x: (vbWidth / 2) + 258,
        y: (vbHeight / 2) - 92,
    }, 'leadership+=3.5');

    prevText = scene.lastText;
    text = objects.make.multilineText(["And it can be", "developed in anyone"], 50, objects.textStyle3);
    text = scene.lastText = s.g(text);
    TweenMax.set(text.node, {
        x: vbWidth - 350
    });

    timeline.add(tweens.slideInOut(prevText, text, 170, Back.easeInOut, 0.5), 'leadership+=4');

    timeline.to(key.node, 1, {
        opacity: 1,
        y: vbHeight / 2 + 100
    }, "leadership").to(key.node, 0.5, {
        bezier: {
            curviness: 1.25,
            values: [{
                x: "-=100",
                y: "+=150"
            }, {
                x: "-=420",
                y: "+=110"
            }]
        },
        // scale:0,
        ease: Back.easeIn
    }, "leadership+=3.5").to(key.node, 0.3, {
        scale: 0,
    }, "leadership+=3.8");

    timeline.add(tweens.powerup(sideman), 'leadership+=4.1');
    var pillars = [enviroment.node, poverty.node, illiteracy.node];
    timeline.to(pillars, 0.4, {
        rotation: "-=0.27",
        transformOrigin: "50% 100%",
        ease: Back.easeIn
    }, "leadership+=4.1");
     timeline.to(pillar.node, 0.4, {
        rotation: "-=0.6",
        transformOrigin: "50% 100%",
        ease: Back.easeIn
    }, "leadership+=4.1");


    timeline.to(sideman.parts, 0.2, {
        fill: "#0079fa"
    }, "leadership+=4.3");


    timeline.to(stick.node, 0.4, {
        scaleX: 0.74,
        x: (vbWidth / 2) + 540,
        y: (vbHeight / 2) - 92,
    }, 'leadership+=6');

    prevText = scene.lastText;
    text = objects.make.multilineText(["AIESEC seeks to develop these", "Leadership characteristics", "in youth"], 50, {
        fill: '#fff',
        stroke: 'none',
        'text-anchor': 'end',
        "font-size": "50px",
        "font-family": "'Lato', Arial, sans-serif",
        "font-style": "normal",
        "font-weight": "300"
    });
    text = scene.lastText = s.g(text);
    var stickText = scene.stickText = s.g(text);
    TweenMax.set(text.node, {
        x: vbWidth - 30,
        y: vbHeight / 2 - 230
    });
    timeline.to(stick.node, 0.1, {
        opacity: 1
    }, 'leadership+=6');
    timeline.add(tweens.slideInOut(prevText, stickText, 300, Back.easeInOut, 0.5), 'leadership+=6');


    scene.lastText = text;
    config.startOffset = 1;

    return config;
};
