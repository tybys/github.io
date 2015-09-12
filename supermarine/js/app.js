/**
 * Created by robokassa on 12/09/15.
 */
(function ($) {
	$(function () {
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