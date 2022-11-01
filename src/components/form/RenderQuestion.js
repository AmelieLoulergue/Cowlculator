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
}) => {
  const [unit, setUnit] = useState(null);

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
        {question?.formInput?.label && (
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
          />
        </div>
      )}
    </>
  );
};
export default RenderQuestion;
