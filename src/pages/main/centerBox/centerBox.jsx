import React from "react";
import classes from "../main.module.css";
import History from "./history";
import News from "./news";

const CenterBox = () => {
  return (
    <div>
      <History />
      <h1 className={classes.Lenta}>Лента</h1>
      <News />
    </div>
  );
};

export default CenterBox;
