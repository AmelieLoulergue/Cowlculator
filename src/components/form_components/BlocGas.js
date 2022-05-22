import React from 'react'

function BlocGas({formDatas, handleChangeNumber}) {
  return (
    <div id="block_gas">
          <div>
            <label htmlFor="gas_butane_cons">
              What is the butane consumption ?
            </label>
            <input
              type="number"
              name="gas_butane_cons"
              value={
                formDatas.gas_butane_cons.value === 0
                  ? ""
                  : formDatas.gas_butane_cons.value
              }
              onChange={(event) => handleChangeNumber(event)}
            />{" "}
            {formDatas.gas_butane_cons.unit}
          </div>
          <div>
            <label htmlFor="gas_propane_cons">
              What is the propane consumption ?
            </label>
            <input
              type="number"
              name="gas_propane_cons"
              value={
                formDatas.gas_propane_cons.value === 0
                  ? ""
                  : formDatas.gas_propane_cons.value
              }
              onChange={(event) => handleChangeNumber(event)}
            />{" "}
            {formDatas.gas_propane_cons.unit}
          </div>
          <div>
            <label htmlFor="gas_mix_cons">
              What is the mix butane/propane consumption ?
            </label>
            <input
              type="number"
              name="gas_mix_cons"
              value={
                formDatas.gas_mix_cons.value === 0
                  ? ""
                  : formDatas.gas_mix_cons.value
              }
              onChange={(event) => handleChangeNumber(event)}
            />{" "}
            {formDatas.gas_mix_cons.unit}
          </div>
        </div>
  )
}

export default BlocGas