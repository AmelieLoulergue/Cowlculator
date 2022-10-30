import findElementById from "../findElementById";
import updateUserDatas from "../userDatas/updateUserDatas";
import saveUserDatas from "../userDatas/saveUserDatas";
import getUserDatas from "../userDatas/getUserDatas";
import { localStorageRemoveItems } from "../localStorage/localStorageFunctions";
const saveCompletedForm = ({
  results,
  allQuestions,
  questions,
  authInformations,
  setAuthInformations,
  setResultsInformations,
}) => {
  if (
    findElementById({
      id: "farm_name",
      array: questions,
    }) &&
    !authInformations.login?.farmName
  ) {
    updateUserDatas({
      farmName: findElementById({
        id: "farm_name",
        array: questions,
      }),
      authInformations,
      setAuthInformations,
    });
  }
  saveUserDatas({
    results,
    allQuestions,
    authInformations,
  }).then(() => {
    getUserDatas({ authInformations })
      .then((result) => {
        if (result.result.length > 0) {
          setResultsInformations((currentFormInformations) => ({
            ...currentFormInformations,
            allResultsUser: result.result.map((item) => item.result),
          }));
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
  });
};

export default saveCompletedForm;
