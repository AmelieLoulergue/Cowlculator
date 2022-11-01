// Function beef: mitigations Long Term Breeding
import reductionEF_coeff from "../../../../coeff/reductionEF_coeff.json";
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
              datasForm.find(
                (data) =>
                  data.id ===
                  "farm_animals_beef_cattle_breeding_practice_portion_numb"
              ).response.value
            ) / 100
          : 0;
        numbBeefPracticesLTBreeding = portionBeefLTBreeding;
      }
    }
  }

  // EF emissions mitigated by the practice LTBreeding
  let mitigatedEFBeefLTBreeding = 0;
  if (
    datasForm.find(
      (data) => data.id === "farm_animals_beef_cattle_breeding_practice"
    )?.response &&
    cattleBeef &&
    cattleBeef !== 0 &&
    numbBeefPracticesLTBreeding !== 0
  ) {
    mitigatedEFBeefLTBreeding =
      numbBeefPracticesLTBreeding * EFBeef * coeffLTBreedingBeef;
  }
  return mitigatedEFBeefLTBreeding;
}
export default funcMitigationsLTBreedingBeef;
