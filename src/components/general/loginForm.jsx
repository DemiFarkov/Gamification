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
        <div className={classes.noLogin}>
          Нет учетной записи?{" "}
          <Link to="./components/general/registForm">
            Зарегистрироваться
          </Link>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
