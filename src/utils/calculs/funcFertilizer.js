import round from "./round";
import fertilizer_coeff from "../../coeff/synthetic_fertilizer_coeff.json";
// function fertilizers
function funcFertilizer({ farm_crops_fertilizer }) {
  let fertilizerArray = [];
  console.log(farm_crops_fertilizer);
  farm_crops_fertilizer.forEach((element) => {
    console.log(element.id.split("farm_crops_fertilizer_")[1]);
    console.log(
      fertilizer_coeff.find(
        (coeff) =>
          coeff.fert_name === element.id.split("farm_crops_fertilizer_")[1]
      )?.Emissions_application_tonsN2OperTon
    );
    if (element.response && element.response.value) {
      fertilizerArray.push({
        cons: Number(element.response.value),
        coeff: fertilizer_coeff.find(
          (coeff) => coeff.fert_name === element.id.split("_cons")[0]
        )?.Emissions_application_tonsN2OperTon,
        total:
          Number(element.response.value) *
          fertilizer_coeff.find(
            (coeff) => coeff.fert_name === element.id.split("_cons")[0]
          )?.Emissions_application_tonsN2OperTon,
      });
    }
  });

  let sum = 0;
  fertilizerArray.map((calcul) => {
    console.log(calcul);
    sum += calcul.total;
    return sum;
  });

  return sum;
}
export default funcFertilizer;