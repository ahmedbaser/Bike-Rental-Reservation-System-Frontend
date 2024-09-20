import { RentalState, RentalActionTypes, Rental } from "../../types/rentalTypes";

const initialState: RentalState = {
  unpaid: [],
  paid: [],
};

export const rentalReducer = (
  state: RentalState = initialState,
  action: RentalActionTypes
): RentalState => {
  switch (action.type) {
    case 'BOOK_BIKE_SUCCESS':
        console.log('Updated State:', {
            ...state,
            unpaid: [...state.unpaid, action.payload], 
        });
      return {
        ...state,
        unpaid: [...state.unpaid, action.payload],
      };
      
    case 'FETCH_RENTALS_SUCCESS':
      return {
        ...state,
        unpaid: action.payload.data.filter((rental: Rental) => !rental.isPaid),
        paid: action.payload.data.filter((rental: Rental) => rental.isPaid),
      };
      
    case 'PAY_RENTAL_SUCCESS':
      return {
        ...state,
        unpaid: state.unpaid.filter(
          (rental) => rental._id !== action.payload._id
        ),
        paid: [...state.paid, action.payload],
      };

    case 'RETURN_BIKE_SUCCESS': 
      return {
        ...state,
        unpaid: state.unpaid.filter(
          (rental) => rental._id !== action.payload._id
        ),
        paid: [...state.paid, action.payload], 
      };
      
    case 'FETCH_RENTALS_FAIL':
    case 'BOOK_BIKE_FAIL':
    case 'PAY_RENTAL_FAIL':
    case 'RETURN_BIKE_FAIL':
     return state;
     
    default:
      return state;
  }
};

