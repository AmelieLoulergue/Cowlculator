import round from "./round";
import manure from "../../coeff/manure.json";
// Function animals : emissions from manure
function funcAnimalsManure({ datasForm, time }) {
  const findAnimal = (animal) => {
    return datasForm.find((data) => data.id === animal)?.response;
  };
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

  // Group dairies and beefs

  let cattleDairy =
    farm_animals_dairy_cattle_rep12_numb +
    farm_animals_dairy_cattle_rep24_numb +
    farm_animals_dairy_cattle_matur_numb;

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
  let cattleBeef =
    farm_animals_beef_cattle_rep12_numb +
    farm_animals_beef_cattle_rep24_numb +
    farm_animals_beef_cattle_matur_numb +
    farm_animals_beef_cattle_weanling_numb +
    farm_animals_beef_cattle_yearling_numb +
    farm_animals_beef_cattle_bulls_numb;

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
  let farm_animals_poultry_numb =
    findAnimal("farm_animals_poultry") &&
    findAnimal("farm_animals_poultry_numb")?.value
      ? Number(findAnimal("farm_animals_poultry_numb").value)
      : 0;
  let manureDairy = ((cattleDairy * coeffDairyManure * 25) / 1000) * time;
  let manureBeef = ((cattleBeef * coeffBeefManure * 25) / 1000) * time;
  let manureSwine =
    ((farm_animals_swine_numb * coeffSwineManure * 25) / 1000) * time;
  let manureSheep =
    ((farm_animals_sheeps_numb * coeffSheepManure * 25) / 1000) * time;
  let manureGoat =
    ((farm_animals_goats_numb * coeffGoatManure * 25) / 1000) * time;
  let manurePoultry =
    ((farm_animals_poultry_numb * coeffPoultryManure * 25) / 1000) * time;
  let manureHorse =
    ((farm_animals_horses_numb * coeffHorseManure * 25) / 1000) * time;
  let manureMule =
    ((farm_animals_mules_numb * coeffMuleManure * 25) / 1000) * time;
  let manureAmBison =
    ((farm_animals_water_buffalo_numb * coeffAmBisonManure * 25) / 1000) * time;

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
