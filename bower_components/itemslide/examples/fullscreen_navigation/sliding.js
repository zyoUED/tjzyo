$(document).ready(function () {

    $("ul").itemslide({
        one_item: true //Set this for proper full screen navigation
    }); //initialize itemslide

    $(window).resize(function () {
        $("ul").reload();

    }); //Recalculate width and center positions and sizes when window is resized
});
