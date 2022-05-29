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
  console.log(other_coeff); // tableau d'objets

  console.log(elec_state_coeff);
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

  console.log(natgas_coeff);

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
      cons: datasForm.other_anthracite_cons.value,
      coeff: other_coeff[13].kg_CO2,
      total: datasForm.other_anthracite_cons.value * other_coeff[13].kg_CO2,
    },
    {
      cons: datasForm.other_asphalt_and_road_oil.value,
      coeff: other_coeff[8].kg_CO2,
      total: datasForm.other_anthracite_cons.value * other_coeff[8].kg_CO2,
    },
  ];
  let sum = 0;
  test.map((calcul) => {
    sum += calcul.total;
  });
  console.log(sum);
  return sum;
  // let consAnthr = datasForm.other_anthracite_cons.value;
  // let consAsph = datasForm.other_asphalt_and_road_oil.value;
  // let consAvGas = datasForm.other_aviation_gas_cons.value;
  // let consBit = datasForm.other_bituminous_cons.value;
  // let consCoal = datasForm.other_coal_cons.value;
  // let consCoke = datasForm.other_coke_cons.value;
  // let consFlared = datasForm.other_flared_natural_gas_cons.value;
  // let consGeoth = datasForm.other_geothermal_cons.value;
  // let consJetFuel = datasForm.other_jet_fuel_cons.value;
  // let consKeros = datasForm.other_kerosene_cons.value;
  // let consLign = datasForm.other_lignite_cons.value;
  // let consLub = datasForm.other_lubricants_cons.value;
  // let consSolidWaste = datasForm.other_municiple_solid_waste_cons.value;
  // let consFeedstock = datasForm.other_petrochemical_feedstocks.value;
  // let consMisc = datasForm.other_petroleum_and_miscellaneous_cons.value;
  // let consPetroleum = datasForm.other_petroleum_coke_cons.value;
  // let consResFuel = datasForm.other_residual_heating_fuel_cons.value;
  // let consNapht = datasForm.other_special_naphthas_solvents.value;
  // let consSubb = datasForm.other_subbituminous_cons.value;
  // let consTireDer = datasForm.other_tire_derived_fuel_cons.value;
  // let consWasteOil = datasForm.other_waste_oil_cons.value;
  // let consWax = datasForm.other_waxes_cons.value;

  // let coeffAnthr = other_coeff[13];
  // let coeffAsph = other_coeff[8];
  // let coeffAvGas = other_coeff[4];
  // let coeffBit = other_coeff[14];
  // let coeffCoal = other_coeff[1];
  // let coeffCoke = other_coeff[17];
  // let coeffFlared = other_coeff[5];
  // let coeffGeoth = other_coeff[18];
  // let coeffJetFuel = other_coeff[3];
  // let coeffKeros = other_coeff[0];
  // let coeffLign = other_coeff[16];
  // let coeffLub = other_coeff[9];
  // let coeffSolidWaste = other_coeff[19];
  // let coeffFeedstock = other_coeff[10];
  // let coeffMisc = other_coeff[7];
  // let coeffPetroleum = other_coeff[6];
  // let coeffResFuel = other_coeff[2];
  // let coeffNapht = other_coeff[11];
  // let coeffSubb = other_coeff[15];
  // let coeffTireDer = other_coeff[20];
  // let coeffWasteOil = other_coeff[21];
  // let coeffWax = other_coeff[12];
  // return coeffWax;
}

// Funcother_CO2 <- function (data) {

//   cons <- c(data$other_kero_cons_1,data$other_coal_cons_1,data$other_rhf_cons_1,data$other_jet_cons_1,data$other_aviation_cons_1,data$other_fng_cons_1,data$other_petroleum_cons_1,data$other_petmisc_cons_1,data$other_asphoil_cons_1,data$other_lub_cons_1,data$other_petrofeed_cons_1,data$other_specnapht_cons_1,data$other_waxes_cons_1,data$other_anthr_cons_1,data$other_bit_cons_1,data$other_subbit_cons_1,data$other_lignite_cons_1,data$other_coke_cons_1,data$other_geoth_cons_1,data$other_solidwaste_con_1,data$other_tireder_cons_1,data$other_wasteoil_cons_1)
//   other_coeff <- other_coeff %>% mutate(consumption=cons) %>% mutate(CO2=`kg CO2`*consumption)

//   other_CO2 <- round(sum(other_coeff$CO2)/1000,1)

//   return(other_CO2)
// }
