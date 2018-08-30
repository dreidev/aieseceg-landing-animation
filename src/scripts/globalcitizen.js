window.onload = function() {
    var ballShootTime;

    var tl = new TimelineMax({});

    var ballShootTl = new TimelineMax({
        onComplete: ballShootCompleteHandler
    });

    var moveLeftLegBack = new TimelineMax({
        onComplete: powerUpCompleteHandler
    });
    var stepBacktl = new TimelineMax({});




    var $man = $('#kickingman');
    var $leg = $('#upper-leg-man');
    var a = document.getElementById("kickingman");
    var svgDoc = a.contentDocument;
    var rightLeg = svgDoc.getElementById("rightleg");
    var leftLeg = svgDoc.getElementById("leftleg");
    var rightFoot = svgDoc.getElementById("rightfoot");
    var leftFoot = svgDoc.getElementById("leftfoot");
    var arm = svgDoc.getElementById("arm");
    var head = svgDoc.getElementById("head");
    var body = svgDoc.getElementById("body");

    var centerPoints = svgDoc.getElementsByClassName("rc");

    var armcx, armcy, leftlegcx, leftlegcy, rightlegcx, rightlegcy, leftfootcx, leftfootcy, rightfootcx, rightfootcy;
    for (i = 0; i < centerPoints.length; i++) {
        switch (centerPoints[i].getAttribute("data-for")) {
            case "arm":
                armcx = centerPoints[i].getAttribute("cx");
                armcy = centerPoints[i].getAttribute("cy");
                break;
            case "leftleg":
                leftlegcx = centerPoints[i].getAttribute("cx");
                leftlegcy = centerPoints[i].getAttribute("cy");
                break;
            case "leftfoot":
                leftfootcx = centerPoints[i].getAttribute("cx");
                leftfootcy = centerPoints[i].getAttribute("cy");
                break;
            case "rightleg":
                rightlegcx = centerPoints[i].getAttribute("cx");
                rightlegcy = centerPoints[i].getAttribute("cy");
                break;
            case "rightfoot":
                rightfootcx = centerPoints[i].getAttribute("cx");
                rightfootcy = centerPoints[i].getAttribute("cy");
                break;
        }
    }

    var $ball = $('#gc-section-1-ball');
    var $rect = $('#section-1-rect');
    var $rect1 = $('#section-1-rect1');
    var $rect2 = $('#section-1-rect2');
    var $rect3 = $('#section-1-rect3');
    var $rect4 = $('#section-1-rect4');
    var $rect5 = $('#section-1-rect5');


    var $shortKickAlert = $('#short-kick-alert');
    var $sectionText = $('.section-text');
    var $sectionTextHelper = $('#section-text-helper');


    ////////////////////////////// get distance of blocks///////////////////////
    var div1rect = $rect[0].getBoundingClientRect();
    var div2rect = $ball[0].getBoundingClientRect();

    // get div1's center point
    var div1x = div1rect.left + div1rect.width / 2;
    var div1y = div1rect.top + div1rect.height / 2;

    // get div2's center point
    var div2x = div2rect.left + div2rect.width / 2;
    var div2y = div2rect.top + div2rect.height / 2;

    // calculate the distance using the Pythagorean Theorem (a^2 + b^2 = c^2)
    var distanceSquared = Math.pow(div1x - div2x, 2) + Math.pow(div1y - div2y, 2);
    var distanceLast = Math.sqrt(distanceSquared);


    ////////////////////////second dist///////////////////////////
    div1rect = $rect5[0].getBoundingClientRect();
    div2rect = $ball[0].getBoundingClientRect();

    // get div1's center point
    div1x = div1rect.left + div1rect.width / 2;
    div1y = div1rect.top + div1rect.height / 2;

    // get div2's center point
    div2x = div2rect.left + div2rect.width / 2;
    div2y = div2rect.top + div2rect.height / 2;

    // calculate the distance using the Pythagorean Theorem (a^2 + b^2 = c^2)
    distanceSquared = Math.pow(div1x - div2x, 2) + Math.pow(div1y - div2y, 2);
    var distanceFirst = Math.sqrt(distanceSquared);


    /////////////////////////////////////////////////////////////////////////////


    var tweenUpperLeg = TweenMax.to(rightLeg, 0.8, {
        rotation: "+=55",
        svgOrigin: rightlegcx + ' ' + rightlegcy

    });

    var tweenArm = TweenMax.to(arm, 0.8, {
        rotation: "+=35",
        svgOrigin: armcx + ' ' + armcy

    });

    var tweenLowerLeg = TweenMax.to(rightFoot, 0.4, {
        rotation: "+=80",
        svgOrigin: rightfootcx + ' ' + rightfootcy
    });

    var upperLegShoot = TweenMax.to(rightLeg, 0.3, {
        rotation: -15,
        svgOrigin: rightlegcx + ' ' + rightlegcy

    });

    var armShoot = TweenMax.to(arm, 0.3, {
        rotation: -10,
        svgOrigin: armcx + ' ' + armcy

    });

    var lowerLegShoot = TweenMax.to(rightFoot, 0.2, {
        rotation: -10,
        svgOrigin: rightfootcx + ' ' + rightfootcy
    });


    var upperLegBack = TweenMax.to(rightLeg, 0.3, {
        rotation: 0,
        svgOrigin: rightlegcx + ' ' + rightlegcy

    });

    var armBack = TweenMax.to(arm, 0.3, {
        rotation: 0,
        svgOrigin: armcx + ' ' + armcy

    });

    var lowerLegBack = TweenMax.to(rightFoot, 0.2, {
        rotation: 0,
        svgOrigin: rightfootcx + ' ' + rightfootcy
    });

    var ballJump = TweenMax.to($ball, 0.4, {
        y: -200,
        ease: Back.easeOut
    });
    var ballTranslate = TweenMax.to($ball, 0.4, {
        left: distanceLast + 40
    });

    var ballFall = TweenMax.to($ball, 0.7, {
        y: 0,
        ease: Bounce.easeOut
    });
    var ballTranslateBack = TweenMax.to($ball, 1, {
        left: '92px'
    });

    var rectRotRight = TweenMax.to($rect, 0.4, {
        rotation: "20",
        transformOrigin: "right bottom"
    });
    var rectRotRightBack = TweenMax.to($rect, 0.2, {
        rotation: "0",
        transformOrigin: "right bottom",
        smoothOrigin: true

    });
    var rectRotLeft = TweenMax.to($rect, 0.2, {
        rotation: "-10",
        transformOrigin: "left bottom",
        smoothOrigin: true
    });
    var rectRotLeftBack = TweenMax.to($rect, 0.1, {
        rotation: "0",
        transformOrigin: "left bottom"
    });

    var moveLeftFootBack = TweenMax.to(leftFoot, 0.2, {
        rotation: "+=20",
        svgOrigin: leftfootcx + ' ' + leftfootcy
    });
    var moveLeftThiBack = TweenMax.to(leftLeg, 0.4, {
        rotation: "+=20",
        svgOrigin: leftlegcx + ' ' + leftlegcy
    });
    var moveManBack = TweenMax.to(a, 0.5, {
        x: -15,
        ease: Power1.easeIn
    });
    var keepRightLeg = TweenMax.to(rightLeg, 0.3, {
        rotation: "-=20",
        svgOrigin: rightlegcx + ' ' + rightlegcy

    });
    var keepRightLegBack = TweenMax.to(rightLeg, 0.3, {
        rotation: "+=20",
        svgOrigin: rightlegcx + ' ' + rightlegcy

    });
    var bendRightFoot = TweenMax.to(rightFoot, 0.2, {
        rotation: "-=20",
        svgOrigin: rightfootcx + ' ' + rightfootcy
    });
    var unbendRightFoot = TweenMax.to(rightFoot, 0.1, {
        rotation: "+=20",
        svgOrigin: rightfootcx + ' ' + rightfootcy
    });
    var moveLeftThiTo = TweenMax.to(leftLeg, 0.5, {
        rotation: "-=20",
        svgOrigin: leftlegcx + ' ' + leftlegcy
    });
    var moveLeftFootTo = TweenMax.to(leftFoot, 0.4, {
        rotation: "-=20",
        svgOrigin: leftfootcx + ' ' + leftfootcy
    });
    var moveLeftFootForward = TweenMax.to(leftFoot, 0.3, {
        rotation: "+=30",
        svgOrigin: leftfootcx + ' ' + leftfootcy
    });
    var moveLeftThiForward = TweenMax.to(leftLeg, 0.3, {
        rotation: "-=30",
        svgOrigin: leftlegcx + ' ' + leftlegcy

    });
    var moveManForw = TweenMax.to(a, 0.3, {
        x: 10
    });
    var moveManUp = TweenMax.to(a, 0.15, {
        y: -5,
        ease: Back.easeIn
    });
    var moveManDown = TweenMax.to(a, 0.15, {
        y: 0,
        delay: 0.15
    });

    var moveManForw2 = TweenMax.to(a, 0.3, {
        x: "+=12"
    });
    var moveLeftFootForward2 = TweenMax.to(leftFoot, 0.3, {
        rotation: 10,
        svgOrigin: leftfootcx + ' ' + leftfootcy
    });
    var moveLeftThiForward2 = TweenMax.to(leftLeg, 0.3, {
        rotation: -10,
        svgOrigin: leftlegcx + ' ' + leftlegcy
    });

    var moveManBack2 = TweenMax.to(a, 0.5, {
        x: 0,
        ease: Power1.easeIn
    });
    var moveLeftFootBack2 = TweenMax.to(leftFoot, 0.2, {
        rotation: 20,
        svgOrigin: leftfootcx + ' ' + leftfootcy
    });
    var moveLeftThiBack2 = TweenMax.to(leftLeg, 0.4, {
        rotation: 20,
        svgOrigin: leftlegcx + ' ' + leftlegcy
    });
    var keepRightLeg2 = TweenMax.to(rightLeg, 0.3, {
        rotation: "-=20",
        svgOrigin: rightlegcx + ' ' + rightlegcy

    });
    var keepRightLegBack2 = TweenMax.to(rightLeg, 0.3, {
        rotation: "+=20",
        svgOrigin: rightlegcx + ' ' + rightlegcy

    });
    var bendRightFoot2 = TweenMax.to(rightFoot, 0.2, {
        rotation: "-=20",
        svgOrigin: rightfootcx + ' ' + rightfootcy
    });
    var unbendRightFoot2 = TweenMax.to(rightFoot, 0.1, {
        rotation: "+=20",
        svgOrigin: rightfootcx + ' ' + rightfootcy
    });
    var moveLeftThiTo2 = TweenMax.to(leftLeg, 0.5, {
        rotation: 0,
        svgOrigin: leftlegcx + ' ' + leftlegcy
    });
    var moveLeftFootTo2 = TweenMax.to(leftFoot, 0.4, {
        rotation: 0,
        svgOrigin: leftfootcx + ' ' + leftfootcy
    });

    moveLeftLegBack.add([moveLeftFootBack]);
    moveLeftLegBack.add([moveLeftThiBack]);
    moveLeftLegBack.add([moveManBack, moveLeftFootTo, moveLeftThiTo, keepRightLeg]);
    moveLeftLegBack.add([keepRightLegBack, bendRightFoot], "-=0.2");
    moveLeftLegBack.add([unbendRightFoot], "-=0.4");
    // moveLeftLegBack.add([moveManForw, moveLeftThiForward, moveLeftFootForward, moveManUp, moveManDown]);

    tl.add(moveLeftLegBack);
    tl.add([moveManForw, moveLeftThiForward, moveLeftFootForward, moveManUp, moveManDown]);
    tl.add([tweenUpperLeg, tweenLowerLeg, tweenArm], "-=0.3");
    tl.add([moveLeftThiForward2, moveLeftFootForward2, moveManForw2], "-=0.5");

    stepBacktl.add([moveLeftFootBack2]);
    stepBacktl.add([moveLeftThiBack2]);
    stepBacktl.add([moveManBack2, moveLeftFootTo2, moveLeftThiTo2, keepRightLeg2]);
    stepBacktl.add([keepRightLegBack2, bendRightFoot2], "-=0.2");
    stepBacktl.add([unbendRightFoot2], "-=0.4");


    ballShootTl.add([upperLegShoot, armShoot, lowerLegShoot]);
    ballShootTl.add([ballJump, ballTranslate], "-=0.1");
    ballShootTl.add([upperLegBack, armBack, lowerLegBack, ballFall, ballTranslateBack, rectRotRight]);
    ballShootTl.add([rectRotRightBack], "-=0.4");
    ballShootTl.add(stepBacktl, "-=1")
    ballShootTl.add([rectRotLeft], "-=0.8");
    ballShootTl.add([rectRotLeftBack], "-=0.6");

    tl.stop();
    ballShootTl.stop();

    //////////////////////////////////////for second animation //////////////////////////////


    var $enables = $('#enables');
    var $enablesimg = $('#enables-img');
    var $text1 = $('#volunteer');
    var $img1 = $('#volunteer-img');
    var $text2 = $('#empower');
    var $img2 = $('#empower-img');
    var $text3 = $('#comfort');
    var $img3 = $('#comfort-img');
    var $text4 = $('#work');
    var $img4 = $('#work-img');
    var $text5 = $('#develop');
    var $img5 = $('#develop-img');



    var textAnim = new TimelineMax({
        onComplete: textAnimCompleteHandler

    });

    var blockFall = new TimelineMax({
        // onComplete: blockFallCompleteHandler
    });

    var enablesImgAnim = TweenMax.fromTo($enablesimg, 0.7, {
        y: -300
    }, {
        visibility: "visible",
        y: 0,
        ease: Power4.easeOut
    });

    var enablesAnim = TweenMax.fromTo($enables, 0.7, {
        scale: 4
    }, {
        visibility: "visible",
        scale: 1,
        ease: Bounce.easeOut
    });


    var volunteerAnim = TweenMax.fromTo($text1, 0.7, {
        x: -600
    }, {
        display: "inline-block",
        x: 0,
        ease: Back.easeOut

    });
    var volunteerImgAnim = TweenMax.fromTo($img1, 0.5, {
        y: -300
    }, {
        visibility: "visible",
        y: 0,
        ease: Back.easeOut

    });

    var undisplay1 = TweenMax.to($text1, 0.7, {
        display: "none",
        x: 1000,
        ease: Back.easeOut

    });

    var dropBar5 = TweenMax.fromTo($rect5, 0.7, {
        y: -600
    }, {
        visibility: "visible",
        y: 0,
        ease: Bounce.easeOut
    });

    var anim2 = TweenMax.fromTo($text2, 0.7, {
        x: -600
    }, {
        display: "inline-block",
        x: 0,
        ease: Back.easeOut

    });
    var imgAnim2 = TweenMax.fromTo($img2, 0.5, {
        y: -300
    }, {
        visibility: "visible",
        y: 0,
        ease: Back.easeOut

    });

    var undisplay2 = TweenMax.to($text2, 0.7, {
        display: "none",
        x: 1000,
        ease: Back.easeOut

    });

    var dropBar4 = TweenMax.fromTo($rect4, 0.7, {
        y: -600
    }, {
        visibility: "visible",
        y: 0,
        ease: Bounce.easeOut
    });

    var anim3 = TweenMax.fromTo($text3, 0.7, {
        x: -600
    }, {
        display: "inline-block",
        x: 0,
        ease: Back.easeOut

    });
    var imgAnim3 = TweenMax.fromTo($img3, 0.5, {
        y: -300
    }, {
        visibility: "visible",
        y: 0,
        ease: Back.easeOut

    });

    var undisplay3 = TweenMax.to($text3, 0.7, {
        display: "none",
        x: 1000,
        ease: Back.easeOut

    });

    var dropBar3 = TweenMax.fromTo($rect3, 0.7, {
        y: -600
    }, {
        visibility: "visible",
        y: 0,
        ease: Bounce.easeOut
    });
    var anim4 = TweenMax.fromTo($text4, 0.7, {
        x: -600
    }, {
        display: "inline-block",
        x: 0,
        ease: Back.easeOut

    });
    var imgAnim4 = TweenMax.fromTo($img4, 0.5, {
        y: -300
    }, {
        visibility: "visible",
        y: 0,
        ease: Back.easeOut

    });

    var undisplay4 = TweenMax.to($text4, 0.7, {
        display: "none",
        x: 1000,
        ease: Back.easeOut

    });

    var dropBar2 = TweenMax.fromTo($rect2, 0.7, {
        y: -600
    }, {
        visibility: "visible",
        y: 0,
        ease: Bounce.easeOut
    });
    var anim5 = TweenMax.fromTo($text5, 0.7, {
        x: -600
    }, {
        display: "inline-block",
        x: 0,
        ease: Back.easeOut

    });
    var imgAnim5 = TweenMax.fromTo($img5, 0.5, {
        y: -300
    }, {
        visibility: "visible",
        y: 0,
        ease: Back.easeOut

    });

    var undisplay5 = TweenMax.to($text5, 0.7, {
        display: "none",
        x: 1000,
        ease: Back.easeOut

    });

    var dropBar1 = TweenMax.fromTo($rect1, 0.7, {
        y: -600
    }, {
        visibility: "visible",
        y: 0,
        ease: Bounce.easeOut
    });



    textAnim.add([enablesImgAnim]);
    textAnim.add([enablesAnim]);
    textAnim.add([volunteerAnim], "+=0.5");
    textAnim.add([dropBar5], "+= 0.2");
    textAnim.add([volunteerImgAnim], "+= 0.1");
    textAnim.add([undisplay1], "+= 0.2");
    textAnim.add([anim2], "+=0.2");
    textAnim.add([dropBar4], "+= 0.2");
    textAnim.add([imgAnim2], "+= 0.1");
    textAnim.add([undisplay2], "+= 0.2");
    textAnim.add([anim3], "+=0.2");
    textAnim.add([dropBar3], "+= 0.2");
    textAnim.add([imgAnim3], "+= 0.1");
    textAnim.add([undisplay3], "+= 0.2");
    textAnim.add([anim4], "+=0.2");
    textAnim.add([dropBar2], "+= 0.2");
    textAnim.add([imgAnim4], "+= 0.1");
    textAnim.add([undisplay4], "+= 0.2");
    textAnim.add([anim5], "+=0.2");
    textAnim.add([dropBar1], "+= 0.2");
    textAnim.add([imgAnim5], "+= 0.1");
    textAnim.add([undisplay5], "+= 0.2");

    textAnim.stop();

    var upperLegShoot1 = TweenMax.to(rightLeg, 0.3, {
        rotation: -15,
        svgOrigin: rightlegcx + ' ' + rightlegcy

    });

    var armShoot1 = TweenMax.to(arm, 0.3, {
        rotation: -10,
        svgOrigin: armcx + ' ' + armcy

    });

    var lowerLegShoot1 = TweenMax.to(rightFoot, 0.2, {
        rotation: -10,
        svgOrigin: rightfootcx + ' ' + rightfootcy
    });


    var upperLegBack1 = TweenMax.to(rightLeg, 0.3, {
        rotation: 0,
        svgOrigin: rightlegcx + ' ' + rightlegcy

    });

    var armBack1 = TweenMax.to(arm, 0.3, {
        rotation: 0,
        svgOrigin: armcx + ' ' + armcy

    });

    var lowerLegBack1 = TweenMax.to(rightFoot, 0.2, {
        rotation: 0,
        svgOrigin: rightfootcx + ' ' + rightfootcy
    });

    var ballJump1 = TweenMax.to($ball, 0.2, {
        y: -150,
        ease: Power2.easeOut
    });
    var ballTranslate1 = TweenMax.to($ball, 0.2, {
        left: distanceFirst + 50
    });

    var ballFall1 = TweenMax.to($ball, 0.7, {
        y: 0,
        ease: Bounce.easeOut
    });
    var ballTranslateBack1 = TweenMax.to($ball, 1, {
        left: '-100px'
    });
    var rectRotRight1 = TweenMax.to($rect5, 0.6, {
        rotation: "66",
        transformOrigin: "right bottom",
        ease: Expo.easeIn

    });
    var rectRotRight2 = TweenMax.to($rect4, 0.5, {
        rotation: "64",
        transformOrigin: "right bottom",
    });
    var rectRotRight3 = TweenMax.to($rect3, 0.4, {
        rotation: "64",
        transformOrigin: "right bottom",
    });
    var rectRotRight4 = TweenMax.to($rect2, 0.4, {
        rotation: "63",
        transformOrigin: "right bottom",
    });
    var rectRotRight5 = TweenMax.to($rect1, 0.4, {
        rotation: "62",
        transformOrigin: "right bottom",
    });
    var rectRotRight6 = TweenMax.to($rect, 0.6, {
        rotation: "90",
        transformOrigin: "right bottom",
    });
    blockFall.add([upperLegShoot1, armShoot1, lowerLegShoot1]);
    blockFall.add([ballJump1, ballTranslate1], "-=0.1");
    blockFall.add([upperLegBack1, armBack1, lowerLegBack1, ballFall1, ballTranslateBack1, rectRotRight1]);
    blockFall.add(rectRotRight2, "-=0.5");
    blockFall.add(rectRotRight3, "-=0.4");
    blockFall.add(rectRotRight4, "-=0.35");
    blockFall.add(rectRotRight5, "-=0.35");
    blockFall.add(rectRotRight6, "-=0.35");


    blockFall.stop();
    /////////////////////////////////////////////////////////////////////////////////////////

    var hasEnded = true;
    var start, end;
    var diff;
    var powerUpEnded = false;
    var counter = 0;
    var finishedAnim = false;
    $('#gc-section-1').mousedown(function() {
            if (hasEnded && !finishedAnim) {
                start = +new Date();
                // tl.timeScale(0.5);
                tl.restart();
                $sectionText.hide('fast');
                $sectionTextHelper.hide('fast');

                $shortKickAlert.hide('fast');
            }

        })
        .mouseup(function() {
            if (hasEnded && !finishedAnim) {
                if (powerUpEnded) {
                    counter++;
                    console.log("dakhal", counter);

                    if (counter == 4) {
                        finishedAnim = true;
                        tl.stop();
                        //textAnim.timeScale(3);
                        textAnim.restart();

                    } else {
                        end = +new Date();
                        diff = end - start;
                        console.log("el diff", diff);
                        ballShootTime = diff;
                        if (ballShootTime > 2400) {
                            ballShootTime = 2400;
                        }
                        ballShootTime = ballShootTime / 1000;
                        console.log(ballShootTime - 0.6);
                        ballShootTl.timeScale(ballShootTime - 0.6);
                        tl.stop();
                        ballShootTl.restart();
                        hasEnded = false;
                        powerUpEnded = false;
                    }
                } else {
                    tl.stop();
                    $shortKickAlert.show('fast');
                }

            }
        });

    function ballShootCompleteHandler() {
        hasEnded = true;
        $sectionText.show('fast');
        $sectionTextHelper.show('fast');
    }

    function textAnimCompleteHandler() {
        // blockFall.timeScale(0.2);
        blockFall.restart();
    }


    function powerUpCompleteHandler() {
        powerUpEnded = true;
    }


    /////////////////////////////For scrolling to first animation from choose cause////////////////////////
    var $firstAnimation = $("#gc-sections");
    $(".cause-btn").click(function() {
        $firstAnimation.css("height", "auto");
        $firstAnimation.css("visibility", "visible");
        var source = "";
        var cases = $(this).attr("value");
        console.log(cases);
        switch (cases) {
            case "Education":
                console.log("sad");
                source = "img/globalCitizen/education.svg"
                break;
            case "Culture":
                source = "img/globalCitizen/culture 1.svg"
                break;
            case "Health":
                source = "img/globalCitizen/health.svg"
                break;
            case "Environment":
                source = "img/globalCitizen/environment.svg"
                break;
            case "Social Entrepreneurship":
                source = "img/globalCitizen/social ent.svg"
                break;
        }
        document.getElementById("cause-img").src = source;
        $('html, body').animate({
            scrollTop: $firstAnimation.offset().top
        }, 1000);
    });

        var waypoint1 = new Waypoint({
        element: document.getElementById('section-4'),
        handler: function(direction) {
            $('#section-4 .counter').each(function() {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function(now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            this.destroy();

        },
        offset: '75%'



    });

}
