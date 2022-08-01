import React from "react";

function RenderInput({ formInput }) {
  if (formInput.type === "date") {
    return <input type="date" />;
  } else if (formInput.type === "number") {
    return <input type="number"></input>;
  } else if (formInput.type === "select") {
    return <input type="select"></input>;
  } else if (formInput.type === "checkbox") {
    return <input type="checkbox"></input>;
  } else {
    return <div>{formInput.type}</div>;
  }
}

export default RenderInput;
