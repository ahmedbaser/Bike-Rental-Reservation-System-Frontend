import axios from "axios";
import { Dispatch } from "redux";
import { RentalActionTypes, Rental } from "../../types/rentalTypes";
import { RootState } from "..";




// Book a bike action
export const bookBike = (bikeId: string, startTime: string, advancePayment: number) => async (dispatch: Dispatch<RentalActionTypes>,getState: () => RootState
) => {
  const token = getState().auth.token;

  try {
    dispatch({ type: 'RENTAL_REQUEST' });

    const response = await axios.post(
      'https://bike-rental-reservation-system-backend-zeta.vercel.app/api/rentals/book',
      { bikeId, startTime, advancePayment },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    const rental: Rental = {
      ...response.data.data,
      bikeName: response.data.data.bikeName || 'Unknown Bike', 
    };

    dispatch({
      type: 'RENTAL_SUCCESS',
      payload: [rental],
    });

    return rental;
  } catch (error: any) {
    dispatch({
      type: 'RENTAL_FAIL',
      payload: error.message,
    });

    throw error;
  }
};





export const payForRental = (rentalId: string) => async (dispatch: Dispatch<RentalActionTypes>) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.post(`https://bike-rental-reservation-system-backend-zeta.vercel.app/api/rentals/pay/${rentalId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      console.log("API Response:", response.data);
      
      dispatch({
        type: 'PAY_RENTAL_SUCCESS',
        payload: { rentalId, isPaid: false, totalCost: response.data.totalCost },  
      });
    }
  } catch (error) {
    const errorMessage = (error as Error).message || 'An unknown error occurred';

    dispatch({
      type: 'PAY_RENTAL_FAIL',
      payload: errorMessage,
    });
  }
};



export const fetchUserRentals = () => async (dispatch: Dispatch<RentalActionTypes>) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/rentals', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      });
      console.log("API Response:", response.data);
      dispatch({
        type: 'FETCH_RENTALS_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';

      dispatch({
        type: 'FETCH_RENTALS_FAIL',
        payload: errorMessage,
      });
    }
  };


// Fetch all rentals (for admins)
export const fetchAllRentals = () => async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem('token')
        const response = await axios.get('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/rentals', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
        },
        });
         dispatch({
            type: 'FETCH_ALL_RENTALS_SUCCESS',
            payload: response.data.data,
        });
    } catch (error: any) {
        dispatch({
            type: 'FETCH_ALL_RENTALS_FAIL',
            payload: error.message,
        });
    }
};


// // Return a bike action
export const returnBike = (rentalId: string, data: { returnTime: string; totalCost: number }) => async (
  dispatch: Dispatch<RentalActionTypes>
) => {
  try {
    dispatch({ type: 'RETURN_BIKE_REQUEST' });

    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `https://bike-rental-reservation-system-backend-zeta.vercel.app/api/rentals/return/${rentalId}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({
      type: 'RETURN_BIKE_SUCCESS',
      payload: response.data.data,
    });

  } catch (error: any) {
    dispatch({
      type: 'RETURN_BIKE_FAIL',
      payload: error.message,
    });
  }
};

