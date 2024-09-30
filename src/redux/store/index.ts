import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import couponReducer from './reducers/couponReducer';
import { bikeReducer } from './reducers/bikeReducer';
import { userReducer } from './reducers/userReducer';
import rentalReducer from './reducers/rentalReducer';

const token = localStorage.getItem('token');

const preloadedState = {
  auth: {
    isAuthenticated: !!token,
    token: token,
    user: token ? JSON.parse(localStorage.getItem('user') || 'null') : null,
    loading: false,
    error: null,
  },

  rental: {
    rentals: [],  
    unpaid: [],
    paid: [],
    loading: false,
    error: null,
  },


  coupon: {
    coupons: [],
    loading: false,
    error: null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    bike: bikeReducer,
    rental: rentalReducer,
    coupon: couponReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;






















