import axios from 'axios';

import { API_URL, LOGGED_CONFIG } from '../../../utils/constants';
import { unautorized } from '../../../utils/helpers/isLogged';

const FORUM_POST_URL = `${API_URL}/forum-discussion/posts`;
const FORUM_URL = `${API_URL}/forum-discussion`;

export async function fetchForumPosts() {
  try {
    const forumPosts = await axios.get(FORUM_POST_URL, LOGGED_CONFIG);
    const res = forumPosts.data.data;
    return Promise.resolve(res);
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve([]);
  }
}

export async function fetchForumDetailById(forumId: string) {
  try {
    const forumById = await axios.get(`${FORUM_URL}/${forumId}`, LOGGED_CONFIG);
    const res = forumById.data.data;
    return Promise.resolve(res);
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve({});
  }
}

export async function fetchUserById(userId:string) {
  try {
    const userInfo = await axios.get(`${API_URL}/users/${userId}`, LOGGED_CONFIG)
    const res = userInfo.data.data;
    return Promise.resolve(res);
  } catch(error:any) {
    return Promise.resolve({})
  }
}

export async function fetchPostById(params: string) {
  try {
    const byId = await axios.get(
      `${FORUM_POST_URL}?forumId=${params}`,
      LOGGED_CONFIG
    );
    const res = byId.data.data;
    return Promise.resolve(res);
  } catch (error: any) {
    if (error.response?.data?.code == 401) {
      unautorized();
    }
    return Promise.resolve([]);
  }
}
