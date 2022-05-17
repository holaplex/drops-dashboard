import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../features/User/userSlice';
import { dropSlice } from '../features/Drops/dropSlice';
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    drop: dropSlice.reducer
  },
});
