define(['common'], function (common) {

    return {

        init: function () {
            if ($('#delivery-page').length == 0)
                return;

            this.initBoxberryBlock();

            this.initRegionSelector();
        },

        initRegionSelector: function() {
            this.selectedRegion = $.cookie('km-region');
            if (this.selectedRegion == undefined)
                this.selectedRegion = 'moscow';

            $('a.select-moscow-region').click(this.onRegionChanged.bind(this, 'moscow'));
            $('a.select-spb-region').click(this.onRegionChanged.bind(this, 'spb'));
            $('a.select-other-region').click(this.onRegionChanged.bind(this, 'other'));

            this.onRegionChanged(this.selectedRegion);
        },

        onRegionChanged: function(region) {
            var regionSelector = $('.region-selector');
            regionSelector.find('li').removeClass('active');
            regionSelector.find('a.select-' + region + '-region').parent('li').addClass('active');

            $('.block.moscow-region').hide();
            $('.block.spb-region').hide();
            $('.block.other-region').hide();
            $('.block.' + region + '-region').show();

            var boxberryCitySelectBlock = this.boxberryBlock.find('div.city-select');
            if (region == 'moscow') {
                this.boxberryCitySelect.val('Москва').trigger('change');
                boxberryCitySelectBlock.hide();
            } else if (region == 'spb') {
                this.boxberryCitySelect.val('Санкт-Петербург').trigger('change');
                boxberryCitySelectBlock.hide();
            } else {
                this.boxberryCitySelect.val('Абакан').trigger('change');
                boxberryCitySelectBlock.show();
            }

            this.selectedRegion = region;
            $.cookie('km-region', region, {expires: 3000, path: '/'});

            return false;
        },

        initBoxberryBlock: function () {
            this.boxberryBlock = $('#boxberry');
            this.boxberryBlock.show();

            this.boxberryCities = [];
            this.boxberryCitySelect = this.boxberryBlock.find('select');
            this.boxberryCitySelect.change(this.onBoxberryCityChanged.bind(this));

            this.boxberryTable = this.boxberryBlock.find('table');
            this.boxberryTableBody = this.boxberryTable.find('tbody');

            this.boxberryPrices = [150, 170, 190, 210];

            var that = this;
            $.ajax({
                'url': '/assets/boxberry.json',
                'type': 'get',
                'cache': false
            }).done(function (data) {
                that.updateBoxberryBlock(data);
            });
        },

        updateBoxberryBlock: function (data) {

            this.boxberryCities = data;

            var cities = [];
            $.each(data, function (idx, city) {
                if ($.inArray(city.city, cities) == -1) {
                    cities.push(city.city);
                }
            });

            var that = this;
            $.each(cities, function (idx, city) {
                that.boxberryCitySelect.append($("<option></option>").attr("value", city).text(city));
            });

            if (this.selectedRegion == 'moscow') {
                this.boxberryCitySelect.val('Москва').trigger('change');
            } else if (this.selectedRegion == 'spb') {
                this.boxberryCitySelect.val('Санкт-Петербург').trigger('change');
            } else {
                this.boxberryCitySelect[0].selectedIndex = 0;
                this.boxberryCitySelect.trigger('change');
            }

            this.boxberryTable.show();
        },

        onBoxberryCityChanged: function () {
            this.boxberryTableBody.find('tr').remove();
            var cityName = this.boxberryCitySelect.val();
            var filteredCities = $.grep(this.boxberryCities, function (e) {
                return e.city == cityName;
            });

            var that = this;
            $.each(filteredCities, function (idx, city) {
                that.boxberryTableBody.append(
                    $('<tr>')
                        .append($('<td>')
                            .append($('<b>').text(city.address))
                            .append($('<div>').text('График работы: ' + city.schedule))
                            .append($('<div>').text('Телефон: ' + city.phones))
                    )
                        .append($('<td>').text(common.pluralize(city.days, '$ день;$ дня;$ дней')))
                        .append($('<td>').text(that.boxberryPrices[city.zone - 1] + ' рублей'))
                )
            });
        }
    };
});