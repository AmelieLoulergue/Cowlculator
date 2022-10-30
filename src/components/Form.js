import React, { useEffect, useState, useRef } from "react";
import Navbar from "./layout/Navbar";
import listOfQuestions from "../utils/listOfQuestions";
import RenderQuestion from "./form/RenderQuestion";
import "./Form.css";
import back_arrow from "../assets/svg/back-arrow.svg";
import Lottie from "lottie-react";
import form_begin from "../assets/anim/form-begin.json";
import home from "../assets/svg/home.svg";
import { useNavigate } from "react-router-dom";
import ProgressBarForm from "./form/form_components/ProgressBarForm.js";
import calculs from "../utils/calculs";
import { useFormContext } from "../context/formContext";
import { useAuthContext } from "../context/authContext";
import { useAlertContext } from "../context/alertContext";
import { useResultContext } from "../context/resultContext";
import sendAnswer from "../utils/formFunctions/sendAnswer";
import goPrecedentQuestion from "../utils/formFunctions/goPrecedentQuestion";
import updateProgressForm from "../utils/formFunctions/updateProgressForm";
import updateCounterQuestion from "../utils/formFunctions/updateCounterQuestion";
import saveCompletedForm from "../utils/formFunctions/saveCompletedForm";
import updateFarmNameUser from "../utils/formFunctions/updateFarmNameUser";
import updateAllExistingQuestions from "../utils/formFunctions/updateAllExistingQuestions";
import generateDatasFormOnInitForm from "../utils/formFunctions/generateDatasFormOnInitForm";
import capitalize from "../utils/capitalize";
const NewForm = () => {
  const { formInformations, setFormInformations } = useFormContext();
  const { authInformations, setAuthInformations } = useAuthContext();
  const { setAlertInformations } = useAlertContext();
  const { resultInformations, setResultsInformations } = useResultContext();
  const chatContainer = useRef(null);
  let navigate = useNavigate();
  const [answer, setAnswer] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    updateProgressForm({
      resultInformations,
      setProgress,
      formInformations,
    });
  }, [
    resultInformations?.allResultsUser?.length,
    formInformations,
    resultInformations,
  ]);
  useEffect(() => {
    updateCounterQuestion({
      questionToDisplay: formInformations?.questionToDisplay,
      setFormInformations,
    });
  }, [formInformations?.questionToDisplay, setFormInformations]);
  useEffect(() => {
    if (formInformations?.formIsCompleted) {
      saveCompletedForm({
        results: formInformations?.results,
        allQuestions: formInformations?.allQuestions,
        questions: formInformations?.questions,
        authInformations,
        setAuthInformations,
        setResultsInformations,
      });
    }
  }, [
    authInformations,
    formInformations?.allQuestions,
    formInformations?.formIsCompleted,
    formInformations?.questions,
    formInformations?.results,
    setAuthInformations,
    setFormInformations,
    setResultsInformations,
  ]);
  useEffect(() => {
    if (resultInformations?.allResultsUser?.length > 0) {
      setFormInformations((currentFormInformations) => ({
        ...currentFormInformations,
        formIsCompleted: false,
        datasForm: [],
        initForm: false,
        questionToDisplay: listOfQuestions.formQuestions[3],
        indexQuestions: 3,
        counterQuestion: 3,
        results: {},
        questions: listOfQuestions.formQuestions,
        allQuestions: [],
      }));
    }
  }, [resultInformations, setFormInformations]);
  useEffect(() => {
    updateFarmNameUser({
      questions: formInformations?.questions,
      formIsCompleted: formInformations?.formIsCompleted,
      authInformations,
      setAuthInformations,
    });
    if (
      !localStorage.getItem(`allQuestions${authInformations?.login?.userId}`)
    ) {
      updateAllExistingQuestions({ setFormInformations });
    }
  }, [
    authInformations,
    formInformations?.formIsCompleted,
    formInformations?.questions,
    setAuthInformations,
    setFormInformations,
  ]);

  useEffect(() => {
    generateDatasFormOnInitForm({
      initForm: formInformations?.initForm,
      setFormInformations,
    });
  }, [formInformations?.initForm, setFormInformations]);
  return (
    <div>
      {formInformations?.initForm && (
        <div className="buttons-skip-form">
          <button
            onClick={() => {
              calculs({
                formInformations: formInformations,
                setFormInformations: setFormInformations,
              });
              navigate("/dashboard");
            }}
          >
            Skip and complete later
          </button>
          <ProgressBarForm progress={progress} />
        </div>
      )}
      <div className="formChat">
        {!formInformations?.initForm && (
          <div className="beginin">
            <div className="LottieContainer">
              <Lottie animationData={form_begin} loop={true} />
            </div>
            <div>
              {formInformations?.datasForm?.length > 0 ? (
                <>
                  <h3>Nice to see you again !</h3>
                  <h1>Keep filling the form today</h1>
                </>
              ) : (
                <>
                  <h3>Are you ready ?</h3>
                  <h1>Start filling the form today</h1>
                </>
              )}
            </div>
            <div className="btns" style={{ marginBottom: "5rem" }}>
              <img
                src={back_arrow}
                alt=""
                onClick={() => navigate("/dashboard")}
                style={{ cursor: "pointer" }}
              ></img>
              <button
                className="btn"
                onClick={() => {
                  setFormInformations({ ...formInformations, initForm: true });
                  setTimeout(() => {
                    window.scrollBy(0, document.body.scrollHeight - 100);
                  }, 50);
                }}
              >
                Let's get started
              </button>
              <img
                src={home}
                alt=""
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        )}
        {formInformations?.initForm && formInformations?.questions?.length > 0 && (
          <>
            <Navbar />
            <div id="questions-form" className="questions" ref={chatContainer}>
              {console.log(formInformations.questionToDisplay)}
              {formInformations?.questions
                .slice(
                  resultInformations?.allResultsUser[0]?.length ? 3 : 0,
                  formInformations?.indexQuestions
                )
                .map((question, index) => (
                  <div
                    key={`question_form_${index}`}
                    className={question.is_hidden ? "is-hidden" : ""}
                  >
                    {question.bloc_name && (
                      <div className="nav">
                        <h1>
                          {capitalize(question.bloc_name.replace("_", " "))}
                        </h1>
                      </div>
                    )}
                    {question.question && (
                      <div key={question.id} id={question.id}>
                        <RenderQuestion
                          question={question}
                          response={question.response}
                          indexQuestionArray={index}
                        />
                      </div>
                    )}
                  </div>
                ))}
              {formInformations?.questionToDisplay && (
                <>
                  <div className="nav">
                    <h1>
                      {formInformations?.questionToDisplay.bloc_name &&
                        formInformations?.questionToDisplay.bloc_name.replace(
                          "_",
                          " "
                        )}
                    </h1>
                  </div>
                  <div
                    key={formInformations?.questionToDisplay.id}
                    id={formInformations?.questionToDisplay.id}
                  >
                    <RenderQuestion
                      question={formInformations?.questionToDisplay}
                      setAnswer={setAnswer}
                      sendAnswer={() =>
                        sendAnswer({
                          setAlertInformations,
                          answer,
                          setAnswer,
                          formInformations,
                          setFormInformations,
                        })
                      }
                      answer={answer}
                      indexQuestions={formInformations?.indexQuestions}
                      setFormInformations={setFormInformations}
                      goPrecedentQuestion={() =>
                        goPrecedentQuestion({
                          formInformations,
                          setAnswer,
                          setFormInformations,
                        })
                      }
                      questions={formInformations?.questions}
                    />
                  </div>
                </>
              )}
              {formInformations?.questions?.length ===
                formInformations?.indexQuestions && (
                <div
                  className="inputField"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button
                    className="btn-back"
                    onClick={() =>
                      goPrecedentQuestion({
                        formInformations,
                        setAnswer,
                        setFormInformations,
                      })
                    }
                  >
                    <img src={back_arrow} alt="" width="40px"></img>
                  </button>
                  <button
                    className="btn"
                    onClick={() => {
                      setFormInformations({
                        ...formInformations,
                        formIsCompleted: true,
                      });
                      window.scrollTo(0, 0);
                      navigate("/dashboard");
                    }}
                  >
                    VIEW RESULTS
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewForm;
