import React from "react";
import classes from "./form.module.css";
import { Link } from "react-router-dom";

const RegistForm = (props) => {
  console.log(props);
  return (
    <div className={classes.mainContainer}>
      <section className={classes.formContainer}>
        <form
          action=""
          className={classes.form_container}
          onSubmit={props.handleSubmit}
        >
          <input
            type="text"
            className={classes.formInput}
            onChange={(e) => props.setUsername(e.target.value)}
            placeholder="Введите email"
          />
          <input
            type="password"
            className={classes.formInput}
            onChange={(e) => props.setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
          <input
            type="password"
            className={classes.formInput}
            onChange={(e) => props.setPassword(e.target.value)}
            placeholder="Повторите пароль"
          />
          <button type="submin" className={classes.button}>
            Регистрация
          </button>
          {/* <button className={classes.button}>Войти</button> */}
        </form>
      </section>
    </div>
  );
};

export default RegistForm;
