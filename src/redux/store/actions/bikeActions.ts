import axios from "axios";
import { Dispatch } from "redux";

// Fetch Bikes Action
export const fetchBikes = (filter = {}) => async (dispatch: Dispatch) => {
    try {
        console.log("Fetching bikes with filter:", filter);
        const response = await axios.get('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/bikes', { params: filter });
        console.log("Bikes fetched successfully:", response.data);
        dispatch({
            type: 'FETCH_BIKES_SUCCESS',
            payload: response.data.data,
        });
    } catch (error) {
        console.error("Error fetching bikes:", error);
        if (axios.isAxiosError(error) && error.response) {
            dispatch({
                type: 'FETCH_BIKES_FAIL',
                payload: error.response.data.message || 'Error fetching bikes',
            });
        } else if (error instanceof Error) {
            dispatch({
                type: 'FETCH_BIKES_FAIL',
                payload: error.message,
            });
        } else {
            dispatch({
                type: 'FETCH_BIKES_FAIL',
                payload: 'An unknown error occurred',
            });
        }
    }
};

// Fetch Bike Details Action
export const fetchBikeDetails = (id: string) => async (dispatch: Dispatch) => {
    try {
        console.log('Starting fetchBikeDetails with ID:', id);
        const response = await axios.get(`https://bike-rental-reservation-system-backend-zeta.vercel.app/api/bikes/${id}`);
        console.log('Bike details:', response.data);
        dispatch({
            type: 'FETCH_BIKE_DETAILS_SUCCESS',
            payload: response.data.data,
        });
    } catch (error) {
        console.error('Error fetching bike details:', error);
        if (axios.isAxiosError(error) && error.response) {
            dispatch({
                type: 'FETCH_BIKE_DETAILS_FAIL',
                payload: error.response.data.message || 'Error fetching bike details',
            });
        } else if (error instanceof Error) {
            dispatch({
                type: 'FETCH_BIKE_DETAILS_FAIL',
                payload: error.message,
            });
        } else {
            dispatch({
                type: 'FETCH_BIKE_DETAILS_FAIL',
                payload: 'An unknown error occurred',
            });
        }
    }
};

// Create Bike Action
export const createBike = (bikeData: any) => async (dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/bikes', bikeData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: 'CREATE_BIKE_SUCCESS',
            payload: response.data,
        });
        return Promise.resolve();
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            dispatch({
                type: 'CREATE_BIKE_FAIL',
                payload: error.response.data.message || 'Error creating bike',
            });
        } else if (error instanceof Error) {
            dispatch({
                type: 'CREATE_BIKE_FAIL',
                payload: error.message,
            });
        } else {
            dispatch({
                type: 'CREATE_BIKE_FAIL',
                payload: 'An unknown error occurred',
            });
        }
        return Promise.reject();
    }
};

// Update Bike Action
export const updateBike = (bikeData: any) => async (dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`https://bike-rental-reservation-system-backend-zeta.vercel.app/api/bikes/${bikeData._id}`, bikeData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: 'UPDATE_BIKE_SUCCESS',
            payload: response.data.data,
        });
        return Promise.resolve();
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            dispatch({
                type: 'UPDATE_BIKE_FAIL',
                payload: error.response.data.message || 'Error updating bike',
            });
        } else if (error instanceof Error) {
            dispatch({
                type: 'UPDATE_BIKE_FAIL',
                payload: error.message,
            });
        } else {
            dispatch({
                type: 'UPDATE_BIKE_FAIL',
                payload: 'An unknown error occurred',
            });
        }
        return Promise.reject();
    }
};

// Delete Bike Action
export const deleteBike = (id: string) => async (dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://bike-rental-reservation-system-backend-zeta.vercel.app/api/bikes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch({
            type: 'DELETE_BIKE_SUCCESS',
            payload: id,
        });
        return Promise.resolve();
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            dispatch({
                type: 'DELETE_BIKE_FAIL',
                payload: error.response.data.message || 'Error deleting bike',
            });
        } else if (error instanceof Error) {
            dispatch({
                type: 'DELETE_BIKE_FAIL',
                payload: error.message,
            });
        } else {
            dispatch({
                type: 'DELETE_BIKE_FAIL',
                payload: 'An unknown error occurred',
            });
        }
        return Promise.reject();
    }
};



