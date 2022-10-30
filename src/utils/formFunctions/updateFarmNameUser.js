import findElementById from "../findElementById";
import updateUserDatas from "../userDatas/updateUserDatas";
const updateFarmNameUser = ({
  questions,
  formIsCompleted,
  authInformations,
  setAuthInformations,
}) => {
  console.log(
    questions,
    findElementById({
      id: "farm_name",
      array: questions,
    })
  );
  if (
    findElementById({
      id: "farm_name",
      array: questions,
    }) &&
    !authInformations?.login?.farmName &&
    formIsCompleted
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
};

export default updateFarmNameUser;
