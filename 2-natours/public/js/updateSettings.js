import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${type === 'password' ? 'api/v1/users/update-current-password' : '/api/v1/users/update-me'}`,
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Your data is updated!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
