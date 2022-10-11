// Function dairy: mitigations improved feeding
import reductionEF_coeff from "../../coeff/reductionEF_coeff.json";
function funcMitigationsImpFeedDairy({ datasForm, EFDairy, cattleDairy }) {
  //Coeff
  let coeffImpFeedDairy = reductionEF_coeff[0].Improved_feeding;

  // Proportion of animals included in the practice improved feeding

  //Dairy
  let numbDairyPractices = 0;
  if (!cattleDairy || cattleDairy === 0) {
    numbDairyPractices = 0;
  } else {
    if (
      datasForm.find(
        (data) => data.id === "farm_animals_dairy_cattle_feeding_practice"
      )?.response &&
      datasForm.find(
        (data) =>
          data.id === "farm_animals_dairy_cattle_feeding_practice_portion"
      )?.response === "All of them"
    ) {
      numbDairyPractices = 1;
    } else if (
      datasForm.find(
        (data) => data.id === "farm_animals_dairy_cattle_feeding_practice"
      )?.response &&
      datasForm.find(
        (data) =>
          data.id === "farm_animals_dairy_cattle_feeding_practice_portion"
      )?.response === "A portion of them"
    ) {
      let portionDairy = datasForm.find(
        (data) =>
          data.id === "farm_animals_dairy_cattle_feeding_practice_portion_numb"
      )?.response?.value
        ? Number(
            datasForm.find(
              (data) =>
                data.id ===
                "farm_animals_dairy_cattle_feeding_practice_portion_numb"
            ).response.value
          ) / 100
        : 0;
      numbDairyPractices = portionDairy;
    }
  }
  console.log(cattleDairy, numbDairyPractices);
  //EF emissions from cattle portion concerned by improved feeding
  let EFDairyImpFeed = 0;
  let mitigatedEFDairyImpFeed = 0;
  if (
    datasForm.find(
      (data) => data.id === "farm_animals_dairy_cattle_feeding_practice"
    )?.response &&
    cattleDairy &&
    cattleDairy !== 0 &&
    numbDairyPractices !== 0
  ) {
    mitigatedEFDairyImpFeed = numbDairyPractices * EFDairy * coeffImpFeedDairy;
    EFDairyImpFeed = EFDairy - mitigatedEFDairyImpFeed;
  } else {
    EFDairyImpFeed = 0;
  }
  // Total EF emissions after mitigation

  console.log({
    cattleDairy,
    numbDairyPractices,
    EFDairy,
    coeffImpFeedDairy,
    EFDairyImpFeed,
    mitigatedEFDairyImpFeed,
  });
  return mitigatedEFDairyImpFeed;
}
export default funcMitigationsImpFeedDairy;
