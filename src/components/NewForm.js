import React, { useEffect, useState } from "react";
import listOfQuestions from "../utils/listOfQuestions";
// import "./NewForm.css";
import RenderQuestion from "./NewForm/RenderQuestion";
import "./Form_design.css";
import back_arrow from "../assets/svg/back-arrow.svg";
import Lottie from "lottie-react";
import form_begin from "../assets/anim/form-begin.json";
import home from "../assets/svg/home.svg";
import Bg from "./Bg";
import { Alert } from "@mui/material";
import AlertComponent from "./alerts/Alert";
import { useNavigate } from "react-router-dom";
import ProgressBarForm from "../components/form_components/ProgressBarForm.js";
const NewForm = () => {
  let navigate = useNavigate();
  const [initForm, setInitForm] = useState(false);
  const [numberOfResponse, setNumberOfResponse] = useState(0);
  const [questionToDisplay, setQuestionToDisplay] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [indexQuestions, setIndexQuestions] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [severity, setSeverity] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [displayAlert, setDisplayAlert] = useState(false);
  const [progress, setProgress] = useState(0);

  const sendAnswer = () => {
    if (answer === null && questionToDisplay.formInput.type !== "checkbox") {
      setSeverity("error");
      setMessageAlert("Invalid Response");
      setDisplayAlert(true);
      setTimeout(() => setDisplayAlert(false), 3000);
    } else {
      setSeverity("success");
      setMessageAlert("Response saved !");
      setDisplayAlert(true);
      setTimeout(() => setDisplayAlert(false), 3000);
      const newQuestionsList = questions;

      if (questionToDisplay?.linked_questions?.length) {
        const questionsLinked = questionToDisplay.linked_questions.filter(
          (question) => question.answerParentQuestion === answer
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

  useEffect(() => {
    setQuestions(listOfQuestions.formQuestions);
    setQuestionToDisplay(listOfQuestions.formQuestions[0]);
  }, []);
  useEffect(() => {
    const tab = ["pipi", "caca", "pipi", "pipi"];
    console.log(
      questions.reduce((accumulator, currentValue) => {
        if (currentValue.response) {
          return [
            ...accumulator,
            { id: currentValue.id, response: currentValue.response },
          ];
        }
        return accumulator;
      }, [])
    );
    setProgress(Math.round((indexQuestions * 100) / questions.length));
  }, [questions]);

  return (
    <div className="">
      <div className="buttons-skip-form">
        <button onClick={() => navigate("/dashboard")}>
          Skip and complete later
        </button>
        <ProgressBarForm progress={progress} />
      </div>
      {displayAlert && (
        <AlertComponent severity={severity} messageAlert={messageAlert} />
      )}
      <div className="formChat">
        <div className="beginin">
          <div className="LottieContainer">
            <Lottie animationData={form_begin} loop={true} />
          </div>
          <div>
            <h3>Are you ready ?</h3>
            <h1>Start filling the form today</h1>
          </div>
          <div className="btns">
            <img src={back_arrow} alt=""></img>
            <button
              className="btn"
              onClick={() => {
                setInitForm(true);
                setTimeout(() => {
                  window.scrollTo(0, document.body.scrollHeight);
                }, 50);
              }}
            >
              Let's get started
            </button>
            <img src={home} alt=""></img>
          </div>
        </div>
        {initForm && questions.length > 0 && (
          <div id="questions-form" className="questions">
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
                <button className="btn" onClick={() => navigate("/dashboard")}>
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
