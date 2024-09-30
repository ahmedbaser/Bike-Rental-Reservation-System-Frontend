interface UserProfile {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  }
  
  interface Action {
    type: string;
    payload?: any; 
  }
  
  interface UserState {
    name: string;
    email: string;
    phone: string;
    address: string;
    error: string | null;
    users: UserProfile[];  
    loading: boolean;
  }
  
  const initialState: UserState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    error: null,
    users: [],  
    loading: false,
  };
  
  export const userReducer = (state = initialState, action: Action): UserState => {
    switch (action.type) {
      // User profile update cases
      case 'USER_UPDATE_PROFILE_SUCCESS':
        return {
          ...state,
          ...action.payload,  
          error: null,
        };
  
      case 'USER_UPDATE_PROFILE_FAIL':
        return {
          ...state,
          error: action.payload || 'Profile update failed',  
        };
  
      // Admin fetch users cases
      case 'FETCH_USERS_SUCCESS':
        return {
          ...state,
          users: action.payload || [],  
          loading: false,
          error: null,
        };
  
      case 'FETCH_USERS_FAIL':
        return {
          ...state,
          loading: false,
          error: action.payload || 'Failed to fetch users',  
        };
  
      // Admin delete user cases
      case 'DELETE_USER_SUCCESS':
        return {
          ...state,
          users: state.users.filter(user => user._id !== action.payload),  
          error: null,
        };
  
      case 'DELETE_USER_FAIL':
        return {
          ...state,
          error: action.payload || 'Failed to delete user',  
        };
  
      // Admin promote user cases
      case 'PROMOTE_USER_SUCCESS':
        return {
          ...state,
          users: state.users.map(user => 
            user._id === action.payload?._id ? action.payload : user  
          ),
          error: null,
        };
  
      case 'PROMOTE_USER_FAIL':
        return {
          ...state,
          error: action.payload || 'Failed to promote user',  
        };
  
      // Loading state for any async actions
      case 'LOADING_USERS':
        return {
          ...state,
          loading: true,
        };
  
      default:
        return state;
    }
  };
  






