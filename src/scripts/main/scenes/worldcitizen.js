(function() {
    var scenes = window.scenes || {};
    var TweenMax = window.TweenMax;
    var Draggable = window.Draggable;
    var CubicBezier = window.CubicBezier;
    var Power1 = window.Power1;
    var Power3 = window.Power3;
    var Back = window.Back;
    var Elastic = window.Elastic;
    var Linear = window.Linear;

    scenes.world = function world(globals) {
        var objects = globals.objects;
        var tweens = globals.tweens;
        var timeline = globals.timeline;
        var start = globals.startOffset;
        var startLabel = globals.startLabel;
        var scene = globals.scene;
        var prevScene = globals.prevScene;
        var vbWidth = globals.vbWidth;
        var vbHeight = globals.vbHeight;

        timeline.add('world', startLabel + '+=' + start);

        TweenMax.set(scene.node, {
            opacity: 0,
            y: vbHeight * 40
        });

        timeline.set(scene.node, {
            opacity: 1,
            y: 0
        }, 'world');


        var earth = objects.makeColoredearth();
        TweenMax.set(earth.node, {
            scale: 2.5,
            transformOrigin: "center",
            opacity: 1
        });
        timeline.set(earth.node, {
            x: -vbWidth * 1.25,
            y: vbHeight * 1.25
        }, 'world');


        var man = objects.makeHappyman();
        TweenMax.set(man.node, {
            scaleX: 0.72,
            scaleY: 0.82,
            transformOrigin: "center",
            opacity: 1
        });
        TweenMax.set(man.node, {
            x: vbHeight / 2 + 140,
            y: vbWidth / 2 - 385,
            opacity: 1
        });
        var bg = scene.rect(-vbWidth * 10, -vbHeight * 10, vbWidth * 30, vbHeight * 30).attr({
            fill: '#20586A'
        });

        var mx = vbWidth / 2 - 19;
        var my = vbHeight / 2 + 68;
        var maskx = 0;
        var masky = 0;
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            maskx = mx;
            masky = my;
        }
        var mask = objects.make.mask(objects.backstage.circle(maskx, masky, 0).attr({
            fill: 'white'
        }));

        TweenMax.set(mask.mask.node, {
            x: mx,
            y: my
        });

        var aura = scene.g();
        var aura1 = aura.circle(0, 0, 120).attr({
            fill: 'rgba(102, 242, 234, 0.6)',
            stroke: 'rgba(102, 242, 234, 1)'
        }).node;
        var aura2 = aura.circle(0, 0, 120).attr({
            fill: 'rgba(102, 242, 234, 0.6)',
            stroke: 'rgba(102, 242, 234, 0.6)'
        }).node;
        var core = aura.circle(0, 0, 120).attr({
            fill: 'rgba(102, 242, 234, 1)',
            stroke: 'rgba(102, 242, 234, 1)'
        }).node;
        TweenMax.set(aura1, {
            scale: 1.1,
            transformOrigin: 'center',
        });
        TweenMax.set(aura2, {
            scale: 0.8,
            transformOrigin: 'center',
        });
        TweenMax.set(core, {
            scale: 0.5,
            transformOrigin: 'center',
        });
        TweenMax.set(aura.node, {
            opacity: 0,
            scale: 0.4,
            transformOrigin: 'center',
        });
        TweenMax.set(aura.node, {
            y: vbHeight / 2 + 68,
            x: vbWidth / 2 - 20
        });
        scene.add(aura, mask);
        mask.add(bg, earth, man);

        timeline.add(tweens.swapFade(prevScene.memory, aura).timeScale(1), 'world');
        timeline.add(tweens.energyExplode(aura).duration(0.7), 'world+=0.1');

        timeline.add('explosion', '-=0.1');
        var explossion = tweens.sequence().add([tweens.expand(core), tweens.maskExpand(mask), tweens.zoomOut(scene, mx, my)])
        timeline.add(explossion.duration(3), 'explosion');
        timeline.to(prevScene.node, 0.1, {
            opacity: 0
        }, 'explosion+=0.2');

        var savePeople1 = objects.make.saveWorldSubScene(100, 1600, [
            ["M", mx, my + 150],
            ["C", mx + 200, my + 400, mx + 200, my + 600, mx, my + 1300]
        ], scenes.addScene(scenes.allelements));
        var savePeople2 = objects.make.saveWorldSubScene(-2300, 600, [
            ["M", mx, my + 150],
            ["C", mx - 600, my - 1000, mx - 2000, my - 1000, mx - 2400, my + 450]
        ], scenes.addScene(scenes.allelements));
        var savePeople3 = objects.make.saveWorldSubScene(-1400, 2300, [
            ["M", mx, my + 150],
            ["C", mx - 600, my - 600, mx - 1400, my + 1400, mx - 1400, my + 2050]
        ], scenes.addScene(scenes.allelements));

        mask.add(savePeople1, savePeople2, savePeople3);
        var replays = tweens.sequence().add([savePeople1.timeline, savePeople2.timeline, savePeople3.timeline]);
        timeline.add(replays.duration(3), 'explossion-=2');

        return globals;
    };

    scenes.world.tweens = {
        expand: function(core) {
            return this.sequence().to(core, 1, {
                scale: 8,
                transformOrigin: 'center',
                // ease: Back.easeIn.config(1, 0.3)
            }, 0).to(core, 4, {
                scale: 200,
                transformOrigin: 'center',
                // ease: Power3.easeIn
            }, 1.1);
        },
        maskExpand: function(mask) {
            return this.sequence().to(mask.mask.node, 0.2, {
                attr: {
                    r: 120
                },
                transformOrigin: "center",
                ease: Power1.easeInOut
            }, 0).to(mask.mask.node, 1, {
                attr: {
                    r: 240
                },
                transformOrigin: "center",
                ease: Power1.easeInOut
            }, 0).to(mask.mask.node, 4, {
                attr: {
                    r: 10000
                },
                transformOrigin: "center",
                ease: Power1.easeIn
            }, 1);
        },
        zoomOut: function(scene, mx, my) {
            return this.sequence().fromTo(scene.node, 1, {
                scale: 1,
            }, {
                scale: 0.8,
                svgOrigin: [mx, my].join(' '),
                // ease: Power3.easeIn
            }, 'explosion').to(scene.node, 1, {
                scale: 0.1,
                svgOrigin: [mx, my].join(' '),
                ease: Power3.none
            }, 'explosion+=1').to(scene.node, 1, {
                x: '+=200',
                y: '-=200',
                ease: Power3.none
            }, 'explosion+=1');
        }
    };

})();
