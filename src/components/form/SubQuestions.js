const SubQuestions = ({ children, question, sub_question }) => {
  if (typeof question.userValue !== "object") {
    if (question.userValue) {
      return children;
    }
  } else if (typeof question.userValue === "object") {
    for (const [key, value] of Object.entries(question.userValue)) {
      if (
        (sub_question.id.includes("_cons") &&
          key === sub_question.id.split("_cons")[0]) ||
        (sub_question.id.includes("_type") &&
          key === sub_question.id.split("_type")[0] &&
          value) ||
        (sub_question.id.includes("_size") &&
          key === sub_question.id.split("_size")[0] &&
          value) ||
        (sub_question.id.includes("_grown") &&
          key === sub_question.id.split("_grown")[0] &&
          value)
      ) {
        return children;
      }
    }
  }
};
export default SubQuestions;
