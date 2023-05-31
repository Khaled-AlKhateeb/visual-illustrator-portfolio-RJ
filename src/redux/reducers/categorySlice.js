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
    deleteImage: (state, action) => {
      const { categoryName, imageName } = action.payload;
      console.log(state.names, categoryName);
      const categoryIndex = state.names.findIndex((item) => item.name === categoryName);
      if (categoryIndex !== -1) {
        const imageIndex = state.names[categoryIndex].images.findIndex((image) => image.name === imageName);
        if (imageIndex !== -1) {
          state.names[categoryIndex].images.splice(imageIndex, 1);
        }
      }
    },
  },
});

export const { setData, deleteImage } = categorySlice.actions;
export default categorySlice.reducer;