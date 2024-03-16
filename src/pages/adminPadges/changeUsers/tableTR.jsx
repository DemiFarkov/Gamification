import React, { useState } from "react";
import classes from "./ChangeUsers.module.css";
import arrow from "../../../img/Arrow27.svg";

const TableTR = () => {
  const [visibleMenu, setVisibleMenu] = useState();
  return (
    <>
      <div
        className={classes.tableRow}
       
      >
        Джастин Тимберлейк
      </div>
      <div className={classes.tableRow}>d.timberlake@autotrade.su</div>
      <div className={classes.tableRow}>100</div>
      <div className={classes.tableRow}>1000</div>
      <div className={classes.tableRow}>200xp</div>
      <div className={classes.tableRow}>Певец ТП</div>
      <div className={classes.tableRow}>06.03.2024</div>
      <div className={classes.tableRowFlex}>
        <div className={classes.tableFlexRow}>Администратор </div>
        <img src={arrow} className={classes.tableRowArrow}  onClick={() => setVisibleMenu(!visibleMenu)} alt="" />
        <div
          className={
            visibleMenu
              ? classes.tableMenuContainer
              : classes.tableMenuContainerHidden
          }
        >
          <div className={classes.tableMenuContent}>Деактивировать</div>
          <div className={classes.tableMenuContent}>Управление ролями</div>
          <div className={classes.tableMenuContent}>Сброс пароля</div>
          <div className={classes.tableMenuContent}>Обновить адрес электронной почты</div>
          <div className={classes.tableMenuContent}>Отмена сессии</div>
          <div className={classes.tableMenuContent}>Редактировать инвентарь</div>
        </div>
      </div>
    </>
  );
};

export default TableTR;
