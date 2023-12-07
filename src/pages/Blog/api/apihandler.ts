import axios from 'axios';
import FormData from 'form-data';
import {
  API_URL,
  BLOG_CONFIG,
  LOCAL_STORAGE_USER,
  LOGGED_CONFIG
} from '../../../utils/constants';
import { unautorized } from '../../../utils/helpers/isLogged';
import { getLocalStorage } from '../../../utils/helpers/localstorage';

const BLOG_URL = `${API_URL}/blogs`;
const NEWS_URL = `${API_URL}/news`;

const CURRENT_USER = getLocalStorage(LOCAL_STORAGE_USER);

export async function fetchBlogs() {
  try {
    const blogsData = await axios.get(BLOG_URL, LOGGED_CONFIG);
    const res = blogsData.data.data;
    return Promise.resolve(res);
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve([]);
  }
}

export async function fetchNews() {
  try {
    const newsData = await axios.get(NEWS_URL, LOGGED_CONFIG);
    const res = newsData.data.data;
    return Promise.resolve(res);
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve([]);
  }
}

export async function likePost(param: string) {
  const payload = {
    reactType: 'like'
  }
  try{
    await axios.put(`${BLOG_URL}/react/${param}`, payload, LOGGED_CONFIG);
    return Promise.resolve({
      status: 'success',
      message: 'Postingan berhasil di like',
    })
  } catch(error:any) {
    return Promise.resolve({
      status: 'error',
      message: error.response.data.message
    })
  }
}

export async function unlikePost(param: string) {
  const payload = {
    reactType: 'unlike'
  }
  try{
    await axios.put(`${BLOG_URL}/react/${param}`, payload, LOGGED_CONFIG);
    return Promise.resolve({
      status: 'success',
      message: 'Postingan berhasil di like',
    })
  } catch(error:any) {
    return Promise.resolve({
      status: 'error',
      message: error.response.data.message
    })
  }
}

export async function commentPost(param: string, payload: any) {
  const body = {
    reactType: 'comment',
    comment: payload 
  };

  try {
    await axios.put(`${BLOG_URL}/react/${param}`, body, LOGGED_CONFIG);
    return Promise.resolve({
      staus: 'success',
      message: 'Comment uploaded',
    })
  } catch (error: any) {
    return Promise.resolve({
      status: 'error',
      message: error.response.data.message,
    })
  }
}

export async function postBlog(payload: any) {
  let user = [{ userId: CURRENT_USER.userId, name: CURRENT_USER.name }];
  let form = new FormData();

  form.append('user', JSON.stringify(user));
  form.append('description', payload.description);
  form.append('blogTitle', payload.blogTitle);
  form.append('blogImage', payload.image);

  try {
    await axios.post(BLOG_URL, form, BLOG_CONFIG);
    return Promise.resolve({
      status: 'success',
      message: 'Data telah berhasil ditambah',
    });
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve({
      status: 'failed',
      message: error.response.data.message,
    });
  }
}

