import React, { useEffect, useRef, useState } from "react";
import classes from "./creatingUser.module.css";
import Header from "../../components/general/header";
import Navigation from "../../components/general/navigation";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { instance } from "../../utils/axios/index.js";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  ThemeProvider,
  createTheme,
  outlinedInputClasses,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CSSTransition } from "react-transition-group";
import "../../components/general/styles.css";
import { useNavigate } from "react-router-dom";

const CreatingUser = () => {
  const navigate = useNavigate()
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [postSelect, setPostSelect] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [dataSended, setDataSended] = useState(false);

  const [positions, setPositions] = useState([]);
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
    "& .MuiOutlinedInput-root": { color: "#e3f2fd" },
    textAlign: "start",
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
      color: "#e3f2fd",
      marginRight: "1vw",
    },
    "& .MuiSelect-icon": {
      marginRight: "calc(1vw + 8px)",
      color: "#e3f2fd",
    },
  };
  const [valueDate, setValueDate] = useState(dayjs("01.01.2000"));
  const outerTheme = useTheme();
  useEffect(() => {
    instance.get("positions/").then(function (response) {
      setPositions(response.data.positions);
    });
  }, []);
  function sendingData(e) {
    e.preventDefault();
    let reg = /[a-zA-Z0-9]*\.[a-zA-Z0-9]*@autotrade.su/gm;
    if (reg.test(email)) {
      let birth_date = `${valueDate.$y}-${
        valueDate.$M + 1 < 10 ? "0" + (valueDate.$M + 1) : valueDate.$M + 1
      }-${valueDate.$D < 10 ? "0" + valueDate.$D : valueDate.$D}`;
      let data = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        email: email,
        position: postSelect,
        birth_date: birth_date,
      };
      console.log(data);
      instance
        .post(`api/register/`, data)
        .then(function (response) {
          console.log(response);
          setPassword(response.data.generated_password);
          setDataSended(true);
        })
        .catch(function (response) {
          console.log(response);
        });
    } else {
      setEmailError(true);
    }
  }

  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        <Navigation />
        <div className={classes.mainContent}>
          <h1 className={classes.title}>Создание пользователя</h1>
          <form
            autoomplete="off"
            onSubmit={(e) => {
              sendingData(e);
            }}
          >
            <section className={classes.MidlleContent}>
              <div className={`MidlleContentDataBlock`}>
                <ThemeProvider theme={customTheme(outerTheme)}>
                  <TextField
                    onChange={(event) => setFirstNameValue(event.target.value)}
                    id="firstNameValue"
                    sx={StyleTextField}
                    label="Имя"
                    required
                    InputProps={{
                      autoComplete: "off",
                    }}
                  />
                  <TextField
                    onChange={(event) => setLastNameValue(event.target.value)}
                    id="lastNameValue"
                    sx={StyleTextField}
                    label="Фамилия"
                    required
                    InputProps={{
                      autoComplete: "off",
                    }}
                  />
                  <TextField
                    onChange={(event) => setEmail(event.target.value)}
                    id="Email"
                    error={emailError}
                    helperText={
                      emailError
                        ? 'Адрес должен быть формата "e.example@autotrade.su"'
                        : ""
                    }
                    sx={StyleTextField}
                    label="Почта"
                    required
                    InputProps={{
                      autoComplete: "off",
                    }}
                  />
                  <TextField
                    onChange={(event) => setPostSelect(event.target.value)}
                    id="postSelect"
                    select
                    label="Должность"
                    defaultValue=""
                    sx={StyleTextField}
                    required
                  >
                    <MenuItem value={"Не выбрано"}>Не выбрано</MenuItem>
                    {positions.map((el,index) => (
                      <MenuItem value={el} key={index}>
                        {el}
                      </MenuItem>
                    ))}                    
                  </TextField>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Дата рождения"
                      value={valueDate}
                      id="birthday"
                      sx={StyleTextField}
                      onChange={(newValue) => setValueDate(newValue)}
                    />
                  </LocalizationProvider>
                </ThemeProvider>
              </div>
              <CSSTransition
                unmountOnExit
                in={dataSended}
                classNames="successCreated"
                timeout={2000}
              >
                <div className="successCreated">
                  <h3 className={classes.successCreatedTitle}>
                    Пользователь успешно создан
                  </h3>
                  <div className={classes.successCreatedContanerData}>
                    <TextField
                      sx={{ margin: "2vw" }}
                      onChange={(event) => setLastNameValue(event.target.value)}
                      id="loginValue"
                      label="Логин"
                      InputProps={{
                        readOnly: true,
                        value: `${email.slice(0, email.indexOf("@"))}`,
                        autoComplete: "off",
                      }}
                    />
                    <FormControl sx={{ margin: "2vw" }} variant="outlined">
                      <InputLabel htmlFor="standard-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        readOnly={true}
                        id="standard-adornment-password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              onMouseDown={(e) => {
                                e.preventDefault();
                              }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                </div>
              </CSSTransition>
            </section>
            <div className={classes.BtnContainer}>
              <Button sx={buttonStyle} type="button" onClick={()=>{navigate(-1)}}>
                Назад
              </Button>
              <Button type="submit" sx={buttonStyle}>
                Создать
              </Button>
            </div>
          </form>
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
