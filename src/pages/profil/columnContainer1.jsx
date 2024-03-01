import React from "react";
import classes from "./profil.module.css";
import Avatar from "../../img/image_51.png";
import ProgressBar from "./progressBar/progressBar";
import Coin from "../../img/img_profil/image_52.png";
import Сharisma from "../../img/img_profil/image_53.png";
import Сircle from "../../img/img_profil/Ellipse_7.png";
import Rog from "../../img/devil-clipart-sticker-9.png";
import { Link } from "react-router-dom";
const ColumnContainer1 = () => {
  // данные для progressBar
  const testData = [{ completed: 60 }];
  return (
    <div className={classes.columnContainer1}>
      <div className={classes.box1}>
        <img src={Сircle} alt="" />
        <Link to="../pages/main" className={classes.button}>
          <div className={classes.buttonText}>Михаил Саранчук</div>
        </Link>
      </div>

      <div className={classes.box2}>
        {/* <img className={classes.rog} src={Rog} alt="" /> */}
        <img src={Avatar} alt="ничего нет" className={classes.box2Img} />
      </div>

      <div className={classes.box3}>
        <h3 className={classes.box3H3}>Новичок</h3>
        {testData.map((item, idx) => (
          <ProgressBar key={idx} completed={item.completed} />
        ))}
        <div className={classes.resurses}>
          <div className={classes.resursesItem}>
            <img src={Coin} alt="" /> 1000
          </div>
          <div className={classes.resursesItem}>
            <img src={Сharisma} alt="" /> 100
          </div>
        </div>
      </div>

      <div className={classes.box4}>
        <h2>Персональные награды</h2>
      </div>
    </div>
  );
};

export default ColumnContainer1;
