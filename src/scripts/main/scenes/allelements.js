var scenes = window.scenes || {};

scenes.allelements = function allelements(globals) {
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

    TweenMax.set(scene.node, {
        x: -350
    });

    timeline.add('start');

    var death = scene.death = scene.rect(-vbWidth * 3.6, -vbHeight * 7 - 150, 100, vbHeight * 8).attr({
        fill: '#fff'
    });

    var sideman = scene.sideman = objects.makeSideman({
        color: '#0079fa'
    });
    TweenMax.set(sideman.node, {
      y: vbHeight/2,
      x: vbWidth/2+150,
      scale:0.3,
      opacity:1,
    });  
    // var fallTween = ;
    timeline.add(tweens.subtl(tweens.otherPillarsFall(death, 88), 2.5), 'start');
    scene.add(sideman);
    var stick = objects.make.stick();
    scene.add(stick);

    timeline.add(tweens.pillar.seq(death),'start');
    timeline.add(tweens.lift(sideman),'start');
    timeline.add(tweens.pillar.seqs(death),'start+=2.5');
    timeline.add(tweens.lift2(sideman),'start+=2.5');

    timeline.add('solution');
    TweenMax.set(stick.node, {
        opacity: 0,
        x: (vbWidth / 2) + 440,
        y: (vbHeight / 2) - 50,
    });
    timeline.set(stick.node, {opacity:1}, 'solution');
    timeline.add(tweens.powerup(sideman), 'solution+=1');
    timeline.to(stick.node,0.2,{
        y:"-=55",
    },"solution+=1.4").to(stick.node,0.2,{
        rotation:"+=5"
    },"solution+=1.4");
    timeline.add(tweens.stick.fall(stick), 'solution+=1.6');
    timeline.add(tweens.pick(sideman), 'solution+=4');
    timeline.add(tweens.stick.pick(stick), 'solution+=5');
    
    timeline.add(tweens.stealth(sideman), 'solution+=5.5');


    timeline.to(death.node,0.5,{
        rotation:"-=0.3",
    },"solution+=1.3").to(death.node,0.5,{
        rotation:"+=0.1",
    },"solution+=6.5");

    timeline.add('empower');

    var speaker = objects.make.speaker();
    var helper = scene.helper = objects.makeSideman({color: '#fe8d1e'});
    var helper2 = scene.helper2 = objects.makeSideman({color: '#fe8d1e'});
    var helper3 = scene.helper3 = objects.makeSideman({color: '#fe8d1e'});
    var helper4 = scene.helper4 = objects.makeSideman({color: '#fe8d1e'});
    var helper5 = scene.helper5 = objects.makeSideman({color: '#fe8d1e'});

    scene.add(helper, helper2, helper3, helper3, helper4, helper5,speaker);

    TweenMax.set(helper.node, {
        x: vbWidth,
        y: vbHeight - 330,
        scale:0.3,
        opacity:0

    });     
   TweenMax.set(helper2.node, {
      x: vbWidth,
      y: vbHeight - 330,
      scale:0.3,
      opacity:0
    });     
   TweenMax.set(helper3.node, {
      x: vbWidth,
      y: vbHeight - 330,
      scale:0.3,
      opacity:0
    });     
   TweenMax.set(helper4.node, {
      x: vbWidth,
      y: vbHeight - 330,
      scale:0.3,
      opacity:0
    });     
    TweenMax.set(helper5.node, {
      x: vbWidth,
      y: vbHeight - 330,
      scale:0.3,
      opacity:0
    });     

    
    TweenMax.set(speaker.node,{
        y: vbHeight-300,
        rotation:-30,
        x: vbWidth-247,
        scale:0.6,
        // scaleX:-0.6,
        opacity:0
    });
    
    timeline.add(tweens.pocketdig(sideman, speaker),'empower');

    timeline.to(sideman.node,0.1,{
      scaleX:-0.3
    },'empower+=2.3');
    timeline.add(window.tweens.endlift(sideman),"empower+=4.5");

   
    timeline.to(helper.node,0.1,{
        // y: vbHeight,
        x:vbWidth+180,
        scale:0.3,
        opacity:1
    },"empower-=1");     
   timeline.to(helper2.node,0.1, {
      // y: vbHeight-180,
      x:vbWidth+180,
      scale:0.3,
      opacity:1
    },'empower-=1');     
   timeline.to(helper3.node,0.1, {
      // y: vbHeight-200,
      scale:0.3,
      x:vbWidth+180,
      opacity:1
    },'empower-=1');     
   timeline.to(helper4.node,0.1, {
      // y: vbHeight-280,
      scale:0.3,
      x:vbWidth+180,
      opacity:1
    },'empower-=1');     
    timeline.to(helper5.node,0.1, {
      // y: vbHeight-280,
      scale:0.3,
      x:vbWidth+180,
      opacity:1
    },'empower-=1');     
    // run test


    // helper, steps, desX, y
    timeline.add(tweens.run(helper, 7), 'empower+=3');
 
    timeline.add(tweens.run(helper2,7), 'empower+=3');
 
    timeline.add(tweens.run(helper3,7), 'empower+=3');
 
    timeline.add(tweens.run(helper4,7), 'empower+=3');
 
    timeline.add(tweens.run(helper5,7), 'empower+=3');
 

     timeline.to(helper.node,1.5,{
        x: vbWidth/2+280,
        ease: Power1.easeInOut
    },'empower+=3').to(helper2.node,1.5,{
        x: vbWidth/2+200,
        ease: Power1.easeInOut
    },'empower+=3').to(helper3.node,1.5,{
        x: vbWidth/2,
        ease: Power1.easeInOut
    },'empower+=3').to(helper4.node,1.5,{
        x: vbWidth/2-100,
        ease: Power1.easeInOut
    },'empower+=3').to(helper5.node,1.5,{
        x: vbWidth/2-300,
        y: "+=20",
        ease: Power1.easeInOut
    },'empower+=3');

    timeline.to(stick.node,0.2,{
      opacity:0
    },"empower+=3.2");
    
    timeline.add(tweens.helper1.lift(helper), 'empower+=4.5');
    timeline.add(tweens.helper2.lift(helper2), 'empower+=4.5');
    timeline.add(tweens.helper3.lift(helper3), 'empower+=4.5');
    timeline.add(tweens.helper4.lift(helper4), 'empower+=4.5');
    timeline.add(tweens.helper3.lift(helper5), 'empower+=4.5');
    timeline.add(tweens.pillar.seq2(death), 'empower+=5.5');
   

    timeline.add(tweens.YAY(helper), 'empower+=7.5');
    timeline.add(tweens.YAY(helper2), 'empower+=7.5');
    timeline.add(tweens.YAY(helper3), 'empower+=7.5');
    timeline.add(tweens.YAY(helper4), 'empower+=7.5');
    timeline.add(tweens.YAY(helper5), 'empower+=7.5');
    timeline.add(tweens.YAY(sideman), 'empower+=7.5');

    
    timeline.to(scene.node,0.4,{
        // scale:0.6,
    },"empower+=8.5").to(sideman.node,0.4,{
        x: -vbWidth*2,
        opacity:0
    },"empower+=8.5").to(helper5.node,0.4,{
        x: -vbWidth*2,
        opacity:0
    },"empower+=8.5").to(helper4.node,0.4,{
        x: -vbWidth*2,
        opacity:0
    },"empower+=8.5").to(helper2.node,0.4,{
        x: -vbWidth*2,
        opacity:0
    },"empower+=8.5").to(helper3.node,0.4,{
        x: -vbWidth*2,
        opacity:0
    },"empower+=8.5").to(helper.node,0.4,{
        x: -vbWidth*2,
        opacity:0
    },"empower+=8.5").to(stick.node,0.4,{
        opacity:0,
        x: -vbWidth*2
    },"empower+=8.5");


    return globals;
};
