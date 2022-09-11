// Function sheep: mitigations LTBreeding
import reductionEF_coeff from "../../coeff/reductionEF_coeff.json";
function funcMitigationsLTBreedingSheep({ datasForm, EFSheep }) {
  //Coeff
  let coeffLTBreedingSheep = reductionEF_coeff[2].longterm_change_and_breeding;
  console.log(coeffLTBreedingSheep);
  // Proportion of sheep included in the practice LTBreeding

  let numbSheepPracticesLTBreeding = 0;
  if (
    datasForm.find((element) => element.id === "farm_animals_sheeps")
      ?.response &&
    datasForm.find((element) => element.id === "farm_animals_sheeps_numb")
      ?.response?.value === 0
  ) {
    numbSheepPracticesLTBreeding = 0;
  } else {
    if (
      datasForm.find(
        (data) => data.id === "farm_animals_sheeps_breeding_practice"
      )?.response &&
      datasForm.find(
        (data) => data.id === "farm_animals_sheeps_breeding_practice_portion"
      )?.response === "All of them"
    ) {
      numbSheepPracticesLTBreeding = 1;
    } else {
      if (
        datasForm.find(
          (data) => data.id === "farm_animals_sheeps_breeding_practice"
        )?.response &&
        datasForm.find(
          (data) => data.id === "farm_animals_sheeps_breeding_practice_portion"
        )?.response === "A portion of them"
      ) {
        let portionSheepLTBreeding = datasForm.find(
          (data) =>
            data.id === "farm_animals_sheeps_breeding_practice_portion_numb"
        )?.response?.value
          ? Number(
              datasForm.find(
                (data) =>
                  data.id ===
                  "farm_animals_sheeps_breeding_practice_portion_numb"
              ).response.value
            ) / 100
          : 0;
        numbSheepPracticesLTBreeding = portionSheepLTBreeding;
      }
    }
  }

  //EF emissions from cattle portion concerned by LTBreeding
  let EFSheepLTBreeding = 0;
  if (
    datasForm.find(
      (data) => data.id === "farm_animals_sheeps_breeding_practice"
    )?.response
  ) {
    EFSheepLTBreeding =
      numbSheepPracticesLTBreeding * EFSheep * coeffLTBreedingSheep;
  } else {
    EFSheepLTBreeding = 0;
  }
  // Mitigation percentage
  let mitigationPercentageSheepLTBreeding = (EFSheepLTBreeding * 100) / EFSheep;
  // Total EF emissions after mitigation
  let mitigatedEFSheepLTBreeding =
    EFSheepLTBreeding + (1 - numbSheepPracticesLTBreeding) * EFSheep;

  return {
    mitigatedEFSheepLTBreeding: mitigatedEFSheepLTBreeding,
    mitigationPercentageSheepLTBreeding: mitigationPercentageSheepLTBreeding,
  };
}
export default funcMitigationsLTBreedingSheep;
