import React from "react";
import classes from "./traning.module.css";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

<Navigate />;

const Final = () => {
  function nav() {
    return <Navigate to="../" />;
  }
  return (
    <div className={classes.theoryContainer}>
      <div className={classes.finalText}>Вы молодец!!!</div>

      <Button onClick={() => nav() } className={classes.BtnFinalTest}>
        <Link className={classes.linkFinalTest} style={{ textDecoration: "none" }} to="../pages/traning">
          Вернуться назад
        </Link>{" "}
      </Button>
    </div>
  );
};

export default Final;
