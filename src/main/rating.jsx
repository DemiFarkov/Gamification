import React from "react";
import classes from "./main.module.css";
import Logo1 from "../img/img_main/image_84.png"
import Logo2 from "../img/img_main/image_85.png"
import Logo3 from "../img/img_main/image_86.png"

const Rating = () => {
  return (
    <div className={classes.mainRatingBox}>
      <h2 className={classes.mainRatingTitle}>Рейтинг</h2>
      <div className={classes.mainRatingCard}>
        <img src={Logo1} alt="" className={classes.mainRatingImg}/>
        <div className={classes.mainRatingName}>Фарков Дмитрий</div>
      </div>

      <div className={classes.mainRatingCard}>
        <img src={Logo2} alt="" className={classes.mainRatingImg}/>
        <div className={classes.mainRatingName}>Саранчук Михаил</div>
      </div>

      <div className={classes.mainRatingCard}>
        <img src={Logo3} alt="" className={classes.mainRatingImg}/>
        <div className={classes.mainRatingName}>Путинцев Олег</div>
      </div>

      <div className={classes.mainRatingCard}>
        <img src={Logo1} alt="" className={classes.mainRatingImg}/>
        <div className={classes.mainRatingName}>Фарков Дмитрий</div>
      </div>

      <div className={classes.mainRatingCard}>
        <img src={Logo1} alt="" className={classes.mainRatingImg}/>
        <div className={classes.mainRatingName}>Фарков Дмитрий</div>
      </div>
    </div>
  );
};

export default Rating;
