import findResponseElementById from "../global/findResponseElementById";
const getEFDairy = ({
  datasForm,
  coeffDairyRep12EF,
  coeffDairyRep24EF,
  coeffDairyMatureEF,
  time,
}) => {
  // //Calcul emissions from enteric fermentation for each animal
  let farm_animals_dairy_cattle_rep12_numb = findResponseElementById(
    datasForm,
    "farm_animals_dairy_cattle_rep12_numb"
  )?.value
    ? Number(
        findResponseElementById(
          datasForm,
          "farm_animals_dairy_cattle_rep12_numb"
        ).value
      )
    : 0;
  let farm_animals_dairy_cattle_rep24_numb = findResponseElementById(
    datasForm,
    "farm_animals_dairy_cattle_rep24_numb"
  )?.value
    ? Number(
        findResponseElementById(
          datasForm,
          "farm_animals_dairy_cattle_rep24_numb"
        ).value
      )
    : 0;
  let farm_animals_dairy_cattle_matur_numb = findResponseElementById(
    datasForm,
    "farm_animals_dairy_cattle_matur_numb"
  )?.value
    ? Number(
        findResponseElementById(
          datasForm,
          "farm_animals_dairy_cattle_matur_numb"
        ).value
      )
    : 0;
  return (
    ((farm_animals_dairy_cattle_rep12_numb * coeffDairyRep12EF * 25 +
      farm_animals_dairy_cattle_rep24_numb * coeffDairyRep24EF * 25 +
      farm_animals_dairy_cattle_matur_numb * coeffDairyMatureEF * 25) /
      1000) *
    time
  );
};

const getEFBeef = ({
  coeffBeefRep12EF,
  coeffBeefRep24EF,
  coeffBeefMatureEF,
  coeffBeefWeanEF,
  coeffBeefYearnEF,
  coeffBeefBullsEF,
  datasForm,
  time,
}) => {
  let farm_animals_beef_cattle_rep12_numb = findResponseElementById(
    datasForm,
    "farm_animals_beef_cattle_rep12_numb"
  )?.value
    ? Number(
        findResponseElementById(
          datasForm,
          "farm_animals_beef_cattle_rep12_numb"
        ).value
      )
    : 0;
  let farm_animals_beef_cattle_rep24_numb = findResponseElementById(
    datasForm,
    "farm_animals_beef_cattle_rep24_numb"
  )?.value
    ? Number(
        findResponseElementById(
          datasForm,
          "farm_animals_beef_cattle_rep24_numb"
        ).value
      )
    : 0;
  let farm_animals_beef_cattle_matur_numb = findResponseElementById(
    datasForm,
    "farm_animals_beef_cattle_matur_numb"
  )?.value
    ? Number(
        findResponseElementById(
          datasForm,
          "farm_animals_beef_cattle_matur_numb"
        ).value
      )
    : 0;
  let farm_animals_beef_cattle_weanling_numb = findResponseElementById(
    datasForm,
    "farm_animals_beef_cattle_wealing_numb"
  )?.value
    ? Number(
        findResponseElementById(
          datasForm,
          "farm_animals_beef_cattle_wealing_numb"
        ).value
      )
    : 0;
  let farm_animals_beef_cattle_yearling_numb = findResponseElementById(
    datasForm,
    "farm_animals_beef_cattle_yearling_numb"
  )?.value
    ? Number(
        findResponseElementById(
          datasForm,
          "farm_animals_beef_cattle_yearling_numb"
        ).value
      )
    : 0;
  let farm_animals_beef_cattle_bulls_numb = findResponseElementById(
    datasForm,
    "farm_animals_beef_cattle_bulls_numb"
  )?.value
    ? Number(
        findResponseElementById(
          datasForm,
          "farm_animals_beef_cattle_bulls_numb"
        ).value
      )
    : 0;
  return (
    ((farm_animals_beef_cattle_rep12_numb * coeffBeefRep12EF * 25 +
      farm_animals_beef_cattle_rep24_numb * coeffBeefRep24EF * 25 +
      farm_animals_beef_cattle_matur_numb * coeffBeefMatureEF * 25 +
      farm_animals_beef_cattle_weanling_numb * coeffBeefWeanEF * 25 +
      farm_animals_beef_cattle_yearling_numb * coeffBeefYearnEF * 25 +
      farm_animals_beef_cattle_bulls_numb * coeffBeefBullsEF * 25) /
      1000) *
    time
  );
};

const getEFSheep = ({ coeffSheepEF, time, datasForm }) => {
  let farm_animals_sheeps_numb =
    findResponseElementById(datasForm, "farm_animals_sheeps") &&
    findResponseElementById(datasForm, "farm_animals_sheeps_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_sheeps_numb").value
        )
      : 0;
  return ((farm_animals_sheeps_numb * coeffSheepEF * 25) / 1000) * time;
};
const getEFGoat = ({ datasForm, coeffGoatEF, time }) => {
  let farm_animals_goats_numb =
    findResponseElementById(datasForm, "farm_animals_goats") &&
    findResponseElementById(datasForm, "farm_animals_goats_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_goats_numb").value
        )
      : 0;
  return ((farm_animals_goats_numb * coeffGoatEF * 25) / 1000) * time;
};
const getEFSwine = ({ datasForm, coeffSwineEF, time }) => {
  let farm_animals_swine_numb =
    findResponseElementById(datasForm, "farm_animals_swine") &&
    findResponseElementById(datasForm, "farm_animals_swine_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_swine_numb").value
        )
      : 0;
  return ((farm_animals_swine_numb * coeffSwineEF * 25) / 1000) * time;
};
const getEFHorse = ({ datasForm, coeffHorseEF, time }) => {
  let farm_animals_horses_numb =
    findResponseElementById(datasForm, "farm_animals_horses") &&
    findResponseElementById(datasForm, "farm_animals_horses_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_horses_numb").value
        )
      : 0;
  return ((farm_animals_horses_numb * coeffHorseEF * 25) / 1000) * time;
};
const getEFMules = ({ datasForm, coeffMulesEF, time }) => {
  let farm_animals_mules_numb =
    findResponseElementById(datasForm, "farm_animals_mules") &&
    findResponseElementById(datasForm, "farm_animals_mules_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_mules_numb").value
        )
      : 0;
  return ((farm_animals_mules_numb * coeffMulesEF * 25) / 1000) * time;
};
const getEFWaterBuff = ({ datasForm, coeffWaterBuffEF, time }) => {
  let farm_animals_water_buffalo_numb =
    findResponseElementById(datasForm, "farm_animals_water_buffalo") &&
    findResponseElementById(datasForm, "farm_animals_water_buffalo_numb")?.value
      ? Number(
          findResponseElementById(datasForm, "farm_animals_water_buffalo_numb")
            .value
        )
      : 0;
  return (
    ((farm_animals_water_buffalo_numb * coeffWaterBuffEF * 25) / 1000) * time
  );
};
export {
  getEFBeef,
  getEFDairy,
  getEFGoat,
  getEFHorse,
  getEFMules,
  getEFSheep,
  getEFSwine,
  getEFWaterBuff,
};
