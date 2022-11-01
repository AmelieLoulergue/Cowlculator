import React, { useEffect, useState, useRef } from "react";
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
import updateFarmNameUser from "../utils/formFunctions/updateFarmNameUser";
import updateAllExistingQuestions from "../utils/formFunctions/updateAllExistingQuestions";
import generateDatasFormOnInitForm from "../utils/formFunctions/generateDatasFormOnInitForm";
import capitalize from "../utils/global/capitalize";
const NewForm = () => {
  const { formInformations, setFormInformations } = useFormContext();
  const { authInformations, setAuthInformations } = useAuthContext();
  const { setAlertInformations } = useAlertContext();
  const { resultInformations, setResultInformations } = useResultContext();
  const chatContainer = useRef(null);
  let navigate = useNavigate();
  const [answer, setAnswer] = useState(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    generateDatasFormOnInitForm({
      initForm: formInformations?.initForm,
      setFormInformations,
    });
  }, [formInformations?.initForm, setFormInformations]);
  useEffect(() => {
    updateProgressForm({
      resultInformations,
      setProgress,
      formInformations,
    });
  }, [
    resultInformations.allResultsUser.length,
    formInformations.counterQuestion,
    resultInformations,
    formInformations,
  ]);

  useEffect(() => {
    updateCounterQuestion({
      questionToDisplay: formInformations?.questionToDisplay,
      setFormInformations,
    });
  }, [formInformations?.questionToDisplay, setFormInformations]);

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
  }, [resultInformations?.allResultsUser, setFormInformations]);
  useEffect(() => {
    if (formInformations?.formIsCompleted) {
      updateFarmNameUser({
        questions: formInformations?.questions,
        formIsCompleted: formInformations?.formIsCompleted,
        authInformations,
        setAuthInformations,
      });
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
  return (
    <div>
      {formInformations?.initForm && (
        <div className="buttons-skip-form">
          <button
            onClick={() => {
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
                  <h4>
                    By clicking on "Let's get started" you agree that the
                    information collected are anonymously shared and used for
                    research purpose.
                  </h4>
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
            {/* <Navbar /> */}
            <div id="questions-form" className="questions" ref={chatContainer}>
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
                      calculs({
                        authInformations,
                        setAuthInformations,
                        setResultInformations,
                        setFormInformations,
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
