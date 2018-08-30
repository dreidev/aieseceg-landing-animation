(function () {
    var TimelineMax = window.TimelineMax;
    var TweenMax = window.TweenMax;
    var objects = window.objects;
    var vbWidth = window.vbWidth;
    var vbHeight = window.vbHeight;
    var tweens = window.tweens;
    var timeline = window.timeline;
    var s = window.s; // svg element
    var sideman = objects.makeSideman();

    s.rect(0,0,vbWidth, vbHeight).attr({fill:'none', stroke:'#fff', lineWidth:10});


    TweenMax.set(sideman.node, {
        scale: 0.6
    });

    var x = vbWidth/3, y = vbHeight/3;
    var x2 = vbWidth/2, y2 = vbHeight/2 + 100;
    var start = s.circle(x, y, 10).attr({fill:'rgba(255, 255, 255, 0.5)', stroke:'#fff', lineWidth:20});
    var end = s.circle(x2, y2, 10).attr({fill:'rgba(255, 255, 255, 0.5)', stroke:'#fff', lineWidth:20});

    start.click(function () {
        var p = objects.makePuls(this.attr('cx'), this.attr('cy'), this.attr('r'));
        p.tween.call(function () {
            console.log('yoyo');
            p.remove();
        }).play();

        throwRope(x,y, x2, y2);
    });
    end.click(function () {
        throwRope(x2, y2, x, y);
    });

    // var pathShapes = [
    //     "M 0.5, 56.5 L 292.3, 2.5",
    //     "M1.7,47.7c0,0,56.8-51.4,75.7-44.6s9.5,22,9.5,22",
    //     "M1.8,90.9 c0,0,124.3-136.5,158.1-70.3 c0,63.5-39.2,41-39.2,41",
    //     "M1.1,114.4c0,0,167.6-83.8,208.1-95.9s59.5-24.3,90.5-8.1s31.1,29.7,27,41.9c-4.1,12.2-39.2,21.6-39.2,21.6",
    //     "M1.2,32c0,0,120.3,68.9,189.2,67.6c68.9-1.4,85.1-21.6,94.6-33.8C294.5,53.7,316.6,1,316.6,1"
    // ];
    var pathShapes = [
        "M0,2.5h382",
        "M2.1,4.8c0,0,185.1-286.5,382.4,0",
        "M2.4,1.8c0,0,65.7,316.7,382.4,0",
        "M2,1.5c0,0,286.5,363.4,382.4,0",
    ];

    function toAnchorPoints (arr) {
        arr.map(function (a, i) {
            var next, prev, anc = {};
            if(arr.length!==i+1) {
                next = arr[i+1];
            }
            if(0!==i) {
                prev = arr[i-1];
            }
            anc.type = a[0];
            switch(anc.type) {
                case 'M':
                    anc.x = a[1];
                    anc.y = a[2];
                break;
                case 'L':
                    anc.type = 'C';
                    anc.x = a[1];
                    anc.y = a[2];
                    anc.x1 = prev[prev.length-2];
                    anc.y1 = prev[prev.length-1];
                    anc.x2 = next[1];
                    anc.y2 = next[2];
                break;
                case 'C':
                    anc.x = a[3];
                    anc.y = a[4];
                    anc.x1 = a[1];
                    anc.y1 = a[2];
                    anc.x1 = a[1];
                    anc.y1 = a[2];
                break;
                case 'Z':
                break;
            }
            return obj;
        });

    }

    function throwRope (x, y, x2, y2){
        var path = s.path([['M', x, y], ['L', x2/2, y2/2], ['L', x2, y2]]);
        var len = path.getTotalLength();
        var half1 = Snap.parsePathString(path.getSubpath(0, len/2));
        var half2 =  Snap.parsePathString(path.getSubpath(len/2, len));
        var newpath = half1.concat(half2.slice(1));
        path.attr({d: newpath});
        debugger;
        path.attr({fill:'rgba(255, 255, 255, 0.5)', stroke:'#fff', strokeWidth:4});

        // TweenMax.to(,1,{
        //   y:0,
        //   y1:0, // bezier control point
        //   // updating using GSAP`s onUpdate and onComplete to keep it synchronized
        //   onUpdate:updatePath,
        //   onComplete:updatePath
        // });

        function updatePath(){
          // converts the points array back to svg path string
          path.attr('d',newpath.encode());
        }

    }

    var path = s.path(pathShapes[1]).attr({fill:'none', stroke:'#fff', strokeWidth:4});
    TweenMax.set(path.node, {
        x: 300,
        y: 300
    });
    // var tl = tweens.puls(sideman);
    timeline.add(tweens.sequence().to(path.node, 0.75, {
        morphSVG: pathShapes[3],
        easeParams:[1,0.5],
        ease: Power3.easeIn
    }).to(path.node, 0.5, {
        morphSVG: pathShapes[2],
        easeParams:[1,0.5],
        ease: Elastic.none
    }, '-=0').to(path.node, 0.5, {
        morphSVG: pathShapes[3],
        easeParams:[1,0.5],
        ease: Elastic.none
    }, '-=0').to(path.node, 1, {
        morphSVG: pathShapes[0],
        easeParams:[1,0.5],
        ease: Elastic.easeOut
    }, '-=0'), 0);
    // timeline.add(pl.tween.repeat(3), 1);

    timeline.seek(2);
    timeline.play();
})();
