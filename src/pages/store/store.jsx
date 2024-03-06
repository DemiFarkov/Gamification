import React from "react";
import classes from "./store.module.css";
import Header from "../../components/general/header";
import Navigation from "../../components/general/navigation";
import StoreCard from "./storeCard";
import HistoryCard from "./historyCard";

const Store = () => {
  return (
    <div>
      <Header skrol="0" />
      <div className={classes.mainContentBox}>
        <Navigation />
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
    </div>
  );
};

export default Store;
