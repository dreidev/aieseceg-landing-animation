(function () {
    var TimelineMax = window.TimelineMax;
    var TweenMax = window.TweenMax;
    var objects = window.objects;
    var Power1 = window.Power1;
    var Power3 = window.Power3;
    var tweens = window.tweens;
    var timeline = window.timeline;
    var s = window.s; // svg element
    var man = objects.makeMan();
    s.add(man);


    TweenMax.set(man.node, {
        scale: 0.6,
        x: 200,
        y: 200
    });

    tweens.test = function fallCrash(man, repeat, y) {
        tweens.slip(man).progress(1);
        var tl = new TimelineMax();
        tl.add(tweens.falling(man, repeat, y), 0);
        tl.add(tweens.crash(man));
        return tl;
    };


    var tl = tweens.test(man, 0);
    timeline.add(tl, 0);

    timeline.progress(0);
})();
