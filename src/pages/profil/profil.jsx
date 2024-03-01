import React from "react";
import classes from "./profil.module.css";
import ColumnContainer1 from "./columnContainer1";
import ColumnContainer2 from "./columnContainer2";
import ColumnContainer3 from "./ColumnContainer3";
import Header from "../../components/general/header";
import Navigation from "../../components/general/navigation";

const Profil = () => {
  return (
    <>
      <Header />
      <div className={classes.mainContentBox}>
        <Navigation />
        <div className={classes.mainContainer}>
          <ColumnContainer1 />
          <ColumnContainer2 />
          <ColumnContainer3 />
        </div>
      </div>
    </>
  );
};

export default Profil;
