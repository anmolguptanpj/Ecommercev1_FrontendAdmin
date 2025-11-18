import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// -------------------- LOGIN --------------------
export const loginUser = createAsyncThunk(
  "/login",
  async ({ email, password, loginFrom }, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", {
        email,
        password,
        loginFrom,
      });
         console.log(res.data)
      return res.data;

    } catch (err) {
      return rejectWithValue(err.response?.data || "login failed");
    }
  }
);

// -------------------- REFRESH TOKEN --------------------
export const refreshAccessToken = createAsyncThunk(
  "/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const res = await api.post("/refresh", { refreshToken });

      return res.data.accessToken; // ✔ FIXED spelling
    } catch (err) {
      return rejectWithValue("Session expired, please login again");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: (() => {
  const stored = localStorage.getItem("user");
  try {
    return stored && stored !== "undefined" ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
})(),
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },

  extraReducers: (builder) => {
    // -------------------- LOGIN HANDLERS --------------------
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
    state.loading = false;

    const user = action.payload.data.user;
    const accessToken = action.payload.data.accessToken;
    const refreshToken = action.payload.data.refreshToken;

    state.user = user;
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
    state.isAuthenticated = true;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
})


      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // -------------------- REFRESH HANDLERS --------------------
    builder
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        localStorage.setItem("accessToken", action.payload);
      })

      .addCase(refreshAccessToken.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
