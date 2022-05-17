import { createAsyncThunk } from '@reduxjs/toolkit';
import * as dropApi from './dropsApi';


export const createDrop = createAsyncThunk(
  'drop/create',
  async (formData, thunkAPI) => {
    try {
      const response = await dropApi.create(formData)

      const { data } = response;
      if (response.status === 200) {
        const { drop_name, nfts } = response.data
        return { drop_name, nfts }
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
