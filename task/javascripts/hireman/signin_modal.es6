class SigninModal {
  constructor(action, userType) {
    this.action = action
    this.userType = userType
    this.apply()
  }

  apply() {
    $(`input[name=user_type][value=${this.userType}]`).prop('checked', true)
    for (var section of ["header", "content", "footer"]) {
      $(`[data-${this.action}-section=${section}]`).removeClass('hidden')
      $(`[data-${this.invertedAction}-section=${section}]`).addClass('hidden')
    }
    $(`[data-user-type=${this.userType}]`).removeClass('hidden')
    $(`[data-user-type=${this.invertedUserType}]`).addClass('hidden')
  }

  get invertedAction() {
    return (this.action == "signin") ? "signup" : "signin"
  }

  get invertedUserType() {
    return (this.userType == "candidate") ? "employer" : "candidate"
  }
}

$(() => {
  if ($("#enter").length > 0) {
    window.signinModal = new SigninModal('signin', 'candidate')

    $('.user-type').on('change', 'input[name=user_type]', function() {
      signinModal.userType = $(this).val()
      signinModal.apply()
    })

    $('.modal-footer').on('click', '[data-action-switcher=true]', function(e) {
      e.preventDefault()
      signinModal.action = $(this).data('action')
      signinModal.apply()
    })

    $(document)
      .on('ajax:success', '#signin_candidate', function() {
        location.href = $(this).data("redirect-to")
      })
      .on('ajax:error', '#signin_candidate', function(e, data, status, xhr) {
        $(this).render_form_errors('candidate', { email: [data.responseJSON.error] })
      })

    $(document)
      .on('ajax:success', '#signup_candidate', function() {
        location.href = $(this).data("redirect-to")
      })
      .on('ajax:error', '#signup_candidate', function(e, data, status, xhr) {
        $(this).render_form_errors('candidate', data.responseJSON.errors)
      })

    $(document)
      .on('ajax:success', '#signin_employer', function() {
        location.href = $(this).data("redirect-to")
      })
      .on('ajax:error', '#signin_employer', function(e, data, status, xhr) {
        $(this).render_form_errors('employer', { email: [data.responseJSON.error] })
      })

    $(document)
      .on('ajax:success', '#signup_employer', function() {
        location.href = $(this).data("redirect-to")
      })
      .on('ajax:error', '#signup_employer', function(e, data, status, xhr) {
        $(this).render_form_errors('employer', data.responseJSON.errors)
      })
  }
})
