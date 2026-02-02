import { createSlice } from "@reduxjs/toolkit";
import { rolePermissions } from "../utils/rolePermissions";

// Load saved user from storage
let savedUser = null;

try {
  const rawUser = localStorage.getItem("user");
  savedUser = rawUser ? JSON.parse(rawUser) : null;
} catch (err) {
  console.error("Failed to parse saved user:", err);
  savedUser = null;
  localStorage.removeItem("user");
}

const initialState = {
  user: savedUser,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  permissions: savedUser?.role ? rolePermissions[savedUser.role] || [] : [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const user = action.payload.user;
      const token = action.payload.token;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.permissions = rolePermissions[user.role] || [];

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.permissions = [];

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    updateUserRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload;
        state.permissions = rolePermissions[action.payload] || [];
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { loginSuccess, logout, updateUserRole } = authSlice.actions;
export default authSlice.reducer;
