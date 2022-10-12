import { useParams, useNavigate } from "react-router-dom";
import { confirmEmail } from "./controlLog";
const ConfirmEmail = ({ setMessageAlert, setSeverity, setDisplayAlert }) => {
  const navigate = useNavigate();
  const { userId, resetToken } = useParams();
  confirmEmail({
    userId,
    resetToken,
    url: "http://localhost:3000",
    navigate,
    setMessageAlert,
    setSeverity,
    setDisplayAlert,
  });
  return <></>;
};
export default ConfirmEmail;
