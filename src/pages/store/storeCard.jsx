import React from "react";
import classes from "./store.module.css";
import Coin from "../../img/img_profil/image_52.png";
import Ticket from "../../img/img_store/pngegg2.png";

const StoreCard = () => {
  return (
    <div className={classes.storeCard}>
      <h2 className={classes.cardTitle}>Билет в кино</h2>
      <img src={Ticket} alt="" className={classes.cardImg} />
      <div className={classes.cardRemains}>Остаток: неограничено</div>
      <div className={classes.cardFooter}>
        <div className={classes.cardPrice}>
            <img src={Coin} alt="" className={classes.priceImg}/>
            <div className={classes.priceText}>1000</div>
        </div>
        <div className={classes.buy}>Купить</div>
      </div>
    </div>
  );
};

export default StoreCard;
