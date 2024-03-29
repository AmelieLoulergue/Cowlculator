import fertilizer_coeff from "../../coeff/synthetic_fertilizer_coeff.json";
// function fertilizers
function funcFertilizer({ fertilizers }) {
  let fertilizerArray = [];
  fertilizers?.forEach((element) => {
    if (element.response && element.response.value) {
      fertilizerArray.push({
        cons: Number(element.response.value),
        coeff: fertilizer_coeff.find(
          (coeff) =>
            coeff.fert_name ===
            element.id.split("farm_crops_fertilizer_")[1].split("_cons")[0]
        )?.Emissions_application_tonsN2OperTon,
        total:
          Number(element.response.value) *
          fertilizer_coeff.find(
            (coeff) =>
              coeff.fert_name ===
              element.id.split("farm_crops_fertilizer_")[1].split("_cons")[0]
          )?.Emissions_application_tonsN2OperTon,
      });
    }
  });

  let sum = 0;
  fertilizerArray.map((calcul) => {
    sum += calcul.total;
    return sum;
  });
  let fertilizerCO2eq = sum * 298;

  return fertilizerCO2eq;
}
export default funcFertilizer;
