@unhighlightStars = (container) ->
  container.find("a").
    removeClass("star-ico-red").
    addClass("star-ico-gray")

@highlightStars = (container, number) ->
  for i in (if number == 1 then [1] else [1..number])
    container.find("a[data-number='#{i}']").
      removeClass("star-ico-gray").
      addClass("star-ico-red")

$ ->
  $("#reject_candidate").on("ajax:success", (e, data, status, xhr) ->
    $(@).fadeOut()
    $("#message").fadeOut ->
      $("#message").text("Вы отказали кандидату").fadeIn()
  ).on "ajax:error", (e, xhr, status, error) ->
    alert "Возникла ошибка при выполнении операции"

  $(".add_to_favorite").on("ajax:success", (e, data, status, xhr) ->
    is_favorite = data.response.is_favorite

    $(@).find("input[name='response[is_favorite]']").val !is_favorite
    $(@).find(".add_to_favorite_button span").toggleClass "selected"
    if (label = $(@).find(".add_to_favorite_label")).length
      label.text(if is_favorite then "Удалить из избранного" else "Добавить в избранное")
  ).on "ajax:error", (e, xhr, status, error) ->
    alert "Возникла ошибка при выполнении операции"

  $("#job_filter").on "change", ->
    if job = $(@).val()
      window.location = new Uri(location.href).
        replaceQueryParam("job", job)

  $(".rating-stars a").on "click", (e)->
    e.preventDefault()
    star = $(@)
    number = $(@).data "number"
    current_number = star.parent().find("a[data-active='true']").data("number")
    new_number = if number == current_number then null else number
    rateUrl = $(@).data "rate-url"

    $.ajax
      url: rateUrl
      type: "POST"
      dataType: "json"
      data:
        _method: "PATCH"
        response: { rating: new_number }
      success: ->
        star.parent().find("a").attr("data-active", false)
        unhighlightStars star.parent()

        if new_number
          star.parent().find("a[data-number='#{new_number}']").attr("data-active", true)
          highlightStars star.parent(), new_number
      error: ->
        alert "Возникла ошибка при выполнении операции"

  $(".rating-stars a").on
    mouseenter: ->
      number = $(@).data "number"
      unhighlightStars $(@).parent()
      highlightStars $(@).parent(), number
    mouseleave: ->
      unhighlightStars $(@).parent()
      if current_number = $(@).parent().find("a[data-active='true']").data("number")
        highlightStars $(@).parent(), current_number
