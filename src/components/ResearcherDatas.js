import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
function ResearcherDatas({ login }) {
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
          <a
            href="https://clous-storage-carbonb-cos-standard-26b.s3.eu-de.cloud-object-storage.appdomain.cloud/CowlculatorDB.csv"
            className="btn"
            style={{ minHeight: "30px !important" }}
          >
            DOWNLOAD
          </a>
        </div>
      )}
      {login?.userType === "farmer" && <></>}
    </>
  );
}

export default ResearcherDatas;
