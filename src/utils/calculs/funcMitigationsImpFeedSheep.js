import reductionEF_coeff from "../../coeff/reductionEF_coeff.json";
function funcMitigationsImpFeedSheep({ datasForm, EFSheep }) {
  //Coeff
  let coeffImpFeedSheep = reductionEF_coeff[2].Improved_feeding;
  console.log(coeffImpFeedSheep);
  // Proportion of sheep included in the practice improved feeding

  let numbSheepPractices = 0;
  if (
    datasForm.find((element) => element.id === "farm_animals_sheeps")
      ?.response &&
    datasForm.find((element) => element.id === "farm_animals_sheeps_numb")
      ?.response?.value === 0
  ) {
    numbSheepPractices = 0;
  } else {
    if (
      datasForm.find(
        (data) => data.id === "farm_animals_sheeps_feeding_practice"
      )?.response &&
      datasForm.find(
        (data) => data.id === "farm_animals_sheeps_feeding_practice_portion"
      )?.response === "All of them"
    ) {
      numbSheepPractices = 1;
    } else {
      if (
        datasForm.find(
          (data) => data.id === "farm_animals_sheeps_feeding_practice"
        )?.response &&
        datasForm.find(
          (data) => data.id === "farm_animals_sheeps_feeding_practice_portion"
        )?.response === "A portion of them"
      ) {
        let portionSheep = datasForm.find(
          (data) =>
            data.id === "farm_animals_sheeps_feeding_practice_portion_numb"
        )?.response?.value
          ? Number(
              datasForm.find(
                (data) =>
                  data.id ===
                  "farm_animals_sheeps_feeding_practice_portion_numb"
              ).response.value
            ) / 100
          : 0;
        numbSheepPractices = portionSheep;
      }
    }
  }

  //EF emissions from cattle portion concerned by improved feeding
  let EFSheepImpFeed = 0;
  if (
    datasForm.find((data) => data.id === "farm_animals_sheeps_feeding_practice")
      ?.response
  ) {
    EFSheepImpFeed = numbSheepPractices * EFSheep * coeffImpFeedSheep;
  } else {
    EFSheepImpFeed = 0;
  }
  // Mitigation percentage
  let mitigationPercentageSheepImpFeed = (EFSheepImpFeed * 100) / EFSheep;
  // Total EF emissions after mitigation
  let mitigatedEFSheepImpFeed =
    EFSheepImpFeed + (1 - numbSheepPractices) * EFSheep;

  return {
    mitigatedEFSheepImpFeed: mitigatedEFSheepImpFeed,
    mitigationPercentageSheepImpFeed: mitigationPercentageSheepImpFeed,
  };
}
export default funcMitigationsImpFeedSheep;