import React from "react";
import Logo from "../../img/img_main/pngwing_4.png";
import classes from "../main.module.css";

const HistoryPoint = () => {
  return (
    <div className={classes.historyContainer}>
      <img src={Logo} alt="" className={classes.historyLogo}/>
      <div className={classes.historyStatys}>Гений принтеров</div>
      <div className={classes.historyName}>Михаил Саранчук</div>
    </div>
  );
};

export default HistoryPoint;
