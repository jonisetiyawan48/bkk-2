import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from '../constants';
import { clearLocalStorage, getLocalStorage } from './localstorage';

function isLogged() {
  const storage = getLocalStorage(LOCAL_STORAGE_USER);
  const token = getLocalStorage(LOCAL_STORAGE_TOKEN);
  const expired = isExpired();

  if (!storage && !token) {
    return false;
  }
  
  return !expired && token;
}

function isExpired() {
  try {
    const user = getLocalStorage(LOCAL_STORAGE_USER);

    const tokenDuration = user.expiresIn;

    const startDate = user.startIn;
    const endDate = startDate + tokenDuration;

    const currentDate = new Date().getTime() / 1000;

    if (endDate < currentDate) {
      unautorized();
    }

    return endDate < currentDate;
  } catch {
    return false;
  }
}

function unautorized() {
  window.alert('Token Expired!');
  clearLocalStorage();
  location.reload();
}

export { isLogged, unautorized };
