import React from "react";
import classes from "./form.module.css";
import { Link } from "react-router-dom";
const LoginForm = (props) => {
  return (
    <>
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
            placeholder="Введите логин"
          />
          <input
            type="password"
            className={classes.formInput}
            onChange={(e) => props.setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
          <button type="submin" className={classes.button}>
            Вход
          </button>
        </form>
        <div className={classes.data}>
          <h2>Данные для входа: </h2>
          <div>Логин: o.putintseazzaa</div>
          <div>Пароль: m4rgm3wX56</div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
