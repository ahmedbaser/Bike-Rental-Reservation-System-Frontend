import axios from "axios";
import { Dispatch } from "redux";

export const fetchAdminProfile = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/admin/profile');
        dispatch({
            type: 'FETCH_ADMIN_PROFILE_SUCCESS',
            payload: response.data,
        });
    } catch (error: Error | any) { 
        dispatch({
            type: 'FETCH_ADMIN_PROFILE_FAIL',
            payload: error.message || 'An error occurred while fetching the profile',
        });
    }
};

export const updateAdminProfile = (profileData: any) => async(dispatch: Dispatch) => {
    try {
        const response = await axios.put('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/admin/profile', profileData);
        dispatch({
            type: 'UPDATE_ADMIN_PROFILE_SUCCESS',
            payload: response.data,
        });
        return Promise.resolve();
    } catch (error: Error | any) { 
        dispatch({
            type: 'UPDATE_ADMIN_PROFILE_FAIL',
            payload: error.message || 'An error occurred while updating the profile',
        });
        return Promise.reject();
    }
};
