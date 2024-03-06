import React from "react";
import Header from "../../../components/general/header";
import Navigation from "../../../components/general/navigation";
import classes from "./ChangeUsers.module.css";
import TableTR from "./tableTR";

const ChangeUsers = () => {
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
              <label htmlFor="select" className={classes.filterSelectLabel}>
                Фильтр:
              </label>
              <select name="" id="select" className={classes.filterSelect}>
                <option value="">Значение 1</option>
                <option value="">Значение 2</option>
                <option value="">Значение 3</option>
              </select>
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
