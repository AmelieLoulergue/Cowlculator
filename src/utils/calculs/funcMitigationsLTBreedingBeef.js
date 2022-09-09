// Function beef: mitigations Long Term Breeding
import reductionEF_coeff from "../../coeff/reductionEF_coeff.json";
function funcMitigationsLTBreedingBeef({ datasForm, EFBeef, cattleBeef }) {
  //Coeff
  let coeffLTBreedingBeef = reductionEF_coeff[1].longterm_change_and_breeding;

  // Proportion of beef included in the practice LTBreeding

  let numbBeefPracticesLTBreeding = 0;
  if (!cattleBeef || cattleBeef === 0) {
    numbBeefPracticesLTBreeding = 0;
  } else {
    if (
      datasForm.find(
        (data) => data.id === "farm_animals_beef_cattle_breeding_practice"
      )?.response &&
      datasForm.find(
        (data) =>
          data.id === "farm_animals_beef_cattle_breeding_practice_portion"
      )?.response === "All of them"
    ) {
      numbBeefPracticesLTBreeding = 1;
    } else {
      if (
        datasForm.find(
          (data) => data.id === "farm_animals_beef_cattle_breeding_practice"
        )?.response &&
        datasForm.find(
          (data) =>
            data.id === "farm_animals_beef_cattle_breeding_practice_portion"
        )?.response === "A portion of them"
      ) {
        let portionBeefLTBreeding = datasForm.find(
          (data) =>
            data.id ===
            "farm_animals_beef_cattle_breeding_practice_portion_numb"
        )?.response?.value
          ? Number(
              datasForm.find((data) => data.id === "c_portion_numb").response
                .value
            ) / 100
          : 0;
        numbBeefPracticesLTBreeding = portionBeefLTBreeding;
      }
    }
  }

  // EF emissions mitigated by the practice LTBreeding

  let EFBeefLTBreeding = 0;
  if (
    datasForm.find(
      (data) => data.id === "farm_animals_beef_cattle_breeding_practice"
    )?.response
  ) {
    EFBeefLTBreeding =
      numbBeefPracticesLTBreeding * EFBeef * coeffLTBreedingBeef;
  } else {
    EFBeefLTBreeding = 0;
  }
  // Mitigation percentage
  let mitigationPercentageBeefLTBreeding = (EFBeefLTBreeding * 100) / EFBeef;
  // Total EF emissions after mitigation
  let mitigatedEFBeefLTBreeding =
    EFBeefLTBreeding + (1 - numbBeefPracticesLTBreeding) * EFBeef;

  return {
    mitigatedEFBeefLTBreeding: mitigatedEFBeefLTBreeding,
    mitigationPercentageBeefLTBreeding: mitigationPercentageBeefLTBreeding,
  };
}
export default funcMitigationsLTBreedingBeef;
