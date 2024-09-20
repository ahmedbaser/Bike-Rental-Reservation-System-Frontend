import axios from "axios";
import { Dispatch } from "redux";
import { UserData } from "../../../model/model";
import { RootState } from "../index";

// User Profile Update Action (User Dashboard)
export const updateUserProfile = (userData: UserData) => async(dispatch: Dispatch, getState: () => RootState) => {
    try {
        const token = getState().auth.token;
        console.log("Token", token)
       
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
      
        const response = await axios.put('http://localhost:5000/api/users/profile', userData, config);
        dispatch({
            type: 'USER_UPDATE_PROFILE_SUCCESS',
            payload: response.data,
        });

    } catch(error) {
        if(axios.isAxiosError(error) && error.message) {
            dispatch({
                type: 'USER_UPDATE_PROFILE_FAIL',
                payload: error.response?.data.message || error.message,
            });
        } else {
            dispatch({
                type: 'USER_UPDATE_PROFILE_FAIL',
                payload: error instanceof Error ? error.message : 'An unknown error occurred',
            });
        }

      throw error;
  }
};


export const fetchUsers = () => async (dispatch: any, getState: () => RootState) => {
    dispatch({ type: 'LOADING_USERS' });  // Loading state before fetching users
    try {
        const token = getState().auth.token;  // Get the token from auth state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get('http://localhost:5000/api/users/all', config);
        dispatch({
            type: 'FETCH_USERS_SUCCESS',
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: 'FETCH_USERS_FAIL',
            payload: error.message,
        });
    }
};






// Delete User Action (Admin Pages)
export const deleteUser = (id: string) => async (dispatch: any, getState: () => RootState) => {
    try {
        const token = getState().auth.token;  // Get the token from auth state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios.delete(`http://localhost:5000/api/users/${id}`, config);
        dispatch({
            type: 'DELETE_USER_SUCCESS',
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: 'DELETE_USER_FAIL',
            payload: error.message,
        });
    }
};


// Promote User to Admin Action (Admin Pages)

export const promoteToAdmin = (id: string) => async (dispatch: any, getState: () => RootState) => {
    try {
        const token = getState().auth.token;  // Get the token from auth state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.patch(`http://localhost:5000/api/users/promote/${id}`, {}, config);
        dispatch({
            type: 'PROMOTE_USER_SUCCESS',
            payload: response.data.data,
        });
    } catch (error) {
        dispatch({
            type: 'PROMOTE_USER_FAIL',
            payload: error.message,
        });
    }
};




