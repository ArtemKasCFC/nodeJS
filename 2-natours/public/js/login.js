import axios, { isCancel, AxiosError } from '../../node_modules/axios/index.cjs';

const login = async (email, password) => {
  axios
    .post('http://127.0.0.1:7000/api/v1/users/login', {
      email,
      password,
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
