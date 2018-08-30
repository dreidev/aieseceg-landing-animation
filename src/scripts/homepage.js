$(document).ready(function() {
    var options = {  
        useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
    };
    var waypoint = new Waypoint({
        element: document.getElementById('section-3'),
        handler: function(direction) {
            $('#section-3 .counter').each(function() {
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
            // var demo = new CountUp("counter", 0, 2702, 0, 2.5, options);
            // demo.start();
            this.destroy();

        },
        offset: '75%'



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

    var waypoint2 = new Waypoint({
        element: document.getElementById('section-6'),
        handler: function(direction) {
            $('#section-6 .counter').each(function() {
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



    })

})
