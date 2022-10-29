import React from "react";
function RenderResponse({ indexQuestion, answer }) {
  return (
    <div id={"response_" + indexQuestion} className={"response-input"}>
      {answer === true ? (
        <>YES</>
      ) : answer === false || !answer ? (
        <>NO</>
      ) : typeof answer === "object" && answer && answer.value ? (
        <>
          <p style={{ paddingRight: "0.5rem" }}>{answer.value}</p>
          <p>{answer.unit}</p>
        </>
      ) : (
        <p>{answer ? answer : "NO"}</p>
      )}
    </div>
  );
}

export default RenderResponse;
