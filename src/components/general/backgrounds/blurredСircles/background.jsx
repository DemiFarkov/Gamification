import React from "react";
import classes from "./style.module.scss";

const Background = () => {
  return (
    <div className={classes.mainContainer} style={{overflow:"hidden", position:"relative"}}>
      <div className={classes.subContainerstyle} style={{zIndex:"0"}}>
        <div className={classes.style}></div>
      </div>
    </div>
  );
};

export default Background;
