import React from "react";
import classes from "../main.module.css";
import HistoryPoint from "./historyPoint";

const History = () => {
  return (
    <div className={classes.mainHistory}>
      <HistoryPoint />
      <HistoryPoint />
      <HistoryPoint />
      <HistoryPoint />
      <HistoryPoint />
      <HistoryPoint />
      <HistoryPoint />
    </div>
  );
};

export default History;
