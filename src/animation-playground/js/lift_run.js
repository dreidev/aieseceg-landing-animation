        
(function () {

    var TimelineMax = window.TimelineMax;
    var TweenMax = window.TweenMax;
    var objects = window.objects;
    var tweens = window.tweens;
    var timeline = window.timeline;
    var s = window.s; // svg element

    var count =0;

    var speaker = Snap.select("#speaker");
    var pillar = objects.pillar = Snap.select("#death");
    var stick = Snap.select('#stick');

    var sideman = Snap("#sideman");
    sideman.selectAll('*').attr({
        'fill': '#0079fa'
    });
    sideman.selectAll(".morph").forEach(function(m) {
        var el = sideman.select('.' + m.attr('data-for'));
        if (!el.data('morphs')) {
            el.data('morphs', [el.attr('d')]);
        }
        el.data('morphs').push(m.attr('d'));
    });
    sideman.selectAll(".rc").forEach(function(m) {
        var el = sideman.select('.' + m.attr('data-for'));
        var bb = el.getBBox();
        var cx = +m.attr('cx');
        var cy = +m.attr('cy');
        el.data('obb', bb);
        el.data('cx', cx);
        el.data('cy', cy);
        el.data('rc', {
            cx: cx,
            ox: (bb.x > cx) ? (bb.x - cx) : (cx - bb.x),
            cy: cy,
            oy: (bb.y > cy) ? (bb.y - cy) : (cy - bb.y)
        });
    });

    sideman.rightleg = sideman.select('.rightleg');
    sideman.leftleg = sideman.select('.leftleg');
    sideman.leftfoot = sideman.select('.leftfoot');
    sideman.rightfoot = sideman.select('.rightfoot');
    sideman.leftarm = sideman.select('.leftarm');
    sideman.lefthand = sideman.select('.lefthand');
    sideman.rightarm = sideman.select('.rightarm');
    sideman.righthand = sideman.select('.righthand');
    sideman.body = sideman.select('.body');
    sideman.head = sideman.select('.head');


   

    var helper = objects.helper = Snap("#helper");
    helper.selectAll('*').attr({
        'fill': '#fe8d1e'
    });
    helper.selectAll(".morph").forEach(function(m) {
        var el = helper.select('.' + m.attr('data-for'));
        if (!el.data('morphs')) {
            el.data('morphs', [el.attr('d')]);
        }
        el.data('morphs').push(m.attr('d'));
    });
    helper.selectAll(".rc").forEach(function(m) {
        var el = helper.select('.' + m.attr('data-for'));
        var bb = el.getBBox();
        var cx = +m.attr('cx');
        var cy = +m.attr('cy');
        el.data('obb', bb);
        el.data('cx', cx);
        el.data('cy', cy);
        el.data('rc', {
            cx: cx,
            ox: (bb.x > cx) ? (bb.x - cx) : (cx - bb.x),
            cy: cy,
            oy: (bb.y > cy) ? (bb.y - cy) : (cy - bb.y)
        });
    });

    helper.rightleg = helper.select('.rightleg');
    helper.leftleg = helper.select('.leftleg');
    helper.leftfoot = helper.select('.leftfoot');
    helper.rightfoot = helper.select('.rightfoot');
    helper.leftarm = helper.select('.leftarm');
    helper.lefthand = helper.select('.lefthand');
    helper.rightarm = helper.select('.rightarm');
    helper.righthand = helper.select('.righthand');
    helper.body = helper.select('.body');
    helper.head = helper.select('.head');


    var helper2 = objects.helper2 = Snap("#helper2");
    helper2.selectAll('*').attr({
        'fill': '#fe8d1e'
    });
    helper2.selectAll(".morph").forEach(function(m) {
        var el = helper2.select('.' + m.attr('data-for'));
        if (!el.data('morphs')) {
            el.data('morphs', [el.attr('d')]);
        }
        el.data('morphs').push(m.attr('d'));
    });
    helper2.selectAll(".rc").forEach(function(m) {
        var el = helper2.select('.' + m.attr('data-for'));
        var bb = el.getBBox();
        var cx = +m.attr('cx');
        var cy = +m.attr('cy');
        el.data('obb', bb);
        el.data('cx', cx);
        el.data('cy', cy);
        el.data('rc', {
            cx: cx,
            ox: (bb.x > cx) ? (bb.x - cx) : (cx - bb.x),
            cy: cy,
            oy: (bb.y > cy) ? (bb.y - cy) : (cy - bb.y)
        });
    });

    helper2.rightleg = helper2.select('.rightleg');
    helper2.leftleg = helper2.select('.leftleg');
    helper2.leftfoot = helper2.select('.leftfoot');
    helper2.rightfoot = helper2.select('.rightfoot');
    helper2.leftarm = helper2.select('.leftarm');
    helper2.lefthand = helper2.select('.lefthand');
    helper2.rightarm = helper2.select('.rightarm');
    helper2.righthand = helper2.select('.righthand');
    helper2.body = helper2.select('.body');
    helper2.head = helper2.select('.head');

    var helper3 = objects.helper3 = Snap("#helper3");
    helper3.selectAll('*').attr({
        'fill': '#fe8d1e'
    });
    helper3.selectAll(".morph").forEach(function(m) {
        var el = helper3.select('.' + m.attr('data-for'));
        if (!el.data('morphs')) {
            el.data('morphs', [el.attr('d')]);
        }
        el.data('morphs').push(m.attr('d'));
    });
    helper3.selectAll(".rc").forEach(function(m) {
        var el = helper3.select('.' + m.attr('data-for'));
        var bb = el.getBBox();
        var cx = +m.attr('cx');
        var cy = +m.attr('cy');
        el.data('obb', bb);
        el.data('cx', cx);
        el.data('cy', cy);
        el.data('rc', {
            cx: cx,
            ox: (bb.x > cx) ? (bb.x - cx) : (cx - bb.x),
            cy: cy,
            oy: (bb.y > cy) ? (bb.y - cy) : (cy - bb.y)
        });
    });

    helper3.rightleg = helper3.select('.rightleg');
    helper3.leftleg = helper3.select('.leftleg');
    helper3.leftfoot = helper3.select('.leftfoot');
    helper3.rightfoot = helper3.select('.rightfoot');
    helper3.leftarm = helper3.select('.leftarm');
    helper3.lefthand = helper3.select('.lefthand');
    helper3.rightarm = helper3.select('.rightarm');
    helper3.righthand = helper3.select('.righthand');
    helper3.body = helper3.select('.body');
    helper3.head = helper3.select('.head');
    


    var helper4 = objects.helper4 = Snap("#helper4");
    helper4.selectAll('*').attr({
        'fill': '#fe8d1e'
    });
    helper4.selectAll(".morph").forEach(function(m) {
        var el = helper4.select('.' + m.attr('data-for'));
        if (!el.data('morphs')) {
            el.data('morphs', [el.attr('d')]);
        }
        el.data('morphs').push(m.attr('d'));
    });
    helper4.selectAll(".rc").forEach(function(m) {
        var el = helper4.select('.' + m.attr('data-for'));
        var bb = el.getBBox();
        var cx = +m.attr('cx');
        var cy = +m.attr('cy');
        el.data('obb', bb);
        el.data('cx', cx);
        el.data('cy', cy);
        el.data('rc', {
            cx: cx,
            ox: (bb.x > cx) ? (bb.x - cx) : (cx - bb.x),
            cy: cy,
            oy: (bb.y > cy) ? (bb.y - cy) : (cy - bb.y)
        });
    });

    helper4.rightleg = helper4.select('.rightleg');
    helper4.leftleg = helper4.select('.leftleg');
    helper4.leftfoot = helper4.select('.leftfoot');
    helper4.rightfoot = helper4.select('.rightfoot');
    helper4.leftarm = helper4.select('.leftarm');
    helper4.lefthand = helper4.select('.lefthand');
    helper4.rightarm = helper4.select('.rightarm');
    helper4.righthand = helper4.select('.righthand');
    helper4.body = helper4.select('.body');
    helper4.head = helper4.select('.head');
    

    var helper5 = objects.helper5 = Snap("#helper5");
    helper5.selectAll('*').attr({
        'fill': '#fe8d1e'
    });
    helper5.selectAll(".morph").forEach(function(m) {
        var el = helper5.select('.' + m.attr('data-for'));
        if (!el.data('morphs')) {
            el.data('morphs', [el.attr('d')]);
        }
        el.data('morphs').push(m.attr('d'));
    });
    helper5.selectAll(".rc").forEach(function(m) {
        var el = helper5.select('.' + m.attr('data-for'));
        var bb = el.getBBox();
        var cx = +m.attr('cx');
        var cy = +m.attr('cy');
        el.data('obb', bb);
        el.data('cx', cx);
        el.data('cy', cy);
        el.data('rc', {
            cx: cx,
            ox: (bb.x > cx) ? (bb.x - cx) : (cx - bb.x),
            cy: cy,
            oy: (bb.y > cy) ? (bb.y - cy) : (cy - bb.y)
        });
    });

    helper5.rightleg = helper5.select('.rightleg');
    helper5.leftleg = helper5.select('.leftleg');
    helper5.leftfoot = helper5.select('.leftfoot');
    helper5.rightfoot = helper5.select('.rightfoot');
    helper5.leftarm = helper5.select('.leftarm');
    helper5.lefthand = helper5.select('.lefthand');
    helper5.rightarm = helper5.select('.rightarm');
    helper5.righthand = helper5.select('.righthand');
    helper5.body = helper5.select('.body');
    helper5.head = helper5.select('.head');
    
    var snap = Snap("100%", '100%');
    var testtext = snap.text(1000,290,"characteristics");

    testtext.attr({
        fill: "white",
        "font-size": "60px",
        "font-family": "'Lato', sans-serif",
        display: "block",
        "font-style": "italic",
        // "font-weight": "bold"
    });

    s.add(sideman);
    s.add(pillar);
    s.add(helper);
    s.add(helper2);
    s.add(helper3);
    s.add(helper4);
    s.add(helper5);   
    s.add(stick);
    s.add(testtext);
    s.add(speaker);

 window.tweens.tests = {
            pillarseqs: function(pillar){
                return(new TimelineMax()).to(pillar.node,1,{
                rotation: 86.7,//79.3,
                transformOrigin: '50% 100%' 
            },0).to(pillar.node,0.3,{
                rotation: 87.2,
                transformOrigin: '50% 100%' 
            },1).to(pillar.node,1,{
                rotation: 86.2,
                transformOrigin: '50% 100%' 
            },1.3).to(pillar.node,1,{
                rotation: 87.4,
                transformOrigin: '50% 100%' 
            },2.3).to(pillar.node,0.5,{
                rotation: 87,
                transformOrigin: '50% 100%'
            },2.6);

            },
            lift2: function(sideman) {
            return (new TimelineMax()).fromTo(sideman.leftleg.node, 1, {
                rotation: -125,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, {
                rotation: -100,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, 0).fromTo(sideman.leftfoot.node, 1, {
                rotation: 90,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            }, {
                rotation: 80,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            }, 0).fromTo(sideman.rightleg.node, 1, {
                rotation: -10,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, {
                rotation: -30,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 0).fromTo(sideman.rightfoot.node, 1, {
                rotation: 50,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            }, {
                rotation: 70,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            }, 0).fromTo(sideman.lefthand.node, 1, {
                rotation: -40,
                svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
            }, {
                rotation: -10,
                svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
            }, 0).fromTo(sideman.leftarm.node, 1, {
                rotation: 65,
                svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
            }, {
                rotation: 70,
                svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
            }, 0).fromTo(sideman.node, 1, {
                rotation: 50,
                transformOrigin: '50% 50%'
            }, {
                y: "-=10",
                rotation: 40,
                transformOrigin: '50% 50%'

            }, 0).to(sideman.node, 0.3, {
                rotation: 42,
                transformOrigin: "50% 50%",
                y: "+=20"
            }, 1).to(sideman.leftleg.node, 0.3, {
                rotation: -125,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, 1).to(sideman.leftfoot.node, 0.3, {
                rotation: 90,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            }, 1).to(sideman.rightleg.node, 0.3, {
                rotation: -10,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 1).to(sideman.rightfoot.node, 0.3, {
                rotation: 60,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            }, 1).to(sideman.leftarm.node, 0.3, {
                rotation: 77,
                svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
            }, 1).to(sideman.lefthand.node, 0.3, {
                rotation: -40,
                svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')

            }, 1).to(sideman.node, 1, {
                rotation: 5,
                // y: "-=40",
                transformOrigin: '50% 50%'
            }, 1.3).to(sideman.leftleg.node, 1, {
                rotation: -60,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')

            }, 1.3).to(sideman.leftfoot.node, 1, {
                rotation: 70,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            }, 1.3).to(sideman.rightleg.node, 1, {
                rotation: 27,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 1.3).to(sideman.rightfoot.node, 1, {
                rotation: 30,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            }, 1.3).to(sideman.leftarm.node, 1, {
                rotation: 110,
                svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
            }, 1.3).to(sideman.lefthand.node, 1, {
                rotation: -20,
                svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')

            }, 1.3).to(sideman.node, 0.3, {
                rotation: 42,
                transformOrigin: "50% 50%",
                // y: "+=40"
            }, 2.3).to(sideman.leftleg.node, 0.3, {
                rotation: -125,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, 2.3).to(sideman.leftfoot.node, 0.3, {
                rotation: 90,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            }, 2.3).to(sideman.rightleg.node, 0.3, {
                rotation: -10,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 2.3).to(sideman.rightfoot.node, 0.3, {
                rotation: 60,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            }, 2.3).to(sideman.leftarm.node, 0.3, {
                rotation: 77,
                svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
            }, 2.3).to(sideman.lefthand.node, 0.3, {
                rotation: -40,
                svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
            }, 2.3).to(sideman.node, 0.3, {
                rotation: 40,
                transformOrigin: "50% 50%",
                // y: "+=40"
            }, 2.6).to(sideman.leftleg.node, 0.5, {
                rotation: -120,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, 2.6).to(sideman.leftfoot.node, 0.5, {
                rotation: 85,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            }, 2.6).to(sideman.rightleg.node, 0.5, {
                rotation: -5,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 2.6).to(sideman.rightfoot.node, 0.5, {
                rotation: 50,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            }, 2.6).to(sideman.leftarm.node, 0.5, {
                rotation: 72,
                svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
            }, 2.6).to(sideman.lefthand.node, 0.5, {
                rotation: -35,
                svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
            }, 2.6);
},
       rest: function(helper) {
            return (new TimelineMax()).to(helper.node,0.2,{
                rotation:0,
                transformOrigin: '50% 50%'
            },0).to(helper.leftarm.node,0.2,{
                rotation:0,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },0).to(helper.lefthand.node,0.2,{
                rotation:0,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },0).to(helper.righthand.node,0.2,{
                rotation:0,
                svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
            },0).to(helper.rightarm.node,0.2,{
                rotation:0,
                svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
            },0).to(helper.leftleg.node,0.2,{
                rotation:0,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },0).to(helper.leftfoot.node,0.2,{
                rotation:0,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },0).to(helper.rightleg.node,0.2,{
                rotation:0,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },0).to(helper.rightfoot.node,0.2,{
                rotation:0,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },0);
        
        },

       YAY: function(helper) {
            return (new TimelineMax()).to(helper.node,0.2,{
                rotation:0,
                transformOrigin: '50% 50%'
            },0).to(helper.leftarm.node,0.2,{
                rotation:-100,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },0).to(helper.lefthand.node,0.2,{
                rotation:0,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },0).to(helper.righthand.node,0.2,{
                rotation:0,
                svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
            },0).to(helper.rightarm.node,0.2,{
                rotation:100,
                svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
            },0).to(helper.leftleg.node,0.2,{
                rotation:-30,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },0).to(helper.leftfoot.node,0.2,{
                rotation:0,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },0).to(helper.rightleg.node,0.2,{
                rotation:30,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },0).to(helper.rightfoot.node,0.2,{
                rotation:0,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },0);
        
        },
       run: function (helper,steps) {
            return (new TimelineMax({repeat: steps})).fromTo(helper.node,0.5,{
                rotation: -30,
                y: "+=20",
                // x: "-=30",
                transformOrigin: '50% 50%'
            },{
                y: "-=20",
                // x: "-=50",
                transformOrigin: '50% 50%'
            },0).fromTo(helper.rightarm.node,0.5,{
                rotation: 60,
                svgOrigin: helper.rightarm.data('cx')+ ' ' + helper.rightarm.data('cy')
            },{
                rotation: -50,
                svgOrigin: helper.rightarm.data('cx')+ ' ' + helper.rightarm.data('cy')
            },0).fromTo(helper.righthand.node,0.5,{
                rotation: 90,
                svgOrigin: helper.righthand.data('cx')+ ' ' + helper.righthand.data('cy')
            },{
                rotation: 130,
                svgOrigin: helper.righthand.data('cx')+ ' ' + helper.righthand.data('cy')
            },0).fromTo(helper.leftleg.node,0.5,{
                rotation: -15,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },{
                rotation: 70,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },0).fromTo(helper.rightleg.node,0.5,{
                rotation: 80,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },{
                rotation: -15,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },0).fromTo(helper.leftfoot.node,0.5,{
                rotation: -20,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },{
                rotation: -45,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },0).fromTo(helper.rightfoot.node,0.5,{
                rotation: -45,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },{
                rotation: -20,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },0).fromTo(helper.leftarm.node, 0.5,{
                rotation: -50,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },{
                rotation: 60,
                ease: Power1.easeOut,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },0).to(helper.lefthand.node, 0.5,{
                rotation: 90,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },0).fromTo(helper.lefthand.node, 0.5,{
                rotation: 130,
                ease: Power1.easeOut,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },{
                rotation: 90,
                ease: Power1.easeOut,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },0);
        },
        lift: function (sideman) {
            return (new TimelineMax({onComplete: countup})).fromTo(sideman.leftleg.node, 1, {
            rotation: -125,
            svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
        },{
            rotation: -100,
            svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy') 
        }, 0).fromTo(sideman.leftfoot.node, 1, {
            rotation: 90,
            svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
        },{
           rotation: 80,
            svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy') 
        }, 0).fromTo(sideman.rightleg.node, 1, {
            rotation: -10,
            svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
        },{
            rotation: -30,
            svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
        } ,0).fromTo(sideman.rightfoot.node, 1, {
            rotation: 50,
            svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
        },{
           rotation: 70,
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
        } ,0).fromTo(sideman.head.node, 1, {
            rotation: 40,
            svgOrigin: sideman.head.data('cx') + ' ' + sideman.head.data('cy')
        },{
           rotation: 20,
            svgOrigin: sideman.head.data('cx') + ' ' + sideman.head.data('cy') 
        } ,0).fromTo(sideman.node, 1, {
            rotation: 50,
            transformOrigin: '50% 50%'
        },{
            y: "-=20" ,
           rotation: 40,
            transformOrigin: '50% 50%' 
        } ,0).to(sideman.head.node,0.5,{
            rotation:30,
            y: "+=30",
            transformOrigin: '50% 50%'
        },0).to(sideman.node,1,{
            rotation: 5,
            y: "-=40" ,
            transformOrigin: '50% 50%'
        },1).to(sideman.leftleg.node,1,{
            rotation: -60,
            svgOrigin: sideman.leftleg.data('cx')+ ' ' + sideman.leftleg.data('cy')

        },1).to(sideman.leftfoot.node,1,{
            rotation: 70,
            svgOrigin: sideman.leftfoot.data('cx')+ ' '+ sideman.leftfoot.data('cy')
        },1).to(sideman.rightleg.node,1,{
            rotation: 27,
            svgOrigin: sideman.rightleg.data('cx')+ ' '+ sideman.rightleg.data('cy')
        },1).to(sideman.rightfoot.node,1,{
            rotation: 30,
            svgOrigin: sideman.rightfoot.data('cx')+ ' '+ sideman.rightfoot.data('cy')
        },1).to(sideman.leftarm.node,1,{
            rotation: 110 ,
            svgOrigin: sideman.leftarm.data('cx')+ ' '+ sideman.leftarm.data('cy')
        },1).to(sideman.lefthand.node,1,{
            rotation: -20 ,
            svgOrigin: sideman.lefthand.data('cx')+ ' '+ sideman.lefthand.data('cy')
        },1).to(sideman.head.node,0.5,{
            rotation:30,
            y: "+=33",
            x: "+=30",
            transformOrigin: '50% 50%'
        },1).to(sideman.node,0.5,{
            rotation:40,
            transformOrigin:"50% 50%",
            y: "+=40"
        },2).to(sideman.leftleg.node,0.5,{
            rotation:-120,
            svgOrigin:  sideman.leftleg.data('cx')+ ' ' + sideman.leftleg.data('cy')
        },2).to(sideman.leftfoot.node,0.5,{
            rotation: 85,
            svgOrigin:  sideman.leftfoot.data('cx')+ ' ' + sideman.leftfoot.data('cy')
        },2).to(sideman.rightleg.node,0.5,{
            rotation: -5,
            svgOrigin:  sideman.rightleg.data('cx')+ ' ' + sideman.rightleg.data('cy')
        },2).to(sideman.rightfoot.node,0.5,{
            rotation: 50,
            svgOrigin:  sideman.rightfoot.data('cx')+ ' ' + sideman.rightfoot.data('cy')
        },2).to(sideman.leftarm.node,0.5,{
            rotation:72,
            svgOrigin:  sideman.leftarm.data('cx')+ ' ' + sideman.leftarm.data('cy')
        },2).to(sideman.lefthand.node,0.5,{
            rotation:-35,
            svgOrigin:  sideman.lefthand.data('cx')+ ' ' + sideman.lefthand.data('cy')
        },2).to(sideman.head.node,0.5,{
            rotation:30,
            y: "-=66",
            x: "-=30",
            transformOrigin: '50% 50%'
        },2);
        },
        helper1lift: function(helper){
        return (new TimelineMax()).to(helper.body.node,{
            morphSVG: helper.body.data('morphs')[0]
        },0).to(helper.rightarm.node, 1, {
            rotation:110,
            svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
        },0).to(helper.leftarm.node,1,{
            rotation:-130,
            svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
        },0).to(helper.righthand.node, 1, {
            rotation:40,
            svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
        },0).to(helper.lefthand.node,1,{
            rotation:-40,
            svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
        },0).to(helper.leftleg.node,1,{
            rotation: -75,
            svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
        },0).to(helper.rightleg.node,1,{
            rotation: 80,
            svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
        },0).to(helper.leftfoot.node,1,{
            rotation: 50,
            svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
        },0).to(helper.rightfoot.node,1,{
            rotation: -100,
            svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
        },0).to(helper.node,1,{
            y: "+=35",
            transformOrigin: "50% 50%"
        },0).to(helper.rightarm.node,0.5,{
            rotation:120,
            svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
        },1).to(helper.righthand.node, 0.5, {
            rotation:30,
            svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
        },1).to(helper.lefthand.node,0.5,{
            rotation:-30,
            svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
        },1).to(helper.leftleg.node,0.5,{
            rotation:-40,
            svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
        },1).to(helper.rightleg.node,0.5,{
            rotation:40,
            svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
        },1).to(helper.leftfoot.node,0.5,{
            rotation:30,
            svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
        },1).to(helper.rightfoot.node,0.5,{
            rotation:-20,
            svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
        },1).to(helper.node,0.5,{
            y: "-=35",
            transformOrigin: "50% 50%"
        },1).to(helper.head.node,0.5,{
            y: "+=20",
            transformOrigin: "50% 50%"
        },1).to(helper.rightarm.node,0.5, {
            rotation:110,
            svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
        },1.5).to(helper.leftarm.node,0.5,{
            rotation:-130,
            svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
        },1.5).to(helper.righthand.node,0.5, {
            rotation:40,
            svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
        },1.5).to(helper.lefthand.node,0.5,{
            rotation:-40,
            svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
        },1.5).to(helper.leftleg.node,0.5,{
            rotation: -75,
            svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
        },1.5).to(helper.rightleg.node,0.5,{
            rotation: 80,
            svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
        },1.5).to(helper.leftfoot.node,0.5,{
            rotation: 50,
            svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
        },1.5).to(helper.rightfoot.node,0.5,{
            rotation: -100,
            svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
        },1.5).to(helper.node,0.5,{
            y: "+=35",
            transformOrigin: "50% 50%"
        },1.5).to(helper.head.node,0.5,{
            y: "-=20",
            transformOrigin: "50% 50%"
        },1.5).to(helper.rightarm.node,0.5,{
            rotation:120,
            svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
        },2).to(helper.righthand.node, 0.5, {
            rotation:30,
            svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
        },2).to(helper.lefthand.node,0.5,{
            rotation:-30,
            svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
        },2).to(helper.leftleg.node,0.5,{
            rotation:-40,
            svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
        },2).to(helper.rightleg.node,0.5,{
            rotation:40,
            svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
        },2).to(helper.leftfoot.node,0.5,{
            rotation:30,
            svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
        },2).to(helper.rightfoot.node,0.5,{
            rotation:-20,
            svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
        },2).to(helper.node,0.5,{
            y: "-=35",
            transformOrigin: "50% 50%"
        },2).to(helper.head.node,0.5,{
            y: "+=20",
            transformOrigin: "50% 50%"
        },2);    

        },
        helper2: function(helper){
            return(new TimelineMax()).to(helper.leftleg.node,1,{
                rotation: 50,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },0).to(helper.rightleg.node,1,{
                rotation: 110,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },0).to(helper.leftfoot.node,1,{
                rotation: -90,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },0).to(helper.rightfoot.node,1,{
                rotation: -70,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },0).to(helper.leftarm.node,1,{
                rotation: 135,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },0).to(helper.rightarm.node,1,{
                rotation: 155,
                svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
            },0).to(helper.lefthand.node,1,{
                rotation: 50,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },0).to(helper.righthand.node,1,{
                rotation: 20,
                svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
            },0).to(helper.node,1,{
                rotation: -40 ,
                y: "+=45",
                transformOrigin: '50% 50%'
            },0).to(helper.leftleg.node,0.5,{
                rotation: 20,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },1).to(helper.rightleg.node,0.5,{
                rotation: 50,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },1).to(helper.leftfoot.node,0.5,{
                rotation: -30,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },1).to(helper.rightfoot.node,0.5,{
                rotation: -30,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },1).to(helper.leftarm.node,0.5,{
                rotation: 140,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')   
            },1).to(helper.rightarm.node,0.5,{
                rotation: 130,
                svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')   
            },1).to(helper.lefthand.node,0.5,{
                rotation: -10,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },1).to(helper.righthand.node,0.5,{
                rotation: 0,
                svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
            },1).to(helper.node,0.5,{
                rotation: -20 ,
                y: "-=45",
                transformOrigin: '50% 50%'
            },1).to(helper.leftleg.node,0.5,{
                rotation: 50,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },1.5).to(helper.rightleg.node,0.5,{
                rotation: 110,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },1.5).to(helper.leftfoot.node,0.5,{
                rotation: -90,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },1.5).to(helper.rightfoot.node,0.5,{
                rotation: -70,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },1.5).to(helper.leftarm.node,0.5,{
                rotation: 135,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },1.5).to(helper.rightarm.node,0.5,{
                rotation: 155,
                svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
            },1.5).to(helper.lefthand.node,0.5,{
                rotation: 50,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },1.5).to(helper.righthand.node,0.5,{
                rotation: 20,
                svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
            },1.5).to(helper.node,0.5,{
                rotation: -40 ,
                y: "+=45",
                transformOrigin: '50% 50%'
            },1.5).to(helper.leftleg.node,0.5,{
                rotation: 20,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },2).to(helper.rightleg.node,0.5,{
                rotation: 50,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },2).to(helper.leftfoot.node,0.5,{
                rotation: -30,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },2).to(helper.rightfoot.node,0.5,{
                rotation: -30,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },2).to(helper.leftarm.node,0.5,{
                rotation: 140,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')   
            },2).to(helper.rightarm.node,0.5,{
                rotation: 130,
                svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')   
            },2).to(helper.lefthand.node,0.5,{
                rotation: -10,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },2).to(helper.righthand.node,0.5,{
                rotation: 0,
                svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
            },2).to(helper.node,0.5,{
                rotation: -20 ,
                y: "-=45",
                transformOrigin: '50% 50%'
            },2);            
        },
        helper3: function(helper){
            return(new TimelineMax()).to(helper.node,1,{
                rotation:35,
                y: "+=59",
                transformOrigin: "50% 50%"
            },0).to(helper.leftleg.node,1,{
                rotation:-80,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },0).to(helper.rightleg.node,1,{
                rotation:-40,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },0).to(helper.leftfoot.node,1,{
                rotation:45,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },0).to(helper.rightfoot.node,1,{
                rotation:45,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },0).to(helper.leftarm.node,1,{
                rotation:80,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },0).to(helper.lefthand.node,1,{
                rotation:-35,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },0).to(helper.head.node,1,{
                rotation:30,
                transformOrigin: "50% 50%",
                x: "+=20" ,
                y: "+=20"
            },0).to(helper.node,0.5,{
                rotation:15,
                y: "-=20",
                transformOrigin: "50% 50%"
            },1).to(helper.leftleg.node,0.5,{
                rotation:-40,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },1).to(helper.rightleg.node,0.5,{
                rotation:-10,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },1).to(helper.leftfoot.node,0.5,{
                rotation:15,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },1).to(helper.rightfoot.node,0.5,{
                rotation:25,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },1).to(helper.leftarm.node,0.5,{
                rotation:100,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },1).to(helper.lefthand.node,0.5,{
                rotation:-35,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },1).to(helper.head.node,0.5,{
                x: "-=20" ,
                y: "-=20"
            },1).to(helper.node,0.5,{
                rotation:35,
                y: "+=20",
                transformOrigin: "50% 50%"
            },1.5).to(helper.leftleg.node,0.5,{
                rotation:-80,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },1.5).to(helper.rightleg.node,0.5,{
                rotation:-40,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },1.5).to(helper.leftfoot.node,0.5,{
                rotation:45,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },1.5).to(helper.rightfoot.node,0.5,{
                rotation:45,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },1.5).to(helper.leftarm.node,0.5,{
                rotation:80,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },1.5).to(helper.lefthand.node,0.5,{
                rotation:-35,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },1.5).to(helper.head.node,0.5,{
                rotation:30,
                transformOrigin: "50% 50%",
                x: "+=20" ,
                y: "+=20"
            },1.5).to(helper.node,0.5,{
                rotation:15,
                y: "-=20",
                transformOrigin: "50% 50%"
            },2).to(helper.leftleg.node,0.5,{
                rotation:-40,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },2).to(helper.rightleg.node,0.5,{
                rotation:-10,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },2).to(helper.leftfoot.node,0.5,{
                rotation:15,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },2).to(helper.rightfoot.node,0.5,{
                rotation:25,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },2).to(helper.leftarm.node,0.5,{
                rotation:100,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },2).to(helper.lefthand.node,0.5,{
                rotation:-35,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },2).to(helper.head.node,0.5,{
                x: "-=20" ,
                y: "-=20"
            },2);
        }
        ,
        helper4: function(helper){
            return(new TimelineMax()).to(helper.node,1,{
                rotation:-30,
                y: "+=95",
                transformOrigin: "50% 50%"
            },0).to(helper.rightleg.node,1,{
                rotation:135,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },0).to(helper.rightfoot.node,1,{
                rotation:-110,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },0).to(helper.leftleg.node,1,{
                rotation:-25,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },0).to(helper.leftfoot.node,1,{
                rotation:-30,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },0).to(helper.leftarm.node,1,{
                rotation:120,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },0).to(helper.lefthand.node,1,{
                rotation:70,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },0).to(helper.rightarm.node,1,{
                rotation:100,
                svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
            },0).to(helper.righthand.node,1,{
                rotation:100,
                svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
            },0).to(helper.node,0.5,{
                rotation:-20,
                y: "-=30",
                transformOrigin: "50% 50%"
            },1).to(helper.rightleg.node,0.5,{
                rotation:100,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },1).to(helper.rightfoot.node,0.5,{
                rotation:-90,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },1).to(helper.leftleg.node,0.5,{
                rotation:-30,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },1).to(helper.leftfoot.node,0.5,{
                rotation:-5,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },1).to(helper.leftarm.node,0.5,{
                rotation:120,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },1).to(helper.lefthand.node,0.5,{
                rotation:25,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },1).to(helper.rightarm.node,0.5,{
                rotation:140,
                svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
            },1).to(helper.righthand.node,0.5,{
                rotation:0,
                svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
            },1).to(helper.node,0.5,{
                rotation:-30,
                y: "+=30",
                transformOrigin: "50% 50%"
            },1.5).to(helper.rightleg.node,0.5,{
                rotation:135,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },1.5).to(helper.rightfoot.node,0.5,{
                rotation:-110,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },1.5).to(helper.leftleg.node,0.5,{
                rotation:-25,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },1.5).to(helper.leftfoot.node,0.5,{
                rotation:-30,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },1.5).to(helper.leftarm.node,0.5,{
                rotation:120,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },1.5).to(helper.lefthand.node,0.5,{
                rotation:70,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },1.5).to(helper.rightarm.node,0.5,{
                rotation:100,
                svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
            },1.5).to(helper.righthand.node,0.5,{
                rotation:100,
                svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
            },1.5).to(helper.node,0.5,{
                rotation:-20,
                y: "-=30",
                transformOrigin: "50% 50%"
            },2).to(helper.rightleg.node,0.5,{
                rotation:100,
                svgOrigin: helper.rightleg.data('cx')+ ' '+ helper.rightleg.data('cy')
            },2).to(helper.rightfoot.node,0.5,{
                rotation:-90,
                svgOrigin: helper.rightfoot.data('cx')+ ' '+ helper.rightfoot.data('cy')
            },2).to(helper.leftleg.node,0.5,{
                rotation:-30,
                svgOrigin: helper.leftleg.data('cx')+ ' '+ helper.leftleg.data('cy')
            },2).to(helper.leftfoot.node,0.5,{
                rotation:-5,
                svgOrigin: helper.leftfoot.data('cx')+ ' '+ helper.leftfoot.data('cy')
            },2).to(helper.leftarm.node,0.5,{
                rotation:120,
                svgOrigin: helper.leftarm.data('cx')+ ' '+ helper.leftarm.data('cy')
            },2).to(helper.lefthand.node,0.5,{
                rotation:25,
                svgOrigin: helper.lefthand.data('cx')+ ' '+ helper.lefthand.data('cy')
            },2).to(helper.rightarm.node,0.5,{
                rotation:140,
                svgOrigin: helper.rightarm.data('cx')+ ' '+ helper.rightarm.data('cy')
            },2).to(helper.righthand.node,0.5,{
                rotation:0,
                svgOrigin: helper.righthand.data('cx')+ ' '+ helper.righthand.data('cy')
            },2);
        
        }
        ,
        helper5: function(sideman){
            return(new TimelineMax).to(sideman.leftleg.node, 1, {
                rotation: -145,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            },0).to(sideman.leftfoot.node, 1, {
                rotation: 37,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            },0).to(sideman.rightleg.node, 1, {
                rotation: -100,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            },0).to(sideman.rightfoot.node, 1, {
                rotation: 100,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            },0).to(sideman.lefthand.node, 1, {
                rotation: -10,
                svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
            },0).to(sideman.leftarm.node, 1, {
                rotation: 25,
                svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
            },0).to(sideman.node, 1, {
                rotation: 75,
                y: "+=30",
                transformOrigin: '50% 50%'
            },0).to(sideman.node,0.5, {
                rotation: 65,
                y: "-=20",
                transformOrigin: '50% 50%'
            },1).to(sideman.leftleg.node,0.5, {
                rotation: -115,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            },1).to(sideman.leftfoot.node,0.5, {
                rotation: 20,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            },1).to(sideman.rightleg.node,0.5, {
                rotation: -50,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            },1).to(sideman.rightfoot.node,0.5, {
                rotation: 60,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            },1).to(sideman.leftleg.node,0.5, {
                rotation: -145,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            },1.5).to(sideman.leftfoot.node,0.5, {
                rotation: 37,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            },1.5).to(sideman.rightleg.node,0.5, {
                rotation: -100,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            },1.5).to(sideman.rightfoot.node,0.5, {
                rotation: 100,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            },1.5).to(sideman.node,0.5, {
                rotation: 75,
                y: "+=20",
                transformOrigin: '50% 50%'
            },1.5).to(sideman.node,0.5, {
                rotation: 65,
                y: "-=20",
                transformOrigin: '50% 50%'
            },2).to(sideman.leftleg.node,0.5, {
                rotation: -115,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            },2).to(sideman.leftfoot.node,0.5, {
                rotation: 20,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            },2).to(sideman.rightleg.node,0.5, {
                rotation: -50,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            },2).to(sideman.rightfoot.node,0.5, {
                rotation: 60,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            },2);
        },
        //with main guy
        pillarseq: function(pillar){
            return(new TimelineMax()).to(pillar.node,1,{
            rotation: 79.3,
            transformOrigin: '50% 100%' 
        },0).to(pillar.node,1,{
            rotation: 75,
            transformOrigin: '50% 100%' 
        },1).to(pillar.node,0.5,{
            rotation: 80.3,
            transformOrigin: '50% 100%'
        },2);
        },
        //with lifters
        pillarseq2: function(pillar){
            return(new TimelineMax()).to(pillar.node,0.5,{
            rotation: "-=2",
            transformOrigin: '50% 100%'
        },0).to(pillar.node,0.5,{
            rotation: "+=2",
            transformOrigin: '50% 100%'
        },0.5).to(pillar.node,0.5,{
            rotation: "-=2",
            transformOrigin: '50% 100%'
        },1).to(pillar.node,0.5,{
            rotation: "-=100",
            transformOrigin: '50% 100%'
        },1.5);
        },

        stick: function (stick){ //duration 1.4
            return(new TimelineMax()).fromTo(stick.node,0.7,{
                y: 0
            },{
                y: 400,
                transformOrigin: "50% 50%"
            },0).to(stick.node ,0.1, {
                rotation:-5,
                transformOrigin: "50% 100%",
                y: 370,
                x:-10,
                ease: Power1.easeInOut,
            },0.7).to(stick.node ,0.1, {
                x: -30,
                rotation:5,
                transformOrigin: "50% 0%",
               
            },0.8).to(stick.node ,0.1, {
                rotation:0,
                y:380,
                transformOrigin: "50% 100%",
            },0.9).to(stick.node,0.5,{
                y:377,
                x:-50,
                rotation:5,
                ease: Power1.easeInOut
            },1.5).to(stick.node,0.5,{
                y:360,
                x:-135,
                rotation:40,
                scaleX:0.6,
                ease: Power1.easeInOut
            },2).to(stick.node,0.3,{
                y:344,
                x:-225,
                rotation:85,
                scaleX:0.45,
                ease: Power1.easeInOut
            },2.5);
        },

        pick: function(sideman) {
            return(new TimelineMax()).to(sideman.node,0.5,{
                rotation:70,
                y: "+=7",
                transformOrigin: '50% 50%'
            },0).fromTo(sideman.lefthand.node,0.5,{
               rotation: -30,
                svgOrigin: sideman.lefthand.data('cx')+ ' '+ sideman.lefthand.data('cy') 
            },{
                rotation: -20,
                svgOrigin: sideman.lefthand.data('cx')+ ' '+ sideman.lefthand.data('cy')
            },0).to(sideman.rightarm.node,0.5,{
                rotation: -100,
                svgOrigin: sideman.rightarm.data('cx')+ ' '+ sideman.rightarm.data('cy')
            },0).to(sideman.righthand.node,0.5,{
                rotation: -10,
                svgOrigin: sideman.righthand.data('cx')+ ' '+ sideman.righthand.data('cy')
            },0).to(sideman.leftleg.node,0.5,{
                rotation:-150,
                svgOrigin: sideman.leftleg.data('cx')+ ' '+ sideman.leftleg.data('cy')
            },0).to(sideman.rightleg.node,0.5,{
                rotation:-35,
                svgOrigin: sideman.rightleg.data('cx')+ ' '+ sideman.rightleg.data('cy')
            },0).to(sideman.rightarm.node,0.5,{
                rotation: -60,
                svgOrigin: sideman.rightarm.data('cx')+ ' '+ sideman.rightarm.data('cy')
            },0.5).to(sideman.righthand.node,0.5,{
                rotation: -80,
                svgOrigin: sideman.righthand.data('cx')+ ' '+ sideman.righthand.data('cy')
            },0.5).to(sideman.node,0.5,{
               rotation:40,
               y: "-=7",
               transformOrigin: '50% 50%' 
            },1).to(sideman.leftleg.node,0.5,{
                rotation:-120,
                svgOrigin: sideman.leftleg.data('cx')+ ' '+ sideman.leftleg.data('cy')
            },1).to(sideman.rightleg.node,0.5,{
                rotation:-5,
                svgOrigin: sideman.rightleg.data('cx')+ ' '+ sideman.rightleg.data('cy')
            },1).to(sideman.lefthand.node,0.5,{
                rotation: -35,
                svgOrigin: sideman.lefthand.data('cx')+ ' '+ sideman.lefthand.data('cy')
            },1).to(sideman.rightarm.node,0.5,{
                rotation: -120,
                svgOrigin: sideman.rightarm.data('cx')+ ' '+ sideman.rightarm.data('cy')
            },1).to(sideman.righthand.node,0.5,{
                rotation: -30,
                svgOrigin: sideman.righthand.data('cx')+ ' '+ sideman.righthand.data('cy')
            },1).to(sideman.rightarm.node,0.3,{
                rotation: -152,
                svgOrigin: sideman.rightarm.data('cx')+ ' '+ sideman.rightarm.data('cy')
            },1.5).to(sideman.righthand.node,0.3,{
                rotation: 0,
                svgOrigin: sideman.righthand.data('cx')+ ' '+ sideman.righthand.data('cy')
            },1.5);
        }, 
        stealth: function(sideman){
            return(new TimelineMax()).to(sideman.leftfoot.node,0.5,{
                rotation: 0,
                svgOrigin: sideman.leftfoot.data('cx')+ ' '+ sideman.leftfoot.data('cy') 
            },0).to(sideman.node,0.2,{
                rotation:0,
                x:890,
                scaleX:-0.3,
                // y: "-=20",
                transformOrigin: "50% 50%"
            },0.5).to(sideman.leftfoot.node,0.5,{
                rotation: 0,
                svgOrigin: sideman.leftfoot.data('cx')+ ' '+ sideman.leftfoot.data('cy')  
            },0.5).to(sideman.rightleg.node,0.5,{
                rotation:0,
                svgOrigin: sideman.rightleg.data('cx')+ ' '+ sideman.rightleg.data('cy')  
            },0.5).to(sideman.rightfoot.node,0.5,{
                rotation:0,
                svgOrigin: sideman.rightfoot.data('cx')+ ' '+ sideman.rightfoot.data('cy')  
            },0.5).to(sideman.leftleg.node,0.5,{
                rotation:0,
                svgOrigin: sideman.leftleg.data('cx')+ ' '+ sideman.leftleg.data('cy')  
            },0.5).to(sideman.righthand.node,0.5,{
                rotation:-90,
                svgOrigin: sideman.righthand.data('cx')+ ' '+ sideman.righthand.data('cy')  
            },0.5).to(sideman.rightarm.node,0.5,{
                rotation:30,
                svgOrigin: sideman.rightarm.data('cx')+ ' '+ sideman.rightarm.data('cy')  
            },0.5).to(sideman.lefthand.node,0.5,{
                rotation:-90,
                svgOrigin: sideman.lefthand.data('cx')+ ' '+ sideman.lefthand.data('cy')  
            },0.5).to(sideman.righthand.node,0.3,{
                rotation:0,
                svgOrigin: sideman.righthand.data('cx')+ ' '+ sideman.righthand.data('cy')  
            },1).to(sideman.rightarm.node,0.3,{
                rotation:0,
                svgOrigin: sideman.rightarm.data('cx')+ ' '+ sideman.rightarm.data('cy')  
            },1).to(sideman.lefthand.node,0.3,{
                rotation:0,
                svgOrigin: sideman.lefthand.data('cx')+ ' '+ sideman.lefthand.data('cy')  
            },1).to(sideman.leftarm.node,0.3,{
                rotation:0,
                svgOrigin: sideman.leftarm.data('cx')+ ' '+ sideman.leftarm.data('cy')  
            },1).to(sideman.head.node,0.3,{
                rotation:0,
                transformOrigin: "50% 50%",
                y: "-=20",
                x: "-=30",
            },1).to(sideman.node,0.2,{
                scaleX: 0.3
            },1.3);
        },
        pocketdig:  function(sideman) {
            return(new TimelineMax()).to(sideman.rightarm.node,0.3,{
                rotation: 70,
                svgOrigin: sideman.rightarm.data('cx')+ ' '+ sideman.rightarm.data('cy')  
            },0).to(sideman.righthand.node,0.3,{
                rotation: -90,
                svgOrigin: sideman.righthand.data('cx')+ ' '+ sideman.righthand.data('cy')  
            },0).to(sideman.rightarm.node,0.3,{
                rotation: 60,
                svgOrigin: sideman.rightarm.data('cx')+ ' '+ sideman.rightarm.data('cy')  
            },0.3).to(sideman.righthand.node,0.3,{
                rotation: -80,
                svgOrigin: sideman.righthand.data('cx')+ ' '+ sideman.righthand.data('cy')  
            },0.3).to(sideman.rightarm.node,0.3,{
                rotation: 70,
                svgOrigin: sideman.rightarm.data('cx')+ ' '+ sideman.rightarm.data('cy')  
            },0.6).to(sideman.righthand.node,0.3,{
                rotation: -90,
                svgOrigin: sideman.righthand.data('cx')+ ' '+ sideman.righthand.data('cy')  
            },0.6).to(speaker.node,0.3,{
                opacity:1,
                transformOrigin: "50% 50%"
            },0.6).to(sideman.rightarm.node,0.3,{
                rotation: -60,
                svgOrigin: sideman.rightarm.data('cx')+ ' '+ sideman.rightarm.data('cy')  
            },0.9).to(sideman.righthand.node,0.3,{
                rotation: -90,
                svgOrigin: sideman.righthand.data('cx')+ ' '+ sideman.righthand.data('cy')  
           },0.9);
        },

        // .to(sideman.node,0.5,{
        //     rotation:40,
        //     transformOrigin:"50% 50%",
        //     y: "+=40"
        // },2).to(sideman.leftleg.node,0.5,{
        //     rotation:-120,
        //     svgOrigin:  sideman.leftleg.data('cx')+ ' ' + sideman.leftleg.data('cy')
        // },2).to(sideman.leftfoot.node,0.5,{
        //     rotation: 85,
        //     svgOrigin:  sideman.leftfoot.data('cx')+ ' ' + sideman.leftfoot.data('cy')
        // },2).to(sideman.rightleg.node,0.5,{
        //     rotation: -5,
        //     svgOrigin:  sideman.rightleg.data('cx')+ ' ' + sideman.rightleg.data('cy')
        // },2).to(sideman.rightfoot.node,0.5,{
        //     rotation: 50,
        //     svgOrigin:  sideman.rightfoot.data('cx')+ ' ' + sideman.rightfoot.data('cy')
        // },2).to(sideman.leftarm.node,0.5,{
        //     rotation:72,
        //     svgOrigin:  sideman.leftarm.data('cx')+ ' ' + sideman.leftarm.data('cy')
        // },2).to(sideman.lefthand.node,0.5,{
        //     rotation:-35,
        //     svgOrigin:  sideman.lefthand.data('cx')+ ' ' + sideman.lefthand.data('cy')
        // },2).to(sideman.head.node,0.5,{
        //     rotation:30,
        //     y: "-=53",
        //     x: "-=30",
        //     transformOrigin: '50% 50%'
        // },2);
        //right arm -152
        flashy: function(sideman){
            return(new TimelineMax()).to(sideman.node,0.5,{
                   rotation:150,
                   x: "+=150",
                   transformOrigin: "50% 50%"             
            },0).to(sideman.rightleg.node,0.5,{
                rotation:-140,
                svgOrigin:  sideman.rightleg.data('cx')+ ' ' + sideman.rightleg.data('cy')
            },0).to(sideman.leftleg.node,0.5,{
                rotation:-140,
                svgOrigin:  sideman.leftleg.data('cx')+ ' ' + sideman.leftleg.data('cy')
            },0).to(sideman.rightarm.node,0.5,{
                rotation: 100,
                svgOrigin:  sideman.rightarm.data('cx')+ ' ' + sideman.rightarm.data('cy')
            },0).to(sideman.righthand.node,0.5,{
                rotation:-70,
                svgOrigin:  sideman.righthand.data('cx')+ ' ' + sideman.righthand.data('cy')
            },0).to(sideman.node,0.5,{
                   rotation:340,
                   x: "+=150",
                   y: "+=30",
                   transformOrigin: "50% 50%"             
            },0.5).to(sideman.rightleg.node,0.5,{
                rotation:-90,
                svgOrigin:  sideman.rightleg.data('cx')+ ' ' + sideman.rightleg.data('cy')
            },0.5).to(sideman.leftleg.node,0.5,{
                rotation:-100,
                svgOrigin:  sideman.leftleg.data('cx')+ ' ' + sideman.leftleg.data('cy')
            },0.5).to(sideman.rightarm.node,0.5,{
                rotation: 140,
                svgOrigin:  sideman.rightarm.data('cx')+ ' ' + sideman.rightarm.data('cy')
            },0.5).to(sideman.righthand.node,0.5,{
                rotation:-70,
                svgOrigin:  sideman.righthand.data('cx')+ ' ' + sideman.righthand.data('cy')
            },0.5).to(sideman.node,0.3,{
                rotation:360,
                y:"-=50",
                x: "+=50"
            },1).to(sideman.rightfoot.node,0.3,{
                rotation:0,
                svgOrigin:  sideman.rightfoot.data('cx')+ ' ' + sideman.rightfoot.data('cy')
            },1).to(sideman.leftfoot.node,0.3,{
                rotation:0,
                svgOrigin:  sideman.leftfoot.data('cx')+ ' ' + sideman.leftfoot.data('cy')
            },1).to(sideman.leftleg.node,0.3,{
                rotation:0,
                svgOrigin:  sideman.leftleg.data('cx')+ ' ' + sideman.leftleg.data('cy')
            },1).to(sideman.rightleg.node,0.3,{
                rotation:0,
                svgOrigin:  sideman.rightleg.data('cx')+ ' ' + sideman.rightleg.data('cy')
            },1).to(sideman.rightarm.node,0.3,{
                rotation:0,
                svgOrigin:  sideman.rightarm.data('cx')+ ' ' + sideman.rightarm.data('cy')
            },1).to(sideman.leftarm.node,0.3,{
                rotation:0,
                svgOrigin:  sideman.leftarm.data('cx')+ ' ' + sideman.leftarm.data('cy')
            },1);
        },

//      .to(sideman.node,0.5,{
//             rotation:40,
//             transformOrigin:"50% 50%",
//             y: "+=40"
//         },2).to(sideman.leftleg.node,0.5,{
//             rotation:-120,
//             svgOrigin:  sideman.leftleg.data('cx')+ ' ' + sideman.leftleg.data('cy')
//         },2).to(sideman.leftfoot.node,0.5,{
//             rotation: 85,
//             svgOrigin:  sideman.leftfoot.data('cx')+ ' ' + sideman.leftfoot.data('cy')
//         },2).to(sideman.rightleg.node,0.5,{
//             rotation: -5,
//             svgOrigin:  sideman.rightleg.data('cx')+ ' ' + sideman.rightleg.data('cy')
//         },2).to(sideman.rightfoot.node,0.5,{
//             rotation: 50,
//             svgOrigin:  sideman.rightfoot.data('cx')+ ' ' + sideman.rightfoot.data('cy')
//         },2).to(sideman.leftarm.node,0.5,{
//             rotation:72,
//             svgOrigin:  sideman.leftarm.data('cx')+ ' ' + sideman.leftarm.data('cy')
//         },2).to(sideman.lefthand.node,0.5,{
//             rotation:-35,
//             svgOrigin:  sideman.lefthand.data('cx')+ ' ' + sideman.lefthand.data('cy')
//         },2).to(sideman.head.node,0.5,{
//             rotation:30,
//             y: "-=66",
//             x: "-=30",
//             transformOrigin: '50% 50%'
//         },2);
        dash: function() {
            return(new TimelineMax()).to(sideman.node,0.5,{
               rotation:10,
               transformOrigin: "50% 50%"             
            },0).to(sideman.rightleg.node,0.5,{
                rotation:-60,
                svgOrigin:  sideman.rightleg.data('cx')+ ' ' + sideman.rightleg.data('cy')
            },0).to(sideman.rightfoot.node,0.5,{
                rotation: 60,
                svgOrigin:  sideman.rightfoot.data('cx')+ ' ' + sideman.rightfoot.data('cy')
            },0).to(sideman.leftleg.node,0.5,{
                rotation:20,
                svgOrigin:  sideman.leftleg.data('cx')+ ' ' + sideman.leftleg.data('cy')
            },0).to(sideman.leftfoot.node,0.5,{
                rotation:20,
                svgOrigin:  sideman.leftfoot.data('cx')+ ' ' + sideman.leftfoot.data('cy')
            },0).to(sideman.node,0.3,{
                x:"+=800",
                rotation:0,
                opacity:0,
                transformOrigin: "50% 50%"
            },0.2);
        }
    }

//run call
    function runAnim(steps,helper,desX,timeline,y,at,startx){
        for(var i =0 ; i< steps; i++){
            at++;
            var distancePerStep = ((1400-desX)/steps)/2;
            timeline.add(tweens.tests.run(helper,4,desX,y,startx),at);
        }
        timeline.add(tweens.tests.rest(helper));
    }

    function countup(){
        count++;
    }

//sequence and tests

// y:+=30,,y: "+=33", x: "+=30",,,,y: "-=53", x: "-=30",

   
    TweenMax.set(sideman.node, {
        scale: 0.3,
        // x: 640, //640 ->1200
        x: 1400,
        y: 640,
        // opacity:0
    });


    TweenMax.set(pillar.node, {
       rotation:87, //73.5
       transformOrigin: '50% 100%',
       y:-500,
       x:-80,
       scaleY: 1.1,
       scaleX:0.8
    });

   TweenMax.set(helper.node, {
        scale: 0.3,
        x:1800, 
        // x:840,
        y: 600
    });


   TweenMax.set(helper2.node, {
        scale: 0.29,
        x:1800,
        // x: 700,
        y: 600
    });
    
    TweenMax.set(helper3.node, {
        scale: 0.25,
        x:1800,
        // x:540,
        y: 580
    });

   TweenMax.set(helper4.node, {
        scale: 0.26,
        x:1800, 
        // x: 460,
        y: 600
    });

   TweenMax.set(helper5.node, {
        scale: 0.26,
        x:1800, 
        // x: 270,
        y: 620
    });


   TweenMax.set(speaker.node, {
        x:955,
        y:580,
        rotation:30,
        scale:0.6,
        opacity:0
    });

    // timeline.add(tweens.tests.lift(sideman));
    timeline.add(tweens.tests.run(sideman,3),0);
    timeline.to(sideman.node,2.25,{
        x: "-=800",
        ease: Power1.easeInOut
    },0);
//test main dude
    // timeline.add(tweens.tests.pillarseqs(pillar),0);
    // timeline.add(tweens.tests.lift2(sideman),0);

//test stick fall
//     timeline.add(tweens.tests.stick(stick),3);
//     timeline.add(tweens.tests.pick(sideman),4);
//    // timeline.add(tweens.tests.stealth(sideman),6);
//     timeline.add(tweens.tests.flashy(sideman),6);
//     timeline.add(tweens.tests.pocketdig(sideman),7.6);

// // run test
//     runAnim(4,helper,840,timeline,660,9,1800);
//     runAnim(4,helper2,740,timeline,680,9,1800);
//     runAnim(4,helper3,540,timeline,620,9,1800);
//     runAnim(4,helper4,460,timeline,620,9,1800);
//     runAnim(4,helper5,270,timeline,620,9,1800);

// // test lifters 
// // afterrun 5.8 x3 - 6.6 , no run : 2.5
//     timeline.add(tweens.tests.helper1lift(helper),15);
//     timeline.add(tweens.tests.helper2(helper2),15);
//     timeline.add(tweens.tests.helper3(helper3),15);
//     timeline.add(tweens.tests.helper4(helper4),15);
//     timeline.add(tweens.tests.helper5(helper5),15);
//     timeline.add(tweens.tests.pillarseq2(pillar),16);
// //main character re lifting
//     // timeline.add(tweens.tests.endlift(sideman),15);

// //
//     timeline.add(tweens.tests.YAY(helper),18);
//     timeline.add(tweens.tests.YAY(helper2),18);
//     timeline.add(tweens.tests.YAY(helper3),18);
//     timeline.add(tweens.tests.YAY(helper4),18);
//     timeline.add(tweens.tests.YAY(helper5),18);
//     timeline.add(tweens.tests.YAY(sideman),18);

    timeline.progress(0);
})();
