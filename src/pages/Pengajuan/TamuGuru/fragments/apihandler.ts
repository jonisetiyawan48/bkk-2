import axios from 'axios';
import { API_URL, LOGGED_CONFIG } from '../../../../utils/constants';
import { unautorized } from '../../../../utils/helpers/isLogged';

const GUEST_URL = `${API_URL}/submission/guest`;

export async function fetchGuests() {
  try{
    const guestsdata = await axios.get(GUEST_URL, LOGGED_CONFIG);
    const res = guestsdata.data.data
    return Promise.resolve(res);
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve([]);
  }
}

export async function postGuests(payload:any) {
  try {
    await axios.post(GUEST_URL, payload, LOGGED_CONFIG);
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

export async function putGuests(param:string, payload:any) {
  try{
    await axios.put(`${GUEST_URL}/${param}`, payload, LOGGED_CONFIG);
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

export async function deleteGuest(param: string) {
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
    return Promise.resolve({
      status: 'error',
      message: error.response.data.message,
    });
  }
}
