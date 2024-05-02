// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_BASE_URL;  // Using environment variable

// Define a thunk for handling the login process
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to login');

      // Extract user details and store them in local storage
      const userData = {
        token: data.token,
        username: data.username.username,
        email: data.username.email,
        id: data.username._id
      };

      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the initial state based on local storage to determine if the user is logged in
const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  isLoggedIn: !!localStorage.getItem('user'),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      localStorage.removeItem('user');
      state.user = null;
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isLoggedIn = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
