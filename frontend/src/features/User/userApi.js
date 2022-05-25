import requestHelper from '../../helpers/requestHelper';
import { saveToken } from '../../helpers/localStorage';

// TODO: Raise an error if necessary

const me = async () => {
  return await requestHelper.get('users/me').catch((e) => e.response);
};

const index = async () => {
  return await requestHelper.get('/users').catch((e) => e.response);
};

const signUp = async ({ username, email, password, user_type }) => {
  return await requestHelper
    .post('/users', { user: { username, email, password, user_type } })
    .catch((e) => e.response);
};

const login = async ({ email, password }) => {
  return await requestHelper
    .post('/oauth/token', {
      grant_type: 'password',
      email,
      password,
    })
    .catch((e) => e.response);
};

const forgotPassword = async (email) => {
  return await requestHelper
    .post('/forgot_password', { email })
    .catch((e) => e.response);
};

const resetPassword = async (password, reset_password_token) => {
  return await requestHelper
    .post('/reset_password', { password, reset_password_token })
    .catch((e) => e.response);
};

const refreshToken = async ({ refreshToken }) => {
  return await requestHelper
    .post('/oauth/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })
    .catch((e) => e.response);
};

export {
  signUp,
  login,
  refreshToken,
  me,
  index,
  forgotPassword,
  resetPassword,
};
