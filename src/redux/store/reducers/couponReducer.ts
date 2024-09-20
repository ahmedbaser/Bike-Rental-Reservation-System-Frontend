const initialState = {
    coupons: [],
    loading: false,
    error: null,
  };
  
  const couponReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'FETCH_COUPONS_SUCCESS':
        return {
          ...state,
          coupons: action.payload,
        };
      case 'FETCH_COUPONS_FAIL':
        return {
          ...state,
          error: action.payload,
        };
      case 'CREATE_COUPON_SUCCESS':
        return {
          ...state,
          coupons: [...state.coupons, action.payload],
        };
      case 'CREATE_COUPON_FAIL':
        return {
          ...state,
          error: action.payload,
        };
      case 'UPDATE_COUPON_SUCCESS':
        return {
          ...state,
          coupons: state.coupons.map((coupon) =>
            coupon._id === action.payload._id ? action.payload : coupon
          ),
        };
      case 'UPDATE_COUPON_FAIL':
        return {
          ...state,
          error: action.payload,
        };
      case 'DELETE_COUPON_SUCCESS':
        return {
          ...state,
          coupons: state.coupons.filter((coupon) => coupon._id !== action.payload),
        };
      case 'DELETE_COUPON_FAIL':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default couponReducer;
  