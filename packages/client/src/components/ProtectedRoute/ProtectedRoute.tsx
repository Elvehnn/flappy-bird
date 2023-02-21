import { Navigate } from 'react-router-dom';
import { UserFromServer } from "@/api/typesApi";

interface ProtectedRouteProps {
  isAuth: Nullable<UserFromServer>;
  redirect?: string;
  children: JSX.Element;
}

const ProtectedRoute = ({ isAuth, redirect = "/sign-in", children }: ProtectedRouteProps) => {
  return !isAuth ? <Navigate to={redirect} replace /> : children;
};

export default ProtectedRoute;
