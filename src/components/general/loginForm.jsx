import React from "react";
import classes from "./form.module.css";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const LoginForm = (props) => {
  const { loginError, handleSubmit, setUsername, setPassword, load } = props;
  return (
    <>
      <section
        className={classes.formContainer}
        style={loginError ? { borderRadius: "0 0 1vw 1vw" } : {}}
      >
        <div className={classes.loginErrorContainer}>
          {" "}
          {loginError && (
            <div className={classes.loginError}>
              Неправильный логин или пароль
            </div>
          )}
        </div>
        <form
          action=""
          className={classes.form_container}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className={classes.formInput}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введите логин"
          />
          <input
            type="password"
            className={classes.formInput}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
          <button type="submin" className={classes.button}>
            {load ? <CircularProgress sx={{fontSize:"1.4vw",width:"1.4vw !important",height:"1.4vw !important"}}/> : "Вход"}
          </button>
        </form>
      </section>
    </>
  );
};

export default LoginForm;
