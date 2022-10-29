import { useParams, useNavigate } from "react-router-dom";
import Login from "../../components/logger/Login";
import { AuthContextWrapper } from "../../context/authContext";
import { confirmEmail } from "./controlLog";
const ConfirmEmail = ({
  setMessageAlert,
  setSeverity,
  setDisplayAlert,
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
      setMessageAlert={setMessageAlert}
      setSeverity={setSeverity}
      setDisplayAlert={setDisplayAlert}
    />
  );
};
export default ConfirmEmail;
