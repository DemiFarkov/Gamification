import React, { useState } from "react";
import classes from "./creatingAchievements.module.css";
import { Autocomplete, Button, TextField } from "@mui/material";
import {
  AutocompleteStyle,
  ButtonStyle,
  TextFieldStyle,
} from "../../../components/styles/styles";
import { instance } from "../../../utils/axios";

const Column3 = (props) => {
  const { sendData, valueOldAchievements, allUsers } = props;

  const [listUsers, setListUsers] = useState("");
  function assignAchievement() {
    let users = [];

    valueOldAchievements !== 0
      ? (listUsers.map((el) => users.push(el.id)),
        console.log(users),
        instance
          .post(`assign-achievement/`, {
            employee_ids: users,
            achievement_id: valueOldAchievements,
          })
          .then((response) => {
            console.log(response.data);
            alert("Это успех")

            // dispatch(oldAchievementsData(response.data));
          }))
      : alert("Выберите созданное достижение");
  }
  console.log(allUsers)
  return (
    <div className={classes.column3}>
      <div className={classes.columnBlock}>
        <h3>Присвоить</h3>
        <Autocomplete
          sx={{
            ...AutocompleteStyle,
            marginTop: "1vw",
          }}
          multiple
          id="tags-outlined"
          options={allUsers}
          getOptionLabel={(option) =>
            `${option.first_name + " " + option.last_name}`
          }
          onChange={(event, newValue) => {
            setListUsers(newValue);
          }}
          // defaultValue={[top100Films[13]]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Выбор сотрудников"
              placeholder="Добавить"
            />
          )}
        />
        <div className={classes.greenLine}></div>
        <div className={classes.column3ButtonWrapper}></div>
        <Button
          sx={{ ...ButtonStyle, width: "100%" }}
          onClick={() => {
            assignAchievement();
          }}
        >
          Присвоить
        </Button>
        <Button
          sx={{ ...ButtonStyle, width: "100%", marginTop:"1vw" }}
          onClick={() => {
            assignAchievement();
          }}
        >
          Отозвать
        </Button>
      </div>
      <Button
        sx={{
          ...ButtonStyle,
          marginTop: "1vw",
          background: "#202833",
          fontSize: "24px",
          width: "100%",
        }}
        onClick={() => {
          sendData();
        }}
      >
        Сохранить
      </Button>
    </div>
  );
};

export default Column3;
