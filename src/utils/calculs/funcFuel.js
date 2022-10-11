import fuel_coeff from "../../coeff/fuel_coeff.json";
//Function fuel

function funcFuel({
  vehicles_type_cars_diesel_cons,
  vehicles_type_cars_gasoline_cons,
  vehicles_type_trucks_diesel_cons,
  vehicles_type_trucks_gasoline_cons,
  vehicles_type_tractors_diesel_cons,
  vehicles_type_tractors_gasoline_cons,
}) {
  let carDiesel = vehicles_type_cars_diesel_cons?.value
    ? vehicles_type_cars_diesel_cons.value
    : 0;
  let truckDiesel = vehicles_type_trucks_diesel_cons?.value
    ? vehicles_type_trucks_diesel_cons.value
    : 0;
  let tractorDiesel = vehicles_type_tractors_diesel_cons?.value
    ? vehicles_type_tractors_diesel_cons.value
    : 0;
  let consDiesel =
    Number(carDiesel) + Number(truckDiesel) + Number(tractorDiesel);
  let carGaso = vehicles_type_cars_gasoline_cons?.value
    ? vehicles_type_cars_gasoline_cons.value
    : 0;
  let truckGaso = vehicles_type_trucks_gasoline_cons?.value
    ? vehicles_type_trucks_gasoline_cons.value
    : 0;
  let tractorGaso = vehicles_type_tractors_gasoline_cons?.value
    ? vehicles_type_tractors_gasoline_cons.value
    : 0;
  let consGasoline = Number(carGaso) + Number(truckGaso) + Number(tractorGaso);
  let coeffDiesel = fuel_coeff[0].kg_CO2;
  let coeffGasoline = fuel_coeff[1].kg_CO2;
  let fuelCO2 = consDiesel * coeffDiesel + consGasoline * coeffGasoline;
  return fuelCO2;
}
export default funcFuel;
