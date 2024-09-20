const initialState = {
    profile: null,
  };
  
  export const adminReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'FETCH_ADMIN_PROFILE_SUCCESS':
        return {
          ...state,
          profile: action.payload,
        };
      case 'UPDATE_ADMIN_PROFILE_SUCCESS':
        return {
          ...state,
          profile: {
            ...state.profile,
            ...action.payload,
          },
        };
      case 'FETCH_ADMIN_PROFILE_FAIL':
      case 'UPDATE_ADMIN_PROFILE_FAIL':
        return state;
      default:
        return state;
    }
  };
  