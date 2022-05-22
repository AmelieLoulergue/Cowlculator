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
)

{
  console.log(natgas_coeff); // tableau d'objets
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

  

  let coeffState= elec_state_coeff.find(
    (coeff)=> coeff.State==="FL"
    );
console.log(coeffState);
console.log(coeffState.CO2_kilo);

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

  let time= funcTime(datasForm)
  console.log(time)

  let elecCO2=funcElec(datasForm)
  console.log(elecCO2)

  let natGasCO2=funcNatgas(datasForm)
  console.log(natGasCO2)

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
function funcTime(datasForm){
  let start= new Date(datasForm.startDate)
  let end = new Date(datasForm.endDate)
  let time = round(((end.getTime() - start.getTime())/ (1000*3600*24*7*52.25)),1);
  
  return time
}

//function electricity
function funcElec(datasForm){

  //electrictity consumption
  let elecCons = datasForm.elec_total.value
  let elecProd =0

  // electricity production
  if(datasForm.elec_generator){
    elecProd= datasForm.elec_generator_prod.value
  } else {
    elecProd= 0
  }
  //total
  let elecTotal=elecCons-elecProd

  //return elecTotal -> works
  
  /*
  //multiplied by CO2 kg/kWh coeff associated to state
  let state= datasForm.demographics.state
  let coeffState=elec_state_coeff.find(
    (coeff)=> coeff.State===state
    );
  let elecCO2 = round(coeffState.CO2_kilo*elecTotal,1)

  return elecCO2 

*/

}


// Function natural gas

function funcNatgas(datasForm){

  let unit=datasForm.natgas_unit.value
  let natGasCons=datasForm.natgas_cons

  // convert unit to MMBtu
  switch(unit){
    case("Therm"):
    natGasCons=natGasCons/10;
    break;
    case("Ccf"):
    natGasCons=natGasCons/10.37;
    break;
    case("Gj"):
    natGasCons=natGasCons/1.055056;
    break;
    case("m3"):
    natGasCons=natGasCons/28.26369;
    break;
    case("MMBtu"):
    natGasCons=natGasCons;
    break;
    default:
      natGasCons=0

  }
/*
  let coeffNatGas= datasForm.natgas_coeff.kg_CO2_Mbtu
  let natGasCO2= round((natGasCons*coeffNatGas),1)

  return natGasCO2
*/
}


