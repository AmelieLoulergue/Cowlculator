import { prettyDOM } from "@testing-library/react";
import React, { startTransition } from "react";

function calculs(datasForm) {
  console.log("toutes les datas", datasForm);
  console.log("date de fin", datasForm.endDate);
  console.log("date de début", datasForm.startDate);
  console.log(
    "nombre de bisons matures",
    datasForm.farm_american_bison_matur_numb.value
  );
  console.log(
    "natgas unit Therm",
    datasForm.natgas_unit[0].value,
    datasForm.natgas_unit[0].selected
  );
  // tu peux boucler sur des tableaux
  datasForm.natgas_unit.map((unit, index) => {
    console.log(unit.value, unit.selected, index);
  });
  // tu peux trouver un élement avec une condition
  const unit_selected = datasForm.natgas_unit.find(
    (unit) => unit.selected === true
  );
  console.log(unit_selected);

  let time= funcTime(datasForm)
  console.log(time)
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
  let elecCons = datasForm.elec_total

  // electricity production
  if(datasForm.elec_generator){
    let elecProd= datasForm.elect_generator_prod
  } else {
    let elecProd= 0
  }
  //total
  let elecTotal=elecCons-elecProd

  /*
  //multiplied by CO2 kg/kWh coeff associated to state
  let state= datasForm.state
  let coeffState= // extract coeff associated with state in the coefficients table
  let elecC02 = round(elecTotal*coeffState,1)
*/

}
/*


  #multiplied by coeff associated to state
  state <- data$state_1
  coef <- elec_coeff$`CO2 kg/kWh`[elec_coeff$State==state]
  elec_CO2 <-round(elec_cons*coef/1000,1)
  
  return(elec_CO2)
}



*/

