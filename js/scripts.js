$(function () {

    'use strict';


    /**
     * ================================
     * PRELOADER                     
     * ================================
     */
    // makes sure the whole site is loaded
    $(window).on('load', function () {
        // will first fade out the loading animation
        $("#loader").fadeOut();
        //then background color will fade out slowly
        $("#loader-wrapper").delay(200).fadeOut("slow");

    });


    /*
     * ================================
     * Scrolling Animations                     
     * ================================
     */

    $('body').scrollspy({
        target: '.navbar',
        offset: 200
    })

    $('nav a').on('click', function (e) {
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 1500, 'easeInOutExpo');
        e.preventDefault();
    })



    var wow = new WOW({
        mobile: false
    });
    wow.init();



    /*
     * ================================
     * Book flipping animation Animations                     
     * ================================
     */

    function flipToBack() {
        bookContainer.scrollTop(
            scrollToBack.offset().top - bookContainer.offset().top + bookContainer.scrollTop());
    }

    function flipToFront() {
        bookContainer.scrollTop(0);
    }


    if ('html.no-preserve3d') {
        var bookContainer = $('#items'),
            scrollToFront = $('#front'),
            scrollToBack = $('#back');


        $('.flip-book').on('click', function () {
            $('#items').toggleClass('flip-to-back');
            if ($('#items').hasClass("flip-to-back")) {
                $('.flip').html('<i class="fa fa-exchange flip-icon"></i><span>flip-to-front</span>')
                flipToBack();
            } else {
                $('.flip').html('<i class="fa fa-exchange flip-icon"></i><span>flip-to-back</span>')
                flipToFront();
            }
        })

        $(window).resize(function () {
            if ($('#items').hasClass("flip-to-back")) {
                flipToBack();
            } else {
                flipToFront();
            }
        });




    } else {
        $('.flip-book').on('click', function () {
            $('#items').toggleClass('flip-to-back');
            if ($('#items').hasClass('flip-to-back')) {
                $('.flip').html('<i class="fa fa-exchange flip-icon"></i><span>flip-to-front</span>')
            } else {
                $('.flip').html('<i class="fa fa-exchange flip-icon"></i><span>flip-to-back</span>')
            }
        })
    }




    /*
     * ================================
     * Book hover animation                     
     * ================================
     */



    $('#items').hover(
        function () {
            $('#items').removeClass();
            $('#items').addClass('book-hover')
        },
        function () {
            $('#items').removeClass();
        }
    )


    /*
     * ================================
     * Look Inside hover animation                     
     * ================================
     */


    $('.look-inside').hover(
        function () {
            $('.front img').removeClass();
            $('.front img').addClass('look-inside-hover')
        },
        function () {
            $('.front img').removeClass();
            $('.front img').addClass('look-inside-hover-out')
        }
    )



    /*
     * ================================
     * Look Inside Click Animation                     
     * ================================
     */

    $('#inline-popups').magnificPopup({
        delegate: 'a',
        removalDelay: 500,
        callbacks: {
            beforeOpen: function () {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        midClick: true
    });



    /*
     * ================================
     * Enlarging Book Image                     
     * ================================
     */

    $('.popup').magnificPopup({
        type: 'image'
    });
    $('.enlarge').on('click',function () {
        if ($('#items').hasClass('flip-to-back')) {
            $('a.back-img').click();
        } else {
            $('a.front-img').click();
        }

    })




    /*
     * ================================
     * .listen/Audio Player                     
     * ================================
     */


    $('[data-toggle="popover"]').popover({
        container: 'body',
        html: true
    });

    var audio = new Audio();
    audio.src = "audios/1.mp3"

    $('#playpausebtn').on('click', function () {
        if (audio.paused) {
            audio.play();
            $('#playpausebtn').children("i").removeClass("fa-play-circle-o");
            $('#playpausebtn').children("i").addClass("fa-pause");
            $('#playpausebtn').children('span').text('playing..');
            //$('button.listen').popover('show');
        } else {
            audio.pause();
            $('#playpausebtn').children("i").removeClass("fa-pause");
            $('#playpausebtn').children("i").addClass("fa-play-circle-o");
            $('#playpausebtn').children('span').text('paused');
            $('button.listen').popover('hide');
        }
    })

    var audioEnd = audio.ended;

    if (audioEnd) {
        $('#playpausebtn').children("i").removeClass("fa-pause");
        $('#playpausebtn').children("i").addClass("fa-play-circle-o");
        $('#playpausebtn').children('span').text('Listen');
        $('a.listen').popover('hide');
    }

    audio.addEventListener('ended', function () {
        $('#playpausebtn').children("i").removeClass("fa-pause");
        $('#playpausebtn').children("i").addClass("fa-play-circle-o");
        $('#playpausebtn').children('span').text('Listen');
        $('button.listen').popover('hide');
    });



    /*
     * ================================
     * Video Player                     
     * ================================
     */


    $('.popup-vimeo').magnificPopup({
        type: 'iframe'
    });


    /*
     * ================================
     * Chapters Section Animation                     
     * ================================
     */

    $('.chapter').on('click', function () {
        $(this).toggleClass("flip-to-back")

    });


    /*
     * ================================
     * Gallery Section Image Popup                     
     * ================================
     */

    $('#grid-items').magnificPopup({
        delegate: 'a',
        type: 'image',
        removalDelay: 500,
        callbacks: {
            beforeOpen: function () {
                // just a hack that adds mfp-anim class to markup 
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true
    });



    /*
     * ================================
     * Free Chapter section Mailchimp Subscribe form                    
     * ================================
     */

    $("#mailchimp-subscribe").ajaxChimp({
        callback: mailchimpCallback,

        // Replace your mailchimp post url inside double quote "".  
        url: "http://github.us12.list-manage.com/subscribe/post?u=f882ab586d827f13fb5b356d0&amp;id=224d934820"

    });

    function mailchimpCallback(resp) {
        if (resp.result === 'success') {
            $('.form-1').addClass('animate-out');
            $('.form-2').addClass('animate-in');
            $('.form-2').removeAttr("style");

            $('.first-step').removeClass("active");
            $('.second-step').addClass("active");
            $('.subscription-success')
                .html('<i class="fa fa-check-circle"></i>' + "&nbsp;" + resp.msg)
                .delay(500)
                .fadeIn(1000);

            $('.subscription-failed').fadeOut(500);

        } else if (resp.result === 'error') {
            $('.form-wrapper').css({
                'padding-top': '80px'
            });
            $('p.subscription-failed').css({
                'background-color': '#cca300'
            });
            $('.subscription-failed')
                .html('<i class="fa fa-warning"></i>' + "&nbsp;" + resp.msg)
                .delay(500)
                .fadeIn(1000);

            $('.subscription-success').fadeOut(500);
        }
    };



});
