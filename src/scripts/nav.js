$(document).ready(function() {
            var $container = $('div.container'),
                $triggerBttn = $('#trigger-overlay'),
                $overlay = $('div.overlay'),
                $closeBttn = $('.overlay button.overlay-close');

            function toggleOverlay() {
                if ($overlay.hasClass('open')) {
                    $overlay.removeClass('open');
                    $container.removeClass('overlay-open');
                } else {
                    $overlay.addClass('open');
                    $container.addClass('overlay-open');
                }
            }

            $triggerBttn.on('click', toggleOverlay);
            $closeBttn.on('click', toggleOverlay);



            $('nav #menu li.dropdown').hover(function() {
                $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
            }, function() {
                $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
            });
            })
