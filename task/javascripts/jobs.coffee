fill_in_fields = (data_url, fields)->
  if data_url
    $.getJSON data_url, (data)->
      $("#job_#{field}").val(data.job[field]).change() for field in fields
  else
    $("#job_#{field}").val("").change() for field in fields

$ ->
  if $("#terms_of_service").is(":checked")
    $("#respond_button").attr("disabled", false)

  $("#terms_of_service").change (e)->
    e.preventDefault

    checked = $(@).is(':checked')

    if checked
      $("#respond_button").attr("disabled", false)
    else
      $("#respond_button").attr("disabled", true)

  $('#chose_file').click ->
    $('#chose_file_input').click()

  $('#chose_file_input').change(->
    if value = $(@).val()
      filename = value.split('/').pop().split('\\').pop()
      $('#chose_file').html filename
  ).change()

  $("#select_company").change ->
    fields = ["company_name", "company_website", "company_description"]
    url = $(@).val()
    fill_in_fields url, fields

  $("#select_job").change ->
    fields = ["name", "city_id", "direction_id", "description", "requirements",
      "conditions", "experience", "salary", "salary_for"]
    url = $(@).val()
    fill_in_fields url, fields
