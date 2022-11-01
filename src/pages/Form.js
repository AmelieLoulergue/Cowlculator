import Form from "../components/Form";
import { useAuthContext } from "../context/authContext";
import { FormContextWrapper } from "../context/formContext";
import { useResultContext } from "../context/resultContext";
import { Navigate } from "react-router-dom";

const FormPage = () => {
  const { authInformations } = useAuthContext();
  const { resultInformations } = useResultContext();
  if (!authInformations?.loggedUser) {
    return <Navigate to="/account/login" />;
  }

  return (
    <FormContextWrapper
      authInformations={authInformations}
      resultInformations={resultInformations}
    >
      <Form />
    </FormContextWrapper>
  );
};
export default FormPage;
