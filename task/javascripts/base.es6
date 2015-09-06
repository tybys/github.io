$(() => {
  $('a[data-close-modal=true]').click((e) => {
    e.preventDefault()
    $('#lean_overlay').trigger('click')
  })

  $('.create-employer-account').on('click', 'button', () => {
    window.signinModal = new SigninModal('signup', 'employer')
    $('a[href=#enter]').trigger('click')
  })
})
