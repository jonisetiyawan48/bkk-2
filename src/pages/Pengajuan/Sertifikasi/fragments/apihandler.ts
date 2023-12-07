import axios from "axios";
import { API_URL, LOGGED_CONFIG } from '../../../../utils/constants';
import { unautorized } from "../../../../utils/helpers/isLogged";

const CERT_URL = `${API_URL}/submission/certification`;

export async function fetchCerts() {
  try{
    const certdata = await axios.get(CERT_URL, LOGGED_CONFIG);
    const res = certdata.data.data
    return Promise.resolve(res);
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve([])
  }
}

export async function postCerts(payload:any) {
  try{
    await axios.post(CERT_URL, payload, LOGGED_CONFIG);
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

export async function putCerts(param:string, payload:any) {
  try{
    await axios.put(`${CERT_URL}/${param}`, payload, LOGGED_CONFIG);
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

export async function deleteCerts(param:string) {
  try{
    await axios.delete(`${API_URL}/submission/${param}`, LOGGED_CONFIG)
    return Promise.resolve({
      status: 'success',
      message: 'Data telah dihapus',
    });
  } catch (error: any) {
    return Promise.resolve({
      status: 'error',
      message: error.response.data.message,
    });
  }
}