import React, { useEffect, useState } from "react";
import classes from "./main/main.module.css";
import CenterBox from "./main/centerBox/centerBox";
import Tasks from "./main/tasks";
import Rating from "./main/rating";
import Header from "./components/general/header";
import Navigation from "./components/general/navigation";
import { getGroupsAuth } from "./hooks/reduxHooks";
import { isMobile } from "./hooks/react-responsive";
import Not from "./pages/404Page/not";

const Main = () => {
  const isMobileWidth = isMobile();
  const group = getGroupsAuth();
  return (
    <div>
      {group == "Администраторы" ? (
        <>
        <Header />
          <div className={classes.mainContentBox}>
            {!isMobileWidth && <Navigation />}
            <div className={classes.mainContent}>
              <CenterBox />
              <div className={classes.mainContentSide}>
                <Tasks />
                <Rating />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Not />
      )}
    </div>
  );
};

export default Main;
