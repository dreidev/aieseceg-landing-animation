var scenes = window.scenes || {};

scenes.reflect = function reflect(globals) {
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

    timeline.add('reflect', startLabel + '+=' + start);

    TweenMax.set(scene.node, {
        opacity: 0,
        y: vbHeight * 3
    });
    timeline.set(scene.node, {
        opacity: 1,
        y: 140,
    }, 'reflect+=0.05');

    var rman = scene.man = objects.make.reflectman();

    var recall1 = objects.makeRecallCircle(0, 0, "#595959", "#037EF3");
    var recall2 = objects.makeRecallCircle(0, 0, "#472c4d", "#037EF3");
    var recall3 = objects.makeRecallCircle(0, 0, "#721e10", "#037EF3");
    var memory4 = objects.makeRecallCircle(0, 0, "#302b33", "#fbb92e");
    memory4.attr({ opacity: 0 });
    recall1.attr({ opacity: 0 });
    recall2.attr({ opacity: 0 });
    recall3.attr({ opacity: 0 });

    scene.add(recall1, recall2, recall3, rman, rman.otherform, memory4);

    var leadership = scenes.addScene(scenes.allelements);
    timeline.add(tweens.subtl(leadership.timeline, 0.7, 0.7).seek(0).pause());
    var rec1 = scene.g(leadership.scene);
    TweenMax.set(leadership.scene.children()[0].node, {
        y: "+=100"
    });
    TweenMax.set(leadership.scene.node, {
        scale: 0.3,
    });
    TweenMax.set(leadership.scene.node, {
        x: -300,
        y: -120,
    });
    recall1.add(rec1);
    rec1.attr({
        mask: recall1.mask
    });


    // 
    // 
    // 
    // =================
    // 
    // 
    // 



    var solution = scenes.addScene(scenes.allelements);
    timeline.add(tweens.subtl(solution.timeline.seek(6), 'solution+=6', 'empower-=1'));

    TweenMax.set(solution.scene.children()[0].node, {
        y: "+=100"
    });
    TweenMax.set(solution.scene.children()[1].node, {
        x: "-=100"
    });
    TweenMax.set(solution.scene.children()[2].node, {
        scaleX: "0.45",
        transformOrigin: "50% 50%"
    });
    TweenMax.set(solution.scene.children()[2].node, {
        x: "+=20",
        y: "-=30"
    });
    TweenMax.set(solution.scene.node, {
        scale: 0.3,
    });
    TweenMax.set(solution.scene.node, {
        x: -270,
        y: -120,
    });
    var gTomask = scene.g(solution.scene);
    recall2.add(gTomask);
    gTomask.attr({
        mask: recall2.mask
    });


    // 
    // 
    // =================
    // 
    // 
    // 

    var empower = scenes.addScene(scenes.allelements);
    timeline.add(tweens.subtl(empower.timeline, 'empower+=6', '-=3'));
    TweenMax.set(empower.scene.children()[0].node, {
        x: "+=100"
    });
    TweenMax.set(empower.scene.node, {
        scale: 0.3,
    });
    TweenMax.set(empower.scene.node, {
        scaleX: 0.25
    });
    TweenMax.set(empower.scene.node, {
        x: -270,
        y: -120,
    });
    gTomask = scene.g(empower.scene);
    // var mask = objects.make.mask(objects.backstage.circle(0, 0, 120).attr({
    //         fill: 'white'
    //     }));
    recall3.add(gTomask);
    gTomask.attr({
        mask: recall3.mask
    });





    // =================




    var map = objects.make.map();
    tweens.popIn(map.people).pause().progress(1);
    // var rec = s.rect(0, 0, vbWidth * 2, vbHeight);
    map.connectAll();
    map.tween.progress(1);
    memory4.add(scene.g(map).attr({
        mask: memory4.mask
    }));
    TweenMax.set(map.node, {
        opacity: 1,
        x: 200,
        y: -255,
        scale: 0.7,
        transformOrigin: "50% 100%"
    });
    scene.add(memory4);




    TweenMax.set(rman.node, {
        scale: 0.8,
        transformOrigin: "50% 50%",
        opacity: 1
    });
    TweenMax.set(rman.otherform.node, {
        scale: 0.54,
        transformOrigin: "50% 50%",
        opacity: 0
    });
    TweenMax.set(rman.otherform.node, {
        x: vbWidth / 2 - 200,
        y: vbHeight / 2 - 385
    });


    timeline.add(tweens.memory(recall1, recall2, recall3, memory4, vbWidth / 2 + 100, vbHeight / 2 + 100));
    timeline.add('aura');
    var aura = memory4.circle(0, 0, 120).attr({ fill: 'rgba(251, 185, 46, 0.4)', stroke: '#fbb92e' });
    aura.before(memory4[0]);
    aura = memory4.circle(0, 0, 120).attr({ fill: 'rgba(251, 185, 46, 0.4)', stroke: 'rgba(251, 185, 46, 0.4)' });
    aura.before(memory4[0]);
    timeline.add(tweens.swapFade(rman, rman.otherform).duration(0.05), 'aura-=0.28');
    timeline.add(tweens.turnToEnergy(memory4), 'aura');

    scene.rman = rman;
    scene.memory = memory4;


    globals.startOffset = -1;

    return globals;
};
