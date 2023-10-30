import axios from 'axios';

export const login = async (email, password) => {
  //   axios
  //     .post('http://127.0.0.1:7000/api/v1/users/login', {
  //       email,
  //       password,
  //     })
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:7000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      alert('Hello there');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }

};
