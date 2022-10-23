If (cattleDairy !== 0 && datasForm.find ((data)=> data.id !=='farm_animals_dairy_cattle_feeding_practice')?.response) {
    <p> 
        If you implement improved feeding practices e.g.  replacing roughage with concentrate, feeding, extra dietary oil, for your dairy cattle you could mitigate 
    </p> 
    EFDairy*0.16 
    <p> 
        tonnes of CO<sub>2</sub> per year which represents $ 
    </p> 
    EFDairy*0.16*73.05 
    <p> 
        per year
    </p>
    }
    
If (cattleDairy !== 0 && datasForm.find ((data)=> data.id !=='farm_animals_dairy_cattle_specific_agent_practice')?.response) {
    <p> 
        If you implement the use of specific agents and dietary additives e.g.  bST, growth hormones, ionophores, propionate precursors, for your dairy cattle you could mitigate 
    </p> 
    EFDairy*0.11 
    <p> 
        tonnes of CO<sub>2</sub> per year which represents $
    </p> 

    EFDairy*0.11*73.05 
    <p> 
        per year
    </p>
    }
    
If (cattleBeef !== 0 && datasForm.find ((data)=> data.id !==”farm_animals_beef_cattle_feeding_practice”)?.response) {
    <p> 
        If you implement improved feeding practices e.g.  replacing roughage with concentrate, feeding, extra dietary oil, for your beef cattle you could mitigate 
    </p> 
    EFBeef*0.11 
    <p> 
        tonnes of CO<sub>2</sub> per year which represents $
    </p> 
    EFBeef*0.11*73.05
    <p>
          per year
    </p>
    }

If (datasForm.find((element)=>element.id===”farm_crops”)?.response && datasForm.find((element)=>element.id !== “farm_crops_degraded_land_restoration_practice”)?.response) {
    <p> 
        If you implement degraded land restoration on your crops you could mitigate up to 
    </p>
     (grassland_size+ grain_size+forage_size+fv_size+flowers_size+herbs_size)*deg_resto_coeff
    <p> 
     tonnes of CO<sub>2</sub> per year which represents $
    </p> 
    (grassland_size+ grain_size+forage_size+fv_size+flowers_size+herbs_size)*deg_resto_coeff*15 
    <p> 
        per year
    </p>
    
If (datasForm.find((element)=>element.id===”farm_crops”)?.response && datasForm.find((element)=>element.id !== “farm_crops_manure_practice”)?.response) {
    <p> 
        If you apply manure and biosolids on your crops you could mitigate up to 
    </p> 
    (grassland_size+ grain_size+forage_size+fv_size+flowers_size+herbs_size)*manure_bios_coeff 
    <p> 
        tonnes of CO<sub>2</sub> per year which represents $
    </p> 

    (grassland_size+ grain_size+forage_size+fv_size+flowers_size+herbs_size)* manure_bios_coeff *15 
    <p> 
        per year
    </p>
    }

If (datasForm.find((element)=>element.id===”farm_crops”)?.response && datasForm.find((element)=>element.id !== “farm_crops_land_use_change_practice”)?.response) {
    <p> 
        If you implement set aside and lad-use change i.e. allow or encourage the reversion of croplamd to another land cover, typically one similar to the native vegetation on your crops you could mitigate up to 
    </p> 
    (grassland_size+ grain_size+forage_size+fv_size+flowers_size+herbs_size)*crop_LUC_coeff
    <p> 
        tonnes of CO<sub>2</sub> per year which represents $
    </p>
     (grain_size+forage_size+fv_size+flowers_size+herbs_size)* crop_LUC_coeff *15 
    <p> 
         per year
    </p>
    }
    
If (datasForm.find((element)=>element.id===”farm_crops_fertilizer”)?.response) {
    <p> 
        Reducing your use of synthetic fertilizer would reduce your CO<sub>2</sub> emissions.  
    </p> 
    }
    