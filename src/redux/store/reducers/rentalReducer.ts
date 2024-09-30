import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Rental interface
export interface Rental {
  _id: string;
  bikeId: string;
  name: string;
  startTime: string;
  returnTime?: string;
  totalCost?: number;
  advancePayment: number;
  isPaid: boolean; 
  isReturned: boolean; 
}

export interface RentalState {
  rentals: Rental[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: RentalState = {
  rentals: [],
  loading: false,
  error: null,
};

// Rental Slice using createSlice
const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    // Rental Request Action
    rentalRequest(state) {
      state.loading = true;
    },

    // Rental Success Action
    rentalSuccess(state, action: PayloadAction<Rental[]>) {
      state.loading = false;
      state.rentals = action.payload;
      state.error = null;
    },

    // Rental Fail Action
    rentalFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Return Bike Request Action
    returnBikeRequest(state) {
      state.loading = true;
    },

// Return Bike Success Action
returnBikeSuccess(state, action: PayloadAction<Rental>) {
  state.loading = false;
  state.rentals = state.rentals.map((rental) =>
    rental._id === action.payload._id
      ? {
          ...rental,
          totalCost: action.payload.totalCost, 
          isReturned: true, 
          isPaid: false, 
        }
      : rental
  );
  state.error = null;
},

    // Return Bike Fail Action
    returnBikeFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Pay Rental Success Action
    payRentalSuccess(state, action: PayloadAction<{ rentalId: string; totalCost: number }>) {
      state.loading = false;
      const { rentalId, totalCost } = action.payload;
      state.rentals = state.rentals.map(rental =>
        rental._id === rentalId ? { ...rental, isPaid: false, totalCost } : rental
      );
      state.error = null;
    },

    // Pay Rental Fail Action
    payRentalFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch Rentals Success Action
    fetchRentalsSuccess(state, action: PayloadAction<Rental[]>) {
      state.loading = false;
      state.rentals = action.payload;
      state.error = null;
    },

    // Fetch Rentals Fail Action
    fetchRentalsFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch All Rentals Success Action
    fetchAllRentalsSuccess(state, action: PayloadAction<Rental[]>) {
      state.loading = false;
      state.rentals = action.payload;
      state.error = null;
    },

    // Fetch All Rentals Fail Action
    fetchAllRentalsFail(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions
export const {
  rentalRequest,
  rentalSuccess,
  rentalFail,
  returnBikeRequest,
  returnBikeSuccess,
  returnBikeFail,
  payRentalSuccess,
  payRentalFail,
  fetchRentalsSuccess,
  fetchRentalsFail,
  fetchAllRentalsSuccess,
  fetchAllRentalsFail,
} = rentalSlice.actions;

// Export the reducer
export default rentalSlice.reducer;












