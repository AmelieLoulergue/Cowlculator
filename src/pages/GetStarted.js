import GetStarted from "../components/logger/GetStarted";
import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
const GetStartedPage = () => {
  const { authInformations } = useAuthContext;
  if (authInformations?.loggedUser) {
    if (authInformations.login?.userType === "farmer") {
      return Navigate("/dashboard");
    }
    return Navigate("/datas");
  }
  return <GetStarted />;
};
export default GetStartedPage;
