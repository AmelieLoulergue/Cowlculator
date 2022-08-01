import RenderInput from "./RenderInput";
import sendIcon from "../../assets/svg/send.svg";
import { useState, useReducer, useEffect } from "react";

const RenderQuestion = ({
  question,
  questionIndex,
  numberOfResponse,
  setNumberOfResponse,
  userValues,
  counterBlocLimits,
  range,
  bloc_id,
  blocIndex,
  counter,
  setBlocIndex,
  totalCounterBloc,
  numberOfResponseBloc,
  setNumberOfResponseBloc,
}) => {
  const [blocs, allBlocs] = useState([]);
  const [questions, allQuestions] = useState([]);
  const [asks, allAsks] = useState([]);
  const [sendInputs, allSendInputs] = useState([]);
  const [responses, allResponses] = useState([]);
  const [displayButtonNextBloc, setDisplayButtonNextBloc] = useState(false);
  const [numberOfResponseBlocMax, setNumberOfResponseBlocMax] = useState(
    counterBlocLimits.find(
      (element) => Number(element.id.split("bloc_")[1]) === bloc_id
    ) &&
      counterBlocLimits.find(
        (element) => Number(element.id.split("bloc_")[1]) === bloc_id
      ).counter
  );
  useEffect(() => {
    if (totalCounterBloc === numberOfResponseBlocMax) {
      setDisplayButtonNextBloc(true);
    }
  }, [totalCounterBloc, numberOfResponse]);
  useEffect(() => {
    allBlocs(Array.from(document.querySelectorAll('[id^="bloc_"]')));
    allQuestions(Array.from(document.querySelectorAll('[id^="question_"]')));
    allAsks(Array.from(document.querySelectorAll('[id^="ask_"]')));
    allSendInputs(Array.from(document.querySelectorAll('[id^="send_input_"]')));
    allResponses(Array.from(document.querySelectorAll('[id^="response_"]')));
  }, []);
  useEffect(() => {
    blocs.map((element) =>
      Number(element.id.split("bloc_")[1]) <= blocIndex
        ? element.classList.remove("is-hidden")
        : element.classList.add("is-hidden")
    );
  }, [blocs]);
  useEffect(() => {
    questions.map((element) =>
      Number(element.id.split("question_")[1]) <= numberOfResponse + 1
        ? element.classList.remove("is-hidden")
        : element.classList.add("is-hidden")
    );
    asks.map((element) =>
      Number(element.id.split("ask_")[1]) <= numberOfResponse + 1
        ? element.classList.remove("is-hidden")
        : element.classList.add("is-hidden")
    );
    responses.map((element) =>
      Number(element.id.split("response_")[1]) < numberOfResponse + 1
        ? element.classList.remove("is-hidden")
        : element.classList.add("is-hidden")
    );
    sendInputs.map((element) =>
      Number(element.id.split("send_input_")[1]) === numberOfResponse + 1
        ? element.classList.remove("is-hidden")
        : element.classList.add("is-hidden")
    );
  }, [questions, numberOfResponse]);
  return (
    <>
      <div
        className={numberOfResponse <= totalCounterBloc ? "ask" : "is-hidden"}
        id={`ask_${counter}`}
      >
        <p>{question.question}</p>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column" }}
        id={`response_${counter}`}
      >
        {question.formInput.label && (
          <div className="response ">
            <div>{question.formInput.label}</div>
          </div>
        )}
        <div className="response">
          <div>
            <RenderInput
              formInput={question.formInput}
              userValues={userValues}
              question={question}
            />
          </div>
        </div>
      </div>
      <div className={"inputField"} id={`send_input_${counter}`}>
        <div className="response-input">
          <RenderInput formInput={question.formInput} userValues={userValues} />
        </div>
        <button
          className="btn"
          onClick={() => {
            setNumberOfResponse(numberOfResponse + 1);
            setNumberOfResponseBloc(numberOfResponseBloc + 1);
            // console.log({ numberOfResponse }, { totalCounterBloc });
          }}
        >
          <img src={sendIcon} alt=""></img>
        </button>
      </div>
      {displayButtonNextBloc && (
        <div
          className={
            totalCounterBloc === numberOfResponse ? "inputField" : "is-hidden"
          }
        >
          {" "}
          <button
            className="btn"
            onClick={() => {
              setBlocIndex(blocIndex + 1);
              setDisplayButtonNextBloc(false);
              // setNumberOfResponseBloc(0);

              // setNumberOfResponse(numberOfResponse + 1);
            }}
          >
            Passer au bloc suivant {totalCounterBloc} {numberOfResponse}
          </button>
        </div>
      )}
    </>
  );
};
export default RenderQuestion;
