import round from "./round";
import natgas_coeff from "../../coeff/natgas_coeff.json";
// Function natural gas

function funcNatGas({ natgas_cons}) {
  // convert unit to MMBtu
  let natGasCons = 0;
  switch (natgas_cons.unit) {
    case "kWh":
      natGasCons = Number(natgas_cons.value) / 0.00341215;
      break;
    case "Therm":
      natGasCons = Number(natgas_cons.value) / 10;
      break;
    case "Ccf":
      natGasCons = Number(natgas_cons.value) / 10.37;
      break;
    case "Gj":
      natGasCons = Number(natgas_cons.value) / 1.055056;
      break;
    case "m3":
      natGasCons = Number(natgas_cons.value) / 28.26369;
      break;
    case "MMBtu":
      natGasCons = Number(natgas_cons.value);
      break;
    default:
      natGasCons = 0;
  }

  let coeffNatGas = natgas_coeff[0].kg_CO2_Mbtu;
  let natGasCO2 = round(natGasCons * coeffNatGas, 1);
  return natGasCO2;
}
export default funcNatGas;
