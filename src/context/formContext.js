import { createContext, useContext, useState, useEffect } from "react";
import listOfQuestions from "../utils/listOfQuestions";
import {
  localStorageSetItems,
  localStorageGetItems,
} from "../utils/localStorage/localStorageFunctions";
import isTheFirstForm from "../utils/formFunctions/isTheFirstForm";
const FormContext = createContext();

export function FormContextWrapper({
  children,
  authInformations,
  resultInformations,
}) {
  const [formInformations, setFormInformations] = useState({
    formIsCompleted: false,
    datasForm: [],
    initForm: false,
    questionToDisplay: listOfQuestions.formQuestions[0],
    indexQuestions: 0,
    counterQuestion: 0,
    questions: listOfQuestions.formQuestions,
    allQuestions: [],
    results: [],
  });
  useEffect(() => {
    setFormInformations((currentFormInformations) => ({
      ...currentFormInformations,
      ...localStorageGetItems({
        items: [
          "datasForm",
          "indexQuestions",
          "results",
          "allQuestions",
          "questions",
          "questionToDisplay",
          "counterQuestion",
          "formIsCompleted",
          "initForm",
        ],
        userId: authInformations?.login?.userId,
      }),
    }));
  }, [authInformations?.login?.userId]);
  useEffect(() => {
    setFormInformations((currentFormInformations) => ({
      ...currentFormInformations,
      datasForm: currentFormInformations?.questions
        ?.filter((question) => question.response)
        .map((question) => ({
          id: question.id,
          response: question.response,
        })),
      indexQuestions: currentFormInformations?.questions?.filter(
        (question) => question.response
      )?.length,
      counterQuestion:
        currentFormInformations?.allQuestions
          ?.map((question) => question.id)
          ?.indexOf(currentFormInformations?.questionToDisplay?.id) ||
        currentFormInformations?.allQuestions?.length,
    }));
  }, [formInformations?.questions]);
  useEffect(() => {
    isTheFirstForm({
      allResultsUser: resultInformations?.allResultsUser,
      setFormInformations,
      authInformations,
    });
  }, [authInformations, resultInformations?.allResultsUser]);
  useEffect(() => {
    if (formInformations?.datasForm?.length !== 0) {
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
          results: formInformations?.results,
        },
        userId: authInformations?.login.userId,
      });
    }
  }, [
    authInformations?.login.userId,
    formInformations?.allQuestions,
    formInformations?.counterQuestion,
    formInformations?.datasForm,
    formInformations?.formIsCompleted,
    formInformations?.indexQuestions,
    formInformations?.initForm,
    formInformations?.questionToDisplay,
    formInformations?.questions,
    formInformations?.results,
  ]);

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
