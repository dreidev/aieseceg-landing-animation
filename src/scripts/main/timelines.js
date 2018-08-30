

    window.tweens.peopleConnect = function peopleConnect(map) {
        var path2 = map.select("#connection_3_");
        var path1 = map.select("#connection_2_");
        var people = map.select("#people_1");
        var newpath = path1.attr('d');
        var person1 = people.select("#p1_4_");
        var person2 = people.select("#p2_4_");
        var person3 = people.select("#p3_4_");
        var person4 = people.select("#p4_4_");
        var person5 = people.select("#p5_6_");
        var person6 = people.select("#p6_3_");
        var person7 = people.select("#p7_2_");

        return (new TimelineMax()).to(people.node, 1, {
            opacity: 1
        }, 0).to(path2.node, 3, {
            strokeDashoffset: 0
        }, 1).to(path2.node, 1, {
            d: newpath
        }, 4).to(person1.node, 1, {
            x: "-=40",
            y: "-=120"
        }, 4).to(person2.node, 1, {
            x: "-=55",
            y: "-=145"
        }, 4).to(person3.node, 1, {
            x: "+=35",
            y: "-=15"
        }, 4).to(person4.node, 1, {
            x: "+=45",
            y: "-=10"
        }, 4).to(person5.node, 1, {
            x: "+=92",
            y: "-=50"
        }, 4).to(person6.node, 1, {
            x: "+=92",
            y: "-=90"
        }, 4).to(person7.node, 1, {
            x: "-=87",
            y: "+=43"
        }, 4);
    };

    window.tweens.worldConnect = function worldConnect(t1) {
        return t1.reverse();
    };
    var q = window.objects.q;
    s.add(q);

    window.tweens.why = function why(map, q) {
        return (new TimelineMax()).to(map.node, 1, {
            scaleX: 0.2,
            scaleY: 0.2,
            y: "+=400",
            x: "+=200"
        }, 0).to(q.node, 1, {
            opacity: 1,
            y: "+=200"
        }, 0).to(map.node, 1, {
            y: "-=1000"
        }, 1).to(q.node, 1, {
            y: "-=1000"
        }, 1);
    };

    var young_people = window.objects.young_people;
    var young_person2 = window.objects.young_person2;
    var young_person3 = window.objects.young_person3;
    s.add(young_people);

    window.tweens.young_people = function young_people(young_people) {
        return (new TimelineMax()).to(young_people.node, 1, {
            y: "-=300",
            opacity: 1
        }, 0).to(young_person2.node, 1, {
            x: "+=800"
        }, 0).to(young_person3.node, 1, {
            x: "-=800"
        }, 0).to(young_person2.node, 1, {
            x: "+=100"
        }, 1).to(young_person3.node, 1, {
            x: "-=100"
        }, 1).to(young_people.node, 0.5, {
            opacity: 0
        }, 1.3);
    };

    var key_hole = window.objects.key_hole;
    s.add(key_hole);
    
    window.tweens.key = function key(man) {
        return (new TimelineMax()).to(man.node, 1, {
            opacity: 1,
            scaleX: 1,
            scaleY: 1
        }, 0);
    };