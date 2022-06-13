import React from "react";

function BlocNaturalGas({ handleChangeNumber, handleChangeSelect, formDatas }) {
  return (
    <div id="block_natural_gas">
      <div>
        <label htmlFor="natgas_unit">
          Pick the unit for your natural gas consumption
        </label>
        <select
          name="natgas_unit"
          id="natgaz_unit"
          onChange={(event) => handleChangeSelect({ event: event })}
        >
          {formDatas.natgas_unit.map((unit) => (
            <option
              value={unit.value}
              selected={unit.selected}
              key={unit.value}
            >
              {unit.value}
            </option>
          ))}
        </select>
      </div>
      {formDatas.natgas_unit.find(
        (unit) => unit.selected && unit.value !== "No natural gas consumption"
      ) && (
        <div>
          <label htmlFor="natgas_cons">
            What is the natural gas consumption ?
          </label>
          <input
            type="number"
            min="0"
            name="natgas_cons"
            value={formDatas.natgas_cons === 0 ? "" : formDatas.natgas_cons}
            onChange={(event) =>
              handleChangeNumber({ event: event, natgas: true })
            }
          />{" "}
          {formDatas.natgas_unit.find((unit) => unit.selected).value}
        </div>
      )}
    </div>
  );
}

export default BlocNaturalGas;
