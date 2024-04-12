import React from "react";
import classes from "./store.module.css";
import Ticket from "../../img/img_store/pngegg2.png";

const HistoryCard = () => {
  var nowDate = new Date();
  let day = nowDate.getDate();
  let month = nowDate.getMonth() + 1;
  let year = nowDate.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var dates = day + "." + month + "." + year;
  return (
    <div className={classes.HistoryCardContainer}>
      <img src={Ticket} alt="" className={classes.HistoryCardImg} />
      <div className={classes.HistoryCardName}>Билет в кино</div>
      <div className={classes.HistoryCardDate}>({dates})</div>
    </div>
  );
};

export default HistoryCard;
