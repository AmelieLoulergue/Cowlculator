import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function ResearcherDatas({ login, allResults }) {
  console.log(allResults);
  const headers = allResults[0]?.map((element) => element.id);
  const columnsTest = headers?.map((header) => {
    return {
      field: header,
      headerName: header.replaceAll("_", " "),
      width: 100,
    };
  });
  const rowsTest = allResults.map((result) =>
    result.map((item) => {
      if (typeof item.response === "object") {
        return `${item.response.value} ${item.response.unit}`;
      } else {
        return item.response;
      }
    })
  );
  const rowsTest2 = rowsTest.map((row, indexRow) =>
    Object.assign(
      ...headers.map((header, index) => {
        if (index === 0) {
          return { id: indexRow, [`${header}`]: row[index] };
        }
        return { [`${header}`]: row[index] };
      })
    )
  );
  console.log(rowsTest2);
  let empty = [];
  rowsTest2.map((row) => {
    Object.entries(row).map((rowItem) => {
      if (
        rowItem[1] === 0 ||
        rowItem[1] === undefined ||
        typeof rowItem[1] === "boolean"
      ) {
        empty.push(rowItem[0]);
      }
    });
  });
  console.log(empty);
  const counts = {};
  empty.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  console.log(counts);
  let emptyKeys = Object.entries(counts)
    .map((element) => {
      if (element[1] === allResults.length) {
        return element[0];
      }
    })
    .filter((element) => element !== undefined);
  let test44 = columnsTest?.filter(
    (column) => !emptyKeys.find((key) => key === column.field)
  );

  let test45 = rowsTest2.map((row) =>
    Object.assign(
      ...Object.entries(row)
        .map((element) => {
          if (!emptyKeys.find((key) => key === element[0])) {
            return { [`${element[0]}`]: element[1] };
          }
        })
        .filter((element) => element !== undefined)
    )
  );

  console.log(test45);
  return (
    <>
      {(login?.userType === "researcher" ||
        login?.email === "cowlculator.example@gmail.com") && (
        <>
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <h2 className="has-text-centered">
              🔬
              <br /> Hello {login.email} ! <br />
              Happy to see you !{" "}
            </h2>
            <p
              className="has-text-centered"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              You can download all the data as csv by clicking on this button : <br />
              <div style={{ padding: "1rem" }}>
                <a
                  href="https://clous-storage-carbonb-cos-standard-26b.s3.eu-de.cloud-object-storage.appdomain.cloud/CowlculatorDB.csv"
                  className="btn"
                  style={{
                    minHeight: "20px !important",
                    height: "20px",
                    width: "fit-content",
                  }}
                >
                  DOWNLOAD ALL
                </a>
              </div>
              or filter and hide the columns that do not interest you then click
              on export and download only the table displayed here in csv!
            </p>
          </div>
          <div
            style={{
              height: 400,
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <DataGrid
              rows={test45 ? test45 : []}
              columns={test44 ? test44 : []}
              pageSize={10}
              rowsPerPageOptions={[10]}
              onFilterModelChange={(event) => console.log(event.items)}
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        </>
      )}
      {login?.userType === "farmer" && <></>}
    </>
  );
}

export default ResearcherDatas;
