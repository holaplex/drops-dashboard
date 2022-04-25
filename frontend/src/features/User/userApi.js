import requestHelper from '../../helpers/requestHelper';
import { saveToken } from '../../helpers/localStorage';

// TODO: Raise an error if necessary

const me = async () => {
  return await requestHelper.get('users/me').catch((e) => e.response);
};

const index = async () => {
  console.log("WOOORKIIING")
  return await requestHelper.get('/users').catch((e) => e.response)
}

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

const refreshToken = async ({ refreshToken }) => {
  return await requestHelper
    .post('/oauth/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    })
    .catch((e) => e.response);
};

export { signUp, login, refreshToken, me, index };
