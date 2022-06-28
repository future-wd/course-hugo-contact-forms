'use strict'

const form = document.getElementById('js-contactForm');
const submitButton = document.getElementById('js-submit');

// enable the button when js loads
submitButton.disabled = false;
// create loading spinner
const spinner = document.createElement('div');
spinner.id = 'js-spinner';
spinner.classList.add('spinner-border', 'd-none');
form.appendChild(spinner);
// create alert for messages
const alert = document.createElement('div');
alert.id = 'js-alert';
alert.classList.add('alert', 'd-none');
form.appendChild(alert);

// called by recaptcha, submits the form (but not via browser default)
window.submitForm = () => {
  // show loading spinner
  spinner.classList.remove('d-none');
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
    message(false, 'There has been a connectivity issue, please try again later');
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
      message(true, 'Your message has been sent, we will get back to you shortly.')
    } else if (response.error) {
      message(false, `Error: ${response.error}`);
    } else {
      message(false, 'Something went wrong, please try again later');
    }
  }

  const message = (status, statusText) => {
    // add alert type based on status
    if (status === true) {
      alert.classList.add('alert-success')
    } else {
      alert.classList.add('alert-danger')
    }
    // add text to alert
    alert.innerHTML = statusText;
    // hide spinner
    spinner.classList.add('d-none');
    // un-hide alert
    alert.classList.remove('d-none');

    resetForm();
  }

  const resetForm = () => {
    // reset form contents
    form.reset();
    // reset validation status with css
    form.classList.remove('was-validated');
    // reset google recaptcha
    grecaptcha.reset();
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
}
