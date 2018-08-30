$(document).ready(function (event) {
  var waypoint = new Waypoint({
      element: document.getElementById('ngo-section-4'),
      handler: function(direction) {
          $('#ngo-section-4 .counter').each(function() {
              $(this).prop('Counter', 0).animate({
                  Counter: $(this).text()
              }, {
                  duration: 2000,
                  easing: 'swing',
                  step: function(now) {
                      $(this).text(commaSeparateNumber(Math.round(now)));
                  }
              });
          });
          // var demo = new CountUp("counter", 0, 2702, 0, 2.5, options);
          // demo.start();
          this.destroy();

      },
      offset: '75%'
  });

});

function commaSeparateNumber(val){
   while (/(\d+)(\d{3})/.test(val.toString())){
     val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
   }
   return val;
 }
