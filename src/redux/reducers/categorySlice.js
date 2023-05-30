import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: 'categoryData',
  initialState: {
    names: [],
  },
  reducers: {
    setData: (state, action) => {
      if (!state.names.includes(action.payload)) {
        state.names.push(action.payload);
      }
    },
  },
});

export const { setData } = categorySlice.actions;
export default categorySlice.reducer;