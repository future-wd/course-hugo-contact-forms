'use strict'

var form = document.getElementById('js-contactForm');

// called by recaptcha, submits the form (but not via browser default)
window.onSubmit = () => {
  form.submit();
}

form.addEventListener('submit', (event) => {
  // stop default submit behaviour
  event.preventDefault()
  event.stopPropagation()
  // add class to display validation status of fields
  form.classList.add('was-validated')
  // if form has passed validation
  if (form.checkValidity()) {
    // call recaptcha for check and submission
    grecaptcha.execute();
    // recaptcha calls onSubmit after check
  }
}, false)

