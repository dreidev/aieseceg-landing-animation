(function() {
    var TimelineMax = window.TimelineMax;
    var scenes = window.scenes;
    var TweenMax = window.TweenMax;
    var objects = window.objects;
    var tweens = window.tweens;
    var vbWidth = window.vbWidth;
    var vbHeight = window.vbHeight;
    var timeline = window.timeline;
    var s = window.s;

    // var recall4 = objects.makeRecallCircle(540, 200, "#721e10", "#037EF3");

    var reflect = scenes.addScene(scenes.reflect, {prevScene: s.g()});

    s.add(reflect.scene);
    timeline.add(reflect.timeline, 0).seek(4);

})();
