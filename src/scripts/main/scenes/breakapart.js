var scenes = window.scenes || {};

scenes.breakapart = function breakapart(globals) {
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
  globals = globals || {};
  var s = globals.s;
  var timeline = globals.timeline;
  var start = globals.startOffset;
  var startLabel = globals.startLabel;
  var scene = globals.scene;
  var vbWidth = globals.vbWidth;
  var vbHeight = globals.vbHeight;

  var repeating = tweens.sequence();

  var deathpillar = scene.rect(vbWidth / 2 - 150, 290, 250, 4 * vbHeight).attr({
    fill: 'rgba(255,255,255,1)',
    stroke: '#fff'
  });

  var glob = objects.make.glob();
  var text = objects.makeSwipeText();
  var glob_text = scene.g(glob, text);

  repeating.add(text.tween, 0);

  glob_text.tween = tweens
    .swipeOffStage(glob_text)
    .set(glob_text.node, {
      opacity: 0
    })
    .addCallback(function() {
      glob_text.tween.pause();
      glob_text.swipping = false;
    })
    .pause();
  glob_text.attr({ class: 'grabbable' });
  glob_text.swipping = false;
  var dragable = Draggable.create(glob_text.node, {
    type: 'x',
    bounds: {
      maxX: 400,
      minX: -20
    },
    onDrag: function() {
      glob_text.swipping = true;
      var drag = this;
      var maxX = drag.maxX - 10;
      var minX = drag.minX + 10;
      if (drag.x > maxX)
        TweenMax.set(glob_text.node, {
          x: maxX
        });
      if (drag.x < minX)
        TweenMax.set(glob_text.node, {
          x: minX
        });

      if (drag.x >= 75) {
        window.timeline.seek((drag.x - 74) / 200);
      }

      // if specified distance reached
      if (drag.x >= 140) {
        window.dispatchEvent(new Event('timeline.play'));
        drag.disable();
        if (glob_text.tween.paused()) {
          glob_text.tween.play();
        }

        window.dispatchEvent(new Event('animation.started'));
      }
    }
  });

  timeline.add('start', startLabel + '+=' + start);
  timeline.addPause();

  timeline
    .addCallback(function() {
      glob_text.tween.pause(0);
      repeating.play();
      TweenMax.set(glob_text.node, {
        x: 0,
        opacity: 1
      });
      dragable[0].enable();
    }, 'start')
    .set(
      glob_text.node,
      {
        opacity: 1
      },
      'start'
    )
    .addCallback(function() {
      if (!glob_text.swipping) {
        glob_text.tween.play(0);
      }
    }, 'start+=0.2')
    .set(
      glob_text.node,
      {
        opacity: 0
      },
      'start+=2'
    );

  // hiding pillar for drag effect
  timeline
    .set(
      deathpillar.node,
      {
        scale: 0,
        transformOrigin: '50% 0%'
      },
      'start'
    )
    .set(
      deathpillar.node,
      {
        scale: 1,
        transformOrigin: '50% 0%'
      },
      'start+=1'
    );

  timeline.add('slipfall', 'start+=0.1');
  // timeline.add('timelnStrt', 'start+= 0.35');

  var clouds = objects.make.clouds();
  var floatingClouds = scene.g(
    objects.make.floatingCloud(0, vbWidth - 400, 240),
    objects.make.floatingCloud(1, vbWidth - 400, vbHeight - 150),
    objects.make.floatingCloud(2, vbWidth / 2 - 100, 80),
    objects.make.floatingCloud(2, 120, 140),
    objects.make.floatingCloud(3, 100, 500)
  );
  repeating.add(
    [].map.call(floatingClouds.children(), function(c) {
      return c.tween;
    }),
    0
  );
  repeating.repeat(-1);
  clouds.add(floatingClouds);

  var man = objects.makeMan();
  var men = scene.g(man);
  var timedown = 3.5;

  var seq = tweens
    .sequence()
    .add(tweens.slip(man))
    .add(tweens.falling(man, 3))
    .add(tweens.crash(man), '-=0.25');
  timeline.add(seq.duration(timedown), 'slipfall');
  timeline.to(
    clouds.node,
    timedown - 0.5,
    {
      y: -vbHeight * 7,
      ease: Power0.easeIn
    },
    'slipfall'
  );

  timeline.add('endslipfall');

  var shadow = objects.makeShadow(man);
  shadow.before(man);
  timeline
    .to(
      shadow.node,
      0.3,
      {
        opacity: 0,
        x: '+=60'
      },
      'slipfall-=0.1'
    )
    .set(
      shadow.node,
      {
        scaleX: 1,
        x: '-=90',
        y: vbHeight * 7 + 140,
        opacity: 1,
        transformOrigin: '50% 50%'
      },
      'slipfall+=0.3'
    )
    .to(
      shadow.node,
      timedown - 0.5,
      {
        y: vbHeight - 595,
        ease: Expo.easeIn
      },
      'slipfall+=0.3'
    )
    .to(
      shadow.node,
      0.5,
      {
        scaleX: 1.5,
        transformOrigin: '50% 50%',
        ease: CubicBezier.get('CrashGroundEase')
      },
      'endslipfall-=0.5'
    );

  text = s.g(
    s.text(vbWidth - 300, 0, 'It all started').attr(objects.textStyle)
  );
  timeline.add(
    tweens
      .sequence()
      .fromTo(
        text.node,
        1,
        {
          y: vbHeight * 1.5
        },
        {
          y: vbHeight / 2 - 150,
          ease: Power1.easeOut
        }
      )
      .to(text.node, timedown - 1, {
        y: '-=100',
        ease: CubicBezier.get('CrashGroundEase')
      }),
    'slipfall+=0.2'
  );

  var prevText = text;
  prevText = text;
  text = objects.make.multilineText(
    ['After the Second World War'],
    50,
    objects.textStyle
  );
  text = s.g(text);
  TweenMax.set(text.node, {
    x: vbWidth - 300
  });
  timeline.add(tweens.slideInOut(prevText, text, 250), 'endslipfall-=0.5');

  timeline.add(tweens.shake(scene), 'endslipfall-=0.2');

  timeline.add('backup', 'endslipfall+=2');

  man = objects.makeMan({
    // x: vbWidth/2 - 80,
    y: -vbHeight
  });
  TweenMax.set(man.node, {
    opacity: 0
  });
  timeline.set(
    man.node,
    {
      opacity: 1
    },
    'backup'
  );
  timeline.add(tweens.fallCrash(man, vbHeight - 435).duration(1), 'backup-=1');

  // shake ground
  timeline.add(tweens.shake(scene), 'backup');
  timeline.add(tweens.shake(scene), 'backup+=1.3');
  timeline.add(tweens.shake(scene), 'backup+=2');

  men.add(man);

  prevText = text;
  text = objects.make.multilineText(
    ['As the', 'Tension'],
    50,
    objects.textStyle
  );
  text = s.g(text);
  TweenMax.set(text.node, {
    x: vbWidth - 300
  });
  timeline.add(tweens.slideInOut(prevText, text, 200), 'backup-=0.5');

  seq = tweens.sequence();
  for (var i = 1; i < 30; i++) {
    man = objects.makeMan({
      // x: vbWidth/2 - 80,
      y: -vbHeight * 4.5
    });
    var tl = tweens
      .fallCrash(man, vbHeight - (425 + i * 75))
      .duration(timedown);
    tl.timeScale(i);
    seq.add(tl, '-=' + i / 600);
    men.add(man);
  }
  timeline.add(seq, 'backup');

  prevText = text;
  text = objects.make.multilineText(
    ['Continued To', 'Rise'],
    50,
    objects.textStyle
  );
  text = s.g(text);
  TweenMax.set(text.node, {
    x: vbWidth - 300
  });
  timeline.add(
    tweens.slideInOut(prevText, text, 100, Back.easeInOut, 0.5),
    'backup+=2'
  );

  var changeColorRed = TweenMax.fromTo(
    objects.background.node,
    3,
    {
      fill: '#3B363F'
    },
    {
      fill: '#4F171F'
    }
  );

  timeline.add(changeColorRed, 'backup+=2');

  timeline.add('map', 'backup+=' + timedown * 1.4);

  timeline.to(
    clouds.node,
    timedown * 1.4,
    {
      y: 0,
      ease: Back.easeIn
    },
    'backup'
  );

  timeline
    .to(
      men.node,
      timedown * 0.9,
      {
        // scale: 0.2,
        y: vbHeight * 1,
        // svgOrigin: vbWidth/2 + ' ' + (vbHeight*3),
        ease: Power1.easeOut
      },
      'backup+=2'
    )
    .to(
      men.node,
      1.5,
      {
        scale: 0.2,
        ease: Power1.easeOut,
        svgOrigin: vbWidth / 2 + ' ' + vbHeight
      },
      'map-=1'
    );

  timeline.to(
    deathpillar.node,
    1.5,
    {
      scale: 0.2,
      transformOrigin: '57% 0%'
    },
    'map-=1'
  );

  timeline
    .from(
      deathpillar.node,
      0.8,
      {
        fill: 'rgba(255,255,255,0)',
        opacity: 0
        // strokeDasharray: '0'
      },
      'map-=0.3'
    )
    .to(
      men.node,
      0.5,
      {
        opacity: 0
      },
      'map'
    );

  prevText = text;
  text = objects.make.multilineText(
    ['Between', 'Nations'],
    50,
    objects.textStyle
  );
  text = s.g(text);
  TweenMax.set(text.node, {
    x: vbWidth - 300
  });
  timeline.add(
    tweens.slideInOut(prevText, text, 100, Back.easeInOut, 0.5),
    'map-=1'
  );

  var x = vbWidth / 2;
  var y = vbHeight / 2 - 200;
  // scene.circle(x, y, 150);

  var map = objects.make.map();
  var mapclouds = clouds.g(map, floatingClouds);

  timeline.to(
    map.node,
    1,
    {
      opacity: 1
    },
    'map-=3'
  );
  timeline.to(
    floatingClouds.node,
    1,
    {
      scale: 0.5,
      svgOrigin: [x, y].join(' ')
    },
    'map-=3'
  );

  TweenMax.set(map.node, {
    scale: 1.8
  });
  TweenMax.set(map.node, {
    x: vbWidth / 2 + 70,
    y: '-=100'
  });
  // timeline.to(map.node, 0.5, {y:'+=100'}, 'map');

  TweenMax.set(
    mapclouds.node,
    {
      y: '-=' + 50
    },
    'map'
  );

  timeline.to(
    mapclouds.node,
    0.5,
    {
      y: '+=100'
    },
    'map'
  );

  var mapcloudsmen = scene.g(deathpillar, men, clouds);

  timeline.to(
    mapcloudsmen.node,
    1,
    {
      x: '-=200'
    },
    'map-=1'
  );

  timeline.add('breakappart');
  window.floatingClouds = floatingClouds;

  timeline.add(
    tweens
      .sequence()
      .to(mapcloudsmen.node, 1, {
        scale: '+=0.2',
        svgOrigin: [x, y].join(' '),
        ease: Elastic.easeIn
      })
      .add(map.explossionTween)
      .add(tweens.scatter(floatingClouds), 1),
    'breakappart-=0.3'
  );

  timeline.set(
    deathpillar.node,
    {
      fill: 'rgba(255, 255, 255, 0)',
      strokeDasharray: '20',
      strokeWidth: 10
    },
    'breakappart+=0.7'
  );

  prevText = text;
  text = objects.make.multilineText(
    ['Breaking Them', 'Apart'],
    50,
    objects.textStyle
  );
  text = s.g(text);
  TweenMax.set(text.node, {
    x: vbWidth - 300
  });
  timeline.add(
    tweens.slideInOut(prevText, text, 100, Back.easeInOut, 0.5),
    'breakappart+=0.3'
  );

  var blinkColorRed = TweenMax.fromTo(
    objects.background.node,
    0.2,
    {
      fill: '#3B363F'
    },
    {
      fill: '#4F171F',
      repeat: 2
    }
  );

  timeline.add(blinkColorRed, 'breakappart+=0.3');

  clouds.selectAll('.cloud').forEach(function(c) {
    timeline.set(
      c.node,
      {
        opacity: 0
      },
      'breakappart+=1'
    );
  });

  timeline.add(function() {
    repeating.pause();
  });

  scene.mapcloudsmen = mapcloudsmen;
  scene.deathpillar = deathpillar;
  scene.map = map;
  scene.lastText = text;
  globals.startOffset = -1;

  return globals;
};
