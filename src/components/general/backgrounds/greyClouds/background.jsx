import React, { useEffect } from "react";
import classes from "./style.module.scss";

function Background(props) {
  useEffect(() => {
    document
      .querySelectorAll(
        `div > [mainblock="true"] > fieldset > span, div > [mainblockDiv="true"]`
      )
      .forEach((el) => (el.style.backgroundColor = "#3e424e42"));
  }, []);

  return (
    <div>
      <div className={classes.clouds}>
        <div className={classes.clouds1}></div>
        <div className={classes.clouds2}></div>
        <div className={classes.clouds3}></div>
      </div>
    </div>
  );
}

export default Background;
