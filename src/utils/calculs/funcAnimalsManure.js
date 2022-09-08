import round from "./round";

// Function animals : emissions from manure
function funcAnimalsManure(datasForm, manure, time) {
  time = Number(time);

  // Group dairies and beefs

  let cattleDairy =
    datasForm.farm_dairy_cattle_rep12_numb.value +
    datasForm.farm_dairy_cattle_rep24_numb.value +
    datasForm.farm_dairy_cattle_matur_numb.value;

  let cattleBeef =
    datasForm.farm_beef_cattle_rep12_numb.value +
    datasForm.farm_beef_cattle_rep24_numb.value +
    datasForm.farm_beef_cattle_matur_numb.value +
    datasForm.farm_beef_cattle_weanling_numb.value +
    datasForm.farm_beef_cattle_yearling_numb.value +
    datasForm.farm_beef_cattle_bulls_numb.value;

  //Manure coeffs

  let coeffDairyManure = manure[0].CH4_emission;
  let coeffBeefManure = manure[1].CH4_emission;
  let coeffSwineManure = manure[2].CH4_emission;
  let coeffSheepManure = manure[3].CH4_emission;
  let coeffGoatManure = manure[4].CH4_emission;
  let coeffPoultryManure = manure[5].CH4_emission;
  let coeffHorseManure = manure[6].CH4_emission;
  let coeffMuleManure = manure[7].CH4_emission;
  let coeffAmBisonManure = manure[8].CH4_emission;

  // Calcul emissions from MANURE for each animal

  let manureDairy = ((cattleDairy * coeffDairyManure * 25) / 1000) * time;
  let manureBeef = ((cattleBeef * coeffBeefManure * 25) / 1000) * time;
  let manureSwine =
    ((datasForm.farm_swine_matur_numb.value * coeffSwineManure * 25) / 1000) *
    time;
  let manureSheep =
    ((datasForm.farm_sheeps_matur_numb.value * coeffSheepManure * 25) / 1000) *
    time;
  let manureGoat =
    ((datasForm.farm_goats_matur_numb.value * coeffGoatManure * 25) / 1000) *
    time;
  let manurePoultry =
    ((datasForm.farm_poultry_matur_numb.value * coeffPoultryManure * 25) /
      1000) *
    time;
  let manureHorse =
    ((datasForm.farm_horses_matur_numb.value * coeffHorseManure * 25) / 1000) *
    time;
  let manureMule =
    ((datasForm.farm_mules_matur_numb.value * coeffMuleManure * 25) / 1000) *
    time;
  let manureAmBison =
    ((datasForm.farm_american_bison_matur_numb.value *
      coeffAmBisonManure *
      25) /
      1000) *
    time;

  let manureTotal = round(
    manureDairy +
      manureBeef +
      manureSwine +
      manureSheep +
      manureGoat +
      manurePoultry +
      manureHorse +
      manureMule +
      manureAmBison,
    1
  );

  return manureTotal;
}
export default funcAnimalsManure;
