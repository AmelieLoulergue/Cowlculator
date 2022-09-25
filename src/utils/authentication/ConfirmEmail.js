import { useParams, useNavigate } from "react-router-dom";
import { confirmEmail } from "./controlLog";
const ConfirmEmail = ({ setMessageAlert, setSeverity, setDisplayAlert }) => {
  const navigate = useNavigate();
  const { userId, resetToken } = useParams();
  confirmEmail({
    userId,
    resetToken,
    url: "https://cowlculatorback.herokuapp.com",
    navigate,
    setMessageAlert,
    setSeverity,
    setDisplayAlert,
  });
  return <></>;
};
export default ConfirmEmail;
