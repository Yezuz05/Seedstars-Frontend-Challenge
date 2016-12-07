$(function() {
    $('#menu').on('click', function(){
        var delay = setTimeout(dothis, 350)
        function dothis(){
            if($('.ui-panel-wrapper').hasClass( "ui-panel-page-content-open" )){
            $('.ui-panel-wrapper').css('opacity', '0.5')
        }
        else {
            $('.ui-panel-wrapper').css('opacity', '1.0')
        }
        }
        
    })
   
    $('li').children().css('color', '#8d52ba');
    $('.ui-panel-inner').css('padding', '0px');
    $('*').css({ 'text-shadow': 'none' });
    $('p, #myCarousel, .carousel-inner, .ui-header, .head').css({ 'border-color': '#9759C6' })
    $('#menu').removeClass('ui-link ui-btn-left ui-btn ui-shadow ui-corner-all')
    $('.carousel').carousel({
        pause: true,
        interval: false
    });

    $(".carousel").swipe({

        swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

            if (direction == 'left') $(this).carousel('next');
            if (direction == 'right') $(this).carousel('prev');

        },
        allowPageScroll: "vertical"

    });
})