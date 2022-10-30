const goPrecedentQuestion = ({
  formInformations,
  setAnswer,
  setFormInformations,
}) => {
  setFormInformations({
    ...formInformations,
    indexQuestions: formInformations?.indexQuestions - 1,
    counterQuestion: formInformations?.allQuestions.findIndex(
      (element) =>
        element.id ===
        formInformations?.questions[formInformations?.indexQuestions - 1].id
    ),
    questionToDisplay:
      formInformations?.questions[formInformations?.indexQuestions - 1],
  });
  setAnswer(
    formInformations?.questions[formInformations?.indexQuestions - 1].response
  );
};
export default goPrecedentQuestion;
