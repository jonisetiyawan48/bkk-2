import axios from "axios";
import { API_URL, LOGGED_CONFIG } from "../../utils/constants";
import { unautorized } from "../../utils/helpers/isLogged";

const APPROVE_URL = `${API_URL}/submission/approve/`

export async function approveSub(param:string){
  try{
    const form = {approve:true}
    await axios.put(`${APPROVE_URL}${param}`, form, LOGGED_CONFIG)
    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil di approve',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function declineSub(param:string){
  try{
    const form = {approve:false}
    await axios.put(`${APPROVE_URL}${param}`, form, LOGGED_CONFIG)
    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil di decline',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response.data.message);
  }
}