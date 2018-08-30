var scenes = window.scenes || {};

scenes.experience = function experience(globals) {
  var TweenMax = window.TweenMax;
  // var Draggable = window.Draggable;
  // var CubicBezier = window.CubicBezier;
  var Power1 = window.Power1;
  var Back = window.Back;
  // var Elastic = window.Elastic;
  // var Linear = window.Linear;
  // var CustomEase = window.CustomEase;
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
  timeline.add('experience', startLabel + '+=' + start);

  TweenMax.set(scene.node, {
    opacity: 0,
    y: vbHeight * 3
  });

  timeline.to(
    prevScene.node,
    1,
    {
      y: -vbHeight * 2
    },
    'experience'
  );

  function floatElem(el, rep, offset, time) {
    var delay = Math.random();
    var ysign = Math.random() > 0.5 ? '-' : '+';
    var tl = tweens.sequence();
    tl.add(
      TweenMax.to(el, time, {
        y: ysign + '=' + offset,
        ease: Power1.easeInOut,
        yoyo: true,
        repeat: rep
      }),
      delay
    );
    return tl;
  }

  var man = objects.make.man();

  var glob = objects.make.glob();

  var tree1 = objects.make.tree(0, 258, 610, 0.5);
  var tree2 = objects.make.tree(1, 95, 636, 0.5);
  var tree3 = objects.make.tree(2, 183, 623, 0.5);
  var tree4 = objects.make.tree(0, 1121, 610, 0.5);
  var tree5 = objects.make.tree(2, 1040, 623, 0.5);

  var clouds = objects.make.clouds();
  var floatingClouds = scene.g(
    objects.make.floatingCloud(0, vbWidth - 400, '50%'),
    objects.make.floatingCloud(1, vbWidth - 400, '120%'),
    objects.make.floatingCloud(2, vbWidth / 2 - 100, '10%'),
    objects.make.floatingCloud(3, 100, 100),
    objects.make.floatingCloud(2, 100, 500)
  );
  clouds.add(floatingClouds);

  var outlines = objects.outlines;
  var outl1 = outlines[0];
  var outl2 = outlines[1];
  var outl3 = outlines[2];
  var outl4 = outlines[3];

  var solution = objects.make.element('solution');
  var world = objects.make.element('world');
  var empower = objects.make.element('empower');
  var reflect = objects.make.element('reflect');

  var empowerGr = scene.g(empower);
  var solGr = scene.g(solution);
  var worldGr = scene.g(world);
  var reflGr = scene.g(reflect);

  s.add(outl1);
  s.add(outl2);
  s.add(outl3);
  s.add(outl4);

  scene.add(glob);
  scene.add(clouds);
  scene.add(tree1);
  scene.add(tree2);
  scene.add(tree3);
  scene.add(tree4);
  scene.add(tree5);
  scene.add(man);
  scene.add(empowerGr);
  scene.add(solGr);
  scene.add(worldGr);
  scene.add(reflGr);

  timeline
    .set(
      scene.node,
      {
        opacity: 1
      },
      'experience'
    )
    .to(
      scene.node,
      1,
      {
        y: 0
      },
      'experience'
    );
  timeline.set(
    man.node,
    {
      y: 430
    },
    'experience'
  );
  timeline.set(
    glob.node,
    {
      fill: '#219EAB'
    },
    'experience'
  );
  timeline.set(
    objects.background.node,
    {
      fill: '#20586A'
    },
    'experience'
  );
  timeline
    .set(reflGr.node, {
      x: 442,
      scale: 1.5
    })
    .set(empowerGr.node, {
      x: 792,
      scale: 1.5
    })
    .set(solGr.node, {
      x: 701,
      scale: 1.5
    })
    .set(worldGr.node, {
      x: 335,
      scale: 1.5
    })
    .set(outl1.node, {
      transformOrigin: 'center',
      x: 502,
      y: 538,
      stroke: '#88609F',
      strokeWidth: '15px'
    })
    .set(outl2.node, {
      transformOrigin: 'center',
      x: 512,
      y: 550,
      stroke: '#E1523C',
      strokeWidth: '15px'
    })
    .set(outl3.node, {
      transformOrigin: 'center',
      x: 522,
      y: 560,
      stroke: '#F9CA3F',
      strokeWidth: '15px'
    })
    .set(outl4.node, {
      transformOrigin: 'center',
      x: 532,
      y: 567,
      stroke: 'rgb(56, 206, 186)',
      strokeWidth: '15px'
    });

  floatElem(empower.node, -1, 10, 2);
  floatElem(solution.node, -1, 10, 2);
  floatElem(reflect.node, -1, 10, 2);
  floatElem(world.node, -1, 10, 2);

  var displayReflect = TweenMax.fromTo(
    reflGr.node,
    0.3,
    {
      y: 800
    },
    {
      y: 433
    }
  );
  var displaySol = TweenMax.fromTo(
    solGr.node,
    0.3,
    {
      y: 800
    },
    {
      y: 433
    }
  );
  var displayEmpower = TweenMax.fromTo(
    empowerGr.node,
    0.3,
    {
      y: 800
    },
    {
      y: 535
    }
  );
  var displayWorld = TweenMax.fromTo(
    worldGr.node,
    0.3,
    {
      y: 800
    },
    {
      y: 535
    }
  );

  var moveSolTopRight = TweenMax.to(solGr.node, 0.5, {
    x: '+=50',
    y: '-=250',
    scale: 2.5
  });

  var addSolToMan = TweenMax.to(solGr.node, 0.2, {
    x: '-=125',
    y: '+=300',
    scale: 0
  });

  var moveEmpowerTopRight = TweenMax.to(empowerGr.node, 0.5, {
    x: '+=200',
    y: '-=150',
    scale: 2.5
  });

  var addEmpowerToMan = TweenMax.to(empowerGr.node, 0.5, {
    x: '-=370',
    y: '+=100',
    scale: 0
  });

  var moveReflTopLeft = TweenMax.to(reflGr.node, 0.5, {
    x: '-=50',
    y: '-=250',
    scale: 2.5
  });

  var addReflToMan = TweenMax.to(reflGr.node, 0.2, {
    x: '+=235',
    y: '+=300',
    scale: 0
  });

  var moveWorldTopLeft = TweenMax.to(worldGr.node, 0.5, {
    x: '-=200',
    y: '-=150',
    scale: 2.5
  });

  var addWorldToMan = TweenMax.to(worldGr.node, 0.5, {
    x: '+=510',
    y: '+=100',
    scale: 0
  });

  var scalePowerUp1 = TweenMax.fromTo(
    outl1.node,
    0.2,
    {
      scale: 0
    },
    {
      scale: 0.32,
      ease: Back.easeOut
    }
  );
  var scalePowerUp2 = TweenMax.fromTo(
    outl2.node,
    0.2,
    {
      scale: 0
    },
    {
      scale: 0.34,
      ease: Back.easeOut
    }
  );

  var scalePowerUp3 = TweenMax.fromTo(
    outl3.node,
    0.2,
    {
      scale: 0
    },
    {
      scale: 0.36,
      ease: Back.easeOut
    }
  );
  var scalePowerUp4 = TweenMax.fromTo(
    outl4.node,
    0.2,
    {
      scale: 0
    },
    {
      scale: 0.38,
      ease: Back.easeOut
    }
  );

  var fillPowerUp1 = TweenMax.to(man.parts, 0.2, {
    fill: '#88609F'
  });
  var fillPowerUp2 = TweenMax.to(man.parts, 0.2, {
    fill: '#E1523C'
  });
  var fillPowerUp3 = TweenMax.to(man.parts, 0.2, {
    fill: '#F9CA3F'
  });
  var fillPowerUp4 = TweenMax.to(man.parts, 0.2, {
    fill: 'rgb(56, 206, 186)'
  });

  function clearColorAnim() {
    return TweenMax.to(man.parts, 1, {
      fill: '#FFFFFF'
    });
  }

  var manFlyUp = TweenMax.to(man.node, 0.5, {
    y: '-=250',
    ease: Back.easeIn
  });
  var outlineFlyUp1 = TweenMax.to(outl1.node, 0.5, {
    y: '-=250',
    ease: Back.easeIn
  });
  var outlineFlyUp2 = TweenMax.to(outl2.node, 0.5, {
    y: '-=250',
    ease: Back.easeIn
  });
  var outlineFlyUp3 = TweenMax.to(outl3.node, 0.5, {
    y: '-=250',
    ease: Back.easeIn
  });
  var outlineFlyUp4 = TweenMax.to(outl4.node, 0.5, {
    y: '-=250',
    ease: Back.easeIn
  });

  var scaleDownPowerUp1 = TweenMax.to(outl1.node, 0.5, {
    scale: 0,
    ease: Back.easeIn
  });
  var scaleDownPowerUp2 = TweenMax.to(outl2.node, 0.5, {
    scale: 0,
    ease: Back.easeIn
  });
  var scaleDownPowerUp3 = TweenMax.to(outl3.node, 0.5, {
    scale: 0,
    ease: Back.easeIn
  });
  var scaleDownPowerUp4 = TweenMax.to(outl4.node, 0.5, {
    scale: 0,
    ease: Back.easeIn
  });

  var fillPowerUpBlue = TweenMax.to(man.parts, 0.5, {
    fill: '#037EF3'
  });

  var raiseRightArm = TweenMax.to(man.righthand.node, 0.4, {
    rotation: -15,
    svgOrigin: man.righthand.data('rc').cx + ' ' + man.righthand.data('rc').cy,
    ease: Back.easeOut
  });
  var raiseLeftArm = TweenMax.to(man.lefthand.node, 0.4, {
    rotation: 15,
    svgOrigin: man.lefthand.data('rc').cx + ' ' + man.lefthand.data('rc').cy,
    ease: Back.easeOut
  });

  var openLeftLeg = TweenMax.to(man.leftleg.node, 0.4, {
    rotation: 8,
    svgOrigin: man.leftleg.data('rc').cx + ' ' + man.leftleg.data('rc').cy,
    ease: Back.easeOut
  });

  var openRightLeg = TweenMax.to(man.rightleg.node, 0.4, {
    rotation: -8,
    svgOrigin: man.rightleg.data('rc').cx + ' ' + man.rightleg.data('rc').cy,
    ease: Back.easeOut
  });

  var rightArmBack = TweenMax.to(man.righthand.node, 0.4, {
    rotation: 0,
    svgOrigin: man.righthand.data('rc').cx + ' ' + man.righthand.data('rc').cy,
    ease: Back.easeOut
  });
  var leftArmBack = TweenMax.to(man.lefthand.node, 0.4, {
    rotation: 0,
    svgOrigin: man.lefthand.data('rc').cx + ' ' + man.lefthand.data('rc').cy,
    ease: Back.easeOut
  });

  var leftLegBack = TweenMax.to(man.leftleg.node, 0.4, {
    rotation: 0,
    svgOrigin: man.leftleg.data('rc').cx + ' ' + man.leftleg.data('rc').cy,
    ease: Back.easeOut
  });

  var rightLegBack = TweenMax.to(man.rightleg.node, 0.4, {
    rotation: 0,
    svgOrigin: man.rightleg.data('rc').cx + ' ' + man.rightleg.data('rc').cy,
    ease: Back.easeOut
  });

  var manFly = TweenMax.to(man.node, 0.3, {
    y: '-=750'
  });

  var prevText = prevScene.lastText || s.g();
  var text = objects.make.multilineText(
    [
      'We enable young people',
      'to develop these',
      'leadership characteristics.'
    ],
    60,
    objects.textStyle4
  );
  text = s.g(text);
  TweenMax.set(text.node, {
    x: 100
  });
  timeline.add(
    tweens.slideInOut(prevText, text, 300, Back.easeInOut, 0.5),
    'experience'
  );
  timeline.add(displayReflect, '+=0');
  timeline.add(displaySol, '-=0.2');
  timeline.add(displayEmpower, '-=0.2');
  timeline.add(displayWorld, '-=0.2');
  timeline.add(moveSolTopRight, '+=1.3');
  timeline.add(addSolToMan, '+=1.5');
  timeline.add([scalePowerUp1, fillPowerUp1]);
  timeline.add(clearColorAnim);
  timeline.add(moveEmpowerTopRight, '+=0.2');
  timeline.add(addEmpowerToMan, '+=1.5');
  timeline.add([scalePowerUp2, fillPowerUp2]);
  timeline.add(clearColorAnim);
  timeline.add(moveReflTopLeft, '+=0.2');
  timeline.add(addReflToMan, '+=1.5');
  timeline.add([scalePowerUp3, fillPowerUp3]);
  timeline.add(clearColorAnim);
  timeline.add(moveWorldTopLeft, '+=0.2');
  timeline.add(addWorldToMan, '+=1.5');
  timeline.add([scalePowerUp4, fillPowerUp4]);
  timeline.add(clearColorAnim);
  timeline.add(
    tweens
      .sequence()
      .add([
        manFlyUp,
        outlineFlyUp1,
        outlineFlyUp2,
        outlineFlyUp3,
        outlineFlyUp4
      ])
      .duration(1.5)
  );
  timeline.add([
    scaleDownPowerUp1,
    scaleDownPowerUp2,
    scaleDownPowerUp3,
    scaleDownPowerUp4,
    floatElem(man.node, 2, 20, 1)
  ]);
  timeline.add(
    [raiseRightArm, raiseLeftArm, openLeftLeg, openRightLeg, fillPowerUpBlue],
    '-=2.8'
  );
  timeline.add(
    tweens
      .sequence()
      .add([leftLegBack, rightLegBack, rightArmBack, leftArmBack])
      .duration(2),
    '-=2'
  );
  timeline.add(manFly);

  // timeline.add([floatElem(reflect.node,10),floatElem(solution.node,10),floatElem(empower.node,10),floatElem(world.node,10)],'experience');

  prevText = text;
  text = objects.make.multilineText(
    ['Through practical Experience'],
    50,
    objects.textStyle4
  );
  text = s.g(text);
  TweenMax.set(text.node, {
    x: 100
  });
  timeline.add(
    tweens.slideInOut(prevText, text, 300, Back.easeInOut, 0.5),
    'experience+=3'
  );

  prevText = text;
  text = objects.make.multilineText(
    ['In challenging enviroment'],
    50,
    objects.textStyle4
  );
  text = s.g(text);
  TweenMax.set(text.node, {
    x: 100
  });
  timeline.add(
    tweens.slideInOut(prevText, text, 250, Back.easeInOut, 0.5),
    'experience+=5.2'
  );

  prevText = text;
  text = objects.make.multilineText(
    ['And cross-cultural'],
    50,
    objects.textStyle3
  );
  var text2 = objects.make
    .multilineText(['Exchange'], 50, objects.textStyle)
    .attr({
      'font-weight': '700',
      'font-style': 'italic',
      'text-anchor': 'begin'
    });
  TweenMax.set(text2.node, {
    x: 340
  });
  text = scene.lastText = s.g(text, text2);
  TweenMax.set(text.node, {
    x: 300
  });
  timeline.add(
    tweens.slideInOut(prevText, text, 250, Back.easeInOut, 0.5),
    'experience+=7.4'
  );

  prevText = scene.lastText;
  text = objects.make.multilineText(
    [
      'Striving to achieve',
      'Peace and fullfillment',
      "of Humankind's potential"
    ],
    50,
    objects.textStyle
  );
  text = scene.lastText = s.g(text);
  TweenMax.set(text.node, { x: vbWidth / 2 - 340 });
  timeline.add(
    tweens.slideInOut(prevText, text, 300, Back.easeInOut, 0.5),
    'experience+=10.6'
  );

  return globals;
};
