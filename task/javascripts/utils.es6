window.rewindPlayer = (playerId, time) => {
  videojs(playerId).currentTime(time)
}

$.fn.render_form_errors = function (model, errors) {
  this.reset_form_errors()

  $.each(errors, (field, messages) => {
    let input = this.find(`[name='${model}[${field}]']`)
    input.parent().append(`<span class="validation-errors">${messages.join(', ')}</span>`)
  })
}

$.fn.reset_form_errors = function() {
  this.find(`span.validation-errors`).remove()
}

// TODO
// $.fn.clear_form_fields = () ->
//   this.find(':input','#myform')
//       .not(':button, :submit, :reset, :hidden')
//       .val('')
//       .removeAttr('checked')
//       .removeAttr('selected')
