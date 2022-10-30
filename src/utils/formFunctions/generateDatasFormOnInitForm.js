const generateDatasFormOnInitForm = ({ initForm, setFormInformations }) => {
  console.log(initForm);
  if (!initForm) {
    setFormInformations((currentFormInformations) => ({
      ...currentFormInformations,
      datasForm: currentFormInformations?.questions?.reduce(
        (accumulator, currentValue) => {
          if (currentValue.response) {
            return [
              ...accumulator,
              { id: currentValue.id, response: currentValue.response },
            ];
          }
          return accumulator;
        },
        []
      ),
    }));
  }
};

export default generateDatasFormOnInitForm;
