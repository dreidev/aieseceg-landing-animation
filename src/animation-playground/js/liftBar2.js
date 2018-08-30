(function() {
    var TimelineMax = window.TimelineMax;
    var TweenMax = window.TweenMax;
    var objects = window.objects;
    var tweens = window.tweens;
    var timeline = window.timeline;
    var s = window.s; // svg element
    var sideman = objects.sideman;
    // s.add(sideman);

    window.tweens.liftBar = function liftBar(sideman) {
        return (new TimelineMax()).from(sideman.leftleg.node, 1, {
            rotation: -125,
            svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
        }, 0).from(sideman.leftfoot.node, 1, {
            rotation: 60,
            svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
        }, 0).from(sideman.rightleg.node, 1, {
            rotation: -50,
            svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
        }, 0).from(sideman.rightfoot.node, 1, {
            rotation: 90,
            svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
        }, 0).fromTo(sideman.lefthand.node, 1, {
            rotation: -40,
            svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
        },{
           rotation:  -10,
            svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy') 
        } ,0).fromTo(sideman.leftarm.node, 1, {
            rotation: 65,
            svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
        },{
            rotation: 70,
            svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
        } ,0).from(sideman.head.node, 1, {
            rotation: 40,
            svgOrigin: sideman.head.data('cx') + ' ' + sideman.head.data('cy')
        }, 0).from(sideman.node, 1, {
            rotation: 50,
            transformOrigin: '50% 50%'
        }, 0).to(sideman.node, 1, {
            y: '-=20'
        }, 0);
    };
})();
