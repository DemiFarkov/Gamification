import React, { useEffect, useState } from "react";
import Header from "../../components/general/header";
import classes from "./main.module.css";
import Navigation from "../../components/general/navigation";
import CenterBox from "./centerBox/centerBox";
import Tasks from "./tasks";
import Rating from "./rating";
import ModalNoAccess from "../../components/general/modalNoAccess";
import { getGroupsAuth } from "../../hooks/reduxHooks";

const Main = () => {
  const group = getGroupsAuth();
  return (
    <div>
      {group == "Администраторы" ? (
        <>
          <Header skrol="17" />
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
        </>
      ) : (
        <ModalNoAccess />
      )}
    </div>
  );
};

export default Main;
