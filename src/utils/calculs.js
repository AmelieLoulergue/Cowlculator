import React from "react";
function calculs(
  datasForm,
  coeff_reduction_ghg,
  elec_state_coeff,
  enteric_EF,
  fuel_coeff,
  gas_coeff,
  manure,
  natgas_coeff,
  other_coeff,
  reductionEF_coeff,
  regions,
  water_coeff
) {
  console.log("toutes les datas", datasForm);
  // console.log(reductionEF_coeff); // tableau d'objets

  // console.log(datasForm.natgas_unit);
  // // pour avoir la première ligne du tableau
  // console.log(coeff_reduction_ghg[0]);
  // console.log(elec_state_coeff[0]);
  // // au valeur de cette ligne
  // console.log(
  //   "climate : ",
  //   coeff_reduction_ghg[0].climate,
  //   "practice : ",
  //   coeff_reduction_ghg[0].practice,
  //   "CO2 :",
  //   coeff_reduction_ghg[0].CO2,
  //   "CH4 :",
  //   coeff_reduction_ghg[0].CH4,
  //   "N2O : ",
  //   coeff_reduction_ghg[0].N2O,
  //   "GHG :",
  //   coeff_reduction_ghg[0].GHG
  // );
  // // trouver un élément par rapport à la pratique
  // let practice = coeff_reduction_ghg.find(
  //   (coeff) => coeff.practice === "agronomy"
  // );

  // //console.log(consOther.length);

  // console.log(practice);
  // console.log(
  //   "climate : ",
  //   practice.climate,
  //   "practice : ",
  //   practice.practice,
  //   "CO2 :",
  //   practice.CO2,
  //   "CH4 :",
  //   practice.CH4,
  //   "N2O : ",
  //   practice.N2O,
  //   "GHG :",
  //   practice.GHG
  // );

  let time = funcTime(datasForm);
  // console.log(time);

  let elecCO2 = funcElec(datasForm, elec_state_coeff);
  // console.log(elecCO2);

  let natGasCO2 = funcNatGas(datasForm, natgas_coeff);
  // console.log(natGasCO2);

  let gasCO2 = funcGas(datasForm, gas_coeff);
  // console.log(gasCO2);

  let fuelCO2 = funcFuel(datasForm, fuel_coeff);
  // console.log(fuelCO2);

  let other = funcOther(datasForm, other_coeff);
  // console.log(other);

  let water = funcWater(datasForm, water_coeff);
  // console.log(water);

  // Emissions from enteric fermentation of dairies, beed and sheep
  let entericFermentationCO2 = funcAnimalsEF(
    datasForm,
    enteric_EF,
    regions,
    time
  );
  console.log(entericFermentationCO2);

  // Emissions from manure of dairies, beed and sheep

  let manureCO2 = funcAnimalsManure(datasForm, manure, time);
  console.log(manureCO2);

  let numbDairyPractices = 0;

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
  console.log(numbDairyPractices);

  // Extract EFDairy, EFBeef, EFSheep
  let EFDairy = entericFermentationCO2[0];
  let EFBeef = entericFermentationCO2[1];
  let EFSheep = entericFermentationCO2[2];

  //numb total beef and dairies
  let numbTotal = funcNumbTotalBeefDairy(datasForm);
  let cattleDairy = numbTotal[0];
  let cattleBeef = numbTotal[1];
  console.log(cattleDairy);
  console.log(cattleBeef);

  // Mitigation EF from Imp Feed Dairy
  let mitigationEFImpFeedDairy = funcMitigationsImpFeedDairy(
    datasForm,
    reductionEF_coeff,
    EFDairy
  );
  console.log(mitigationEFImpFeedDairy);

  // Mitigation EF from Imp Feed Beef
  let mitigationEFImpFeedBeef = funcMitigationsImpFeedBeef(
    datasForm,
    reductionEF_coeff,
    EFBeef
  );
  console.log(mitigationEFImpFeedBeef);

  // Mitigation EF from Imp Feed Sheep
  let mitigationEFImpFeedSheep = funcMitigationsImpFeedSheep(
    datasForm,
    reductionEF_coeff,
    EFSheep
  );
  console.log(mitigationEFImpFeedSheep);

  //Mitigation EF from Additive Dairy
  let mitigationEFAdditiveDairy = funcMitigationsAdditiveDairy(
    datasForm,
    reductionEF_coeff,
    EFDairy,
    cattleDairy
  );
  console.log(mitigationEFAdditiveDairy);

  //Mitigation EF from Additive Beef
  let mitigationEFAdditiveBeef = funcMitigationsAdditiveBeef(
    datasForm,
    reductionEF_coeff,
    EFBeef,
    cattleBeef
  );
  console.log(mitigationEFAdditiveBeef);

  //Mitigation EF from Additive Sheep
  let mitigationEFAdditiveSheep = funcMitigationsAdditiveSheep(
    datasForm,
    reductionEF_coeff,
    EFSheep
  );
  console.log(mitigationEFAdditiveSheep);

  //Mitigation EF from LTBreedingDairy
  let mitigationEFLTBreedingDairy = funcMitigationsLTBreedingDairy(
    datasForm,
    reductionEF_coeff,
    EFDairy,
    cattleDairy
  );
  console.log(mitigationEFLTBreedingDairy);

  //Mitigation EF from LTBreedingBeef
  let mitigationEFLTBreedingBeef = funcMitigationsLTBreedingBeef(
    datasForm,
    reductionEF_coeff,
    EFBeef,
    cattleBeef
  );
  console.log(mitigationEFLTBreedingBeef);

  //Mitigation EF from LTBreeding Sheep
  let mitigationEFLTBreedingSheep = funcMitigationsLTBreedingSheep(
    datasForm,
    reductionEF_coeff,
    EFSheep
  );
  console.log(mitigationEFLTBreedingSheep);

  console.log("toutes les datas", datasForm);
  // console.log("date de fin", datasForm.endDate);
  // console.log("date de début", datasForm.startDate);
  // console.log(
  //   "nombre de bisons matures",
  //   datasForm.farm_american_bison_matur_numb.value
  // );
  // console.log(
  //   "natgas unit Therm",
  //   datasForm.natgas_unit[0].value,
  //   datasForm.natgas_unit[0].selected
  // );
  // // tu peux boucler sur des tableaux
  // datasForm.natgas_unit.map((unit, index) => {
  //   console.log(unit.value, unit.selected, index);
  // });
  // // tu peux trouver un élement avec une condition
  // const unit_selected = datasForm.natgas_unit.find(
  //   (unit) => unit.selected === true
  // );
  // console.log(unit_selected);

  // let test = funcTime(datasForm);
  // console.log(test);
}

