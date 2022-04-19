export const saveToken = (token) => {
  return localStorage.setItem('token', JSON.stringify(token));
};

export const getToken = () => JSON.parse(localStorage.getItem('token')) || '';
