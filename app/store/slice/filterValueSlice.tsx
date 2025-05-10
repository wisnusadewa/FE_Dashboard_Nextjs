import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterValueProps {
  value: string | null;
}

const initialState: FilterValueProps = {
  value: null,
};

export const filterValue = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setValueFilter: (state, action: PayloadAction<{ value: string }>) => {
      state.value = action.payload.value;
    },
  },
});

export const { setValueFilter } = filterValue.actions;
export default filterValue.reducer;
