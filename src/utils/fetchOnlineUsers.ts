import axios from 'axios';
import {
  API_URL, LOGGED_CONFIG
} from './constants';


export async function fetchOnlineUsers() {
  try {
    const fetchUsers = await axios.get(`${API_URL}/users?quantity=999999`, LOGGED_CONFIG)

    return Promise.resolve({
      status: 'success',
      value: fetchUsers.data.data
    });
  } catch(error:any) {
    return Promise.resolve(error.response?.data);
  }
}