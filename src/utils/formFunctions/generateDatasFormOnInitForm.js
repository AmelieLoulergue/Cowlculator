const generateDatasFormOnInitForm = ({ initForm, setFormInformations }) => {
  if (initForm) {
    setFormInformations((currentFormInformations) => {
      return {
        ...currentFormInformations,
        datasForm: currentFormInformations?.questions
          ?.filter((question) => question.response)
          .map((question) => ({
            id: question.id,
            response: question.response,
          })),
      };
    });
  }
};

export default generateDatasFormOnInitForm;
