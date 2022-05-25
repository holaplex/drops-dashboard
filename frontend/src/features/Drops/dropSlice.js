import { createSlice, current } from '@reduxjs/toolkit';
import { createDrop, getDrops, show, uploadMint } from './dropsActions'

export const dropSlice = createSlice({
  name: 'drop',
  initialState: {
    name: '',
    isReviewingAFinishedDrop: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    drops: [],
    nfts: [],
  },

  // Reducers
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      // state.isReviewingAFinishedDrop = false;
    },
    finishReview: (state) => {
      state.isReviewingAFinishedDrop = false;
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
    //Show
    [show.rejected]: (state, { payload }) => {
      console.log("ERROR", payload)
      state.isFetching = false;
      state.isError = true;
      state.errorMessages = [payload.message];
    },
    [show.pending]: (state) => {
      console.log("LOADING SHOW")
      state.isFetching = true;
    },
    [show.fulfilled]: (state, { payload }) => {
      console.log("PAYLOAD", payload)
      state.nfts = payload.nfts
      state.name = payload.drop_name
      state.isFetching = false;
      state.isSuccess = true;
      state.isReviewingAFinishedDrop = true;
    },
    //Get all
    [getDrops.rejected]: (state, { payload }) => {
      console.log("ERROR", payload)
      state.isFetching = false;
      state.isError = true;
      state.errorMessages = [payload.message];
    },
    [getDrops.pending]: (state) => {
      console.log("LOADING")
      state.isFetching = true;
    },
    [getDrops.fulfilled]: (state, { payload }) => {
      console.log("PAYLOAD", payload)
      state.drops = payload.drops;
      state.isFetching = false;
      // state.isSuccess = true;
    },
    //Upload mint
    [uploadMint.rejected]: (state, { payload }) => {
      console.log("ERROR", payload)
      state.isFetching = false;
      state.isError = true;
      state.errorMessages = [payload.message];
    },
    [uploadMint.pending]: (state) => {
      console.log("LOADING")
      state.isFetching = true;
    },
    [uploadMint.fulfilled]: (state, { payload }) => {
      state.drops = state.drops.map(
        drop => drop.id == payload.drop.id ? { ...drop, status: payload.drop.status } : drop
      )
      state.isFetching = false;
      state.isSuccess = true;
    },
  }
})

export const { clearState, finishReview } = dropSlice.actions;

export const dropSelector = (state) => state.drop;
