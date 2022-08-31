import React, { useEffect, useState } from "react";
import listOfQuestions from "../utils/listOfQuestions";
// import "./NewForm.css";
import RenderQuestion from "./NewForm/RenderQuestion";
import SubQuestions from "./NewForm/SubQuestions";
import "./Form_design.css";
import back_arrow from "../assets/svg/back-arrow.svg";
import Lottie from "lottie-react";
import form_begin from "../assets/anim/form-begin.json";
import home from "../assets/svg/home.svg";
import send from "../assets/svg/send.svg";
import menu from "../assets/svg/burger.svg";
import Bg from "./Bg";
import counterQuestions from "../utils/counterQuestions";

const NewForm = () => {
  const [numberOfResponse, setNumberOfResponse] = useState(0);
  const [blocIndex, setBlocIndex] = useState(0);
  const [questionToDisplay, setQuestionToDisplay] = useState(null);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);

  console.log({ questionToDisplay, displayedQuestions });
  const renderQuestion = () => {
    let question = listOfQuestions.formQuestions
      .find((bloc) => bloc.bloc_id === `bloc_${blocIndex}`)
      .questions.find(
        (question) => displayedQuestions.length === question.index_id
      );

    if (
      !question &&
      listOfQuestions.formQuestions.find(
        (bloc) => bloc.bloc_id === `bloc_${blocIndex}`
      ).bloc_questions_number === numberOfResponse
    ) {
      setBlocIndex(blocIndex + 1);
      question = listOfQuestions.formQuestions
        .find((bloc) => bloc.bloc_id === `bloc_${blocIndex + 1}`)
        .questions.find(
          (question) => displayedQuestions.length === question.index_id
        );
    }
    console.log(question);
    setQuestionToDisplay(question);
  };
  useEffect(() => {
    questionToDisplay &&
      setDisplayedQuestions([...displayedQuestions, questionToDisplay]);
  }, [numberOfResponse]);
  useEffect(() => {
    questionToDisplay && renderQuestion();
  }, [displayedQuestions]);
  return (
    <div className="">
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
            <button className="btn" onClick={() => renderQuestion()}>
              Let's get started
            </button>
            <img src={home} alt=""></img>
          </div>
        </div>
        <div id="questions-form" className="questions">
          {displayedQuestions.length > 0 &&
            displayedQuestions.map((question) => (
              <>
                {question.bloc_name && question.bloc_name.replace("_", " ")}
                <div
                  key={question.question_id}
                  id={question.question_id}
                  className={
                    question.question_class ? question.question_class : ""
                  }
                >
                  <RenderQuestion
                    numberOfResponse={numberOfResponse}
                    setNumberOfResponse={setNumberOfResponse}
                    question={question}
                    blocIndex={blocIndex}
                    setBlocIndex={setBlocIndex}
                    hasResponse={true}
                  />
                </div>
              </>
            ))}
          {questionToDisplay && (
            <>
              {questionToDisplay.bloc_name &&
                questionToDisplay.bloc_name.replace("_", " ")}
              <div
                key={questionToDisplay.question_id}
                id={questionToDisplay.question_id}
              >
                <RenderQuestion
                  numberOfResponse={numberOfResponse}
                  setNumberOfResponse={setNumberOfResponse}
                  question={questionToDisplay}
                  blocIndex={blocIndex}
                  setBlocIndex={setBlocIndex}
                />
              </div>
            </>
          )}
          {/*  On parcours tous les blocs existants dans listOfQuestions un à un, et on cache avec is-hidden selon l'étape de l'utilisateur */}
          {/* {listOfQuestions.formQuestions.map((bloc, key_bloc) => (
            <div
              key={`${key_bloc}`}
              id={bloc.bloc_id}
              className={key_bloc <= blocIndex ? "" : "is-hidden"}
            >
              <div className="nav">
                <img src={menu} alt=""></img>
                <h1>{bloc.bloc_name.replace("_", " ")}</h1>
                <img src={home} alt=""></img>
              </div>
              
            </div>
          ))} */}
        </div>
      </div>
      <Bg />
    </div>
  );
};

export default NewForm;
