import Register from "../components/logger/Signup";
import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
const RegisterPage = () => {
  const { authInformations } = useAuthContext();
  if (authInformations?.loggedUser) {
    if (authInformations.login?.userType === "farmer") {
      return <Navigate to="/dashboard" />;
    }
    return <Navigate to="/datas" />;
  }
  return <Register />;
};
export default RegisterPage;
