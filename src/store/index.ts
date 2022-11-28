import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from '../features/countries/countriesSlice';
import countrySlice from '../features/country/countrySlice';
import userSlice from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    countries: countriesSlice,
    country: countrySlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
