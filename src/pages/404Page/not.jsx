import React from 'react';
import classes from "./style.module.scss"




export default function Not() {
  return (
    <div className={classes.mainContainer404}>
      <div className={classes.text}>
        <p>404</p>
      </div>
      <div className={classes.container}>
        {/* caveman left */}
        <div className={classes.caveman}>
          <div className={classes.leg}>
            <div className={classes.foot}>
              <div className={classes.fingers}></div>
            </div>
          </div>
          <div className={classes.leg}>
            <div className={classes.foot}>
              <div className={classes.fingers}></div>
            </div>
          </div>
          <div className={classes.shape}>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
          </div>
          <div className={classes.head}>
            <div className={classes.eye}>
              <div className={classes.nose}></div>
            </div>
            <div className={classes.mouth}></div>
          </div>
          <div className={classes.armRight}>
            <div className={classes.club}></div>
          </div>
        </div>
        {/* caveman right  */}
        <div className={classes.caveman}>
          <div className={classes.leg}>
            <div className={classes.foot}>
              <div className={classes.fingers}></div>
            </div>
          </div>
          <div className={classes.leg}>
            <div className={classes.foot}>
              <div className={classes.fingers}></div>
            </div>
          </div>
          <div className={classes.shape}>
            <div className={classes.circle}></div>
            <div className={classes.circle}></div>
          </div>
          <div className={classes.head}>
            <div className={classes.eye}>
              <div className={classes.nose}></div>
            </div>
            <div className={classes.mouth}></div>
          </div>
          <div className={classes.armRight}>
            <div className={classes.club}></div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
