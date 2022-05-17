import { createSlice } from '@reduxjs/toolkit';
import { createDrop } from './dropsActions'

export const dropSlice = createSlice({
  name: 'drop',
  initialState: {
    name: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    nfts: [],
  },

  // Reducers
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },
  extraReducers: {
    //Create 
    [createDrop.rejected]: (state, { payload }) => {
      console.log("ERROR", payload)
      state.isFetching = false;
      state.isError = true;
      state.errorMessages = [payload.message];
    },
    [createDrop.pending]: (state) => {
      console.log("LOADING")
      state.isFetching = true;
    },
    [createDrop.fulfilled]: (state, { payload }) => {
      console.log("PAYLOAD", payload)
      state.nfts = payload.nfts
      state.name = payload.drop_name
      state.isFetching = false;
      state.isSuccess = true;
    },
  }
})

export const { clearState } = dropSlice.actions;

export const dropSelector = (state) => state.drop;
