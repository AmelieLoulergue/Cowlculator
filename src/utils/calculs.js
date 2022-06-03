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
  console.log(enteric_EF); // tableau d'objets

  console.log(datasForm.natgas_unit);
  // pour avoir la première ligne du tableau
  console.log(coeff_reduction_ghg[0]);
  console.log(elec_state_coeff[0]);
  // au valeur de cette ligne
  console.log(
    "climate : ",
    coeff_reduction_ghg[0].climate,
    "practice : ",
    coeff_reduction_ghg[0].practice,
    "CO2 :",
    coeff_reduction_ghg[0].CO2,
    "CH4 :",
    coeff_reduction_ghg[0].CH4,
    "N2O : ",
    coeff_reduction_ghg[0].N2O,
    "GHG :",
    coeff_reduction_ghg[0].GHG
  );
  // trouver un élément par rapport à la pratique
  let practice = coeff_reduction_ghg.find(
    (coeff) => coeff.practice === "agronomy"
  );

  //console.log(consOther.length);

  console.log(practice);
  console.log(
    "climate : ",
    practice.climate,
    "practice : ",
    practice.practice,
    "CO2 :",
    practice.CO2,
    "CH4 :",
    practice.CH4,
    "N2O : ",
    practice.N2O,
    "GHG :",
    practice.GHG
  );

  let time = funcTime(datasForm);
  console.log(time);

  let elecCO2 = funcElec(datasForm, elec_state_coeff);
  console.log(elecCO2);

  let natGasCO2 = funcNatGas(datasForm, natgas_coeff);
  console.log(natGasCO2);

  let gasCO2 = funcGas(datasForm, gas_coeff);
  console.log(gasCO2);

  let fuelCO2 = funcFuel(datasForm, fuel_coeff);
  console.log(fuelCO2);

  let other = funcOther(datasForm, other_coeff);
  console.log(other);

  let water = funcWater(datasForm, water_coeff);
  console.log(water);

  let entericFermentationCO2 = funcAnimalsEF(datasForm, enteric_EF, regions);
  console.log(entericFermentationCO2);

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
  let elecCons = datasForm.elec_total.value;
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

  let state = datasForm.demographics.state;
  let coeffState = elec_state_coeff.find((coeff) => coeff.State === state);
  let elecCO2 = round(coeffState.CO2_kilo * elecTotal, 1);

  return elecCO2;
}

// Function natural gas

function funcNatGas(datasForm, natgas_coeff) {
  let unit = datasForm.natgas_unit.find((unit) => unit.selected === true).value;
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
function funcAnimalsEF(datasForm, enteric_EF, regions) {
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

  return coeffEF;

  //Extract animals' coeff based on the region

  //CODE R

  // coeff_dairyrep12<- as.numeric(EF_coeff[2,region])
  //   coeff_dairyrep24<- as.numeric(EF_coeff[3,region])
  //   coeff_dairymature<- as.numeric(EF_coeff[4,region])

  //   coeff_beefrep12<- as.numeric(EF_coeff[6,region])
  //   coeff_beefrep24<- as.numeric(EF_coeff[7,region])
  //   coeff_beefmature<- as.numeric(EF_coeff[8,region])
  //   ifelse((EF_coeff[9,region])==0,coeff_beefweanl<-as.numeric(EF_coeff$`National Average`[9]), coeff_beefweanl<-as.numeric(EF_coeff[9,region]))
  //   ifelse((EF_coeff[10,region])==0,coeff_beefyearnl<-as.numeric(EF_coeff$`National Average`[10]), coeff_beefyearnl<-as.numeric(EF_coeff[10,region]))
  //   coeff_beefbulls<- as.numeric(EF_coeff[11,region])

  //   coeff_sheep <-as.numeric(EF_coeff$`National Average`[12])
  //   coeff_goats <-as.numeric(EF_coeff$`National Average`[13])
  //   coeff_swine <-as.numeric(EF_coeff$`National Average`[14])
  //   coeff_horses <-as.numeric(EF_coeff$`National Average`[15])
  //   coeff_mules <-as.numeric(EF_coeff$`National Average`[16])
  //   coeff_waterbuff <-as.numeric(EF_coeff$`National Average`[17])
}
