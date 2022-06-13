import React from "react";
import { Slider } from "@mui/material";
function BlocPractices({ formDatas, setFormDatas }) {
  const handleChangeCheckbox = ({ event, practice, practiceNumber }) => {
    if (practice && !practiceNumber) {
      if (
        event.target.name.split(".")[0] === "croplands" ||
        event.target.name.split(".")[0] === "grasslands" ||
        event.target.name.split(".")[0] === "organic_soils" ||
        event.target.name.split(".")[0] === ""
      ) {
        console.log(
          formDatas["practices"].practice_plant.find(
            (practice, index) => practice.selected && index < 5
          )
        );
        if (
          event.target.name.split(".")[0] === "croplands" &&
          !formDatas["practices"].practice_plant.filter(
            (practice, index) => practice.selected && index < 5
          )
        ) {
          setFormDatas({
            ...formDatas,
            practices: {
              ...formDatas["practices"],
              practice_plant: formDatas.practices.practice_plant.map(
                (plant, index) =>
                  Number(index) === Number(event.target.value)
                    ? { ...plant, selected: event.target.checked }
                    : plant
              ),
              croplands: {
                ...formDatas.practices.croplands,
                selected: event.target.checked,
              },
            },
          });
        } else if (
          event.target.name.split(".")[0] === "croplands" &&
          formDatas["practices"].practice_plant.filter(
            (practice, index) => practice.selected && index < 5
          ).length > 1
        ) {
          setFormDatas({
            ...formDatas,
            practices: {
              ...formDatas["practices"],
              practice_plant: formDatas.practices.practice_plant.map(
                (plant, index) =>
                  Number(index) === Number(event.target.value)
                    ? { ...plant, selected: event.target.checked }
                    : plant
              ),
            },
          });
        } else {
          if (11 === Number(event.target.value)) {
            console.log("je suis ici là");
            formDatas.practices.practice_plant.map((element) =>
              console.log(element)
            );
            setFormDatas({
              ...formDatas,
              practices: {
                ...formDatas["practices"],
                practice_plant: formDatas.practices.practice_plant.map(
                  (practice, index) =>
                    practice.value === "none"
                      ? {
                          ...practice,
                          selected: true,
                        }
                      : { ...practice, selected: false }
                ),
                croplands: {
                  ...formDatas.practices.croplands,
                  selected: false,
                },
                grasslands: {
                  ...formDatas.practices.grasslands,
                  selected: false,
                },
                organic_soils: {
                  ...formDatas.practices.organic_soils,
                  selected: false,
                },
              },
            });
          } else {
            setFormDatas({
              ...formDatas,
              practices: {
                ...formDatas["practices"],
                practice_plant: formDatas.practices.practice_plant.map(
                  (plant, index) =>
                    Number(index) === Number(event.target.value)
                      ? { ...plant, selected: event.target.checked }
                      : Number(index) === 11
                      ? { ...plant, selected: false }
                      : plant
                ),
                [event.target.name.split(".")[0]]: {
                  ...formDatas["practices"][event.target.name.split(".")[0]],
                  selected: event.target.checked,
                },
              },
            });
          }
        }
      } else {
        if (11 === Number(event.target.value)) {
          console.log("je suis ici");
          setFormDatas({
            ...formDatas,
            practices: {
              ...formDatas["practices"],
              [event.target.name.split(".")[0]]:
                formDatas.practices.practice_plant.map((practice, index) =>
                  practice.value === "none"
                    ? {
                        ...practice,
                        selected: true,
                      }
                    : { ...practice, selected: false }
                ),
            },
          });
        } else {
          if (practiceNumber) {
            if (
              Number(practiceNumber) === 0 ||
              Number(practiceNumber) === 1 ||
              Number(practiceNumber) === 2 ||
              Number(practiceNumber) === 3 ||
              Number(practiceNumber) === 4 ||
              Number(practiceNumber) === 5
            ) {
              setFormDatas({
                ...formDatas,
                practices: {
                  ...formDatas.practices,
                  croplands: {
                    ...formDatas["croplands"],
                    selected: event.target.checked,
                  },
                },
              });
            } else if (practiceNumber === 6) {
              setFormDatas({
                ...formDatas,
                practices: {
                  ...formDatas.practices,
                  grasslands: {
                    ...formDatas["grasslands"],
                    selected: event.target.checked,
                  },
                },
              });
            } else if (practiceNumber === 7) {
              setFormDatas({
                ...formDatas,
                organic_soils: {
                  ...formDatas["organic_soils"],
                  selected: event.target.checked,
                },
              });
            }
          } else {
            setFormDatas({
              ...formDatas,
              practices: {
                ...formDatas["practices"],
                [event.target.name.split(".")[0]]:
                  event.target.name.split(".")[0] === "practice_anim"
                    ? formDatas.practices.practice_anim.map((practice, index) =>
                        index === Number(event.target.value)
                          ? {
                              ...practice,
                              [event.target.name.split(".")[1]]: {
                                ...practice[event.target.name.split(".")[1]],
                                selected: event.target.checked,
                              },
                            }
                          : practice
                      )
                    : !event.target.name.split(".")[1]
                    ? formDatas.practices.practice_plant.map(
                        (practice, index) =>
                          practice.value === "none"
                            ? {
                                ...practice,
                                selected: false,
                              }
                            : index === Number(event.target.value)
                            ? {
                                ...practice,
                                selected: event.target.checked,
                              }
                            : practice
                      )
                    : formDatas.practices.practice_plant.map(
                        (practice, index) =>
                          index === Number(event.target.value)
                            ? {
                                ...practice,
                                [event.target.name.split(".")[1]]: {
                                  ...practice[event.target.name.split(".")[1]],
                                  selected: event.target.checked,
                                },
                              }
                            : practice
                      ),
              },
            });
          }
        }
        console.log(formDatas.practices);
      }
    } else if (practiceNumber) {
      console.log(practiceNumber);
      if (practiceNumber) {
        if (
          practiceNumber === 0 ||
          practiceNumber === 1 ||
          practiceNumber === 2 ||
          practiceNumber === 3 ||
          practiceNumber === 4 ||
          practiceNumber === 5
        ) {
          setFormDatas({
            ...formDatas,
            practices: {
              ...formDatas.practices,
              croplands: {
                ...formDatas["croplands"],
                selected: true,
              },
            },
          });
        } else if (practiceNumber === 6) {
          setFormDatas({
            ...formDatas,
            practices: {
              ...formDatas.practices,
              grasslands: {
                ...formDatas["grasslands"],
                selected: event.target.checked,
              },
            },
          });
        } else if (practiceNumber === 7) {
          setFormDatas({
            ...formDatas,
            practices: {
              ...formDatas.practices,
              organic_soils: {
                ...formDatas["organic_soils"],
                selected: event.target.checked,
              },
            },
          });
        }
      }
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
  const handleChangeRadio = ({
    event,
    practice,
    cropsIndex,
    practiceNumber,
  }) => {
    if (practice) {
      if (practiceNumber) {
        console.log(
          practiceNumber,
          event.target.name.split(".")[0],
          event.target.name.split(".")[1],
          event.target.value
        );
        console.log(formDatas.practices[event.target.name.split(".")[0]]);
        event.target.name.split(".")[1] === "portion_of_them"
          ? setFormDatas({
              ...formDatas,
              practices: {
                ...formDatas.practices,
                [event.target.name.split(".")[0]]: {
                  ...formDatas.practices[event.target.name.split(".")[0]],
                  [event.target.name.split(".")[1]]: event.target.checked,
                  all_of_them: false,
                },
              },
            })
          : setFormDatas({
              ...formDatas,
              practices: {
                ...formDatas.practices,
                [event.target.name.split(".")[0]]: {
                  ...formDatas.practices[event.target.name.split(".")[0]],
                  [event.target.name.split(".")[1]]: event.target.checked,
                  portion_of_them: false,
                },
              },
            });
      } else {
        console.log("je suis ici", practice.selected);
        if (cropsIndex && cropsIndex.length > 0) {
          setFormDatas({
            ...formDatas,
            practices: {
              ...formDatas.practices,
              practice_plant: formDatas.practices.practice_plant.map(
                (practice, index) =>
                  cropsIndex.find(
                    (element) => Number(element) === Number(index)
                  )
                    ? event.target.name.split(".")[1] === "portion_of_them"
                      ? {
                          ...practice,
                          [event.target.name.split(".")[0]]: {
                            ...practice[event.target.name.split(".")[0]],
                            portion_of_them: true,
                            all_of_them: false,
                          },
                        }
                      : {
                          ...practice,
                          [event.target.name.split(".")[0]]: {
                            ...practice[event.target.name.split(".")[0]],
                            portion_of_them: false,
                            all_of_them: true,
                          },
                        }
                    : practice
              ),
            },
          });
        } else {
          formDatas.practices.practice_anim.map((practice, index) => {
            if (practice.selected) {
              setFormDatas({
                ...formDatas,
                practices: {
                  ...formDatas.practices,
                  practice_anim: formDatas.practices.practice_anim.map(
                    (practice, index) =>
                      practice.selected
                        ? event.target.name.split(".")[1] === "portion_of_them"
                          ? {
                              ...practice,
                              [event.target.name.split(".")[0]]: {
                                ...practice[event.target.name.split(".")[0]],
                                portion_of_them: true,
                                all_of_them: false,
                              },
                            }
                          : {
                              ...practice,
                              [event.target.name.split(".")[0]]: {
                                ...practice[event.target.name.split(".")[0]],
                                portion_of_them: false,
                                all_of_them: true,
                              },
                            }
                        : practice
                  ),
                },
              });
            }
          });
        }
      }
    }
  };
  const handleChangeSelect = ({ event, other_plant }) => {
    if (other_plant) {
      console.log(event.target.name, event.target.value);
      setFormDatas({
        ...formDatas,
        practices: {
          ...formDatas.practices,
          [event.target.name]: {
            ...formDatas.practices[event.target.name],
            unit: formDatas.practices[event.target.name].unit.map((unit) =>
              unit.value === event.target.value.toString()
                ? { ...unit, selected: true }
                : { ...unit, selected: false }
            ),
          },
        },
      });
    }
  };
  const handleChangeNumber = ({
    event,
    practice,
    practiceNumber,
    other_plant,
  }) => {
    if (other_plant) {
      console.log(event.target.name);
      setFormDatas({
        ...formDatas,
        practices: {
          ...formDatas.practices,
          [event.target.name]: {
            ...formDatas.practices[event.target.name],
            size: event.target.value,
          },
        },
      });
    } else if (practice) {
      if (practiceNumber) {
        setFormDatas({
          ...formDatas,
          practices: {
            ...formDatas.practices,
            [event.target.name.split(".")[0]]: {
              ...formDatas.practices[event.target.name.split(".")[0]],
              portion_numb: Number(event.target.value),
            },
          },
        });
        console.log(
          formDatas.practices[event.target.name.split(".")[0]].portion_numb
        );
      } else {
        formDatas.practices.practice_anim.map((practice, index) => {
          if (practice.selected) {
            console.log(formDatas.practices.practice_anim);
            console.log(practice, index);
            console.log(formDatas.practices.practice_anim[index]);
            console.log(
              event.target.name.split(".")[0],
              event.target.name.split(".")[1]
            );
            setFormDatas({
              ...formDatas,
              practices: {
                ...formDatas.practices,
                practice_anim: formDatas.practices.practice_anim.map(
                  (practice, index) =>
                    practice.selected
                      ? {
                          ...practice,
                          [event.target.name.split(".")[0]]: {
                            ...practice[event.target.name.split(".")[0]],
                            [event.target.name.split(".")[1]]: Number(
                              event.target.value
                            ),
                          },
                        }
                      : practice
                ),
              },
            });

            console.log(formDatas.practices);
          }
        });
      }
    }
  };
  return (
    <div id="bloc_practices">
      <div id="bloc_practices_animals">
        {(formDatas.farm_type.animals || formDatas.farm_type.both) &&
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
                          {formDatas.practices.practice_anim[0].selected && (
                            <td>
                              <input
                                type="checkbox"
                                name={"practice_anim.beef_cattle"}
                                value={0}
                                checked={
                                  formDatas.practices.practice_anim[0]
                                    .beef_cattle.selected
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
                                name={"practice_anim.beef_cattle"}
                                value={1}
                                checked={
                                  formDatas.practices.practice_anim[1]
                                    .beef_cattle.selected
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
                                name={"practice_anim.beef_cattle"}
                                value={2}
                                checked={
                                  formDatas.practices.practice_anim[2]
                                    .beef_cattle.selected
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
                      {formDatas.farm_type_animals.sheeps && (
                        <tr>
                          <td>Sheeps</td>
                          {formDatas.practices.practice_anim[0].selected && (
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
                          )}
                          {formDatas.practices.practice_anim[1].selected && (
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
                          )}
                          {formDatas.practices.practice_anim[2].selected && (
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
                          )}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              )}
              {(formDatas.practices.practice_anim[0].selected ||
                formDatas.practices.practice_anim[1].selected ||
                formDatas.practices.practice_anim[2].selected) &&
                formDatas.practices.practice_anim.find((animal) =>
                  animal["sheeps"]
                    ? animal["dairy_cow"].selected ||
                      animal["beef_cattle"].selected ||
                      animal["sheeps"].selected
                    : false
                ) && (
                  <>
                    <label>
                      Did you implement this/these practice(s) for:{" "}
                    </label>
                    <table>
                      <tbody>
                        <tr>
                          <td></td>
                          <td>A portion of them</td>
                          <td>All of them</td>
                        </tr>
                        {formDatas.farm_type_animals.dairy_cattle &&
                          formDatas.practices.practice_anim.find((animal) =>
                            animal["dairy_cow"]
                              ? animal["dairy_cow"].selected
                              : false
                          ) && (
                            <>
                              <tr>
                                <td>Dairy cows</td>
                                <td>
                                  <input
                                    type="radio"
                                    name={"dairy_cow.portion_of_them"}
                                    checked={
                                      formDatas.practices.practice_anim[0]
                                        .dairy_cow.portion_of_them
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
                                      formDatas.practices.practice_anim[0]
                                        .dairy_cow.all_of_them
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
                              {formDatas.practices.practice_anim.find(
                                (animal) =>
                                  animal["dairy_cow"]
                                    ? animal["dairy_cow"].portion_of_them
                                    : false
                              ) && (
                                <tr>
                                  <td>
                                    <label>% of them :</label>
                                  </td>
                                  <td>
                                    <Slider
                                      onChange={(event) =>
                                        handleChangeNumber({
                                          event: event,
                                          practice: true,
                                        })
                                      }
                                      aria-label="Temperature"
                                      name={"dairy_cow.portion_numb"}
                                      defaultValue={
                                        formDatas.practices.practice_anim.find(
                                          (animal) =>
                                            animal["dairy_cow"]
                                              ? animal["dairy_cow"]
                                                  .portion_of_them
                                              : false
                                        ).portion_numb
                                      }
                                      getAriaValueText={
                                        formDatas.practices.practice_anim.find(
                                          (animal) =>
                                            animal["dairy_cow"]
                                              ? animal["dairy_cow"]
                                                  .portion_of_them
                                              : false
                                        ).portion_numb
                                      }
                                      valueLabelDisplay="auto"
                                      step={10}
                                      marks
                                      min={0}
                                      max={100}
                                    />
                                  </td>
                                </tr>
                              )}
                            </>
                          )}
                        {formDatas.farm_type_animals.beef_cattle &&
                          formDatas.practices.practice_anim.find((animal) =>
                            animal["beef_cattle"]
                              ? animal["beef_cattle"].selected
                              : false
                          ) && (
                            <>
                              <tr>
                                <td>Beef cattle</td>
                                <td>
                                  <input
                                    type="radio"
                                    name={"beef_cattle.portion_of_them"}
                                    checked={
                                      formDatas.practices.practice_anim[0]
                                        .beef_cattle.portion_of_them
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
                                      formDatas.practices.practice_anim[0]
                                        .beef_cattle.all_of_them
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
                              {formDatas.practices.practice_anim.find(
                                (animal) =>
                                  animal["beef_cattle"]
                                    ? animal["beef_cattle"].portion_of_them
                                    : false
                              ) && (
                                <tr>
                                  <td>
                                    <label>% of them :</label>
                                  </td>
                                  <td>
                                    <Slider
                                      onChange={(event) =>
                                        handleChangeNumber({
                                          event: event,
                                          practice: true,
                                        })
                                      }
                                      aria-label="Temperature"
                                      name={"beef_cattle.portion_numb"}
                                      defaultValue={
                                        formDatas.practices.practice_anim.find(
                                          (animal) =>
                                            animal["beef_cattle"]
                                              ? animal["beef_cattle"]
                                                  .portion_of_them
                                              : false
                                        ).portion_numb
                                      }
                                      getAriaValueText={
                                        formDatas.practices.practice_anim.find(
                                          (animal) =>
                                            animal["beef_cattle"]
                                              ? animal["beef_cattle"]
                                                  .portion_of_them
                                              : false
                                        ).portion_numb
                                      }
                                      valueLabelDisplay="auto"
                                      step={10}
                                      marks
                                      min={0}
                                      max={100}
                                    />
                                  </td>
                                </tr>
                              )}
                            </>
                          )}
                        {formDatas.farm_type_animals.sheeps &&
                          formDatas.practices.practice_anim.find((animal) =>
                            animal["sheeps"] ? animal["sheeps"].selected : false
                          ) && (
                            <>
                              <tr>
                                <td>Sheeps</td>
                                <td>
                                  <input
                                    type="radio"
                                    name={"sheeps.portion_of_them"}
                                    checked={
                                      formDatas.practices.practice_anim[0]
                                        .sheeps.portion_of_them
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
                                      formDatas.practices.practice_anim[0]
                                        .sheeps.all_of_them
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
                              {formDatas.practices.practice_anim.find(
                                (animal) =>
                                  animal["sheeps"]
                                    ? animal["sheeps"].portion_of_them
                                    : false
                              ) && (
                                <tr>
                                  <td>
                                    <label>% of them :</label>
                                  </td>
                                  <td>
                                    <Slider
                                      onChange={(event) =>
                                        handleChangeNumber({
                                          event: event,
                                          practice: true,
                                        })
                                      }
                                      aria-label="Temperature"
                                      name={"sheeps.portion_numb"}
                                      defaultValue={
                                        formDatas.practices.practice_anim.find(
                                          (animal) =>
                                            animal["sheeps"]
                                              ? animal["sheeps"].portion_of_them
                                              : false
                                        ).portion_numb
                                      }
                                      getAriaValueText={
                                        formDatas.practices.practice_anim.find(
                                          (animal) =>
                                            animal["sheeps"]
                                              ? animal["sheeps"].portion_of_them
                                              : false
                                        ).portion_numb
                                      }
                                      valueLabelDisplay="auto"
                                      step={10}
                                      marks
                                      min={0}
                                      max={100}
                                    />
                                  </td>
                                </tr>
                              )}
                            </>
                          )}
                      </tbody>
                    </table>
                  </>
                )}
            </>
          )}
      </div>
      <div id="bloc_practices_plant">
        {(formDatas.farm_type.crops || formDatas.farm_type.both) && (
          <>
            <label>
              For your crop(s), have you implemented practice(s) to reduce
              emissions & increase sequestration?
            </label>
            {formDatas.practices.practice_plant.map((practice, index) => (
              <div>
                <input
                  type="checkbox"
                  name={
                    index === 6
                      ? "grasslands"
                      : index === 7
                      ? "organic_soils"
                      : index === 10 ||
                        index === 9 ||
                        index === 8 ||
                        index === 11
                      ? ""
                      : "croplands"
                  }
                  value={index}
                  checked={practice.selected}
                  onChange={(event) =>
                    handleChangeCheckbox({
                      event: event,
                      practice: true,
                    })
                  }
                />
                {practice.value}
              </div>
            ))}

            {(formDatas.practices["croplands"].selected ||
              formDatas.practices["grasslands"].selected ||
              formDatas.practices["organic_soils"].selected) && (
              <>
                <label>Did you implement this/these practice(s) for: </label>
                <table>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>A portion of them</td>
                      <td>All of them</td>
                    </tr>
                    {formDatas.practices.croplands.selected && (
                      <>
                        <tr>
                          <td>Croplands</td>
                          <td>
                            <input
                              type="radio"
                              name={"croplands.portion_of_them"}
                              checked={
                                formDatas.practices["croplands"].portion_of_them
                              }
                              onChange={(event) =>
                                handleChangeRadio({
                                  event: event,
                                  practice: true,
                                  cropsIndex: [0, 1, 2, 3, 4, 5],
                                  practiceNumber: true,
                                })
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name={"croplands.all_of_them"}
                              checked={
                                formDatas.practices["croplands"].all_of_them
                              }
                              onChange={(event) =>
                                handleChangeRadio({
                                  event: event,
                                  practice: true,
                                  cropsIndex: [0, 1, 2, 3, 4, 5],
                                  practiceNumber: true,
                                })
                              }
                            />
                          </td>
                        </tr>
                        {formDatas.practices["croplands"].portion_of_them && (
                          <tr>
                            <td>
                              <label>% of them :</label>
                            </td>
                            <td>
                              {console.log(
                                formDatas.practices["croplands"].portion_numb
                              )}
                              <Slider
                                onChange={(event) =>
                                  handleChangeNumber({
                                    event: event,
                                    practice: true,
                                    practiceNumber: true,
                                  })
                                }
                                value={
                                  formDatas.practices["croplands"].portion_numb
                                }
                                aria-label="Temperature"
                                name={"croplands.portion_numb"}
                                defaultValue={
                                  formDatas.practices.croplands.portion_numb
                                }
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={0}
                                max={100}
                              />
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                    {formDatas.practices.grasslands.selected && (
                      <>
                        <tr>
                          <td>Grasslands</td>
                          <td>
                            <input
                              type="radio"
                              name={"grasslands.portion_of_them"}
                              checked={
                                formDatas.practices["grasslands"]
                                  .portion_of_them
                              }
                              onChange={(event) =>
                                handleChangeRadio({
                                  event: event,
                                  practice: true,
                                  cropsIndex: [0, 1, 2, 3, 4, 5],
                                  practiceNumber: true,
                                })
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name={"grasslands.all_of_them"}
                              checked={
                                formDatas.practices["grasslands"].all_of_them
                              }
                              onChange={(event) =>
                                handleChangeRadio({
                                  event: event,
                                  practice: true,
                                  cropsIndex: [0, 1, 2, 3, 4, 5],
                                  practiceNumber: true,
                                })
                              }
                            />
                          </td>
                        </tr>
                        {formDatas.practices["grasslands"].portion_of_them && (
                          <tr>
                            <td>
                              <label>% of them :</label>
                            </td>
                            <td>
                              <Slider
                                onChange={(event) =>
                                  handleChangeNumber({
                                    event: event,
                                    practice: true,
                                    practiceNumber: true,
                                  })
                                }
                                value={
                                  formDatas.practices["grasslands"].portion_numb
                                }
                                aria-label="Temperature"
                                name={"grasslands.portion_numb"}
                                defaultValue={
                                  formDatas.practices["grasslands"].portion_numb
                                }
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={0}
                                max={100}
                              />
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                    {formDatas.practices.organic_soils.selected && (
                      <>
                        <tr>
                          <td>Organic soils</td>
                          <td>
                            <input
                              type="radio"
                              name={"organic_soils.portion_of_them"}
                              checked={
                                formDatas.practices["organic_soils"]
                                  .portion_of_them
                              }
                              onChange={(event) =>
                                handleChangeRadio({
                                  event: event,
                                  practice: true,
                                  cropsIndex: [0, 1, 2, 3, 4, 5],
                                  practiceNumber: true,
                                })
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name={"organic_soils.all_of_them"}
                              checked={
                                formDatas.practices["organic_soils"].all_of_them
                              }
                              onChange={(event) =>
                                handleChangeRadio({
                                  event: event,
                                  practice: true,
                                  cropsIndex: [0, 1, 2, 3, 4, 5],
                                  practiceNumber: true,
                                })
                              }
                            />
                          </td>
                        </tr>
                        {formDatas.practices["organic_soils"]
                          .portion_of_them && (
                          <tr>
                            <td>
                              <label>% of them :</label>
                            </td>
                            <td>
                              <Slider
                                onChange={(event) =>
                                  handleChangeNumber({
                                    event: event,
                                    practice: true,
                                    practiceNumber: true,
                                  })
                                }
                                aria-label="Temperature"
                                name={"organic_soils.portion_numb"}
                                defaultValue={
                                  formDatas.practices["organic_soils"]
                                    .portion_numb
                                }
                                value={
                                  formDatas.practices["organic_soils"]
                                    .portion_numb
                                }
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={0}
                                max={100}
                              />
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </>
            )}
            {formDatas.practices.practice_plant[8].selected && (
              <>
                What is the size of the degraded lands on which you practice
                restoration?
                <input
                  type="number"
                  name="degraded_lands"
                  value={formDatas.practices.degraded_lands.size}
                  onChange={(event) =>
                    handleChangeNumber({ event: event, other_plant: true })
                  }
                />
                <select
                  name={"degraded_lands"}
                  id={"degraded_lands_unit"}
                  onChange={(event) =>
                    handleChangeSelect({ event: event, other_plant: true })
                  }
                >
                  {formDatas.practices["degraded_lands"].unit.map((unit) => (
                    <option
                      value={unit.value}
                      selected={unit.selected}
                      key={unit.value}
                    >
                      {unit.value}
                    </option>
                  ))}
                </select>
              </>
            )}
            {formDatas.practices.practice_plant[9].selected && (
              <>
                What is the size of the lands where the soils are under
                bio-energy?
                <input
                  type="number"
                  name="bionrj"
                  value={formDatas.practices.bionrj.size}
                  onChange={(event) =>
                    handleChangeNumber({ event: event, other_plant: true })
                  }
                />
                <select
                  name={"bionrj"}
                  id={"bionrj_unit"}
                  onChange={(event) =>
                    handleChangeSelect({ event: event, other_plant: true })
                  }
                >
                  {formDatas.practices["bionrj"].unit.map((unit) => (
                    <option
                      value={unit.value}
                      selected={unit.selected}
                      key={unit.value}
                    >
                      {unit.value}
                    </option>
                  ))}
                </select>
              </>
            )}
            {formDatas.practices.practice_plant[10].selected && (
              <>
                What is the size of the lands on which you apply
                manure/biosolids?
                <input
                  type="number"
                  name="manure"
                  value={formDatas.practices.manure.size}
                  onChange={(event) =>
                    handleChangeNumber({ event: event, other_plant: true })
                  }
                />
                <select
                  name={"manure"}
                  id={"manure_unit"}
                  onChange={(event) =>
                    handleChangeSelect({ event: event, other_plant: true })
                  }
                >
                  {formDatas.practices["manure"].unit.map((unit) => (
                    <option
                      value={unit.value}
                      selected={unit.selected}
                      key={unit.value}
                    >
                      {unit.value}
                    </option>
                  ))}
                </select>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BlocPractices;
