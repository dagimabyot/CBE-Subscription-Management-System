export interface AuthState {
  user: UserInfo | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface UserInfo {
  email: string;
  role: string[];
  firstName: string;
  lastName: string;
  accountStatus?: "active" | "pending_verification" | "suspended";
  createdDate?: string;
  lastLogin?: string;
  emailVerified?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserInfo;
  token: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  phone?: string;
  branch: string;
  department: string;
  role: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  emailVerificationPending?: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  resetTokenSent: boolean;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export interface EmailVerificationPayload {
  email: string;
  verificationCode: string;
}

export interface EmailVerificationResponse {
  message: string;
  emailVerified: boolean;
}
