/**
 * Created by robokassa on 12/09/15.
 */
(function ($) {
	$(function () {

        $("#SliderSingleM").slider({
            from         : 0,
            to           : 20000000,
            heterogeneity: ['0/0'],
            step         : 10000,
            onstatechange: function(){
            },
            callback     : slider_callback
        });

        // PRICE SLIDER
        var slider_callback = function(value){
            $.post('.', {
                action: 'Catalog.getItemsCount',
                rubric: $('.pricesearchtab.activetab').attr('rub'), //$('#search-rubric').val(),
                price : $("#SliderSingle").val()
            }, function(result){
                var text = '??????' + num_ending(result.count, '?,?,?') + ' ' + result.count + ' ?????' + num_ending(result.count, '?,?,??');
                text += ( $('.pricesearchtab.activetab').attr('rub') == 1 ) ? ' ???' : ' ???????'
                if(result.count > 0){
                    $('.zebraaftertoggle input').show();
                } else{
                    $('.zebraaftertoggle input').hide();
                }
                $('.zebraaftertoggle span').text(text);
            }, 'json');

        };

		var mainSl = $('.slide').bxSlider({
			mode: 'horizontal',
			controls: true,
			infiniteLoop: true,
			//auto: true,
			//pager: true,
			pagerActiveClass: 'active',
			pagerCustom: '#slmenu',
			pause: 10000,
			speed: 1000
		});

        // accordeon
        $('.item-card').on('click', '.category', function (e) {
            var parent = $(this).parents('.category');
            var ul = $(this).find('ul');

            $('.category').removeClass('sel');
            $(this, parent).addClass('sel');

            console.log(ul)
            ul.slideDown()
            //$(this, parent).hasClass('sel') ? ul.slideUp() : ul.slideDown();

            e.preventDefault('fast');
        });

		// footer cols height, in css file :1243.less, .foot_clear column-count
		var col = $('.foot_clear').find('.col-sm-4');

		$.each($(col), function (key, val) {
			var h = $(this).height()

			$(this).css('height', h);
		});

		// string $abstract
		$('#nav-toggle').click(function (e) {

            e.preventDefault();

            var wh = $(window).height();

			$('body').toggleClass('m-opened');
			$('.cap').find('ul').height(wh);
		});

		$('.centering').width('100%');

		//title
		$('.title').on('click', '.arrows', function () {
			var $title = $('.title');
			var $next = $(this).hasClass('next');
			var $text = $('.text');
			var $t = $(this);
			var $tsel = $t.parent().find('.sel');
			var ind = 0;

			if ($next) {
				if ($tsel.next('.text').Exists()) {
					$tsel.removeClass('sel').next().addClass('sel');

					$('.filter').stop(true).animate({
						backgroundPositionX: '-=335'
					});
				}
			} else {
				if ($tsel.prev('.text').Exists()) {
					$tsel.removeClass('sel').prev().addClass('sel');

					$('.filter').stop(true).animate({
						backgroundPositionX: '+=335'
					});
				}
			}
		});

		$('.item, .item-card .category:not(.accord)').on('click', function (e) {
			var t = $(this);
            var ul = t.find('ul');

			t.toggleClass('opened');
			ul.stop(true).slideToggle();

			e.preventDefault();
		});

		Navigator();
		browser_detect();

		//$temp shit
	});

	$.fn.Exists = function () {
		return this.length > 0
	}

	// browser detect
	function browser_detect() {
		navigator.sayswho = (function () {
			var navi = navigator.appName,
				ua = navigator.userAgent,
				tem,
				reMatch = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

			if (reMatch && (tem = ua.match(/version\/([\.\d]+)/i)) != null) {
				reMatch[2] = tem[1];
			}

			if (reMatch) {
				reMatch = [reMatch[1], reMatch[2]];
			} else {
				reMatch = [navi, '-?'];
			}

			// short code for ie8 detection
			var bversion = reMatch[1],
				compClass = bversion.split('.', 1),
				cC = compClass.toString();

			$('body').addClass(reMatch[0]).addClass(cC);
		})();
	}

	/*
	 Changing class of body
	 depending on - platform, devices and screen resolution
	 for example <body class="desctop windows" />*/
	switch (!!navigator.platform.match) {
		case '/linux/i':
			$('body').addClass('linux');
			break;
		case '/win/i':
			$('body').addClass('windows');
			break;
		case '/iphone/i':
			$('body').addClass('iphone ios');
			break;
		case '/ipad/i':
			$('body').addClass('ipad ios');
			break;

			break;
	}

	function Navigator() {
		if (!!navigator.platform.match(/linux/i)) {
			$('body').addClass('linux');
		} else if (!!navigator.platform.match(/win/i)) {
			$('body').addClass('windows');
		} else if (!!navigator.platform.match(/iphone/i)) {
			$('body').addClass('iphone ios');
		} else if (!!navigator.platform.match(/ipad/i)) {
			$('body').addClass('ipad ios');
		}

		var windowWidth = parseInt($(window).width(), 10);
		if (windowWidth > 1000) {
			$('body').addClass('desktop');
		} else if (windowWidth > 758) {
			$('body').addClass('tablet');
		} else {
			$('body').addClass('phone');
		}
	}

})(jQuery);