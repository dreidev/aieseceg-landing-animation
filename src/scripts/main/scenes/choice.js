var scenes = window.scenes || {};

scenes.choice = function choice(globals) {
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


    timeline.add('choice', startLabel + '+=' + start);

    var hand = scene.hand = objects.make.hand();

    var death = scene.death;
    var sideman = scene.sideman;

    var pillartextstyle = {
        fill: '#fff',
        stroke: 'none',
        'text-anchor': 'end',
        "font-size": "80px",
        "font-family": "'Lato', Arial, sans-serif",
        "font-style": "normal",
        "font-weight": "700",
    };


    var envtext = scene.g(objects.make.multilineText(["CLIMATE CHANGE"], 50, pillartextstyle));
    pillartextstyle['font-weight'] = '100';
    var povertytext = scene.g(objects.make.multilineText(["POVERTY"], 50, pillartextstyle));
    pillartextstyle['font-weight'] = '300';
    pillartextstyle['font-style'] = 'italic';
    var illiteracytext = scene.g(objects.make.multilineText(["ILLITERACY"], 50, pillartextstyle));

    var enviroment = scene.enviroment = scene.g(death.clone().attr({
        fill: '#555',
        y: "-=5",
        x: '+=40'
    }), envtext);
    var poverty = scene.poverty = scene.g(death.clone().attr({
        fill: '#777',
        y: "+=20"
    }), povertytext);
    var illiteracy = scene.illiteracy = scene.g(death.clone().attr({
        fill: '#999',
        y: "+=30"
    }), illiteracytext);

    scene.death = death = scene.g(death);
    // var env = scene.env =scene.g(envtext);

    scene.add(hand);


    // timeline.to(scene.node, 0.2, {
    //     scale: 0.8,
    //     svgOrigin: [scene.zoomX, scene.zoomY].join(' '),
    // }, 0);
    TweenMax.set(envtext.node, {
        rotation: -90,
        transformOrigin: 'center',
        opacity: 1
    });
    TweenMax.set(envtext.node, {
        y: -vbHeight * 6.5 + 0,
        x: -vbWidth * 3.3 + 50
    });

    TweenMax.set(povertytext.node, {
        rotation: -90,
        transformOrigin: 'center',
        opacity: 1
    });
    TweenMax.set(povertytext.node, {
        y: -vbHeight * 6.5,
        x: -vbWidth * 3.5 + 100
    });

    TweenMax.set(illiteracytext.node, {
        rotation: -90,
        transformOrigin: 'center',
        opacity: 1
    });
    TweenMax.set(illiteracytext.node, {
        y: -vbHeight * 6.6,
        x: -vbWidth * 3.4 - 10
    });

    TweenMax.set(hand.node, {
        x: (vbWidth / 2) - 1300,
        y: (vbHeight / 2) - 800,
        scale: -0.6,
        opacity: 0
    });



    sideman.selectAll('*').attr({
        'fill': '#fff'
    });

    var prevText = scene.lastText;
    var underline1 = objects.make.stick();
    var underline2 = objects.make.stick();

  var text = objects.make.multilineText(["Tap or click", "to try and overcome the issue"], 50, objects.textStyle2);
    text.attr({
        'text-anchor': 'middle'
    });
    text = s.g(text);
    TweenMax.set(text.node, {
        x: vbWidth / 2
    });

    TweenMax.set(underline2.node, {
        stroke: "#ffc649",
        scaleX: 0.19,
        x: "+=820",
        y: "+=110",
        opacity: 1
    });

    TweenMax.set(underline1.node, {
        scaleX: 0.4,
        x: "+=555",
        y: "+=110"
    });

    TweenMax.set(death.node,{
        y: "+=20"
    });

    var textg = scene.lastText = scene.g(text, underline1, underline2);

    timeline.add(tweens.slideInOut(prevText, textg, 350, Back.easeInOut, 0.5), 'choice');

    timeline.add(tweens.interacthere(hand, 0), 'choice');

    // timeline.add(tweens.pillar.seq(death[0]), 'choice+=0.5');
    // timeline.add(tweens.lift(sideman), 'choice+=0.5');
    timeline.add(tweens.pillar.seqs(death[0]), 'choice+=0.5');
    timeline.add(tweens.lift2(sideman), 'choice+=0.5');

    timeline.add('_notenough', 'choice+=1.6');

    timeline.fromTo(enviroment.node,0.1,{
        opacity:0
    }, {y: "-=40",
        x: "-=350",
        opacity: 1,
    }, '_notenough').add(tweens.otherPillarsFall(enviroment, 85.6).duration(0.4), '_notenough-=0.3')
    .add(tweens.otherPillarsFall(enviroment, 86.35).duration(0.2), '_notenough')
    .add(tweens.otherPillarsFall(enviroment, 85.6).duration(1), '_notenough+=0.2')
    .add(tweens.otherPillarsFall(enviroment, 86.35).duration(0.1), '_notenough+=1.2')
    .add(tweens.otherPillarsFall(enviroment, 85.6).duration(1), '_notenough+=1.4')
    .add(tweens.otherPillarsFall(enviroment, 86.35).duration(0.1), '_notenough+=2.4');
    
    timeline.fromTo(poverty.node,0.1,{
        opacity:0
    }, {
        y: "-=140",
        x: "-=450",
        opacity: 1,
    }, '_notenough+=0.9').add(tweens.otherPillarsFall(poverty, 85.6).duration(0.3), '_notenough+=0.9')
    .add(tweens.otherPillarsFall(poverty, 86.35).duration(0.1), '_notenough+=1.2')
    .add(tweens.otherPillarsFall(poverty, 85.6).duration(1), '_notenough+=1.4')
    .add(tweens.otherPillarsFall(poverty, 86.35).duration(0.1), '_notenough+=2.4');

    timeline.fromTo(illiteracy.node,0.1,{
        opacity:0
    }, {y: "-=240",
        x: "-=550",
        opacity: 1,
    }, '_notenough+=2.1').add(tweens.otherPillarsFall(illiteracy, 85.6).duration(0.3), '_notenough+=2.1')
    .add(tweens.otherPillarsFall(illiteracy, 86.35).duration(0.1), '_notenough+=2.4');


    timeline.to(scene.node, 1, {
        x: '-=200',
        svgOrigin: [vbWidth / 2 + 250, vbHeight].join(' ')
    }, '_notenough');

    var prevText = scene.lastText;
    var text = objects.make.multilineText(["However, being young is", "not enough to unlock", "a better future"], 65, objects.textStyle3);
    text = scene.lastText = s.g(text);
    TweenMax.set(text.node, {
        x: vbWidth - 380,
        y: vbHeight / 2 - 230
    });
    timeline.add(tweens.slideInOut(prevText, text, 300, Back.easeInOut, 0.5), '_notenough+=0.1');

    var clickArea = scene.rect(0, 0, vbWidth, vbHeight).attr({
        fill: 'rgba(255,255,255,1)',
        stroke: '#fff',
        opacity: 0
    });
    TweenMax.set(clickArea.node, {
        y:vbHeight*3,
    });

    var startTime = window.timeline.getLabelTime("choice");
    var deltaTime = 1.5;
    var endTime = startTime+deltaTime;
    var startForce = 0.22;
    var force = startForce;
    var struggle = 0;
    var struggleEnd = 5;

    //to pause tl at choice for interraction
    timeline.set(clickArea.node, {
        y:0,
    }, 'choice+=0.5');
    timeline.addCallback(function () {
        window.timeline.play();
    }, 'choice+=0.49');
    window.timeline.addPause('choice+=0.5');
    timeline.addCallback(function () {
        clickArea.drag[0].enable();
        struggle = 0;
    }, 'choice');
    timeline.addCallback(function () {
        window.timeline.play();
    }, 'choice+='+deltaTime);

    // var clickCounter = 0
    var pushPillar = function(ev) {
        ev.preventDefault();
        var currentTime = window.timeline.time();
        window.timeline.reverse(currentTime + force);
        if (struggle>=struggleEnd) {
            window.timeline.play();
            this.disable();
        } else if (endTime - currentTime < 0.5 && struggle < struggleEnd) {
            force *= 0.9;
            struggle+=1;
        } else {
            force = startForce;
            struggle = 0;
        }
    };

    clickArea.drag = Draggable.create(clickArea.node, {
        cursor:'pointer',
        onPress: pushPillar
    });


    scene.lastText = text;
    globals.startOffset = 1;

    return globals;
};
