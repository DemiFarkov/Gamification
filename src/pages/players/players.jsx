import React, { useState } from "react";
import Header from "../../components/general/header";
import classes from "./players.module.css";
import Navigation from "../../components/general/navigation";
import CardPlayer from "./cardPlayer";
import ModalNoAccess from "../../components/general/modalNoAccess";

const Players = () => {
  const [access] = useState(false);
  return (
    <>
      {access ? (
        <>
          <Header skrol="17" />
          <div className={classes.mainContentBox}>
            <Navigation />
            <div className={classes.mainContent}>
              <h1 className={classes.H1}>Игроки</h1>
              <div className={classes.mainContentCards}>
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
                <CardPlayer />
              </div>
            </div>
          </div>
        </>
      ) : (
        <ModalNoAccess />
      )}
    </>
  );
};

export default Players;
