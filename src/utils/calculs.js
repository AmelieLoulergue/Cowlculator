import React from "react";
import enteric_EF from "../coeff/enteric_EF.json";
import fuel_coeff from "../coeff/fuel_coeff.json";

import manure from "../coeff/manure.json";
import other_coeff from "../coeff/other_coeff.json";
import reductionEF_coeff from "../coeff/reductionEF_coeff.json";
import regions from "../coeff/regions.json";

import coeff_reduction_ghg from "../coeff/coeff_reduction_ghg.json";
import * as allFunctions from "./calculs/exportCalculsFunctions";
function calculs({ datasForm, results, setResults }) {
  console.log(datasForm);
  const startDate = datasForm.find(
    (data) => data.id === "start_date"
  )?.response;

  //PERIOD SELECTED

  const endDate = datasForm.find((data) => data.id === "end_date")?.response;
  const state = datasForm.find((data) => data.id === "farm_state")?.response;
  // check on the existence of the 2 dates
  if (startDate && endDate) {
    setResults({
      ...results,
      time: allFunctions.funcTime({ startDate, endDate }),
    });
  }

  // ELECTRICITY
  const elec_total = datasForm.find(
    (data) => data.id === "elec_total"
  )?.response;
  const elec_generator = datasForm.find(
    (data) => data.id === "elec_generator"
  )?.response;
  const elec_generator_prod = datasForm.find(
    (data) => data.id === "elec_generator_prod"
  )?.response;

  // check on the existence of state value && elec_total
  if (state && elec_total) {
    setResults({
      ...results,
      elecCO2: allFunctions.funcElec({
        elec_total,
        elec_generator,
        elec_generator_prod,
        state,
      }),
    });
  }

  // GAS
  const gas_butane_cons = datasForm.find(
    (data) => data.id === "gas_butane_cons"
  )?.response;
  const gas_propane_cons = datasForm.find(
    (data) => data.id === "gas_propane_cons"
  )?.response;
  const gas_mix_cons = datasForm.find(
    (data) => data.id === "gas_mix_cons"
  )?.response;
  // check on the existence of at least one of the 3 values
  if (gas_butane_cons || gas_propane_cons || gas_mix_cons) {
    setResults({
      ...results,
      gasCO2: allFunctions.funcGas({
        gas_butane_cons,
        gas_propane_cons,
        gas_mix_cons,
      }),
    });
  }
  // NATURAL GAS
  const natgas = datasForm.find((data) => data.id === "natgas")?.response;
  const natgas_cons = datasForm.find(
    (data) => data.id === "natgas_cons"
  )?.response;
  // check on the existence of natgas value && natgas_cons
  console.log(natgas, natgas_cons);
  if (natgas && natgas_cons) {
    setResults({
      ...results,
      natGasCO2: allFunctions.funcNatGas({
        natgas_cons,
      }),
    });
  }

  // FUEL
  // CARS CHECK IF USE TRUE && DIESEL OR GASOLINE USE TRUE
  const vehicles_type_cars = datasForm.find(
    (data) => data.id === "vehicles_type_cars"
  )?.response;
  const vehicles_type_cars_gasoline = datasForm.find(
    (data) => data.id === "vehicles_type_cars_gasoline"
  )?.response;
  const vehicles_type_cars_diesel = datasForm.find(
    (data) => data.id === "vehicles_type_cars_diesel"
  )?.response;

  // TRUCKS CHECK IF USE TRUE && DIESEL OR GASOLINE USE TRUE
  const vehicles_type_trucks = datasForm.find(
    (data) => data.id === "vehicles_type_trucks"
  )?.response;
  const vehicles_type_trucks_gasoline = datasForm.find(
    (data) => data.id === "vehicles_type_trucks_gasoline"
  )?.response;
  const vehicles_type_trucks_diesel = datasForm.find(
    (data) => data.id === "vehicles_type_trucks_diesel"
  )?.response;

  // TRACTORS CHECK IF USE TRUE && DIESEL OR GASOLINE USE TRUE
  const vehicles_type_tractors = datasForm.find(
    (data) => data.id === "vehicles_type_tractors"
  )?.response;
  const vehicles_type_tractors_gasoline = datasForm.find(
    (data) => data.id === "vehicles_type_tractors_gasoline"
  )?.response;
  const vehicles_type_tractors_diesel = datasForm.find(
    (data) => data.id === "vehicles_type_tractors_diesel"
  )?.response;

  // check on the use of at least one of the 3 vehicles
  if (
    (vehicles_type_cars &&
      (vehicles_type_cars_diesel || vehicles_type_cars_gasoline)) ||
    (vehicles_type_tractors &&
      (vehicles_type_tractors_diesel || vehicles_type_tractors_gasoline)) ||
    (vehicles_type_trucks &&
      (vehicles_type_trucks_diesel || vehicles_type_trucks_gasoline))
  ) {
    const vehicles_type_cars_diesel_cons = datasForm.find(
      (data) => data.id === "vehicles_type_cars_diesel_cons"
    )?.response;
    const vehicles_type_cars_gasoline_cons = datasForm.find(
      (data) => data.id === "vehicles_type_cars_gasoline_cons"
    )?.response;
    const vehicles_type_trucks_diesel_cons = datasForm.find(
      (data) => data.id === "vehicles_type_trucks_diesel_cons"
    )?.response;
    const vehicles_type_trucks_gasoline_cons = datasForm.find(
      (data) => data.id === "vehicles_type_trucks_gasoline_cons"
    )?.response;
    const vehicles_type_tractors_diesel_cons = datasForm.find(
      (data) => data.id === "vehicles_type_tractors_diesel_cons"
    )?.response;
    const vehicles_type_tractors_gasoline_cons = datasForm.find(
      (data) => data.id === "vehicles_type_tractors_gasoline_cons"
    )?.response;
    setResults({
      ...results,
      fuelCO2: allFunctions.funcFuel({
        vehicles_type_cars_diesel_cons,
        vehicles_type_cars_gasoline_cons,
        vehicles_type_trucks_diesel_cons,
        vehicles_type_trucks_gasoline_cons,
        vehicles_type_tractors_diesel_cons,
        vehicles_type_tractors_gasoline_cons,
      }),
    });
  }
  // WATER
  const water_drink_cons = datasForm.find(
    (data) => data.id === "water_drink_cons"
  )?.response;
  const water_waste_cons = datasForm.find(
    (data) => data.id === "water_waste_cons"
  )?.response;
  if (water_drink_cons || water_waste_cons) {
    setResults({
      ...results,
      water: allFunctions.funcWater({ water_drink_cons, water_waste_cons }),
    });
  }

  // OTHER
  const others = datasForm.filter((element) => element.id.includes("other"));
  console.log(others);
  if (others.length > 0) {
    setResults({
      ...results,
      other: allFunctions.funcOther({ others }),
    });
  }
  // let other = allFunctions.funcOther(datasForm, other_coeff);
  // console.log(other);

  // Emissions from enteric fermentation of dairies, beed and sheep
  // let entericFermentationCO2 = allFunctions.funcAnimalsEF(
  //   datasForm,
  //   enteric_EF,
  //   regions,
  //   results.time
  // );
  // console.log(entericFermentationCO2);

  // Emissions from manure of dairies, beed and sheep

  // let manureCO2 = allFunctions.funcAnimalsManure(
  //   datasForm,
  //   manure,
  //   results.time
  // );
  // console.log(manureCO2);

  // let numbDairyPractices = 0;

  // if (cattleDairy === 0 || datasForm.practices.practice_anim[3].selected===true) {
  //   numbDairyPractices = 0;
  // } else {
  //   if (datasForm.practices.practice_anim[0].dairy_cow.all_of_them === true) {
  //     numbDairyPractices = 1;
  //   } else {
  //     if (
  //       datasForm.practices.practice_anim[0].dairy_cow.portion_of_them === true
  //     ) {
  //       let portionDairy =
  //         datasForm.practices.practice_anim[0].dairy_cow.portion_numb / 100;
  //       numbDairyPractices = portionDairy;
  //     }
  //   }
  // }
  // console.log(numbDairyPractices);

  // Extract EFDairy, EFBeef, EFSheep
  // let EFDairy = entericFermentationCO2[0];
  // let EFBeef = entericFermentationCO2[1];
  // let EFSheep = entericFermentationCO2[2];

  //numb total beef and dairies
  // let numbTotal = allFunctions.funcNumbTotalBeefDairy(datasForm);
  // let cattleDairy = numbTotal[0];
  // let cattleBeef = numbTotal[1];
  // console.log(cattleDairy);
  // console.log(cattleBeef);

  // Mitigation EF from Imp Feed Dairy
  // let mitigationEFImpFeedDairy = allFunctions.funcMitigationsImpFeedDairy(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFDairy
  // );
  // console.log(mitigationEFImpFeedDairy);

  // Mitigation EF from Imp Feed Beef
  // let mitigationEFImpFeedBeef = allFunctions.funcMitigationsImpFeedBeef(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFBeef
  // );
  // console.log(mitigationEFImpFeedBeef);

  // Mitigation EF from Imp Feed Sheep
  // let mitigationEFImpFeedSheep = allFunctions.funcMitigationsImpFeedSheep(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFSheep
  // );
  // console.log(mitigationEFImpFeedSheep);

  //Mitigation EF from Additive Dairy
  // let mitigationEFAdditiveDairy = allFunctions.funcMitigationsAdditiveDairy(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFDairy,
  //   cattleDairy
  // );
  // console.log(mitigationEFAdditiveDairy);

  //Mitigation EF from Additive Beef
  // let mitigationEFAdditiveBeef = allFunctions.funcMitigationsAdditiveBeef(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFBeef,
  //   cattleBeef
  // );
  // console.log(mitigationEFAdditiveBeef);

  //Mitigation EF from Additive Sheep
  // let mitigationEFAdditiveSheep = allFunctions.funcMitigationsAdditiveSheep(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFSheep
  // );
  // console.log(mitigationEFAdditiveSheep);

  //Mitigation EF from LTBreedingDairy
  // let mitigationEFLTBreedingDairy = allFunctions.funcMitigationsLTBreedingDairy(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFDairy,
  //   cattleDairy
  // );
  // console.log(mitigationEFLTBreedingDairy);

  //Mitigation EF from LTBreedingBeef
  // let mitigationEFLTBreedingBeef = allFunctions.funcMitigationsLTBreedingBeef(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFBeef,
  //   cattleBeef
  // );
  // console.log(mitigationEFLTBreedingBeef);

  //Mitigation EF from LTBreeding Sheep
  // let mitigationEFLTBreedingSheep = allFunctions.funcMitigationsLTBreedingSheep(
  //   datasForm,
  //   reductionEF_coeff,
  //   EFSheep
  // );
  // console.log(mitigationEFLTBreedingSheep);

  // console.log("toutes les datas", datasForm);
}

