// Function sheep: mitigations additives
import reductionEF_coeff from "../../coeff/reductionEF_coeff.json";
function funcMitigationsAdditiveSheep({ datasForm, EFSheep }) {
  //Coeff
  let coeffAdditiveSheep = reductionEF_coeff[2].Spec_agents_and_diet_additives;

  // Proportion of sheep included in the practice additives

  let numbSheepPracticesAdditive = 0;
  if (
    datasForm.find((element) => element.id === "farm_animals_sheeps")
      ?.response &&
    datasForm.find((element) => element.id === "farm_animals_sheeps_numb")
      ?.response?.value === 0
  ) {
    numbSheepPracticesAdditive = 0;
  } else {
    if (
      datasForm.find(
        (data) => data.id === "farm_animals_sheeps_specific_agent_practice"
      )?.response &&
      datasForm.find(
        (data) =>
          data.id === "farm_animals_sheeps_specific_agent_practice_portion"
      )?.response === "All of them"
    ) {
      numbSheepPracticesAdditive = 1;
    } else {
      if (
        datasForm.find(
          (data) => data.id === "farm_animals_sheeps_specific_agent_practice"
        )?.response &&
        datasForm.find(
          (data) =>
            data.id === "farm_animals_sheeps_specific_agent_practice_portion"
        )?.response === "A portion of them"
      ) {
        let portionSheepAdditive = datasForm.find(
          (data) =>
            data.id ===
            "farm_animals_sheeps_specific_agent_practice_portion_numb"
        )?.response?.value
          ? Number(
              datasForm.find(
                (data) =>
                  data.id ===
                  "farm_animals_sheeps_specific_agent_practice_portion_numb"
              ).response.value
            ) / 100
          : 0;
        numbSheepPracticesAdditive = portionSheepAdditive;
      }
    }
  }

  //EF emissions from cattle portion concerned by additives
  let EFSheepAdditive = 0;
  let mitigatedEFSheepAdditive = 0;
  if (
    datasForm.find(
      (data) => data.id === "farm_animals_sheeps_specific_agent_practice"
    )?.response &&
    numbSheepPracticesAdditive !== 0
  ) {
    EFSheepAdditive = numbSheepPracticesAdditive * EFSheep * coeffAdditiveSheep;
    mitigatedEFSheepAdditive =
      EFSheepAdditive + (1 - numbSheepPracticesAdditive) * EFSheep;
  } else {
    EFSheepAdditive = 0;
  }
  // Total EF emissions after mitigation

  return mitigatedEFSheepAdditive;
}
export default funcMitigationsAdditiveSheep;
