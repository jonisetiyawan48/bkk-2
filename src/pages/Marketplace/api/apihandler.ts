import axios from 'axios';
import FormData from 'form-data';
import {
  API_URL,
  LOCAL_STORAGE_TOKEN,
  LOGGED_CONFIG,
  MARKETPLACE_CONFIG
} from '../../../utils/constants';
import { unautorized } from '../../../utils/helpers/isLogged';
import { getLocalStorage } from '../../../utils/helpers/localstorage';

const MARKETPLACE_URL = `${API_URL}/products`;
const CART_URL = `${API_URL}/cart`;
const TRANSACTION_URL = `${API_URL}/transaction`;

export async function fetchProducts() {
  try {
    const productsData = await axios.get(MARKETPLACE_URL, LOGGED_CONFIG);
    const res = productsData.data.data;
    return Promise.resolve(res);
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function checkOutItem(params: string) {
  const checkoutUrl = `${TRANSACTION_URL}/checkout/${params}`;
  var config = {
    method: 'put',
    url: checkoutUrl,
    headers: {
      Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
    },
  };

  try {
    await axios(config);
    return Promise.resolve({ status: 'success' });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function deleteCart(params: string) {
  const checkoutUrl = `${API_URL}/cart/${params}`;
  var config = {
    method: 'delete',
    url: checkoutUrl,
    headers: {
      Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
    },
  };

  try {
    await axios(config);
    return Promise.resolve({ status: 'success' });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function approveTransaction(params: string) {
  const url = `${TRANSACTION_URL}/approve/${params}`;
  var config = {
    method: 'put',
    url: url,
    headers: {
      Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
    },
  };

  try {
    await axios(config);
    return Promise.resolve({
      status: 'success',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function postProducts(payload: any) {
  let form = new FormData();
  form.append('image', payload.image);
  form.append('name', payload.name);
  form.append('price', payload.price);
  form.append('description', payload.description);
  form.append('status', payload.status);

  try {
    await axios.post(MARKETPLACE_URL, form, MARKETPLACE_CONFIG);
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

export async function putProducts(param: string, payload: any) {
  let form = new FormData();
  payload.image && form.append('image', payload.image);
  form.append('name', payload.name);
  form.append('price', payload.price);
  form.append('description', payload.description);
  form.append('status', payload.status);

  try {
    await axios.put(`${MARKETPLACE_URL}/${param}`, form, MARKETPLACE_CONFIG);
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

export async function postCart(payload: any) {
  try {
    await axios.post(CART_URL, payload, LOGGED_CONFIG);
    return Promise.resolve({ status: 'success' });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function fetchTransaction() {
  try {
    const transactionData = await axios.get(TRANSACTION_URL, LOGGED_CONFIG);
    const res = transactionData.data.data;
    return Promise.resolve(res);
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function fetchCart() {
  try {
    const cartData = await axios.get(CART_URL, LOGGED_CONFIG);
    const res = cartData.data.data;
    return Promise.resolve(res);
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve(error.response?.data);
  }
}

export async function deleteProducts(param: string) {
  try {
    await axios.delete(`${MARKETPLACE_URL}/${param}`, LOGGED_CONFIG);
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
