import round from "./round";
import manure from "../../coeff/manure.json";
import findResponseElementById from "../global/findResponseElementById";
import { getCattleBeef, getCattleDairy } from "./getCattleAnimals";
// Function animals : emissions from manure
function funcAnimalsManure({ datasForm, time }) {
  const cattleDairy = getCattleDairy({ datasForm });
  const cattleBeef = getCattleBeef({ datasForm });

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
    findResponseElementById(datasForm, "farm_animals_sheeps") &&
    findResponseElementById(datasForm, "farm_animals_sheeps_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_sheeps_numb").value
        )
      : 0;
  let farm_animals_goats_numb =
    findResponseElementById(datasForm, "farm_animals_goats") &&
    findResponseElementById(datasForm, "farm_animals_goats_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_goats_numb").value
        )
      : 0;
  let farm_animals_swine_numb =
    findResponseElementById(datasForm, "farm_animals_swine") &&
    findResponseElementById(datasForm, "farm_animals_swine_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_swine_numb").value
        )
      : 0;
  let farm_animals_horses_numb =
    findResponseElementById(datasForm, "farm_animals_horses") &&
    findResponseElementById(datasForm, "farm_animals_horses_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_horses_numb").value
        )
      : 0;
  let farm_animals_mules_numb =
    findResponseElementById(datasForm, "farm_animals_mules") &&
    findResponseElementById(datasForm, "farm_animals_mules_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_mules_numb").value
        )
      : 0;
  let farm_animals_water_buffalo_numb =
    findResponseElementById(datasForm, "farm_animals_water_buffalo") &&
    findResponseElementById(datasForm, "farm_animals_water_buffalo_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_water_buffalo_numb")
            .value
        )
      : 0;
  let farm_animals_poultry_numb =
    findResponseElementById(datasForm, "farm_animals_poultry") &&
    findResponseElementById(datasForm, "farm_animals_poultry_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_poultry_numb").value
        )
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

  return round(
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
}
export default funcAnimalsManure;
