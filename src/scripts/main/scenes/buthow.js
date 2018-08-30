var scenes = window.scenes || {};

scenes.buthow = function buthow(globals) {
  var TweenMax = window.TweenMax;
  var Draggable = window.Draggable;
  var CubicBezier = window.CubicBezier;
  var GreenProp = window.GreenProp;
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
  var prevScene = globals.prevScene || s.g();
  var vbWidth = globals.vbWidth;
  var vbHeight = globals.vbHeight;

  timeline.add('buthow', startLabel + '+=' + start);

  timeline
    .to(
      prevScene.node,
      1,
      {
        scale: 0.04,
        svgOrigin: [vbWidth / 2, 280].join(' ')
      },
      'buthow'
    )
    .to(
      prevScene.node,
      1,
      {
        x: vbWidth / 2 - 375,
        y: -140
      },
      'buthow'
    );

  var text = objects.make.butHowText();
  prevScene.add(text);

  TweenMax.set(
    scene.node,
    {
      opacity: 0,
      y: vbHeight
    },
    0
  );
  TweenMax.set(
    text.node,
    {
      opacity: 0,
      y: -vbHeight
    },
    0
  );

  timeline.to(
    [scene.node],
    1,
    {
      opacity: 1,
      y: 0
    },
    'buthow'
  );
  timeline.to(
    text.node,
    1,
    {
      opacity: 1,
      y: 0
    },
    'buthow'
  );

  globals.globalTimeline.addPause('buthow+=1');

  var man = objects.make.man();
  var oldman = objects.make.oldman();
  var oldlady = objects.make.oldlady();
  var mom = objects.make.mom();
  var dad = objects.make.dad();
  var businessman = objects.make.businessman();
  var kid = objects.make.kid();

  var hand = objects.make.hand();
  timeline.set(
    hand.node,
    {
      x: -1000,
      y: -690,
      scale: -0.4,
      opacity: 1
    },
    'buthow'
  );

  var textbuble = scene.g(
    scene
      .rect({
        x: 0,
        y: 0,
        rx: 5,
        ry: 5,
        width: vbWidth * 0.8,
        height: 150
      })
      .attr({
        fill: 'rgb(57, 51, 60)',
        stroke: '#fff'
      })
  );
  TweenMax.set(textbuble.node, {
    x: vbWidth / 2 - vbWidth * 0.4 + 20,
    y: vbHeight / 2 - 180
  });
  var startText;
  var prevP = (startText = textbuble.g(
    hand,
    textbuble
      .text(-200, 0, "Who would you intrust the world's future to?")
      .attr(objects.textStyle2)
  )); // empty group for later swap
  TweenMax.set(prevP.node, {
    x: vbWidth / 2,
    y: 90
  });

  var playButton = textbuble.g(
    scene
      .rect({
        x: 0,
        y: 0,
        rx: 5,
        ry: 5,
        width: 200,
        height: 40
      })
      .attr({
        fill: '#fff',
        stroke: 'none'
      }),
    scene.text(20, 28, 'Find out how ?').attr({
      fill: 'rgb(57, 51, 60)',
      stroke: 'none',
      'text-anchor': 'begin',
      'font-size': '24px',
      'font-family': "'Lato', Arial, sans-serif",
      'font-style': 'normal',
      'font-weight': '400'
    })
  );
  playButton.attr({
    class: 'pointer'
  });
  var playAction = function() {
    window.dispatchEvent(new Event('timeline.play'));
    people.forEach(function(p) {
      p.disable();
    });
    tweens.swapFade(prevP, startText, 2);
    prevP = startText;
  };
  // playButton.mousedown(playAction).touchstart(playAction);

  var people = Snap.set(dad, oldman, oldlady, man, mom, businessman, kid);

  people.forEach(function(p) {
    var text;
    var bb = p.getBBox();
    if (p.says) {
      p.puls = objects.make.puls(p.shadowx, p.shadowy, 50, 10);
    } else {
      p.puls = objects.make.puls(140, 590, 75, 15);
    }
    p.puls.tween.repeat(-1);
    p.add(p.puls);
    if (p.says) {
      p.says = textbuble.g(
        objects.make.multilineText(p.says, 50, objects.speachBubleTextStyle)
      );
      TweenMax.set(p.says.node, {
        x: 100,
        y: 10
      });
    } else {
      text = textbuble.g(
        objects.make.multilineText(
          ['I think I can help !'],
          30,
          objects.speachBubleTextStyleYouth
        )
      );
      p.says = textbuble.g(text, playButton);
      TweenMax.set(text.node, {
        x: 330,
        y: 50
      });
      TweenMax.set(playButton.node, {
        x: vbWidth * 0.8 - playButton.getBBox().width,
        y: 110
      });
    }
    TweenMax.set(p.says.node, {
      opacity: 0
    });
    p.intrArea = p.ellipse(bb.cx, bb.cy, bb.width * 0.7, bb.height * 0.3);
    p.intrArea.attr({
      opacity: 0
    });
    var pAction = function() {
      tweens.swapFade(prevP, p.says, 0.5);
      prevP = p.says;
      if (prevP.children().length > 1) {
        playButton.mousedown(playAction).touchstart(playAction);
      } else {
        playButton.unmousedown(playAction).untouchstart(playAction);
      }
    };
    p.mousedown(pAction).touchstart(pAction);
    p.disable = function() {
      p.unmousedown(pAction).untouchstart(pAction);
      p.puls.tween.pause(0);
    };
    p.enable = function() {
      p.mousedown(pAction).touchstart(pAction);
      p.puls.tween.play(0);
    };
  });

  var peopleGroup = scene.g(people);
  scene.add(man);
  scene.add(kid);
  man.accessory.attr({
    opacity: 1
  });
  TweenMax.set(man.node, {
    y: vbHeight / 2 + 28,
    x: vbWidth / 2 - 5
  });

  timeline.add(tweens.interacthere(hand), 'buthow');
  timeline.add(function() {
    people.forEach(function(p) {
      p.enable();
    });
  }, 'buthow+=1');
  timeline.add(tweens.fadeOut(textbuble), 'buthow+=1');
  // some interaction happens then we continue

  timeline.add('_believe', 'buthow+=2');

  timeline.fromTo(
    man.accessory.node,
    0.1,
    {
      opacity: 1
    },
    {
      opacity: 0
    },
    '_believe'
  );
  timeline.to(
    man.node,
    0.5,
    {
      scale: 0.5,
      y: '+=40',
      x: '+=10',
      transformOrigin: '50% 100%',
      ease: Back.easeIn
    },
    '_believe'
  );

  text = objects.make.multilineText(
    ['We believe that young people'],
    50,
    objects.textStyle2
  );
  text.attr({
    'text-anchor': 'middle'
  });
  text = scene.g(text);
  TweenMax.set(text.node, {
    x: vbWidth / 2
  });
  timeline.add(
    tweens.slideInOut(prevScene, text, 250, Back.easeInOut, 0.5),
    '_believe-=0.3'
  );

  timeline.add('_key', '_believe+=1.5');

  var keyhole = objects.make.keyhole(man);
  timeline.fromTo(
    keyhole.node,
    1,
    {
      opacity: 0
    },
    {
      opacity: 1
    },
    '_key'
  );

  prevText = text;
  text = objects.make.multilineText(
    ['Hold the key for a better future'],
    50,
    objects.textStyle2
  );
  text.attr({
    'text-anchor': 'middle'
  });
  text = s.g(text);
  TweenMax.set(text.node, {
    x: vbWidth / 2
  });
  timeline.add(
    tweens.slideInOut(prevText, text, 250, Back.easeInOut, 0.5),
    '_key'
  );

  timeline.add('_spirit', '_key+=1.5');

  prevText = text;

  var hightlight1 = scene.rect(-84, 60, 252, 56).attr({
    fill: '#0083a1'
  });
  var hightlight2 = scene.rect(-274, 60, 153, 56).attr({
    fill: '#ff683c'
  });
  text = objects.make.multilineText(
    ['With their', 'Passion & Entrepenurial spirit'],
    50,
    objects.textStyle2
  );
  text = s.g(hightlight2, hightlight1, text);
  TweenMax.set(text.node, {
    x: vbWidth - 400
  });
  timeline.add(
    tweens.slideInOut(prevText, text, 250, Back.easeInOut, 0.5),
    '_spirit'
  );
  var zoomX = (scene.zoomX =
    man.getBBox().cx + GreenProp.x(man.node) > 760
      ? 760
      : man.getBBox().cx + GreenProp.x(man.node));
  var zoomY = (scene.zoomY =
    man.getBBox().cy + GreenProp.y(man.node) - 100 > 590
      ? 590
      : man.getBBox().cy + GreenProp.y(man.node) - 100);
  timeline.to(
    scene.node,
    1,
    {
      scale: 0.1,
      ease: Back.easeIn,
      svgOrigin: [zoomX, zoomY].join(' ')
    },
    '_spirit'
  );

  var deathpillar = (scene.death = scene
    .rect(-vbWidth * 3.6, -vbHeight * 7, 100, vbHeight * 8)
    .attr({
      fill: '#fff'
    }));

  var fallTween = tweens.pillarFall(deathpillar, 86.55);
  timeline.add(fallTween, '_spirit');

  prevText = text;
  var underline = objects.make.stick().attr({
    stroke: '#ffc649'
  });
  TweenMax.set(underline.node, {
    x: '180',
    y: '+=58',
    scaleX: 0.25
  });
  text = objects.make.multilineText(
    ["They can face tomorrow's issues"],
    50,
    objects.textStyle2
  );
  text = s.g(text, underline);
  TweenMax.set(text.node, {
    x: vbWidth - 500
  });
  timeline.add(
    tweens.slideInOut(prevText, text, 250, Back.easeInOut, 0.5),
    '_spirit+=2'
  );

  underline = objects.make.stick().attr({
    stroke: '#0079fa'
  });
  TweenMax.set(underline.node, {
    x: '+=210',
    y: '+=58',
    scaleX: 0.24
  });
  prevText = text;
  text = objects.make.multilineText(
    ['With what they choose to do today'],
    50,
    objects.textStyle2
  );
  text.attr({
    'text-anchor': 'middle'
  });
  text = scene.lastText = s.g(underline, text);
  TweenMax.set(text.node, {
    x: vbWidth / 2
  });
  timeline.add(
    tweens.slideInOut(prevText, text, 250, Back.easeInOut, 0.5),
    '_spirit+=' + (fallTween.duration() - 0.6)
  );

  timeline.add(
    tweens
      .sequence()
      .to(scene.node, 1.3, {
        scale: 0.2,
        svgOrigin: [zoomX, zoomY].join(' '),
        ease: Power1.easeIn
      })
      .to(scene.node, 0.6, {
        scale: 0.9,
        svgOrigin: [zoomX, zoomY].join(' '),
        ease: CubicBezier.get('cameraZoom')
      }),
    '_spirit+=3.6'
  );

  var sideman = (scene.sideman = objects.makeSideman({
    color: '#fff'
  }));
  timeline.set(
    sideman.node,
    {
      opacity: 0
    },
    0
  );
  scene.add(sideman);
  timeline
    .set(
      man.node,
      {
        opacity: 0
      },
      '_spirit+=4.9'
    )
    .to(
      peopleGroup.node,
      0.2,
      {
        x: '+=1000',
        opacity: 0
      },
      '_spirit+=4.7'
    );
  timeline.add(tweens.sideman.start(sideman), '_spirit+=4.9');
  timeline.add(tweens.absorbImpact(sideman), '_spirit+=5.12');
  timeline.to(
    kid.node,
    0.2,
    {
      x: '+=1000',
      opacity: 0,
      ease: Back.easeIn
    },
    '_spirit+=5.80'
  );

  return globals;
};
