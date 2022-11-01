import findResponseElementById from "../global/findResponseElementById";
import updateUserDatas from "../userDatas/updateUserDatas";
const updateFarmNameUser = ({
  questions,
  formIsCompleted,
  authInformations,
  setAuthInformations,
}) => {
  if (
    findResponseElementById(questions, "farm_name") &&
    !authInformations?.login?.farmName &&
    formIsCompleted
  ) {
    updateUserDatas({
      farmName: findResponseElementById(questions, "farm_name"),
      authInformations,
      setAuthInformations,
    });
  }
};

export default updateFarmNameUser;
