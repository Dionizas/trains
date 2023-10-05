


      var onloadCallback = function() {
        grecaptcha.render('issukis', {
          'sitekey' : '6LcpbEcjAAAAAIYBHtr-euqF6tA_TPV5lIHylQOk'
        });
      };






// traukinio greitis px/s
var greitis = 130;
var parasteR = 5;
var parasteL = 5;
var kartojamPo = 1;


function getKelias() {
    var kelias = $('.atvirukas').width();
    return kelias;
}
function getSastatas() {
    var sastatas = $('#traukinys').width();
    return sastatas;
}
function getStotele() {
    var stotele = $('#traukinys').css('left');
    return parseInt(stotele);
}
function getTrukme(a) {
    var trukme = a / greitis;
    return Math.round(trukme*1000);
}
$.fn.toggleLights = function() {
    if ($(this).hasClass('go-stop')) {
        $('.bi-pirmyn-on').hide();
        $('.bi-pirmyn-off').show();
        $('.bi-stop-on').show();
        $('.bi-stop-off').hide();
    }
    if ($(this).hasClass('go-pirmyn')) {
        $('.bi-pirmyn-on').show();
        $('.bi-pirmyn-off').hide();
        $('.bi-stop-on').hide();
        $('.bi-stop-off').show();
    }
    return this;
}
function riedamPirmyn(resetTime=false) {

    if (!$('#traukinys').hasClass('go-pirmyn')) {
        var kelias = getKelias();
        var sastatas = getSastatas();
        var stotele = getStotele();

        var iveikta = kelias - stotele;
        var atstumas = kelias + sastatas - iveikta;
        var tikslas = (sastatas+parasteL)*-1;

        playAudio(resetTime);

        $("#traukinys").removeClass('go-stop').addClass('go-pirmyn').toggleLights().animate({left: tikslas+'px'}, getTrukme(atstumas), function() {
            $(this).css('left', (getKelias()+parasteR) + 'px').removeClass('go-pirmyn').addClass('go-stop').toggleLights();
            setTimeout(riedamPirmyn, kartojamPo);
        });
    }
}
function riedamStop () {
    if (!$('#traukinys').hasClass('go-stop')) {
        pauseAudio();

        $("#traukinys").stop().removeClass('go-pirmyn').addClass('go-stop').toggleLights();

    }
}


var xtrain = document.getElementById("traukinysGarsas");

function playAudio(resetTime=false) {
    if (resetTime) { xtrain.currentTime = 0; }
    xtrain.play();
}

function pauseAudio() {
    xtrain.pause();
}
function toggleMute() {
    xtrain.muted = !xtrain.muted;
    if (xtrain.muted) {
        $('.bi-volume-up-fill').hide();
        $('.bi-volume-mute-fill').show();
    } else {
        $('.bi-volume-up-fill').show();
        $('.bi-volume-mute-fill').hide();
    }
 }



$(document).ready(function() {

    $("#traukinys").draggable({
        axis: "x",
        delay: 100,
        start: function(event, ui) {
            pauseAudio();
            $(this).stop().removeClass('go-pirmyn').addClass('go-stop').toggleLights();
        }
    });



    $("#startYourEngines").on("click", function() {
        riedamPirmyn(true);
    });
    $("#stopYourEngines").on("click", function() {
        riedamStop();
    });
    $("#toggleYourEngines").on("click", function() {
        toggleMute();
    });
    $('#exampleModal').on('shown.bs.modal', function(){
        riedamStop();
    })


    $(window).resize(function() {
        $(".debug-size").html($(window).width() + "x" + $(window).height());

        if ($(window).height() > 1440) {
            $(".min-vh-100").css("cssText", "min-height: 1440px !important");
        } else {
            $(".min-vh-100").css("cssText", "");
        }
    });


    $('#traukinys').css('left', (getKelias()+parasteR) + 'px');

    $(window).resize();

    $('#pradedamKelione').on('click', function() {
        riedamPirmyn();
        goAdorSnow('', 1000, '', false, false, false, 0.25, 0.5, 0.1);
        $('#theStartPage').remove();
    });




    $('body').on('click', 'a.langas', function (e) {
        e.preventDefault();
        riedamStop();
        modal = $('#proweb-modal');

        modal.find('.modal-title').html($(this).attr('title'));
        url = $(this).attr('href');

        modal.find('.modal-body').load(url, function () {
            modal.modal('show');
        });

    });




    $("body").on("click", "#doAddKomentaras", function(event) {
        event.preventDefault();

        var form = $('#addKomentaras');
        var url = form.attr('data-url');


        $.ajax({
            type: 'POST',
            url: url,
            data: form.find(':input').serialize(),
            success: function(data) {
                if (data == 'error') {
                    console.log('eroras');
                } else {
                    form.parent().find('.formReply').html(data);
                    form.find(':input.clean-after').val('');
                }
            },
            error: function(data) {
                console.log(data);

            }
        });
    });


    $("body").on("click", ".proweb-lnk-x3", function(event) {
        event.preventDefault();
        var url = $(this).attr('href');
        $(this).parent().load(url, function () {});
    });


});






