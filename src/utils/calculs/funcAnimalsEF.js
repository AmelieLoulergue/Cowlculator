import regions from "../../coeff/regions.json";
import getCoeffAnimals from "./getCoeffAnimals";

// Function animals : emissions from enteric fermentation
import {
  getEFBeef,
  getEFDairy,
  getEFGoat,
  getEFHorse,
  getEFMules,
  getEFSheep,
  getEFSwine,
  getEFWaterBuff,
} from "./getEFAnimals";
function funcAnimalsEF({ datasForm, time, state }) {
  //Define the region
  let region = regions.find((region) => region.Code === state);
  region = region?.Regions_EPA.replace(" ", "_");
  const {
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
  } = getCoeffAnimals({ datasForm, region });

  //Calcul emissions from enteric fermentation for each animal
  const EFDairy = getEFDairy({
    datasForm,
    coeffDairyRep12EF,
    coeffDairyRep24EF,
    coeffDairyMatureEF,
    time,
  });
  const EFBeef = getEFBeef({
    datasForm,
    coeffBeefRep12EF,
    coeffBeefRep24EF,
    coeffBeefMatureEF,
    coeffBeefWeanEF,
    coeffBeefYearnEF,
    coeffBeefBullsEF,
    time,
  });

  const EFSheep = getEFSheep({ coeffSheepEF, time, datasForm });
  const EFGoat = getEFGoat({ datasForm, coeffGoatEF, time });
  const EFSwine = getEFSwine({ datasForm, coeffSwineEF, time });
  const EFHorse = getEFHorse({ datasForm, coeffHorseEF, time });
  const EFMules = getEFMules({ datasForm, coeffMulesEF, time });
  const EFWaterBuff = getEFWaterBuff({ datasForm, coeffWaterBuffEF, time });
  return {
    EFDairy: EFDairy,
    EFBeef: EFBeef,
    EFSheep: EFSheep,
    EFGoat: EFGoat,
    EFSwine: EFSwine,
    EFHorse: EFHorse,
    EFMules: EFMules,
    EFWaterBuff: EFWaterBuff,
  };
}

export default funcAnimalsEF;
