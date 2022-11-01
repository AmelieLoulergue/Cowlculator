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

  let sum = 0;
  otherArray.map((calcul) => {
    sum += calcul.total;
    return sum;
  });

  return sum;
}
export default funcOther;
