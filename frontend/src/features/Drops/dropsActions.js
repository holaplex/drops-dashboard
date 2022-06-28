import { createAsyncThunk } from '@reduxjs/toolkit';
import * as dropApi from './dropsApi';
import axios from 'axios'
import { CAMPUS_API } from '../../helpers/requestHelper'

export const submit = createAsyncThunk(
  'drop/submit',
  async (drop_id, thunkAPI) => {
    try {
      const response = await dropApi.submit(drop_id)

      const { data } = response;
      if (response.status === 200) {
        const { success } = response.data
        return { success }
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
)

export const publish = createAsyncThunk(
  'drop/publish',
  async (drop_id, thunkAPI) => {
    try {
      const response = await dropApi.publish(drop_id)

      const { data } = response;
      if (response.status === 200) {
        const { success, drop_name, nfts } = response.data

        const res = await axios.post(`${CAMPUS_API}/publish`, {
          drop_name,
          nfts
        })
        return { success, res: res.data }
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
)

export const createDrop = createAsyncThunk(
  'drop/create',
  async (formData, thunkAPI) => {
    try {
      const response = await dropApi.create(formData)

      const { data } = response;
      if (response.status === 200) {
        const { drop_id, drop_name, nfts } = response.data
        return { drop_id, drop_name, nfts }
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getDrops = createAsyncThunk(
  'drops',
  async (thunkAPI) => {
    try {
      const response = await dropApi.index()

      const { data } = response;
      if (response.status === 200) {
        const { drops } = response.data
        return { drops }
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
)

export const show = createAsyncThunk(
  'drops/drop',
  async (drop_id, thunkAPI) => {
    try {
      const response = await dropApi.show(drop_id)
      const { data } = response
      if (response.status === 200) {
        const { drop_name, nfts, schools, conferences } = response.data
        return { drop_name, nfts, schools, conferences }
      }
      else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }

  }
)

export const uploadMint = createAsyncThunk(
  'upload/minted',
  async (formData, thunkAPI) => {
    try {
      const response = await dropApi.uploadMint(formData)

      const { data } = response;
      if (response.status === 200) {
        const { drop } = response.data
        return { drop }
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
)
