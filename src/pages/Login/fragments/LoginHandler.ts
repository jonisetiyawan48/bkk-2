import axios from 'axios';
import {
  API_URL,
  HEADER_CONFIG,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER
} from '../../../utils/constants';
import { setLocalStorage } from '../../../utils/helpers/localstorage';


export default async function loginHandler(values: any, actions: any) {
  const LOGIN_URL = `${API_URL}/users/login`;

  try {
    const logindata = await axios.post(LOGIN_URL, values, HEADER_CONFIG);
    const res = logindata.data.data;
    if(res.isActiveLogin == true){
    

    setLocalStorage(LOCAL_STORAGE_TOKEN, res.accessToken);

    // delete res.accessToken;
    res.startIn = new Date().getTime() / 1000;

    setLocalStorage(LOCAL_STORAGE_USER, res);
    return Promise.resolve({ status: 'success', message: 'sukses login' });
  } else {
    return Promise.resolve({ status: 'failed', message: 'Account status in inactive, please contact admin'});
  }
  } catch (error:any) {
    return Promise.resolve({ status: 'failed', message: error.response.data.message || "Server error" });
  }
}
