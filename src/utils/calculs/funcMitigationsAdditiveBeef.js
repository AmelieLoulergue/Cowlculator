// Function beef: mitigations additives
import reductionEF_coeff from "../../coeff/reductionEF_coeff.json";
function funcMitigationsAdditiveBeef({ datasForm, EFBeef, cattleBeef }) {
  //Coeff
  let coeffAdditiveBeef = reductionEF_coeff[1].Spec_agents_and_diet_additives;

  // Proportion of beef included in the practice additives

  let numbBeefPracticesAdditive = 0;
  if (!cattleBeef || cattleBeef === 0) {
    numbBeefPracticesAdditive = 0;
  } else {
    if (
      datasForm.find(
        (data) => data.id === "farm_animals_beef_cattle_specific_agent_practice"
      )?.response &&
      datasForm.find(
        (data) =>
          data.id === "farm_animals_beef_cattle_specific_agent_practice_portion"
      )?.response === "All of them"
    ) {
      numbBeefPracticesAdditive = 1;
    } else {
      if (
        datasForm.find(
          (data) =>
            data.id === "farm_animals_beef_cattle_specific_agent_practice"
        )?.response &&
        datasForm.find(
          (data) =>
            data.id ===
            "farm_animals_beef_cattle_specific_agent_practice_portion"
        )?.response === "A portion of them"
      ) {
        let portionBeefAdditive = datasForm.find(
          (data) =>
            data.id ===
            "farm_animals_beef_cattle_specific_agent_practice_portion_numb"
        )?.response?.value
          ? Number(
              datasForm.find(
                (data) =>
                  data.id ===
                  "farm_animals_beef_cattle_specific_agent_practice_portion_numb"
              ).response.value
            ) / 100
          : 0;
        numbBeefPracticesAdditive = portionBeefAdditive;
      }
    }
  }

  // EF emissions mitigated by the practice additives

  let EFBeefAdditive = 0;
  if (
    datasForm.find(
      (data) => data.id === "farm_animals_beef_cattle_specific_agent_practice"
    )?.response
  ) {
    EFBeefAdditive = numbBeefPracticesAdditive * EFBeef * coeffAdditiveBeef;
  } else {
    EFBeefAdditive = 0;
  }
  // Mitigation percentage
  let mitigationPercentageBeefAdditive = (EFBeefAdditive * 100) / EFBeef;
  // Total EF emissions after mitigation
  let mitigatedEFBeefAdditive =
    EFBeefAdditive + (1 - numbBeefPracticesAdditive) * EFBeef;
  console.log({
    coeffAdditiveBeef,
    EFBeef,
    EFBeefAdditive,
    mitigatedEFBeefAdditive,
    mitigationPercentageBeefAdditive,
  });
  return {
    mitigatedEFBeefAdditive: mitigatedEFBeefAdditive,
    mitigationPercentageBeefAdditive: mitigationPercentageBeefAdditive,
  };
}
export default funcMitigationsAdditiveBeef;
