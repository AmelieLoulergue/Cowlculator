import findResponseElementById from "../global/findResponseElementById";
import updateUserDatas from "../userDatas/updateUserDatas";
import saveUserDatas from "../userDatas/saveUserDatas";
import getUserDatas from "../userDatas/getUserDatas";
import { localStorageRemoveItems } from "../localStorage/localStorageFunctions";
const saveCompletedForm = ({
  results,
  authInformations,
  setAuthInformations,
  setResultInformations,
  setFormInformations,
}) => {
  if (
    findResponseElementById(results, "farm_name") &&
    !authInformations.login?.farmName
  ) {
    updateUserDatas({
      farmName: findResponseElementById(results, "farm_name"),
      authInformations,
      setAuthInformations,
    });
  }
  saveUserDatas({
    results,
    authInformations,
  }).then(() => {
    getUserDatas({ authInformations })
      .then((result) => {
        localStorageRemoveItems({ userId: authInformations?.login?.userId });
        if (result.result.length > 0) {
          setResultInformations((currentFormInformations) => ({
            ...currentFormInformations,
            allResultsUser: result.result.map((item) => item.result),
          }));
        }
        setFormInformations((currentFormInformations) => ({
          ...currentFormInformations,
          formIsCompleted: true,
        }));
      })
      .catch(console.error);
  });
};

export default saveCompletedForm;
