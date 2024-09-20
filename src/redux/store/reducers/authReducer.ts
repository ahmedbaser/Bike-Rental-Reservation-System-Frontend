import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "../actions/authActions";
import { LoginResponse, SignUpResponse } from "../../../model/model";

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        role?: string;
    } | null;
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        // Handle signup
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signupUser.fulfilled, (state, action: PayloadAction<SignUpResponse>) => { 
            state.loading = false;
            state.isAuthenticated = true;
            state.token = null; 
            state.user = {
                _id: action.payload.data._id,
                name: action.payload.data.name,
                email: action.payload.data.email,
                phone: action.payload.data.phone,
                address: action.payload.data.address,
                role: action.payload.data.role,
                
            };
        });

        builder.addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong during signup.";
        });

        // Handle login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.data));
            state.user = {
                _id: action.payload.data._id,
                name: action.payload.data.name,
                email: action.payload.data.email,
                phone: action.payload.data.phone,
                address: action.payload.data.address,
                role: action.payload.data.role,
            };
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something went wrong during login.";
        });
    },
});

// Export the logout action
export const { logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;





















