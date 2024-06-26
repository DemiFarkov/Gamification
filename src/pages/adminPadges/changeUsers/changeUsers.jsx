import React, { useState } from "react";
import Header from "../../../components/general/header";
import Navigation from "../../../components/general/navigation";
import classes from "./ChangeUsers.module.css";
import TableTR from "./tableTR";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Padding } from "@mui/icons-material";

const ChangeUsers = () => {
  const [roleFilter, SetRoleFilter] = useState("");
  const [postFilter, SetPostFilter] = useState("");


  const styleSelect = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#469C9A",
      color: "#fff",
      borderRadius: "3vw",
    },
    "& label": {
      color: "#fff ",
    },
    "& .MuiOutlinedInput-input": {
      color: "#fff !important",
      minWidth: "12vw",
    },
    "& svg": {
      color: "#fff ",
    },
    "& .MuiOutlinedInput-root:hover": {
      color: "#fff",
      "& > fieldset": {
        borderColor: "#469C9A",
      },
    },
  };
  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        <Navigation />
        <div className={classes.mainContent}>
          <h1 className={classes.title}>Редактор пользователей</h1>
          <div className={classes.filter}>
            <input type="text" className={classes.filterInput} />{" "}
            <div className={classes.filterSelectContainer}>
              <FormControl sx={styleSelect}>
                <InputLabel id="roleFilter">Роль</InputLabel>
                <Select
                  id="roleFilter"
                  value={roleFilter}
                  onChange={(event) => {
                    SetRoleFilter(event.target.value);
                  }}
                  label="Роль"
                >
                  <MenuItem value={"Не выбрано"}>Не выбрано</MenuItem>
                  <MenuItem value={"Пользователь"}>Пользователь</MenuItem>
                  <MenuItem value={"Модератор"}>Модератор</MenuItem>
                  <MenuItem value={"Администратор"}>Администратор</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={styleSelect}>
                <InputLabel id="postFilter">Должность</InputLabel>
                <Select
                  id="postFilter"
                  value={postFilter}
                  onChange={(event) => {
                    SetPostFilter(event.target.value);
                  }}
                  label="Должность"
                  sx={styleSelect}
                >
                  <MenuItem value={"Не выбрано"}>Не выбрано</MenuItem>
                  <MenuItem value={"Оператор ТП"}>Оператор ТП</MenuItem>
                  <MenuItem value={"Специалист ТП"}>Специалист ТП</MenuItem>
                  <MenuItem value={"Консультант ТП"}>Консультант ТП</MenuItem>
                  <MenuItem value={"Координатор ТП"}>Координатор ТП</MenuItem>

                </Select>
              </FormControl>
            </div>
          </div>

          <div className={classes.tableName}>
            <div className={classes.tableUser}>Пользователей</div>
            <div className={classes.tableLogin}>Логин</div>
            <div className={classes.tableKarma}>Карма</div>
            <div className={classes.tableCoin}>A-coin</div>
            <div className={classes.tableXP}>Опыт</div>
            <div className={classes.tableJob}>Должность</div>
            <div className={classes.tableDate}>Дата регистрации</div>
            <div className={classes.tableRol}>Роль </div>
          </div>
          <div className={classes.tableContainer}>
            <div className={classes.tableContent}>
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
              <TableTR />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeUsers;
