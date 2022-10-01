import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
function ResearcherDatas({ login }) {
  console.log(login.userType);
  return (
    <>
      {login?.userType === "researcher" && (
        <div className="researcher-datas">
          <h1>Please select a format to download : </h1>
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <NativeSelect defaultValue={"csv"}>
                <option value={"json"}>.json</option>
                <option value={"csv"}>.csv</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <button className="btn">DOWNLOAD</button>
        </div>
      )}
      {login?.userType === "farmer" && <></>}
    </>
  );
}

export default ResearcherDatas;
