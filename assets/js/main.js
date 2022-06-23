import { Collapse } from 'bootstrap/dist/js/bootstrap.esm'; // required for navbar

// create a dynamic year and insert into the js-year span
document.getElementById('js-year').innerHTML = new Date().getFullYear();