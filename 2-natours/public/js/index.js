import '@babel/polyfill';
import { login, logout } from './login.js';
import { updateSettings } from './updateSettings.js';
import { bookTour } from './stripe.js';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const updateForm = document.querySelector('.form-user-data');
const updatePassForm = document.querySelector('.form-user-settings');
const bookTourBtn = document.querySelector('#book-tour');

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (updateForm) {
  updateForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (updatePassForm) {
  updatePassForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-pass').innerHTML = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';

    document.querySelector('.btn--save-pass').innerHTML = 'Save password';
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (bookTourBtn) {
  bookTourBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
