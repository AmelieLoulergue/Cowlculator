import RenderInput from "./RenderInput";
const RenderQuestion = ({ question }) => {
  return (
    <>
      <div className="form_id">{question.id}</div>
      <div>{question.question}</div>
      <div>
        <RenderInput formInput={question.formInput} />
      </div>
    </>
  );
};
export default RenderQuestion;
