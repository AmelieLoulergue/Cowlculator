import RenderInput from "./RenderInput";
import sendIcon from "../../assets/svg/send.svg";

const RenderQuestion = ({
  question,
  numberOfResponse,
  setNumberOfResponse,
  userValues,
  hasResponse,
}) => {
  console.log(question.index_id);
  let question_id = Number(question.question_id.split("-")[1].split("_")[1]);
  return (
    <>
      <div id={`ask_${question_id}`} className="ask">
        <p>{question.question}</p>
      </div>

      <div
        style={{ display: "flex", flexDirection: "column" }}
        id={`response_${question_id}`}
        className={numberOfResponse >= question.index_id + 1 ? "" : "is-hidden"}
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
      <div
        className={hasResponse ? "is-hidden" : "inputField"}
        id={`send_input_${question_id}`}
      >
        <div className="response-input">
          <RenderInput formInput={question.formInput} userValues={userValues} />
        </div>
        <button
          className="btn"
          onClick={() => {
            setNumberOfResponse(numberOfResponse + 1);
          }}
        >
          <img src={sendIcon} alt=""></img>
        </button>
      </div>
    </>
  );
};
export default RenderQuestion;
