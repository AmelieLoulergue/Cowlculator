import { createContext, useContext, useState } from "react";
const FormContext = createContext();

export function FormContextWrapper({ children }) {
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
