import Dashboard from "../components/Dashboard";
import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
const DashboardPage = () => {
  const { authInformations } = useAuthContext;
  if (!authInformations?.loggedUser) {
    return Navigate("/account/login");
  }
  return <Dashboard />;
};
export default DashboardPage;
