function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key)!);
}

function clearLocalStorage() {
  localStorage.clear();
}

export { setLocalStorage, getLocalStorage, clearLocalStorage };
