import React from "react";
import TestSettingsInput from "./testSettingsInput";
import classes from "./test.module.css";

const TestSettings = () => {
  return (
    <div className={classes.TestSettingsInputBlock}>
      <div className={classes.TestSettingsInputTitle}>Настройки</div>
      <TestSettingsInput
        type={"number"}
        title={"Время (Секунды)"}
        text={"Введите время на прохождение теста..."}
      />
      <TestSettingsInput
        type={"number"}
        title={"Опыт"}
        text={"Введите минимальное кол-во опыта..."}
      />
      <TestSettingsInput
        type={"number"}
        title={"Карма"}
        text={"Введите минимальное кол-во кармы..."}
      />
      <TestSettingsInput
        type={"number"}
        title={"Доступен для повторного прохождения"}
        text={"Введите кол-во дней..."}
      />
      <TestSettingsInput
        type={"number"}
        title={"Баллов для прохождения"}
        text={"Введите минимальное кол-во баллов..."}
      />
      <TestSettingsInput
        type={"text"}
        title={"Достижение за прохождение теста"}
        text={"Это будет Select"}
      />
      <TestSettingsInput
        type={"number"}
        title={"ACoins"}
        text={"Введите кол-во ACoins..."}
      />
      <TestSettingsInput
        type={"number"}
        title={"Опыт"}
        text={"Введите кол-во опыта..."}
      />
    </div>
  );
};

export default TestSettings;
