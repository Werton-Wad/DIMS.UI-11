const key = 'userEmail';

const setAuthInformation = (token) => {
  localStorage.setItem(key, token);
};

const getAuthInformation = () => {
  return localStorage.getItem(key);
};

const isAuthorized = () => {
  return !!getAuthInformation();
};

const clearAuthInformation = () => {
  return localStorage.removeItem(key);
};

export default {
  setAuthInformation,
  getAuthInformation,
  clearAuthInformation,
  isAuthorized,
};
