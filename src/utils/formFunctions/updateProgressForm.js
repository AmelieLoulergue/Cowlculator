const updateProgressForm = ({
  resultInformations,
  setProgress,
  formInformations,
}) => {
  if (resultInformations?.allResultsUser?.length) {
    setProgress(
      Math.round(
        ((formInformations?.counterQuestion * 100) /
          formInformations?.allQuestions?.length) *
          10
      ) / 10
    );
  } else {
    setProgress(
      Math.round(
        ((formInformations?.counterQuestion * 100) /
          formInformations?.allQuestions?.length) *
          10
      ) / 10
    );
  }
};

export default updateProgressForm;
