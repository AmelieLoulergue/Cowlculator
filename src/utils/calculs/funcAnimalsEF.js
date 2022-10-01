import round from "./round";
import enteric_EF from "../../coeff/enteric_EF.json";
import regions from "../../coeff/regions.json";
// Function animals : emissions from enteric fermentation
function funcAnimalsEF({ datasForm, time, state }) {
  const findAnimal = (animal) => {
    return datasForm.find((data) => data.id === animal)?.response;
  };
  //Define the region
  let region = regions.find((region) => region.Code === state);
  region = region?.Regions_EPA.replace(" ", "_");
  // keep only the coeff for the region
  let coeffEF = [];
  enteric_EF.map((selectRegion) =>
    Object.entries(selectRegion).map((key, value) => {
      if (key[0] !== "name" && key[0] === region) {
        coeffEF.push({ name: selectRegion.name, coeff: key[1] });
      }
    })
  );

  console.log(coeffEF);
  // National average coeff for beef yearnling and weanling
  let coeffEFNatAv = [];
  enteric_EF.map((changeRegion) =>
    Object.entries(changeRegion).map((key, value) => {
      if (key[0] !== "name" && key[0] === "National_Average") {
        coeffEFNatAv.push({ name: changeRegion.name, coeff: key[1] });
      }
    })
  );
  console.log(coeffEFNatAv);
  //Extract animals' coeff based on the region
  let coeffDairyRep12EF =
    findAnimal("farm_animals_dairy_cattle") &&
    findAnimal("farm_animals_dairy_cattle_rep12")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_dairy_cattle_rep12"
          ).coeff
        )
      : 0;
  let coeffDairyRep24EF =
    findAnimal("farm_animals_dairy_cattle") &&
    findAnimal("farm_animals_dairy_cattle_rep24")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_dairy_cattle_rep24"
          ).coeff
        )
      : 0;
  let coeffDairyMatureEF =
    findAnimal("farm_animals_dairy_cattle") &&
    findAnimal("farm_animals_dairy_cattle_matur")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_dairy_cattle_matur"
          ).coeff
        )
      : 0;
  let coeffBeefRep12EF =
    findAnimal("farm_animals_beef_cattle") &&
    findAnimal("farm_animals_beef_cattle_rep12")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_beef_cattle_rep12"
          ).coeff
        )
      : 0;
  let coeffBeefRep24EF =
    findAnimal("farm_animals_beef_cattle") &&
    findAnimal("farm_animals_beef_cattle_rep24")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_beef_cattle_rep24"
          ).coeff
        )
      : 0;
  let coeffBeefMatureEF =
    findAnimal("farm_animals_beef_cattle") &&
    findAnimal("farm_animals_beef_cattle_matur")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_beef_cattle_matur"
          ).coeff
        )
      : 0;
  console.log(
    coeffEF.find(
      (element) => element.name === "farm_animals_beef_cattle_wealing"
    ).coeff,
    coeffEFNatAv.find(
      (element) => element.name === "farm_animals_beef_cattle_wealing"
    ).coeff
  );
  let coeffBeefWeanEF = coeffEF.find(
    (element) => element.name === "farm_animals_beef_cattle_wealing"
  ).coeff
    ? Number(
        coeffEF.find(
          (element) => element.name === "farm_animals_beef_cattle_wealing"
        ).coeff
      )
    : Number(
        coeffEFNatAv.find(
          (element) => element.name === "farm_animals_beef_cattle_wealing"
        ).coeff
      );
  console.log(coeffBeefWeanEF);
  let coeffBeefYearnEF = coeffEF.find(
    (element) => element.name === "farm_animals_beef_cattle_yearling"
  ).coeff
    ? Number(
        coeffEF.find(
          (element) => element.name === "farm_animals_beef_cattle_yearling"
        ).coeff
      )
    : Number(
        coeffEFNatAv.find(
          (element) => element.name === "farm_animals_beef_cattle_yearling"
        ).coeff
      );

  let coeffBeefBullsEF = Number(
    coeffEFNatAv.find(
      (element) => element.name === "farm_animals_beef_cattle_bulls"
    ).coeff
  );
  let coeffSheepEF = Number(
    coeffEFNatAv.find((element) => element.name === "farm_animals_sheeps").coeff
  );
  let coeffGoatEF = Number(
    coeffEFNatAv.find((element) => element.name === "farm_animals_goats").coeff
  );
  let coeffSwineEF = Number(
    coeffEFNatAv.find((element) => element.name === "farm_animals_swine").coeff
  );
  let coeffHorseEF = Number(
    coeffEFNatAv.find((element) => element.name === "farm_animals_horses").coeff
  );
  let coeffMulesEF = Number(
    coeffEFNatAv.find((element) => element.name === "farm_animals_mules").coeff
  );
  let coeffWaterBuffEF = Number(
    coeffEFNatAv.find(
      (element) => element.name === "farm_animals_water_buffalo"
    ).coeff
  );

  // //Calcul emissions from enteric fermentation for each animal
  let farm_animals_dairy_cattle_rep12_numb = findAnimal(
    "farm_animals_dairy_cattle_rep12_numb"
  )?.value
    ? Number(findAnimal("farm_animals_dairy_cattle_rep12_numb").value)
    : 0;
  let farm_animals_dairy_cattle_rep24_numb = findAnimal(
    "farm_animals_dairy_cattle_rep24_numb"
  )?.value
    ? Number(findAnimal("farm_animals_dairy_cattle_rep24_numb").value)
    : 0;
  let farm_animals_dairy_cattle_matur_numb = findAnimal(
    "farm_animals_dairy_cattle_matur_numb"
  )?.value
    ? Number(findAnimal("farm_animals_dairy_cattle_matur_numb").value)
    : 0;
  let EFDairy =
    ((farm_animals_dairy_cattle_rep12_numb * coeffDairyRep12EF * 25 +
      farm_animals_dairy_cattle_rep24_numb * coeffDairyRep24EF * 25 +
      farm_animals_dairy_cattle_matur_numb * coeffDairyMatureEF * 25) /
      1000) *
    time;

  let farm_animals_beef_cattle_rep12_numb = findAnimal(
    "farm_animals_beef_cattle_rep12_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_rep12_numb").value)
    : 0;
  let farm_animals_beef_cattle_rep24_numb = findAnimal(
    "farm_animals_beef_cattle_rep24_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_rep24_numb").value)
    : 0;
  let farm_animals_beef_cattle_matur_numb = findAnimal(
    "farm_animals_beef_cattle_matur_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_matur_numb").value)
    : 0;
  let farm_animals_beef_cattle_weanling_numb = findAnimal(
    "farm_animals_beef_cattle_wealing_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_wealing_numb").value)
    : 0;
  let farm_animals_beef_cattle_yearling_numb = findAnimal(
    "farm_animals_beef_cattle_yearling_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_yearling_numb").value)
    : 0;
  let farm_animals_beef_cattle_bulls_numb = findAnimal(
    "farm_animals_beef_cattle_bulls_numb"
  )?.value
    ? Number(findAnimal("farm_animals_beef_cattle_bulls_numb").value)
    : 0;
  let EFBeef =
    ((farm_animals_beef_cattle_rep12_numb * coeffBeefRep12EF * 25 +
      farm_animals_beef_cattle_rep24_numb * coeffBeefRep24EF * 25 +
      farm_animals_beef_cattle_matur_numb * coeffBeefMatureEF * 25 +
      farm_animals_beef_cattle_weanling_numb * coeffBeefWeanEF * 25 +
      farm_animals_beef_cattle_yearling_numb * coeffBeefYearnEF * 25 +
      farm_animals_beef_cattle_bulls_numb * coeffBeefBullsEF * 25) /
      1000) *
    time;
  let farm_animals_sheeps_numb =
    findAnimal("farm_animals_sheeps") &&
    findAnimal("farm_animals_sheeps_numb")?.value
      ? Number(findAnimal("farm_animals_sheeps_numb").value)
      : 0;
  let farm_animals_goats_numb =
    findAnimal("farm_animals_goats") &&
    findAnimal("farm_animals_goats_numb")?.value
      ? Number(findAnimal("farm_animals_goats_numb").value)
      : 0;
  let farm_animals_swine_numb =
    findAnimal("farm_animals_swine") &&
    findAnimal("farm_animals_swine_numb")?.value
      ? Number(findAnimal("farm_animals_swine_numb").value)
      : 0;
  let farm_animals_horses_numb =
    findAnimal("farm_animals_horses") &&
    findAnimal("farm_animals_horses_numb")?.value
      ? Number(findAnimal("farm_animals_horses_numb").value)
      : 0;
  let farm_animals_mules_numb =
    findAnimal("farm_animals_mules") &&
    findAnimal("farm_animals_mules_numb")?.value
      ? Number(findAnimal("farm_animals_mules_numb").value)
      : 0;
  let farm_animals_water_buffalo_numb =
    findAnimal("farm_animals_water_buffalo") &&
    findAnimal("farm_animals_water_buffalo_numb")?.value
      ? Number(findAnimal("farm_animals_water_buffalo_numb").value)
      : 0;
  let EFSheep = ((farm_animals_sheeps_numb * coeffSheepEF * 25) / 1000) * time;
  let EFGoat = ((farm_animals_goats_numb * coeffGoatEF * 25) / 1000) * time;
  let EFSwine = ((farm_animals_swine_numb * coeffSwineEF * 25) / 1000) * time;
  let EFHorse = ((farm_animals_horses_numb * coeffHorseEF * 25) / 1000) * time;
  let EFMules = ((farm_animals_mules_numb * coeffMulesEF * 25) / 1000) * time;
  let EFWaterBuff =
    ((farm_animals_water_buffalo_numb * coeffWaterBuffEF * 25) / 1000) * time;
  console.log({
    coeffBeefRep12EF,
    coeffBeefRep24EF,
    coeffBeefMatureEF,
    coeffBeefBullsEF,
    coeffBeefWeanEF,
    coeffBeefYearnEF,
    EFBeef,
  });
  console.log({ EFSheep, EFGoat, EFSwine, EFHorse, EFMules, EFWaterBuff });
  let EFtotal = round(
    EFDairy +
      EFBeef +
      EFSheep +
      EFGoat +
      EFSwine +
      EFHorse +
      EFMules +
      EFWaterBuff,
    1
  );
  return {
    EFDairy: EFDairy,
    EFBeef: EFBeef,
    EFSheep: EFSheep,
    EFGoat: EFGoat,
    EFSwine: EFSwine,
    EFHorse: EFHorse,
    EFMules: EFMules,
    EFWaterBuff: EFWaterBuff,
    EFtotal: EFtotal,
  };
}
export default funcAnimalsEF;
