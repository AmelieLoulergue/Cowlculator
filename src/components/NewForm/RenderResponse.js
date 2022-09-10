import React, { useRef, useState } from "react";
import sendIcon from "../../assets/svg/send.svg";
import back_arrow from "../../assets/svg/back-arrow.svg";
function RenderResponse({ indexQuestion, answer, question, unit }) {
  return (
    <div id={"response_" + indexQuestion} className={"response-input"}>
        {answer === true ? (
          <>YES</>
        ) : answer === false ? (
          <>NO</>
        ) : (
          <p>{answer}</p>
        )}
        {question.userValue.unit &&
          typeof question.userValue.unit === "string" && (
            <p>{question.userValue.unit}</p>
          )}
        {unit && <p>{unit}</p>}
    </div>
  );
}

export default RenderResponse;
