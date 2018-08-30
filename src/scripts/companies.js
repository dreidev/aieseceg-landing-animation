$(document).ready(function (event) {
  var waypoint = new Waypoint({
      element: document.getElementById('comp-section-4'),
      handler: function(direction) {
          $('#comp-section-4 .counter').each(function() {
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
  var waypoint = new Waypoint({
      element: document.getElementById('comp-section-5'),
      handler: function(direction) {
          $('#comp-section-5 .counter').each(function() {
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

  $('.image-slider-container').slick({
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
  });
  $('.partners-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    cssEase: 'linear',
  });

})

function commaSeparateNumber(val){
   while (/(\d+)(\d{3})/.test(val.toString())){
     val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
   }
   return val;
 }
