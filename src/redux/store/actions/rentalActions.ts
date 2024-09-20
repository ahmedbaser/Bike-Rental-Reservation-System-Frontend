import axios from "axios";
import { Dispatch } from "redux";
import { RentalActionTypes } from "../../types/rentalTypes";
import { RootState } from "..";


// User Dashboard (Protected Routes)
// Book a bike (for users)

export const bookBike = (bikeId: string, startTime: string, advancePayment: number) => async (dispatch: Dispatch<RentalActionTypes>, getState: () => RootState) => {
  const token = getState().auth.token;

  try {
    const response = await axios.post('http://localhost:5000/api/rentals/book', 
      { bikeId, startTime, advancePayment },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    console.log("API Response:", response.data);

    if (response.data.success) {
  
      const rental = {
        ...response.data.data,
        bikeName: response.data.data.bikeName || 'Unknown Bike',  // Fallback for safety
      };

      dispatch({
        type: 'BOOK_BIKE_SUCCESS',
        payload: rental,
      });

      return rental; 
    } else {
      throw new Error(response.data.message || 'Booking failed');
    }
  } catch (error) {
    console.error("Error booking bike:", error);

    dispatch({
      type: 'BOOK_BIKE_FAIL',
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
    const response = await axios.post(`http://localhost:5000/api/rentals/pay/${rentalId}`, {},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response:", response.data);
    dispatch({
      type: 'PAY_RENTAL_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'PAY_RENTAL_FAIL',
      payload: error.message,
    });
  }
};


export const fetchUserRentals = () => async (dispatch: Dispatch<RentalActionTypes>) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('http://localhost:5000/api/rentals', {
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
      dispatch({
        type: 'FETCH_RENTALS_FAIL',
        payload: error.message,
      });
    }
  };


// Fetch all rentals (for admins)
export const fetchAllRentals = () => async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem('token')
        const response = await axios.get('http://localhost:5000/api/rentals', {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
        },
        });
         dispatch({
            type: 'FETCH_ALL_RENTALS_SUCCESS',
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_ALL_RENTALS_FAIL',
            payload: error.message,
        });
    }
};

// Return a bike (for admins)
export const returnBike = (rentalId: string, data: { endTime: string; totalCost: number }) => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`http://localhost:5000/api/rentals/return/${rentalId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    dispatch({
      type: 'RETURN_BIKE_SUCCESS',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'RETURN_BIKE_FAIL',
      payload: error.message,
    });
  }
};




