import React from "react";

function BlocPractices({ formDatas, setFormDatas }) {
  const handleChangeCheckbox = ({ event, practice }) => {
    if (practice) {
      //   console.log(event.target.value, event.target.name.split("."));
      setFormDatas({
        ...formDatas,
        practices: {
          ...formDatas["practices"],
          practice_anim: formDatas.practices.practice_anim.map(
            (practice, index) =>
              index === Number(event.target.value)
                ? {
                    ...practice,
                    [event.target.name.split(".")[1]]: {
                      ...formDatas["practices"].practice_anim[
                        event.target.value
                      ][event.target.name.split(".")[1]],
                      selected: event.target.checked,
                    },
                  }
                : practice
          ),
        },
      });
    } else {
      //   console.log(formDatas.practices.practice_anim[event.target.value]);
      if (event.target.value === "3") {
        setFormDatas({
          ...formDatas,
          practices: {
            ...formDatas["practices"],
            [event.target.name]: formDatas.practices.practice_anim.map(
              (practice, index) =>
                index === Number(event.target.value)
                  ? { ...practice, selected: event.target.checked }
                  : { ...practice, selected: false }
            ),
          },
        });
      } else {
        setFormDatas({
          ...formDatas,
          practices: {
            ...formDatas["practices"],
            [event.target.name]: formDatas.practices.practice_anim.map(
              (practice, index) =>
                index === Number(event.target.value)
                  ? { ...practice, selected: event.target.checked }
                  : practice.value === "none"
                  ? { ...practice, selected: false }
                  : practice
            ),
          },
        });
      }
    }
  };
  const handleChangeRadio = ({ event, practice }) => {
    if (practice) {
      formDatas.practices.practice_anim.map((practice, index) => {
        if (practice.selected) {
          console.log(formDatas.practices.practice_anim);
          console.log(practice, index);
          console.log(formDatas.practices.practice_anim[index]);
          setFormDatas({
            ...formDatas,
            practices: {
              ...formDatas.practices,
              practice_anim: formDatas.practices.practice_anim.map(
                (element, i) =>
                  index === i
                    ? {
                        ...element,
                        [event.target.name.split(".")[0]]: {
                          ...formDatas.practices.practice_anim[index][
                            event.target.name.split(".")[0]
                          ],
                          [event.target.name.split(".")[1]]:
                            event.target.checked,
                          portion_of_them: false,
                        },
                      }
                    : element
              ),
            },
          });

          console.log(formDatas.practices);
        }
      });
    }
  };
  return (
    <div id="bloc_soil_testing">
      {formDatas.farm_type.animals &&
        (formDatas.farm_type_animals.dairy_cattle ||
          formDatas.farm_type_animals.beef_cattle ||
          formDatas.farm_type_animals.sheeps) && (
          <>
            <label>
              For your animal(s), have you implemented practice(s) to reduce
              enteric methane emissions?
            </label>
            {formDatas.practices.practice_anim.map((practice, index) => (
              <div>
                <input
                  type="checkbox"
                  name={"practice_anim"}
                  value={index}
                  checked={practice.selected}
                  onChange={(event) => handleChangeCheckbox({ event: event })}
                />
                {practice.value}
              </div>
            ))}
            {(formDatas.practices.practice_anim[0].selected ||
              formDatas.practices.practice_anim[1].selected ||
              formDatas.practices.practice_anim[2].selected) && (
              <>
                <label>
                  For each practice, select the animal(s) concerned :
                </label>
                <table>
                  <tbody>
                    <tr>
                      <td></td>
                      {formDatas.practices.practice_anim[0].selected && (
                        <td>{formDatas.practices.practice_anim[0].value}</td>
                      )}
                      {formDatas.practices.practice_anim[1].selected && (
                        <td>{formDatas.practices.practice_anim[1].value}</td>
                      )}
                      {formDatas.practices.practice_anim[2].selected && (
                        <td>{formDatas.practices.practice_anim[2].value}</td>
                      )}
                    </tr>
                    {formDatas.farm_type_animals.dairy_cattle && (
                      <tr>
                        {(formDatas.practices.practice_anim[0].selected ||
                          formDatas.practices.practice_anim[1].selected ||
                          formDatas.practices.practice_anim[2].selected) && (
                          <td>Dairy cow</td>
                        )}
                        {formDatas.practices.practice_anim[0].selected && (
                          <td>
                            <input
                              type="checkbox"
                              name={"practice_anim.dairy_cow"}
                              value={0}
                              checked={
                                formDatas.practices.practice_anim[0].dairy_cow
                                  .selected
                              }
                              onChange={(event) =>
                                handleChangeCheckbox({
                                  event: event,
                                  practice: true,
                                })
                              }
                            />
                          </td>
                        )}
                        {formDatas.practices.practice_anim[1].selected && (
                          <td>
                            <input
                              type="checkbox"
                              name={"practice_anim.dairy_cow"}
                              value={1}
                              checked={
                                formDatas.practices.practice_anim[1].dairy_cow
                                  .selected
                              }
                              onChange={(event) =>
                                handleChangeCheckbox({
                                  event: event,
                                  practice: true,
                                })
                              }
                            />
                          </td>
                        )}
                        {formDatas.practices.practice_anim[2].selected && (
                          <td>
                            <input
                              type="checkbox"
                              name={"practice_anim.dairy_cow"}
                              value={2}
                              checked={
                                formDatas.practices.practice_anim[2].dairy_cow
                                  .selected
                              }
                              onChange={(event) =>
                                handleChangeCheckbox({
                                  event: event,
                                  practice: true,
                                })
                              }
                            />
                          </td>
                        )}
                      </tr>
                    )}
                    {formDatas.farm_type_animals.beef_cattle && (
                      <tr>
                        <td>Beef cattle</td>
                        <td>
                          <input
                            type="checkbox"
                            name={"practice_anim.beef_cattle"}
                            value={0}
                            checked={
                              formDatas.practices.practice_anim[0].beef_cattle
                                .selected
                            }
                            onChange={(event) =>
                              handleChangeCheckbox({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name={"practice_anim.beef_cattle"}
                            value={1}
                            checked={
                              formDatas.practices.practice_anim[1].beef_cattle
                                .selected
                            }
                            onChange={(event) =>
                              handleChangeCheckbox({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name={"practice_anim.beef_cattle"}
                            value={2}
                            checked={
                              formDatas.practices.practice_anim[2].beef_cattle
                                .selected
                            }
                            onChange={(event) =>
                              handleChangeCheckbox({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                      </tr>
                    )}
                    {formDatas.farm_type_animals.sheeps && (
                      <tr>
                        <td>Sheeps</td>
                        <td>
                          <input
                            type="checkbox"
                            name={"practice_anim.sheeps"}
                            value={0}
                            checked={
                              formDatas.practices.practice_anim[0].sheeps
                                .selected
                            }
                            onChange={(event) =>
                              handleChangeCheckbox({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name={"practice_anim.sheeps"}
                            value={1}
                            checked={
                              formDatas.practices.practice_anim[1].sheeps
                                .selected
                            }
                            onChange={(event) =>
                              handleChangeCheckbox({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name={"practice_anim.sheeps"}
                            value={2}
                            checked={
                              formDatas.practices.practice_anim[2].sheeps
                                .selected
                            }
                            onChange={(event) =>
                              handleChangeCheckbox({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
            {(formDatas.practices.practice_anim[0].selected ||
              formDatas.practices.practice_anim[1].selected ||
              formDatas.practices.practice_anim[2].selected) && (
              <>
                <label>Did you implement this/these practice(s) for: </label>
                <table>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>A portion of them</td>
                      <td>All of them</td>
                    </tr>
                    {formDatas.farm_type_animals.dairy_cattle && (
                      <tr>
                        <td>Dairy cows</td>
                        <td>
                          <input
                            type="radio"
                            name={"dairy_cow.portion_of_them"}
                            checked={
                              formDatas.practices.practice_anim[0].dairy_cow
                                .portion_of_them
                            }
                            onChange={(event) =>
                              handleChangeRadio({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="radio"
                            name={"dairy_cow.all_of_them"}
                            checked={
                              formDatas.practices.practice_anim[1].dairy_cow
                                .all_of_them
                            }
                            onChange={(event) =>
                              handleChangeRadio({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                      </tr>
                    )}
                    {formDatas.farm_type_animals.beef_cattle && (
                      <tr>
                        <td>Beef cattle</td>
                        <td>
                          <input
                            type="radio"
                            name={"beef_cattle.portion_of_them"}
                            checked={
                              formDatas.practices.practice_anim[0].beef_cattle
                                .portion_of_them
                            }
                            onChange={(event) =>
                              handleChangeRadio({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="radio"
                            name={"beef_cattle.all_of_them"}
                            checked={
                              formDatas.practices.practice_anim[1].beef_cattle
                                .all_of_them
                            }
                            onChange={(event) =>
                              handleChangeRadio({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                      </tr>
                    )}
                    {formDatas.farm_type_animals.sheeps && (
                      <tr>
                        <td>Sheeps</td>
                        <td>
                          <input
                            type="radio"
                            name={"sheeps.portion_of_them"}
                            checked={
                              formDatas.practices.practice_anim[0].sheeps
                                .portion_of_them
                            }
                            onChange={(event) =>
                              handleChangeRadio({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="radio"
                            name={"sheeps.all_of_them"}
                            checked={
                              formDatas.practices.practice_anim[1].sheeps
                                .all_of_them
                            }
                            onChange={(event) =>
                              handleChangeRadio({
                                event: event,
                                practice: true,
                              })
                            }
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
            {(formDatas.practices.practice_anim[0].selected ||
              formDatas.practices.practice_anim[1].selected ||
              formDatas.practices.practice_anim[2].selected) && <>TEST</>}
          </>
        )}
    </div>
  );
}

export default BlocPractices;