export default calculs;

//function round
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

//function time
function funcTime(datasForm) {
  let start = new Date(datasForm.startDate);
  let end = new Date(datasForm.endDate);
  let time = round(
    (end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 7 * 52.25),
    1
  );

  return time;
}

//function electricity
function funcElec(datasForm, elec_state_coeff) {
  //electrictity consumption
  let elecCons = datasForm.elec_total?.value;
  let elecProd = 0;

  // electricity production
  if (datasForm.elec_generator) {
    elecProd = datasForm.elec_generator_prod.value;
  } else {
    elecProd = 0;
  }
  //total
  let elecTotal = elecCons - elecProd;

  //multiplied by CO2 kg/kWh coeff associated to state

  let state = datasForm.demographics?.state;
  let coeffState = elec_state_coeff.find((coeff) => coeff.State === state);
  let elecCO2 = round(coeffState?.CO2_kilo * elecTotal, 1);

  return elecCO2;
}

// Function natural gas

function funcNatGas(datasForm, natgas_coeff) {
  let unit = datasForm.natgas_unit?.find(
    (unit) => unit.selected === true
  ).value;
  let natGasCons = datasForm.natgas_cons;

  // convert unit to MMBtu
  switch (unit) {
    case "Therm":
      natGasCons = natGasCons / 10;
      break;
    case "Ccf":
      natGasCons = natGasCons / 10.37;
      break;
    case "Gj":
      natGasCons = natGasCons / 1.055056;
      break;
    case "m3":
      natGasCons = natGasCons / 28.26369;
      break;
    case "MMBtu":
      natGasCons = natGasCons;
      break;
    default:
      natGasCons = 0;
  }

  let coeffNatGas = natgas_coeff[0].kg_CO2_Mbtu;
  let natGasCO2 = round(natGasCons * coeffNatGas, 1);

  return natGasCO2;
}

// Fonction gas

