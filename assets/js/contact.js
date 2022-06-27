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
  xhr.setRequestHeader('accept', 'application/json');
  // 3. send data
  xhr.send(formData);
  // 4. set timeout to 8sec
  xhr.timeout = 8000
  // 5. handle timeout
  xhr.ontimeout = () => {
    console.error('timeout');
  }

  // 6. on finish load
  // xhr.onloadend = () => {
  //   if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
  //     // http success
  //   } else {
  //     // http error
  //   }
  // }
  xhr.onloadend = () => {
    const response = JSON.parse(xhr.response);

    if (response.success) {
      console.log('json success');
    } else if (response.error) {
      console.log(`json error: ${response.error}`);
    } else {
      console.log('generic error');
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

