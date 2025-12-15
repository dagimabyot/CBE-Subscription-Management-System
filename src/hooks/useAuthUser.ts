import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export const useAuthUser = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  return { user, token, isLoggedIn: !!user };
};
