import React, { useState } from "react";
import TestSettingsInput from "./testSettingsInput";
import classes from "./test.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRef, useEffect } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

const TestSettings = () => {
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [valueSelect, setValueSelect] = useState("Выберите достижение");
  const [selectOption, setSelectOption] = useState([
    <SelectFromTestSettings
      key={0}
      setValueSelect={setValueSelect}
      text={"Не бьет током"}
    />,
    <SelectFromTestSettings
      key={2}
      setValueSelect={setValueSelect}
      text={"Последний герой"}
    />,
    <SelectFromTestSettings
      key={4}
      setValueSelect={setValueSelect}
      text={"Радость для начальника"}
    />,
  ]);
  
  const ref = useRef(null);
  useClickOutside(ref, () => {
    setVisibleSelect(false);
  });

  useEffect(() => {
    if (visibleSelect) {
      let selects = document.querySelectorAll(`.${classes.TestSettingsDiv}`);
      let vw = "vw";
      let count = 2.65;
      setTimeout(() => {
        for (let i = 1; i < selects.length; i++) {
          let final = count + vw;
          selects[i].style.top = final;
          count = count + 2.65;
        }
      }, 1);
    }
  }, [visibleSelect]);
  return (
    <div className={classes.TestSettingsInputBlock}>
      <div className={classes.TestSettingsInputTitle}>Настройки</div>
      <TestSettingsInput
        type={"number"}
        title={"Время (Секунды)"}
        text={"Введите время на прохождение теста..."}
        min="0"
        id={"timeForTest"}
      />
      <TestSettingsInput
        type={"number"}
        title={"Опыт"}
        text={"Введите минимальное уровень для прохождения..."}
        min="0"
        id={"EXPForTest"}

      />
      <TestSettingsInput
        type={"number"}
        title={"Карма"}
        text={"Введите минимальное кол-во кармы..."}
        min="0"
        max="100"
        id={"KarmaForTest"}

      />
      <TestSettingsInput
        type={"number"}
        title={"Доступен для повторного прохождения"}
        text={"Введите кол-во дней..."}
        min="0"
        id={"dayForTest"}

      />
      <TestSettingsInput
        type={"number"}
        title={"Баллов для прохождения"}
        text={"Введите минимальное кол-во баллов..."}
        min="0"
        id={"MinPointsForTest"}

      />
      <div className={classes.TestSettingsinputWrapper}>
        <div className={classes.TestSettingsinputName}>
          Достижение за прохождение теста
        </div>
        <div
          className={classes.TestSettingsDivWrapper}
          ref={ref}
          onClick={() => setVisibleSelect(!visibleSelect)}
        >
          <div className={classes.TestSettingsDiv} >
            <span>{valueSelect}</span>
            <ExpandMoreIcon color="action" sx={{ fontSize: "1.5vw" }} />
          </div>
          {visibleSelect && selectOption}
        </div>
      </div>
      <TestSettingsInput
        type={"number"}
        title={"ACoins"}
        text={"Введите кол-во ACoins..."}
        min="0"
        id={"quantityCoins"}


      />
      <TestSettingsInput
        type={"number"}
        title={"Опыт"}
        text={"Введите кол-во опыта..."}
        min="0"
        id={"quantityEXP"}

      />
    </div>
  );
};

export default TestSettings;

const SelectFromTestSettings = (props) => {
  const { text, setValueSelect } = props;
  return (
    <div
      className={classes.TestSettingsDiv}
      onClick={() => setValueSelect(`${text}`)}
    >
      <span className={classes.TestSettingsDivText}>{text}</span>
    </div>
  );
};