function funcGas(datasForm, gas_coeff) {
  let consButane = datasForm.gas_butane_cons.value;
  let consPropane = datasForm.gas_propane_cons.value;
  let consMix = datasForm.gas_mix_cons.value;

  let coeffButane = gas_coeff[1].kg_CO2_gal;
  let coeffPropane = gas_coeff[0].kg_CO2_gal;
  let coeffMix = gas_coeff[2].kg_CO2_gal;

  let gasCO2 = round(
    consButane * coeffButane + consPropane * coeffPropane + consMix * coeffMix,
    1
  );

  return gasCO2;
}

//Function fuel

function funcFuel(datasForm, fuel_coeff) {
  let consDiesel =
    datasForm.fuel_car_dies_cons.value +
    datasForm.fuel_tract_dies_cons.value +
    datasForm.fuel_truck_dies_cons.value;
  let consGasoline =
    datasForm.fuel_car_gaso_cons.value +
    datasForm.fuel_tract_gaso_cons.value +
    datasForm.fuel_truck_gaso_cons.value;

  let coeffDiesel = fuel_coeff[0].kg_CO2;
  let coeffGasoline = fuel_coeff[1].kg_CO2;

  let fuelCO2 = consDiesel * coeffDiesel + consGasoline * coeffGasoline;
  return fuelCO2;
}
//Function other
function funcOther(datasForm, other_coeff) {
  let test = [
    {
      cons: datasForm.other_kerosene_cons.value,
      coeff: other_coeff[0].kg_CO2,
      total: datasForm.other_kerosene_cons.value * other_coeff[0].kg_CO2,
    },
    {
      cons: datasForm.other_coal_cons.value,
      coeff: other_coeff[1].kg_CO2,
      total: datasForm.other_coal_cons.value * other_coeff[1].kg_CO2,
    },
    {
      cons: datasForm.other_residual_heating_fuel_cons.value,
      coeff: other_coeff[2].kg_CO2,
      total:
        datasForm.other_residual_heating_fuel_cons.value *
        other_coeff[2].kg_CO2,
    },
    {
      cons: datasForm.other_jet_fuel_cons.value,
      coeff: other_coeff[3].kg_CO2,
      total: datasForm.other_jet_fuel_cons.value * other_coeff[3].kg_CO2,
    },
    {
      cons: datasForm.other_aviation_gas_cons.value,
      coeff: other_coeff[4].kg_CO2,
      total: datasForm.other_aviation_gas_cons.value * other_coeff[4].kg_CO2,
    },
    {
      cons: datasForm.other_flared_natural_gas_cons.value,
      coeff: other_coeff[5].kg_CO2,
      total:
        datasForm.other_flared_natural_gas_cons.value * other_coeff[5].kg_CO2,
    },
    {
      cons: datasForm.other_petroleum_coke_cons.value,
      coeff: other_coeff[6].kg_CO2,
      total: datasForm.other_petroleum_coke_cons.value * other_coeff[6].kg_CO2,
    },
    {
      cons: datasForm.other_petroleum_and_miscellaneous_cons.value,
      coeff: other_coeff[7].kg_CO2,
      total:
        datasForm.other_petroleum_and_miscellaneous_cons.value *
        other_coeff[7].kg_CO2,
    },
    {
      cons: datasForm.other_asphalt_and_road_oil.value,
      coeff: other_coeff[8].kg_CO2,
      total: datasForm.other_asphalt_and_road_oil.value * other_coeff[8].kg_CO2,
    },
    {
      cons: datasForm.other_lubricants_cons.value,
      coeff: other_coeff[9].kg_CO2,
      total: datasForm.other_lubricants_cons.value * other_coeff[9].kg_CO2,
    },
    {
      cons: datasForm.other_petrochemical_feedstocks.value,
      coeff: other_coeff[10].kg_CO2,
      total:
        datasForm.other_petrochemical_feedstocks.value * other_coeff[10].kg_CO2,
    },
    {
      cons: datasForm.other_special_naphthas_solvents.value,
      coeff: other_coeff[11].kg_CO2,
      total:
        datasForm.other_special_naphthas_solvents.value *
        other_coeff[11].kg_CO2,
    },
    {
      cons: datasForm.other_waxes_cons.value,
      coeff: other_coeff[12].kg_CO2,
      total: datasForm.other_waxes_cons.value * other_coeff[12].kg_CO2,
    },
    {
      cons: datasForm.other_anthracite_cons.value,
      coeff: other_coeff[13].kg_CO2,
      total: datasForm.other_anthracite_cons.value * other_coeff[13].kg_CO2,
    },
    {
      cons: datasForm.other_bituminous_cons.value,
      coeff: other_coeff[14].kg_CO2,
      total: datasForm.other_bituminous_cons.value * other_coeff[14].kg_CO2,
    },
    {
      cons: datasForm.other_subbituminous_cons.value,
      coeff: other_coeff[15].kg_CO2,
      total: datasForm.other_subbituminous_cons.value * other_coeff[15].kg_CO2,
    },
    {
      cons: datasForm.other_coke_cons.value,
      coeff: other_coeff[17].kg_CO2,
      total: datasForm.other_coke_cons.value * other_coeff[17].kg_CO2,
    },
    {
      cons: datasForm.other_geothermal_cons.value,
      coeff: other_coeff[18].kg_CO2,
      total: datasForm.other_geothermal_cons.value * other_coeff[18].kg_CO2,
    },
    {
      cons: datasForm.other_municiple_solid_waste_cons.value,
      coeff: other_coeff[19].kg_CO2,
      total:
        datasForm.other_municiple_solid_waste_cons.value *
        other_coeff[19].kg_CO2,
    },
    {
      cons: datasForm.other_tire_derived_fuel_cons.value,
      coeff: other_coeff[20].kg_CO2,
      total:
        datasForm.other_tire_derived_fuel_cons.value * other_coeff[20].kg_CO2,
    },
    {
      cons: datasForm.other_waste_oil_cons.value,
      coeff: other_coeff[21].kg_CO2,
      total: datasForm.other_waste_oil_cons.value * other_coeff[21].kg_CO2,
    },
  ];
  let sum = 0;
  test.map((calcul) => {
    sum += calcul.total;
    return sum;
  });

  return sum;
}

