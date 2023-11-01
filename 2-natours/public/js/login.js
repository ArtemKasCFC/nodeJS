import axios from 'axios';
import { showAlert } from './alerts';
// import axios from '/Users/Z/Desktop/Projects/nodeJS/2-natours/node_modules/axios/index';

// export const login = (email, password) => {
//   //   axios
//   //     .post('http://127.0.0.1:7000/api/v1/users/login', {
//   //       email,
//   //       password,
//   //     })
//   //     .then(res => {
//   //       alert('Hello there');
//   //       window.setTimeout(() => {
//   //         location.assign('/');
//   //       }, 1500);
//   //     })
//   //     .catch(err => alert(err.response.data.message));
// };

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
