import React, { useState } from "react";
import classes from "./creatingUser.module.css";
import Header from "../../components/general/header";
import Navigation from "../../components/general/navigation";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {
  Button,
  MenuItem,
  TextField,
  ThemeProvider,
  createTheme,
  outlinedInputClasses,
  useTheme,
} from "@mui/material";
import { lime } from "@mui/material/colors";
import { light } from "@mui/material/styles/createPalette";
import { Padding } from "@mui/icons-material";

const CreatingUser = () => {
  const buttonStyle = {
    color: "#fff",
    border: " .1vw solid #469C9A",
    borderRadius: "1vw",
    width: "49%",
  };
  const StyleTextField = {
    margin: "1vw",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #fff ",    
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
        border: "fff !important",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#cbd5dcd0 ",
    },
    "& .MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#e3f2fd",
    },
    "& input": {
      color: "#e3f2fd",
    },
    "& .MuiOutlinedInput-root": { color: "#e3f2fd" },textAlign:"start",
    "& .MuiOutlinedInput-root:hover": {
      color: "#e3f2fd",
      "& > fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiInput-input": {
      color: "#e3f2fd",
      textAlign: "start",
    },
    "& button": {
      color: "#e3f2fd",marginRight:"1vw",
      
    },
    "& .MuiSelect-icon": {
        marginRight:"calc(1vw + 8px)",
      color: "#e3f2fd",
      
    },
  };
  const [valueDate, setValueDate] = useState(dayjs("01.01.2000"));
  const outerTheme = useTheme();
  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        <Navigation />
        <div className={classes.mainContent}>
          <h1 className={classes.title}>Создание пользователя</h1>
          <section className={classes.MidlleContent}>
            <div className={classes.MidlleContentDataBlock}>
              <ThemeProvider theme={customTheme(outerTheme)}>
                <TextField sx={StyleTextField} label="ФИО" />
                <TextField sx={StyleTextField} label="Почта" />
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue=""
                  sx={StyleTextField}
                >
                  <MenuItem value={"Не выбрано"}>Не выбрано</MenuItem>
                  <MenuItem value={"Оператор ТП"}>Оператор ТП</MenuItem>
                  <MenuItem value={"Специалист ТП"}>Специалист ТП</MenuItem>
                  <MenuItem value={"Консультант ТП"}>Консультант ТП</MenuItem>
                  <MenuItem value={"Координатор ТП"}>Координатор ТП</MenuItem>
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Дата рождения"
                    value={valueDate}
                    sx={StyleTextField}
                    onChange={(newValue) => setValueDate(newValue)}
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>
          </section>
          <div className={classes.BtnContainer}>
            <Button sx={buttonStyle}>Назад</Button>
            <Button sx={buttonStyle}>Создать</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatingUser;

const theme = createTheme({
  palette: {
    primary: {
      main: "#e3f2fd",
    },
  },
});

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#c3c5c7a8",
            "--TextField-brandBorderHoverColor": "#e0e9eee4",
            "--TextField-brandBorderFocusedColor": "#fff",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            "&::before, &::after": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            "&::before": {
              borderBottom: "2px solid var(--TextField-brandBorderColor)",
            },
            "&:hover:not(.Mui-disabled, .Mui-error):before": {
              borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
            },
            "&.Mui-focused:after": {
              borderBottom:
                "2px solid var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });
