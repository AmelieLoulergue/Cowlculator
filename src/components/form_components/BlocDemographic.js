import React from "react";

function BlocDemographic({ formDatas, handleChange }) {
  return (
    <div>
      <label htmlFor="farm_name">What is the state ?</label>
      <input
        type="text"
        name="demographics.state"
        value={formDatas.demographics.state}
        onChange={(event) => handleChange({ event: event, state: true })}
      />
    </div>
  );
}

export default BlocDemographic;
