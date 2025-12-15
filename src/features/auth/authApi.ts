import apiClient from "@/api/apiClient";
import { LoginPayload, RegisterPayload, UserInfo } from "./authTypes";

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
