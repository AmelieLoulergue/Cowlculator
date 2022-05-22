import React from "react";

function BlocOther({ formDatas, handleChangeNumber, handleChangeRadio }) {
  return (
    <div id="block_other">
      <div>
        <fieldset>
          <legend>
            Select any other carbon dioxide sources you use from the list :
          </legend>

          {Object.entries(formDatas.other_choice).map((choice) => (
            <div>
              <input
                type="checkbox"
                id={choice[0]}
                name="other_choice"
                key={choice[0]}
                value={choice[0]}
                checked={choice[1]}
                onChange={(event) =>
                  handleChangeRadio({ event: event, none: true })
                }
              />
              <label htmlFor={choice[0]} style={{ paddingRight: "2rem" }}>
                {choice[0].replaceAll("_", " ")}
              </label>
            </div>
          ))}
        </fieldset>
        {Object.entries(formDatas.other_choice).map((choice) => {
          if (
            formDatas[`other_${choice[0]}_cons`] &&
            formDatas.other_choice[choice[0]]
          )
            return (
              <div>
                <label htmlFor={`other_${choice[0]}_cons`}>
                  What is the {choice[0].replaceAll("_", " ")} consumption ?
                </label>
                <input
                  type="number"
                  name={`other_${choice[0]}_cons`}
                  value={
                    formDatas[`other_${choice[0]}_cons`]["value"] === 0
                      ? ""
                      : formDatas[`other_${choice[0]}_cons`]["value"]
                  }
                  onChange={(event) => handleChangeNumber(event)}
                />{" "}
                {formDatas[`other_${choice[0]}_cons`]["unit"]}
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default BlocOther;
