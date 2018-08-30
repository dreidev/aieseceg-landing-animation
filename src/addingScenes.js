import './scripts/main/scenes';
import './scripts/main/scenes/allelements';

var config = {
  startOffset: 0
};
var slide;
var timeline = window.timeline;

const startAddingScenes = async () => {
  var all = document.querySelectorAll('.timeline-btn');
  for (var i = 0, len = all.length; i < len; i++) {
    all[i].disabled = true;
  }
  await importBreakapart().then(async () => {
    await importYoungpeople();
    await importButhow();
    window.addEventListener('timeline.play', async () => {
      await importChoice();
      await importLeadership();
      await importSolution();
      await importEmpower();
      await importExperience();
      await importStudents();

      var all = document.querySelectorAll('.timeline-btn');
      for (var i = 0, len = all.length; i < len; i++) {
        all[i].disabled = false;
      }
    });
  });
};

const importScene = async scene => {
  await import(/* webpackPrefetch: true */ `./scripts/main/scenes/${scene}`);
};

const importBreakapart = async () => {
  await importScene('breakapart');

  var breakapart = scenes.addScene(scenes.breakapart, config);
  window.breakapart = breakapart;
  timeline.add(breakapart.timeline, 'start');
  config.useScene = breakapart.scene;
};

const importYoungpeople = async () => {
  await importScene('youngpeople');

  var youngpeople = scenes.addScene(scenes.youngpeople, config); // should be around 14 seconds in
  window.youngpeople = youngpeople;
  timeline.add(youngpeople.timeline, 'youngpeople');
  config.useScene = null;
};

const importButhow = async () => {
  await importScene('buthow');

  var buthow = scenes.addScene(scenes.buthow, config); // should be around 21 seconds in
  window.buthow = buthow;
  timeline.add(buthow.timeline, 'buthow');
  config.useScene = buthow.scene;
};

const importChoice = async () => {
  await importScene('choice');

  var choice = scenes.addScene(scenes.choice, config); // should be around 30 seconds in
  window.choice = choice;
  timeline.add(choice.timeline, 'choice');
  config.useScene = choice.scene;
};

const importLeadership = async () => {
  await importScene('leadership');

  var leadership = scenes.addScene(scenes.leadership, config); // should be around 40 seconds in
  window.leadership = leadership;
  timeline.add(leadership.timeline, 'leadership');
  config.useScene = leadership.scene;
};

const importSolution = async () => {
  await importScene('slide');
  await importScene('solutionoriented');

  var solution = scenes.addScene(scenes.solution, config); // should be around 50 seconds in
  window.solution = solution;
  timeline.add(solution.timeline, 'solution');

  config.useScene = null;
  config.params = {
    element: 'solution',
    sideman: solution.scene.sideman,
    startTime: timeline.getLabelTime('solution')
  };
  slide = scenes.addScene(scenes.slide, config);
  timeline.addCallback(slide.trigger, 'solution');

  config.useScene = solution.scene;
};

const importEmpower = async () => {
  await importScene('empowerothers');

  var empower = scenes.addScene(scenes.empower, config); // should be around 60 seconds in
  window.empower = empower;
  timeline.add(empower.timeline, 'empower');

  config.useScene = null;
  config.params = {
    element: 'empower',
    sideman: empower.scene.sideman,
    startTime: timeline.getLabelTime('empower')
  };
  slide = scenes.addScene(scenes.slide, config);
  timeline.addCallback(slide.trigger, 'empower');

  config.useScene = null;
  config.prevScene = empower.scene;

  await importScene('selfreflect');

  var reflect = scenes.addScene(scenes.reflect, config); // should be around 70 seconds in
  window.reflect = reflect;
  timeline.add(reflect.timeline, 'reflect');

  config.useScene = null;
  config.params = {
    element: 'reflect',
    sideman: empower.scene.sideman,
    startTime: timeline.getLabelTime('reflect')
  };
  slide = scenes.addScene(scenes.slide, config);
  timeline.addCallback(slide.trigger, 'reflect');

  config.prevScene = reflect.scene;

  await importScene('worldcitizen');

  var world = scenes.addScene(scenes.world, config); // should be around 80 seconds in
  window.world = world;
  timeline.add(world.timeline, 'world');

  config.useScene = null;
  config.params = {
    element: 'world',
    sideman: reflect.scene.man.otherform,
    startTime: timeline.getLabelTime('world')
  };
  slide = scenes.addScene(scenes.slide, config);
  timeline.addCallback(slide.trigger, 'world');

  config.prevScene = world.scene;
};

const importExperience = async () => {
  await importScene('throughexperience');

  var experience = scenes.addScene(scenes.experience, config); // should be around 90 seconds in
  window.experience = experience;
  timeline.add(experience.timeline, 'experience');
  config.useScene = experience.scene;
  config.prevScene = null;
  // this is a hack to fix some weired offset with the animation
  const t = timeline.time();
  timeline.progress(1, true);
  timeline.progress(t === 0 ? 0 : t / 100 + 0.01, true);
  // do not touch
};

const importStudents = async () => {
  await importScene('students');
  var students = scenes.addScene(scenes.students, config); // should be around 90 seconds in
  window.students = students;
  timeline.add(students.timeline, 'students');
};

export default startAddingScenes;
