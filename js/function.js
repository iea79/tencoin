/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

    checkOnResize();

    // Menu in Header
    $('.js-navbar a').on('click', function() {
        $this = $(this);

        if( !$this.hasClass('active') ) {
            $('.js-navbar a').removeClass('active');
        }

        $this.toggleClass('active');
    });



    // Language dropdown in Header
    $('.js-language__toggle').on('click', function() {
        var language = $('.language__menu');

        language.toggleClass('open');
    });
    $('.language__menu_item').on('click', function() {
        var $this = $(this),
            text = $('.js-language__toggle').text();

        if( !$this.hasClass('active') ) {
            $('.language__menu_item').removeClass('active');
        }

        if( text == "En" ) {
            text.text("Ru");
        } else {
            text.text("En");
        }

        $this.toggleClass('active');
        $('.language__menu').removeClass('open');
    });


    // Mobile menu
    $('.js__navbar-toggle').on('click', function(e) {
        e.preventDefault();
        var $this = $(this),
            navbar = $('.js-navbar');

        $this.toggleClass('open');
        navbar.toggleClass('open');
    });


    // Slick slider http://kenwheeler.github.io/slick/
    $('.js-slider__home, .js-slider__news').slick({
        arrows: false,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }
        ]
    });
    $('.js-slider__prev').on('click', function() {
        $('.js-slider__home').slick('slickPrev');
     });

     $('.js-slider__next').on('click', function() {
        $('.js-slider__home').slick('slickNext');
     });
     $('.js-slider__news_prev').on('click', function() {
        $('.js-slider__news').slick('slickPrev');
     });

     $('.js-slider__news_next').on('click', function() {
        $('.js-slider__news').slick('slickNext');
     });

     // Location slider - Career page / Tab Location
     $('.js__location__slider').slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        prevArrow: $('.js-location__prev'),
        nextArrow: $('.js-location__next'),
        responsive: [
        {
            breakpoint: 768,
            settings: {
                dots: false
            }
        }
        ]
     });

     // Jobs Collapse
    $('.js_jobs__collapse').on('click', function(e) {
        e.preventDefault();
        var $this = $(this),
            jobId = $this.attr('href');

        if( !$this.hasClass('active') ) {
            $('.js_jobs__content').removeClass('open');
            $('.js_jobs__collapse').removeClass('active');
        }


        $this.toggleClass('active');
        $(jobId).toggleClass('open');
    });

    $('input, textarea').on('blur', function() {
        
        if($(this).val()!=='') {
            $(this).addClass('fullField').removeClass('emptyField');
        } else {
            $(this).addClass('emptyField').removeClass('fullField');
        }
    });

    
});

function circleAnim(el) {
    $(el).each(function(i) {
        var percent = $(this).data('percent')
        $(this).circliful({
            animationStep: 5,
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 2,
            // fillColor: '#f2f2f2' ,
            foregroundColor: '#0366e9',
            backgroundColor: '#f2f2f2',
            fontColor: '#fff',
            pointSize: 0,
            percent: percent
       });
    });
}

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (TempApp.resized == windowWidth) { return; }
    TempApp.resized = windowWidth;

	checkOnResize();

});

