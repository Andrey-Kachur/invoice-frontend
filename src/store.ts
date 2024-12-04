import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import invoicesReducer from './features/Invoices/invoices.slice';

const store = configureStore({
  reducer: invoicesReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
