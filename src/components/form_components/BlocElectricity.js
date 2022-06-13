import React from "react";

function BlocElectricity({
  handleChangeNumber,
  formDatas,
  handleChangeCheckbox,
}) {
  return (
    <div id="block_electricity">
      <div>
        <label htmlFor="elec_total">
          What is your total electricity consumption? (Leave blank if non
          applicable)
        </label>
        <input
          type="number"
          min="0"
          name="elec_total"
          value={
            formDatas.elec_total.value === 0 ? "" : formDatas.elec_total.value
          }
          onChange={(event) => handleChangeNumber({ event: event })}
        />
        {formDatas.elec_total.unit}
      </div>
      <div>
        <label htmlFor="elec_generator">
          Do you produce electricity from renewable energy (solar, wind...) ?
        </label>
        <input
          type="checkbox"
          name="elec_generator"
          defaultChecked={formDatas.elec_generator}
          onChange={(event) => handleChangeCheckbox({ event: event })}
        />{" "}
        YES
      </div>

      {formDatas.elec_generator && (
        <div>
          <label htmlFor="elec_generator_prod">
            How much kWh of electricity do you produce ?
          </label>
          <input
            type="number"
            min="0"
            name="elec_generator_prod"
            value={
              formDatas.elec_generator_prod.value === 0
                ? ""
                : formDatas.elec_generator_prod.value
            }
            onChange={(event) => handleChangeNumber({ event: event })}
          />{" "}
          {formDatas.elec_generator_prod.unit}
        </div>
      )}
    </div>
  );
}

export default BlocElectricity;
