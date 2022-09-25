// Function dairy: mitigations additives
import reductionEF_coeff from "../../coeff/reductionEF_coeff.json";
function funcMitigationsAdditiveDairy({ datasForm, EFDairy, cattleDairy }) {
  //Coeff
  let coeffAdditiveDairy = reductionEF_coeff[0].Spec_agents_and_diet_additives;

  // Proportion of animals included in the practice additives

  let numbDairyPracticesAdditive = 0;

  if (!cattleDairy || cattleDairy === 0) {
    numbDairyPracticesAdditive = 0;
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
      numbDairyPracticesAdditive = 1;
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
        let portionDairyAdditive = datasForm.find(
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
        numbDairyPracticesAdditive = portionDairyAdditive;
      }
    }
  }

  //EF emissions from cattle portion concerned by additives
  let EFDairyAdditive = 0;
  if (
    datasForm.find(
      (data) => data.id === "farm_animals_sheeps_specific_agent_practice"
    )?.response
  ) {
    EFDairyAdditive = numbDairyPracticesAdditive * EFDairy * coeffAdditiveDairy;
  } else {
    EFDairyAdditive = 0;
  }
  // Mitigation percentage
  let mitigationPercentageDairyAdditive = (EFDairyAdditive * 100) / EFDairy;
  // Total EF emissions after mitigation
  let mitigatedEFDairyAdditive =
    EFDairyAdditive + (1 - numbDairyPracticesAdditive) * EFDairy;
  
  return [mitigatedEFDairyAdditive, mitigationPercentageDairyAdditive];
}
export default funcMitigationsAdditiveDairy;
