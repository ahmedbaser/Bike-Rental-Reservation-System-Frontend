import axios from 'axios';

export const fetchCoupons = () => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:5000/api/coupons', {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers
    },
    });
    dispatch({
      type: 'FETCH_COUPONS_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_COUPONS_FAIL',
      payload: error.message,
    });
  }
};

export const createCoupon = (couponData: any) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post('http://localhost:5000/api/coupons', couponData, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers
    },
    });
    dispatch({
      type: 'CREATE_COUPON_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_COUPON_FAIL',
      payload: error.message,
    });
  }
};

export const updateCoupon = (couponId: string, couponData: any) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`http://localhost:5000/api/coupons/${couponId}`, couponData,{
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers
    },
  });
    dispatch({
      type: 'UPDATE_COUPON_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_COUPON_FAIL',
      payload: error.message,
    });
  }
};

export const deleteCoupon = (couponId: string) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:5000/api/coupons/${couponId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token to headers
    },
    });
    dispatch({
      type: 'DELETE_COUPON_SUCCESS',
      payload: couponId,
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_COUPON_FAIL',
      payload: error.message,
    });
  }
};
