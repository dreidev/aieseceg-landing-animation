if (window.innerWidth < 800) {
    if (window.innerWidth < window.innerHeight) {
        $("#stage").height(window.innerHeight / 2);

        $(".progressjs-progress").css({
            "position": "fixed",
            "top": "50%"
        });

    } else {
        $("#stage").height(window.innerHeight);
        $(".progressjs-progress").css({
            "position": "fixed",
            "top": "83.5%"
        });
        $(".white-circle ").css({
            "top": "-7.5%",
        });
        $(".timeline-ctrl").css({
            "top": "87.5%"
        });

    }
} else {
    $("#stage").height(window.innerHeight);
    $(".progressjs-progress").css({
        "position": "fixed",
        "top": "94.5%"
    });
}
$(document).ready(function() {

    $(window).resize(function() {
        if (window.innerWidth < 800) {
            if (window.innerWidth < window.innerHeight) {
                $("#stage").height(window.innerHeight / 2);

                $(".progressjs-progress").css({
                    "position": "fixed",
                    "top": "50%"
                });
                $(".timeline-ctrl").css({
                    "top":"50%"
                });

            } else {
                $("#stage").height(window.innerHeight);
                $(".progressjs-progress").css({
                    "position": "fixed",
                    "top": "83.5%"
                });
                $(".white-circle ").css({
                    "top": "-7.5%"
                });
            }
        } else {
            $("#stage").height(window.innerHeight);
            $(".progressjs-progress").css({
                "position": "fixed",
                "top": "94.5%"
            });
        }
    });
});
