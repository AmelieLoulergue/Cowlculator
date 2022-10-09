const controlResponse = ({
  setSeverity,
  answer,
  questionToDisplay,
  setMessageAlert,
  setDisplayAlert,
  stateList,
  datasForm,
}) => {
  if (answer === null) {
    setSeverity("error");
    setMessageAlert("Invalid Response");
    setDisplayAlert(true);
    setTimeout(() => setDisplayAlert(false), 3000);
    return false;
  } else if (
    (answer && answer.unit === "") ||
    (answer && answer.unit && !answer.value)
  ) {
    setSeverity("error");
    setMessageAlert("Please select an unit and fill value");
    setDisplayAlert(true);
    setTimeout(() => setDisplayAlert(false), 3000);
    return false;
  } else if (
    questionToDisplay.id === "farm_state" &&
    answer &&
    !stateList.find((element) => element === answer)
  ) {
    setSeverity("error");
    setMessageAlert("Please enter a valid state");
    setDisplayAlert(true);
    setTimeout(() => setDisplayAlert(false), 3000);
    return false;
  } else if (questionToDisplay.formInput.type === "date") {
    if (questionToDisplay.id === "start_date") {
      let start = new Date(answer);
      if (new Date(Date.now()) <= start) {
        setSeverity("error");
        setMessageAlert("Please enter a valid date in past");
        setDisplayAlert(true);
        setTimeout(() => setDisplayAlert(false), 3000);
        return false;
      } else {
        setSeverity("success");
        setMessageAlert("Response saved !");
        setDisplayAlert(true);
        setTimeout(() => setDisplayAlert(false), 3000);
        return true;
      }
    } else if (questionToDisplay.id === "end_date") {
      let start = new Date(
        datasForm.find((data) => data.id === "start_date")?.response
      );
      let end = new Date(answer);
      if (start > end) {
        setSeverity("error");
        setMessageAlert("End date must be after start date");
        setDisplayAlert(true);
        setTimeout(() => setDisplayAlert(false), 3000);
        return false;
      } else if (end - start <= 2628000000) {
        setSeverity("error");
        setMessageAlert(
          " The chosen period must be greater than or equal to 1 month"
        );
        setDisplayAlert(true);
        setTimeout(() => setDisplayAlert(false), 3000);
      } else if (new Date(Date.now()) <= end) {
        setSeverity("error");
        setMessageAlert("Please enter a valid date in past");
        setDisplayAlert(true);
        setTimeout(() => setDisplayAlert(false), 3000);
        return false;
      } else {
        setSeverity("success");
        setMessageAlert("Response saved !");
        setDisplayAlert(true);
        setTimeout(() => setDisplayAlert(false), 3000);
        return true;
      }
    }
  } else if (questionToDisplay.id === "farm_zip_code") {
    console.log(answer.length);
    console.log(Number(answer));
    if (answer.length !== 5 || isNaN(Number(answer))) {
      setSeverity("error");
      setMessageAlert("Please enter a valid zip code");
      setDisplayAlert(true);
      setTimeout(() => setDisplayAlert(false), 3000);
      return false;
    } else {
      setSeverity("success");
      setMessageAlert("Response saved !");
      setDisplayAlert(true);
      setTimeout(() => setDisplayAlert(false), 3000);
      return true;
    }
  } else {
    setSeverity("success");
    setMessageAlert("Response saved !");
    setDisplayAlert(true);
    setTimeout(() => setDisplayAlert(false), 3000);
    return true;
  }
};

export default controlResponse;
