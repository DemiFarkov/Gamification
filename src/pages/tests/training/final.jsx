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
    <div className={classes.finalContainer}>
      <div className={classes.finalText}>Тест завершен</div>
      <div className={classes.finalText} style={{fontSize:"1.3vw"}}>Просмотр результатов недоступен</div>
      <div className={classes.BtnFinalTestContainer}>
        <Button onClick={() => nav()} className={classes.BtnFinalTest}>
          <Link
            className={classes.linkFinalTest}
            style={{ textDecoration: "none" }}
            to="../pages/tests/traning"
          >
            Вернуться к тестам
          </Link>{" "}
        </Button>
      </div>
    </div>
  );
};

export default Final;
