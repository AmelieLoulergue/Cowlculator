import other_coeff from "../../coeff/other_coeff.json";
//Function other
function funcOther({ others }) {
  let otherArray = [];
  others.forEach((element) => {
    if (element.response && element.response.value) {
      otherArray.push({
        cons: Number(element.response.value),
        coeff: other_coeff.find(
          (coeff) =>
            coeff.Other === element.id.split("other_")[1].split("_cons")[0]
        )?.kg_CO2,
        total:
          Number(element.response.value) *
          other_coeff.find(
            (coeff) =>
              coeff.Other === element.id.split("other_")[1].split("_cons")[0]
          )?.kg_CO2,
      });
    }
  });
  // let test = [
  //   {
  //     cons: datasForm.other_kerosene_cons.value,
  //     coeff: other_coeff[0].kg_CO2,
  //     total: datasForm.other_kerosene_cons.value * other_coeff[0].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_coal_cons.value,
  //     coeff: other_coeff[1].kg_CO2,
  //     total: datasForm.other_coal_cons.value * other_coeff[1].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_residual_heating_fuel_cons.value,
  //     coeff: other_coeff[2].kg_CO2,
  //     total:
  //       datasForm.other_residual_heating_fuel_cons.value *
  //       other_coeff[2].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_jet_fuel_cons.value,
  //     coeff: other_coeff[3].kg_CO2,
  //     total: datasForm.other_jet_fuel_cons.value * other_coeff[3].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_aviation_gas_cons.value,
  //     coeff: other_coeff[4].kg_CO2,
  //     total: datasForm.other_aviation_gas_cons.value * other_coeff[4].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_flared_natural_gas_cons.value,
  //     coeff: other_coeff[5].kg_CO2,
  //     total:
  //       datasForm.other_flared_natural_gas_cons.value * other_coeff[5].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_petroleum_coke_cons.value,
  //     coeff: other_coeff[6].kg_CO2,
  //     total: datasForm.other_petroleum_coke_cons.value * other_coeff[6].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_petroleum_and_miscellaneous_cons.value,
  //     coeff: other_coeff[7].kg_CO2,
  //     total:
  //       datasForm.other_petroleum_and_miscellaneous_cons.value *
  //       other_coeff[7].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_asphalt_and_road_oil.value,
  //     coeff: other_coeff[8].kg_CO2,
  //     total: datasForm.other_asphalt_and_road_oil.value * other_coeff[8].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_lubricants_cons.value,
  //     coeff: other_coeff[9].kg_CO2,
  //     total: datasForm.other_lubricants_cons.value * other_coeff[9].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_petrochemical_feedstocks.value,
  //     coeff: other_coeff[10].kg_CO2,
  //     total:
  //       datasForm.other_petrochemical_feedstocks.value * other_coeff[10].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_special_naphthas_solvents.value,
  //     coeff: other_coeff[11].kg_CO2,
  //     total:
  //       datasForm.other_special_naphthas_solvents.value *
  //       other_coeff[11].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_waxes_cons.value,
  //     coeff: other_coeff[12].kg_CO2,
  //     total: datasForm.other_waxes_cons.value * other_coeff[12].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_anthracite_cons.value,
  //     coeff: other_coeff[13].kg_CO2,
  //     total: datasForm.other_anthracite_cons.value * other_coeff[13].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_bituminous_cons.value,
  //     coeff: other_coeff[14].kg_CO2,
  //     total: datasForm.other_bituminous_cons.value * other_coeff[14].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_subbituminous_cons.value,
  //     coeff: other_coeff[15].kg_CO2,
  //     total: datasForm.other_subbituminous_cons.value * other_coeff[15].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_coke_cons.value,
  //     coeff: other_coeff[17].kg_CO2,
  //     total: datasForm.other_coke_cons.value * other_coeff[17].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_geothermal_cons.value,
  //     coeff: other_coeff[18].kg_CO2,
  //     total: datasForm.other_geothermal_cons.value * other_coeff[18].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_municiple_solid_waste_cons.value,
  //     coeff: other_coeff[19].kg_CO2,
  //     total:
  //       datasForm.other_municiple_solid_waste_cons.value *
  //       other_coeff[19].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_tire_derived_fuel_cons.value,
  //     coeff: other_coeff[20].kg_CO2,
  //     total:
  //       datasForm.other_tire_derived_fuel_cons.value * other_coeff[20].kg_CO2,
  //   },
  //   {
  //     cons: datasForm.other_waste_oil_cons.value,
  //     coeff: other_coeff[21].kg_CO2,
  //     total: datasForm.other_waste_oil_cons.value * other_coeff[21].kg_CO2,
  //   },
  // ];
  let sum = 0;
  otherArray.map((calcul) => {
    sum += calcul.total;
    return sum;
  });

  return sum;
}
export default funcOther;
