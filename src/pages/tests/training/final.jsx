import React from "react";
import classes from "./traning.module.css";
import { Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

<Navigate />;

const Final = (props) => {
  const { test_attempt_id } = props;
  const navigate = useNavigate();
  function nav() {
    return <Navigate to="../" />;
  }
  function click() {
    navigate(
      { pathname: "../pages/traning"},
    );
  }
  return (
    <div className={classes.theoryContainer}>
      <div className={classes.finalText}>Вы молодец!!!</div>
      <div className={classes.BtnFinalTestContainer}>
        <Button onClick={() => nav()} className={classes.BtnFinalTest}>
          <Link
            className={classes.linkFinalTest}
            style={{ textDecoration: "none" }}
            to="../pages/traning"
          >
            Вернуться назад
          </Link>{" "}
        </Button>
        <Button onClick={() => nav()} className={classes.BtnFinalTest}>
          <Link
            className={classes.linkFinalTest}
            style={{ textDecoration: "none" }}
            to="../pages/traning/result"
          >
            Посмотреть результаты
          </Link>{" "}
        </Button>
        <Button onClick={() => click()}>asdfad</Button>
      </div>
    </div>
  );
};

export default Final;
