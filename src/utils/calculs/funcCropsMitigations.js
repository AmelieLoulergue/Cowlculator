import regions from "../../coeff/regions.json";
import coeff_reduction_ghg from "../../coeff/coeff_reduction_ghg.json";

function funcCropsMitigations({ datasForm, state, time }) {
  let region = regions.find((region) => region.Code === state);
  let climate = region.Climate.replace(" ", "_");

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

  const calculProportion = (practice) => {
    if (
      grain_size !== 0 ||
      fv_size !== 0 ||
      flowers_size !== 0 ||
      herbs_size !== 0 ||
      forage_size !== 0
    ) {
      if (
        datasForm.find((element) => element.id === `${practice}_portion`)
          ?.response === "All of them"
      ) {
        return grain_size + fv_size + flowers_size + herbs_size + forage_size;
      } else if (
        datasForm.find((element) => element.id === `${practice}_portion`)
          ?.response === "A portion of them" &&
        datasForm.find((element) => element.id === `${practice}_portion_numb`)
          ?.response?.value
      ) {
        return (
          (grain_size + fv_size + flowers_size + herbs_size + forage_size) *
          (datasForm.find(
            (element) => element.id === `${practice}_portion_numb`
          )?.response?.value /
            100)
        );
      }
    }
  };

  // Proportions of grassland on which practices applied

  let grassland_practice = 0;
  if (
    datasForm.find(
      (element) => element.id === "farm_crops_grassland_grazing_practice"
    )?.response
  ) {
    if (
      datasForm.find(
        (element) =>
          element.id === "farm_crops_grassland_grazing_practice_portion"
      )?.response === "All of them"
    ) {
      grassland_practice = grassland_size;
    }
  } else {
    if (
      datasForm.find(
        (element) =>
          element.id === "farm_crops_grassland_grazing_practice_portion"
      )?.response === "A portion of them" &&
      datasForm.find(
        (element) =>
          element.id === "farm_crops_grassland_grazing_practice_portion_numb"
      )?.response?.value
    ) {
      grassland_practice =
        grassland_size *
        (datasForm.find(
          (element) =>
            element.id === "farm_crops_grassland_grazing_practice_portion_numb"
        )?.response?.value /
          100);
    }
  }
  // size of land on which degraded land restoration is practiced
  let degradedRestoration_size = 0;
  if (
    datasForm.find(
      (element) =>
        element.id === "farm_crops_degraded_lands_restoration_practice"
    )?.response &&
    datasForm.find(
      (element) =>
        element.id === "farm_crops_degraded_lands_restoration_practice_size"
    )?.response &&
    datasForm.find(
      (element) =>
        element.id === "farm_crops_degraded_lands_restoration_practice_size"
    )?.response?.unit === "acre"
  ) {
    degradedRestoration_size =
      datasForm.find(
        (element) =>
          element.id === "farm_crops_degraded_lands_restoration_practice_size"
      )?.response?.value * acre_to_ha;
  } else {
    if (
      datasForm.find(
        (element) =>
          element.id === "farm_crops_degraded_lands_restoration_practice"
      )?.response &&
      datasForm.find(
        (element) =>
          element.id === "farm_crops_degraded_lands_restoration_practice_size"
      )?.response &&
      datasForm.find(
        (element) =>
          element.id === "farm_crops_degraded_lands_restoration_practice_size"
      )?.response?.unit === "sq feet"
    ) {
      degradedRestoration_size =
        datasForm.find(
          (element) =>
            element.id === "farm_crops_degraded_lands_restoration_practice_size"
        )?.response?.value * sqfeet_to_ha;
    }
  }

  // size of land on which manure is applied
  let manure_size = 0;
  if (
    datasForm.find((element) => element.id === "farm_crops_manure_practice")
      ?.response &&
    datasForm.find(
      (element) => element.id === "farm_crops_manure_practice_size"
    )?.response &&
    datasForm.find(
      (element) => element.id === "farm_crops_manure_practice_size"
    )?.response?.unit === "acre"
  ) {
    manure_size =
      datasForm.find(
        (element) => element.id === "farm_crops_manure_practice_size"
      )?.response?.value * acre_to_ha;
  } else {
    if (
      datasForm.find((element) => element.id === "farm_crops_manure_practice")
        ?.response &&
      datasForm.find(
        (element) => element.id === "farm_crops_manure_practice_size"
      )?.response &&
      datasForm.find(
        (element) => element.id === "farm_crops_manure_practice_size"
      )?.response?.unit === "sq feet"
    ) {
      manure_size =
        datasForm.find(
          (element) => element.id === "farm_crops_manure_practice_size"
        )?.response?.value * sqfeet_to_ha;
    }
  }

  // // Calculate mitigation from each practice on each type of land
  let cropland_practice = 0;
  // //Agronomy
  let mitigationCropAgro = 0;
  if (
    datasForm.find((element) => element.id === "farm_crops_agronomy_practice")
      ?.response
  ) {
    cropland_practice = calculProportion("farm_crops_agronomy_practice");
    mitigationCropAgro = cropland_practice
      ? (crop_agro_coeff * cropland_practice * time) / 1000
      : 0;
  }

  //Nutrient management
  let mitigationCropNut = 0;
  if (
    datasForm.find(
      (element) => element.id === "farm_crops_nutrient_management_practice"
    )?.response
  ) {
    cropland_practice = calculProportion(
      "farm_crops_nutrient_management_practice"
    );
    mitigationCropNut = cropland_practice
      ? (crop_nut_coeff * cropland_practice * time) / 1000
      : 0;
  }

  //Tillage
  let mitigationCropTillage = 0;
  if (
    datasForm.find(
      (element) => element.id === "farm_crops_residue_management_practice"
    )?.response
  ) {
    cropland_practice = calculProportion(
      "farm_crops_residue_management_practice"
    );
    mitigationCropTillage = cropland_practice
      ? (crop_tillage_coeff * cropland_practice * time) / 1000
      : 0;
  }

  //Water Management
  let mitigationCropWater = 0;
  if (
    datasForm.find(
      (element) => element.id === "farm_crops_water_management_practice"
    )?.response
  ) {
    cropland_practice = calculProportion(
      "farm_crops_water_management_practice"
    );
    mitigationCropWater = cropland_practice
      ? (crop_water_coeff * cropland_practice * time) / 1000
      : 0;
  }

  //LUC
  let mitigationCropLUC = 0;
  if (
    datasForm.find(
      (element) => element.id === "farm_crops_land_use_change_practice"
    )?.response
  ) {
    cropland_practice = calculProportion("farm_crops_land_use_change_practice");
    mitigationCropLUC = cropland_practice
      ? (crop_LUC_coeff * cropland_practice * time) / 1000
      : 0;
  }

  //Agro Forestry
  let mitigationCropAgrofo = 0;
  if (
    datasForm.find(
      (element) => element.id === "farm_crops_agroforestry_practice"
    )?.response
  ) {
    cropland_practice = calculProportion("farm_crops_agroforestry_practice");
    mitigationCropAgrofo = cropland_practice
      ? (crop_agrofo_coeff * cropland_practice * time) / 1000
      : 0;
  }

  //Grazing
  let mitigationGrassGraz = 0;
  if (
    datasForm.find(
      (element) => element.id === "farm_crops_grassland_grazing_practice"
    )?.response
  ) {
    mitigationGrassGraz = (grass_graz_coeff * grassland_practice * time) / 1000;
  }

  //Restoration Degraded Lands
  let mitigationDegResto = 0;
  if (
    datasForm.find(
      (element) =>
        element.id === "farm_crops_degraded_lands_restoration_practice"
    )?.response
  ) {
    mitigationDegResto =
      (deg_resto_coeff * degradedRestoration_size * time) / 1000;
  }

  //Manure application
  let mitigationManureApp = 0;
  if (
    datasForm.find((element) => element.id === "farm_crops_manure_practice")
      ?.response
  ) {
    mitigationManureApp = (manure_bios_coeff * manure_size * time) / 1000;
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
    mitigationCropAgro: mitigationCropAgro,
    mitigationCropNut: mitigationCropNut,
    mitigationCropTillage: mitigationCropTillage,
    mitigationCropWater: mitigationCropWater,
    mitigationCropLUC: mitigationCropLUC,
    mitigationCropAgrofo: mitigationCropAgrofo,
    mitigationGrassGraz: mitigationGrassGraz,
    mitigationDegResto: mitigationDegResto,
    mitigationManureApp: mitigationManureApp,
    mitigationCropsTotal: mitigationCropsTotal,
  };
}

export default funcCropsMitigations;
