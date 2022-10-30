import Login from "../components/logger/Login";
import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
const LoginPage = () => {
  const { authInformations } = useAuthContext();
  if (authInformations?.loggedUser) {
    if (authInformations.login?.userType === "farmer") {
      return <Navigate to="/dashboard" />;
    }
    return <Navigate to="/datas" />;
  }
  return <Login />;
};
export default LoginPage;
