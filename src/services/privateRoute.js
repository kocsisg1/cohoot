import { CheckAuthStatus } from "./auth";
import { Navigate} from "react-router";

export const PrivateRoute = ({ children }) => {
    const  user  = CheckAuthStatus();
    if (!user) {
      // user is not authenticated
      return <Navigate to="/register" />;
    }
    return children;
  };