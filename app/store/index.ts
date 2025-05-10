import filterReducer from '@/app/store/slice/filterValueSlice';
import authReducer from '@/app/store/slice/userSlice';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
