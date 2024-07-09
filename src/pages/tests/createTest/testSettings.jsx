import React from "react";
import TestSettingsInput from "./testSettingsInput";
import classes from "./test.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {  MenuItem, Select } from "@mui/material";

const TestSettings = (props) => {
  const {
    inputAchievement,
    achievementsOption,
    valueAchievementSelect,
    setValueAchievementSelect,
  } = props;

  return (
    <div className={classes.TestSettingsInputBlock}>
      <div className={classes.TestSettingsInputTitle}>Настройки</div>
      <TestSettingsInput
        type={"number"}
        title={"Время (минуты) на прохождение теста"}
        text={"Введите кол-во времени..."}
        min="0"
        max="100000"
        id={"timeForTest"}
      />
      <TestSettingsInput
        type={"number"}
        title={"Минимальное количество опыта"}
        text={"Введите кол-во опыта..."}
        min="0"
        max="100000"
        id={"EXPForTest"}
      />
      <TestSettingsInput
        type={"number"}
        title={"Минимальная карма"}
        text={"Введите кол-во кармы..."}
        min="0"
        max="100"
        id={"KarmaForTest"}
      />
      <TestSettingsInput
        type={"number"}
        title={"Доступен для повторного прохождения"}
        text={"Введите кол-во дней..."}
        min="0"
        max="100000"
        id={"dayForTest"}
      />
      <TestSettingsInput
        type={"number"}
        title={"Баллов для прохождения теста"}
        text={"Введите кол-во баллов..."}
        min="0"
        max="100000"
        id={"MinPointsForTest"}
      />
      <div className={classes.TestSettingsinputWrapper}>
        <div className={classes.TestSettingsinputName}>
          Достижение за прохождение теста
        </div>
        <Select
          id="valueAchievementSelect"
          value={valueAchievementSelect}
          disabled
          onChange={(event) => {
            setValueAchievementSelect(event.target.value);
          }}
          sx={{
            borderRadius: "3vw",
            lineHeight: "normal",
            minHeight: "1px",
            "& .MuiSelect-outlined": {
              padding: ".7vw",
              fontSize: ".95vw",
              minHeight: "1em !important",
              background: "#D9D9D9",
              borderRadius: "3vw",
              color: "#000",
              outline: "none",
              textAlign: "start",
              display: "flex",
              alignItems: "center",
            },
            "& fieldset": {
              padding: ".7vw",
              fontSize: ".95vw",
              borderRadius: "3vw",
              border: "none",
              outline: "none",
            },
            "& .MuiSelect-select": { minHeight: "1px !important" },
            "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input:focus":
              {
                borderRadius: "3vw",
                outline: "none",
              },
            "& .Mui-error": { border: "#d42929 .15vw solid", color: "#d42929" },
          }}
        >
          <MenuItem value={"Без достижения"}>Без достижения</MenuItem>
          {achievementsOption.map((el, index) => (
            <MenuItem key={index} value={el.id}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
        <div className={classes.TestSettingsDiv}>
          <span>4</span>
          {inputAchievement && (
            <div className={classes.svgDiv}>
              <ExpandMoreIcon color="action" sx={{ fontSize: "1.1vw" }} />
            </div>
          )}
        </div>
      </div>
      <TestSettingsInput
        type={"number"}
        title={"Награда (ACoins) "}
        text={"Введите кол-во ACoins..."}
        min="0"
        max="100000"
        id={"quantityCoins"}
      />
      <TestSettingsInput
        type={"number"}
        title={"Награда (опыт) "}
        text={"Введите кол-во опыта..."}
        min="0"
        max="100000"
        id={"quantityEXP"}
      />
    </div>
  );
};

export default TestSettings;

const SelectFromTestSettings = (props) => {
  const { text, setValueAchievementSelect } = props;
  return (
    <div
      className={classes.TestSettingsDiv}
      onClick={() => setValueAchievementSelect([`${text}`, 0])}
    >
      <span className={classes.TestSettingsDivText}>{text}</span>
    </div>
  );
};
