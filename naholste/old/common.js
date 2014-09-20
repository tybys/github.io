/*jslint unparam: true */
/*global window, $, priceStretch, pricePrint */
'use strict';

$(document).ready(function () {
  $('input[name=\'filter_name\']').on('keydown', function (e) {
    if (e.keyCode == 13) {
      var url = $('base').attr('href') + 'index.php?route=product/search';
      var filter_name = $('input[name=\'filter_name\']').attr('value');
      if (filter_name) {
        url += '&filter_name=' + encodeURIComponent(filter_name);
      }
      window.location = url;
    }
  });

  /*$('#cart > .heading a').live('click', function() {
   $('#cart').addClass('active');
   $('#cart').load('index.php?route=module/cart #cart > *');
   $('#cart').live('mouseleave', function() {
   $(this).removeClass('active');
   });
   });*/

  /* Color select */
  var filterColor = $('.js-filter-color');

  filterColor.select2({
    formatResult: formatColorSelect,
    formatSelection: formatColorSelect,
    escapeMarkup: function (m) {
      return m;
    }
  });

  filterColor.on('change', function (e) {
    window.location = $('.js-filter-color option[value="' + e.val + '"]').data('url')
  });

  var colorValue = $('.js-filter-color option[data-url="' + window.location.href + '"]').val();
  if (colorValue) {
    filterColor.select2('val', colorValue);
  }

  // Highlight sidebar color filter link
  $('a[href="' + window.location.href + '"]').addClass('active');

  $('#product-size').select2({
    dropdownCssClass: 'product-size'
  });

  /* Select first configurator item on product page */
  $('.configurator-item').first().addClass('active').find('label').trigger('click');

  /* Contacts page */
  var contactsBarBtn = $('.js-contacts-bar-btn');
  var contactId = contactsBarBtn.first().data('contact');
  $('.js-contact').each(function () {
    $(this).hide();
  });
  $('.js-contact-' + contactId).each(function () {
    $(this).show();
  });

  contactsBarBtn.on('click', function () {
    contactsBarBtn.each(function () {
      $(this).removeClass('active');
    });

    $(this).addClass('active');

    contactId = $(this).data('contact');
    $('.js-contact').each(function () {
      $(this).hide();
    });

    $('.js-contact-' + contactId).each(function () {
      $(this).show();
    });
  });

  var tooltip = $('.tooltip');
  if (tooltip.length) {
    tooltip.tooltipster({
      maxWidth: 200,
      position: 'right',
      theme: 'tooltipster-naholste'
    });
  }
});

var headerContactsRow = $('.header-contacts-row');
headerContactsRow.first().show();

/*$(document).on('click', $('.contact-link'), function (e) {
  headerContactsRow.each(function () {
    $(this).hide();
  });

  console.log($(e.target).parent().next());
  $(e.target).parent().next().show();
});*/

$('.js-button-search').on('click', function () {
  goToSearchPage();
});

$('.js-search-value').on('keydown', function (e) {
  if (e.keyCode == 13) {
    goToSearchPage();
  }
});

/* Form filter */
$('.filter-form-btn').on('click', function () {
  window.location = $(this).data('url');
});

function goToSearchPage() {
  var url = $('base').attr('href') + 'index.php?route=product/search';
  var filter_name = $('.js-search-value').val();
  if (filter_name) {
    url += '&search=' + encodeURIComponent(filter_name);
  }
  window.location = url;
}

$('#notification').on('click', 'img', function () {
  $(this).parent().fadeOut('slow', function () {
    $(this).remove();
  });
});

/* Ajax Cart */
$('#cart').click(function (e) {
  e.preventDefault();
  window.location = 'index.php?route=checkout/cart';
});

/* Cart product quantity spinner */
$('.cart-product-quantity').spinner({
  min: 1,
  icons: {down: 'cart-quantity-down-icon', up: 'cart-quantity-up-icon'},
  stop: function (e, ui) {
    $('#cart-products').submit();
  }
});

/* Cart delete product */
$('.cart-product-delete').click(function () {
  window.location = $(this).data('link');
});

