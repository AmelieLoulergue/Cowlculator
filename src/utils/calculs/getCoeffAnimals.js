import enteric_EF from "../../coeff/enteric_EF.json";
import findResponseElementById from "../global/findResponseElementById";
const getCoeffAnimals = ({ datasForm, region }) => {
  // keep only the coeff for the region
  let coeffEF = [];
  enteric_EF.map((selectRegion) =>
    Object.entries(selectRegion).map((key, value) => {
      if (key[0] !== "name" && key[0] === region) {
        coeffEF.push({ name: selectRegion.name, coeff: key[1] });
      }
    })
  );

  // National average coeff for beef yearnling and weanling
  let coeffEFNatAv = [];
  enteric_EF.map((changeRegion) =>
    Object.entries(changeRegion).map((key, value) => {
      if (key[0] !== "name" && key[0] === "National_Average") {
        coeffEFNatAv.push({ name: changeRegion.name, coeff: key[1] });
      }
    })
  );
  //Extract animals' coeff based on the region
  let coeffDairyRep12EF =
    findResponseElementById(datasForm, "farm_animals_dairy_cattle") &&
    findResponseElementById(datasForm, "farm_animals_dairy_cattle_rep12")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_dairy_cattle_rep12"
          )?.coeff
        )
      : 0;
  let coeffDairyRep24EF =
    findResponseElementById(datasForm, "farm_animals_dairy_cattle") &&
    findResponseElementById(datasForm, "farm_animals_dairy_cattle_rep24")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_dairy_cattle_rep24"
          )?.coeff
        )
      : 0;
  let coeffDairyMatureEF =
    findResponseElementById(datasForm, "farm_animals_dairy_cattle") &&
    findResponseElementById(datasForm, "farm_animals_dairy_cattle_matur")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_dairy_cattle_matur"
          )?.coeff
        )
      : 0;
  let coeffBeefRep12EF =
    findResponseElementById(datasForm, "farm_animals_beef_cattle") &&
    findResponseElementById(datasForm, "farm_animals_beef_cattle_rep12")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_beef_cattle_rep12"
          )?.coeff
        )
      : 0;
  let coeffBeefRep24EF =
    findResponseElementById(datasForm, "farm_animals_beef_cattle") &&
    findResponseElementById(datasForm, "farm_animals_beef_cattle_rep24")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_beef_cattle_rep24"
          ).coeff
        )
      : 0;
  let coeffBeefMatureEF =
    findResponseElementById(datasForm, "farm_animals_beef_cattle") &&
    findResponseElementById(datasForm, "farm_animals_beef_cattle_matur")
      ? Number(
          coeffEF.find(
            (element) => element.name === "farm_animals_beef_cattle_matur"
          ).coeff
        )
      : 0;
  let coeffBeefWeanEF = coeffEF.find(
    (element) => element.name === "farm_animals_beef_cattle_wealing"
  )?.coeff
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
  let coeffBeefYearnEF = coeffEF.find(
    (element) => element.name === "farm_animals_beef_cattle_yearling"
  )?.coeff
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
    )?.coeff
  );
  let coeffSheepEF = Number(
    coeffEFNatAv.find((element) => element.name === "farm_animals_sheeps")?.coeff
  );
  let coeffGoatEF = Number(
    coeffEFNatAv.find((element) => element.name === "farm_animals_goats")?.coeff
  );
  let coeffSwineEF = Number(
    coeffEFNatAv.find((element) => element.name === "farm_animals_swine")?.coeff
  );
  let coeffHorseEF = Number(
    coeffEFNatAv.find((element) => element.name === "farm_animals_horses")?.coeff
  );
  let coeffMulesEF = Number(
    coeffEFNatAv.find((element) => element.name === "farm_animals_mules")?.coeff
  );
  let coeffWaterBuffEF = Number(
    coeffEFNatAv.find(
      (element) => element.name === "farm_animals_water_buffalo"
    )?.coeff
  );
  return {
    coeffBeefBullsEF,
    coeffBeefMatureEF,
    coeffBeefRep12EF,
    coeffBeefRep24EF,
    coeffBeefWeanEF,
    coeffBeefYearnEF,
    coeffDairyMatureEF,
    coeffDairyRep12EF,
    coeffDairyRep24EF,
    coeffGoatEF,
    coeffHorseEF,
    coeffWaterBuffEF,
    coeffMulesEF,
    coeffSwineEF,
    coeffSheepEF,
  };
};

export default getCoeffAnimals;
