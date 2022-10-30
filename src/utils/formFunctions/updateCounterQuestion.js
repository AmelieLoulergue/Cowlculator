const updateCounterQuestion = ({ questionToDisplay, setFormInformations }) => {
  if (questionToDisplay) {
    setFormInformations((currentFormInformations) => ({
      ...currentFormInformations,
      counterQuestion: currentFormInformations?.allQuestions.findIndex(
        (element) => element.id === questionToDisplay.id
      ),
    }));
  } else {
    setFormInformations((currentFormInformations) => ({
      ...currentFormInformations,
      counterQuestion: currentFormInformations?.allQuestions.length,
    }));
  }
};

export default updateCounterQuestion;
