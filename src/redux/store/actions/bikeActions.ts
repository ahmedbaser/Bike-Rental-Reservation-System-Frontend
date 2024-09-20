import axios from "axios";
import { Dispatch } from "redux";

export const fetchBikes = (filter = {}) => async (dispatch: Dispatch) => {
    try {
        console.log("Fetching bikes with filter:", filter)
        const response = await axios.get('http://localhost:5000/api/bikes', {params: filter});
        console.log("Bikes fetched successfully:", response.data)
        dispatch({
            type: 'FETCH_BIKES_SUCCESS',
            payload: response.data.data,
        });
    } catch(error) {
        console.error("Error fetching bikes:", error);
        dispatch({
            type: 'FETCH_BIKES_FAIL',
            payload: error.message,
        });
    }
};


export const fetchBikeDetails = (id: string) => async (dispatch: Dispatch) => {
    try {
        console.log('Starting fetchBikeDetails with ID:', id);
        const response = await axios.get(`http://localhost:5000/api/bikes/${id}`);
        console.log('Bike details:', response.data); 
        dispatch({
            type: 'FETCH_BIKE_DETAILS_SUCCESS',
            payload: response.data.data, 
        });
    } catch (error) {
        console.error('Error fetching bike details:', error);
        dispatch({
            type: 'FETCH_BIKE_DETAILS_FAIL',
            payload: error.message,
        });
    }
};



export const createBike = (bikeData: any) => async(dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post('http://localhost:5000/api/bikes', bikeData, {
           
            headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
            },
        });
        dispatch({
            type: 'CREATE_BIKE_SUCCESS',
            payload: response.data,
        });
        return Promise.resolve();
    } catch(error) {
        dispatch({
            type: 'CREATE_BIKE_FAIL',
            payload: error.message,  
        });
        return Promise.reject();
    }
};

export const updateBike = (bikeData: any) => async (dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.put(`http://localhost:5000/api/bikes/${bikeData._id}`, bikeData, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
            },
        });
        dispatch({
            type: 'UPDATE_BIKE_SUCCESS',
            payload: response.data.data, 
        });
        return Promise.resolve();

    } catch(error) {
        dispatch({
            type: 'UPDATE_BIKE_FAIL',
            payload: error.message, 
        });
        return Promise.reject();
    }
};

export const deleteBike = (id: string) => async(dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem('token')
        await axios.delete(`http://localhost:5000/api/bikes/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to headers
            },
        });
        dispatch({
            type: 'DELETE_BIKE_SUCCESS',
            payload: id,
        }); 
        return Promise.resolve();
    } catch(error) {
        dispatch({
            type: 'DELETE_BIKE_FAIL',
            payload: error.message,
          });
          return Promise.reject();
    }
};





