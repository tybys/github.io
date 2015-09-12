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
		$(".sele").click(function(){ // при клике на правую кнопку запускаем следующую функцию:
			$(".title").animate({left: "-100%"}, 200); // производим анимацию: блок с набором картинок уедет влево на 222 пикселя (это ширина одного прокручиваемого элемента) за 200 милисекунд.
			setTimeout(function () { // устанавливаем задержку времени перед выполнением следующих функций. Задержка нужна, т.к. эти ффункции должны запуститься только после завершения анимации.
				$(".title .text").eq(0).clone().appendTo(".title div"); // выбираем первый элемент, создаём его копию и помещаем в конец карусели
				$(".h-carousel-items .b-carousel-block").eq(0).remove(); // удаляем первый элемент карусели
				$(".title").css({"left":"0px"}); // возвращаем исходное смещение набора набора элементов карусели
			}, 300);
		});

		$(".b-carousel-button-left").click(function(){ // при клике на левую кнопку выполняем следующую функцию:
			$(".h-carousel-items .b-carousel-block").eq(-1).clone().prependTo(".h-carousel-items"); // выбираем последний элемент набора, создаём его копию и помещаем в начало набора
			$(".h-carousel-items").css({"left":"-222px"}); // устанавливаем смещение набора -222px
			$(".h-carousel-items").animate({left: "0px"}, 200); // за 200 милисекунд набор элементов плавно переместится в исходную нулевую точку
			$(".h-carousel-items .b-carousel-block").eq(-1).remove(); // выбираем последний элемент карусели и удаляем его
		});

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

		$('.item').on('click', function (e) {
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