import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { instance } from "../../utils/axios/index.js";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import classes from "./changePassword.module.css";
import { getPasswordPolicyRegexUseAuth } from "../../hooks/reduxHooks.js";

const ChangePassword = (props) => {
  const { setOpenChangePassword, openChangePassword } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [statePost, setStatePost] = useState("normal");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [passValue, setPassValue] = useState("");
  const [oldPassValue, setOldPassValue] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const passwordPolicyRegex = getPasswordPolicyRegexUseAuth();
  function postPassword() {
    let valid = true;
    passwordPolicyRegex.descriptions.map(
      (el, i) => (
        !passValue.match(el.regex) &&
          ((document.querySelector(`#passValidList${i}`).style.color =
            "#db2f2f"),
        (valid = false))
      )
    );
    if (valid) {
      if (repeatPassword == passValue) {
        setStatePost("normal");

        instance
          .post(`password-change/`, {
            old_password: oldPassValue,
            new_password: passValue,
          })
          .then((response) => {
            console.log(response.data);
            setStatePost("success");
          })
          .catch((response) => {
            console.log(response);
            setStatePost(response.response.data.message);
          });
      } else {
        setStatePost("errorRepeatPassword");
      }
    }
  }
  const TextFieldStyle = {
    margin: "1vw 0",
    borderRadius: "3vw",
    "& svg": {
      color: "#fff ",
    },
    "& .MuiInputBase-fullWidth .MuiFormControl-root": {
      width: "100% !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border:
        statePost == "normal"
          ? "1px solid #fff"
          : statePost == "success"
          ? "1px solid #52ce62"
          : statePost == "errorRepeatPassword" && "1px solid #db2f2f",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
        border:
          statePost == "normal"
            ? "1px solid #fff"
            : statePost == "success"
            ? "1px solid #52ce62"
            : statePost == "errorRepeatPassword" && "1px solid #db2f2f",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff ",
    },
    "& .MuiInputLabel-root": {
      color: "#fff ",
    },
    "& .MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": { color: "#fff" },
    "& .MuiOutlinedInput-root:active": { color: "#fff" },
    "& .MuiOutlinedInput-root:hover": {
      color: "#fff",
      "& > fieldset": {
        border:
          statePost == "normal"
            ? "1px solid #fff"
            : statePost == "success"
            ? "1px solid #52ce62"
            : statePost == "errorRepeatPassword" && "1px solid #db2f2f",
      },
    },
  };
  const passValidList1 = document.querySelector(`#passValidList1`);
  

  const buttonStyle = { color: "#fff", fontSize: "18px" };
  useEffect(() => {
    if (passValidList1) {
      passwordPolicyRegex.descriptions.map(
        (el, i) => (
          passValue.match(el.regex)
            ? (document.querySelector(`#passValidList${i}`).style.color =
                "#52ce62")
            : (document.querySelector(`#passValidList${i}`).style.color =
                "#fff")
        )
      );
    }
  }, [passValue]);
  return (
    <Dialog
      open={openChangePassword}
      onClose={() => {
        setOpenChangePassword(false);
      }}
      fullWidth={true}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          background: "#202833",
        },
      }}
    >
      <DialogTitle
        sx={{
          padding: "2vw 2vw 0 2vw !important",
          fontSize: "1.2vw",
          color: "#fff",
        }}
      >
        {statePost == "success" ? (
          <div>Пароль изменен</div>
        ) : (
          <div>Изменение пароля</div>
        )}
      </DialogTitle>
      <DialogContent sx={{ padding: "1vw 2vw 2vw 2vw !important" }}>
        <form>
          <div>
            <FormControl
              sx={{ ...TextFieldStyle, width: "100%" }}
              variant="outlined"
            >
              <InputLabel htmlFor="standard-adornment-password1">
                {statePost == "Старый пароль неверен."
                  ? "Пароль введен неверно!"
                  : "Введите старый пароль"}
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password1"
                label={
                  statePost == "Старый пароль неверен."
                    ? "Пароль введен неверно!"
                    : "Введите старый пароль"
                }
                error={statePost == "Старый пароль неверен." ? true : false}
                type={showOldPassword ? "text" : "password"}
                fullWidth={true}
                autoComplete="none"
                value={oldPassValue}
                onChange={(e) => {
                  e.target.value.match(/[а-яА-Я]/gm)
                    ? {}
                    : setOldPassValue(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {!showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className={classes.inputPasswordBlock}>
            <FormControl sx={TextFieldStyle} variant="outlined">
              <InputLabel htmlFor="standard-adornment-password2">
                Введите новый пароль
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password2"
                label="Введите новый пароль"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={passValue}
                onChange={(e) => {
                  e.target.value.match(/[а-яА-Я]/gm)
                    ? {}
                    : setPassValue(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => {
                        e.preventDefault();
                      }}
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className={classes.passwordValidationWrapper}>
              <ul className={classes.passwordValidationUl}>
                {Object.getOwnPropertyNames(passwordPolicyRegex).length !== 0 &&
                  passwordPolicyRegex.descriptions.map((el, i) => (
                    <li id={"passValidList" + i} key={i}>
                      {el.description}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div>
            <FormControl
              sx={{ ...TextFieldStyle, width: "100%" }}
              variant="outlined"
            >
              <InputLabel htmlFor="standard-adornment-password3">
                Подтвердите пароль
              </InputLabel>
              <OutlinedInput
                id="standard-adornment-password3"
                label="Подтвердите пароль"
                fullWidth={true}
                type={"password"}
                autoComplete="new-password"
                value={repeatPassword}
                onChange={(e) => {
                  e.target.value.match(/[а-яА-Я]/gm)
                    ? {}
                    : setRepeatPassword(e.target.value);
                }}
              />
            </FormControl>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpenChangePassword(false);
          }}
          sx={buttonStyle}
        >
          Отмена
        </Button>
        <Button
          sx={buttonStyle}
          onClick={() => {
            postPassword();
          }}
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePassword;
