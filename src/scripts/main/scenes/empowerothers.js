var scenes = window.scenes || {};

scenes.empower = function empower(globals) {
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

    timeline.add('empower', startLabel + '+=' + start);

    var sideman = scene.sideman;


    var speaker = objects.make.speaker();

    TweenMax.set(speaker.node, {
        y: vbHeight - 260,
        rotation: -30,
        x: vbWidth - 210,
        scale: 0.6,
        // scaleX:-0.6,
        opacity: 0
    });
    timeline.to(scene.stick.node, 0.2, {
        opacity: 0
    }, "empower+=2.2");


    timeline.add(tweens.pocketdig(sideman, speaker).duration(1.5), 'empower');
    var ease = Power3.easeIn;
    var helperLocation = [{
        x: vbWidth / 2 + 150,
        ease: ease
    }, {
        x: vbWidth / 2,
        ease: ease
    }, {
        x: vbWidth / 2 - 200,
        ease: ease
    }, {
        x: vbWidth / 2 - 350,
        ease: ease
    }, {
        x: vbWidth / 2 - 600,
        y: "+=20",
        ease: ease
    }];

    helperLocation.map(function(location, i) {
        var h = objects.makeSideman({
            color: '#fe8d1e'
        });
        TweenMax.set(h.node, {
            x: vbWidth,
            y: vbHeight - 330,
            scale: 0.3,
            opacity: 0
        });
        timeline.set(h.node, {
            // y: vbHeight,
            x: vbWidth * 1.3 + (20 * i),
            scale: 0.3,
            opacity: 1
        }, "empower");

        var moveScene = TweenMax.to(scene.node, 0.5, {
            rotation: 0.2,
            transformOrigin: "left bottom"
        })

        var moveSceneUp = TweenMax.to(scene.node, 0.1, {
            rotation: -0.1,
            transformOrigin: "left bottom"

        })

        var moveSceneBack  = TweenMax.to(scene.node, 0.1, {
            rotation: 0,
            transformOrigin: "left bottom"
        })

        timeline.add(tweens.run(h, 9).duration(0.1), 'empower+=1.5');
        timeline.to(h.node, 1.5, location, 'empower+=1');

        timeline.add(tweens['helper' + (i + 1)].lift(h).duration(2), 'empower+=2.5');
        timeline.add(moveScene,'empower+=3.6');
        timeline.add(moveSceneUp,'empower+=4.1');
        timeline.add(moveSceneBack,'empower+=4.2');
        timeline.add(tweens.YAY(h), 'empower+=4.3');
        timeline.to(h.node, 0.3, {
            autoAlpha: 0
        }, 'empower+=5.8');
        scene.add(h);
        return h;
    });
    timeline.to(sideman.node, 0.1, {
        scaleX: -0.4,
        scaleY: 0.4,
        transformOrigin: "50% 50%"
    }, 'empower+=2.5');
    timeline.add(window.tweens.endlift(sideman).duration(2), "empower+=2.6");

    timeline.add(tweens.pillar.seq2(scene.death), 'empower+=1.8'); 
    timeline.add(tweens.pillar.seq3(scene.enviroment), 'empower+=1.8');
    timeline.add(tweens.pillar.seq3(scene.poverty), 'empower+=1.8');
    timeline.add(tweens.pillar.seq3(scene.illiteracy), 'empower+=1.8');


    timeline.add(tweens.YAY(sideman), 'empower+=5');

    timeline.to(scene.node, 0.5, {
        scale: 1.06,
        transformOrigin: 'center',
    }, 'empower+=5.6').to(scene.node, 0.5, {
        x: -980,
        y: -40
    }, 'empower+=5.6').add(tweens.rest(sideman), 'empower+=6.05').to(sideman.node, 0.2, {
        autoAlpha: 0
    }, 'empower+=6.1');

    return globals;
};
