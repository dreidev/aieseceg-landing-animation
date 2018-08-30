var scenes = window.scenes || {};

var slide = function slide(globals) {
  var TweenMax = window.TweenMax;
  var $ = window.$;
  var Draggable = window.Draggable;
  var CubicBezier = window.CubicBezier;
  var Power1 = window.Power1;
  var Back = window.Back;
  var Elastic = window.Elastic;
  var Linear = window.Linear;
  var objects = window.objects;
  var tweens = window.tweens;
  var timeline = globals.timeline;
  var start = globals.startOffset;
  var startLabel = globals.startLabel;
  var scene = globals.scene;
  var vbWidth = globals.vbWidth;
  var vbHeight = globals.vbHeight;
  var maskx = 0;
  var masky = 0;
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    maskx = vbWidth / 2 + 138;
    masky = vbHeight / 2 + 138;
  }
  var startTime = globals.params.startTime;
  var elementType = globals.params.element || 'solution';
  var sideman = globals.params.sideman || scene.g();
  var initPose = {
    x: 400,
    y: -30
  };

  timeline.add('start', startLabel + '+=' + start);
  timeline.set(scene.node, {
    opacity: 0,
    y: vbHeight * 2
  });

  var path = scene.path(elements[elementType].path).attr({
    stroke: '#fff',
    fill: 'none',
    'stroke-dasharray': '5'
  });
  var pathMask = objects.make.mask(
    path.clone().attr({
      stroke: '#fff',
      strokeWidth: 3,
      'stroke-dasharray': 'none'
    }),
    path
  );
  pathMask.tween = TweenMax.fromTo(
    pathMask.mask.node,
    2,
    {
      drawSVG: '0%'
    },
    {
      drawSVG: '100%',
      ease: Power3.easeInOut
    }
  );
  path.tween = TweenMax.to(path.node, 0.5, {
    strokeDashoffset: -10,
    repeat: -1,
    ease: Linear.easeNone
  });
  scene.add(pathMask);

  timeline.pause();
  var play = function() {
    timeline.play();
    mask.unmousedown(play).untouchstart(play);
  };
  window.addEventListener('slide.reset', globals.rest);

  globals.trigger = function() {
    if (
      startTime <= globals.globalTimeline.time() + 0.1 &&
      startTime >= globals.globalTimeline.time() - 0.1
    ) {
      window.dispatchEvent(new Event('timeline.pause'));
      dragable[0].enable();
      timeline.play(0);
      pathMask.tween.play();
      path.tween.play();
      TweenMax.set(pathMask.node, {
        opacity: 1
      });
    } else {
      globals.reset();
    }
  };
  globals.reset = function() {
    timeline.pause(0);
    pathMask.tween.pause();
    path.tween.pause();
    dragable[0].disable();
    mask.unmousedown(play).untouchstart(play);
    TweenMax.set(scene.node, {
      opacity: 0,
      y: vbHeight * 2
    });
    TweenMax.set(mask.node, initPose);
    TweenMax.set(mask.mask.node, {
      r: 38
    });
  };

  var group = scene.g();

  var background = scene
    .rect(-vbWidth / 2, -vbHeight / 2, vbWidth * 2, vbHeight * 2)
    .attr({
      fill: elements[elementType].color,
      stroke: '#fff',
      opacity: 0.8
    });
  group.add(background);

  var text = objects.make.multilineText(
    elements[elementType].text,
    60,
    objects.textStyle4
  );
  text.attr({
    'text-anchor': 'begin'
  });
  text = group.g(text);
  TweenMax.set(text.node, {
    x: vbWidth / 2 - 450,
    y: vbHeight / 2 - 250
  });

  var element = objects.make.element(elementType);
  var elGr = group.g(element);
  TweenMax.set(elGr.node, {
    x: vbWidth / 2 + 100,
    y: vbHeight / 2 + 100,
    opacity: 1
  });
  var mask = objects.make.mask(
    scene.circle(maskx, masky, 38).attr({
      fill: 'white'
    }),
    group
  );
  scene.add(mask);
  TweenMax.set(mask.mask.node, {
    x: vbWidth / 2 + 138,
    y: vbHeight / 2 + 138
  });

  TweenMax.set(mask.node, initPose);
  mask.attr({
    class: 'grabbable'
  });
  var dragable = Draggable.create(mask.node, {
    type: 'x, y',
    bounds: {
      maxX: vbWidth / 2 - 200,
      minX: -vbWidth / 2,
      maxY: vbHeight / 2 - 10,
      minY: -vbHeight / 2
    },
    onDragStart: function() {
      pathMask.tween.pause(0);
    },
    onDrag: function() {
      mask.swipping = true;
      var drag = this;
      var maxX = drag.maxX - 10;
      var minX = drag.minX + 10;
      if (drag.x > maxX)
        TweenMax.set(mask.node, {
          x: maxX
        });
      if (drag.x < minX)
        TweenMax.set(mask.node, {
          x: minX
        });

      var bb = sideman.getBBox();
      // if specified distance reached
      if (drag.x < elements[elementType].x) {
        drag.disable();
        var sq = tweens
          .sequence({
            onComplete: function() {
              sq.kill();
              // timeline.play();
            }
          })
          .to(mask.node, 0.2, {
            x: elements[elementType].x,
            y: elements[elementType].y,
            ease: Power1.easeInOut
          })
          .to(mask.mask.node, 0.5, {
            attr: {
              r: 700
            },
            tranformOrigin: '50% 50%'
          });
        mask.mousedown(play).touchstart(play);
      }
    }
  });

  var colorMan = TweenMax.to(sideman.parts, 0.1, {
    fill: elements[elementType].color
  });
  var changeBackgroundSol = TweenMax.to(objects.background.node, 0.3, {
    fill: elements[elementType].color
  });

  var manColBack = TweenMax.to(sideman.parts, 0.2, {
    fill: '#0079FA'
  });

  timeline.set(scene.node, {
    opacity: 1
  });

  timeline.to(scene.node, 1, {
    y: 0
  });
  timeline.add(pathMask.tween);

  timeline.set(
    elGr.node,
    {
      opacity: 1
    },
    0
  );
  timeline.addPause();
  timeline.to(mask.mask.node, 0.5, {
    attr: {
      r: 0
    },
    x: '-=20',
    y: '-=20',
    tranformOrigin: '50% 50%'
  });
  timeline.add(colorMan.duration(0.5));
  timeline.add([manColBack, changeBackgroundSol]);
  timeline.add(function() {
    window.dispatchEvent(new Event('timeline.play'));
    globals.reset();
  });

  return globals;
};
var vbWidth = window.vbWidth;
var vbHeight = window.vbHeight;
var elements = {
  solution: {
    title: 'solution oriented',
    path: [
      ['M', vbWidth * 0.92, vbHeight * 0.65],
      [
        'C',
        vbWidth * 0.85,
        vbHeight * 0.8,
        vbWidth * 0.75,
        vbHeight * 0.8,
        vbWidth * 0.62,
        vbHeight * 0.72
      ]
    ],
    x: 60,
    y: 0,
    color: '#955B9C',
    text: ['Ability to solve challenges', 'while living in uncertainty'],
    old_text: [
      'Adapts and showes resilience in the face',
      'Of challenges',
      'Transmits positivity to move forward',
      'Through uncertainty.',
      'Takes risks when it is needed'
    ]
  },
  empower: {
    title: 'empowering others',
    path: [
      ['M', vbWidth * 0.92, vbHeight * 0.65],
      [
        'C',
        vbWidth * 0.9,
        vbHeight * 0.7,
        vbWidth * 0.85,
        vbHeight * 0.7,
        vbWidth * 0.777,
        vbHeight * 0.6
      ]
    ],
    x: 220,
    y: 0,
    color: '#E94F38',
    text: [
      'Communicates effectively',
      'developing and empowering others',
      'to achieve a bigger purpose.'
    ],
    old_text: [
      'COMMUNICATES EFFECTIVELY',
      'IN DIVERSE ENVIRONMENTS.',
      'DEVELOPS & EMPOWERS OTHER PEOPLE.',
      'ENGAGES WITH OTHERS TO ACHIEVE',
      'A BIGGER PURPOSE.'
    ]
  },
  reflect: {
    title: 'self awar',
    path: [
      ['M', vbWidth * 0.92, vbHeight * 0.65],
      [
        'C',
        vbWidth * 0.85,
        vbHeight * 0.8,
        vbWidth * 0.65,
        vbHeight * 0.8,
        vbWidth * 0.5,
        vbHeight * 0.62
      ]
    ],
    x: -140,
    y: 0,
    color: '#F9CC00',
    text: [
      'Understands his personal values',
      ' and is clear on what he',
      'is capable of doing.'
    ],
    old_text: [
      'UNDERSTANDS AND LIVES PERSONAL VALUES.',
      'FOCUSES ON STRENGTHS OVER WEAKNESSES.',
      'EXPLORES ONE’S PASSIONS.'
    ]
  },
  world: {
    title: 'world citizen',
    path: [
      ['M', vbWidth * 0.92, vbHeight * 0.65],
      [
        'C',
        vbWidth * 0.85,
        vbHeight * 0.8,
        vbWidth * 0.65,
        vbHeight * 0.8,
        vbWidth * 0.48,
        vbHeight * 0.66
      ]
    ],
    x: -140,
    y: -40,
    color: 'rgba(45, 176, 147, 1)',
    text: ['Takes an active role', 'in making the world', 'a better place.'],
    old_text: [
      'BELIEVES IN THEIR ABILITY TO MAKE A',
      'DIFFERENCE IN THE WORLD.',
      'INTERESTED IN THE WORLD ISSUES.',
      'ENJOYS TAKING RESPONSIBILITY FOR',
      'IMPROVING THE WORLD.'
    ]
  }
};

scenes.slide = slide;
