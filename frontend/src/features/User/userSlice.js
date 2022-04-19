import { createSlice } from '@reduxjs/toolkit';
import { signupUser, loginUser, fetchUserBytoken } from './userActions';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    userType: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessages: [],
  },

  // Reducers
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },

  // Extra Reducers
  extraReducers: {
    // SignUp
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.username = payload.username;
      state.userType = payload.userType
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessages = payload.messages;
    },

    // Login
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.username = payload.username;
      state.userType = payload.userType
      state.isFetching = false;
      state.isSuccess = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessages = [payload.message];
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },

    // FetchByToken
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.username = payload.username;
      state.userType = payload.userType
    },
    [fetchUserBytoken.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
