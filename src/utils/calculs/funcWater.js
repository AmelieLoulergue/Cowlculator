import water_coeff from "../../coeff/water_coeff.json";
//Function water
function funcWater({ water_drink_cons, water_waste_cons }) {
  let consWaterDrink = water_drink_cons ? Number(water_drink_cons.value) : 0;
  let consWaterWaste = water_waste_cons ? Number(water_waste_cons.value) : 0;
  let coeffWaterDrink = water_coeff[0].kgCO2_gal;
  let coeffWaterWaste = water_coeff[1].kgCO2_gal;

  let consWater =
    consWaterDrink * coeffWaterDrink + consWaterWaste * coeffWaterWaste;

  return consWater;
}
export default funcWater;
