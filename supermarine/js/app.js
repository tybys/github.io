/**
 * Created by robokassa on 12/09/15.
 */
(function ($) {
	$(function () {
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

		// footer cols height, in css file :1243.less, .foot_clear column-count
		var col = $('.foot_clear').find('.col-sm-4');

		$.each($(col), function (key, val) {
			var h = $(this).height()

			$(this).css('height', h);
		});

		// string $abstract

		$('#nav-toggle').click(function () {
			$('body').toggleClass('m-opened');

			var wh = $(window).height();

			$('.cap').find('ul').height(wh);
		});

		$('.centering').width('auto');

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

		$('.item, .item-card .category').on('click', function (e) {
			var t = $(this);

			t.toggleClass('opened');
			t.find('ul').stop(true).slideToggle();

			e.preventDefault();
		});

		//$temp shit
	});

	$.fn.Exists = function () {
		return this.length > 0
	}
})(jQuery);