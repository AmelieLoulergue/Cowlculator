import listOfQuestions from "../listOfQuestions";
const isTheFirstForm = ({
  allResultsUser,
  setFormInformations,
  authInformations,
}) => {
  if (allResultsUser?.length > 0) {
    let formLocalStorage = JSON.parse(
      localStorage.getItem("cowlculator")
    )?.find(
      (element) =>
        element.login?.userId === authInformations?.login.userId &&
        element.loggedUser
    );

    setFormInformations((currentFormInformations) => {
      return {
        ...currentFormInformations,
        indexQuestions:
          formLocalStorage?.indexQuestions > 0
            ? formLocalStorage.indexQuestions
            : 3,
        counterQuestion:
          formLocalStorage?.counterQuestion > 0
            ? formLocalStorage.counterQuestion
            : 3,
        questionToDisplay: formLocalStorage?.questionToDisplay
          ? formLocalStorage?.questionToDisplay
          : listOfQuestions.formQuestions[3],
        questions: formLocalStorage?.questions
          ? formLocalStorage?.questions
          : [
              {
                ...currentFormInformations.questions[0],
                response: authInformations?.login?.farmName,
              },
              allResultsUser[0].filter((element, index) => index < 2),
              currentFormInformations.questions.filter(
                (question, index) => index >= 3
              ),
            ].flat(),
      };
    });
  }
};

export default isTheFirstForm;
