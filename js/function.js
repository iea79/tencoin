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

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	// $('#main__menu a[href^="#"]').click( function(){ 
	// 	var scroll_el = $(this).attr('href'); 
	// 	if ($(scroll_el).length != 0) {
	// 	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	// 	}
	// 	return false;
	// });

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('#header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('#header').addClass('stiky');
    //             } else {
    //                     $('#header').removeClass('stiky');
    //             }
    //     });
    // });

    // Inputmask.js
    // $('[name=tel]').inputmask("+9(999)999 99 99",{ showMaskOnHover: false });
    // formSubmit();
    
   	// gridMatch();

    checkOnResize();


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
            // navH = $('.js-navbar').innerHeight();



        // if(!$this.hasClass('open')) {
        //     $('.js-navbar').slideUp(1000);
        //     $('.js__navbar-toggle').removeClass('open');
        // }

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
            breakpoint: 767,
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
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        responsive: [
        {
            breakpoint: 767,
            settings: {
                dots: false
            }
        }
        ]
     });
     $('.js-location__prev').on('click', function() {
        $('.js__location__slider').slick('slickPrev');
     });

     $('.js-location__next').on('click', function() {
        $('.js__location__slider').slick('slickNext');
     });


     // Jobs Collapse
    $('.js_jobs__collapse').on('click', function(e) {
        e.preventDefault();
        var $this = $(this),
            jobId = $this.attr('href');

        if( !$this.hasClass('active') ) {
            $('.js_jobs__content').slideUp();
            $('.js_jobs__collapse').removeClass('active');
        }

        $this.toggleClass('active');
        $(jobId).slideToggle(200);
    });



});

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (TempApp.resized == windowWidth) { return; }
    TempApp.resized = windowWidth;

	checkOnResize();

});

function checkOnResize() {
   	// gridMatch();
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


