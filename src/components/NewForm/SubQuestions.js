import RenderQuestion from "./RenderQuestion";
const SubQuestions = ({ question, sub_question }) => {
  if (typeof question.userValue !== "object" && question.userValue) {
    return (
      <>
        <RenderQuestion question={sub_question} />
        {sub_question.sub_questions &&
          sub_question.sub_questions.length > 0 &&
          sub_question.sub_questions.map((sub_question_2) => {
            if (
              typeof sub_question.userValue !== "object" &&
              sub_question.userValue
            ) {
              return (
                <>
                  <RenderQuestion question={sub_question_2} />
                </>
              );
            } else if (typeof sub_question.userValue === "object") {
              for (const [key, value] of Object.entries(
                sub_question_2.userValue
              )) {
                if (
                  (sub_question_2.id.includes("_cons") &&
                    key === sub_question_2.id.split("_cons")[0] &&
                    value) ||
                  (sub_question.id_2.includes("_type") &&
                    key === sub_question_2.id.split("_type")[0] &&
                    value) ||
                  (sub_question_2.id.includes("_size") &&
                    key === sub_question.id.split("_size")[0] &&
                    value)
                ) {
                  return (
                    <>
                      <RenderQuestion question={sub_question_2} />
                    </>
                  );
                }
              }
            }
          })}
      </>
    );
  } else if (typeof question.userValue === "object") {
    for (const [key, value] of Object.entries(question.userValue)) {
      if (
        (sub_question.id.includes("_cons") &&
          key === sub_question.id.split("_cons")[0] &&
          value) ||
        (sub_question.id.includes("_type") &&
          key === sub_question.id.split("_type")[0] &&
          value) ||
        (sub_question.id.includes("_size") &&
          key === sub_question.id.split("_size")[0] &&
          value)
      ) {
        return (
          <>
            <RenderQuestion question={sub_question} />
            {sub_question.sub_questions &&
              sub_question.sub_questions.length > 0 &&
              sub_question.sub_questions.map((sub_question_2) => {
                if (
                  typeof sub_question.userValue !== "object" &&
                  sub_question.userValue
                ) {
                  return (
                    <>
                      <RenderQuestion question={sub_question_2} />
                    </>
                  );
                } else if (typeof sub_question.userValue === "object") {
                  for (const [key, value] of Object.entries(
                    sub_question.userValue
                  )) {
                    console.log(sub_question_2);
                    if (
                      (sub_question_2.id.includes("_cons") &&
                        key === sub_question_2.id.split("_cons")[0] &&
                        value) ||
                      (sub_question_2.id.includes("_type") &&
                        key === sub_question_2.id.split("_type")[0] &&
                        value) ||
                      (sub_question_2.id.includes("_size") &&
                        key === sub_question_2.id.split("_size")[0] &&
                        value)
                    ) {
                      return (
                        <>
                          <RenderQuestion question={sub_question_2} />
                        </>
                      );
                    }
                  }
                }
              })}
          </>
        );
      }
    }
  }
};
export default SubQuestions;