//Function water
function funcWater(datasForm, water_coeff) {
  let consWaterDrink = datasForm.water_drink_cons.value;
  let consWaterWaste = datasForm.water_waste_cons.value;
  let coeffWaterDrink = water_coeff[0].kgCO2_gal;
  let coeffWaterWaste = water_coeff[1].kgCO2_gal;

  let consWater =
    consWaterDrink * coeffWaterDrink + consWaterWaste * coeffWaterWaste;

  return consWater;
}

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

// Function number total beef and dairies
function funcNumbTotalBeefDairy(datasForm) {
  //Number total dairies
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

  return [cattleDairy, cattleBeef];
}

// Function dairy: mitigations improved feeding

function funcMitigationsImpFeedDairy(
  datasForm,
  reductionEF_coeff,
  EFDairy,
  cattleDairy
) {
  //Coeff
  let coeffImpFeedDairy = reductionEF_coeff[0].Improved_feeding;

  // Proportion of animals included in the practice improved feeding

  //Dairy
  let numbDairyPractices = 0;

  if (
    cattleDairy === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbDairyPractices = 0;
  } else {
    if (datasForm.practices.practice_anim[0].dairy_cow.all_of_them === true) {
      numbDairyPractices = 1;
    } else {
      if (
        datasForm.practices.practice_anim[0].dairy_cow.portion_of_them === true
      ) {
        let portionDairy =
          datasForm.practices.practice_anim[0].dairy_cow.portion_numb / 100;
        numbDairyPractices = portionDairy;
      }
    }
  }

  //EF emissions from cattle portion concerned by improved feeding
  let EFDairyImpFeed = 0;
  if (datasForm.practices.practice_anim[0].dairy_cow.selected === true) {
    EFDairyImpFeed = numbDairyPractices * EFDairy * coeffImpFeedDairy;
  } else {
    EFDairyImpFeed = 0;
  }
  // Mitigation percentage
  let mitigationPercentageDairyImpFeed = (EFDairyImpFeed * 100) / EFDairy;
  // Total EF emissions after mitigation
  let mitigatedEFDairyImpFeed =
    EFDairyImpFeed + (1 - numbDairyPractices) * EFDairy;

  return [mitigatedEFDairyImpFeed, mitigationPercentageDairyImpFeed];
}

