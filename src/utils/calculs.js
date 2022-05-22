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
  console.log(coeff_reduction_ghg); // tableau d'objets
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

  // console.log("toutes les datas", datasForm);
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

//function time
function funcTime(datasForm) {
  let start = datasForm.startDate;
  let end = datasForm.endDate;
  let time = end - start;

  return time;
}
