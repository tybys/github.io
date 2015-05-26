(function ($, undefined) {
    $.extend($.fn, {
        scrollBox: function (settings) {

            var settings = settings || {},
                cls = $.extend({
                    base: 'scrBox',
                    innerBox: 'In',
                    bar: 'Bar',
                    barUp: 'Up',
                    barDown: 'Down',
                    barArea: 'BArea',
                    barScroller: 'BScr'
                }, settings.classes || {}),
                opts = $.extend({
                    wraps: 1,
                    scrollStep: 15,
                    wrapper: null,
                    scrollerDecor: 3
                }, settings.options || {}),
                bodyElement = $(document.body);

            for (var cl in cls)
                if (cl != 'base') cls[cl] = cls.base + cls[cl];

            this.each(function () {
                var box = $(this),
                    OBox = new Box($(this));

                OBox.init();
            });

            function Box(box) {

                var self = this;

                this.wrapper = !opts.wrapper ? $('<span />', { 'class': cls.base }) : opts.wrapper;
                this.iBox = box;

                this.init = function () {

                    OFormChanger.copyAttrs(this.iBox, cls.base, this.wrapper);

                    this.iBox.addClass(cls.innerBox);

                    //if(this.innerBox.is('textarea') && this.innerBox.data().changer) this.element.height(this.innerBox.height());
                    this.iBox.before(this.wrapper);
                    this.wrapper.append(this.iBox);

                    this.check();

                    this.iBox.bind('innerChange input keydown', function () {
                        self.check();
                    });

                    this.iBox.data().scrollBox = {
                        wrap: this.wrapper,
                        scrollTo: function (to) {
                            if (self.bar) self.bar.scrollTo(to);
                        },
                        scrollToBottom: function () {
                            if (self.bar) self.bar.scrollTo(self.params.iBoxScH);
                        }
                    };
                };

                this.check = function () {
                    setTimeout(function () {
                        self.params = {
                            iBoxH: self.iBox.height(), //высота самого блока
                            iBoxScH: self.iBox[0].scrollHeight // высота контента внутри блока
                        };

                        self.calc();
                    }, 0);
                };

                this.calc = function () {
                    if (this.params.iBoxH >= this.params.iBoxScH) {
                        this.removeBar();
                        this.wrapper.removeClass('withScroll');
                    }
                    else {
                        !this.bar ? this.createBar() : this.bar.recalc();
                        this.wrapper.addClass('withScroll');
                        this.wrapper.trigger('scroll');
                    }
                };

                this.createBar = function () {
                    this.bar = new ScrollBar(this);

                    if (this.iBox.is('textarea'))
                        this.bar.appendTo(this.iBox.parent().parent()).init();
                    else
                        this.bar.appendTo(this.wrapper).init();
                };

                this.removeBar = function () {
                    if (this.bar) this.bar.remove();
                };


            }

            function ScrollBar(box) {

                var self = this;

                this.box = box;
                this.scrollBar = $('<span/>', { 'class': cls.bar, role: cls.bar });
                this.scrollBarUp = $('<span/>', { 'class': cls.barUp, role: cls.barUp });
                this.scrollBarDown = $('<span/>', { 'class': cls.barDown, role: cls.barDown });
                this.scrollBarArea = $('<span/>', { 'class': cls.barArea, role: cls.barArea });
                this.scrollBarScroller = $('<span/>', { 'class': cls.barScroller, role: cls.barScroller });

                this.init = function () {
                    for (var i = 1; i <= opts.scrollerDecor; i++)
                        this.scrollBarScroller.append($('<span />', { 'class': cls.barScroller + 'Decor' + i }));

                    this.scrollBar.append(this.scrollBarUp.add(this.scrollBarArea.append(this.scrollBarScroller)).add(this.scrollBarDown));

                    this.setHeights();
                };

                this.scrollTo = function (to) {
                    this.box.iBox[0].scrollTop = to || 0;
                    this.recalc();
                };

                this.remove = function () {
                    this.scrollBar.remove();
                    this.box.bar = null;
                };

                this.appendTo = function (element) {
                    element.append(this.scrollBar);
                    return this;
                };

                this.setHeights = function () {
                    this.scrollBarUp.hgt = this.scrollBarUp.height();
                    this.scrollBarDown.hgt = this.scrollBarDown.height();
                    this.scrollBarArea.hgt = this.scrollBar.height() - (this.scrollBarUp.hgt + this.scrollBarDown.hgt);

                    this.scrollBarArea.height(this.scrollBarArea.hgt);

                    this.setScrollerHeight();
                    this.setScrollerEvents();
                };

                this.recalc = function () {
                    this.setScrollerHeight();
                    this.box.wrapper.trigger('scroll');
                };

                this.setScrollerHeight = function () {
                    //this.box.innerBox.height(); // дергаем высоту, чтобы ослы < 8 отрендерили элемент до того как будет считаться
                    this.scrollBarScroller.height(parseInt(this.box.params.iBoxH / this.box.params.iBoxScH * this.scrollBarArea.hgt));
                    this.scrollBarScroller.hgt = this.scrollBarScroller.height();
                };

                this.setScrollerEvents = function () {
                    if (OFormChanger.device == 'touch') {
                        this.box.wrapper.bind('touchstart', function (e) {

                            var startTouch = event.touches[0],
                                startTop = startTouch.pageY;

                            bodyElement.bind('touchmove', function (e) {

                                event.preventDefault();

                                if (event.targetTouches.length == 1) {
                                    var touch = event.targetTouches[0];

                                    top = touch.pageY;

                                    var delta = startTop - top;

                                    self.box.iBox.scrollTop(self.box.iBox[0].scrollTop + delta);
                                }

                                self.box.wrapper.trigger('scroll');
                            });
                        });
                        this.box.wrapper.bind('touchend', function () {
                            bodyElement.unbind('touchmove');
                        });
                    }
                    else {
                        this.box.wrapper.bind('sMouseScroll', function (e) {
                            self.box.iBox.scrollTop(self.box.iBox[0].scrollTop + e.delta * opts.scrollStep);
                            $(this).trigger('scroll');
                            return false;
                        });
                    }
                    this.box.wrapper.bind('scroll', function () {
                        var scrollerTop = ((self.scrollBarArea.hgt - self.scrollBarScroller.hgt) * self.box.iBox[0].scrollTop) / (self.box.params.iBoxScH - self.box.params.iBoxH);
                        self.scrollBarScroller.css({ top: scrollerTop });
                    });

                    this.scrollBarUp.click(function () {
                        self.scrollUp();
                        self.box.wrapper.trigger('scroll');
                    }).mousedown(function () {

                        }).mouseup(function () {

                        });

                    this.scrollBarDown.click(function () {
                        self.scrollDown();
                        self.box.wrapper.trigger('scroll');
                    }).mousedown(function () {

                        }).mouseup(function () {

                        });

                    this.scrollBarScroller.mousedown(this.scrollerMouseDown);
                };

                this.scrollerMouseDown = function (e) {
                    self.scrollBarScroller.startCord = e.pageY;
                    self.scrollBarScroller.startScrollCord = parseInt(self.scrollBarScroller.css('top'));
                    bodyElement.bind('mousemove', self.dragDropScroller)
                        .mouseup(function () {
                            bodyElement.unbind('mousemove', self.dragDropScroller);
                        });
                    return false;
                };

                this.scrollUp = function () {
                    this.box.iBox.scrollTop(this.box.iBox[0].scrollTop - opts.scrollStep);
                };

                this.scrollDown = function () {
                    this.box.iBox.scrollTop(this.box.iBox[0].scrollTop + opts.scrollStep);
                };

                this.dragDropScroller = function (e) {
                    var curCord = e.pageY,
                        delta = self.scrollBarScroller.startCord - curCord,
                        scrollerTop = Math.min(Math.max(self.scrollBarScroller.startScrollCord - delta, 0), self.scrollBarArea.hgt - self.scrollBarScroller.hgt);

                    self.scrollBarScroller.css({ top: scrollerTop });

                    self.box.iBox.scrollTop(scrollerTop * (self.box.params.iBoxScH - self.box.params.iBoxH) / (self.scrollBarArea.hgt - self.scrollBarScroller.hgt));
                    return false;
                };


            }

            return this;

        }
    })
})(jQuery);