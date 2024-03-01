import React from "react";
import classes from "./header.module.css";
import Сircle from "../../img/img_profil/Ellipse_7.png";
const Header = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.nameContainer}>
        <img src={Сircle} alt="" className={classes.nameContainerImg}/>
        <div className={classes.nameContainerName}>Михаил Саранчук</div>
      </div>
    </div>
  );
};

export default Header;
