import ResearcherDatas from "../components/ResearcherDatas";
import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
const ResearcherPage = () => {
  const { authInformations } = useAuthContext();
  if (!authInformations?.loggedUser) {
    return <Navigate to="/account/login" />;
  }
  return <ResearcherDatas />;
};
export default ResearcherPage;
