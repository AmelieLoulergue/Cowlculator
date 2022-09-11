import round from "./round";
import gas_coeff from "../../coeff/gas_coeff.json";
// Fonction gas

function funcGas({ gas_butane_cons, gas_propane_cons, gas_mix_cons }) {
  let consButane = Number(gas_butane_cons?.value);
  let consPropane = Number(gas_propane_cons?.value);
  let consMix = Number(gas_mix_cons?.value);

  let coeffButane = gas_coeff[1].kg_CO2_gal;
  let coeffPropane = gas_coeff[0].kg_CO2_gal;
  let coeffMix = gas_coeff[2].kg_CO2_gal;
  let butane = consButane ? consButane * coeffButane : 0;
  let propane = consPropane ? consPropane * coeffPropane : 0;
  let mix = consMix ? consMix * coeffMix : 0;
  let gasCO2 = round(butane + propane + mix, 1);

  return gasCO2;
}
export default funcGas;
