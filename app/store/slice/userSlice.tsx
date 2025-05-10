import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserStateReduxProps = {
  role: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRedux: (state, action: PayloadAction<{ role: string; token: string }>) => {
      state.role = action.payload.role;
      state.token = action.payload.token;
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('token', action.payload.token);
    },

    logoutRedux: (state) => {
      state.role = null;
      state.token = null;
      localStorage.removeItem('role');
      localStorage.removeItem('token');
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