function funcMitigationsImpFeedBeef(
  datasForm,
  reductionEF_coeff,
  EFBeef,
  cattleBeef
) {
  //Coeff
  let coeffImpFeedBeef = reductionEF_coeff[1].Improved_feeding;

  // Proportion of beef included in the practice improved feeding

  let numbBeefPractices = 0;
  if (
    cattleBeef === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbBeefPractices = 0;
  } else {
    if (datasForm.practices.practice_anim[0].beef_cattle.all_of_them === true) {
      numbBeefPractices = 1;
    } else {
      if (
        datasForm.practices.practice_anim[0].beef_cattle.portion_of_them ===
        true
      ) {
        let portionBeef =
          datasForm.practices.practice_anim[0].beef_cattle.portion_numb / 100;
        numbBeefPractices = portionBeef;
      }
    }
  }

  // EF emissions mitigated by the practice improved feeding

  let EFBeefImpFeed = 0;
  if (datasForm.practices.practice_anim[0].beef_cattle.selected === true) {
    EFBeefImpFeed = numbBeefPractices * EFBeef * coeffImpFeedBeef;
  } else {
    EFBeefImpFeed = 0;
  }
  // Mitigation percentage
  let mitigationPercentageBeefImpFeed = (EFBeefImpFeed * 100) / EFBeef;
  // Total EF emissions after mitigation
  let mitigatedEFBeefImpFeed = EFBeefImpFeed + (1 - numbBeefPractices) * EFBeef;

  return [mitigatedEFBeefImpFeed, mitigationPercentageBeefImpFeed];
}

function funcMitigationsImpFeedSheep(datasForm, reductionEF_coeff, EFSheep) {
  //Coeff
  let coeffImpFeedSheep = reductionEF_coeff[2].Improved_feeding;

  // Proportion of sheep included in the practice improved feeding

  let numbSheepPractices = 0;
  if (
    datasForm.farm_sheeps_matur_numb.value === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbSheepPractices = 0;
  } else {
    if (datasForm.practices.practice_anim[0].sheeps.all_of_them === true) {
      numbSheepPractices = 1;
    } else {
      if (
        datasForm.practices.practice_anim[0].sheeps.portion_of_them === true
      ) {
        let portionSheep =
          datasForm.practices.practice_anim[0].sheeps.portion_numb / 100;
        numbSheepPractices = portionSheep;
      }
    }
  }

  //EF emissions from cattle portion concerned by improved feeding
  let EFSheepImpFeed = 0;
  if (datasForm.practices.practice_anim[0].sheeps.selected === true) {
    EFSheepImpFeed = numbSheepPractices * EFSheep * coeffImpFeedSheep;
  } else {
    EFSheepImpFeed = 0;
  }
  // Mitigation percentage
  let mitigationPercentageSheepImpFeed = (EFSheepImpFeed * 100) / EFSheep;
  // Total EF emissions after mitigation
  let mitigatedEFSheepImpFeed =
    EFSheepImpFeed + (1 - numbSheepPractices) * EFSheep;

  return [mitigatedEFSheepImpFeed, mitigationPercentageSheepImpFeed];
}

// Function dairy: mitigations additives

function funcMitigationsAdditiveDairy(
  datasForm,
  reductionEF_coeff,
  EFDairy,
  cattleDairy
) {
  //Coeff
  let coeffAdditiveDairy = reductionEF_coeff[0].Spec_agents_and_diet_additives;

  // Proportion of animals included in the practice additives

  let numbDairyPracticesAdditive = 0;

  if (
    cattleDairy === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbDairyPracticesAdditive = 0;
  } else {
    if (datasForm.practices.practice_anim[1].dairy_cow.all_of_them === true) {
      numbDairyPracticesAdditive = 1;
    } else {
      if (
        datasForm.practices.practice_anim[1].dairy_cow.portion_of_them === true
      ) {
        let portionDairyAdditive =
          datasForm.practices.practice_anim[1].dairy_cow.portion_numb / 100;
        numbDairyPracticesAdditive = portionDairyAdditive;
      }
    }
  }

  //EF emissions from cattle portion concerned by additives
  let EFDairyAdditive = 0;
  if (datasForm.practices.practice_anim[1].dairy_cow.selected === true) {
    EFDairyAdditive = numbDairyPracticesAdditive * EFDairy * coeffAdditiveDairy;
  } else {
    EFDairyAdditive = 0;
  }
  // Mitigation percentage
  let mitigationPercentageDairyAdditive = (EFDairyAdditive * 100) / EFDairy;
  // Total EF emissions after mitigation
  let mitigatedEFDairyAdditive =
    EFDairyAdditive + (1 - numbDairyPracticesAdditive) * EFDairy;

  return [mitigatedEFDairyAdditive, mitigationPercentageDairyAdditive];
}

// Function beef: mitigations additives

