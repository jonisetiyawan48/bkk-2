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
      status: "success",
      value: userlist.data.data
    })
  } catch (error: any) {    
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}