function checkOnResize() {
    fontResize();
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

function fontResize() {
    var windowWidth = $(window).width();
    if (windowWidth >= 1200) {
    	var fontSize = windowWidth/19.05;
    } else if (windowWidth < 1200) {
    	var fontSize = 100;
    }
	$('body').css('fontSize', fontSize + '%');
}

// Печать текста 
// Добавить typed__wrap к обертке текста
function animatedText() {
    $('.typed__wrap').each(function(i, el) {
        $(el).addClass('typed__'+i);
        $('.typed__'+i).viewportChecker({
            callbackFunction: function(elem){
                animatedTextStart('.typed__'+i);
            }
        })
    });
};

function animatedTextStart(elem) {
    var elClass = elem;
    var str = $(elClass).text();
    $(elClass).empty();
    var typed = new Typed(elClass, {
            strings: [str],
            typeSpeed: 60,
            showCursor: true,
            startDelay: 600,
            onStringTyped: function() {
                $('.typed-cursor').hide();
            },
    });
};

$(window).on('load', function() {
    loader();
});

function loader() {
    var loader = $('.loader');


    if (loader.hasClass('loader__home')) {
        setTimeout(function() {
            $('.loader__name').addClass('loader__name_show');
        }, 500);
        setTimeout(function() {
            loaderHide();
        }, 1300);
    } else {
        loaderHide();
    }

    function loaderHide() {
        loader.addClass('loader__hide');
        setTimeout(function() {
            loader.remove();
            animatedText();
            circleAnim('.hiring__circle');
        }, 300);
    }
}

// Видео youtube для страницы
$(function () {
    if ($(".js_youtube")) {
        $(".js_youtube").each(function () {
            // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
            $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

            // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
            $(this).append($('<img src="img/play.svg" alt="Play" class="video__play">'));

        });

        $('.video__play, .video__prev').on('click', function () {
            // создаем iframe со включенной опцией autoplay
            var videoId = $(this).closest('.js_youtube').attr('id');
            var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";
            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
                'width': $(this).width(),
                'height': $(this).innerHeight()
            })

            // Заменяем миниатюру HTML5 плеером с YouTube
            $(this).closest('.video__wrapper').append(iframe);

        });
    }

});


// Деление чисел на разряды Например из строки 10000 получаем 10 000
// Использование: thousandSeparator(1000) или используем переменную.
// function thousandSeparator(str) {
//     var parts = (str + '').split('.'),
//         main = parts[0],
//         len = main.length,
//         output = '',
//         i = len - 1;
    
//     while(i >= 0) {
//         output = main.charAt(i) + output;
//         if ((len - i) % 3 === 0 && i > 0) {
//             output = ' ' + output;
//         }
//         --i;
//     }

//     if (parts.length > 1) {
//         output += '.' + parts[1];
//     }
//     return output;
// };


// Хак для яндекс карт втавленных через iframe
// Страуктура:
//<div class="map__wrap" id="map-wrap">
//  <iframe style="pointer-events: none;" src="https://yandex.ru/map-widget/v1/-/CBqXzGXSOB" width="1083" height="707" frameborder="0" allowfullscreen="true"></iframe>
//</div>
// Обязательное свойство в style которое и переключет скрипт
// document.addEventListener('click', function(e) {
//     var map = document.querySelector('#map-wrap iframe')
//     if(e.target.id === 'map-wrap') {
//         map.style.pointerEvents = 'all'
//     } else {
//         map.style.pointerEvents = 'none'
//     }
// })

// Простая проверка форм на заполненность и отправка аяксом
// function formSubmit() {
//     $("[type=submit]").on('click', function (e){ 
//         e.preventDefault();
//         var form = $(this).closest('.form');
//         var url = form.attr('action');
//         var form_data = form.serialize();
//         var field = form.find('[required]');
//         // console.log(form_data);

//         empty = 0;

//         field.each(function() {
//             if ($(this).val() == "") {
//                 $(this).addClass('invalid');
//                 // return false;
//                 empty++;
//             } else {
//                 $(this).removeClass('invalid');
//                 $(this).addClass('valid');
//             }  
//         });

//         // console.log(empty);

//         if (empty > 0) {
//             return false;
//         } else {        
//             $.ajax({
//                 url: url,
//                 type: "POST",
//                 dataType: "html",
//                 data: form_data,
//                 success: function (response) {
//                     // $('#success').modal('show');
//                     // console.log('success');
//                     console.log(response);
//                     // console.log(data);
//                     // document.location.href = "success.html";
//                 },
//                 error: function (response) {
//                     // $('#success').modal('show');
//                     // console.log('error');
//                     console.log(response);
//                 }
//             });
//         }

//     });

//     $('[required]').on('blur', function() {
//         if ($(this).val() != '') {
//             $(this).removeClass('invalid');
//         }
//     });

//     $('.form__privacy input').on('change', function(event) {
//         event.preventDefault();
//         var btn = $(this).closest('.form').find('.btn');
//         if ($(this).prop('checked')) {
//             btn.removeAttr('disabled');
//             // console.log('checked');
//         } else {
//             btn.attr('disabled', true);
//         }
//     });
// }


