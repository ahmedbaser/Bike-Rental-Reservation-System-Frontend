const initialState = {
    bikes: [],
    selectedBike: null,
    loading: false,
    error: null,
};

export const bikeReducer = (state = initialState, action: any) => {
  console.log("Action received:", action); 
    switch(action.type) {
        case 'FETCH_BIKES_SUCCESS':
          console.log("Bikes loaded successfully", action.payload);
    return {
        ...state,
        bikes: action.payload,
        loading: false,
        error: null,
      };
    case 'FETCH_BIKES_FAIL':
      console.error("Failed to fetch bikes:", action.payload);  
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case 'PAY_RENTAL_SUCCESS':
      return {
       ...state,
       loading: false,
       error: null,
   };

      case 'PAY_RENTAL_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
       };
      
      case 'FETCH_BIKE_DETAILS_SUCCESS':
      return {
        ...state,
        selectedBike: action.payload,
        loading: false,
        error: null,
      };
     case 'FETCH_BIKE_DETAILS_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'CREATE_BIKE_SUCCESS':
      return {
        ...state,
        bikes: [...state.bikes, action.payload],
        loading: false,
        error: null,
      };
    case 'CREATE_BIKE_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    case 'UPDATE_BIKE_SUCCESS':
      return {
        ...state,
        bikes: state.bikes.map(bike =>
        bike._id === action.payload._id ? action.payload : bike
        ),
        loading: false,
        error: null,
      };
    case 'UPDATE_BIKE_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'DELETE_BIKE_SUCCESS':
      return {
        ...state,
        bikes: state.bikes.filter(bike => bike._id !== action.payload),
        loading: false,
        error: null,
      };
    case 'DELETE_BIKE_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'LOADING_BIKES':
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};















