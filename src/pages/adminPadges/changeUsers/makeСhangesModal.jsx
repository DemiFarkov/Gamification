import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import classes from "./ChangeUsers.module.css";
const MakeHangesModal = (props) => {
  const { modalOpen, setModalOpen } = props;
  const [roleChange, SetRoleChange] = useState("");
  const [postChange, SetPostChange] = useState("");
  const styleSelect = {
    margin:".5vw",
    "& .MuiOutlinedInput-notchedOutline": {
      
      
    },
    "& .MuiOutlinedInput-root:hover": {
      
    },
  };
  const styleTextField = {
    margin:".5vw",
  };
  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      sx={{
        "& .MuiDialog-paper": { width: "80vw !important", maxHeight:"100%" },
        "& .MuiDialogContent-root": { padding: "1vw 2vw" },
      }}
    >
      <DialogTitle>Изменение пользователя</DialogTitle>
      <DialogContent>
        <div className={classes.modalContentContainer}>
          <TextField sx={styleTextField} label="ФИО" />
          <TextField sx={styleTextField} label="Логин" />
          <TextField sx={styleTextField} label="Карма" />
          <TextField sx={styleTextField} label="A-coin" />
          <TextField sx={styleTextField} label="Опыт" />

          <FormControl sx={styleSelect}>
            <InputLabel id="postChange">Должность</InputLabel>
            <Select
              id="postChange"
              value={postChange}
              onChange={(event) => {
                SetPostChange(event.target.value);
              }}
              label="Должность"
            >
              <MenuItem value={"Не выбрано"}>Не выбрано</MenuItem>
              <MenuItem value={"Оператор ТП"}>Оператор ТП</MenuItem>
              <MenuItem value={"Специалист ТП"}>Специалист ТП</MenuItem>
              <MenuItem value={"Консультант ТП"}>Консультант ТП</MenuItem>
            </Select>
          </FormControl>
          <TextField sx={styleTextField} label="Дата регистрации" />
          <FormControl sx={styleSelect}>
            <InputLabel id="roleChange">Роль</InputLabel>
            <Select
              id="roleChange"
              value={roleChange}
              onChange={(event) => {
                SetRoleChange(event.target.value);
              }}
              label="Роль"
            >
              <MenuItem value={"Не выбрано"}>Не выбрано</MenuItem>
              <MenuItem value={"Пользователь"}>Пользователь</MenuItem>
              <MenuItem value={"Модератор"}>Модератор</MenuItem>
              <MenuItem value={"Администратор"}>Администратор</MenuItem>
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions><Button onClick={() => setModalOpen(false)}>Отмена</Button><Button>Сохранить</Button></DialogActions>
    </Dialog>
  );
};

export default MakeHangesModal;
