const controlResponse = ({
  setAlertInformations,
  answer,
  questionToDisplay,
  stateList,
  datasForm,
}) => {
  const goodResponse = () => {
    setAlertInformations({
      severity: "success",
      messageAlert: "Response saved !",
      displayAlert: true,
    });
    setTimeout(
      () =>
        setAlertInformations({
          messageAlert: "",
          severity: "",
          displayAlert: false,
        }),
      3000
    );
  };
  const wrongResponse = (message) => {
    setAlertInformations({
      severity: "error",
      messageAlert: message,
      displayAlert: true,
    });
    setTimeout(
      () =>
        setAlertInformations({
          messageAlert: "",
          severity: "",
          displayAlert: false,
        }),
      3000
    );
  };
  if (answer === null) {
    wrongResponse("Invalid Response");
    return false;
  } else if (
    (answer && answer.unit === "") ||
    (answer && answer.unit && !answer.value)
  ) {
    wrongResponse("Please select an unit and fill value");
    return false;
  } else if (
    questionToDisplay.id === "farm_state" &&
    answer &&
    !stateList.find((element) => element === answer)
  ) {
    wrongResponse("Please enter a valid state");
    return false;
  } else if (questionToDisplay.formInput.type === "date") {
    if (questionToDisplay.id === "start_date") {
      let start = new Date(answer);
      if (new Date(Date.now()) <= start) {
        wrongResponse("Please enter a valid date in past");
        return false;
      } else {
        goodResponse();
        return true;
      }
    } else if (questionToDisplay.id === "end_date") {
      let start = new Date(
        datasForm.find((data) => data.id === "start_date")?.response
      );
      let end = new Date(answer);
      if (start > end) {
        wrongResponse("End date must be after start date");
        return false;
      } else if (end - start <= 2628000000) {
        wrongResponse(
          "The chosen period must be greater than or equal to 1 month"
        );
        return false;
      } else if (new Date(Date.now()) <= end) {
        wrongResponse("Please enter a valid date in past");
        return false;
      } else {
        goodResponse();
        return true;
      }
    }
  } else if (questionToDisplay.id === "farm_zip_code") {
    if (answer.length !== 5 || isNaN(Number(answer))) {
      wrongResponse("Please enter a valid zip code");
      return false;
    } else {
      goodResponse();

      return true;
    }
  } else {
    goodResponse();
    return true;
  }
};

export default controlResponse;
