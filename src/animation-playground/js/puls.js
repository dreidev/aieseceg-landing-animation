(function() {
    var TimelineMax = window.TimelineMax;
    var TweenMax = window.TweenMax;
    var objects = window.objects;
    var vbWidth = window.vbWidth;
    var vbHeight = window.vbHeight;
    var tweens = window.tweens;
    var timeline = window.timeline;
    var s = window.s; // svg element
    var sideman = objects.makeSideman();

    s.rect(0, 0, vbWidth, vbHeight).attr({
        fill: 'none',
        stroke: '#fff',
        lineWidth: 10
    });


    TweenMax.set(sideman.node, {
        scale: 0.6
    });

    window.tweens.puls = function puls(p) {
        return tweens.sequence().fromTo(p.node, 1, {
            fill: 'rgba(255,255,255,0)',
            // scale:1,
        }, {
            // scale: 2, 
            fill: 'rgba(255,255,255,1)',
            ease: Expo.easeOut,
            // svgOrigin: [x, y].join() 
        }, 0).fromTo(p.node, 1, {
            scale: 0.2
        }, {
            scale: 2,
            // yoyo:true,
            ease: Expo.easeOut,
        }, 0);
    };

    window.objects.makePuls = function makePuls(x, y, r, r2) {
        r = r || 10;
        r2 = r2 || r;
        var mainPuls = objects.backstage.ellipse().attr({
            rx: r,
            ry: r2,
            cx: x,
            cy: y
        });
        TweenMax.set(mainPuls.node, {
            x: -r,
            y: -r2
        });
        mainPuls.attr({
            fill: '#fff',
            stroke: 'none',
            opacity: 0
        });
        s.add(mainPuls);
        mainPuls.tween = tweens.puls(mainPuls, x, y);
        return mainPuls;
    };

    // var pl = objects.makePuls(vbWidth/2, vbHeight/2, 100, 20);
    // s.add(sideman);
    // s.add(pl);
    // var tl = tweens.puls(sideman);
    // timeline.add(tl, 0);
    // timeline.add(pl.tween.repeat(3), 1);

    timeline.seek(2);
    timeline.play();
})();
