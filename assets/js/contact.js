// called by recaptcha, submits the form (but not via browser default)
function onSubmit(token) {
  document.getElementById("js-contactForm").submit();
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to

  var form = document.getElementById('js-contactForm');

  // listens for submit event on form
  form.addEventListener('submit', function (event) {
    // stop default submit behaviour
    event.preventDefault()
    event.stopPropagation()
    // add class to display validation status of fields
    form.classList.add('was-validated')
    // if form has passed validation
    // stop default submit behaviour
    if (form.checkValidity()) {
      // call recaptcha for check and submission
      grecaptcha.execute();
      // recaptcha calls onSubmit after check
    }

  }, false)

})()