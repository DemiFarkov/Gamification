import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import classes from "./ChangeUsers.module.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NumberInputBasic from "./numberInput";
import { Alarm, CheckBox, InputOutlined } from "@mui/icons-material";
import { instance } from "../../../utils/axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../../components/general/styles.css";

const MakeHangesModal = (props) => {
  const { modalOpen, setModalOpen, positions, groups, data } = props;

  const [roleChange, SetRoleChange] = useState(data.groups[0]);
  const [postChange, SetPostChange] = useState(data.position);

  const [lastName, SetlastName] = useState(data.last_name);
  const [firstName, SetFirstName] = useState(data.first_name);
  const [login, SetLogin] = useState(data.username);
  const [karma, SetKarma] = useState(data.karma);
  const [acoin, SetAcoin] = useState(data.acoin_amount);
  const [EPX, SetEPX] = useState(data.experience);
  const [email, SetEmail] = useState(data.email);
  const [valueDate, setValueDate] = useState(dayjs(data.birth_date));
  const [sendMessage, setSendMessage] = useState(false);
  const [sendMessageSuccess, setSendMessageSuccess] = useState(false);


  function changeUser() {
    if (
      lastName == "" ||
      firstName == "" ||
      login == "" ||
      karma == "" ||
      acoin == "" ||
      EPX == "" ||
      email == "" ||
      valueDate == "" ||
      roleChange == "Не выбрано" ||
      postChange == "Не выбрано"
    ) {
      document.querySelector(`.${classes.modalError}`).style.display = "block";
    } else {
      document.querySelector(`.${classes.modalError}`).style.display = "none";

      setSendMessageSuccess(false);

      setTimeout(() => {
        setSendMessage(true);
      }, sendMessageSuccess ? 600 : 0);
    }
    let birth_date = `${valueDate.$y}-${
      valueDate.$M + 1 < 10 ? "0" + (valueDate.$M + 1) : valueDate.$M + 1
    }-${valueDate.$D < 10 ? "0" + valueDate.$D : valueDate.$D}`;
    let userData = {
      username: login,
      first_name: firstName,
      last_name: lastName,
      email: email,
      position: postChange,
      experience: EPX,
      karma: karma,
      birth_date: birth_date,
      acoin_amount: acoin,
      groups: [roleChange],
    };
    instance
      .patch(`employee/update/${data.id}/`, userData)
      .then(function (response) {
        setTimeout(() => {
          setSendMessage(false);
        }, sendMessageSuccess ? 1100 : 500);
        setTimeout(() => {
          setSendMessageSuccess(true);
        }, sendMessageSuccess ? 1700 : 1100);
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
  }
  const styleSelect = {
    margin: ".5vw",
    "& .MuiOutlinedInput-notchedOutline": {},
    "& .MuiOutlinedInput-root:hover": {},
  };
  const styleTextField = {
    margin: ".5vw",
  };
  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      sx={{
        "& .MuiDialog-paper": { width: "80vw !important", maxHeight: "90%" },
        "& .MuiDialogContent-root": { padding: "1vw 2vw" },
      }}
    >
      <DialogTitle sx={{ position: "relative" }}>
        Изменение пользователя
        <div className="modalErrorContainer">
          <CSSTransition
            in={sendMessage}
            timeout={500}
            classNames="modalError"
            mountOnEnter
            unmountOnExit
          >
            <div className="modalError" style={{ background: "#697b95" }}>
              Отправка изменений
            </div>
          </CSSTransition>
          <CSSTransition
            in={sendMessageSuccess}
            timeout={500}
            classNames="modalError"
            mountOnEnter
            unmountOnExit
          >
            <div className="modalError">Изменение успешно!</div>
          </CSSTransition>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={classes.modalContentContainer}>
          <TextField
            sx={styleTextField}
            label="Фамилия"
            value={lastName}
            error={lastName == "" && true}
            onChange={(event) => {
              SetlastName(event.target.value);
            }}
          />
          <TextField
            sx={styleTextField}
            label="Имя"
            value={firstName}
            error={firstName == "" && true}
            onChange={(event) => {
              SetFirstName(event.target.value);
            }}
          />
          <TextField
            sx={styleTextField}
            label="Логин"
            error={login == "" && true}
            value={login}
            onChange={(event) => {
              SetLogin(event.target.value);
            }}
          />
          <TextField
            sx={styleTextField}
            label="Email"
            error={email == "" && true}
            value={email}
            onChange={(event) => {
              SetEmail(event.target.value);
            }}
          />
          <FormControl sx={styleTextField}>
            <InputLabel htmlFor="karmaInput">Карма</InputLabel>
            <OutlinedInput
              type="number"
              label="Карма"
              id="karmaInput"
              value={karma}
              error={karma == "" && true}
              onChange={(event) => {
                SetKarma(event.target.value);
              }}
            />
          </FormControl>
          <FormControl sx={styleTextField}>
            <InputLabel htmlFor="A-coinInput">A-coin</InputLabel>
            <OutlinedInput
              type="number"
              label="A-coin"
              id="A-coinInput"
              value={acoin}
              error={acoin == "" && true}
              onChange={(event) => {
                SetAcoin(event.target.value);
              }}
            />
          </FormControl>
          <FormControl sx={styleTextField}>
            <InputLabel htmlFor="EXPInput">Опыт</InputLabel>
            <OutlinedInput
              type="number"
              label="Опыт"
              id="EXPInput"
              value={EPX}
              error={EPX == "" && true}
              onChange={(event) => {
                SetEPX(event.target.value);
              }}
            />
          </FormControl>
          <FormControl sx={styleSelect}>
            <InputLabel id="postChange">Должность</InputLabel>
            <Select
              id="postChange"
              value={postChange}
              error={postChange == "Не выбрано" && true}
              onChange={(event) => {
                SetPostChange(event.target.value);
              }}
              label="Должность"
            >
              <MenuItem value={"Не выбрано"}>Не выбрано</MenuItem>
              {positions.map((el, index) => (
                <MenuItem value={el} key={index}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="День рождения"
              value={valueDate}
              id="birthday"
              sx={styleSelect}
              onChange={(newValue) => setValueDate(newValue)}
            />
          </LocalizationProvider>
          <FormControl sx={styleSelect}>
            <InputLabel id="roleChange">Роль</InputLabel>
            <Select
              id="roleChange"
              value={roleChange}
              error={roleChange == "Не выбрано" && true}
              onChange={(event) => {
                SetRoleChange(event.target.value);
              }}
              label="Роль"
            >
              <MenuItem value={"Не выбрано"}>Не выбрано</MenuItem>
              {groups.map((el, index) => (
                <MenuItem value={el.id} key={index}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <div className={classes.modalError}>Необходимо заполнить все поля!</div>
        <Button onClick={() => setModalOpen(false)}>Отмена</Button>
        <Button onClick={() => changeUser()}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MakeHangesModal;
