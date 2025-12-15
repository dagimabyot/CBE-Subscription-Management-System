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
}
