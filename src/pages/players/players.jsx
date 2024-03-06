import React from "react";
import Header from "../../components/general/header";
import classes from "./players.module.css";
import Navigation from "../../components/general/navigation";
import CardPlayer from "./cardPlayer";

const Players = () => {
  return (
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
  );
};

export default Players;