/* Product page add to cart button */
$('#button-cart').bind('click', function () {
  $.ajax({
    url: 'index.php?route=checkout/cart/add',
    type: 'post',
    data: $('.product-info input[type=\'text\'], .product-info input[type=\'hidden\'], .product-info input[type=\'radio\']:checked, .product-info input[type=\'checkbox\']:checked, .product-info select, .product-info textarea'),
    dataType: 'json',
    success: function (json) {
      $('.success, .warning, .attention, .information, .error').remove();

      if (json['error']) {
        if (json['error']['option']) {
          var i;
          for (i in json['error']['option']) {
            $('#option-' + i).after('<span class="error">' + json['error']['option'][i] + '</span>');
          }
        }
      }

      if (json['success']) {
        $('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="/catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
        $('.success').fadeIn('slow');
        $('#cart-total').html(json['total']);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
      }
    }
  });
});

/* Product page get calculated price */
$('#product-size').bind('change', function () {
  recalculatePrice();
});

/* Configurator actions */
$('.configurator').on('click', 'li', function () {
  var li = $(this);
  // TODO: сбросить все отмеченные input[type="radio"] и class="active"
  li.siblings().each(function (i, el) {
    $(el).removeClass('active');
  });
  li.closest('input[type="radio"]').prop('checked');
  li.addClass('active');
  recalculatePrice();
});

/* Update product image when customer change the option */
$('.configurator-item-radio').bind('change', function (e) {
  var options_checked = [];
  $('.configurator-item-radio:checked').each(function(e){
    options_checked.push($(this).val());
  });
  $.ajax({
    url: 'index.php?route=product/product/image',
    type: 'post',
    data: {
      options: options_checked,
      product_id: $('#product').data('product-id')
    },
    dataType: 'json',
    success: function (json) {
      if (json.success) {
        $('#image').attr('src', json.thumb);
        $('#image').parent().attr('href', json.popup);
      }
    }
  });
});

/* Helper for custom color select */
function formatColorSelect(state) {
  if (!state.id) return state.text;
  var originalOption = state.element;
  var background = $(originalOption).data('color');
  if (background === 'no') background = 'transparent';
  return '<span class="select-color-prefix" style="background:' + background + '"></span>' + state.text;
}

/* Recalculate product price by chosen option price */
function recalculatePrice() {
  //var product_id = $('#product')'.data('product-id');
  var sizeSelect = $('#product-size').find(':selected');
  var configurator = $('.configurator-item.active');
  var price = calculateProductPriceByOptions({
    height: sizeSelect.data('height'),
    width: sizeSelect.data('width'),
    configurator: configurator.data('price')
  });
  $('.product-info-price-value').html(price);


  /*$.ajax({
    url: 'index.php?route=product/product/price',
    type: 'post',
    data: {
      product_id: $('#product').data('product-id'),
      height: $('#product-size').val()
    },
    dataType: 'json',
    success: function (json) {
      if (json['error']) {
        console.error(json['error'])
      }
      $('.product-info-price-value').html(json['price']);
    }
  });*/
}

function calculateProductPriceByOptions(data) {
  var height = data.height,
      width = data.width;
  var price = getPrintPrice(width, height) + getStretchPrice(width, height) + parseFloat(data.configurator);
  return price + ' <span class="currency-text">&#8399;</span>';
}

function getPrintPrice(width, height) {
  return Math.round(width * height * pricePrint);
}

function getStretchPrice(width, height) {
  return Math.round((width + height) * priceStretch * 2);
}

function getURLVar(urlVarName) {
  var urlHalves = String(document.location).toLowerCase().split('?');
  var urlVarValue = '';

  if (urlHalves[1]) {
    var urlVars = urlHalves[1].split('&');

    for (var i = 0; i <= (urlVars.length); i++) {
      if (urlVars[i]) {
        var urlVarPair = urlVars[i].split('=');

        if (urlVarPair[0] && urlVarPair[0] == urlVarName.toLowerCase()) {
          urlVarValue = urlVarPair[1];
        }
      }
    }
  }

  return urlVarValue;
}

function addToCart(product_id, quantity) {
  quantity = typeof(quantity) != 'undefined' ? quantity : 1;
  $.ajax({
    url: 'index.php?route=checkout/cart/add',
    type: 'post',
    data: 'product_id=' + product_id + '&quantity=' + quantity,
    dataType: 'json',
    success: function (json) {
      $('.success, .warning, .attention, .information, .error').remove();

      if (json['redirect']) {
        window.location = json['redirect'];
      }

      if (json['success']) {
        $('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="/catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
        $('.success').fadeIn('slow');
        $('#cart-total').html(json['total']);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
      }
    }
  });
}

function addToWishList(product_id) {
  $.ajax({
    url: 'index.php?route=account/wishlist/add',
    type: 'post',
    data: 'product_id=' + product_id,
    dataType: 'json',
    success: function (json) {
      $('.success, .warning, .attention, .information').remove();

      if (json['success']) {
        $('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="/catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
        $('.success').fadeIn('slow');
        $('#wishlist-total').html(json['total']);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
      }
    }
  });
}

function addToCompare(product_id) {
  $.ajax({
    url: 'index.php?route=product/compare/add',
    type: 'post',
    data: 'product_id=' + product_id,
    dataType: 'json',
    success: function (json) {
      $('.success, .warning, .attention, .information').remove();

      if (json['success']) {
        $('#notification').html('<div class="success" style="display: none;">' + json['success'] + '<img src="/catalog/view/theme/default/image/close.png" alt="" class="close" /></div>');
        $('.success').fadeIn('slow');
        $('#compare-total').html(json['total']);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
      }
    }
  });
}
