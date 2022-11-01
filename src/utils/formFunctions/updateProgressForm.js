const updateProgressForm = ({
  resultInformations,
  setProgress,
  formInformations,
}) => {
  if (resultInformations?.allResultsUser?.length) {
    setProgress(
      formInformations?.counterQuestion === -1
        ? 100
        : Math.round(
            (((formInformations?.counterQuestion - 3) * 100) /
              formInformations?.allQuestions?.length) *
              10
          ) / 10
    );
  } else {
    setProgress(
      formInformations?.counterQuestion === -1
        ? 100
        : Math.round(
            ((formInformations?.counterQuestion * 100) /
              formInformations?.allQuestions?.length) *
              10
          ) / 10
    );
  }
};

export default updateProgressForm;
