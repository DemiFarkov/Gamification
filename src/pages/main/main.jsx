import React from "react";
import Header from "../../components/general/header";
import classes from "./main.module.css";
import Navigation from "../../components/general/navigation";
import CenterBox from "./centerBox/centerBox";
import Tasks from "./tasks";
import Rating from "./rating";

const Main = () => {
  return (
    <div>
      <Header />
      <div className={classes.mainContentBox}>
        <Navigation />
        <div className={classes.mainContent}>
          <CenterBox />
          <div className={classes.mainContentSide}>
            <Tasks />
            <Rating />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
