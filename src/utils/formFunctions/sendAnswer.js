import controlResponse from "./controlResponse";
import saveAnswer from "./saveAnswer";
import elec_state_coeff from "../../coeff/elec_state_coeff.json";

const sendAnswer = ({
  setAlertInformations,
  answer,
  setAnswer,
  formInformations,
  setFormInformations,
}) => {
  const stateList = elec_state_coeff.map((element) => element.State);
  const responseIsOk = controlResponse({
    setAlertInformations,
    answer:
      !answer &&
      formInformations.questionToDisplay.formInput.type === "checkbox"
        ? "NO"
        : answer,
    questionToDisplay: formInformations?.questionToDisplay,
    stateList,
    datasForm: formInformations?.datasForm,
  });
  if (responseIsOk) {
    saveAnswer({
      formInformations,
      answer: !answer ? "NO" : answer,
      setFormInformations,
      setAnswer,
    });
  }
};
export default sendAnswer;
