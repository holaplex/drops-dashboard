import { createSlice, current } from '@reduxjs/toolkit';
import { submit, publish, createDrop, getDrops, show, update, uploadMint } from './dropsActions'

export const dropSlice = createSlice({
  name: 'drop',
  initialState: {
    id: '',
    name: '',
    goLiveDate: '',
    accessible: '',
    discoverable: '',
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
      state.id = payload.drop_id
      state.isFetching = false;
      state.isSuccess = true;
    },
    //Submit
    [submit.rejected]: (state, { payload }) => {
      console.log("ERROR", payload)
      state.isFetching = false;
      state.isError = true;
      state.errorMessages = [payload.message];
    },
    [submit.pending]: (state) => {
      console.log("LOADING SUBMIT")
      state.isFetching = true;
    },
    [submit.fulfilled]: (state, { payload }) => {
      console.log("PAYLOAD SUBMIT", payload)
      state.isFetching = false;
      state.isSuccess = true;
    },
    //Publish
    [publish.rejected]: (state, { payload }) => {
      console.log("ERROR", payload)
      state.isFetching = false;
      state.isError = true;
      state.errorMessages = [payload.message];
    },
    [publish.pending]: (state) => {
      console.log("LOADING PUBLISH")
      state.isFetching = true;
    },
    [publish.fulfilled]: (state, { payload }) => {
      console.log("PAYLOAD PUBLISH", payload)
      state.isFetching = false;
      state.isSuccess = true;
    },
    //Update
    [update.rejected]: (state, { payload }) => {
      console.log("ERROR", payload)
      state.isFetching = false;
      state.isError = true;
      state.errorMessages = [payload.message];
    },
    [update.pending]: (state) => {
      console.log("LOADING SHOW")
      state.isFetching = true;
    },
    [update.fulfilled]: (state, { payload }) => {
      console.log("PAYLOAD", payload)
      state.nfts = payload.drop.nft
      state.name = payload.drop.name
      state.discoverable = payload.drop.discoverable
      state.accessible = payload.drop.accessible
      state.goLiveDate = payload.drop.go_live_date
      state.isFetching = false;
      state.isSuccess = true;
      state.isReviewingAFinishedDrop = true;
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
      state.nfts = payload.drop.nft
      state.name = payload.drop.name
      state.discoverable = payload.drop.discoverable
      state.accessible = payload.drop.accessible
      state.goLiveDate = payload.drop.go_live_date
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
