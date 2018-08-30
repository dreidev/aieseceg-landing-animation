(function() {
  var TweenMax = window.TweenMax;
  var tweens = window.tweens;
  var Snap = window.Snap;
  var GreenProp = window.GreenProp;
  var s = window.s;
  var $ = window.$;
  var vbWidth = window.vbWidth;
  var vbHeight = window.vbHeight;
  var centerStage = vbWidth / 2;

  var objects = (window.objects = window.objects || {});
  var backstage = (objects.backstage = s.group());
  backstage.attr({
    opacity: 0,
    x: 99999999999
  });

  var load = function(svg) {
    backstage.add(svg.select('#man'));
    backstage.add(svg.select('#sideman'));
    backstage.add(svg.select('#manreflect'));
    backstage.add(svg.select('#manreflect2'));
    backstage.add(svg.select('#oldman'));
    backstage.add(svg.select('#dad'));
    backstage.add(svg.select('#mom'));
    backstage.add(svg.select('#kid'));
    backstage.add(svg.select('#keyhole'));
    backstage.add(svg.select('#oldlady'));
    backstage.add(svg.select('#businessman'));
    backstage.add(svg.select('#maps'));
    backstage.add(svg.select('#qmark'));
    backstage.add(svg.select('#speaker'));
    backstage.add(svg.select('#hand'));
    backstage.add(svg.select('#key'));
    backstage.add(svg.select('#elements'));
    backstage.add(svg.select('#colored-map'));
    backstage.add(svg.select('#happy-person'));
    backstage.add(svg.select('#globaltalent'));
    backstage.add(svg.select('#globalcitizen'));
    backstage.add(svg.selectAll('.social'));
    backstage.add(svg.select('#manoutlines'));
    backstage.add(svg.select('#mouse'));
    objects.outlines = backstage.selectAll('.outline');
    var clouds = (objects.clouds = svg.selectAll('.cloud'));
    backstage.add(clouds);
    clouds.attr({
      fill: '#fff'
    });
    var trees = (objects.trees = svg.selectAll('.tree'));
    backstage.add(trees);
    objects.ready = true;
    window.dispatchEvent(
      new CustomEvent('objects.loaded', { detail: objects })
    );
  };

  // Snap.load('svg/models.svg', load);
  load(Snap.select('#models'));

  objects.clone = function cloneObjectByQuery(query) {
    var clone = objects.backstage.select(query);
    try {
      clone = clone.clone();
    } catch (e) {
      clone = Snap(clone.node.cloneNode(true));
    }
    return clone;
  };

  objects.make = {
    tree: function trees(type, x, y, scale) {
      var tree = objects.trees[type].clone();
      scale = scale || 0.4;
      TweenMax.set(tree.node, {
        scale: scale,
        x: x || 0,
        y: y || 0
      });
      return tree;
    },
    glob: function makeGlob(opt) {
      opt = opt || {};
      var semicriclerad = opt.radious || vbHeight * 0.5;
      var semicircle = backstage.circle(
        opt.cx || centerStage,
        opt.cy || vbHeight,
        semicriclerad
      );
      semicircle.attr({
        fill: opt.fill || '#807976',
        opacity: opt.opacity === undefined ? 1 : opt.opacity,
        stroke: 'none'
      });
      return semicircle;
    },
    puls: function makePuls(x, y, r, r2) {
      r = r || 10;
      r2 = r2 || r;
      var mainPuls = objects.backstage.ellipse().attr({
        rx: r,
        ry: r2,
        cx: x,
        cy: y
      });
      mainPuls.attr({
        fill: '#fff',
        stroke: 'none',
        opacity: 1
      });
      backstage.add(mainPuls);
      mainPuls.tween = tweens.puls(mainPuls);
      return mainPuls;
    },
    cloud: function makeCloud(opt) {
      var cloud;
      opt = opt || {};
      opt.scale = opt.scale || 0.4;
      cloud = objects.clouds[opt.type === void 0 ? 2 : opt.type].clone();
      TweenMax.set(cloud.node, {
        scale: opt.scale,
        x: opt.x || 0,
        y: opt.y || 0
      });
      return cloud;
    },
    floatingCloud: function makeFloatingCloud(type, x, y) {
      var cloud;
      var opt = opt || {};
      opt.scale = opt.scale || 0.4;
      opt.type = type === void 0 ? 2 : type;
      opt.x = x;
      opt.y = y;
      cloud = objects.make.cloud(opt);
      cloud.tween = tweens.float(cloud.node);
      return cloud;
    },
    clouds: function makeClouds() {
      var clouds = backstage.g();

      function randInt(heigh, low) {
        return Math.floor(Math.random() * (heigh - low) + low);
      }
      for (var i = 1; i < 6; i++) {
        clouds.add(
          objects.make.cloud({
            type: randInt(1, 4),
            x: vbWidth - randInt(200, 400),
            y: vbHeight * i + 200
          }),
          objects.make.cloud({
            type: randInt(1, 4),
            x: randInt(100, 200),
            y: vbHeight * i + 400
          }),
          objects.make.cloud({
            type: randInt(1, 4),
            x: vbWidth - randInt(200, 400),
            y: vbHeight * i + 600
          })
        );
      }
      return clouds;
    },

    multilineText: function multiLineText(text, lineHeight, style) {
      style = style || {};
      lineHeight = lineHeight || 50;
      text = backstage
        .text({
          text: text
        })
        .attr(style);
      text.selectAll('tspan').forEach(function(tspan, i) {
        tspan.attr({
          x: '0',
          y: lineHeight * (i + 1)
        });
      });
      return text;
    },
    butHowText: function() {
      var text = backstage.text({
        text: ['But', 'How']
      });
      text.attr(objects.textStyle);
      text.attr({
        'font-size': 2400
      });
      var subtexts = text.selectAll('tspan');
      subtexts[0].attr({
        x: 0
      });
      subtexts[1].attr({
        x:
          subtexts[1].getBBox().width - 3200 > 0
            ? subtexts[1].getBBox().width - 3200
            : 5000,
        'font-style': 'italic'
      });
      text = backstage.g(text);
      TweenMax.set(text.node, {
        x: -vbWidth * 7,
        y: vbHeight - 200
      });
      var qmark = objects.make.qmark();
      TweenMax.set(qmark.node, {
        scale: 2.4,
        transformOrigin: '50% 100%'
      });
      TweenMax.set(qmark.node, {
        y: -vbHeight * 1.2,
        x: vbWidth / 2 - 320
      });

      return backstage.g(text, qmark);
    }
  };

  objects.textStyle = {
    fill: '#fff',
    stroke: 'none',
    'text-anchor': 'middle',
    'font-size': '45px',
    'font-family': "'Lato', Arial, sans-serif",
    'font-style': 'normal',
    'font-weight': '300'
  };
  objects.textStyle2 = {
    fill: '#fff',
    stroke: 'none',
    'text-anchor': 'middle',
    'font-size': '45px',
    'font-family': "'Lato', Arial, sans-serif",
    'font-style': 'italic',
    'font-weight': '300'
  };
  objects.textStyle3 = {
    fill: '#fff',
    stroke: 'none',
    'text-anchor': 'middle',
    'font-size': '60px',
    'font-family': "'Lato', Arial, sans-serif",
    'font-style': 'italic',
    'font-weight': '300'
  };
  objects.textStyle4 = {
    fill: '#fff',
    stroke: 'none',
    'text-anchor': 'begin',
    'font-size': '55px',
    'font-family': "'Lato', Arial, sans-serif",
    'font-style': 'italic',
    'font-weight': '400'
  };
  objects.speachBubleTextStyle = {
    fill: '#fff',
    stroke: 'none',
    'text-anchor': 'begin',
    'font-size': '40px',
    'font-family': "'Lato', Arial, sans-serif",
    'font-style': 'italic',
    'font-weight': '400'
  };
  objects.speachBubleTextStyleYouth = {
    fill: '#fff',
    stroke: 'none',
    'text-anchor': 'begin',
    'font-size': '40px',
    'font-family': "'Lato', Arial, sans-serif",
    'font-style': 'normal',
    'font-weight': '700'
  };

  var background = (objects.background = s.rect(
    -vbWidth,
    -vbHeight,
    vbWidth * 3,
    vbHeight * 3
  ));
  background.attr({
    fill: s.gradient(
      'L(0,0, ' + vbHeight * 3 + ', ' + vbHeight * 3 + ')#3f3a42-#27212b'
    )
  });

  objects.make.hand = function() {
    return objects.clone('#hand');
  };
  objects.make.stick = function() {
    var stick = backstage.path({
      stroke: '#0079fa',
      'stroke-width': 4,
      fill: 'none',
      d: 'm 0, 0 470,0'
    });
    stick.data('morphs', [
      stick.attr('d'),
      'm 0,0 c 97.6826,57.84069 287.8299,64.59687 470,0'
    ]);
    return stick;
  };
  objects.make.speaker = function() {
    return objects.clone('#speaker');
  };
  objects.make.key = function() {
    return objects.clone('#key');
  };
  objects.make.element = function(el) {
    var ob = objects.clone('#elements .' + el);
    TweenMax.set(ob.node, {
      scale: 0.12,
      transformOrigin: 'center'
    });
    TweenMax.set(ob.node, {
      x: 38,
      y: 38
    });
    return ob;
  };

  objects.make.oldman = function() {
    var obj = backstage.select('#oldman').clone();
    TweenMax.set(obj.node, {
      y: vbHeight / 2 + 32,
      x: vbWidth / 2 - 330,
      scale: 0.6
    });
    obj.offset = -280;
    obj.says = [
      'I have great wisdom to share, alase...',
      "I'm sorry, I don't have the energy these days"
    ];
    obj.shadowx = 80;
    obj.shadowy = 370;
    return obj;
  };
  objects.make.businessman = function() {
    var obj = objects.clone('#businessman');
    TweenMax.set(obj.node, {
      y: vbHeight / 2 - 20,
      x: vbWidth / 2 + 255,
      scale: 0.6
    });
    obj.offset = 305;
    obj.says = [
      "What's that? Sorry, I have a lot of work to do",
      'Not enough time'
    ];
    obj.shadowx = 110;
    obj.shadowy = 450;
    return obj;
  };
  objects.make.oldlady = function() {
    var obj = objects.clone('#oldlady');
    TweenMax.set(obj.node, {
      y: vbHeight / 2 + 20,
      x: vbWidth / 2 - 195,
      scale: 0.6
    });
    obj.offset = -130;
    obj.says = ["I don't have the power son...", 'I wish I was your age.'];
    obj.shadowx = 120;
    obj.shadowy = 390;
    return obj;
  };
  objects.make.kid = function() {
    var obj = objects.clone('#kid');
    TweenMax.set(obj.node, {
      y: vbHeight / 2 + 125,
      x: vbWidth / 2 + 430,
      scale: 0.6
    });
    obj.offset = obj.getBBox().y2;
    obj.says = [
      "You realise I don't even know what a passport is...",
      ' Hey wanna play Ball!.'
    ];
    obj.shadowx = 65;
    obj.shadowy = 210;
    return obj;
  };
  objects.make.mom = function() {
    var obj = objects.clone('#mom');
    TweenMax.set(obj.node, {
      y: vbHeight / 2,
      x: vbWidth / 2 + 120,
      scale: 0.6
    });
    obj.offset = obj.getBBox().y2;
    obj.says = [
      'I have to take care of my child...',
      'He may grow up to be a world leader!'
    ];
    obj.shadowx = 80;
    obj.shadowy = 420;
    return obj;
  };
  objects.make.dad = function() {
    var obj = objects.clone('#dad');
    TweenMax.set(obj.node, {
      y: vbHeight / 2 - 2,
      x: vbWidth / 2 - 490,
      scale: 0.6
    });
    obj.offset = obj.getBBox().y2;
    obj.says = [
      'Who do you think I am!',
      'I need to make a living for my family'
    ];
    obj.shadowx = 100;
    obj.shadowy = 430;
    return obj;
  };

  objects.make.keyhole = function(man) {
    var obj = objects.clone('#keyhole');
    man.add(obj);
    var bb = man.bb || man.getBBox();
    TweenMax.set(obj.node, {
      y: bb.y + 20,
      x: bb.x + 25,
      scale: 1.2
    });
    return obj;
  };

  objects.makeMan = objects.make.man = function makeMan(opt) {
    opt = opt || {};
    var man = objects.clone('#man');
    backstage.add(man);
    man.parts = man.node.querySelectorAll('.main > *');
    man.setColor = function(color) {
      man.selectAll('.main > *').attr({
        fill: color || '#fff'
      });
    };
    man.setColor(opt.color);
    man.selectAll('.morph').forEach(function(m) {
      m.attr({
        opacity: 0
      });
      var el = man.select('.' + m.attr('data-for'));
      if (!el.data('morphs')) {
        el.data('morphs', [el.attr('d')]);
      }
      el.data('morphs').push(m.attr('d'));
    });
    man.selectAll('.rc').forEach(function(m) {
      m.attr({
        opacity: 0
      });
      var el = man.select('.' + m.attr('data-for'));
      var bb = el.getBBox();
      var cx = +m.attr('cx');
      var cy = +m.attr('cy');
      el.data('obb', bb);
      el.data('rc', {
        cx: cx,
        ox: bb.x > cx ? bb.x - cx : cx - bb.x,
        cy: cy,
        oy: bb.y > cy ? bb.y - cy : cy - bb.y
      });
    });
    man.accessory = man.select('.accessory');
    man.accessory.attr({
      opacity: 0
    });
    man.suit = man.select('.suit');
    TweenMax.set(man.suit.node, {
      x: -173.5,
      y: -80,
      scaleX: 0.8,
      scaleY: 0.8,
      transformOrigin: 'center'
    });
    man.suit.attr({
      opacity: 0
    });
    man.rightleg = man.select('.rightleg');
    man.leftleg = man.select('.leftleg');
    man.leftfoot = man.select('.leftfoot');
    man.rightfoot = man.select('.rightfoot');
    man.leftarm = man.select('.leftarm');
    man.lefthand = man.select('.lefthand');
    man.rightarm = man.select('.rightarm');
    man.righthand = man.select('.righthand');
    man.body = man.select('.body');
    man.head = man.select('.head');

    var bb = man.select('.main').getBBox();
    man.bb = bb;
    var scale = opt.scale === undefined ? (bb.width / vbWidth) * 2 : opt.scale;
    TweenMax.set(man.node, {
      scale: scale
    });
    TweenMax.set(man.node, {
      x: opt.x === undefined ? centerStage - (bb.width * scale) / 2 : opt.x,
      y: opt.y === undefined ? vbHeight / 2 - bb.height * scale * 0.8 : opt.y
    });

    return man;
  };

  objects.makeSideman = objects.make.sideman = function sideMan(opt) {
    opt = opt || {};
    var sideman = objects.clone('#sideman');
    backstage.add(sideman);
    sideman.parts = sideman.node.querySelectorAll('*');
    sideman.selectAll('*').attr({
      fill: opt.color || '#444'
    });
    sideman.selectAll('.morph').forEach(function(m) {
      m.attr({
        opacity: 0
      });
      var el = sideman.select('.' + m.attr('data-for'));
      if (!el.data('morphs')) {
        el.data('morphs', [el.attr('d')]);
      }
      el.data('morphs').push(m.attr('d'));
    });
    sideman.selectAll('.rc').forEach(function(m) {
      m.attr({
        opacity: 0
      });
      var el = sideman.select('.' + m.attr('data-for'));
      var bb = el.getBBox();
      var cx = +m.attr('cx');
      var cy = +m.attr('cy');
      el.data('obb', bb);
      el.data('cx', cx);
      el.data('cy', cy);
      el.data('rc', {
        cx: cx,
        ox: bb.x > cx ? bb.x - cx : cx - bb.x,
        cy: cy,
        oy: bb.y > cy ? bb.y - cy : cy - bb.y
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
    var bb = sideman.getBBox();
    var scale = opt.scale === undefined ? (bb.width / vbWidth) * 2 : opt.scale;
    TweenMax.set(sideman.node, {
      scale: scale
    });
    TweenMax.set(sideman.node, {
      x: opt.x === undefined ? centerStage - (bb.width * scale) / 2 : opt.x,
      y: opt.y === undefined ? vbHeight / 2 - bb.height * scale * 0.8 : opt.y
    });

    return sideman;
  };

  objects.makeShadow = objects.make.shadow = function(el) {
    var bb = el.bb || el.getBBox();
    var scale = GreenProp.scaleX(el.node);
    var x = GreenProp.x(el.node) + bb.cx * scale;
    var y = GreenProp.y(el.node) + bb.y2 * scale;
    var shadow = backstage.ellipse(x, y - 10, bb.width * scale - 4, 10).attr({
      fill: '#222',
      opacity: 0.6,
      stroke: 'none'
    });
    return shadow;
  };

  objects.makeSwipeText = objects.make.swipText = function makeSwipeText() {
    var swiptext1 = backstage
      .text(centerStage, vbHeight - 200, 'Swipe to Learn')
      .attr({
        fill: 'white',
        'text-anchor': 'middle',
        'font-size': '45px',
        'font-family': "'Lato', Arial, sans-serif",
        'font-style': 'italic',
        'font-weight': '100'
      });
    var swiptext2 = backstage
      .text(centerStage, vbHeight - 150, 'About AIESEC')
      .attr({
        fill: 'white',
        'text-anchor': 'middle',
        'font-size': '50px',
        'font-family': "'Lato', Arial, sans-serif",
        display: 'block',
        'font-style': 'italic',
        'font-weight': '300'
      });

    function makeLine(x, y, x2, y2) {
      return backstage.path('M' + [x, y] + 'L' + [x2, y2]).attr({
        fill: 'none',
        stroke: '#fff',
        strokeWidth: 2
      });
    }

    var makeArrow = function makeArrow(x, y) {
      var line = backstage.path('M0 0L25 40L0 80').attr({
        fill: 'none',
        stroke: '#fff',
        strokeWidth: 2
      });
      var line2 = line.clone().transform('t20 0');
      var line3 = line.clone().transform('t40 0');
      var arrow = backstage.group(line, line2, line3);
      TweenMax.set(arrow.node, {
        x: x,
        y: y
      });
      return arrow;
    };
    var bbt = swiptext1.getBBox();
    var leftArrow = makeArrow(bbt.x - 80, vbHeight - 230);
    var rightArrow = makeArrow(bbt.x2 + 20, vbHeight - 230);
    var linewidth = 215;
    var swipX = centerStage - linewidth;
    var swipY = vbHeight - 240;
    var upperline = makeLine(swipX, swipY, centerStage + linewidth, swipY);
    var underline = makeLine(
      swipX,
      vbHeight - 140,
      centerStage + linewidth,
      vbHeight - 140
    );

    var swipeText = backstage.g(
      swiptext1,
      swiptext2,
      upperline,
      underline,
      leftArrow,
      rightArrow
    );
    swipeText.tween = tweens.sideYoyo(swipeText.node);
    return swipeText;
  };

  objects.make.map = function makeMap(opt) {
    opt = opt || {};
    var map = objects.clone('#map');
    map.europe = map.select('.europe');
    map.africa = map.select('.africa');
    map.north = map.select('.north');
    map.south = map.select('.south');
    map.attr({
      opacity: 0
    });
    map.locations = {};
    map.people = Snap.set();
    // map.implossionTween = tweens.worldExplode(map).reverse().pause();
    map.selectAll('.location').forEach(function(l) {
      var continent = l.parent();
      var location = (map.locations[l.attr('data-id')] = {});
      l.attr({
        opacity: 0
      });
      var rx = +l.attr('rx');
      var ry = +l.attr('ry');
      var cx = +l.attr('cx');
      var cy = +l.attr('cy');
      var p = objects.makeMan({
        scale: 0.035,
        x: cx + 13,
        y: cy - 5
      });
      map.people.push(p);
      location.group = continent.g();
      p.attr({
        opacity: 0
      });
      location.group.add(p);

      location.person = p;

      var puls = objects.make.puls(cx, cy, rx, ry);
      // continent.g(p.clone().attr({
      //     opacity: 1,
      // }));
      // puls.tween = tweens.puls(puls, 1.2);
      // puls.attr({fill: "#000"});
      puls.tween.repeat(-1).pause();
      location.group.add(puls);
      location.puls = puls;
      var bb = p.getBBox();
      var interactionArea = location.group
        .ellipse(
          cx,
          cy - bb.height * 0.035 * 0.5,
          bb.width * 0.035 * 1.2,
          bb.height * 0.035 * 1.2
        )
        .attr({
          fill: 'rgba(0,0,0,0)',
          class: 'pointer',
          cursor: 'pointer'
        });

      location.activate = function activate() {
        location.connected = false;
        puls.tween.play();
      };
      location.deactivate = function activate() {
        puls.tween.pause().seek(0);
      };

      var toggleAction =
        opt.toggleAction ||
        function toggleAction() {
          if (!location.connected) {
            var locationAction = function() {
              if (map.locationAction) {
                map.locationAction(location);
              } else {
                location.coonectTween = location.connect();
              }
            };
            location.connected = true;
            locationAction();
            location.deactivate();
          }
        };
      interactionArea.mousedown(toggleAction).touchstart(toggleAction);
    });

    map.connections = map.select('.connections');
    map.connections.attr({
      opacity: 0
    });
    map.connections.selectAll('g').forEach(function(con) {
      var pathFor = con.node.classList;
      var location = map.locations[pathFor[0]];
      var paths = [].map.call(con.selectAll('path'), function(p) {
        return p.attr('d');
      });
      var path = map.path(paths[0]).attr({
        stroke: '#2870E5',
        strokeWidth: 1,
        fill: 'none'
      });
      path.data('morphs', paths);
      location.pathOut = path;
      map.locations[pathFor[1]].pathIn = path;

      location.connect = function(noInteraction) {
        location.connected = true;
        map.activeLocations += 1;
        path.tl = tweens.sequence();
        path.tween = tweens.hangConnection(path, {
          onUpdate: function() {
            // if(!noInteraction) {
            //     if (map.connected) {
            //         path.tween.pause();
            //         path.tl.seek(3.20);
            //     }
            // }
          },
          callbackScope: path
        });
        path.tl
          .to(path.node, 0.5, {
            drawSVG: '100%'
          })
          .add(
            tweens
              .sequence({
                onComplete: function() {
                  // if (!map.connected || !noInteraction) {
                  //     if (map.activeLocations < map.activationThreshold) {
                  //         map.connectAll();
                  //     }
                  // }
                }
              })
              .to(path.node, 0.75, {
                morphSVG: paths[2],
                easeParams: [1, 0.5],
                ease: Power3.easeIn
              })
          )
          .add(path.tween)
          .call(function() {
            if (!map.connected) {
              path.tl.seek(1.25).play();
            }
          });
        // map.tween.add(path.tl, 'connect+='+map.activeLocations/10);
        // console.log("connecting "+map.activeLocations);
        // console.log(map.tween);
        return path.tl;
      };

      TweenMax.set(path.node, {
        drawSVG: 0
      });
    });

    map.activeLocations = 0;
    map.connected = false;
    map.activationThreshold = opt.activationThreshold || 3;
    map.locationAction = opt.locationAction;
    map.explossionTween = tweens.worldExplode(map);
    // map.explodTween.add();
    map.tween = tweens.sequence({
      onComplete: function() {
        if (!map.connected) {
          // window.dispatchEvent(
          //   new CustomEvent('scenes.youngpeople.timeline.add', {
          //     detail: [map.tween, 'youngpeople']
          //   })
          // );
          // window.dispatchEvent( new Event('timeline.play'));
          map.connected = true;
        }
      }
    });
    map.tween.add('connect');
    map.activationFunction = function() {
      if (opt.activationFunction) {
        opt.activationFunction();
      }
    };

    map.activateLocations = function activateLocations() {
      if (!map.connected) {
        window.dispatchEvent(new Event('timeline.pause'));
      }
      Object.keys(map.locations).forEach(function(loc) {
        map.locations[loc].activate();
      });
    };
    map.deactivateLocations = function activateLocations() {
      Object.keys(map.locations).forEach(function(loc) {
        map.locations[loc].deactivate();
      });
    };

    map.connectAll = function() {
      var seq = map.tween;
      map.eachLocations(function(loc, i) {
        if (!loc.connected) {
          map.activeLocations += 1;
          location.connected = true;
          seq.add(loc.connect(true), 'connect+=' + map.activeLocations / 50);
        } else {
          seq.add(loc.pathOut.tl, 'connect+=' + i / 10);
        }
      });
      // seq.call(function () {
      map.eachLocations(function(loc) {
        // loc.path.tween.paus();
        // console.log(loc);
        seq.to(
          loc.pathOut.node,
          1,
          {
            morphSVG: loc.pathOut.data('morphs')[4],
            easeParams: [1, 0.5],
            ease: Expo.easeIn
          },
          'complete'
        );
      });
      seq.add(tweens.pullWorld(map), 'complete');
      // }, 'complete-=1');
      seq.play();
      return seq;
    };

    map.eachLocations = function getLocations(fn) {
      return Object.keys(map.locations).map(function(loc) {
        return fn(map.locations[loc]);
      });
    };

    return map;
  };

  objects.make.qmark = function makeQMark() {
    var q = objects.clone('#qmark');
    return q;
  };

  objects.make.deathPillar = function deathPillar() {
    var death = s.rect(0, 0, 50, 500);
    TweenMax.set(death.node, {
      x: '+=100',
      y: '-=10'
    });
    return death;
  };

  objects.make.enviromentPillar = function enviromentPillar() {
    var enviroment = s.rect(0, 0, 50, 500);
    TweenMax.set(enviroment.node, {
      fill: '#e2e2e2',
      x: '-=90',
      y: '-=30'
    });
    return enviroment;
  };
  objects.make.povertyPillar = function povertyPillar() {
    var poverty = s.rect(0, 0, 50, 500);
    TweenMax.set(poverty.node, {
      fill: '#c4c4c4',
      x: '-=200',
      y: '-=65'
    });
    return poverty;
  };
  objects.make.illiteracyPillar = function illiteracyPillar() {
    var illiteracy = s.rect(0, 0, 50, 500);
    TweenMax.set(illiteracy.node, {
      fill: '#a2a2a2',
      x: '-=100',
      y: '-=125'
    });
    return illiteracy;
  };

  objects.makeReflectman = objects.make.reflectman = function makeReflectman(
    opt
  ) {
    opt = opt || {};
    var manreflect = objects.clone('#manreflect');
    manreflect.otherform = objects.clone('#manreflect2');
    manreflect.parts = manreflect.node.querySelectorAll('path');
    manreflect.otherform.parts = manreflect.otherform.node.querySelectorAll(
      'path'
    );

    var bb = manreflect.getBBox();
    manreflect.bb = bb;
    var scale = opt.scale === undefined ? (bb.width / vbWidth) * 2 : opt.scale;
    TweenMax.set(manreflect.node, {
      scale: scale
    });
    TweenMax.set(manreflect.node, {
      x: opt.x === undefined ? centerStage - (bb.width * scale) / 2 : opt.x,
      y: opt.y === undefined ? vbHeight / 2 - bb.height * scale * 0.8 : opt.y
    });
    return manreflect;
  };

  objects.makeHappyman = function makeHappyman() {
    var man = objects.clone('#happy-person');
    return man;
  };

  objects.makeColoredearth = objects.make.earth = function makeColoredearth() {
    var map = objects.clone('#colored-map');
    return map;
  };

  objects.make.mask = function(mask, objectToMask, objectToMaskTrasnform) {
    objectToMaskTrasnform = objectToMaskTrasnform || {};
    var maskgroup = backstage.g();
    if (objectToMask) {
      maskgroup.add(objectToMask);
      TweenMax.set(objectToMask.node, objectToMaskTrasnform);
    }
    maskgroup.attr({
      mask: mask
    });
    maskgroup.mask = mask;
    return maskgroup;
  };

  objects.make.mouse = function() {
    var mouse = objects.clone('#mouse');
    return mouse;
  };

  objects.makeRecallCircle = function makeRecallCircle(x, y, color, stroke) {
    var bg = backstage.circle(0, 0, 120);
    var mask = objects.make.mask(
      backstage.circle(0, 0, 120).attr({
        fill: 'white'
      })
    );
    var group = backstage.g(bg);
    group.maskGroup = mask;
    group.mask = mask.mask;
    bg.attr({
      fill: color,
      stroke: stroke || '#037EF3',
      'stroke-width': '3'
    });
    // TweenMax.set(mask.node, {
    //     x: x,
    //     y: y
    // });
    TweenMax.set(group.node, {
      x: x,
      y: y
    });
    return group;
  };

  objects.make.saveWorldSubScene = function makeSaveWorldSubScene(
    x,
    y,
    path,
    scene
  ) {
    var group = backstage.g();
    var saveMask2 = objects.make.mask(
      objects.backstage.circle(0, 0, vbWidth / 2).attr({
        fill: 'white'
      }),
      scene.scene,
      {
        x: -vbWidth / 2 - 300,
        y: -vbHeight / 2
      }
    );
    TweenMax.set(saveMask2.node, {
      scale: 1.2,
      transformOrigin: '50% 50%'
    });
    TweenMax.set(saveMask2.node, {
      x: x,
      y: y
    });
    group.add(saveMask2);
    var seq = tweens.sequence();
    seq.add(tweens.subtl(scene.timeline, 'solution').duration(4), 0);
    var path2 = group.path({
      path: path,
      stroke: 'rgba(45, 176, 147, 1)',
      fill: 'none',
      strokeWidth: 30
    });
    seq.fromTo(
      path2.node,
      0.5,
      {
        drawSVG: 0
      },
      {
        drawSVG: '100%'
      },
      0
    );
    group.timeline = seq;
    return group;
  };

  objects.make.svg = function(el) {
    var bb = el.getBBox();
    var svg = Snap()
      .add(el)
      .attr({
        preserveAspectRatio: 'xMidYMid meet',
        viewBox: [bb.x, bb.y, bb.width, bb.height].join(' ')
      });
    svg.htmlEl = el;
    return svg;
  };
})();
