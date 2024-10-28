import React, { useState } from "react";
import classes from "./store.module.css";
import Header from "../../components/general/header";
import Navigation from "../../components/general/navigation";
import StoreCard from "./storeCard";
import HistoryCard from "./historyCard";
import { getGroupsAuth } from "../../hooks/reduxHooks";
import { isMobile } from "../../hooks/react-responsive";
import Not from "../404Page/not";

const Store = () => {
  const isMobileWidth = isMobile()

  const group = getGroupsAuth();
  return (
    <div>
      {group == "Администраторы" ? (
        <>
          <Header skrol="0" />
          <div className={classes.mainContentBox}>
          {!isMobileWidth && <Navigation />}
            <div className={classes.mainContent}>
              <h1 className={classes.H1}>Магазин</h1>
              <div className={classes.mainContentGrid}>
                <div className={classes.storeCards}>
                  <StoreCard />
                  <StoreCard />
                  <StoreCard />
                  <StoreCard />
                  <StoreCard />
                </div>
                <div className={classes.storeHistory}>
                  <h2 className={classes.historyTitle}>История покупок</h2>
                  <HistoryCard />
                  <HistoryCard />
                  <HistoryCard />
                </div>
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

export default Store;
