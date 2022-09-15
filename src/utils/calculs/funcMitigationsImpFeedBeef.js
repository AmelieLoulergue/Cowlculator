import reductionEF_coeff from "../../coeff/reductionEF_coeff.json";
function funcMitigationsImpFeedBeef({ datasForm, EFBeef, cattleBeef }) {
  //Coeff
  let coeffImpFeedBeef = reductionEF_coeff[1].Improved_feeding;

  // Proportion of beef included in the practice improved feeding

  let numbBeefPractices = 0;
  if (!cattleBeef || cattleBeef === 0) {
    numbBeefPractices = 0;
  } else {
    if (
      datasForm.find(
        (data) => data.id === "farm_animals_beef_cattle_feeding_practice"
      )?.response &&
      datasForm.find(
        (data) =>
          data.id === "farm_animals_beef_cattle_feeding_practice_portion"
      )?.response === "All of them"
    ) {
      numbBeefPractices = 1;
    } else {
      if (
        datasForm.find(
          (data) => data.id === "farm_animals_beef_cattle_feeding_practice"
        )?.response &&
        datasForm.find(
          (data) =>
            data.id === "farm_animals_beef_cattle_feeding_practice_portion"
        )?.response === "A portion of them"
      ) {
        let portionBeef = datasForm.find(
          (data) =>
            data.id === "farm_animals_beef_cattle_feeding_practice_portion_numb"
        )?.response?.value
          ? Number(
              datasForm.find(
                (data) =>
                  data.id ===
                  "farm_animals_beef_cattle_feeding_practice_portion_numb"
              ).response.value
            ) / 100
          : 0;
        numbBeefPractices = portionBeef;
      }
    }
  }

  // EF emissions mitigated by the practice improved feeding

  let EFBeefImpFeed = 0;
  if (
    datasForm.find(
      (data) => data.id === "farm_animals_beef_cattle_feeding_practice"
    )?.response
  ) {
    EFBeefImpFeed = numbBeefPractices * EFBeef * coeffImpFeedBeef;
  } else {
    EFBeefImpFeed = 0;
  }
  // Mitigation percentage
  let mitigationPercentageBeefImpFeed = (EFBeefImpFeed * 100) / EFBeef;
  // Total EF emissions after mitigation
  let mitigatedEFBeefImpFeed = EFBeefImpFeed + (1 - numbBeefPractices) * EFBeef;
  console.log({
    coeffImpFeedBeef,
    EFBeef,
    EFBeefImpFeed,
    mitigatedEFBeefImpFeed,
    mitigationPercentageBeefImpFeed,
  });
  return {
    mitigatedEFBeefImpFeed: mitigatedEFBeefImpFeed,
    mitigationPercentageBeefImpFeed: mitigationPercentageBeefImpFeed,
  };
}
export default funcMitigationsImpFeedBeef;
