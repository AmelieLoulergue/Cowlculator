import RenderInput from "./RenderInput";
import RenderResponse from "./RenderResponse";
import React, { useState } from "react";

const RenderQuestion = ({
  question,
  sendAnswer,
  setAnswer,
  response,
  answer,
  goPrecedentQuestion,
  questions,
  other,
  setOther,
}) => {
  let others = [];
  if (question.id === "other_kerosene" && !others?.length) {
    others = [
      ...new Set(
        questions
          .filter(
            (question) =>
              question.parentId === "other" &&
              !others.find((element) => element.id === question.id)
          )
          .map((element) => element.id)
      ),
    ];
  }
  const [unit, setUnit] = useState(null);

  return (
    <>
      <div id={`ask_${question.id}`} className="ask">
        <p>
          {question.parentId === "other"
            ? "Select all other sources of energy :"
            : question.question}
        </p>
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
          <RenderResponse
            question={question}
            answer={response}
            indexQuestion={question.id}
            unit={unit}
          />
        </div>
      </div>
      {typeof response !== "boolean" && response !== null && !response && (
        <div
          className={response ? "is-hidden" : "inputField"}
          id={`send_input_${question.id}`}
        >
          <RenderInput
            formInput={question.formInput}
            setAnswer={setAnswer}
            answer={answer}
            sendAnswer={sendAnswer}
            isButtonDisplay={true}
            indexQuestion={question.id}
            goPrecedentQuestion={goPrecedentQuestion}
            question={question}
            unit={unit}
            setUnit={setUnit}
            others={others}
            other={other}
            setOther={setOther}
          />
        </div>
      )}
    </>
  );
};
export default RenderQuestion;
