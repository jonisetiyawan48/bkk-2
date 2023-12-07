import axios from 'axios';
import { API_URL, HEADER_CONFIG } from '../../../utils/constants';
import { unautorized } from '../../../utils/helpers/isLogged';

export default async function registerHandler(values: any) {
  const REGISTER_URL = `${API_URL}/users/register`;

  try {
    const registerdata = await axios.post(REGISTER_URL, values, HEADER_CONFIG);
    const res = registerdata.data.data;

    return Promise.resolve({ status: 'success', message: 'Sukses Register' });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve({
      status: 'failed',
      message: error.response.data.message,
    });
  }
}
