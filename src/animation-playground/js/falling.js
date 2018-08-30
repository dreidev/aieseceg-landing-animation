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

    window.tweens.test = function falling(man, repeat) {
        repeat = repeat || 1;
        var tl = (new TimelineMax()).set(man.righthand.node, {
                morphSVG: man.righthand.data('morphs')[1]
            }, 0).set(man.righthand.node, {
                rotation: -60,
                svgOrigin: man.righthand.data('cx') + ' ' + man.righthand.data('cy')
            }, 0).set(man.lefthand.node, {
                rotation: -80,
                svgOrigin: man.lefthand.data('cx') + ' ' + man.lefthand.data('cy')
            }, 0).set(man.leftleg.node,{
                rotation: -20,
                svgOrigin: man.leftleg.data('cx') + ' ' + man.leftleg.data('cy')
            }, 0).set(man.leftleg.node, {
                morphSVG: man.leftleg.data('morphs')[1]
            }, 0).set(man.rightleg.node, {
                rotation: -20,
                svgOrigin: man.rightleg.data('cx') + ' ' + man.rightleg.data('cy')
            }, 0).set(man.rightleg.node, {
                morphSVG: man.rightleg.data('morphs')[1]
            }, 0).set(man.body.node, {
                morphSVG: man.body.data('morphs')[1]
            }, 0).set(man.node, {
                rotation: -90,
                transformOrigin: '50% 50%'
            }, 0).to(man.lefthand.node, 0.5, {
                rotation: '+=2',
                yoyo:true,
                repeat: repeat,
                ease: Power1.easeInOut
            }, 0.25).to(man.righthand.node, 0.5, {
                rotation: '-=5',
                yoyo:true,
                repeat: repeat,
                ease: Power1.easeInOut
            }, 0).to(man.leftleg.node, 0.5, {
                rotation: '+=1',
                yoyo:true,
                repeat: repeat,
                ease: Power1.easeInOut
            }, 0).to(man.rightleg.node, 0.5, {
                rotation: '-=1',
                yoyo:true,
                repeat: repeat,
                ease: Power1.easeInOut
            }, 0);
        tl.progress(0.25);
        return tl;
    };


    var tl = tweens.test(man, 6);
    timeline.add(tl, 0);

    timeline.progress(0);
})();
