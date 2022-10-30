import { createContext, useContext, useState, useEffect } from "react";
import { localStorageSetItems } from "../utils/localStorage/localStorageFunctions";
const FormContext = createContext();

export function FormContextWrapper({ children, authInformations }) {
  const [formInformations, setFormInformations] = useState({
    formIsCompleted: false,
    datasForm: [],
    initForm: false,
    questionToDisplay: null,
    indexQuestions: 0,
    counterQuestion: 0,
    questions: [],
    allQuestions: [],
  });
  useEffect(
    () =>
      localStorageSetItems({
        items: {
          datasForm: formInformations?.datasForm,
          indexQuestions: formInformations?.indexQuestions,
          allQuestions: formInformations?.allQuestions,
          questions: formInformations?.questions,
          counterQuestion: formInformations?.counterQuestion,
          formIsCompleted: formInformations?.formIsCompleted,
          initForm: formInformations?.initForm,
          questionToDisplay: formInformations?.questionToDisplay,
        },
        userId: authInformations?.login.userId,
      }),
    [formInformations]
  );
  let sharedState = {
    formInformations: formInformations,
    setFormInformations: setFormInformations,
  };

  return (
    <FormContext.Provider value={sharedState}>{children}</FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
