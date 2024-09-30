import axios from "axios";
import { Dispatch } from "redux";
import { UserData } from "../../../model/model";
import { RootState } from "../index";

// User Profile Update Action (User Dashboard)
export const updateUserProfile = (userData: UserData) => async(dispatch: Dispatch, getState: () => RootState) => {
    try {
        const token = getState().auth.token;
        console.log("Token", token);
       
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
      
        const response = await axios.put('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/users/profile', userData, config);
        dispatch({
            type: 'USER_UPDATE_PROFILE_SUCCESS',
            payload: response.data,
        });

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data.message) {
            dispatch({
                type: 'USER_UPDATE_PROFILE_FAIL',
                payload: error.response?.data.message || 'An error occurred while updating profile',
            });
        } else if (error instanceof Error) {
            dispatch({
                type: 'USER_UPDATE_PROFILE_FAIL',
                payload: error.message,
            });
        } else {
            dispatch({
                type: 'USER_UPDATE_PROFILE_FAIL',
                payload: 'An unknown error occurred',
            });
        }

        throw error;
    }
};

// Fetch Users Action (Admin Pages)
export const fetchUsers = () => async (dispatch: any, getState: () => RootState) => {
    dispatch({ type: 'LOADING_USERS' });
    try {
        const token = getState().auth.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get('https://bike-rental-reservation-system-backend-zeta.vercel.app/api/users/all', config);
        dispatch({
            type: 'FETCH_USERS_SUCCESS',
            payload: response.data.data,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch({
                type: 'FETCH_USERS_FAIL',
                payload: error.response?.data.message || error.message,
            });
        } else if (error instanceof Error) {
            dispatch({
                type: 'FETCH_USERS_FAIL',
                payload: error.message,
            });
        } else {
            dispatch({
                type: 'FETCH_USERS_FAIL',
                payload: 'An unknown error occurred',
            });
        }
    }
};

// Delete User Action (Admin Pages)
export const deleteUser = (id: string) => async (dispatch: any, getState: () => RootState) => {
    try {
        const token = getState().auth.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios.delete(`https://bike-rental-reservation-system-backend-zeta.vercel.app/api/users/${id}`, config);
        dispatch({
            type: 'DELETE_USER_SUCCESS',
            payload: id,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch({
                type: 'DELETE_USER_FAIL',
                payload: error.response?.data.message || error.message,
            });
        } else if (error instanceof Error) {
            dispatch({
                type: 'DELETE_USER_FAIL',
                payload: error.message,
            });
        } else {
            dispatch({
                type: 'DELETE_USER_FAIL',
                payload: 'An unknown error occurred',
            });
        }
    }
};

// Promote User to Admin Action (Admin Pages)
export const promoteToAdmin = (id: string) => async (dispatch: any, getState: () => RootState) => {
    try {
        const token = getState().auth.token;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.patch(`https://bike-rental-reservation-system-backend-zeta.vercel.app/api/users/promote/${id}`, {}, config);
        dispatch({
            type: 'PROMOTE_USER_SUCCESS',
            payload: response.data.data,
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            dispatch({
                type: 'PROMOTE_USER_FAIL',
                payload: error.response?.data.message || error.message,
            });
        } else if (error instanceof Error) {
            dispatch({
                type: 'PROMOTE_USER_FAIL',
                payload: error.message,
            });
        } else {
            dispatch({
                type: 'PROMOTE_USER_FAIL',
                payload: 'An unknown error occurred',
            });
        }
    }
};


