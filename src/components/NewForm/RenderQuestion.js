import RenderInput from "./RenderInput";

import React, { useEffect, useState } from "react";

const RenderQuestion = ({
  question,
  userValues,
  sendAnswer,
  setAnswer,
  response,
  answer,
  questions,
  setQuestions,
}) => {
  return (
    <>
      <div id={`ask_${question.id}`} className="ask">
        <p>{question.question}</p>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column" }}
        id={`response_${question.id}`}
        className={response || response === false ? "" : "is-hidden"}
      >
        {question.formInput.label && (
          <div className="response ">
            <div>{question.formInput.label}</div>
          </div>
        )}
        <div className="response">
          <RenderInput
            formInput={question.formInput}
            userValues={userValues}
            question={question}
            answer={response}
            indexQuestion={question.id}
            questions={questions}
            setQuestions={setQuestions}
          />
        </div>
      </div>
      {!response && (
        <div
          className={response ? "is-hidden" : "inputField"}
          id={`send_input_${question.id}`}
        >
            <RenderInput
              formInput={question.formInput}
              userValues={userValues}
              setAnswer={setAnswer}
              answer={answer}
              sendAnswer={sendAnswer}
              isButtonDisplay={true}
              indexQuestion={question.id}
            />
        </div>
      )}
    </>
  );
};
export default RenderQuestion;
