import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "@/hooks/useAuthUser";

interface RequireAuthProps {
    allowedRoles: string[];
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
    const { user , isLoggedIn } = useAuthUser();
    const location = useLocation();

        return (
            user
                ? user.role?.find(role => allowedRoles?.includes(role))
                    ? <Outlet />
                    : <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
        );
    }

export default RequireAuth;