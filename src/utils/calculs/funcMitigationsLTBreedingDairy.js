// Function dairy: long term breeding
import reductionEF_coeff from "../../coeff/reductionEF_coeff.json";
function funcMitigationsLTBreedingDairy({ datasForm, EFDairy, cattleDairy }) {
  //Coeff
  let coeffLTBreedingDairy = reductionEF_coeff[0].longterm_change_and_breeding;
  // Proportion of animals included in the practice LTBreeding

  let numbDairyPracticesLTBreeding = 0;

  if (
    !cattleDairy ||
    cattleDairy === 0 ||
    !datasForm.find(
      (data) => data.id === "farm_animals_dairy_cattle_animal_breeding_practice"
    )?.response
  ) {
    numbDairyPracticesLTBreeding = 0;
  } else {
    if (
      datasForm.find(
        (data) =>
          data.id === "farm_animals_dairy_cattle_animal_breeding_practice"
      )?.response &&
      datasForm.find(
        (data) =>
          data.id ===
          "farm_animals_dairy_cattle_animal_breeding_practice_portion"
      )?.response === "All of them"
    ) {
      numbDairyPracticesLTBreeding = 1;
    } else {
      if (
        datasForm.find(
          (data) =>
            data.id === "farm_animals_dairy_cattle_animal_breeding_practice"
        )?.response &&
        datasForm.find(
          (data) =>
            data.id ===
            "farm_animals_dairy_cattle_animal_breeding_practice_portion"
        )?.response === "A portion of them"
      ) {
        let portionDairyLTBreeding = datasForm.find(
          (data) =>
            data.id ===
            "farm_animals_dairy_cattle_animal_breeding_practice_portion_numb"
        )?.response?.value
          ? Number(
              datasForm.find(
                (data) =>
                  data.id ===
                  "farm_animals_dairy_cattle_animal_breeding_practice_portion_numb"
              ).response.value
            ) / 100
          : 0;
        numbDairyPracticesLTBreeding = portionDairyLTBreeding;
      }
    }
  }
  //EF emissions from cattle portion concerned by LTBreeding
  let EFDairyLTBreeding = 0;
  let mitigatedEFDairyLTBreeding = 0;
  if (
    datasForm.find(
      (data) => data.id === "farm_animals_dairy_cattle_animal_breeding_practice"
    )?.response &&
    cattleDairy &&
    cattleDairy !== 0 &&
    numbDairyPracticesLTBreeding !== 0
  ) {
    EFDairyLTBreeding =
      numbDairyPracticesLTBreeding * EFDairy * coeffLTBreedingDairy;
    mitigatedEFDairyLTBreeding =
      EFDairyLTBreeding + (1 - numbDairyPracticesLTBreeding) * EFDairy;
  } else {
    EFDairyLTBreeding = 0;
  }
  // Total EF emissions after mitigation
  console.log(mitigatedEFDairyLTBreeding);
  return mitigatedEFDairyLTBreeding;
}
export default funcMitigationsLTBreedingDairy;
