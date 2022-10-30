import listOfQuestions from "../listOfQuestions";
const isTheFirstForm = ({
  allResultsUser,
  setFormInformations,
  authInformations,
}) => {
  if (allResultsUser?.length > 0) {
    console.log(
      "check if first FORM",
      authInformations?.login?.farmName,
      allResultsUser[0]?.find((element) => element.id === "farm_state")
        ?.response,
      allResultsUser[0]?.find((element) => element.id === "farm_zip_code")
        ?.response
    );
    console.log(allResultsUser[0].filter((element, index) => index < 3));
    setFormInformations((currentFormInformations) => ({
      ...currentFormInformations,
      indexQuestions: 3,
      counterQuestion: 3,
      questionToDisplay: listOfQuestions.formQuestions[3],
      questions: [
        {
          ...currentFormInformations.questions[0],
          response: authInformations?.login?.farmName,
        },
        allResultsUser[0].filter((element, index) => index < 2),
        currentFormInformations.questions.filter(
          (question, index) => index >= 3
        ),
      ].flat(),
    }));
  }
};

export default isTheFirstForm;
