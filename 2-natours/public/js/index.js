console.log('Just log');

import '@babel/polyfill';
import { login } from './login';

console.log('Just hello');

const loginForm = document.querySelector('.form');

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    login(email, password);
  });
}
