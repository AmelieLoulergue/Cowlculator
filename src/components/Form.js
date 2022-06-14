import React from "react";
import calculs from "../utils/calculs";
import BlocElectricity from "./form_components/BlocElectricity";
import BlocGas from "./form_components/BlocGas";
import BlocNaturalGas from "./form_components/BlocNaturalGas";
import BlocFuel from "./form_components/BlocFuel";
import BlocWater from "./form_components/BlocWater";
import BlocOther from "./form_components/BlocOther";
import BlocAnimals from "./form_components/BlocAnimals";
import BlocPlants from "./form_components/BlocPlants";
import BlocPractices from "./form_components/BlocPractices";
import BlocSoilTesting from "./form_components/BlocSoilTesting";
import coeff_reduction_ghg from "../coeff/coeff_reduction_ghg.json";
import elec_state_coeff from "../coeff/elec_state_coeff.json";
import enteric_EF from "../coeff/enteric_EF.json";
import fuel_coeff from "../coeff/fuel_coeff.json";
import gas_coeff from "../coeff/gas_coeff.json";
import manure from "../coeff/manure.json";
import natgas_coeff from "../coeff/natgas_coeff.json";
import other_coeff from "../coeff/other_coeff.json";
import reductionEF_coeff from "../coeff/reductionEF_coeff.json";
import regions from "../coeff/regions.json";
import water_coeff from "../coeff/water_coeff.json";
import Accordion from "./mui_components/Accordion";
import Button from "@mui/material/Button";
import BlocDemographic from "./form_components/BlocDemographic";
import { useGlobalContext } from "../context/globalContext";
import { handleChange } from "../utils/form_functions";
function Form(props) {
  const { datasForm, setDatasForm } = useGlobalContext();
  const titlesAccordion = [
    "Project presentation",
    "Electricity",
    "Gas",
    "Natural gas",
    "Fuel",
    "Water",
    "Other",
    "Farm information",
    "Soil testing",
    "Practices",
    "Démographics",
  ];

  const transformDate = (dateValue) => {
    let date = dateValue.split("/");
    return date[2] + "-" + date[0] + "-" + date[1];
  };
  // const handleChange = ({ event, other, state }) => {
  //   if (other) {
  //     setDatasForm({
  //       ...datasForm,
  //       [event.target.name]: {
  //         ...datasForm[event.target.name],
  //         other: {
  //           ...datasForm[event.target.name]["other"],
  //           value: event.target.value,
  //         },
  //       },
  //     });
  //   } else if (state) {
  //     setDatasForm({
  //       ...datasForm,
  //       [event.target.name.split(".")[0]]: {
  //         ...datasForm[event.target.name.split(".")[0]],
  //         [event.target.name.split(".")[1]]: event.target.value,
  //       },
  //     });
  //   } else {
  //     setDatasForm({
  //       ...datasForm,
  //       [event.target.name]: event.target.value,
  //     });
  //   }
  // };

  const setValuesToFalse = (datas) => {
    let test = {};
    for (const [key, value] of Object.entries(datas)) {
      key === "none" || key === "both"
        ? Object.assign(test, { [key]: true })
        : Object.assign(test, { [key]: false });
    }
    return test;
  };
  const setValuesToTrue = (datas) => {
    let test = {};
    for (const [key, value] of Object.entries(datas)) {
      Object.assign(test, { [key]: true });
    }
    return test;
  };
  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    //console.log(datasForm);
    calculs(
      datasForm,
      coeff_reduction_ghg,
      elec_state_coeff,
      enteric_EF,
      fuel_coeff,
      gas_coeff,
      manure,
      natgas_coeff,
      other_coeff,
      reductionEF_coeff,
      regions,
      water_coeff
    );
  };
  return (
    <div id="form">
      <form
        onSubmit={(event) => handleSubmit(event)}
        style={{ display: "flex", flexDirection: "column" }}
        className="form"
      >
        <Accordion titlesAccordion={titlesAccordion}>
          <div
            id="block_project_presentation"
            className="columns is-multiline is-centered has-text-centered"
          >
            <div className="column is-6 ">
              
              <label htmlFor="startDate">Start date:</label>
              <input
                type="date"
                name="startDate"
                value={transformDate(datasForm.startDate)}
                onChange={(event) =>
                  handleChange({
                    event: event,
                    datasForm: datasForm,
                    setDatasForm: setDatasForm,
                  })
                }
              />
            </div>
            <div className="column is-6">
              <label htmlFor="endDate">End date:</label>
              <input
                type="date"
                name="endDate"
                value={transformDate(datasForm.endDate)}
                onChange={(event) =>
                  handleChange({
                    event: event,
                    datasForm: datasForm,
                    setDatasForm: setDatasForm,
                  })
                }
              />
            </div>
          </div>

          <BlocElectricity datasForm={datasForm} setDatasForm={setDatasForm} />
          <BlocGas datasForm={datasForm} setDatasForm={setDatasForm} />
          <BlocNaturalGas datasForm={datasForm} setDatasForm={setDatasForm} />
          <BlocFuel datasForm={datasForm} setDatasForm={setDatasForm} />
          <BlocWater datasForm={datasForm} setDatasForm={setDatasForm} />
          <BlocOther datasForm={datasForm} setDatasForm={setDatasForm} />
          <div id="block_farm_information">
            <BlocAnimals datasForm={datasForm} setDatasForm={setDatasForm} />
            <BlocPlants datasForm={datasForm} setDatasForm={setDatasForm} />
          </div>
          <BlocSoilTesting datasForm={datasForm} setDatasForm={setDatasForm} />
          <BlocPractices datasForm={datasForm} setDatasForm={setDatasForm} />
          <BlocDemographic datasForm={datasForm} setDatasForm={setDatasForm} />
        </Accordion>
        <div>
          <Button variant="contained" type="submit">
            Envoyer{" "}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
