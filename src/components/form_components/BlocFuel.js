import React from "react";

function BlocFuel({ formDatas, handleChangeNumber, handleChangeRadio }) {
  return (
    <div id="block_fuel">
      <div>
        <fieldset>
          <legend>
            Select all the vehicles used on your production, transformation,
            distribution business area:
          </legend>

          <div>
            <input
              type="checkbox"
              id="Cars"
              name="fuel_vehicles"
              value="cars"
              checked={formDatas.fuel_vehicles.cars}
              onChange={(event) =>
                handleChangeRadio({ event: event, none: true })
              }
            />
            <label htmlFor="Cars">Car(s)</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="Trucks"
              name="fuel_vehicles"
              value="trucks"
              checked={formDatas.fuel_vehicles.trucks}
              onChange={(event) =>
                handleChangeRadio({ event: event, none: true })
              }
            />
            <label htmlFor="Trucks">Truck(s)</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="Tractors"
              name="fuel_vehicles"
              value="tractors"
              checked={formDatas.fuel_vehicles.tractors}
              onChange={(event) =>
                handleChangeRadio({ event: event, none: true })
              }
            />
            <label htmlFor="Tractors">Tractor(s)</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="None"
              name="fuel_vehicles"
              value="none"
              checked={formDatas.fuel_vehicles.none}
              onChange={(event) =>
                handleChangeRadio({ event: event, none: true })
              }
            />
            <label htmlFor="None">None</label>
          </div>
        </fieldset>
      </div>

      {formDatas.fuel_vehicles.cars && (
        <div>
          <fieldset>
            <legend>For the car(s), do you use :</legend>

            <div>
              <input
                type="checkbox"
                id="gasoline"
                name="fuel_car_type"
                value="gasoline"
                checked={formDatas.fuel_car_type.gasoline}
                onChange={(event) =>
                  handleChangeRadio({ event: event, both: true })
                }
              />
              <label htmlFor="gasoline">Gasoline</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="diesel"
                name="fuel_car_type"
                value="diesel"
                checked={formDatas.fuel_car_type.diesel}
                onChange={(event) =>
                  handleChangeRadio({ event: event, both: true })
                }
              />
              <label htmlFor="diesel">Diesel</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="both"
                name="fuel_car_type"
                value="both"
                checked={formDatas.fuel_car_type.both}
                onChange={(event) =>
                  handleChangeRadio({ event: event, both: true })
                }
              />
              <label htmlFor="both">Both</label>
            </div>
          </fieldset>
        </div>
      )}
      {(formDatas.fuel_car_type.both || formDatas.fuel_car_type.gasoline) && (
        <div>
          <label htmlFor="fuel_car_gaso_cons">
            What is the gasoline consumption for the car(s) ?
          </label>
          <input
            type="number"
            min="0"
            name="fuel_car_gaso_cons"
            value={
              formDatas.fuel_car_gaso_cons.value === 0
                ? ""
                : formDatas.fuel_car_gaso_cons.value
            }
            onChange={(event) => handleChangeNumber({ event: event })}
          />{" "}
          {formDatas.fuel_car_gaso_cons.unit}
        </div>
      )}
      {(formDatas.fuel_car_type.both || formDatas.fuel_car_type.diesel) && (
        <div>
          <label htmlFor="fuel_car_dies_cons">
            What is the diesel consumption for the car(s) ?
          </label>
          <input
            type="number"
            min="0"
            name="fuel_car_dies_cons"
            value={
              formDatas.fuel_car_dies_cons.value === 0
                ? ""
                : formDatas.fuel_car_dies_cons.value
            }
            onChange={(event) => handleChangeNumber({ event: event })}
          />{" "}
          {formDatas.fuel_car_dies_cons.unit}
        </div>
      )}
      {formDatas.fuel_vehicles.trucks && (
        <div>
          <fieldset>
            <legend>For the truck(s), do you use :</legend>

            <div>
              <input
                type="checkbox"
                id="gasoline"
                name="fuel_truck_type"
                value="gasoline"
                checked={formDatas.fuel_truck_type.gasoline}
                onChange={(event) =>
                  handleChangeRadio({ event: event, both: true })
                }
              />
              <label htmlFor="gasoline">Gasoline</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="diesel"
                name="fuel_truck_type"
                value="diesel"
                checked={formDatas.fuel_truck_type.diesel}
                onChange={(event) =>
                  handleChangeRadio({ event: event, both: true })
                }
              />
              <label htmlFor="diesel">Diesel</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="both"
                name="fuel_truck_type"
                value="both"
                checked={formDatas.fuel_truck_type.both}
                onChange={(event) =>
                  handleChangeRadio({ event: event, both: true })
                }
              />
              <label htmlFor="both">Both</label>
            </div>
          </fieldset>
        </div>
      )}
      {(formDatas.fuel_truck_type.both ||
        formDatas.fuel_truck_type.gasoline) && (
        <div>
          <label htmlFor="fuel_truck_gaso_cons">
            What is the gasoline consumption for the truck(s) ?
          </label>
          <input
            type="number"
            min="0"
            name="fuel_truck_gaso_cons"
            value={
              formDatas.fuel_truck_gaso_cons.value === 0
                ? ""
                : formDatas.fuel_truck_gaso_cons.value
            }
            onChange={(event) => handleChangeNumber({ event: event })}
          />{" "}
          {formDatas.fuel_truck_gaso_cons.unit}
        </div>
      )}
      {(formDatas.fuel_truck_type.both || formDatas.fuel_truck_type.diesel) && (
        <div>
          <label htmlFor="fuel_truck_dies_cons">
            What is the diesel consumption for the truck(s) ?
          </label>
          <input
            type="number"
            min="0"
            name="fuel_truck_dies_cons"
            value={
              formDatas.fuel_truck_dies_cons.value === 0
                ? ""
                : formDatas.fuel_truck_dies_cons.value
            }
            onChange={(event) => handleChangeNumber({ event: event })}
          />{" "}
          {formDatas.fuel_truck_dies_cons.unit}
        </div>
      )}
      {formDatas.fuel_vehicles.tractors && (
        <div>
          <fieldset>
            <legend>For the tractor(s), do you use :</legend>

            <div>
              <input
                type="checkbox"
                id="gasoline"
                name="fuel_tract_type"
                value="gasoline"
                checked={formDatas.fuel_tract_type.gasoline}
                onChange={(event) =>
                  handleChangeRadio({ event: event, both: true })
                }
              />
              <label htmlFor="gasoline">Gasoline</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="diesel"
                name="fuel_tract_type"
                value="diesel"
                checked={formDatas.fuel_tract_type.diesel}
                onChange={(event) =>
                  handleChangeRadio({ event: event, both: true })
                }
              />
              <label htmlFor="diesel">Diesel</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="both"
                name="fuel_tract_type"
                value="both"
                checked={formDatas.fuel_tract_type.both}
                onChange={(event) =>
                  handleChangeRadio({ event: event, both: true })
                }
              />
              <label htmlFor="both">Both</label>
            </div>
          </fieldset>
        </div>
      )}
      {(formDatas.fuel_tract_type.both ||
        formDatas.fuel_tract_type.gasoline) && (
        <div>
          <label htmlFor="fuel_tract_gaso_cons">
            What is the gasoline consumption for the tractor(s) ?
          </label>
          <input
            type="number"
            min="0"
            name="fuel_tract_gaso_cons"
            value={
              formDatas.fuel_tract_gaso_cons.value === 0
                ? ""
                : formDatas.fuel_tract_gaso_cons.value
            }
            onChange={(event) => handleChangeNumber({ event: event })}
          />{" "}
          {formDatas.fuel_tract_gaso_cons.unit}
        </div>
      )}
      {(formDatas.fuel_tract_type.both || formDatas.fuel_tract_type.diesel) && (
        <div>
          <label htmlFor="fuel_tract_dies_cons">
            What is the diesel consumption for the tractor(s) ?
          </label>
          <input
            type="number"
            min="0"
            name="fuel_tract_dies_cons"
            value={
              formDatas.fuel_tract_dies_cons.value === 0
                ? ""
                : formDatas.fuel_tract_dies_cons.value
            }
            onChange={(event) => handleChangeNumber({ event: event })}
          />{" "}
          {formDatas.fuel_tract_dies_cons.unit}
        </div>
      )}
    </div>
  );
}

export default BlocFuel;