export default calculs;
// Function crops

// Emissions from fertilizers
// TBD

// Mitigations from crops practices
// Define coeffs reduction ghg based on region
function funcCropsMitigations(
  datasForm,
  coeff_reduction_ghg,
  regions,
  state,
  time
) {
  let region = regions.find((region) => region.Code === state);
  console.log(region);
  let climate = region.Climate.replace(" ", "_");
  console.log(climate);

  let coeff_crops = coeff_reduction_ghg.map((element) => {
    let climate_coeff = element.climate.replace(" ", "_");
    if (climate_coeff === climate) {
      return { practice: element.practice, GHG: element.GHG };
    }
  });
  coeff_crops = coeff_crops.filter((element) => element !== undefined);

  let crop_agro_coeff = coeff_crops[0].GHG;
  let crop_nut_coeff = coeff_crops[1].GHG;
  let crop_tillage_coeff = coeff_crops[2].GHG;
  let crop_water_coeff = coeff_crops[3].GHG;
  let crop_LUC_coeff = coeff_crops[4].GHG;
  let crop_agrofo_coeff = coeff_crops[5].GHG;
  let grass_graz_coeff = coeff_crops[6].GHG;
  //let orga_resto_coeff = coeff_crops[7].GHG;
  let deg_resto_coeff = coeff_crops[8].GHG;
  let manure_bios_coeff = coeff_crops[9].GHG;
  //let bionrj_coeff = coeff_crops[10].GHG;

  // convert land size to ha
  let acre_to_ha = 0.404686;
  let sqfeet_to_ha = 0.000009290304;

  let grassland_size = 0;
  if (datasForm.farm_grassland.unit[0].selected === true) {
    grassland_size = datasForm.farm_grassland.size * acre_to_ha;
  } else {
    if (datasForm.farm_herbs.unit[1].selected === true) {
      grassland_size = datasForm.farm_grassland.size * sqfeet_to_ha;
    }
  }

  let grain_size = 0;
  if (datasForm.farm_grain.unit[0].selected === true) {
    grain_size = datasForm.farm_grain.size * acre_to_ha;
  } else {
    if (datasForm.farm_herbs.unit[1].selected === true) {
      grain_size = datasForm.farm_grain.size * sqfeet_to_ha;
    }
  }

  let forage_size = 0;
  if (datasForm.farm_forage.unit[0].selected === true) {
    forage_size = datasForm.farm_forage.size * acre_to_ha;
  } else {
    if (datasForm.farm_herbs.unit[1].selected === true) {
      forage_size = datasForm.farm_forage.size * sqfeet_to_ha;
    }
  }

  let fv_size = 0;
  if (datasForm.farm_fv.unit[0].selected === true) {
    fv_size = datasForm.farm_fv.size * acre_to_ha;
  } else {
    if (datasForm.farm_herbs.unit[1].selected === true) {
      fv_size = datasForm.farm_fv.size * sqfeet_to_ha;
    }
  }

  let flowers_size = 0;
  if (datasForm.farm_flowers.unit[0].selected === true) {
    flowers_size = datasForm.farm_flowers.size * acre_to_ha;
  } else {
    if (datasForm.farm_herbs.unit[1].selected === true) {
      flowers_size = datasForm.farm_flowers.size * sqfeet_to_ha;
    }
  }

  let herbs_size = 0;
  if (datasForm.farm_herbs.unit[0].selected === true) {
    herbs_size = datasForm.farm_herbs.size * acre_to_ha;
  } else {
    if (datasForm.farm_herbs.unit[1].selected === true) {
      herbs_size = datasForm.farm_herbs.size * sqfeet_to_ha;
    }
  }

  // Practices

  // Proportions of cropland on which practices applied

  let cropland_practice = 0;
  if (datasForm.practices.croplands.all_of_them === true) {
    cropland_practice =
      grain_size + forage_size + fv_size + flowers_size + herbs_size;
  } else {
    if (datasForm.practices.croplands.portion_of_them === true) {
      cropland_practice =
        (grain_size + forage_size + fv_size + flowers_size + herbs_size) *
        (datasForm.practices.croplands.portion_numb / 100);
    }
  }

  // Proportions of grassland on which practices applied

  let grassland_practice = 0;
  if (datasForm.practices.grasslands.all_of_them === true) {
    grassland_practice = grassland_size;
  } else {
    if (datasForm.practices.grasslands.portion_of_them === true) {
      grassland_practice =
        grassland_size * (datasForm.practices.grasslands.portion_numb / 100);
    }
  }

  // size of land on which degraded land restoration is practiced
  let degradedRestoration_size = 0;
  if (datasForm.practices.degraded_lands.unit[0].selected === true) {
    degradedRestoration_size =
      datasForm.practices.degraded_lands.size * acre_to_ha;
  } else {
    if (datasForm.practices.degraded_lands.unit[1].selected === true) {
      degradedRestoration_size =
        datasForm.practices.degraded_lands.size * sqfeet_to_ha;
    }
  }

  // size of land on which manure is applied
  let manure_size = 0;
  if (datasForm.practices.manure.unit[0].selected === true) {
    manure_size = datasForm.practices.manure.size * acre_to_ha;
  } else {
    if (datasForm.practices.manure.unit[1].selected === true) {
      manure_size = datasForm.practices.manure.size * sqfeet_to_ha;
    }
  }

  // Calculate mitigation from each practice on each type of land
  //Agronomy
  let mitigationCropAgro = 0;
  if (datasForm.practices.practice_plant[0].selected === false) {
    mitigationCropAgro = 0;
  } else {
    if (datasForm.practices.practice_plant[0].selected === true) {
      mitigationCropAgro = (crop_agro_coeff * cropland_practice * time) / 1000;
    }
  }

  //Nutrient management
  let mitigationCropNut = 0;
  if (datasForm.practices.practice_plant[1].selected === false) {
    mitigationCropNut = 0;
  } else {
    if (datasForm.practices.practice_plant[1].selected === true) {
      mitigationCropNut = (crop_nut_coeff * cropland_practice * time) / 1000;
    }
  }

  //Tillage
  let mitigationCropTillage = 0;
  if (datasForm.practices.practice_plant[2].selected === false) {
    mitigationCropTillage = 0;
  } else {
    if (datasForm.practices.practice_plant[2].selected === true) {
      mitigationCropTillage =
        (crop_tillage_coeff * cropland_practice * time) / 1000;
    }
  }

  //Water Management
  let mitigationCropWater = 0;
  if (datasForm.practices.practice_plant[3].selected === false) {
    mitigationCropWater = 0;
  } else {
    if (datasForm.practices.practice_plant[3].selected === true) {
      mitigationCropWater =
        (crop_water_coeff * cropland_practice * time) / 1000;
    }
  }

  //LUC
  let mitigationCropLUC = 0;
  if (datasForm.practices.practice_plant[4].selected === false) {
    mitigationCropLUC = 0;
  } else {
    if (datasForm.practices.practice_plant[4].selected === true) {
      mitigationCropLUC = (crop_LUC_coeff * cropland_practice * time) / 1000;
    }
  }

  //Agro Forestry
  let mitigationCropAgrofo = 0;
  if (datasForm.practices.practice_plant[5].selected === false) {
    mitigationCropAgrofo = 0;
  } else {
    if (datasForm.practices.practice_plant[5].selected === true) {
      mitigationCropAgrofo =
        (crop_agrofo_coeff * cropland_practice * time) / 1000;
    }
  }

  //Grazing
  let mitigationGrassGraz = 0;
  if (datasForm.practices.practice_plant[6].selected === false) {
    mitigationGrassGraz = 0;
  } else {
    if (datasForm.practices.practice_plant[6].selected === true) {
      mitigationGrassGraz =
        (grass_graz_coeff * grassland_practice * time) / 1000;
    }
  }

  //Restoration Degraded Lands
  let mitigationDegResto = 0;
  if (datasForm.practices.practice_plant[8].selected === false) {
    mitigationDegResto = 0;
  } else {
    if (datasForm.practices.practice_plant[8].selected === true) {
      mitigationDegResto =
        (deg_resto_coeff * degradedRestoration_size * time) / 1000;
    }
  }

  //Manure application
  let mitigationManureApp = 0;
  if (datasForm.practices.practice_plant[10].selected === false) {
    mitigationManureApp = 0;
  } else {
    if (datasForm.practices.practice_plant[10].selected === true) {
      mitigationManureApp = (manure_bios_coeff * manure_size * time) / 1000;
    }
  }

  //Total crops practices mitigations
  let mitigationCropsTotal =
    mitigationManureApp +
    mitigationDegResto +
    mitigationGrassGraz +
    mitigationCropAgrofo +
    mitigationCropLUC +
    mitigationCropWater +
    mitigationCropTillage +
    mitigationCropNut +
    mitigationCropAgro;

  return {
    mitigation_total_crops: mitigationCropsTotal,
    mitigation_manure_application: mitigationManureApp,
    mitigation_resto_degraded: mitigationDegResto,
    mitigation_grazing_grasslands: mitigationGrassGraz,
    mitigation_agrofo: mitigationCropAgrofo,
    mitigation_LUC: mitigationCropLUC,
    mitiation_water_croplands: mitigationCropWater,
    mitigation_tillage_croplands: mitigationCropTillage,
    mitigation_nut_croplands: mitigationCropNut,
    mitigation_agro_croplands: mitigationCropAgro,
  };
}
function funcCarbonCreditsCrops(datasForm, cropsMitigations) {
  let carbonCreditsCrops = cropsMitigations.mitigation_total_crops * 15;
  return carbonCreditsCrops;
}

function funcCarbonCreditsAnimals(
  mitigationEFImpFeedDairy,
  mitigationEFImpFeedBeef,
  mitigationEFImpFeedSheep,
  mitigationEFAdditiveDairy,
  mitigationEFAdditiveSheep,
  mitigationEFAdditiveBeef,
  mitigationEFLTBreedingSheep,
  mitigationEFLTBreedingDairy,
  mitigationEFLTBreedingBeef
) {
  let carbonCreditsAnimals =
    (mitigationEFImpFeedDairy[0] +
      mitigationEFImpFeedBeef[0] +
      mitigationEFImpFeedSheep[0] +
      mitigationEFAdditiveDairy[0] +
      mitigationEFAdditiveSheep[0] +
      mitigationEFAdditiveBeef[0] +
      mitigationEFLTBreedingSheep[0] +
      mitigationEFLTBreedingDairy[0] +
      mitigationEFLTBreedingBeef[0]) *
    73.05;
  return carbonCreditsAnimals;
}

//function funcFertilizer(
