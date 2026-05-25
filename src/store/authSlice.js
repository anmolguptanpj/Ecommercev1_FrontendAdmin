import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, loginFrom }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/login",
        { email, password, loginFrom },
        { withCredentials: true }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message || "Login failed"
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/me", { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message || "Unauthorized"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      return true;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err?.message || "Logout failed"
      );
    }
  }
);

const initialState = {
  user: null,
  extraDetails: null,
  loading: false,
  authChecking: true,
  error: null,
  isAuthenticated: false,
};

const resetAuth = (state) => {
  state.user = null;
  state.extraDetails = null;
  state.isAuthenticated = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: resetAuth,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.extraDetails = action.payload.data.extraDetails || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        resetAuth(state);
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.authChecking = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.authChecking = false;
        state.user = action.payload.data.user;
        state.extraDetails = action.payload.data.extraDetails || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.authChecking = false;
        resetAuth(state);
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        resetAuth(state);
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
