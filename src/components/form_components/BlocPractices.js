import React from "react";
import { Slider } from "@mui/material";
import { handleChange } from "../../utils/form_functions";
function BlocPractices({ datasForm, setDatasForm }) {
  const handleChangeCheckbox = ({ event, practice, practiceNumber }) => {
    if (practice && !practiceNumber) {
      if (
        event.target.name.split(".")[0] === "croplands" ||
        event.target.name.split(".")[0] === "grasslands" ||
        event.target.name.split(".")[0] === "organic_soils" ||
        event.target.name.split(".")[0] === ""
      ) {
        console.log(
          datasForm["practices"].practice_plant.find(
            (practice, index) => practice.selected && index < 5
          )
        );
        if (
          event.target.name.split(".")[0] === "croplands" &&
          !datasForm["practices"].practice_plant.filter(
            (practice, index) => practice.selected && index < 5
          )
        ) {
          setDatasForm({
            ...datasForm,
            practices: {
              ...datasForm["practices"],
              practice_plant: datasForm.practices.practice_plant.map(
                (plant, index) =>
                  Number(index) === Number(event.target.value)
                    ? { ...plant, selected: event.target.checked }
                    : plant
              ),
              croplands: {
                ...datasForm.practices.croplands,
                selected: event.target.checked,
              },
            },
          });
        } else if (
          event.target.name.split(".")[0] === "croplands" &&
          datasForm["practices"].practice_plant.filter(
            (practice, index) => practice.selected && index < 5
          ).length > 1
        ) {
          setDatasForm({
            ...datasForm,
            practices: {
              ...datasForm["practices"],
              practice_plant: datasForm.practices.practice_plant.map(
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
            datasForm.practices.practice_plant.map((element) =>
              console.log(element)
            );
            setDatasForm({
              ...datasForm,
              practices: {
                ...datasForm["practices"],
                practice_plant: datasForm.practices.practice_plant.map(
                  (practice, index) =>
                    practice.value === "none"
                      ? {
                          ...practice,
                          selected: true,
                        }
                      : { ...practice, selected: false }
                ),
                croplands: {
                  ...datasForm.practices.croplands,
                  selected: false,
                },
                grasslands: {
                  ...datasForm.practices.grasslands,
                  selected: false,
                },
                organic_soils: {
                  ...datasForm.practices.organic_soils,
                  selected: false,
                },
              },
            });
          } else {
            setDatasForm({
              ...datasForm,
              practices: {
                ...datasForm["practices"],
                practice_plant: datasForm.practices.practice_plant.map(
                  (plant, index) =>
                    Number(index) === Number(event.target.value)
                      ? { ...plant, selected: event.target.checked }
                      : Number(index) === 11
                      ? { ...plant, selected: false }
                      : plant
                ),
                [event.target.name.split(".")[0]]: {
                  ...datasForm["practices"][event.target.name.split(".")[0]],
                  selected: event.target.checked,
                },
              },
            });
          }
        }
      } else {
        if (11 === Number(event.target.value)) {
          console.log("je suis ici");
          setDatasForm({
            ...datasForm,
            practices: {
              ...datasForm["practices"],
              [event.target.name.split(".")[0]]:
                datasForm.practices.practice_plant.map((practice, index) =>
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
              setDatasForm({
                ...datasForm,
                practices: {
                  ...datasForm.practices,
                  croplands: {
                    ...datasForm["croplands"],
                    selected: event.target.checked,
                  },
                },
              });
            } else if (practiceNumber === 6) {
              setDatasForm({
                ...datasForm,
                practices: {
                  ...datasForm.practices,
                  grasslands: {
                    ...datasForm["grasslands"],
                    selected: event.target.checked,
                  },
                },
              });
            } else if (practiceNumber === 7) {
              setDatasForm({
                ...datasForm,
                organic_soils: {
                  ...datasForm["organic_soils"],
                  selected: event.target.checked,
                },
              });
            }
          } else {
            setDatasForm({
              ...datasForm,
              practices: {
                ...datasForm["practices"],
                [event.target.name.split(".")[0]]:
                  event.target.name.split(".")[0] === "practice_anim"
                    ? datasForm.practices.practice_anim.map((practice, index) =>
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
                    ? datasForm.practices.practice_plant.map(
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
                    : datasForm.practices.practice_plant.map(
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
        console.log(datasForm.practices);
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
          setDatasForm({
            ...datasForm,
            practices: {
              ...datasForm.practices,
              croplands: {
                ...datasForm["croplands"],
                selected: true,
              },
            },
          });
        } else if (practiceNumber === 6) {
          setDatasForm({
            ...datasForm,
            practices: {
              ...datasForm.practices,
              grasslands: {
                ...datasForm["grasslands"],
                selected: event.target.checked,
              },
            },
          });
        } else if (practiceNumber === 7) {
          setDatasForm({
            ...datasForm,
            practices: {
              ...datasForm.practices,
              organic_soils: {
                ...datasForm["organic_soils"],
                selected: event.target.checked,
              },
            },
          });
        }
      }
    } else {
      //   console.log(datasForm.practices.practice_anim[event.target.value]);
      if (event.target.value === "3") {
        setDatasForm({
          ...datasForm,
          practices: {
            ...datasForm["practices"],
            [event.target.name]: datasForm.practices.practice_anim.map(
              (practice, index) =>
                index === Number(event.target.value)
                  ? { ...practice, selected: event.target.checked }
                  : { ...practice, selected: false }
            ),
          },
        });
      } else {
        setDatasForm({
          ...datasForm,
          practices: {
            ...datasForm["practices"],
            [event.target.name]: datasForm.practices.practice_anim.map(
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
        console.log(datasForm.practices[event.target.name.split(".")[0]]);
        event.target.name.split(".")[1] === "portion_of_them"
          ? setDatasForm({
              ...datasForm,
              practices: {
                ...datasForm.practices,
                [event.target.name.split(".")[0]]: {
                  ...datasForm.practices[event.target.name.split(".")[0]],
                  [event.target.name.split(".")[1]]: event.target.checked,
                  all_of_them: false,
                },
              },
            })
          : setDatasForm({
              ...datasForm,
              practices: {
                ...datasForm.practices,
                [event.target.name.split(".")[0]]: {
                  ...datasForm.practices[event.target.name.split(".")[0]],
                  [event.target.name.split(".")[1]]: event.target.checked,
                  portion_of_them: false,
                },
              },
            });
      } else {
        console.log("je suis ici", practice.selected);
        if (cropsIndex && cropsIndex.length > 0) {
          setDatasForm({
            ...datasForm,
            practices: {
              ...datasForm.practices,
              practice_plant: datasForm.practices.practice_plant.map(
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
          datasForm.practices.practice_anim.map((practice, index) => {
            if (practice.selected) {
              setDatasForm({
                ...datasForm,
                practices: {
                  ...datasForm.practices,
                  practice_anim: datasForm.practices.practice_anim.map(
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
      setDatasForm({
        ...datasForm,
        practices: {
          ...datasForm.practices,
          [event.target.name]: {
            ...datasForm.practices[event.target.name],
            unit: datasForm.practices[event.target.name].unit.map((unit) =>
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
      setDatasForm({
        ...datasForm,
        practices: {
          ...datasForm.practices,
          [event.target.name]: {
            ...datasForm.practices[event.target.name],
            size: event.target.value,
          },
        },
      });
    } else if (practice) {
      if (practiceNumber) {
        setDatasForm({
          ...datasForm,
          practices: {
            ...datasForm.practices,
            [event.target.name.split(".")[0]]: {
              ...datasForm.practices[event.target.name.split(".")[0]],
              portion_numb: Number(event.target.value),
            },
          },
        });
        console.log(
          datasForm.practices[event.target.name.split(".")[0]].portion_numb
        );
      } else {
        datasForm.practices.practice_anim.map((practice, index) => {
          if (practice.selected) {
            console.log(datasForm.practices.practice_anim);
            console.log(practice, index);
            console.log(datasForm.practices.practice_anim[index]);
            console.log(
              event.target.name.split(".")[0],
              event.target.name.split(".")[1]
            );
            setDatasForm({
              ...datasForm,
              practices: {
                ...datasForm.practices,
                practice_anim: datasForm.practices.practice_anim.map(
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

            console.log(datasForm.practices);
          }
        });
      }
    }
  };
  return (
    <div id="bloc_practices">
      <div id="bloc_practices_animals">
        {(datasForm.farm_type.animals || datasForm.farm_type.both) &&
          (datasForm.farm_type_animals.dairy_cattle ||
            datasForm.farm_type_animals.beef_cattle ||
            datasForm.farm_type_animals.sheeps) && (
            <>
              <label>
                For your animal(s), have you implemented practice(s) to reduce
                enteric methane emissions?
              </label>
              {datasForm.practices.practice_anim.map((practice, index) => (
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
              {(datasForm.practices.practice_anim[0].selected ||
                datasForm.practices.practice_anim[1].selected ||
                datasForm.practices.practice_anim[2].selected) && (
                <>
                  <label>
                    For each practice, select the animal(s) concerned :
                  </label>
                  <table>
                    <tbody>
                      <tr>
                        <td></td>
                        {datasForm.practices.practice_anim[0].selected && (
                          <td>{datasForm.practices.practice_anim[0].value}</td>
                        )}
                        {datasForm.practices.practice_anim[1].selected && (
                          <td>{datasForm.practices.practice_anim[1].value}</td>
                        )}
                        {datasForm.practices.practice_anim[2].selected && (
                          <td>{datasForm.practices.practice_anim[2].value}</td>
                        )}
                      </tr>
                      {datasForm.farm_type_animals.dairy_cattle && (
                        <tr>
                          {(datasForm.practices.practice_anim[0].selected ||
                            datasForm.practices.practice_anim[1].selected ||
                            datasForm.practices.practice_anim[2].selected) && (
                            <td>Dairy cow</td>
                          )}
                          {datasForm.practices.practice_anim[0].selected && (
                            <td>
                              <input
                                type="checkbox"
                                name={"practice_anim.dairy_cow"}
                                value={0}
                                checked={
                                  datasForm.practices.practice_anim[0].dairy_cow
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
                          {datasForm.practices.practice_anim[1].selected && (
                            <td>
                              <input
                                type="checkbox"
                                name={"practice_anim.dairy_cow"}
                                value={1}
                                checked={
                                  datasForm.practices.practice_anim[1].dairy_cow
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
                          {datasForm.practices.practice_anim[2].selected && (
                            <td>
                              <input
                                type="checkbox"
                                name={"practice_anim.dairy_cow"}
                                value={2}
                                checked={
                                  datasForm.practices.practice_anim[2].dairy_cow
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
                      {datasForm.farm_type_animals.beef_cattle && (
                        <tr>
                          <td>Beef cattle</td>
                          {datasForm.practices.practice_anim[0].selected && (
                            <td>
                              <input
                                type="checkbox"
                                name={"practice_anim.beef_cattle"}
                                value={0}
                                checked={
                                  datasForm.practices.practice_anim[0]
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
                          {datasForm.practices.practice_anim[1].selected && (
                            <td>
                              <input
                                type="checkbox"
                                name={"practice_anim.beef_cattle"}
                                value={1}
                                checked={
                                  datasForm.practices.practice_anim[1]
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
                          {datasForm.practices.practice_anim[2].selected && (
                            <td>
                              <input
                                type="checkbox"
                                name={"practice_anim.beef_cattle"}
                                value={2}
                                checked={
                                  datasForm.practices.practice_anim[2]
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
                      {datasForm.farm_type_animals.sheeps && (
                        <tr>
                          <td>Sheeps</td>
                          {datasForm.practices.practice_anim[0].selected && (
                            <td>
                              <input
                                type="checkbox"
                                name={"practice_anim.sheeps"}
                                value={0}
                                checked={
                                  datasForm.practices.practice_anim[0].sheeps
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
                          {datasForm.practices.practice_anim[1].selected && (
                            <td>
                              <input
                                type="checkbox"
                                name={"practice_anim.sheeps"}
                                value={1}
                                checked={
                                  datasForm.practices.practice_anim[1].sheeps
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
                          {datasForm.practices.practice_anim[2].selected && (
                            <td>
                              <input
                                type="checkbox"
                                name={"practice_anim.sheeps"}
                                value={2}
                                checked={
                                  datasForm.practices.practice_anim[2].sheeps
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
              {(datasForm.practices.practice_anim[0].selected ||
                datasForm.practices.practice_anim[1].selected ||
                datasForm.practices.practice_anim[2].selected) &&
                datasForm.practices.practice_anim.find((animal) =>
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
                        {datasForm.farm_type_animals.dairy_cattle &&
                          datasForm.practices.practice_anim.find((animal) =>
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
                                      datasForm.practices.practice_anim[0]
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
                                      datasForm.practices.practice_anim[0]
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
                              {datasForm.practices.practice_anim.find(
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
                                        datasForm.practices.practice_anim.find(
                                          (animal) =>
                                            animal["dairy_cow"]
                                              ? animal["dairy_cow"]
                                                  .portion_of_them
                                              : false
                                        ).portion_numb
                                      }
                                      getAriaValueText={
                                        datasForm.practices.practice_anim.find(
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
                        {datasForm.farm_type_animals.beef_cattle &&
                          datasForm.practices.practice_anim.find((animal) =>
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
                                      datasForm.practices.practice_anim[0]
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
                                      datasForm.practices.practice_anim[0]
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
                              {datasForm.practices.practice_anim.find(
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
                                        datasForm.practices.practice_anim.find(
                                          (animal) =>
                                            animal["beef_cattle"]
                                              ? animal["beef_cattle"]
                                                  .portion_of_them
                                              : false
                                        ).portion_numb
                                      }
                                      getAriaValueText={
                                        datasForm.practices.practice_anim.find(
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
                        {datasForm.farm_type_animals.sheeps &&
                          datasForm.practices.practice_anim.find((animal) =>
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
                                      datasForm.practices.practice_anim[0]
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
                                      datasForm.practices.practice_anim[0]
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
                              {datasForm.practices.practice_anim.find(
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
                                        datasForm.practices.practice_anim.find(
                                          (animal) =>
                                            animal["sheeps"]
                                              ? animal["sheeps"].portion_of_them
                                              : false
                                        ).portion_numb
                                      }
                                      getAriaValueText={
                                        datasForm.practices.practice_anim.find(
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
        {(datasForm.farm_type.crops || datasForm.farm_type.both) && (
          <>
            <label>
              For your crop(s), have you implemented practice(s) to reduce
              emissions & increase sequestration?
            </label>
            {datasForm.practices.practice_plant.map((practice, index) => (
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

            {(datasForm.practices["croplands"].selected ||
              datasForm.practices["grasslands"].selected ||
              datasForm.practices["organic_soils"].selected) && (
              <>
                <label>Did you implement this/these practice(s) for: </label>
                <table>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>A portion of them</td>
                      <td>All of them</td>
                    </tr>
                    {datasForm.practices.croplands.selected && (
                      <>
                        <tr>
                          <td>Croplands</td>
                          <td>
                            <input
                              type="radio"
                              name={"croplands.portion_of_them"}
                              checked={
                                datasForm.practices["croplands"].portion_of_them
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
                                datasForm.practices["croplands"].all_of_them
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
                        {datasForm.practices["croplands"].portion_of_them && (
                          <tr>
                            <td>
                              <label>% of them :</label>
                            </td>
                            <td>
                              {console.log(
                                datasForm.practices["croplands"].portion_numb
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
                                  datasForm.practices["croplands"].portion_numb
                                }
                                aria-label="Temperature"
                                name={"croplands.portion_numb"}
                                defaultValue={
                                  datasForm.practices.croplands.portion_numb
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
                    {datasForm.practices.grasslands.selected && (
                      <>
                        <tr>
                          <td>Grasslands</td>
                          <td>
                            <input
                              type="radio"
                              name={"grasslands.portion_of_them"}
                              checked={
                                datasForm.practices["grasslands"]
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
                                datasForm.practices["grasslands"].all_of_them
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
                        {datasForm.practices["grasslands"].portion_of_them && (
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
                                  datasForm.practices["grasslands"].portion_numb
                                }
                                aria-label="Temperature"
                                name={"grasslands.portion_numb"}
                                defaultValue={
                                  datasForm.practices["grasslands"].portion_numb
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
                    {datasForm.practices.organic_soils.selected && (
                      <>
                        <tr>
                          <td>Organic soils</td>
                          <td>
                            <input
                              type="radio"
                              name={"organic_soils.portion_of_them"}
                              checked={
                                datasForm.practices["organic_soils"]
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
                                datasForm.practices["organic_soils"].all_of_them
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
                        {datasForm.practices["organic_soils"]
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
                                  datasForm.practices["organic_soils"]
                                    .portion_numb
                                }
                                value={
                                  datasForm.practices["organic_soils"]
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
            {datasForm.practices.practice_plant[8].selected && (
              <>
                What is the size of the degraded lands on which you practice
                restoration?
                <input
                  type="number"
                  name="degraded_lands"
                  value={datasForm.practices.degraded_lands.size}
                  onChange={(event) =>
                    handleChangeNumber({ event: event, other_plant: true })
                  }
                />
                <select
                  defaultValue=""
                  name={"degraded_lands"}
                  id={"degraded_lands_unit"}
                  onChange={(event) =>
                    handleChangeSelect({ event: event, other_plant: true })
                  }
                >
                  {datasForm.practices["degraded_lands"].unit.map((unit) => (
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
            {datasForm.practices.practice_plant[9].selected && (
              <>
                What is the size of the lands where the soils are under
                bio-energy?
                <input
                  type="number"
                  name="bionrj"
                  value={datasForm.practices.bionrj.size}
                  onChange={(event) =>
                    handleChangeNumber({ event: event, other_plant: true })
                  }
                />
                <select
                  defaultValue=""
                  name={"bionrj"}
                  id={"bionrj_unit"}
                  onChange={(event) =>
                    handleChangeSelect({ event: event, other_plant: true })
                  }
                >
                  {datasForm.practices["bionrj"].unit.map((unit) => (
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
            {datasForm.practices.practice_plant[10].selected && (
              <>
                What is the size of the lands on which you apply
                manure/biosolids?
                <input
                  type="number"
                  name="manure"
                  value={datasForm.practices.manure.size}
                  onChange={(event) =>
                    handleChangeNumber({ event: event, other_plant: true })
                  }
                />
                <select
                  defaultValue=""
                  name={"manure"}
                  id={"manure_unit"}
                  onChange={(event) =>
                    handleChangeSelect({ event: event, other_plant: true })
                  }
                >
                  {datasForm.practices["manure"].unit.map((unit) => (
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
