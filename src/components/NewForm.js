import React, { useEffect, useState, useRef } from "react";

// import "./NewForm.css";
import RenderQuestion from "./NewForm/RenderQuestion";
import "./Form_design.css";
import back_arrow from "../assets/svg/back-arrow.svg";
import Lottie from "lottie-react";
import form_begin from "../assets/anim/form-begin.json";
import home from "../assets/svg/home.svg";
import { useNavigate } from "react-router-dom";
import ProgressBarForm from "../components/form_components/ProgressBarForm.js";
import calculs from "../utils/calculs";
import elec_state_coeff from "../coeff/elec_state_coeff.json";
import controlResponse from "../utils/controlResponse";
const NewForm = ({
  results,
  setResults,
  datasForm,
  questions,
  setQuestions,
  setMessageAlert,
  setDisplayAlert,
  setSeverity,
  setFormIsCompleted,
  initForm,
  setInitForm,
  questionToDisplay,
  setQuestionToDisplay,
  indexQuestions,
  setIndexQuestions,
}) => {
  const stateList = elec_state_coeff.map((element) => element.State);
  const chatContainer = useRef(null);
  let navigate = useNavigate();

  const [numberOfResponse, setNumberOfResponse] = useState(
    localStorage.getItem("numberOfResponse")
      ? Number(JSON.parse(localStorage.getItem("numberOfResponse")))
      : 0
  );
  const [answer, setAnswer] = useState(null);
  const [progress, setProgress] = useState(0);

  const sendAnswer = () => {
    const responseIsOk = controlResponse({
      setSeverity,
      answer,
      questionToDisplay,
      setMessageAlert,
      setDisplayAlert,
      stateList,
      datasForm,
    });
    if (responseIsOk) {
      const newQuestionsList = questions;

      if (questionToDisplay?.linked_questions?.length) {
        const questionsLinked = questionToDisplay.linked_questions.filter(
          (question) =>
            questionToDisplay.formInput.type === "number"
              ? question.answerParentQuestion === answer.value
              : question.answerParentQuestion === answer
        );

        newQuestionsList.splice(indexQuestions + 1, 0, ...questionsLinked);
      }

      newQuestionsList.splice(indexQuestions, 1, {
        ...questionToDisplay,
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
        idsToDelete: [questionToDisplay.id],
      });

      const finalQuestions = newQuestionsList.filter(
        (question) => !idsToDelete.includes(question.parentId)
      );
      setQuestions(finalQuestions);
      setIndexQuestions(indexQuestions + 1);
      setQuestionToDisplay(finalQuestions[indexQuestions + 1]);
      setAnswer(null);
    }
  };

  const goPrecedentQuestion = () => {
    setIndexQuestions(indexQuestions - 1);
    setQuestionToDisplay(questions[indexQuestions - 1]);
    setAnswer(questions[indexQuestions - 1].response);
  };
  const scrollToMyRef = () => {
    const scroll =
      chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
    chatContainer.current.scrollTo(0, scroll);
  };
  useEffect(() => {
    // setQuestions(listOfQuestions.formQuestions);
    // setQuestionToDisplay(listOfQuestions.formQuestions[0]);
    document.getElementsByClassName("dash-nav")[0].classList.add("form-navbar");
  }, []);
  useEffect(() => {
    setProgress(Math.round((indexQuestions * 100) / questions.length));
  }, [questions]);

  return (
    <div className="">
      <div className="buttons-skip-form">
        <button
          onClick={() => {
            calculs({
              datasForm,
              results,
              setResults,
            });
            navigate("/dashboard");
          }}
        >
          Skip and complete later
        </button>
        <ProgressBarForm progress={progress} />
      </div>
      <div className="formChat">
        <div className="beginin">
          <div className="LottieContainer">
            <Lottie animationData={form_begin} loop={true} />
          </div>
          <div>
            {datasForm.length > 0 ? (
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
            <img src={back_arrow} alt=""></img>
            <button
              className="btn"
              onClick={() => {
                setInitForm(true);
                setTimeout(() => {
                  window.scrollBy(0, document.body.scrollHeight - 100);
                }, 50);
              }}
            >
              Let's get started
            </button>
            <img src={home} alt=""></img>
          </div>
        </div>
        {initForm && questions.length > 0 && (
          <div id="questions-form" className="questions" ref={chatContainer}>
            {questions.slice(0, indexQuestions).map((question, index) => (
              <div
                key={`question_form_${index}`}
                className={question.is_hidden ? "is-hidden" : ""}
              >
                {question.bloc_name && (
                  <div className="nav">
                    <h1>{question.bloc_name.replace("_", " ")}</h1>
                  </div>
                )}
                {question.question && (
                  <div key={question.id} id={question.id}>
                    <RenderQuestion
                      numberOfResponse={numberOfResponse}
                      setNumberOfResponse={setNumberOfResponse}
                      question={question}
                      response={question.response}
                      questions={questions}
                      setQuestions={setQuestions}
                      indexQuestionArray={index}
                    />
                  </div>
                )}
              </div>
            ))}
            {questionToDisplay && (
              <>
                <div className="nav">
                  <h1>
                    {questionToDisplay.bloc_name &&
                      questionToDisplay.bloc_name.replace("_", " ")}
                  </h1>
                </div>
                <div key={questionToDisplay.id} id={questionToDisplay.id}>
                  <RenderQuestion
                    numberOfResponse={numberOfResponse}
                    setNumberOfResponse={setNumberOfResponse}
                    question={questionToDisplay}
                    setAnswer={setAnswer}
                    sendAnswer={sendAnswer}
                    answer={answer}
                    indexQuestions={indexQuestions}
                    setIndexQuestions={setIndexQuestions}
                    goPrecedentQuestion={goPrecedentQuestion}
                  />
                </div>
              </>
            )}
            {questions?.length === indexQuestions && (
              <div
                className="inputField"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button className="btn-back" onClick={goPrecedentQuestion}>
                  <img src={back_arrow} alt="" width="40px"></img>
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setFormIsCompleted(true);
                    navigate("/dashboard");
                  }}
                >
                  VIEW RESULTS
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewForm;
