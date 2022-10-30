import Form from "../components/Form";
import { useAuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";
const FormPage = () => {
  const { authInformations } = useAuthContext;
  if (!authInformations?.loggedUser) {
    return Navigate("/account/login");
  }
  useEffect(() => {
    if (formIsCompleted) {
      if (
        questions.find((element) => element.id === "farm_name") &&
        !authInformations.login?.farmName
      ) {
        updateUserDatas({
          farmName: questions.find((element) => element.id === "farm_name")
            .response,
          authInformations,
          setAuthInformations,
        });
      }
      saveUserDatas({ allQuestions, results, authInformations }).then(() => {
        getUserDatas({ authInformations })
          .then((result) => {
            if (result.result.length > 0) {
              setAllResultsUser(result.result.map((item) => item.result));
            }
          })
          // make sure to catch any error
          .catch(console.error);
        localStorageRemoveItems({
          items: [
            "results",
            "allQuestions",
            "counterQuestion",
            "formIsCompleted",
            "indexQuestions",
            "initForm",
            "questionToDisplay",
            "questions",
            "dataForms",
          ],
          userId: authInformations?.login?.userId,
        });
        setFormIsCompleted(false);
        setDatasForm([]);
        setInitForm(false);
        setQuestionToDisplay(listOfQuestions.formQuestions[3]);
        setIndexQuestions(3);
        setCounterQuestion(3);

        setResults({});
        setQuestions(listOfQuestions.formQuestions);
        setAllQuestions([]);
      });
    }
  }, [formIsCompleted, allResultsUser]);
  return (
    <FormContextWrapper authInformations={authInformations}>
      <Form />
    </FormContextWrapper>
  );
};
export default FormPage;
