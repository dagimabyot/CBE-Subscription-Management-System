// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "./authTypes";

// ✅ Auth slice state
interface AuthState {
  user: UserInfo | null;
  token: string | null;
}

// ✅ Payload for setAuth: separate user and token
interface AuthPayload {
  user: UserInfo;
  token: string;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthPayload>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
