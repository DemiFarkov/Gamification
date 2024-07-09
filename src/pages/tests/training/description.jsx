import { Button } from "@mui/material";
import React from "react";
import classes from "./traning.module.css";
import { Link } from "react-router-dom";

const Description = (props) => {
  const { setVisibleDescription, text,img } = props;
  return (
    <div className={classes.descriptionContainer}>
      <div className={classes.descriptionMainText}>{text} </div>
      <div className={classes.descriptionGoodLuck}>Желаем удачи!</div>
      <img className={classes.img} src={img} alt="ой" />
      <div className={classes.descriptionBtnContainer}>
        <Button className={classes.descriptionBtn}>
          {" "}
          <Link className={classes.descriptionBtnLink} to="../pages/tests/traning">
            Назад
          </Link>
        </Button>
        <Button
          className={classes.descriptionBtn}
          onClick={() => setVisibleDescription(false)}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default Description;
