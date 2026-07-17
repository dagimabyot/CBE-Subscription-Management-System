import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  loginApi,
  registerApi,
  forgotPasswordApi,
  resetPasswordApi,
  verifyEmailApi,
  resendVerificationEmailApi,
} from "@/features/auth/authApi";
import { setAuth } from "@/features/auth/authSlice";
import {
  LoginPayload,
  RegisterPayload,
  UserInfo,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  EmailVerificationPayload,
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

export const useForgotPassword = () => {
  return useMutation<
    { message: string; resetTokenSent: boolean },
    Error,
    ForgotPasswordPayload
  >({
    mutationFn: forgotPasswordApi,
  });
};

export const useResetPassword = () => {
  return useMutation<
    { message: string; success: boolean },
    Error,
    ResetPasswordPayload
  >({
    mutationFn: resetPasswordApi,
  });
};

export const useVerifyEmail = () => {
  return useMutation<
    { message: string; emailVerified: boolean },
    Error,
    EmailVerificationPayload
  >({
    mutationFn: verifyEmailApi,
  });
};

export const useResendVerificationEmail = () => {
  return useMutation<{ message: string; sent: boolean }, Error, string>({
    mutationFn: (email: string) => resendVerificationEmailApi(email),
  });
};
