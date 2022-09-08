import React, { useRef, useState } from "react";
import sendIcon from "../../assets/svg/send.svg";
import back_arrow from "../../assets/svg/back-arrow.svg";
function RenderResponse({ indexQuestion, answer }) {
  return (
    <div id={"response_" + indexQuestion} className={"response-input"}>
      {answer === true ? (
        <>YES</>
      ) : answer === false ? (
        <>NO</>
      ) : typeof answer === "object" && answer && answer.value ? (
        <>
          <p style={{ paddingRight: "0.5rem" }}>{answer.value}</p>
          <p>{answer.unit}</p>
        </>
      ) : (
        <p>{answer}</p>
      )}
    </div>
  );
}

export default RenderResponse;
