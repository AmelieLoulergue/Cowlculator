import findResponseElementById from "../global/findResponseElementById";
const getCattleDairy = ({ datasForm }) => {
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

  // Group dairies and beefs

  return (
    farm_animals_dairy_cattle_rep12_numb +
    farm_animals_dairy_cattle_rep24_numb +
    farm_animals_dairy_cattle_matur_numb
  );
};

const getCattleBeef = ({ datasForm }) => {
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
    farm_animals_beef_cattle_rep12_numb +
    farm_animals_beef_cattle_rep24_numb +
    farm_animals_beef_cattle_matur_numb +
    farm_animals_beef_cattle_weanling_numb +
    farm_animals_beef_cattle_yearling_numb +
    farm_animals_beef_cattle_bulls_numb
  );
};

export { getCattleDairy, getCattleBeef };
