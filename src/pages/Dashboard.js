import Dashboard from "../components/Dashboard";
import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
const DashboardPage = () => {
  const { authInformations } = useAuthContext();
  console.log("coucou ici", authInformations);
  if (!authInformations?.loggedUser) {
    return <Navigate to="/account/login" />;
  }
  return (
    <>
      <Navbar />
      <Dashboard />
      <Footer />
    </>
  );
};
export default DashboardPage;
