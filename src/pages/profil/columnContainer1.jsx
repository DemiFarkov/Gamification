import React, { useState } from "react";
import classes from "./profil.module.css";
import ProgressBar from "./progressBar/progressBar";
import Coin from "../../img/img_profil/image_52.png";
import Сharisma from "../../img/img_profil/image_53.png";
import Сircle from "../../img/img_profil/Ellipse_7.png";
import Cookies from "js-cookie";
const ColumnContainer1 = () => {
  const [acoin] = useState(Cookies.get("acoin"));
  const [karma] = useState(Cookies.get("karma"));

  // данные для progressBar
  const testData = [{ completed: 60 }];
  return (
    <div className={classes.columnContainer1}>
      <div className={classes.box1}>
        <img src={Сircle} alt="" />

        <div className={classes.buttonText}>
          {Cookies.get("first_name") +" " + Cookies.get("last_name")}
        </div>
      </div>

      <div className={classes.box2}>
        <div className={classes.bgr}></div>
        {/* <img src={Avatar} alt="ничего нет" className={classes.box2Img} /> */}
      </div>

      <div className={classes.box3}>
        <h3 className={classes.box3H3}>Новичок</h3>
        {testData.map((item, idx) => (
          <ProgressBar key={idx} completed={item.completed} />
        ))}
        <div className={classes.resurses}>
          <div className={classes.resursesItem}>
            <img src={Coin} alt="" /> {acoin}
          </div>
          <div className={classes.resursesItem}>
            <img src={Сharisma} alt="" /> {karma}
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
