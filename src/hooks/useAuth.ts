import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { loginApi, registerApi } from "@/features/auth/authApi";
import { setAuth } from "@/features/auth/authSlice";
import {
  LoginPayload,
  RegisterPayload,
  UserInfo,
} from "@/features/auth/authTypes";

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation<{ user: UserInfo; token: string }, Error, LoginPayload>({
    mutationFn: loginApi,
    onSuccess: ({ user, token }) => {
      dispatch(setAuth({ user, token }));
    },
  });
};

export const useRegister = () => {
  const dispatch = useDispatch();
  return useMutation<{ user: UserInfo; token: string }, Error, RegisterPayload>(
    {
      mutationFn: registerApi,
      onSuccess: ({ user, token }) => {
        dispatch(setAuth({ user, token }));
      },
    }
  );
};
