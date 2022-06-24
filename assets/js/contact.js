'use strict'

const form = document.getElementById('js-contactForm');

// called by recaptcha, submits the form (but not via browser default)
window.submitForm = () => {
  // form.submit();
  // get form data
  const formData = new FormData(form);
  // create new xhr instance
  const xhr = new XMLHttpRequest;
  // 1. open and configure xhr
  xhr.open(form.method, form.action)
  // 2. set headers
  xhr.setRequestHeader('Accept', 'application/json');
  // 3. send data
  xhr.send(formData);
  // 4. set timeout to 8sec
  xhr.timeout = 8000
  // 5. handle timeout
  xhr.ontimeout = () => {
    console.error('timeout');
  }
  // 6. on finish load
  xhr.onloadend = () => {
    // http success
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 300) {
      console.log('http success');
    } else { // http fail
      console.error('http fail');
    }
  }

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

