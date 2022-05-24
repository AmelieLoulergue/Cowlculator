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
  console.log(gas_coeff); // tableau d'objets
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

  let elecCO2=funcElec(datasForm,elec_state_coeff)
  console.log(elecCO2)

  let natGasCO2 = funcNatGas(datasForm,natgas_coeff);
  console.log(natGasCO2);

  let gasCO2=funcGas(datasForm,gas_coeff);
  console.log(gasCO2)



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
function funcElec(datasForm,elec_state_coeff){

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
  
  let state= datasForm.demographics.state
  let coeffState=elec_state_coeff.find(
    (coeff)=> coeff.State===state
    );
  let elecCO2 = round(coeffState.CO2_kilo*elecTotal,1)

  return elecCO2

}

// Function natural gas

function funcNatGas(datasForm,natgas_coeff) {
  let unit = datasForm.natgas_unit.value;
  let natGasCons = datasForm.natgas_cons;

  // convert unit to MMBtu
  switch (unit) {
    case "Therm":
      natGasCons = natGasCons/10;
      break;
    case "Ccf":
      natGasCons = natGasCons/10.37;
      break;
    case "Gj":
      natGasCons = natGasCons/1.055056;
      break;
    case "m3":
      natGasCons = natGasCons/28.26369;
      break;
    case "MMBtu":
      natGasCons = natGasCons;
      break;
    default:
      natGasCons = 0;
  }
  
  let coeffNatGas= natgas_coeff.kg_CO2_Mbtu
  let natGasCO2= round((natGasCons*coeffNatGas),1)

  return natGasCO2
}



// Fonction gas

function funcGas(datasForm, gas_coeff){
  let consButane=datasForm.gas_butane_cons.value
  let consPropane=datasForm.gas_propane_cons.value
  let consMix =datasForm.gas_mix_cons.value

  let coeffButane=gas_coeff[1].kg_CO2_gal
  let coeffPropane=gas_coeff[0].kg_CO2_gal
  let coeffMix=gas_coeff[2].kg_CO2_gal

  let gasCO2=round(((consButane*coeffButane)+(consPropane*coeffPropane)+(consMix*coeffMix)),1)

  return gasCO2

}

/*
//Function fuel

function funcFuel(datasForm,fuel_coeff){
  let consDiesel=
  let consGasoline=
  let consFuel

  let coeffFuel=

  let fuelCO2=
}



Funcfuel_CO2 <- function (data){
  
  data$fuel_car_gaso_cons_1 <-as.numeric(as.character(data$fuel_car_gaso_cons_1))
  data$fuel_car_dies_cons_1<-as.numeric(as.character(data$fuel_car_dies_cons_1))
  data$fuel_truck_gaso_cons_1<-as.numeric(as.character(data$fuel_truck_gaso_cons_1))
  data$fuel_truck_dies_cons_1<-as.numeric(as.character(data$fuel_truck_dies_cons_1))
  data$fuel_tract_gaso_cons_1<-as.numeric(as.character(data$fuel_tract_gaso_cons_1))
  data$fuel_tract_dies_cons_1<-as.numeric(as.character(data$fuel_tract_dies_cons_1))
  
  diesel_cons <- sum(data$fuel_car_dies_cons_1,data$fuel_truck_dies_cons_1,data$fuel_tract_dies_cons_1)
  gasoline_cons <- sum(data$fuel_car_gaso_cons_1,data$fuel_truck_gaso_cons_1, data$fuel_tract_gaso_cons_1)
  cons <- c(diesel_cons,gasoline_cons)
  
  fuel_coeff<- fuel_coeff %>% mutate(consumption=cons) %>% mutate(CO2=`kg CO2`*consumption)
  
  fuel_CO2 <-round(sum(fuel_coeff$CO2)/1000 ,1)
  
  return(fuel_CO2)
  
}



*/
