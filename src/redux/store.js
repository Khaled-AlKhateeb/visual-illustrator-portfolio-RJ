import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categorySlice';

const root = {
  categoryData: categoryReducer,
};

const customizableMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
  reducer: root,
  middleware: customizableMiddleware,
});

export default store;