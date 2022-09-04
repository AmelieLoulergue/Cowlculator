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

const NewForm = () => {
  const [initForm, setInitForm] = useState(false);
  const [numberOfResponse, setNumberOfResponse] = useState(0);
  const [questionToDisplay, setQuestionToDisplay] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [indexQuestions, setIndexQuestions] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [severity, setSeverity] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [displayAlert, setDisplayAlert] = useState(false);
  const sendAnswer = () => {
    // add check answer
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
        questionToDisplay.linked_questions.map((question) =>
          console.log(
            question.answerParentQuestion === answer,
            question.answerParentQuestion,
            answer
          )
        );
        const questionsLinked = questionToDisplay.linked_questions.filter(
          (question) => question.answerParentQuestion === answer
        );

        newQuestionsList.splice(indexQuestions + 1, 0, ...questionsLinked);
      }

      newQuestionsList.splice(indexQuestions, 1, {
        ...questionToDisplay,
        response:
          questionToDisplay.formInput.type === "checkbox" && answer === null
            ? "false"
            : answer,
      });

      setQuestions(newQuestionsList);
      setIndexQuestions(indexQuestions + 1);
      setQuestionToDisplay(newQuestionsList[indexQuestions + 1]);
      setAnswer(null);
    }
  };

  useEffect(() => {
    setQuestions(listOfQuestions.formQuestions);
    setQuestionToDisplay(listOfQuestions.formQuestions[0]);
  }, []);
  useEffect(() => {
    console.log("je modifie questions");
  }, [questions]);

  return (
    <div className="">
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
            <button className="btn" onClick={() => setInitForm(true)}>
              Let's get started
            </button>
            <img src={home} alt=""></img>
          </div>
        </div>
        {initForm && (
          <div id="questions-form" className="questions">
            {questions.length > 0 &&
              questions.slice(0, indexQuestions).map((question, index) => (
                <div key={`question_form_${index}`}>
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
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Bg />
    </div>
  );
};

export default NewForm;
