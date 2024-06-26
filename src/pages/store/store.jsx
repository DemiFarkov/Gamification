import React, { useState } from "react";
import classes from "./store.module.css";
import Header from "../../components/general/header";
import Navigation from "../../components/general/navigation";
import StoreCard from "./storeCard";
import HistoryCard from "./historyCard";
import ModalNoAccess from "../../components/general/modalNoAccess";

const Store = () => {
  const [access] = useState(false);
  return (
    <div>
      {access ? (
        <>
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
        </>
      ) : (
        <ModalNoAccess />
      )}
    </div>
  );
};

export default Store;
