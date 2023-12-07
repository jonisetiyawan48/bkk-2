import axios from 'axios';

import { API_URL, LOGGED_CONFIG } from '../../../../utils/constants';
import { unautorized } from '../../../../utils/helpers/isLogged';

const INTERN_URL = `${API_URL}/submission/internship`

export async function fetchIntern() {
  try{
    const interndata = await axios.get(INTERN_URL, LOGGED_CONFIG);
    const res = interndata.data.data
    return Promise.resolve(res);
  } catch(error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve([])
  }
}

export async function postIntern(payload:any) {
  try{
    await axios.post(INTERN_URL, payload, LOGGED_CONFIG);
    return Promise.resolve({
      status:'success', 
      message:'Data telah berhasil ditambah',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve({
      status: 'error',
      message: error.response.data.message,
    })
  }
}

export async function putIntern(param:string, payload:any) {
  try{
    await axios.put(`${INTERN_URL}/${param}`, payload, LOGGED_CONFIG);
    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil diubah'
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve({
      status: 'error',
      message: error.response.data.message || 'error',
    });
  }
}

export async function deleteIntern(param:string) {
  try{
    await axios.delete(`${API_URL}/submission/${param}`, LOGGED_CONFIG)
    return Promise.resolve({
      status: 'success',
      message: 'Data telah dihapus',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve({
      status: 'error',
      message: error.response.data.message,
    });
  }
}