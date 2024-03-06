import React from "react";
import classes from "./players.module.css";
import ProgressBar from "../profil/progressBar/progressBar";
import Coin from "../../img/img_profil/image_52.png";
import Сharisma from "../../img/img_profil/image_53.png";
import Сircle from "../../img/img_profil/Ellipse_7.png";
import main from "../../img/pngwing2.png";

const CardPlayer = () => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.title}>
        <img src={Сircle} alt="" className={classes.titleImg} />
        <div className={classes.titleName}>Михаил Саранчук</div>
      </div>

      <img src={main} alt="" className={classes.mainImg} />

      <div className={classes.status}>Новичек</div>
      <ProgressBar completed={60} />

      <div className={classes.resurses}>
        <div className={classes.resursesItem}>
          <img src={Coin} alt="" /> 1000
        </div>
        <div className={classes.resursesItem}>
          <img src={Сharisma} alt="" /> 100
        </div>
      </div>
    </div>
  );
};

export default CardPlayer;
