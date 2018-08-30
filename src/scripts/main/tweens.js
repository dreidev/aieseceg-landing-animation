(function() {
    var TimelineMax = window.TimelineMax;
    var TimelineLite = window.TimelineLite;
    var vbWidth = window.vbWidth;
    var vbHeight = window.vbHeight;
    var TweenMax = window.TweenMax;
    var Power0 = window.Power0;
    var Power1 = window.Power1;
    var Power3 = window.Power3;
    var Back = window.Back;
    var Elastic = window.Elastic;
    var Expo = window.Expo;
    var CubicBezier = window.CubicBezier;

    CubicBezier.create("CrashEase", 0.73, 2.08, -0.22, 1.64);
    CubicBezier.create("CrashGroundEase", 1.29, 1.31, 0.75, 1);
    CubicBezier.create("PillarCrashEase", 1.16, 1.06, 0.5, 1);
    CubicBezier.create("cameraZoom", 0.43, 1.06, 0.02, 1.02);
    var tweens = window.tweens = {
        sequence: function(opt) {
            return new TimelineMax(opt);
        },
        subtl: function(tl, start, end) {
            tl.pause();
            end = end || tl.duration();
            if (end && typeof(end) === 'string' && end < 0) {
                end = tl.duration() + end;
            }
            return this.sequence().add(tl.tweenFromTo(start, end));
        },
        shake: function(el) {
            return tweens.sequence().to(el.node, 0.05, {
                y: '-=20'
            }).to(el.node, 0.05, {
                y: '+=20'
            });
        },
        puls: function puls(p, scale) {
            scale = scale || 2;
            return this.sequence().fromTo(p.node, 1, {
                opacity: 0.1,
                // scale:1,
            }, {
                // scale: 2, 
                opacity: 0.4,
                yoyo: true,
                repeat: 1,
                ease: Power3.easeOut,
            }, 0).fromTo(p.node, 1, {
                scale: 1,
                transformOrigin: '50%, 50%'
            }, {
                scale: scale,
                transformOrigin: '50%, 50%',
                yoyo: true,
                repeat: 1,
                ease: Power3.easeOut,
            }, 0);
        },
        fadeIn: function(el) {
            var tl = TweenMax.to(el.node, 1, {
                opacity: 1,
                ease: Power1.easeInOut
            });
            return tl;
        },
        swapFade: function(el, el2, buffer) {
            buffer = buffer || 0;
            var tl = this.sequence().to(el2.node, 0.5, {
                opacity: 1,
                ease: Power1.easeInOut
            }, '+=' + buffer).to(el.node, 0.5, {
                opacity: 0,
                ease: Power1.easeInOut
            }, 0);
            return tl;
        },
        fadeOut: function(el) {
            var tl = TweenMax.to(el.node, 1, {
                opacity: 0,
                ease: Power1.easeInOut
            });
            return tl;
        },
        slideInOut: function slideInOut(prevText, text, offset, ease, offsetTiming) {
            offset = offset === (void 0) ? 0 : offset;
            ease = ease || CubicBezier.get("CrashGroundEase");
            offsetTiming = offsetTiming || 0;
            var stringOff = '-=';
            if (offsetTiming < 0) {
                offsetTiming = offsetTiming * -1;
                stringOff = '+=';
            }
            var tl = this.sequence().fromTo(text.node, 0.5, {
                y: vbHeight * 1.5,
                opacity: 0
            }, {
                y: vbHeight / 2 - offset,
                ease: ease,
                opacity: 1
            });
            if (prevText != null) {
                tl.to(prevText.node, 0.5, {
                    y: -vbHeight,
                    ease: ease,
                    opacity: 0
                }, stringOff + offsetTiming);
            }
            return tl;
        },
        // slideIn: function slideInOut(prevText, text, offset, ease, offsetTiming) {
        //     offset = offset === (void 0) ? 0 : offset;
        //     ease = ease || CubicBezier.get("CrashGroundEase");
        //     offsetTiming = offsetTiming || 0;
        //     var tl = this.sequence().fromTo(text.node, 0.5, {
        //         y: vbHeight * 1.5,
        //         opacity: 0
        //     }, {
        //         y: vbHeight / 2 - offset,
        //         ease: ease,
        //         opacity: 1
        //     }).to(prevText.node, 0.5, {
        //         y: -vbHeight,
        //         ease: ease,
        //         opacity: 0
        //     }, '-=' + offsetTiming);
        //     return tl;
        // },
        float: function float(el) {
            var delay = Math.random();
            var ysign = (Math.random() > 0.5) ? '-' : '+';
            var seq = tweens.sequence();
            seq.add(TweenMax.to(el, 2, {
                y: ysign + '=10',
                ease: Power1.easeInOut,
                yoyo: true,
                repeat: 1
            }), delay);
            return seq;
        },
        sideYoyo: function float(el) {
            var tl = tweens.sequence();
            tl.add(TweenMax.to(el, 2, {
                x: '+=10',
                ease: Power1.easeInOut,
                yoyo: true,
                repeat: 1
            }));
            return tl;
        },
        swipeOffStage: function(el) {
            var tl = tweens.sequence();
            tl.to(el.node, 1, {
                x: vbWidth * 2,
                ease: Power1.easeInOut,
            });
            return tl;
        },
        slip: function(man) {
            return (new TimelineMax()).to(man.righthand.node, 0.4, {
                rotation: -60,
                svgOrigin: man.righthand.data('rc').cx + ' ' + man.righthand.data('rc').cy,
                ease: Power3.easeOut
            }, 0).to(man.righthand.node, 0.4, {
                morphSVG: man.righthand.data('morphs')[1]
            }, 0).to(man.lefthand.node, 0.4, {
                rotation: -80,
                svgOrigin: man.lefthand.data('rc').cx + ' ' + man.lefthand.data('rc').cy,
                ease: Back.easeIn
            }, 0).to(man.leftleg.node, 0.4, {
                rotation: -20,
                svgOrigin: man.leftleg.data('rc').cx + ' ' + man.leftleg.data('rc').cy,
                ease: Back.easeIn
            }, 0).to(man.leftleg.node, 0.2, {
                morphSVG: man.leftleg.data('morphs')[1]
            }, 0).to(man.rightleg.node, 0.2, {
                rotation: -20,
                svgOrigin: man.rightleg.data('rc').cx + ' ' + man.rightleg.data('rc').cy,
                ease: Back.easeIn
            }, 0).to(man.rightleg.node, 0.1, {
                morphSVG: man.rightleg.data('morphs')[1]
            }, 0).to(man.body.node, 0.3, {
                morphSVG: man.body.data('morphs')[1]
            }, 0).to(man.node, 0.4, {
                rotation: -90,
                transformOrigin: '50% 50%',
                ease: Back.easeIn
            }, 0);
        },
        crash: function(man) {
            return (new TimelineMax({})).to(man.righthand.node, 0.2, {
                rotation: 20,
                svgOrigin: man.righthand.data('rc').cx + ' ' + man.righthand.data('rc').cy,
                ease: CubicBezier.get("CrashEase")
            }, 0).to(man.lefthand.node, 0.2, {
                rotation: -30,
                svgOrigin: man.lefthand.data('rc').cx + ' ' + man.lefthand.data('rc').cy,
                ease: CubicBezier.get("CrashEase")
            }, 0).to(man.rightleg.node, 0.2, {
                rotation: 15,
                svgOrigin: man.rightleg.data('rc').cx + ' ' + man.rightleg.data('rc').cy,
            }, 0).to(man.rightleg.node, 0.2, {
                morphSVG: man.rightleg.data('morphs')[0]
            }, 0).to(man.leftleg.node, 0.2, {
                rotation: -5,
                svgOrigin: man.leftleg.data('rc').cx + ' ' + man.leftleg.data('rc').cy,
                ease: Power1.easeOut
            }, 0).to(man.leftleg.node, 0.2, {
                morphSVG: man.leftleg.data('morphs')[0]
            }, 0).to(man.body.node, 0.2, {
                morphSVG: man.body.data('morphs')[0]
            }, 0);
        },
        falling: function falling(man, repeat, y) {
            repeat = repeat || 0;
            var tl = new TimelineMax();
            tl.to(man.node, Math.max(repeat, 1), {
                x: '-=50',
                y: y === undefined ? vbHeight - 360 : y,
                ease: CubicBezier.get("CrashGroundEase")
            }, 0);
            tl.to(man.lefthand.node, 0.5, {
                rotation: '+=2',
                yoyo: true,
                repeat: repeat,
                ease: Power1.easeInOut
            }, 0).to(man.righthand.node, 0.5, {
                rotation: '-=5',
                yoyo: true,
                repeat: repeat,
                ease: Power1.easeInOut
            }, 0).to(man.leftleg.node, 0.5, {
                rotation: '+=1',
                yoyo: true,
                repeat: repeat,
                ease: Power1.easeInOut
            }, 0).to(man.rightleg.node, 0.5, {
                rotation: '-=1',
                yoyo: true,
                repeat: repeat,
                ease: Power1.easeInOut
            }, 0);
            return tl;
        },
        fallCrash: function fallCrash(man, y) {
            var tl = new TimelineMax();
            tl.add(this.slip(man));
            tl.add(this.falling(man, 0, y));
            tl.add(this.crash(man), '-=0.25');
            return tl;
        },
        pillarFall: function pillarFall(pillar, ang) {
            return this.sequence().to(pillar.node, 0.5, {
                rotation: '+=5',
                transformOrigin: '50% 100%',
                ease: Power0.easeInOut,
                yoyo: true,
                repeat: 5,
            }).to(pillar.node, 1.6, {
                rotation: '+=45',
                transformOrigin: '50% 100%',
                ease: Power1.easeIn,
            }).to(pillar.node, 0.6, {
                rotation: ang + 0.4, //81.5
                transformOrigin: '50% 100%',
                ease: Power1.none,
            }).to(pillar.node, 0.3, {
                rotation: ang, //81.5
                transformOrigin: '50% 100%',
                // ease: Sine.easeIn
            });
        },
        otherPillarsFall: function otherPillarsFall(pillar, ang) {
            return this.sequence().to(pillar.node, 1, {
                rotation: ang, //81.5
                transformOrigin: '50% 100%',
                ease: Power1.none,
            });
        },
        scatter: function scatter(el) {
            var tl = this.sequence().to(el.node, 1, {
                scale: 10,
                transformOrigin: '50% 50%'
            });
            // el.children();
            return tl;
        },
        worldExplode: function worldExplode(map) {
            var ease = Expo.easeOut;
            return this.sequence().to(map.europe.node, 1, {
                rotation: 28,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.europe.node, 1, {
                x: "+=33",
                y: "-=36",
                ease: ease
            }, 0).to(map.locations.e.group.node, 1, {
                rotation: -28,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.locations.a1.group.node, 1, {
                rotation: -38,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.locations.a2.group.node, 1, {
                rotation: -38,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.africa.node, 1, {
                rotation: 38,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.africa.node, 1, {
                x: "+=15",
                y: "+=34",
                ease: ease
            }, 0).to(map.locations.n1.group.node, 1, {
                rotation: 11,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.locations.n2.group.node, 1, {
                rotation: 11,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.north.node, 1, {
                rotation: -11,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.north.node, 1, {
                x: "-=25",
                y: "-=13",
                ease: ease
            }, 0).to(map.locations.s1.group.node, 1, {
                rotation: 26,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.locations.s2.group.node, 1, {
                rotation: 26,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.south.node, 1, {
                rotation: -26,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.south.node, 1, {
                x: "-=38",
                y: "+=8",
                ease: ease
            }, 0);
        },
        popIn: function(people) {
            people = [].map.call(people, function(p) {
                return p.node;
            });
            var stagger = 0.1;
            return this.sequence().add(TweenMax.staggerTo(people, 0.2, {
                opacity: 1,
                // scale: 1.2,
                // transformOrigin: '50% 50%'
            }, stagger), 0).add(TweenMax.staggerTo(people, 0.2, {
                y: '-=20',
            }, stagger), 0.1).add(TweenMax.staggerTo(people, 0.2, {
                y: '+=20',
            }, stagger), 0.3);
        },
        drawConnection: function(connection) {
            var path = connection.clone();
            var path2 = connection.clone();
            var path3 = connection.clone();
            var seq = this.sequence();

            return seq;
        },
        pullWorld: function pullWorld(map) {
            var ease = Expo.easeIn;
            return this.sequence().to(map.europe.node, 1, {
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.europe.node, 1, {
                x: "-=33",
                y: "+=36",
                ease: ease
            }, 0).to(map.locations.e.group.node, 1, {
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.locations.a1.group.node, 1, {
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.locations.a2.group.node, 1, {
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.africa.node, 1, {
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.africa.node, 1, {
                x: "-=15",
                y: "-=34",
                ease: ease
            }, 0).to(map.locations.n1.group.node, 1, {
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.locations.n2.group.node, 1, {
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.north.node, 1, {
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.north.node, 1, {
                x: "+=25",
                y: "+=13",
                ease: ease
            }, 0).to(map.locations.s1.group.node, 1, {
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.locations.s2.group.node, 1, {
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.south.node, 1, {
                rotation: 0,
                transformOrigin: '50% 50%',
                ease: ease
            }, 0).to(map.south.node, 1, {
                x: "+=38",
                y: "-=8",
                ease: ease
            }, 0);
        },
        hangConnection: function hangConnection(path, opt) {
            var paths = path.data('morphs');
            return this.sequence(opt).to(path.node, 0.5, {
                morphSVG: paths[1]
            }).to(path.node, 0.5, {
                morphSVG: paths[2]
            });
        },
        rest: function(helper) {
            return tweens.sequence().to(helper.head.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.head.data('cx') + ' ' + helper.head.data('cy')
            }, 0).to(helper.node, 0.2, {
                rotation: 0,
                transformOrigin: '50% 50%'
            }, 0).to(helper.leftarm.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy')
            }, 0).to(helper.lefthand.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
            }, 0).to(helper.righthand.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.righthand.data('cx') + ' ' + helper.righthand.data('cy')
            }, 0).to(helper.rightarm.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.rightarm.data('cx') + ' ' + helper.rightarm.data('cy')
            }, 0).to(helper.leftleg.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
            }, 0).to(helper.leftfoot.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
            }, 0).to(helper.rightleg.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
            }, 0).to(helper.rightfoot.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
            }, 0);
        },
        memory: function(memory1, memory2, memory3, memory4, cx, cy) {
            var center = [cx || vbWidth / 2, cy || vbHeight / 2].join[' '];
            return this.sequence().set([memory1.node, memory2.node, memory3.node], {
                scale: 0.1,
                opacity: 1,
                svgOrigin: center,
                ease: Power3.easeInOut
            }, 0).set([memory1.node, memory2.node, memory3.node], {
                x: cx,
                y: cy,
            }, 0).to(memory1.node, 0.5, {
                scale: 1,
                svgOrigin: center,
                ease: Power3.easeInOut
            }, 0).to(memory1.node, 0.5, {
                x: cx - 360,
                y: cy - 200,
                ease: Power3.easeInOut
            }, 0).to(memory1.node, 0.5, {
                x: cx - 120,
                y: cy - 400,
                ease: Power3.easeInOut
            }, 2).to(memory1.node, 0.2, {
                opacity: 0,
            }, 2.4).to(memory2.node, 0.5, {
                scale: 1,
                svgOrigin: center,
                ease: Power3.easeInOut
            }, 0.6).to(memory2.node, 0.5, {
                y: cy - 400,
                x: cx - 120,
                ease: Power3.easeInOut
            }, 0.6).to(memory2.node, 0.1, {
                opacity: 0,
                ease: Power3.easeInOut
            }, 2.4).to(memory3.node, 0.5, {
                scale: 1,
                svgOrigin: center,
                ease: Power3.easeInOut
            }, 1.2).to(memory3.node, 0.5, {
                x: cx + 120,
                y: cy - 200,
                ease: Power3.easeInOut
            }, 1.2).to(memory3.node, 0.5, {
                x: cx - 120,
                y: cy - 400,
                ease: Power3.easeInOut
            }, 2).to(memory3.node, 0.2, {
                opacity: 0,
                ease: Power3.easeInOut
            }, 2.4).to(memory4.node, 0.1, {
                opacity: 1,
                ease: Power3.easeInOut
            }, 2.4).fromTo(memory4.node, 0.5, {
                x: cx - 120,
                y: cy - 400,
                ease: Power3.easeInOut
            }, {
                scale: 0.4,
                svgOrigin: center,
                ease: Power3.easeInOut
            }, 2.5).to(memory4.node, 0.5, {
                x: cx - 48,
                y: cy - 60,
                ease: Power3.easeInOut
            }, 2.5);
        },
        turnToEnergy: function(memory) {
            var seq = this.sequence();
            var aura = memory.children()[0].node;
            var aura2 = memory.children()[1].node;
            var circle = memory.children()[2].node;
            var map = memory.children()[3].node;
            seq.to(aura, 0.8, {
                scale: 8,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 0).to(map, 0.2, {
                opacity: 0,
                ease: Back.easeIn.config(1, 0.3)
            }, 0.3).to([circle, map], 0.8, {
                scale: 0.8,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 0.3).to(circle, 0.2, {
                fill: '#fbb92e',
                ease: Back.easeIn.config(1, 0.3)
            }, 0.3).to(aura, 0.6, {
                scale: 1,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 0.8).to(aura2, 0.8, {
                scale: 2,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 0.3).to(aura2, 0.5, {
                scale: 0.8,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 0.9).to(circle, 0.5, {
                scale: 0.5,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 0.9).to(aura, 0.4, {
                scale: 1.1,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 0.9);
            return seq;
        },
        energyExplode: function(memory) {
            var seq = this.sequence();
            var outerAura = memory.children()[0].node;
            var innerAura = memory.children()[1].node;
            var core = memory.children()[2].node;
            seq.add('start');
            seq.to(outerAura, 0.4, {
                scale: 5,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 'start').to(innerAura, 0.4, {
                scale: 2.5,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 'start+=0.1').to(core, 0.4, {
                scale: 0.2,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 'start+=0.2');

            seq.to(outerAura, 0.4, {
                scale: 1,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 0.4).to(innerAura, 0.4, {
                scale: 0.8,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 0.5).to(core, 0.4, {
                scale: 0.4,
                transformOrigin: '50% 50%',
                ease: Back.easeIn.config(1, 0.3)
            }, 0.6).to(core, 0.1, {
                fill: 'rgba(45, 176, 147, 0.2)',
                stroke: 'rgba(45, 176, 147, 1)'
            }, 1);

            return seq;

        },
        color: function(thinker, man) {
            return (new TimelineMax()).to(thinker.node, 0.3, {
                opacity: 0,
                ease: Power3.easeInOut
            }).to(man.node, 0.3, {
                opacity: 1,
                ease: Power3.easeInOut
            }, 0);
        },
        run: function(helper, steps) {
            return tweens.sequence({
                    repeat: steps
                })
                .fromTo(helper.node, 0.075, {
                    rotation: -30,
                    y: "+=20",
                    // opacity:0,
                    transformOrigin: '50% 50%'
                }, {
                    opacity: 1,
                    y: "-=20",
                    // opacity:1,
                    transformOrigin: '50% 50%'
                }, 0)
                .to(helper.node, 0.075, {
                    rotation: -30,
                    y: "+=20",
                    // opacity:0,
                    transformOrigin: '50% 50%'
                })
                .fromTo(helper.rightarm.node, 0.15, {
                    rotation: 60,
                    svgOrigin: helper.rightarm.data('cx') + ' ' + helper.rightarm.data('cy')
                }, {
                    rotation: -50,
                    svgOrigin: helper.rightarm.data('cx') + ' ' + helper.rightarm.data('cy')
                }, 0)
                .fromTo(helper.righthand.node, 0.15, {
                    rotation: 90,
                    svgOrigin: helper.righthand.data('cx') + ' ' + helper.righthand.data('cy')
                }, {
                    rotation: 130,
                    svgOrigin: helper.righthand.data('cx') + ' ' + helper.righthand.data('cy')
                }, 0)
                .fromTo(helper.leftleg.node, 0.15, {
                    rotation: -15,
                    svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                }, {
                    rotation: 70,
                    svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                }, 0)
                .fromTo(helper.rightleg.node, 0.15, {
                    rotation: 80,
                    svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                }, {
                    rotation: -15,
                    svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                }, 0)
                .fromTo(helper.leftfoot.node, 0.15, {
                    rotation: -20,
                    svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                }, {
                    rotation: -45,
                    svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                }, 0)
                .fromTo(helper.rightfoot.node, 0.15, {
                    rotation: -45,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, {
                    rotation: -20,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0)
                .fromTo(helper.leftarm.node, 0.15, {
                    rotation: -50,
                    svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy')
                }, {
                    rotation: 60,
                    ease: Power1.easeOut,
                    svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy')
                }, 0)
                .to(helper.lefthand.node, 0.15, {
                    rotation: 90,
                    svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                }, 0)
                .fromTo(helper.lefthand.node, 0.15, {
                    rotation: 130,
                    ease: Power1.easeOut,
                    svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                }, {
                    rotation: 90,
                    ease: Power1.easeOut,
                    svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                }, 0);

        },
        sideman: {
            start: function start(sideman) {
                var seq = tweens.sequence();

                seq.set(sideman.rightleg.node, {
                    rotation: 10,
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 0).set(sideman.rightfoot.node, {
                    rotation: 20,
                    svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
                }, 0);

                seq.set(sideman.leftleg.node, {
                    rotation: -30,
                    svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
                }, 0).set(sideman.leftfoot.node, {
                    rotation: 30,
                    svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
                }, 0);

                seq.set(sideman.rightarm.node, {
                    rotation: 45,
                    svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
                }, 0).set(sideman.righthand.node, {
                    rotation: -10,
                    svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
                }, 0);

                seq.set(sideman.leftarm.node, {
                    rotation: 45,
                    svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
                }, 0).set(sideman.lefthand.node, {
                    rotation: -10,
                    svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
                }, 0);

                seq.set(sideman.head.node, {
                    rotation: 75,
                    svgOrigin: sideman.head.data('cx') + ' ' + sideman.head.data('cy')
                }, 0);
                seq.set(sideman.node, {
                    rotation: 20,
                    transformOrigin: '50% 50%'
                }, 0).set(sideman.node, {
                    y: vbHeight / 2 + 0,
                    x: vbWidth / 2 + 100,
                    scale: 0.35,
                    opacity: 1,
                }, 0);
                return seq;
            },
            basePose: function basePose(sideman) {
                return tweens.sequence().to(sideman.leftleg.node, 1, {
                    rotation: -100,
                    svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
                }, 0).to(sideman.leftfoot.node, 1, {
                    rotation: 90,
                    svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
                }, 0).to(sideman.rightleg.node, 1, {
                    rotation: -20,
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 0).to(sideman.rightfoot.node, 1, {
                    rotation: 70,
                    svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
                }, 0).to(sideman.lefthand.node, 1, {
                    rotation: -10,
                    svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
                }, 0).to(sideman.leftarm.node, 1, {
                    rotation: 55,
                    svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
                }, 0).to(sideman.rightarm.node, 1, {
                    rotation: 0,
                    svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
                }, 0).to(sideman.righthand.node, 1, {
                    rotation: 0,
                    svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
                }, 0).to(sideman.head.node, 1, {
                    rotation: 85,
                    svgOrigin: sideman.head.data('cx') + ' ' + sideman.head.data('cy')
                }, 0).to(sideman.node, 1, {
                    rotation: 35,
                    transformOrigin: '50% 50%'
                }, 0).to(sideman.node, 1, {
                    y: vbHeight / 2 + 33,
                }, 0);
            },
            lowestPoint: function(sideman) {
                var seq = tweens.sequence();
                seq.to(sideman.leftleg.node, 1, {
                    rotation: -130,
                    svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
                }, 0).to(sideman.leftfoot.node, 1, {
                    rotation: 90,
                    svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
                }, 0).to(sideman.rightleg.node, 1, {
                    rotation: -10,
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 0).to(sideman.rightfoot.node, 1, {
                    rotation: 50,
                    svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
                }, 0).to(sideman.lefthand.node, 1, {
                    rotation: -10,
                    svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
                }, 0).to(sideman.leftarm.node, 1, {
                    rotation: 45,
                    svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
                }, 0).to(sideman.head.node, 1, {
                    rotation: 75,
                    svgOrigin: sideman.head.data('cx') + ' ' + sideman.head.data('cy')
                }, 0).to(sideman.node, 1, {
                    rotation: 45,
                    transformOrigin: '50% 50%'
                }, 0).to(sideman.node, 1, {
                    y: vbHeight / 2 + 50,
                }, 0);
                return seq;
            }
        },
        absorbImpact: function(sideman) {
            var seq = this.sequence();
            seq.add(this.sideman.lowestPoint(sideman).duration(0.05));
            seq.add(this.sideman.basePose(sideman).duration(0.3));
            return seq;
        },
        bend_head: function(sideman) {
            var seq = tweens.sequence();
            seq.to(sideman.head.node, 0.5, {
                rotation: 80,
                svgOrigin: sideman.head.data('cx') + ' ' + sideman.head.data('cy')
            }, 0);
            return seq;
        },
        liftpillar: function(sideman, down) {
            return (new TimelineMax()).to(sideman.node, 1, {
                rotation: 5,
                y: "-=" + down.toString(),
                transformOrigin: '50% 50%'
            }, 0).to(sideman.leftleg.node, 1, {
                rotation: -60,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, 0).to(sideman.leftfoot.node, 1, {
                rotation: 70,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            }, 0).to(sideman.rightleg.node, 1, {
                rotation: 27,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 0).to(sideman.rightfoot.node, 1, {
                rotation: 30,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            }, 0).to(sideman.leftarm.node, 1, {
                rotation: 110,
                svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
            }, 0).to(sideman.lefthand.node, 1, {
                rotation: -20,
                svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
            }, 0);
        },
        bend_downLower: function(sideman) {
            var seq = tweens.sequence();
            seq.to(sideman.node, 0.5, {
                rotation: 60,
                transformOrigin: "50% 50%",
                y: "+=30"
            }, 0).to(sideman.leftleg.node, 0.5, {
                rotation: -120,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, 0).to(sideman.leftfoot.node, 0.5, {
                rotation: 85,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            }, 0).to(sideman.rightleg.node, 0.5, {
                rotation: -25,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 0).to(sideman.rightfoot.node, 0.5, {
                rotation: 50,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            }, 0).to(sideman.leftarm.node, 0.5, {
                rotation: 50,
                svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
            }, 0).to(sideman.lefthand.node, 0.5, {
                rotation: -35,
                svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
            }, 0);
            return seq;
        },
        bend_downAnticipation: function(sideman) {
            var seq = tweens.sequence();
            seq.to(sideman.node, 0.2, {
                rotation: 40,
                transformOrigin: "50% 50%",
                y: "+=30"
            }, 0).to(sideman.leftleg.node, 0.2, {
                rotation: -120,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, 0).to(sideman.leftfoot.node, 0.2, {
                rotation: 85,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            }, 0).to(sideman.rightleg.node, 0.2, {
                rotation: -5,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 0).to(sideman.rightfoot.node, 0.2, {
                rotation: 50,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            }, 0).to(sideman.leftarm.node, 0.2, {
                rotation: 72,
                svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
            }, 0).to(sideman.lefthand.node, 0.2, {
                rotation: -35,
                svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
            }, 0);

            return seq;
        },
        lift: function(sideman) {
            var seq = tweens.sequence();
            seq.add(this.liftpillar(sideman, 30).duration(1));
            seq.add(this.bend_downAnticipation(sideman).duration(1));
            seq.add(this.liftpillar(sideman, 30).duration(1));

            return seq;
        },

        lift2: function(sideman) {
            var seq = new TimelineMax();

            seq.add(this.liftpillar(sideman, 30), 0);
            seq.add(this.bend_downAnticipation(sideman), 1);
            seq.add(this.liftpillar(sideman, 30), 1.2);
            seq.add(this.bend_downAnticipation(sideman), 2.2);
            seq.add(this.liftpillar(sideman, 30), 2.4);
            seq.add(this.bend_downAnticipation(sideman), 3.4);


            // seq.add(this.liftpillar(sideman).duration(1));
            // seq.add(this.bend_downAnticipation(sideman).duration(0.2));
            // seq.add(this.liftpillar(sideman).duration(1));
            // seq.add(this.bend_downAnticipation(sideman).duration(0.2));
            // seq.add(this.liftpillar(sideman).duration(1));
            // seq.add(this.bend_downAnticipation(sideman).duration(0.2));
            return seq;

        },
        helper1: {
            lowestPoint: function(helper) {
                var seq = tweens.sequence();

                seq.to(helper.body.node, {}, 0)
                    .to(helper.rightarm.node, 1, {
                        rotation: 110,
                        svgOrigin: helper.rightarm.data('cx') + ' ' + helper.rightarm.data('cy')
                    }, 0)
                    .to(helper.leftarm.node, 1, {
                        rotation: -130,
                        svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy')
                    }, 0)
                    .to(helper.righthand.node, 1, {
                        rotation: 40,
                        svgOrigin: helper.righthand.data('cx') + ' ' + helper.righthand.data('cy')
                    }, 0)
                    .to(helper.lefthand.node, 1, {
                        rotation: -40,
                        svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                    }, 0)
                    .to(helper.leftleg.node, 1, {
                        rotation: -75,
                        svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                    }, 0)
                    .to(helper.rightleg.node, 1, {
                        rotation: 80,
                        svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                    }, 0)
                    .to(helper.leftfoot.node, 1, {
                        rotation: 50,
                        svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                    }, 0)
                    .to(helper.rightfoot.node, 1, {
                        rotation: -100,
                        svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                    }, 0)
                    .to(helper.node, 1, {
                        rotation: 5,
                        y: "-=5",
                        transformOrigin: "50% 50%"
                    }, 0);
                return seq;
            },
            highestPoint: function(helper) {
                var seq = tweens.sequence();
                seq.to(helper.rightarm.node, 0.5, {
                    rotation: 120,
                    svgOrigin: helper.rightarm.data('cx') + ' ' + helper.rightarm.data('cy')
                }, 0).to(helper.righthand.node, 0.5, {
                    rotation: 30,
                    svgOrigin: helper.righthand.data('cx') + ' ' + helper.righthand.data('cy')
                }, 0).to(helper.lefthand.node, 0.5, {
                    rotation: -30,
                    svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                }, 0).to(helper.leftleg.node, 0.5, {
                    rotation: -40,
                    svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                }, 0).to(helper.rightleg.node, 0.5, {
                    rotation: 40,
                    svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                }, 0).to(helper.leftfoot.node, 0.5, {
                    rotation: 30,
                    svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                }, 0).to(helper.rightfoot.node, 0.5, {
                    rotation: -20,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0).to(helper.node, 0.5, {
                    y: "-=35",
                    transformOrigin: "50% 50%"
                }, 0);
                return seq;
            },
            lift: function(helper) {

                var seq = tweens.sequence();

                // seq.to(helper.node, 0.5, {
                //     y: "-=30",
                //     transformOrigin: "50% 50%"
                // }, 0);

                seq.add(this.lowestPoint(helper), 0);
                seq.add(this.highestPoint(helper), 2);
                return seq;

            }
        },
        helper2: {

            lowestPoint: function(helper) {
                var seq = tweens.sequence();
                seq.to(helper.leftleg.node, 1, {
                    rotation: 50,
                    svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                }, 0).to(helper.rightleg.node, 1, {
                    rotation: 110,
                    svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                }, 0).to(helper.leftfoot.node, 1, {
                    rotation: -90,
                    svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                }, 0).to(helper.rightfoot.node, 1, {
                    rotation: -70,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0).to(helper.leftarm.node, 1, {
                    rotation: 135,
                    svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy')
                }, 0).to(helper.rightarm.node, 1, {
                    rotation: 155,
                    svgOrigin: helper.rightarm.data('cx') + ' ' + helper.rightarm.data('cy')
                }, 0).to(helper.lefthand.node, 1, {
                    rotation: 50,
                    svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                }, 0).to(helper.righthand.node, 1, {
                    rotation: 20,
                    svgOrigin: helper.righthand.data('cx') + ' ' + helper.righthand.data('cy')
                }, 0).to(helper.node, 1, {
                    rotation: -40,
                    y: "+=5",
                    transformOrigin: '50% 50%'
                }, 0);
                return seq;
            },
            highestPoint: function(helper) {
                var seq = tweens.sequence();
                seq.to(helper.leftleg.node, 0.5, {
                    rotation: 20,
                    svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                }, 0).to(helper.rightleg.node, 0.5, {
                    rotation: 50,
                    svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                }, 0).to(helper.leftfoot.node, 0.5, {
                    rotation: -30,
                    svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                }, 0).to(helper.rightfoot.node, 0.5, {
                    rotation: -30,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0).to(helper.leftarm.node, 0.5, {
                    rotation: 140,
                    svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy')
                }, 0).to(helper.rightarm.node, 0.5, {
                    rotation: 130,
                    svgOrigin: helper.rightarm.data('cx') + ' ' + helper.rightarm.data('cy')
                }, 0).to(helper.lefthand.node, 0.5, {
                    rotation: -10,
                    svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                }, 0).to(helper.righthand.node, 0.5, {
                    rotation: 0,
                    svgOrigin: helper.righthand.data('cx') + ' ' + helper.righthand.data('cy')
                }, 0).to(helper.node, 0.5, {
                    rotation: -20,
                    y: "-=60",
                    transformOrigin: '50% 50%'
                }, 0);
                return seq;
            },
            lift: function(helper) {

                var seq = tweens.sequence();
                // seq.to(helper.node, 0.1, {
                //     y: "+=25",
                //     transformOrigin: "50% 50%"
                // }, 0);
                seq.add(this.lowestPoint(helper), 0);
                seq.add(this.highestPoint(helper), 2);
                return seq;
            }
        },
        helper3: {
            highestPoint: function(helper) {
                var seq = tweens.sequence();
                seq.to(helper.node, 0.5, {
                    rotation: 15,
                    y: "-=20",
                    transformOrigin: "50% 50%"
                }, 0).to(helper.leftleg.node, 0.5, {
                    rotation: -40,
                    svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                }, 0).to(helper.rightleg.node, 0.5, {
                    rotation: -10,
                    svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                }, 0).to(helper.leftfoot.node, 0.5, {
                    rotation: 15,
                    svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                }, 0).to(helper.rightfoot.node, 0.5, {
                    rotation: 25,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0).to(helper.leftarm.node, 0.5, {
                    rotation: 100,
                    svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy')
                }, 0).to(helper.lefthand.node, 0.5, {
                    rotation: -35,
                    svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                }, 0).to(helper.head.node, 0.5, {
                    rotation: 5,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0);
                return seq;

            },
            lowestPoint: function(helper) {
                var seq = tweens.sequence();
                seq.to(helper.node, 1, {
                    rotation: 35,
                    y: "-=42",
                    transformOrigin: "50% 50%"
                }, 0).to(helper.leftleg.node, 1, {
                    rotation: -80,
                    svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                }, 0).to(helper.rightleg.node, 1, {
                    rotation: -40,
                    svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                }, 0).to(helper.leftfoot.node, 1, {
                    rotation: 45,
                    svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                }, 0).to(helper.rightfoot.node, 1, {
                    rotation: 45,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0).to(helper.leftarm.node, 1, {
                    rotation: 80,
                    svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy')
                }, 0).to(helper.lefthand.node, 1, {
                    rotation: -35,
                    svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                }, 0).to(helper.head.node, 1, {
                    rotation: 0,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0);
                return seq;

            },
            lift: function(helper) {
                var seq = tweens.sequence();
                // seq.to(helper.node, 0.1, {
                //     y: "-=62",
                //     transformOrigin: "50% 50%"
                // }, 0);
                seq.add(this.lowestPoint(helper), 0);
                seq.add(this.highestPoint(helper), 2);
                return seq;
            }
        },
        helper4: {
            lowestPoint: function(helper) {
                var seq = tweens.sequence();

                seq.to(helper.node, 1, {
                    rotation: -30,
                    y: "+=30",
                    transformOrigin: "50% 50%"
                }, 0).to(helper.rightleg.node, 1, {
                    rotation: 115,
                    svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                }, 0).to(helper.rightfoot.node, 1, {
                    rotation: -110,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0).to(helper.leftleg.node, 1, {
                    rotation: -25,
                    svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                }, 0).to(helper.leftfoot.node, 1, {
                    rotation: -30,
                    svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                }, 0).to(helper.leftarm.node, 1, {
                    rotation: 120,
                    svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy')
                }, 0).to(helper.lefthand.node, 1, {
                    rotation: 70,
                    svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                }, 0).to(helper.rightarm.node, 1, {
                    rotation: 100,
                    svgOrigin: helper.rightarm.data('cx') + ' ' + helper.rightarm.data('cy')
                }, 0).to(helper.righthand.node, 1, {
                    rotation: 100,
                    svgOrigin: helper.righthand.data('cx') + ' ' + helper.righthand.data('cy')
                }, 0);
                return seq;
            },
            highestPoint: function(helper) {
                var seq = tweens.sequence();
                seq.to(helper.node, 0.5, {
                    rotation: -20,
                    y: "-=33",
                    transformOrigin: "50% 50%"
                }, 0).to(helper.rightleg.node, 0.5, {
                    rotation: "-=35",
                    svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                }, 0).to(helper.rightfoot.node, 0.5, {
                    rotation: "+=20",
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0).to(helper.leftleg.node, 0.5, {
                    rotation: -30,
                    svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                }, 0).to(helper.leftfoot.node, 0.5, {
                    rotation: -5,
                    svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                }, 0).to(helper.leftarm.node, 0.5, {
                    rotation: 120,
                    svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy')
                }, 0).to(helper.lefthand.node, 0.5, {
                    rotation: 25,
                    svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                }, 0).to(helper.rightarm.node, 0.5, {
                    rotation: 140,
                    svgOrigin: helper.rightarm.data('cx') + ' ' + helper.rightarm.data('cy')
                }, 0).to(helper.righthand.node, 0.5, {
                    rotation: 0,
                    svgOrigin: helper.righthand.data('cx') + ' ' + helper.righthand.data('cy')
                }, 0);
                return seq;
            },
            lift: function(helper) {
                var seq = tweens.sequence();
                // seq.to(helper.node, 0.1, {
                //     y: "-=3",
                //     transformOrigin: "50% 50%"
                // }, 0);
                seq.add(this.lowestPoint(helper), 0);
                seq.add(this.highestPoint(helper), 2);

                return seq;
            },


        },
        helper5: {
            lowestPoint: function(helper) {
                var seq = tweens.sequence().to(helper.leftleg.node, 1, {
                    rotation: -130,
                    svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                }, 0).to(helper.leftfoot.node, 1, {
                    rotation: 37,
                    svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                }, 0).to(helper.rightleg.node, 1, {
                    rotation: -100,
                    svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                }, 0).to(helper.rightfoot.node, 1, {
                    rotation: 100,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0).to(helper.lefthand.node, 1, {
                    rotation: -10,
                    svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
                }, 0).to(helper.leftarm.node, 1, {
                    rotation: 25,
                    svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy')
                }, 0).to(helper.node, 1, {
                    rotation: 75,
                    y: "+=20",
                    transformOrigin: '50% 50%'
                }, 0);
                return seq;
            },
            highestPoint: function(helper) {
                var seq = tweens.sequence();
                seq.to(helper.node, 0.5, {
                    rotation: 65,
                    y: "-=20",
                    transformOrigin: '50% 50%'
                }, 0).to(helper.leftleg.node, 0.5, {
                    rotation: -115,
                    svgOrigin: helper.leftleg.data('cx') + ' ' + helper.leftleg.data('cy')
                }, 0).to(helper.leftfoot.node, 0.5, {
                    rotation: 20,
                    svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
                }, 0).to(helper.rightleg.node, 0.5, {
                    rotation: -50,
                    svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
                }, 0).to(helper.rightfoot.node, 0.5, {
                    rotation: 60,
                    svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
                }, 0);
                return seq;
            },
            lift: function(helper) {
                var seq = tweens.sequence();
                seq.to(helper.node, 0.1, {
                    y: "+=1"
                }, 0);
                // seq.to(helper.node, 0.1, {
                //     y: "-=18"
                // }, 0);
                seq.add(this.lowestPoint(helper), 0);
                seq.add(this.highestPoint(helper), 2);
                return seq;
            },
        },
        pillar: {
            seq: function(pillar) {
                return (new TimelineMax()).to(pillar.node, 1, {
                    rotation: 85.7,
                    transformOrigin: '50% 100%'
                }, 0).to(pillar.node, 1, {
                    rotation: 86.2,
                    transformOrigin: '50% 100%'
                }, 1).to(pillar.node, 0.5, {
                    rotation: 85.7,
                    transformOrigin: '50% 100%'
                }, 2);
            },
            seqs: function(pillar) {
                return (new TimelineMax()).to(pillar.node, 1, {
                    rotation: 85.9
                }, 0).to(pillar.node, 0.2, {
                    rotation: 86.6
                }, 1).to(pillar.node, 1, {
                    rotation: 85.9
                }, 1.2).to(pillar.node, 0.2, {
                    rotation: 86.6
                }, 2.2).to(pillar.node, 1, {
                    rotation: 85.9
                }, 2.4).to(pillar.node, 0.2, {
                    rotation: 86.6
                }, 3.4);

            },
            seq2: function(pillar) {
                return (new TimelineMax()).to(pillar.node, 1, {
                        rotation: "+=0.9",
                        ease: Back.easeOut,
                        transformOrigin: '50% 100%'
                    }, 0.5)
                    .to(pillar.node, 2, {
                        rotation: "-=30",
                        ease: Power2.easeOut,
                        transformOrigin: '50% 100%'
                    }, 2.3);
            },
            seq3: function(pillar) {
                return (new TimelineMax()).to(pillar.node, 1, {
                        rotation: "+=0.5",
                        ease: Back.easeOut,
                        transformOrigin: '50% 100%'
                    }, 0.5)
                    .to(pillar.node, 2, {
                        rotation: "-=15",
                        ease: Power2.easeOut,
                        transformOrigin: '50% 100%'
                    }, 2.3);
            }
        },
        stick: {

            fall: function(stick) { //duration 1.4
                var seq = tweens.sequence();
                seq.to(stick.node, 0.5, {
                        y: "+=380",
                        ease: Bounce.easeOut,
                        x: "-=167"

                    }, 0)
                    .to(stick.node, 0.1, {
                        rotation: "-=5"
                    }, 0.1)
                    .to(stick.node, 0.1, {
                        rotation: "+=5"
                    }, 0.2)
                    .to(stick.node, 0.1, {
                        rotation: "-=10",
                        transformOrigin: "50% 100%",
                        // y: '-=20',
                        // x: "-=30",
                        ease: Power1.easeInOut,
                    }, 0.3)
                    .to(stick.node, 0.1, {
                        // x: "-=25",
                        // y: "-=10",
                        rotation: "+=10",
                        transformOrigin: "50% 0%",
                    }, 0.4)
                    .to(stick.node, 0.1, {
                        rotation: 0,
                        // y: '+=30',
                        transformOrigin: "50% 100%",
                    }, 0.5);
                return seq;
            },
            pick: function(stick) {
                var seq = tweens.sequence();
                seq.to(stick.node, 0.25, {
                    rotation: "-=90",
                    transformOrigin: "50% bottom",
                    x: "-=103",
                    y: "-=140",
                    scaleX: 0.65
                });
                return seq;
            }
        },
        pick: function(sideman) {
            var seq = this.sequence();

            seq.to(sideman.node, 0.5, {
                    rotation: "+=50",
                    y: "-=5",
                    transformOrigin: '50% 50%'
                }, 0)
                .to(sideman.node, 0.5, {
                    rotation: "+=10",
                    transformOrigin: '50% 50%'
                }, 0.5)
                .to(sideman.node, 1, {
                    rotation: "-=60", //-50
                    transformOrigin: '50% 50%'
                }, 1);

            seq.fromTo(sideman.lefthand.node, 0.5, {
                    rotation: -30,
                    svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
                }, {
                    rotation: -20,
                    svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
                }, 0)
                .to(sideman.lefthand.node, 0.5, {
                    rotation: "+=10",
                    svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
                }, 0.5)
                .to(sideman.lefthand.node, 0.5, {
                    rotation: "-=10", //-20
                    svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
                }, 1);

            seq.to(sideman.rightarm.node, 0.5, {
                    rotation: -100,
                    svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
                }, 0)
                .to(sideman.righthand.node, 0.5, {
                    rotation: -10,
                    svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
                }, 0)
                .to(sideman.righthand.node, 0.5, {
                    rotation: "+=10",
                    svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
                }, 0.5)
                .to(sideman.righthand.node, 0.5, {
                    rotation: "-=30", //-50
                    svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
                }, 1);

            seq.to(sideman.leftleg.node, 0.5, {
                    rotation: '-=15',
                    svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
                }, 0)
                .to(sideman.leftleg.node, 0.5, {
                    rotation: '-=15',
                    svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
                }, 0.5);

            seq.to(sideman.rightleg.node, 0.5, {
                    rotation: "-=35",
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 0)
                .to(sideman.rightfoot.node, 0.5, {
                    svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy'),
                    rotation: "-=30"
                }, 0)
                .to(sideman.rightleg.node, 0.5, {
                    rotation: "-=15",
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 0.5);

            seq.to(sideman.leftleg.node, 0.5, {
                    rotation: '+=15', //+15
                    svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
                }, 1)
                .to(sideman.rightleg.node, 0.5, {
                    rotation: "+=35", //55
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 1);

            seq.to(sideman.lefthand.node, 0.3, {
                    rotation: "+=20", //-20
                    svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
                }, 1.5)
                .to(sideman.rightleg.node, 0.3, {
                    rotation: "-=15", //55
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 1.5);

            seq.to(sideman.lefthand.node, 0.5, {
                    rotation: "-=30", //-20
                    svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
                }, 1.5)
                .to(sideman.righthand.node, 0.5, {
                    rotation: "-=20", //-50
                    svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
                }, 1.5)
                .to(sideman.leftleg.node, 0.5, {
                    rotation: '+=15', //+15
                    svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
                }, 1.5)
                .to(sideman.rightleg.node, 0.5, {
                    rotation: "+=35", //55
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 1.5);

            return seq;

        },
        stealth: function(sideman) {
            var seq = this.sequence();
            seq.add(window.tweens.dash(sideman), 0);
            seq.to(sideman.node, 0.2, {
                x: "+=340",
                y: "+=20",
                opacity: 0
            }, 0).to(sideman.node, 0.01, {
                scaleX: -0.3
            }, 0.1).to(sideman.node, 0.1, {
                x: "-=65",
                // y: "-=10",
                opacity: 1,
            }, 0.2).to(sideman.node, 0.1, {
                scaleX: 0.3
            }, 0.6);
            seq.add(window.tweens.rest(sideman), 0.65);
            return seq;
        },
        endlift: function(sideman) {
            return (new TimelineMax()).to(sideman.node, 1, {
                    rotation: -10,
                    y: "+=10",
                    transformOrigin: "50% 50%"
                }, 0)
                .to(sideman.leftleg.node, 1, {
                    rotation: -50,
                    svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
                }, 0)
                .to(sideman.leftarm.node, 1, {
                    rotation: -80,
                    svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
                }, 0)
                .to(sideman.lefthand.node, 1, {
                    rotation: -50,
                    svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy')
                }, 0)
                .to(sideman.rightleg.node, 1, {
                    rotation: 20,
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 0)
                .to(sideman.leftfoot.node, 1, {
                    rotation: 40,
                    svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
                }, 0)
                .to(sideman.rightfoot.node, 1, {
                    rotation: 30,
                    svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
                }, 0)
                .to(sideman.rightarm.node, 1, {
                    rotation: -67,
                    svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
                }, 0)
                .to(sideman.node, 0.5, {
                    y: "-=10",
                    rotation: -10,
                    transformOrigin: "50% 50%"
                }, 3)
                .to(sideman.leftleg.node, 0.5, {
                    rotation: "+=20",
                    svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
                }, 3)
                .to(sideman.rightleg.node, 0.5, {
                    rotation: "-=20",
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 3)
                .to(sideman.leftfoot.node, 0.5, {
                    rotation: "-=20",
                    svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
                }, 3)
                .to(sideman.rightfoot.node, 0.5, {
                    rotation: "-=20",
                    svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
                }, 3)
                .to(sideman.rightarm.node, 0.5, {
                    rotation: "-=30",
                    svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
                }, 3)
                .to(sideman.righthand.node, 0.5, {
                    rotation: "+=20",
                    svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
                }, 3)
                .to(sideman.node, 0.5, {
                    rotation: -10,
                    y: "+=10",
                    transformOrigin: "50% 50%"
                }, 3.5)
                .to(sideman.leftleg.node, 0.5, {
                    rotation: -50,
                    svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
                }, 3.5)
                .to(sideman.rightleg.node, 0.5, {
                    rotation: 20,
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 3.5)
                .to(sideman.leftfoot.node, 0.5, {
                    rotation: 40,
                    svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
                }, 3.5)
                .to(sideman.rightfoot.node, 0.5, {
                    rotation: 30,
                    svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
                }, 3.5)
                .to(sideman.rightarm.node, 0.5, {
                    rotation: -67,
                    svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
                }, 3.5)
                .to(sideman.node, 0.5, {
                    y: "-=10",
                    rotation: -10,
                    transformOrigin: "50% 50%"
                }, 4)
                .to(sideman.leftleg.node, 0.5, {
                    rotation: "+=20",
                    svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
                }, 4)
                .to(sideman.rightleg.node, 0.5, {
                    rotation: "-=20",
                    svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
                }, 4)
                .to(sideman.leftfoot.node, 0.5, {
                    rotation: "-=20",
                    svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
                }, 4)
                .to(sideman.rightfoot.node, 0.5, {
                    rotation: "-=20",
                    svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
                }, 4)
                .to(sideman.rightarm.node, 0.5, {
                    rotation: "-=30",
                    svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
                }, 4)
                .to(sideman.righthand.node, 0.5, {
                    rotation: "+=20",
                    svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
                }, 4);
        },
        dash: function(sideman) {
            return (new TimelineMax()).to(sideman.node, 0.5, {
                rotation: -30,
                transformOrigin: "50% 50%"
            }, 0).to(sideman.rightleg.node, 0.5, {
                rotation: -65,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 0).to(sideman.rightfoot.node, 0.5, {
                rotation: 60,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            }, 0).to(sideman.leftleg.node, 0.5, {
                rotation: -10,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, 0).to(sideman.leftfoot.node, 0.5, {
                rotation: 20,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            }, 0).to(sideman.leftarm.node, 0.5, {
                rotation: -70
            }, 0);
        },
        flashy: function(sideman) {
            return (new TimelineMax()).to(sideman.node, 0.5, {
                rotation: 150,
                x: "+=150",
                transformOrigin: "50% 50%"
            }, 0).to(sideman.rightleg.node, 0.5, {
                rotation: -140,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 0).to(sideman.leftleg.node, 0.5, {
                rotation: -140,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, 0).to(sideman.rightarm.node, 0.5, {
                rotation: 100,
                svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
            }, 0).to(sideman.righthand.node, 0.5, {
                rotation: -70,
                svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
            }, 0).to(sideman.node, 0.5, {
                rotation: 360,
                x: "+=150",
                y: "+=30",
                transformOrigin: "50% 50%"
            }, 0.5).to(sideman.rightleg.node, 0.5, {
                rotation: -90,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 0.5).to(sideman.leftleg.node, 0.5, {
                rotation: -100,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, 0.5).to(sideman.rightarm.node, 0.5, {
                rotation: 140,
                svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
            }, 0.5).to(sideman.righthand.node, 0.5, {
                rotation: -70,
                svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
            }, 0.5).to(sideman.node, 0.3, {
                y: "-=100",
                x: "+=50"
            }, 1).to(sideman.rightfoot.node, 0.3, {
                rotation: 0,
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy')
            }, 1).to(sideman.leftfoot.node, 0.3, {
                rotation: 0,
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy')
            }, 1).to(sideman.leftleg.node, 0.3, {
                rotation: 0,
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy')
            }, 1).to(sideman.rightleg.node, 0.3, {
                rotation: 0,
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 1).to(sideman.rightarm.node, 0.3, {
                rotation: 0,
                svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
            }, 1).to(sideman.leftarm.node, 0.3, {
                rotation: 0,
                svgOrigin: sideman.leftarm.data('cx') + ' ' + sideman.leftarm.data('cy')
            }, 1);
        },
        pocketdig: function(sideman, speaker) {
            return (new TimelineMax()).to(sideman.rightarm.node, 0.3, {
                rotation: 70,
                svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
            }, 0).to(sideman.righthand.node, 0.3, {
                rotation: -90,
                svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
            }, 0).to(sideman.rightarm.node, 0.3, {
                rotation: 60,
                svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
            }, 0.3).to(sideman.righthand.node, 0.3, {
                rotation: -80,
                svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
            }, 0.3).to(sideman.rightarm.node, 0.3, {
                rotation: 70,
                svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
            }, 0.6).to(sideman.righthand.node, 0.3, {
                rotation: -90,
                svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
            }, 0.6).to(sideman.rightarm.node, 0.3, {
                rotation: -60,
                svgOrigin: sideman.rightarm.data('cx') + ' ' + sideman.rightarm.data('cy')
            }, 0.9).to(sideman.righthand.node, 0.3, {
                rotation: -90,
                svgOrigin: sideman.righthand.data('cx') + ' ' + sideman.righthand.data('cy')
            }, 0.9).to(speaker.node, 0.3, {
                rotation: 0,
                opacity: 1,
                x: '+=30',
                y: '-=103',
                transformOrigin: "50% 50%"
            }, 0.9).to(sideman.rightarm.node, 0.3, {
                rotation: 60
            }, 4).to(speaker.node, 0.3, {
                opacity: 0,
                rotation: 30,
                x: "-=30",
                y: "+=103"
            }, 4);
        },
        frontyay: function(man) {
            return (new TimelineMax()).to(man.node, 0.2, {
                rotation: 0,
                transformOrigin: '50% 50%'
            }, 0).to(man.lefthand.node, 0.2, {
                rotation: 100,
                svgOrigin: man.lefthand.data('cx') + ' ' + man.lefthand.data('cy')
            }, 0).to(man.righthand.node, 0.2, {
                rotation: 100,
                svgOrigin: man.righthand.data('cx') + ' ' + man.righthand.data('cy')
            }, 0);
        },

        YAY: function(helper) {
            var seq = tweens.sequence().to(helper.node, 0.2, {
                rotation: 0,
                transformOrigin: '50% 50%'
            }, 0).to(helper.head, {
                rotation: 0,
                svgOrigin: helper.head.data('cx') + ' ' + helper.head.data('cy')
            }, 0).to(helper.head.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
            }, 0).to(helper.leftarm.node, 0.2, {
                rotation: -120,
                svgOrigin: helper.leftarm.data('cx') + ' ' + helper.leftarm.data('cy'),
                //    morphSVG: "M85.2,116.4c-0.1,0-82.3,29.1-85.2,208.7c0,0,0.4,12.9,21.5,14.3
                // c19.2,1.2,20.8-21.8,20.8-21.8s-0.6-125.5,55.6-152.7L85.2,116.4z"
            }, 0).to(helper.lefthand.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.lefthand.data('cx') + ' ' + helper.lefthand.data('cy')
            }, 0).to(helper.righthand.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.righthand.data('cx') + ' ' + helper.righthand.data('cy')
            }, 0).to(helper.rightarm.node, 0.2, {
                rotation: 120,
                svgOrigin: helper.rightarm.data('cx') + ' ' + helper.rightarm.data('cy')
            }, 0).to(helper.rightarm.node, 0.2, {
                x: -80,
                y: -20
            }, 0).to(helper.leftarm.node, 0.2, {
                x: 35,
                y: -20
            }, 0);
            // debugger;
            seq.to(helper.leftleg.node, 0.2, {
                rotation: 15,
                x: 15,
            }, 0)
            seq.to(helper.leftfoot.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.leftfoot.data('cx') + ' ' + helper.leftfoot.data('cy')
            }, 0).to(helper.rightleg.node, 0.2, {
                rotation: -15,
                x: "+=10",
                svgOrigin: helper.rightleg.data('cx') + ' ' + helper.rightleg.data('cy')
            }, 0).to(helper.rightleg.node, 0.2, {
                x: 20
            }, 0).to(helper.leftleg.node, 0.2, {
                x: -30
            }, 0);
            seq.to(helper.rightfoot.node, 0.2, {
                rotation: 0,
                svgOrigin: helper.rightfoot.data('cx') + ' ' + helper.rightfoot.data('cy')
            }, 0).to(helper.body.node, 0.2, {
                morphSVG: helper.body.data('morphs')[1]
            }, 0);
            return seq;
        },


        interacthere: function(hand, disty) {
            disty = disty || 0;
            return (new TimelineMax()).to(hand.node, 0.3, {
                y: "+=" + disty,
                // x:"+=" + distx.toString()
            }, 0).fromTo(hand.node, 0.2, {
                opacity: 0,
                repeat: 5,
            }, {
                opacity: 1,
                repeat: 4
            }, 0.3).to(hand.node, 0.3, {
                opacity: 0
            }, 1.5);
        },
        enviromentsequence: function(enviroment) {
            return (new TimelineMax()).to(enviroment.node, 0.3, {
                y: "-=10",
                x: "-=350",
                opacity: 1,
                rotation: "+=86.5",
                transformOrigin: '50% 100%',
                ease: Power1.easeOut,
            }, 0).to(enviroment.node, 0.2, {
                rotation: "+=0.4",
                transformOrigin: '50% 100%',
                ease: Power1.easeOut,
            }, 0.3).to(enviroment.node, 1, {
                opacity: 1,
                rotation: "-=0.4",
                transformOrigin: '50% 100%',
                ease: Power1.easeOut,
            }, 0.5).to(enviroment.node, 0.2, {
                rotation: "+=0.5",
                transformOrigin: '50% 100%',
                ease: Power1.easeOut,
            }, 1.5).to(enviroment.node, 1, {
                rotation: "-=0.3",
                transformOrigin: '50% 100%',
                ease: Power1.easeOut,
            }, 1.7).to(enviroment.node, 0.2, {
                rotation: "+=0.5",
                transformOrigin: '50% 100%',
                ease: Power1.easeOut,
            }, 2.9);
        },
        powerup: function(sideman) {
            return (new TimelineMax()).to(sideman.node, 0.1, {
                rotation: "+=10",
                ease: Power1.easeInOut
            }, 0).to(sideman.leftleg.node, 0.1, {
                rotation: "-=10",
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy'),
                ease: Power1.easeInOut
            }, 0).to(sideman.rightleg.node, 0.1, {
                rotation: "-=5",
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy'),
                ease: Power1.easeInOut
            }, 0).to(sideman.node, 0.4, {
                rotation: "-=15",
                y: "-=30",
                x: "+=20",
                ease: Power1.easeIn
            }, 0.1).to(sideman.leftleg.node, 0.2, {
                rotation: "+=40",
                svgOrigin: sideman.leftleg.data('cx') + ' ' + sideman.leftleg.data('cy'),
                ease: Power3.easeIn
            }, 0.1).to(sideman.leftfoot.node, 0.2, {
                rotation: "-=15",
                svgOrigin: sideman.leftfoot.data('cx') + ' ' + sideman.leftfoot.data('cy'),
                ease: Power3.easeIn
            }, 0.1).to(sideman.rightleg.node, 0.2, {
                // rotation: "-=10",
                svgOrigin: sideman.rightleg.data('cx') + ' ' + sideman.rightleg.data('cy')
            }, 0.1).to(sideman.rightfoot.node, 0.2, {
                rotation: "-=5",
                svgOrigin: sideman.rightfoot.data('cx') + ' ' + sideman.rightfoot.data('cy'),
                ease: Power3.easeIn
            }, 0.1).to(sideman.lefthand.node, 0.2, {
                rotation: "+=10",
                svgOrigin: sideman.lefthand.data('cx') + ' ' + sideman.lefthand.data('cy'),
                ease: Power3.easeIn
            }, 0.1);
        },
        mouse: function(mouse) {
            return (new TimelineMax()).to(mouse.node, 0.6, {
                opacity: 1
            }, 0).to(mouse.node, 0.6, {
                stroke: "#037ef3"
            });
        }
    };
})();