function funcMitigationsAdditiveBeef(
  datasForm,
  reductionEF_coeff,
  EFBeef,
  cattleBeef
) {
  //Coeff
  let coeffAdditiveBeef = reductionEF_coeff[1].Spec_agents_and_diet_additives;

  // Proportion of beef included in the practice additives

  let numbBeefPracticesAdditive = 0;
  if (
    cattleBeef === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbBeefPracticesAdditive = 0;
  } else {
    if (datasForm.practices.practice_anim[1].beef_cattle.all_of_them === true) {
      numbBeefPracticesAdditive = 1;
    } else {
      if (
        datasForm.practices.practice_anim[1].beef_cattle.portion_of_them ===
        true
      ) {
        let portionBeefAdditive =
          datasForm.practices.practice_anim[1].beef_cattle.portion_numb / 100;
        numbBeefPracticesAdditive = portionBeefAdditive;
      }
    }
  }

  // EF emissions mitigated by the practice additives

  let EFBeefAdditive = 0;
  if (datasForm.practices.practice_anim[1].beef_cattle.selected === true) {
    EFBeefAdditive = numbBeefPracticesAdditive * EFBeef * coeffAdditiveBeef;
  } else {
    EFBeefAdditive = 0;
  }
  // Mitigation percentage
  let mitigationPercentageBeefAdditive = (EFBeefAdditive * 100) / EFBeef;
  // Total EF emissions after mitigation
  let mitigatedEFBeefAdditive =
    EFBeefAdditive + (1 - numbBeefPracticesAdditive) * EFBeef;

  return [mitigatedEFBeefAdditive, mitigationPercentageBeefAdditive];
}
// Function sheep: mitigations additives

function funcMitigationsAdditiveSheep(datasForm, reductionEF_coeff, EFSheep) {
  //Coeff
  let coeffAdditiveSheep = reductionEF_coeff[2].Spec_agents_and_diet_additives;

  // Proportion of sheep included in the practice additives

  let numbSheepPracticesAdditive = 0;
  if (
    datasForm.farm_sheeps_matur_numb.value === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbSheepPracticesAdditive = 0;
  } else {
    if (datasForm.practices.practice_anim[1].sheeps.all_of_them === true) {
      numbSheepPracticesAdditive = 1;
    } else {
      if (
        datasForm.practices.practice_anim[1].sheeps.portion_of_them === true
      ) {
        let portionSheepAdditive =
          datasForm.practices.practice_anim[1].sheeps.portion_numb / 100;
        numbSheepPracticesAdditive = portionSheepAdditive;
      }
    }
  }

  //EF emissions from cattle portion concerned by additives
  let EFSheepAdditive = 0;
  if (datasForm.practices.practice_anim[1].sheeps.selected === true) {
    EFSheepAdditive = numbSheepPracticesAdditive * EFSheep * coeffAdditiveSheep;
  } else {
    EFSheepAdditive = 0;
  }
  // Mitigation percentage
  let mitigationPercentageSheepAdditive = (EFSheepAdditive * 100) / EFSheep;
  // Total EF emissions after mitigation
  let mitigatedEFSheepAdditive =
    EFSheepAdditive + (1 - numbSheepPracticesAdditive) * EFSheep;

  return [mitigatedEFSheepAdditive, mitigationPercentageSheepAdditive];
}

// Function dairy: long term breeding

function funcMitigationsLTBreedingDairy(
  datasForm,
  reductionEF_coeff,
  EFDairy,
  cattleDairy
) {
  //Coeff
  let coeffLTBreedingDairy = reductionEF_coeff[0].longterm_change_and_breeding;
  // Proportion of animals included in the practice LTBreeding

  let numbDairyPracticesLTBreeding = 0;

  if (
    cattleDairy === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbDairyPracticesLTBreeding = 0;
  } else {
    if (datasForm.practices.practice_anim[2].dairy_cow.all_of_them === true) {
      numbDairyPracticesLTBreeding = 1;
    } else {
      if (
        datasForm.practices.practice_anim[2].dairy_cow.portion_of_them === true
      ) {
        let portionDairyLTBreeding =
          datasForm.practices.practice_anim[2].dairy_cow.portion_numb / 100;
        numbDairyPracticesLTBreeding = portionDairyLTBreeding;
      }
    }
  }

  //EF emissions from cattle portion concerned by LTBreeding
  let EFDairyLTBreeding = 0;
  if (datasForm.practices.practice_anim[2].dairy_cow.selected === true) {
    EFDairyLTBreeding =
      numbDairyPracticesLTBreeding * EFDairy * coeffLTBreedingDairy;
  } else {
    EFDairyLTBreeding = 0;
  }
  // Mitigation percentage
  let mitigationPercentageDairyLTBreeding = (EFDairyLTBreeding * 100) / EFDairy;
  // Total EF emissions after mitigation
  let mitigatedEFDairyLTBreeding =
    EFDairyLTBreeding + (1 - numbDairyPracticesLTBreeding) * EFDairy;

  return [mitigatedEFDairyLTBreeding, mitigationPercentageDairyLTBreeding];
}

