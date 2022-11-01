import React from "react";
import Alert from "@mui/material/Alert";
const AlertComponent = ({ severity, messageAlert }) => {
  // Severity values = error, warning, info ou success
  return (
    <div className="alert-message">
      <Alert
        sx={{ width: "100%", justifyContent: "center" }}
        severity={severity}
      >
        {messageAlert}
      </Alert>
    </div>
  );
};

export default AlertComponent;
