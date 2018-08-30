(function() {
  var scenes = (window.scenes = window.scenes || {});
  var $ = window.$;

  scenes.sceneGroups = [];

  var baseScene = {
    s: window.s,
    globalTimeline: window.timeline,
    objects: window.objects || {},
    tweens: window.tweens || {},
    startOffset: 0,
    startLable: '',
    vbWidth: window.vbWidth || 1200,
    vbHeight: window.vbHeight || 720,
    usesExternalScene: false,
    usesExternalTimeline: false,
    then: function then(sceneFn, config) {
      return sceneFn(config || this);
    }
  };

  /**
     * addScene takes the global parameters of the sence and calls the scene function, if no function is provided it returns a factory that can take a scene later on
The idea is that each scene is created and passed on to the next scene
also with this scenes can be recalled in isolation within varying groups and scopes with different dimenssions that should enable replayability
all scene files should add themselves to the senses objects that said if created on the fly the scene is added with it's function name as key
     * @param  {Object} globals     vbHeight: vbHeight, the assumed view box width
                                    vbWidth: vbWidth, the assumed view box height
                                    s: the snap object which all append too,
                                    backstage: backstage a hidden group where things can be intitalized probably useless to add,
                                    objects: where objects in scene come from originates from objects.js,
                                    tweens: where tweens come from originates from tweens.js,
                                    startOffset: default 0, time offset from previous scene
                                    startLabel: default 0, time offset from previous scene
                                    timeline: timeline
     * @param  {[type]} sceneFn the scene function to be called which adds the scene to the main timeline
     * @return {[type]}         globals for the next scene to follow useful for passing on objects and timing
     */
  scenes.addScene = function addScene(sceneFn, config) {
    var TimelineMax = window.TimelineMax;

    if (!sceneFn) {
      throw Error('scene constructor must be defined');
    }
    config = $.extend({}, config || {}, baseScene);
    config.objects = $.extend({}, sceneFn.objects || {}, config.objects);
    config.tweens = $.extend({}, sceneFn.tweens || {}, config.tweens);
    config.name = config.name || sceneFn.name;

    config.backstage = config.backstage || config.objects.backstage || config.s;
    config.prevScene =
      config.prevScene || scenes.sceneGroups[scenes.sceneGroups.length - 1];
    config.scene = config.s.g();
    config.timeline = new TimelineMax();
    if (config.useTimeline) {
      config.timeline = config.useTimeline;
      config.usesExternalTimeline = true;
    }
    if (config.useScene) {
      config.scene = config.useScene;
      config.usesExternalScene = true;
    } else {
      scenes.sceneGroups.push(config.scene);
    }

    // window.addEventListener('scenes.'+config.name+'.timeline.add', function (e, tl, time) {
    //     config.timeline.add(tl, time);
    // });

    if (sceneFn) {
      scenes[name || sceneFn.name] = sceneFn;
      var s = sceneFn(config);
      return s;
    } else {
      return function(fn) {
        return fn(config);
      };
    }
  };
})();
