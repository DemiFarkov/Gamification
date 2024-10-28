import React, { useEffect } from "react";
import classes from "./style.module.scss";

function Background(props) {
  useEffect(() => {
    document
      .querySelectorAll(
        `div > [mainblock="true"] > fieldset > span, div > [mainblockDiv="true"]`
      )
      .forEach((el) => (el.style.backgroundColor = "#496bd949"));
  }, []);

  return (
    <div>
      <div className={classes.cloud1}>
        <div className={classes.cloud1__face}>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud1__clouds1}>
          <span></span>
        </div>
        <div className={classes.cloud1__clouds2}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud1__clouds3}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud1__clouds4}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud1__clouds5}>
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
        <div className={classes.cloud1__rain}>
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
        <div className={classes.cloud1__lightning}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className={classes.cloud2}>
        <div className={classes.cloud1__face}>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud2__clouds1}>
          <span></span>
        </div>
        <div className={classes.cloud2__clouds2}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud2__clouds3}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud2__clouds4}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud2__clouds5}>
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
        <div className={classes.cloud2__rain}>
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
        <div className={classes.cloud2__lightning}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className={classes.cloud3}>
        <div className={classes.cloud1__face}>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud3__clouds1}>
          <span></span>
        </div>
        <div className={classes.cloud3__clouds2}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud3__clouds3}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud3__clouds4}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={classes.cloud3__clouds5}>
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
        <div className={classes.cloud3__rain}>
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
        <div className={classes.cloud3__lightning}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Background;
