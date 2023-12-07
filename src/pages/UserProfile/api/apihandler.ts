import axios from 'axios';

import {
  API_URL,
  LOCAL_STORAGE_USER,
  LOGGED_CONFIG,
  UID
} from '../../../utils/constants';
import { unautorized } from '../../../utils/helpers/isLogged';
import { setLocalStorage } from '../../../utils/helpers/localstorage';

const USER_URL = `${API_URL}/users`;

export async function fetchCurrentUser() {
  try {
    const userData = await axios.get(`${USER_URL}/${UID}`, LOGGED_CONFIG);
    const res = userData.data.data;
    return Promise.resolve(res);
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve({});
  }
}

export async function putCurrentUser(payload: any) {
  let form = new FormData();
  form.append('address', payload.address);
  form.append('phoneNumber', payload.phoneNumber)
  form.append('agency', payload.agency);
  form.append('name', payload.name);
  payload.imageUser && form.append('imageUser', payload.imageUser);

  try {
    let run = await axios.put(`${USER_URL}/${UID}`, form, LOGGED_CONFIG);
    const res = run.data.data;
    res.startIn = new Date().getTime() / 1000;

    setLocalStorage(LOCAL_STORAGE_USER, res);

    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil diubah',
    });
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
