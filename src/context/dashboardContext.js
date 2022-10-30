import { createContext, useContext, useState } from "react";
const DashboardContext = createContext();

export function DashboardContextWrapper({ children }) {
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
    <DashboardContext.Provider value={sharedState}>{children}</DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  return useContext(DashboardContext);
}