// Function beef: mitigations Long Term Breeding

function funcMitigationsLTBreedingBeef(
  datasForm,
  reductionEF_coeff,
  EFBeef,
  cattleBeef
) {
  //Coeff
  let coeffLTBreedingBeef = reductionEF_coeff[1].longterm_change_and_breeding;

  // Proportion of beef included in the practice LTBreeding

  let numbBeefPracticesLTBreeding = 0;
  if (
    cattleBeef === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbBeefPracticesLTBreeding = 0;
  } else {
    if (datasForm.practices.practice_anim[2].beef_cattle.all_of_them === true) {
      numbBeefPracticesLTBreeding = 1;
    } else {
      if (
        datasForm.practices.practice_anim[2].beef_cattle.portion_of_them ===
        true
      ) {
        let portionBeefLTBreeding =
          datasForm.practices.practice_anim[2].beef_cattle.portion_numb / 100;
        numbBeefPracticesLTBreeding = portionBeefLTBreeding;
      }
    }
  }

  // EF emissions mitigated by the practice LTBreeding

  let EFBeefLTBreeding = 0;
  if (datasForm.practices.practice_anim[2].beef_cattle.selected === true) {
    EFBeefLTBreeding =
      numbBeefPracticesLTBreeding * EFBeef * coeffLTBreedingBeef;
  } else {
    EFBeefLTBreeding = 0;
  }
  // Mitigation percentage
  let mitigationPercentageBeefLTBreeding = (EFBeefLTBreeding * 100) / EFBeef;
  // Total EF emissions after mitigation
  let mitigatedEFBeefLTBreeding =
    EFBeefLTBreeding + (1 - numbBeefPracticesLTBreeding) * EFBeef;

  return [mitigatedEFBeefLTBreeding, mitigationPercentageBeefLTBreeding];
}
// Function sheep: mitigations LTBreeding

function funcMitigationsLTBreedingSheep(datasForm, reductionEF_coeff, EFSheep) {
  //Coeff
  let coeffLTBreedingSheep = reductionEF_coeff[2].longterm_change_and_breeding;

  // Proportion of sheep included in the practice LTBreeding

  let numbSheepPracticesLTBreeding = 0;
  if (
    datasForm.farm_sheeps_matur_numb.value === 0 ||
    datasForm.practices.practice_anim[3].selected === true
  ) {
    numbSheepPracticesLTBreeding = 0;
  } else {
    if (datasForm.practices.practice_anim[2].sheeps.all_of_them === true) {
      numbSheepPracticesLTBreeding = 1;
    } else {
      if (
        datasForm.practices.practice_anim[2].sheeps.portion_of_them === true
      ) {
        let portionSheepLTBreeding =
          datasForm.practices.practice_anim[2].sheeps.portion_numb / 100;
        numbSheepPracticesLTBreeding = portionSheepLTBreeding;
      }
    }
  }

  //EF emissions from cattle portion concerned by LTBreeding
  let EFSheepLTBreeding = 0;
  if (datasForm.practices.practice_anim[2].sheeps.selected === true) {
    EFSheepLTBreeding =
      numbSheepPracticesLTBreeding * EFSheep * coeffLTBreedingSheep;
  } else {
    EFSheepLTBreeding = 0;
  }
  // Mitigation percentage
  let mitigationPercentageSheepLTBreeding = (EFSheepLTBreeding * 100) / EFSheep;
  // Total EF emissions after mitigation
  let mitigatedEFSheepLTBreeding =
    EFSheepLTBreeding + (1 - numbSheepPracticesLTBreeding) * EFSheep;

  return [mitigatedEFSheepLTBreeding, mitigationPercentageSheepLTBreeding];
}
