const saveAnswer = ({
  setFormInformations,
  formInformations,
  answer,
  setAnswer,
}) => {
  setFormInformations({
    ...formInformations,
    allQuestions: formInformations.allQuestions.map((question) => {
      if (question.id === formInformations?.questionToDisplay?.id) {
        return {
          ...question,
          response: answer,
        };
      } else {
        return question;
      }
    }),
  });
  const newQuestionsList = formInformations?.questions;

  if (formInformations?.questionToDisplay?.linked_questions?.length) {
    const questionsLinked =
      formInformations?.questionToDisplay.linked_questions.filter((question) =>
        formInformations?.questionToDisplay.formInput.type === "number"
          ? question.answerParentQuestion === answer.value
          : question.answerParentQuestion === answer
      );

    newQuestionsList.splice(
      formInformations?.indexQuestions + 1,
      0,
      ...questionsLinked
    );
  }

  newQuestionsList.splice(formInformations?.indexQuestions, 1, {
    ...formInformations?.questionToDisplay,
    response: answer,
  });
  const getAllIdsToDelete = (value) => {
    const finalQuestions = value.newQuestionsList.filter(
      (question) =>
        question.answerParentQuestion !== answer &&
        value.idsToDelete.includes(question.parentId)
    );

    if (!finalQuestions?.length) {
      return value.idsDeleted;
    }

    return getAllIdsToDelete({
      ...value,
      idsDeleted: [...value.idsDeleted, ...value.idsToDelete],
      idsToDelete: finalQuestions.map(({ id }) => id),
    });
  };

  const idsToDelete = getAllIdsToDelete({
    newQuestionsList,
    idsDeleted: [],
    idsToDelete: [formInformations?.questionToDisplay.id],
  });
  const finalQuestions = newQuestionsList.filter(
    (question) => !idsToDelete.includes(question.parentId)
  );
  setFormInformations({
    ...formInformations,
    questions: finalQuestions,
    indexQuestions: formInformations?.indexQuestions + 1,
    questionToDisplay: finalQuestions[formInformations?.indexQuestions + 1],
    datasForm: finalQuestions.filter((question) => question.response),
  });
  setAnswer(
    finalQuestions[formInformations?.indexQuestions + 1]?.formInput?.type ===
      "checkbox"
      ? false
      : null
  );
};
export default saveAnswer;
