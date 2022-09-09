import regions from "../../coeff/regions.json";
import coeff_reduction_ghg from "../../coeff/coeff_reduction_ghg.json";

function funcCropsMitigations({ datasForm, state, time }) {
  let region = regions.find((region) => region.Code === state);
  console.log(region, state);
  let climate = region.Climate.replace(" ", "_");
  console.log(climate);

  let coeff_crops = coeff_reduction_ghg.map((element) => {
    let climate_coeff = element.climate.replace(" ", "_");
    if (climate_coeff === climate) {
      return { practice: element.practice, GHG: element.GHG };
    }
  });
  coeff_crops = coeff_crops.filter((element) => element !== undefined);

  let crop_agro_coeff = coeff_crops[0].GHG;
  let crop_nut_coeff = coeff_crops[1].GHG;
  let crop_tillage_coeff = coeff_crops[2].GHG;
  let crop_water_coeff = coeff_crops[3].GHG;
  let crop_LUC_coeff = coeff_crops[4].GHG;
  let crop_agrofo_coeff = coeff_crops[5].GHG;
  let grass_graz_coeff = coeff_crops[6].GHG;
  //let orga_resto_coeff = coeff_crops[7].GHG;
  let deg_resto_coeff = coeff_crops[8].GHG;
  let manure_bios_coeff = coeff_crops[9].GHG;
  //let bionrj_coeff = coeff_crops[10].GHG;

  // convert land size to ha
  let acre_to_ha = 0.404686;
  let sqfeet_to_ha = 0.000009290304;

  let grassland_size = 0;
  if (
    datasForm.find((element) => element.id === "farm_crops_grassland")
      ?.response &&
    datasForm.find((element) => element.id === "farm_crops_grassland_size")
      ?.response?.unit === "acre"
  ) {
    grassland_size = datasForm.find(
      (element) => element.id === "farm_crops_grassland_size"
    )?.response?.value
      ? Number(
          datasForm.find(
            (element) => element.id === "farm_crops_grassland_size"
          ).response.value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      datasForm.find((element) => element.id === "farm_crops_grassland")
        ?.response &&
      datasForm.find((element) => element.id === "farm_crops_grassland_size")
        ?.response?.unit === "sq feet"
    ) {
      grassland_size = grassland_size = datasForm.find(
        (element) => element.id === "farm_crops_grassland_size"
      )?.response?.value
        ? Number(
            (grassland_size = datasForm.find(
              (element) => element.id === "farm_crops_grassland_size"
            ).response.value)
          ) * sqfeet_to_ha
        : 0;
    }
  }

  let grain_size = 0;
  if (
    datasForm.find((element) => element.id === "farm_crops_grain")?.response &&
    datasForm.find((element) => element.id === "farm_crops_grain_size")
      ?.response?.unit === "acre"
  ) {
    grain_size = datasForm.find(
      (element) => element.id === "farm_crops_grain_size"
    )?.response?.value
      ? Number(
          datasForm.find((element) => element.id === "farm_crops_grain_size")
            .response.value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      datasForm.find((element) => element.id === "farm_crops_grain")
        ?.response &&
      datasForm.find((element) => element.id === "farm_crops_grain_size")
        ?.response?.unit === "sq feet"
    ) {
      grain_size = datasForm.find(
        (element) => element.id === "farm_crops_grain_size"
      )?.response?.value
        ? Number(
            datasForm.find((element) => element.id === "farm_crops_grain_size")
              .response.value
          ) * sqfeet_to_ha
        : 0;
    }
  }

  let forage_size = 0;
  if (
    datasForm.find((element) => element.id === "farm_crops_forage")?.response &&
    datasForm.find((element) => element.id === "farm_crops_forage_size")
      ?.response?.unit === "acre"
  ) {
    forage_size = datasForm.find(
      (element) => element.id === "farm_crops_forage_size"
    )?.response?.value
      ? Number(
          datasForm.find((element) => element.id === "farm_crops_forage_size")
            .response.value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      datasForm.find((element) => element.id === "farm_crops_forage")
        ?.response &&
      datasForm.find((element) => element.id === "farm_crops_forage_size")
        ?.response?.unit === "sq feet"
    ) {
      forage_size = datasForm.find(
        (element) => element.id === "farm_crops_forage_size"
      )?.response?.value
        ? Number(
            datasForm.find((element) => element.id === "farm_crops_forage_size")
              .response.value
          ) * sqfeet_to_ha
        : 0;
    }
  }

  let fv_size = 0;
  if (
    datasForm.find((element) => element.id === "farm_crops_fv")?.response &&
    datasForm.find((element) => element.id === "farm_crops_fv_size")?.response
      ?.unit === "acre"
  ) {
    fv_size = datasForm.find((element) => element.id === "farm_crops_fv_size")
      ?.response?.value
      ? Number(
          datasForm.find((element) => element.id === "farm_crops_fv_size")
            .response.value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      datasForm.find((element) => element.id === "farm_crops_fv")?.response &&
      datasForm.find((element) => element.id === "farm_crops_fv_size")?.response
        ?.unit === "sq feet"
    ) {
      fv_size = datasForm.find((element) => element.id === "farm_crops_fv_size")
        ?.response?.value
        ? Number(
            datasForm.find((element) => element.id === "farm_crops_fv_size")
              .response.value
          ) * sqfeet_to_ha
        : 0;
    }
  }

  let flowers_size = 0;
  if (
    datasForm.find((element) => element.id === "farm_crops_flowers")
      ?.response &&
    datasForm.find((element) => element.id === "farm_crops_flowers_size")
      ?.response?.unit === "acre"
  ) {
    flowers_size = datasForm.find(
      (element) => element.id === "farm_crops_flowers_size"
    )?.response?.value
      ? Number(
          datasForm.find((element) => element.id === "farm_crops_flowers_size")
            .response.value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      datasForm.find((element) => element.id === "farm_crops_flowers")
        ?.response &&
      datasForm.find((element) => element.id === "farm_crops_flowers_size")
        ?.response?.unit === "sq feet"
    ) {
      flowers_size = datasForm.find(
        (element) => element.id === "farm_crops_flowers_size"
      )?.response?.value
        ? Number(
            datasForm.find(
              (element) => element.id === "farm_crops_flowers_size"
            ).response.value
          ) * sqfeet_to_ha
        : 0;
    }
  }

  let herbs_size = 0;
  if (
    datasForm.find((element) => element.id === "farm_crops_herbs")?.response &&
    datasForm.find((element) => element.id === "farm_crops_herbs_size")
      ?.response?.unit === "acre"
  ) {
    herbs_size = datasForm.find(
      (element) => element.id === "farm_crops_herbs_size"
    )?.response?.value
      ? Number(
          datasForm.find((element) => element.id === "farm_crops_herbs_size")
            .response.value
        ) * acre_to_ha
      : 0;
  } else {
    if (
      datasForm.find((element) => element.id === "farm_crops_herbs")
        ?.response &&
      datasForm.find((element) => element.id === "farm_crops_herbs_size")
        ?.response?.unit === "sq feet"
    ) {
      herbs_size = datasForm.find(
        (element) => element.id === "farm_crops_herbs_size"
      )?.response?.value
        ? Number(
            datasForm.find((element) => element.id === "farm_crops_herbs_size")
              .response.value
          ) * sqfeet_to_ha
        : 0;
    }
  }

  // Practices

  // Proportions of cropland on which practices applied

  let cropland_practice = 0;
  if (
    datasForm.find((element) => element.id === "farm_crops")?.response &&
    (datasForm.find((element) => element.id === "farm_crops_grain_size")
      ?.response?.value ||
      datasForm.find((element) => element.id === "farm_crops_forage_size")
        ?.response?.value ||
      datasForm.find((element) => element.id === "farm_crops_fv_size")?.response
        ?.value ||
      datasForm.find((element) => element.id === "farm_crops_flowers_size")
        ?.response?.value ||
      datasForm.find((element) => element.id === "farm_crops_herbs_size")
        ?.response?.value)
  ) {
    cropland_practice =
      datasForm.find((element) => element.id === "farm_crops_grain_size")
        ?.response?.value +
      datasForm.find((element) => element.id === "farm_crops_forage_size")
        ?.response?.value +
      datasForm.find((element) => element.id === "farm_crops_fv_size")?.response
        ?.value +
      datasForm.find((element) => element.id === "farm_crops_flowers_size")
        ?.response?.value +
      datasForm.find((element) => element.id === "farm_crops_herbs_size")
        ?.response?.value;
  } else {
    if (datasForm.practices.croplands.portion_of_them === true) {
      cropland_practice =
        (grain_size + forage_size + fv_size + flowers_size + herbs_size) *
        (datasForm.practices.croplands.portion_numb / 100);
    }
  }

  // Proportions of grassland on which practices applied

  let grassland_practice = 0;
  if (datasForm.practices.grasslands.all_of_them === true) {
    grassland_practice = grassland_size;
  } else {
    if (datasForm.practices.grasslands.portion_of_them === true) {
      grassland_practice =
        grassland_size * (datasForm.practices.grasslands.portion_numb / 100);
    }
  }

  // size of land on which degraded land restoration is practiced
  let degradedRestoration_size = 0;
  if (datasForm.practices.degraded_lands.unit[0].selected === true) {
    degradedRestoration_size =
      datasForm.practices.degraded_lands.size * acre_to_ha;
  } else {
    if (datasForm.practices.degraded_lands.unit[1].selected === true) {
      degradedRestoration_size =
        datasForm.practices.degraded_lands.size * sqfeet_to_ha;
    }
  }

  // size of land on which manure is applied
  let manure_size = 0;
  if (datasForm.practices.manure.unit[0].selected === true) {
    manure_size = datasForm.practices.manure.size * acre_to_ha;
  } else {
    if (datasForm.practices.manure.unit[1].selected === true) {
      manure_size = datasForm.practices.manure.size * sqfeet_to_ha;
    }
  }

  // Calculate mitigation from each practice on each type of land
  //Agronomy
  let mitigationCropAgro = 0;
  if (datasForm.practices.practice_plant[0].selected === false) {
    mitigationCropAgro = 0;
  } else {
    if (datasForm.practices.practice_plant[0].selected === true) {
      mitigationCropAgro = (crop_agro_coeff * cropland_practice * time) / 1000;
    }
  }

  //Nutrient management
  let mitigationCropNut = 0;
  if (datasForm.practices.practice_plant[1].selected === false) {
    mitigationCropNut = 0;
  } else {
    if (datasForm.practices.practice_plant[1].selected === true) {
      mitigationCropNut = (crop_nut_coeff * cropland_practice * time) / 1000;
    }
  }

  //Tillage
  let mitigationCropTillage = 0;
  if (datasForm.practices.practice_plant[2].selected === false) {
    mitigationCropTillage = 0;
  } else {
    if (datasForm.practices.practice_plant[2].selected === true) {
      mitigationCropTillage =
        (crop_tillage_coeff * cropland_practice * time) / 1000;
    }
  }

  //Water Management
  let mitigationCropWater = 0;
  if (datasForm.practices.practice_plant[3].selected === false) {
    mitigationCropWater = 0;
  } else {
    if (datasForm.practices.practice_plant[3].selected === true) {
      mitigationCropWater =
        (crop_water_coeff * cropland_practice * time) / 1000;
    }
  }

  //LUC
  let mitigationCropLUC = 0;
  if (datasForm.practices.practice_plant[4].selected === false) {
    mitigationCropLUC = 0;
  } else {
    if (datasForm.practices.practice_plant[4].selected === true) {
      mitigationCropLUC = (crop_LUC_coeff * cropland_practice * time) / 1000;
    }
  }

  //Agro Forestry
  let mitigationCropAgrofo = 0;
  if (datasForm.practices.practice_plant[5].selected === false) {
    mitigationCropAgrofo = 0;
  } else {
    if (datasForm.practices.practice_plant[5].selected === true) {
      mitigationCropAgrofo =
        (crop_agrofo_coeff * cropland_practice * time) / 1000;
    }
  }

  //Grazing
  let mitigationGrassGraz = 0;
  if (datasForm.practices.practice_plant[6].selected === false) {
    mitigationGrassGraz = 0;
  } else {
    if (datasForm.practices.practice_plant[6].selected === true) {
      mitigationGrassGraz =
        (grass_graz_coeff * grassland_practice * time) / 1000;
    }
  }

  //Restoration Degraded Lands
  let mitigationDegResto = 0;
  if (datasForm.practices.practice_plant[8].selected === false) {
    mitigationDegResto = 0;
  } else {
    if (datasForm.practices.practice_plant[8].selected === true) {
      mitigationDegResto =
        (deg_resto_coeff * degradedRestoration_size * time) / 1000;
    }
  }

  //Manure application
  let mitigationManureApp = 0;
  if (datasForm.practices.practice_plant[10].selected === false) {
    mitigationManureApp = 0;
  } else {
    if (datasForm.practices.practice_plant[10].selected === true) {
      mitigationManureApp = (manure_bios_coeff * manure_size * time) / 1000;
    }
  }

  //Total crops practices mitigations
  let mitigationCropsTotal =
    mitigationManureApp +
    mitigationDegResto +
    mitigationGrassGraz +
    mitigationCropAgrofo +
    mitigationCropLUC +
    mitigationCropWater +
    mitigationCropTillage +
    mitigationCropNut +
    mitigationCropAgro;

  return {
    mitigation_total_crops: mitigationCropsTotal,
    mitigation_manure_application: mitigationManureApp,
    mitigation_resto_degraded: mitigationDegResto,
    mitigation_grazing_grasslands: mitigationGrassGraz,
    mitigation_agrofo: mitigationCropAgrofo,
    mitigation_LUC: mitigationCropLUC,
    mitiation_water_croplands: mitigationCropWater,
    mitigation_tillage_croplands: mitigationCropTillage,
    mitigation_nut_croplands: mitigationCropNut,
    mitigation_agro_croplands: mitigationCropAgro,
  };
}

export default funcCropsMitigations;
