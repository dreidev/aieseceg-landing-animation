var scenes = window.scenes || {};

scenes.students = function students(globals) {
    var $ = window.$;
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
    var vbHeight = globals.vbHeight;
    var vbWidth = globals.vbWidth;

    timeline.add('students', startLabel + '+=' + start);


    function displayElement(el, y) {
        return TweenMax.to(el, 0.3, {
            y: y
        });
    }

    var solution = scene.g(objects.make.element('solution'));
    var world = scene.g(objects.make.element('world'));
    var empower = scene.g(objects.make.element('empower'));
    var reflect = scene.g(objects.make.element('reflect'));
    var studentsContainer = $('.scene.students');
    var companiesContainer = $('.scene.companies');
    var contactContainer = $('.scene.contact');

    var globaltalent = objects.make.svg(objects.clone('#globaltalent'));
    $('.scene.students .action-call-left .action-icon').append(globaltalent.node);

    var globalcitizen = objects.make.svg(objects.clone('#globalcitizen'));
    $('.scene.students .action-call-right .action-icon').append(globalcitizen.node);

    var facebook = objects.clone('#facebook');
    var instagram = objects.clone('#instagram');
    var twitter = objects.clone('#twitter');
    var youtube = objects.clone('#youtube');

    var elements = [solution, world, empower, reflect];
    var social = [facebook, instagram, twitter, youtube];
    var man = objects.make.man();
    man.accessory.attr({
        opacity: 1
    });
    scene.add(elements);
    scene.add(social);
    scene.add(man);

    TweenMax.set([man.node], {
        opacity: 0,
        y: vbHeight * 2
    });
    TweenMax.set(elements.map(function(el) {
        return el.node;
    }), {
        opacity: 0,
        scale: 1.5,
        y: vbHeight * 2
    });
    social = social.map(function(el) {
        return el.node;
    });
    TweenMax.set(social, {
        opacity: 0,
        y: vbHeight * 2
    });
    TweenMax.set(social, {
        scale: 0.4,
        transformOrigin: 'center'
    });

    timeline.set([twitter.node], {
        x: 280,
        opacity: 1,
        cursor: 'pointer'
    }).set([instagram.node], {
        x: 380,
        opacity: 1,
        cursor: 'pointer'
    }).set([facebook.node], {
        x: 620,
        opacity: 1,
        cursor: 'pointer'
    }).set([youtube.node], {
        x: 730,
        opacity: 1,
        cursor: 'pointer'
    });


    timeline.set([reflect.node], {
            x: 442,
            opacity: 1
        })
        .set([empower.node], {
            x: 792,
            opacity: 1
        })
        .set([solution.node], {
            x: 701,
            opacity: 1
        })
        .set([world.node], {
            x: 335,
            opacity: 1
        }).set(man.node, {
            opacity: 1
        }, 0);

    var prevText = scene.lastText;
    var text = objects.make.multilineText(["LEARN HOW", "TO DEVELOP YOUR", "LEADERSHIP"], 50, objects.textStyle);
    text = scene.lastText = s.g(text);
    TweenMax.set(text.node, {
        x: vbWidth / 2
    });
    timeline.add(tweens.slideInOut(prevText, text, 250, Back.easeInOut, 0.5), 'students');

    timeline.to(studentsContainer, 0.5, {
        top: 0,
        ease: Back.easeOut
    });

    timeline.add([displayElement(solution.node, 433),
        displayElement(world.node, 535).delay(0.1),
        displayElement(empower.node, 535).delay(0.3),
        displayElement(reflect.node, 433).delay(0.2),
        displayElement(man.node, 433).delay(0.2)
    ], 0.1);

    timeline.add('companies', 'students+=2');

    timeline.to(man.accessory.node, 0.5, {
        y: -vbHeight * 3,
        ease: Back.easeIn
    }, 'companies').set(man.suit.node, {
        opacity: 1
    }).from(man.suit.node, 0.5, {
        y: '+=' + vbHeight * 3
    }, '-=0.5');

    prevText = scene.lastText;
    text = objects.make.multilineText(["CO-DEVELOP", "LEADERSHIP", "WITH US"], 50, objects.textStyle);
    text = scene.lastText = s.g(text);
    TweenMax.set(text.node, {
        x: vbWidth / 2
    });
    timeline.add(tweens.slideInOut(prevText, text, 300, Back.easeInOut, 0.5), 'companies');


    timeline.to(studentsContainer, 0.5, {
        top: '-100%',
        ease: Back.easeIn
    }, 'companies').to(companiesContainer, 0.5, {
        top: 0,
        ease: Back.easeOut
    });

    timeline.add('contact', 'companies+=2');


    prevText = scene.lastText;
    text = s.g();
    timeline.add(tweens.slideInOut(prevText, text, 300, Back.easeInOut, 0.5), 'contact');

    timeline.to(companiesContainer, 0.5, {
        top: '-100%',
        ease: Back.easeIn
    }, 'contact').to(contactContainer, 0.5, {
        top: 0,
        ease: Back.easeOut
    });
    TweenMax.set('.action-link', {
        top: '100%',
    });
    timeline.add([displayElement(solution.node, -433),
        displayElement(world.node, -535).delay(0.1),
        displayElement(empower.node, -535).delay(0.3),
        displayElement(reflect.node, -433).delay(0.2)
    ], 'contact');
    timeline.add([displayElement(twitter.node, 440),
        displayElement(instagram.node, 350).delay(0.1),
        displayElement(facebook.node, 350).delay(0.3),
        displayElement(youtube.node, 440).delay(0.2)
    ], 'contact');




    globals.startOffset = -1;

    return globals;
};
