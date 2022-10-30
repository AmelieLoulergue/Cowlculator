import listOfQuestions from "../listOfQuestions";
const updateAllExistingQuestions = ({ setFormInformations }) => {
  const isAtLeastOneFieldGetLinkedQuestions = (questions) => {
    return questions.some((question) => !!question.linked_questions);
  };

  const getAllQuestionsRecursive = (currentValue, accumulatorQuestions) => {
    if (isAtLeastOneFieldGetLinkedQuestions(currentValue)) {
      const allLinkedQuestions = currentValue.reduce((accumulator, value) => {
        if (value.linked_questions) {
          return [...accumulator, ...value.linked_questions];
        }
        return accumulator;
      }, []);

      return getAllQuestionsRecursive(allLinkedQuestions, [
        ...accumulatorQuestions,
        ...allLinkedQuestions.map((value) => ({
          id: value.id,
          response: value.response,
          question: value.question,
        })),
      ]);
    }
    return accumulatorQuestions;
  };
  const result = listOfQuestions.formQuestions.reduce(
    (accumulator, currentValue) => {
      const totalQuestions = getAllQuestionsRecursive([currentValue], []);

      return [
        ...accumulator,
        {
          id: currentValue.id,
          response: currentValue.response,
          question: currentValue.question,
        },
        ...totalQuestions,
      ];
    },
    []
  );
  setFormInformations((currentFormInformations) => ({
    ...currentFormInformations,
    allQuestions: result,
  }));
};

export default updateAllExistingQuestions;
