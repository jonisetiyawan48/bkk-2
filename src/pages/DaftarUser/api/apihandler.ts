import axios from 'axios';
import {
  API_URL,
  LOGGED_CONFIG
} from '../../../utils/constants';
import { unautorized } from '../../../utils/helpers/isLogged';

const USERS_URL = `${API_URL}/users`;

export async function fetchUsers() {
  try {
    const userlist = await axios.get(
      `${USERS_URL}?quantity=9999`,
      LOGGED_CONFIG
    );

    return Promise.resolve({
      status: 'success',
      value: userlist.data.data
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function postUsers(payload: any) {
  const body = {
    uploadType: 'add-users',
    userData: payload,
  };  

  try {
    await axios.post(`${USERS_URL}/upload`, body, LOGGED_CONFIG);
    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil ditambah',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function activationUser(userId: string, payload: boolean) {
  const form = new FormData();
  form.append('isActive', payload.toString());

  try {
    await axios.put(`${USERS_URL}/${userId}`, form, LOGGED_CONFIG);
    return Promise.resolve({
      status: 'success',
      message: 'Status Changed',
    })
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response.data)
  }
}

export async function putUsers(param: string, payload: any) {
  const form = new FormData();
  form.append('name', payload.name);
  
  try {
    await axios.put(`${USERS_URL}/${param}`, form, LOGGED_CONFIG);
    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil diedit',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}
