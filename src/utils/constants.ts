import { isLogged } from './helpers/isLogged';
import { getLocalStorage } from './helpers/localstorage';

const ANIM_TRANSITION = {
  transition: { duration: 0.4, type: 'spring' },
};

const LOCAL_STORAGE_TOKEN = 'telkompde/token';
const LOCAL_STORAGE_USER = 'telkompde/user';

const LOGGED_CONFIG = {
  headers: {
    Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
  },
};

const UID = isLogged() && getLocalStorage(LOCAL_STORAGE_USER).userId

const ROLES = [
  { value: '1', label: 'Headmaster' },
  { value: '4', label: 'Vocation Net' },
  { value: '6', label: 'Ministry' },
  { value: '8', label: 'Partner' },
  // { value: '2', label: 'Teacher' },
  // { value: '3', label: 'Student' },
  // { value: '5', label: 'Telkom group' },
  // { value: '7', label: 'Superadmin' },
];

const USERS_LIST_ROLES: { [key: string]: { value: string; label: string } } = {
  1: {
    value: '1',
    label: 'Kepala Sekolah',
  },
  2: {
    value: '2',
    label: 'Guru',
  },
  3: {
    value: '3',
    label: 'Siswa',
  },
  4: {
    value: '4',
    label: 'Vocation Net',
  },
  5: {
    value: '5',
    label: 'Telkom Group',
  },
  6: {
    value: '6',
    label: 'Kemendikbud',
  },
  7: {
    value: '7',
    label: 'Admin',
  },
};

const API_URL = 'http://103.93.130.122:2003/api/v1/pde';

const HEADER_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==',
  },
};

const USER_ROLE = getLocalStorage(LOCAL_STORAGE_USER)
  ? getLocalStorage(LOCAL_STORAGE_USER).roles
  : 0;

const MARKETPLACE_CONFIG = {
  'Content-type': 'multipart/form-data',
  headers: {
    Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
  },
};

const BLOG_CONFIG = {
  'Content-type': 'multipart/form-data',
  headers: {
    Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
  },
};

export {
  API_URL,
  HEADER_CONFIG,
  LOGGED_CONFIG,
  MARKETPLACE_CONFIG,
  BLOG_CONFIG,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
  ANIM_TRANSITION,
  ROLES,
  USERS_LIST_ROLES,
  USER_ROLE,
  UID
};
