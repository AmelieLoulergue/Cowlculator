import { useParams, useNavigate } from "react-router-dom";
import Login from "../../components/logger/Login";
import { confirmEmail } from "./controlLog";
const ConfirmEmail = ({
  setMessageAlert,
  setSeverity,
  setDisplayAlert,
  userProfile,
  setUserProfile,
  login,
  setLogin,
}) => {
  const { userId, resetToken } = useParams();

  confirmEmail({
    userId,
    resetToken,
    url: "https://cowlculatorback.herokuapp.com",
    setMessageAlert,
    setSeverity,
    setDisplayAlert,
  });
  return (
    <Login
      userProfile={userProfile}
      setUserProfile={setUserProfile}
      login={login}
      setLogin={setLogin}
      setMessageAlert={setMessageAlert}
      setSeverity={setSeverity}
      setDisplayAlert={setDisplayAlert}
    />
  );
};
export default ConfirmEmail;
