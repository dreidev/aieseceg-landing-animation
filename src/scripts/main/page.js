(function() {
  var $ = window.$;

  var startAnimation = function() {
    window.animation.init();
  };
  $('#cssload-pgloading').hide();
  if (window.objects.ready) {
    startAnimation();
  } else {
    window.addEventListener('objects.loaded', startAnimation);
  }

  window.addEventListener('animation.started', function() {
    //to scroll to full screen
    $('html, body').animate(
      {
        scrollTop: $('#stage').offset().top
      },
      500
    );
  });

  // contact form
  $('.story-form').submit(function(ev) {
    ev.preventDefault();

    var $form = $(this);

    $.ajax({
      type: 'post',
      url: 'http://blog.aiesec.org.eg/contact/',
      // url: "http://localhost:8000/contact/",
      data: $(this).serialize(),
      success: function(response, status) {
        console.log(response);
        swal({
          title: response['text'],
          type: response['type'],
          text:
            "You can always can contact us on <a href='mailto:egypt@aiesec.net'>egypt@aiesec.net</a>",
          html: true
        });
      }
    });
  });
})();
