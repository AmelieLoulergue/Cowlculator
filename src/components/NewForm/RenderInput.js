import React, { useRef } from "react";
import sendIcon from "../../assets/svg/send.svg";

function RenderInput({
  formInput,
  indexQuestion,
  setAnswer,
  answer,
  sendAnswer,
  isButtonDisplay = false,
  questions,
  setQuestions,
}) {
  const inputRef = useRef(null);

  console.log(answer);
  return (
    <div id={"input_" + indexQuestion} className={"response-input"}>
      <input
        ref={inputRef}
        type={formInput.type}
        onChange={(event) => {
          isButtonDisplay
            ? setAnswer(
                formInput.type === "checkbox"
                  ? event.target.checked
                  : event.target.value
              )
            : setQuestions(
                questions.map((question) => {
                  if (question.id === indexQuestion) {
                    return {
                      ...question,
                      response:
                        formInput.type === "number" &&
                        (event.target.value === 0 ||
                          event.target.value === "0" ||
                          event.target.value === null ||
                          event.target.value === undefined ||
                          event.target.value === "")
                          ? " "
                          : formInput.type === "checkbox"
                          ? event.target.checked
                          : event.target.value,
                    };
                  } else {
                    return question;
                  }
                })
              );
        }}
        value={answer || ""}
        checked={answer === "false" ? false : answer}
      />

      {isButtonDisplay && (
        <button
          className="btn"
          onClick={() => {
            sendAnswer();
            inputRef.current.value = null;
            window.scrollTo(0, document.body.scrollHeight);
          }}
        >
          <img src={sendIcon} alt=""></img>
        </button>
      )}
    </div>
  );
}

export default RenderInput;
