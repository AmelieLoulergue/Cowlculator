import React from "react";

function BlocWater({ formDatas, handleChangeNumber }) {
  return (
    <div id="block_water">
      <div>
        <label htmlFor="water_drink_cons">
          What is the tap water consumption ? <br />
          NB: this data can be found on the utility bill or from meters. <br />
          If you have a well and the date about you well water flow, do not
          include them in this total, leave blank.
          <br />
          e.g if your well water covers the totality of your water needs, leave
          blank.
          <br />
        </label>
        <input
          type="number"
          min="0"
          name="water_drink_cons"
          value={
            formDatas.water_drink_cons.value === 0
              ? ""
              : formDatas.water_drink_cons.value
          }
          onChange={(event) => handleChangeNumber({ event: event })}
        />{" "}
        {formDatas.water_drink_cons.unit}
      </div>
      <div>
        <label htmlFor="water_waste_cons">
          What quantity of wastewater is treated? leave blank if non applicable.
        </label>
        <input
          type="number"
          min="0"
          name="water_waste_cons"
          value={
            formDatas.water_waste_cons.value === 0
              ? ""
              : formDatas.water_waste_cons.value
          }
          onChange={(event) => handleChangeNumber({ event: event })}
        />{" "}
        {formDatas.water_waste_cons.unit}
      </div>
    </div>
  );
}

export default BlocWater;
