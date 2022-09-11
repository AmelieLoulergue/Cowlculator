import round from "./round";
import elec_state_coeff from "../../coeff/elec_state_coeff.json";
//function electricity
function funcElec({ elec_total, elec_generator, elec_generator_prod, state }) {
  //electrictity consumption
  let elecCons = elec_total?.value;

  // electricity production
  const elecProd =
    elec_generator && elec_generator_prod && elec_generator_prod.value
      ? elec_generator_prod.value
      : 0;
  //total
  let elecTotal = elecCons - elecProd;

  //multiplied by CO2 kg/kWh coeff associated to state
  if (state) {
    let coeffState = elec_state_coeff.find((coeff) => coeff.State === state);
    let elecCO2 = round(coeffState?.CO2_kilo * elecTotal, 1);
    return elecCO2;
  } else {
    return "MISSING STATE INFORMATION";
  }
}
export default funcElec;
