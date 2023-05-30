import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categorySlice';

const store = configureStore({
  reducer: {
    categoryData: categoryReducer,
  },
});

export default store;