import React, { useState } from "react";
import sendIcon from "../../assets/svg/send.svg";
import back_arrow from "../../assets/svg/back-arrow.svg";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));
function RenderInput({
  formInput,
  indexQuestion,
  setAnswer,
  answer,
  sendAnswer,
  isButtonDisplay = false,
  goPrecedentQuestion,
  question,
  setUnit,
}) {
  const [checked, setChecked] = useState(
    typeof answer === "boolean" ? answer : false
  );

  return (
    <div id={"input_" + indexQuestion} className={"response-input"}>
      {isButtonDisplay && indexQuestion !== "farm_state" && (
        <button className="btn-back" onClick={goPrecedentQuestion}>
          <img src={back_arrow} alt="" width="40px"></img>
        </button>
      )}
      {question.formInput?.type === "checkbox" ? (
        <div className="switch-yes-no">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>NO</Typography>
            <AntSwitch
              autoFocus
              onKeyUp={(event) => {
                if (event.code === "Enter") {
                  sendAnswer();
                  setTimeout(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                  }, 50);
                }
              }}
              checked={checked}
              inputProps={{ "aria-label": "ant design" }}
              onChange={(event) => {
                setChecked(event.target.checked);
                setAnswer(event.target.checked ? true : "NO");
              }}
            />
            <Typography>YES</Typography>
          </Stack>
        </div>
      ) : question.formInput?.type === "select" &&
        typeof question.userValue === "object" ? (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Portion</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={answer || ""}
              label="Portion"
              onKeyUp={(event) => {
                if (event.code === "Enter") {
                  sendAnswer();
                  setTimeout(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                  }, 50);
                }
              }}
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
            >
              {question.userValue.map((value, index) => (
                <MenuItem value={value} key={value + index}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ) : (
        <input
          type={formInput?.type}
          onKeyUp={(event) => {
            if (event.code === "Enter") {
              sendAnswer();
              setTimeout(() => {
                window.scrollTo(0, document.body.scrollHeight);
              }, 50);
            }
          }}
          autoFocus
          onChange={(event) => {
            setAnswer(
              answer && formInput?.type === "number"
                ? { ...answer, value: event.target.value }
                : formInput?.type === "number"
                ? {
                    value: event.target.value,
                    unit:
                      typeof question?.userValue?.unit === "string"
                        ? question?.userValue?.unit
                        : "",
                  }
                : event.target.value
            );
          }}
          value={
            formInput?.type === "number" && answer ? answer.value : answer || ""
          }
        />
      )}
      {question.userValue.unit &&
        typeof question.userValue.unit === "string" && (
          <p>{question.userValue.unit}</p>
        )}
      {question.userValue.unit && typeof question.userValue.unit === "object" && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Unit</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={answer?.unit || ""}
              label="Age"
              onChange={(event) => {
                setAnswer({ ...answer, unit: event.target.value });
                setUnit(event.target.value);
              }}
            >
              {question.userValue.unit.map((unit, index) => (
                <MenuItem value={unit} key={unit + index}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      {isButtonDisplay && (
        <button
          className="btn"
          id={`button-${question.id}`}
          onClick={() => {
            sendAnswer();
            setTimeout(() => {
              window.scrollTo(0, document.body.scrollHeight);
            }, 50);
          }}
        >
          <img src={sendIcon} alt=""></img>
        </button>
      )}
    </div>
  );
}

export default RenderInput;
