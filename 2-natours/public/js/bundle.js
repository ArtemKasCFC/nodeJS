var $knI9B$axios = require('axios');

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
// import '../../node_modules/@babel/polyfill/lib/index.js';
// // import axios from '../../node_modules/axios/index.cjs_';
// import axios from '../../node_modules/axios/index.cjs';

const $70af9284e599e604$export$596d806903d1f59e = (email, password) => {
  (0, $parcel$interopDefault($knI9B$axios)) // .post('http://127.0.0.1:7000/api/v1/users/login', {
    .post('/api/v1/users/login', {
      email: email,
      password: password,
    })
    .then(res => {
      alert('Hello there');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    })
    .catch(err => alert(err.response.data.message));
  // try {
  //   const res = await axios({
  //     method: 'POST',
  //     url: 'http://127.0.0.1:7000/api/v1/users/login',
  //     data: {
  //       email,
  //       password,
  //     },
  //   });
  //   if (res.data.status === 'success') {
  //     alert('Hello there');
  //     window.setTimeout(() => {
  //       location.assign('/');
  //     }, 1500);
  //   }
  // } catch (err) {
  //   alert(err.response.data.message);
  // }
};

console.log('Just hello');
const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector('.form');
const $d0f7ce18c37ad6f6$var$email = document.getElementById('email').value;
const $d0f7ce18c37ad6f6$var$password = document.getElementById('password').value;
if ($d0f7ce18c37ad6f6$var$loginForm)
  $d0f7ce18c37ad6f6$var$loginForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('some text');
    (0, $70af9284e599e604$export$596d806903d1f59e)($d0f7ce18c37ad6f6$var$email, $d0f7ce18c37ad6f6$var$password);
  });

//# sourceMappingURL=bundle.js.map
