var scenes = window.scenes || {};

scenes.solution = function solution(globals) {
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

    timeline.add('solution', startLabel + '+=' + start);


    var sideman = scene.sideman;
    var stick = scene.stick || objects.make.stick();


    // scene.add(stick);
    TweenMax.set(stick.node, {
        // opacity: 0,
        x: (vbWidth / 2) + 540,
        y: (vbHeight / 2) - 50,
    });

    var pillar = scene.death;
    var enviroment = scene.enviroment;
    var poverty = scene.poverty;
    var illiteracy = scene.illiteracy;
    var pillars = [enviroment.node, poverty.node, illiteracy.node];

    var text = scene.stickText;


    // window.timeline.addPause('solution+=1');
    // timeline.add(displaySol, "solution+=0.5");
    // timeline.add(addSol, "+=0.5");
    // timeline.add([colorMan, changeBackgroundSol]);
    // timeline.add(manColBack, "-=0.2");


    // timeline.add(window.tweens.interacthere(hand, 240), "solution+=2.2");


    timeline.to([text.node, stick.node], 0.2, {
            y: "-=55",
        }, "+=0.55")
        .to(stick.node, 0.4, {
            rotation: "+=5"
        }, "-=0.1")
        .to(stick.node, 0.3, {
            rotation: "-=5"
        })
        .to(stick.node, 0.4, {
            rotation: "+=10"
        })
        .to(text.node, 0.1, {
            y: "+=20",
        }).add(tweens.fadeOut(text), '-=0.1');

    timeline.add(tweens.stick.fall(stick), '-=1.1');

    // timeline.add(window.tweens.interacthere(hand, 15), "solution+=4.4");
    //picking the stick

    var swoosh = TweenMax.to(sideman.node, 0.001, {
        x: "+=340",
        rotation: 0
    });
    var stand = TweenMax.to(sideman.parts, 0.001, {
        rotation: 0
    });

    var pushPillarUp = TweenMax.to(pillar.node, 1, {
        rotation: "-=2",
        transformOrigin: "50% 100%",
        ease: Back.easeInOut
    });

    var pushPillarsUp = TweenMax.to(pillars, 1, {
        rotation: "-=0.7",
        transformOrigin: "50% 100%",
        ease: Back.easeInOut
    });


    var restManBody = TweenMax.to(sideman.node, 0.5, {
        rotation: 10,
        y: "-=20",
        ease: Back.easeIn
    });

    var pushLeftLeg = TweenMax.to(sideman.leftleg.node, 0.5, {
        rotation: -20,
        ease: Back.easeIn
    });
    var pushLeftFoot = TweenMax.to(sideman.leftfoot.node, 0.5, {
        rotation: 5,
        ease: Back.easeIn
    });
    var pushRightLeg = TweenMax.to(sideman.rightleg.node, 0.5, {
        rotation: 10,
        ease: Back.easeIn
    });
    var pushRightFoot = TweenMax.to(sideman.rightfoot.node, 0.5, {
        rotation: 0,
        ease: Back.easeIn
    });

    var pushArm = TweenMax.to(sideman.leftarm.node, 0.5, {
        rotation: -180,
        ease: Back.easeIn
    });
    var pushRightArm = TweenMax.to(sideman.rightarm.node, 0.5, {
        rotation: -160,
        ease: Back.easeIn
    });
    var pushHead = TweenMax.to(sideman.head.node, 0.5, {
        rotation: 70,
        ease: Back.easeIn
    });
    var leftLegPress = TweenMax.to(sideman.leftleg.node, 0.3, {
        rotation: -80,
        ease: Back.easeIn
    });
    var leftFootPress = TweenMax.to(sideman.leftfoot.node, 0.3, {
        rotation: 70,
        ease: Back.easeIn
    });

    var leftLegPress2 = TweenMax.to(sideman.leftleg.node, 0.2, {
        rotation: -30,
        ease: Back.easeIn
    });
    var leftFootPress2 = TweenMax.to(sideman.leftfoot.node, 0.2, {
        rotation: 10,
        ease: Back.easeIn
    });

    var bodyRotate = TweenMax.to(sideman.node, 0.1, {
        scaleY: 0.4,
        scaleX: -0.4,
        transformOrigin: "50% 50%",
        x: "+=180"
    });

    var rotateLeftLeg = TweenMax.to(sideman.leftleg.node, 0.1, {
        rotation: 20,
    });
    var rotateLeftFoot = TweenMax.to(sideman.leftfoot.node, 0.1, {
        rotation: 0,
    });
    var rotateRightLeg = TweenMax.to(sideman.rightleg.node, 0.1, {
        rotation: 10,
    });
    var rotateRightFoot = TweenMax.to(sideman.rightfoot.node, 0.1, {
        rotation: 0,
    });

    var rotateArm = TweenMax.to(sideman.leftarm.node, 0.1, {
        rotation: -90,
    });
    var rotateRightArm = TweenMax.to(sideman.rightarm.node, 0.1, {
        rotation: -60,
    });
    var rotateHead = TweenMax.to(sideman.head.node, 0.1, {
        rotation: 0,
    });

    var moveManBack2 = TweenMax.to(sideman.node, 0.5, {
        x: "+= 50",
        ease: Power1.easeIn
    });
    var moveLeftFootBack2 = TweenMax.to(sideman.leftfoot.node, 0.2, {
        rotation: 20,

    });
    var moveLeftThiBack2 = TweenMax.to(sideman.leftleg.node, 0.4, {
        rotation: 40,

    });
    var keepRightLeg2 = TweenMax.to(sideman.rightleg.node, 0.3, {
        rotation: "-=20",


    });
    var keepRightLegBack2 = TweenMax.to(sideman.rightleg.node, 0.3, {
        rotation: "+=20",


    });
    var bendRightFoot2 = TweenMax.to(sideman.rightfoot.node, 0.2, {
        rotation: "-=20",

    });
    var unbendRightFoot2 = TweenMax.to(sideman.rightfoot.node, 0.1, {
        rotation: "+=20",

    });
    var moveLeftThiTo2 = TweenMax.to(sideman.leftleg.node, 0.5, {
        rotation: 0,

    });
    var moveLeftFootTo2 = TweenMax.to(sideman.leftfoot.node, 0.4, {
        rotation: 0,

    });
    var upRight = TweenMax.to(sideman.node, 0.3, {
        rotation: 0
    });

    var rightArmupRight = TweenMax.to(sideman.rightarm.node, 0.3, {
        rotation: 0
    });
    var leftArmupRight = TweenMax.to(sideman.leftarm.node, 0.3, {
        rotation: 0
    });


    var stepBacktl = new TimelineMax({});
    stepBacktl.add([moveLeftFootBack2]);
    stepBacktl.add([moveLeftThiBack2]);
    stepBacktl.add([moveManBack2, moveLeftFootTo2, moveLeftThiTo2, keepRightLeg2, upRight, rightArmupRight, leftArmupRight]);
    stepBacktl.add([keepRightLegBack2, bendRightFoot2], "-=0.2");
    stepBacktl.add([unbendRightFoot2], "-=0.4");

    // var rightArmPick = TweenMax.to(sideman.rightarm.node, 0.5, {
    //     rotation: -60,
    //     ease: Back.easeIn
    // })


    var morphStick = TweenMax.to(stick.node, 0.3, {
        y: "+=21",
        morphSVG: stick.data('morphs')[1],
        ease: Power3.easeInOut
    });

    var bodyRotateBack = TweenMax.to(sideman.node, 0.01, {
        scaleY: 0.4,
        scaleX: 0.4,
        transformOrigin: "50% 50%",
        x: "+=10"
    });

    timeline.add([pushPillarUp, pushPillarsUp, pushRightLeg,
        pushRightFoot, pushLeftLeg, pushLeftFoot, restManBody, pushArm, pushHead, pushRightArm
    ], "solution");
    timeline.add([leftLegPress, leftFootPress]);
    timeline.add([leftLegPress2, leftFootPress2]);
    timeline.add([tweens.stick.pick(stick), bodyRotate, rotateArm, rotateRightArm, rotateRightFoot, rotateRightLeg,
        rotateLeftFoot, rotateLeftLeg, rotateHead
    ]);
    timeline.add(stepBacktl);
    timeline.add(morphStick, "+=0.1");
    timeline.add(bodyRotateBack);

    // timeline.add([swoosh, stand], 'solution+=4.4');



    timeline.to(pillar.node, 0.3, {
        rotation: "+=0.52",
        transformOrigin: "50% 100%",
    }, "solution+=4.9")

    .to(pillars, 0.3, {
        rotation: "+=0.2",
        transformOrigin: "50% 100%",
    }, "solution+=5");


    globals.startOffset = -1;

    return globals;
};
