import React, { useRef, useState } from "react";
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
  const [yesChecked, setYesChecked] = useState(true);
  const inputRef = useRef(null);

  console.log(answer);
  return (
    <div id={"input_" + indexQuestion} className={"response-input"}>
      {formInput.type === "checkbox" && <h3>YES</h3>}
      <input
        ref={inputRef}
        style={formInput.type === "checkbox" ? { width: "3rem" } : {}}
        type={formInput.type}
        onChange={(event) => {
          console.log(event.target.value, "zizi");
          isButtonDisplay
            ? setAnswer(
                formInput.type === "checkbox"
                  ? event.target.checked
                  : event.target.value
              )
            : setQuestions(
                questions.map((question) => {
                  if (question.id === indexQuestion) {
                    formInput.type === "checkbox" && setYesChecked(!yesChecked);
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
        checked={formInput.type === "checkbox" ? yesChecked : answer}
      />
      {formInput.type === "checkbox" && (
        <>
          <h3>NO</h3>
          <input
            style={{ width: "3rem" }}
            ref={inputRef}
            type={formInput.type}
            onChange={(event) => {
              setYesChecked(!yesChecked);
              setQuestions(
                questions.map((question) => {
                  if (question.id === indexQuestion) {
                    formInput.type === "checkbox" && setYesChecked(!yesChecked);
                    return {
                      ...question,
                      response: event.target.checked ? "false" : true,
                    };
                  } else {
                    return question;
                  }
                })
              );
            }}
            checked={!yesChecked}
          />
        </>
      )}

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
