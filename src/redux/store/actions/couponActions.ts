import axios from 'axios';

export const fetchCoupons = () => async (dispatch: any) => {
  dispatch({ type: 'FETCH_COUPONS_REQUEST' });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/coupons', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: 'FETCH_COUPONS_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    let errorMessage = 'Something went wrong'; 

    if (error instanceof Error) {
      errorMessage = error.message; 
    }

    dispatch({
      type: 'FETCH_COUPONS_FAIL',
      payload: errorMessage,
    });
  }
};

export const createCoupon = (couponData: any) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/coupons', couponData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: 'CREATE_COUPON_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    let errorMessage = 'Something went wrong';

    if (error instanceof Error) {
      errorMessage = error.message; 
    }

    dispatch({
      type: 'CREATE_COUPON_FAIL',
      payload: errorMessage,
    });
  }
};

export const updateCoupon = (couponId: string, couponData: any) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`https://bike-rental-reservation-system-backend-zeta.vercel.app/api/coupons/${couponId}`, couponData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: 'UPDATE_COUPON_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    let errorMessage = 'Something went wrong'; 

    if (error instanceof Error) {
      errorMessage = error.message; 
    }

    dispatch({
      type: 'UPDATE_COUPON_FAIL',
      payload: errorMessage,
    });
  }
};

export const deleteCoupon = (couponId: string) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`https://bike-rental-reservation-system-backend-zeta.vercel.app/api/coupons/${couponId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: 'DELETE_COUPON_SUCCESS',
      payload: couponId,
    });
  } catch (error) {
    let errorMessage = 'Something went wrong'; 

    if (error instanceof Error) {
      errorMessage = error.message; 
    }

    dispatch({
      type: 'DELETE_COUPON_FAIL',
      payload: errorMessage,
    });
  }
};
