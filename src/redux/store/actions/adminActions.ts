import axios from "axios";
import { Dispatch } from "redux";

export const fetchAdminProfile = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/admin/profile');
        dispatch({
            type: 'FETCH_ADMIN_PROFILE_SUCCESS',
            payload: response.data,
        });
    } catch(error) {
        dispatch({
            type: 'FETCH_ADMIN_PROFILE_FAIL',
            payload: error.message,
        });
    }
};



export const updateAdminProfile = (profileData: any) => async(dispatch: Dispatch) => {
    try {
        const response = await axios.put('http://localhost:5000/api/admin/profile', profileData);
        dispatch({
            type: 'UPDATE_ADMIN_PROFILE_SUCCESS',
            payload: response.data,
        });
        return Promise.resolve();
    } catch (error) {
        dispatch({
            type: 'UPDATE_ADMIN_PROFILE_FAIL',
            payload: error.message,
        });
        return Promise.reject();
    }
}