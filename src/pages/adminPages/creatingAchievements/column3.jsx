import React from "react";
import classes from "./creatingAchievements.module.css";
import { Autocomplete, Button, TextField } from "@mui/material";
import {
  AutocompleteStyle,
  ButtonStyle,
  TextFieldStyle,
} from "../../../components/styles/styles";

const Column3 = (props) => {
  const {sendData} = props
  const FIOArr = [
    "Фарков Дмирий",
    "Саранчук Михаил",
    "Путнцев Олег",
    "Букреев Андрей",
    "Литвиненко Татьяна",
    "Черный Илья",
  ];
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
          options={FIOArr}
          getOptionLabel={(option) => option}
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
        <Button sx={{...ButtonStyle,width:"100%"}}>Присвоить</Button>
      </div>
      <Button sx={{...ButtonStyle,marginTop:"1vw", background:"#202833", fontSize:"24px",width:"100%"}} onClick={()=>{sendData()}}>Сохранить</Button>

      
    </div>
  );
};

export default Column3;
