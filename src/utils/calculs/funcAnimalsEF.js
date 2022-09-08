import round from "./round";
// Function animals : emissions from enteric fermentation
function funcAnimalsEF(datasForm, enteric_EF, regions, time) {
  time = Number(time);

  //Define the region

  let state = datasForm.demographics.state;
  console.log(state);
  let region = regions.find((region) => region.Code === state);
  console.log(region);
  region = region.Regions_EPA.replace(" ", "_");
  console.log(region);
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
      if (key[0] !== "name" && key[0] === "National Average") {
        coeffEFNatAv.push({ name: changeRegion.name, coeff: key[1] });
      }
    })
  );
  console.log(coeffEFNatAv);

  //Extract animals' coeff based on the region

  let coeffDairyRep12EF = Number(coeffEF[1].coeff);
  let coeffDairyRep24EF = Number(coeffEF[2].coeff);
  let coeffDairyMatureEF = Number(coeffEF[3].coeff);

  let coeffBeefRep12EF = Number(coeffEF[5].coeff);
  let coeffBeefRep24EF = Number(coeffEF[6].coeff);
  let coeffBeefMatureEF = Number(coeffEF[7].coeff);

  let coeffBeefWeanEF = 0;
  if (coeffEF[8].coeff === null) {
    coeffBeefWeanEF = Number(coeffEFNatAv[8].coeff);
  } else {
    coeffBeefWeanEF = Number(coeffEF[8].coeff);
  }

  let coeffBeefYearnEF = 0;
  if (coeffEF[9].coeff === null) {
    coeffBeefYearnEF = Number(coeffEFNatAv[9].coeff);
  } else {
    coeffBeefYearnEF = Number(coeffEF[9].coeff);
  }

  let coeffBeefBullsEF = Number(coeffEF[10].coeff);

  let coeffSheepEF = Number(coeffEFNatAv[11].coeff);
  let coeffGoatEF = Number(coeffEFNatAv[12].coeff);
  let coeffSwineEF = Number(coeffEFNatAv[13].coeff);
  let coeffHorseEF = Number(coeffEFNatAv[14].coeff);
  let coeffMulesEF = Number(coeffEFNatAv[15].coeff);
  let coeffWaterBuffEF = Number(coeffEFNatAv[16].coeff);

  //Calcul emissions from enteric fermentation for each animal
  let EFDairy =
    ((datasForm.farm_dairy_cattle_rep12_numb.value * coeffDairyRep12EF * 25 +
      datasForm.farm_dairy_cattle_rep24_numb.value * coeffDairyRep24EF * 25 +
      datasForm.farm_dairy_cattle_matur_numb.value * coeffDairyMatureEF * 25) /
      1000) *
    time;

  let EFBeef =
    ((datasForm.farm_beef_cattle_rep12_numb.value * coeffBeefRep12EF * 25 +
      datasForm.farm_beef_cattle_rep24_numb.value * coeffBeefRep24EF * 25 +
      datasForm.farm_beef_cattle_matur_numb.value * coeffBeefMatureEF * 25 +
      datasForm.farm_beef_cattle_weanling_numb.value * coeffBeefWeanEF * 25 +
      datasForm.farm_beef_cattle_yearling_numb.value * coeffBeefYearnEF * 25 +
      datasForm.farm_beef_cattle_bulls_numb.value * coeffBeefBullsEF * 25) /
      1000) *
    time;

  let EFSheep =
    ((datasForm.farm_sheeps_matur_numb.value * coeffSheepEF * 25) / 1000) *
    time;
  let EFGoat =
    ((datasForm.farm_goats_matur_numb.value * coeffGoatEF * 25) / 1000) * time;
  let EFSwine =
    ((datasForm.farm_swine_matur_numb.value * coeffSwineEF * 25) / 1000) * time;
  let EFHorse =
    ((datasForm.farm_horses_matur_numb.value * coeffHorseEF * 25) / 1000) *
    time;
  let EFMules =
    ((datasForm.farm_mules_matur_numb.value * coeffMulesEF * 25) / 1000) * time;
  let EFWaterBuff =
    ((datasForm.farm_water_buffalo_matur_numb.value * coeffWaterBuffEF * 25) /
      1000) *
    time;

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
  return [
    EFDairy,
    EFBeef,
    EFSheep,
    EFGoat,
    EFSwine,
    EFHorse,
    EFMules,
    EFWaterBuff,
    EFtotal,
  ];
}
export default funcAnimalsEF;
