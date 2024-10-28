import React, { useEffect } from "react";
import classes from "./style.module.scss";

function Background(props) {
  useEffect(() => {
    document
      .querySelectorAll(
        `div > [mainblock="true"] > fieldset > span, div > [mainblockDiv="true"]`
      )
      .forEach((el) => (el.style.backgroundColor = "#5ddbd30e"));
  }, []);

  return (
    <div className={classes.test}>
      <div className={classes.background_background__3Oeal}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Background;
