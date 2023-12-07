import axios from "axios";

import { API_URL, LOGGED_CONFIG } from '../../../../utils/constants';
import { unautorized } from "../../../../utils/helpers/isLogged";

const TEST_URL = `${API_URL}/submission/curriculum-alignment`;

export async function fetchTests() {
  try {
    const guestsdata = await axios.get(TEST_URL, LOGGED_CONFIG);
    
    return Promise.resolve({
      status: 'success',
      value: guestsdata.data.data
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function postTest(payload: any) {
  try {
    await axios.post(TEST_URL, payload, LOGGED_CONFIG);
    
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

export async function putTest(param: string, payload: any) {
  try {
    await axios.put(`${TEST_URL}/${param}`, payload, LOGGED_CONFIG);
    
    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil diubah'
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function deleteTest(param: string) {
  try {
    await axios.delete(`${API_URL}/submission/${param}`, LOGGED_CONFIG);
    
    return Promise.resolve({
      status: 'success',
      message: 'Data telah dihapus',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}
