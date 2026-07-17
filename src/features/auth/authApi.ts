import apiClient from "@/api/apiClient";
import {
  LoginPayload,
  RegisterPayload,
  UserInfo,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  EmailVerificationPayload,
} from "./authTypes";

// Login API
export const loginApi = async (
  payload: LoginPayload
): Promise<{ user: UserInfo; token: string }> => {
  const { data } = await apiClient.get("/users", {
    params: { email: payload.email, password: payload.password },
  });
  if (!data.length) throw new Error("Invalid email or password");
  const user = data[0];
  return { user, token: user.token };
};

// Register API
export const registerApi = async (
  payload: RegisterPayload
): Promise<{ user: UserInfo; token: string }> => {
  const { data } = await apiClient.post("/users", payload);
  const user = data;
  return { user, token: user.token };
};

// Forgot Password API
export const forgotPasswordApi = async (
  payload: ForgotPasswordPayload
): Promise<{ message: string; resetTokenSent: boolean }> => {
  const { data } = await apiClient.post("/auth/forgot-password", payload);
  return data;
};

// Reset Password API
export const resetPasswordApi = async (
  payload: ResetPasswordPayload
): Promise<{ message: string; success: boolean }> => {
  const { data } = await apiClient.post("/auth/reset-password", payload);
  return data;
};

// Email Verification API
export const verifyEmailApi = async (
  payload: EmailVerificationPayload
): Promise<{ message: string; emailVerified: boolean }> => {
  const { data } = await apiClient.post("/auth/verify-email", payload);
  return data;
};

// Resend Verification Email API
export const resendVerificationEmailApi = async (
  email: string
): Promise<{ message: string; sent: boolean }> => {
  const { data } = await apiClient.post("/auth/resend-verification", { email });
  return data;
};
