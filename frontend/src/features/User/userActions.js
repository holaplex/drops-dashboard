import { createAsyncThunk } from '@reduxjs/toolkit';
import requestHelper from '../../helpers/requestHelper';
import * as userApi from './userApi';
import { getToken, saveToken } from '../../helpers/localStorage';
export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ username, email, password, user_type }, thunkAPI) => {
    try {
      const response = await userApi.signUp({ username, email, password, user_type });
      const { data } = response;
      if (response.status === 200) {
        const { token } = data.user;
        saveToken(token);
        return { username, email };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await userApi.login({ email, password });
      const data = response.data;
      if (response.status === 200) {
        saveToken(data);
        const userResponse = await userApi.me();
        const userData = userResponse.data
        console.log(userData)
        return {...data, ...userData}
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchUserBytoken = createAsyncThunk(
  'users/fetchUserByToken',
  async () => {
    try {
      const response = await userApi.me();
      if (response.status === 200) {
        const { email, username, user_type } = response.data;
        return { email, username, user_type };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);
