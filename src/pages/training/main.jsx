import React, { useState } from "react";
import Header from "../../components/general/header";
import Navigation from "../../components/general/navigation";
import classes from "./traning.module.css";
import AccordionTraning from "./accordion";

const MainTraning = () => {
  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        <Navigation />
        <div className={classes.mainContent}>
          <h1 className={classes.H1}>Обучение и тестирование</h1>
          <div className={classes.navTest}>
            <div className={classes.navBtn}>Тесты</div>
            <div className={classes.navBtn}>Модерация тестов</div>
            <div className={classes.navBtn}>Создать тест</div>
            <div className={classes.navBtn}>Статистика</div>
          </div>
          <div className={classes.mainBlock}>
            <AccordionTraning AccordionSummaryy={"Все не пройденные"} />
            <AccordionTraning AccordionSummaryy={"Права доступа"} />
            <AccordionTraning AccordionSummaryy={"Права доступа"} />
            <AccordionTraning AccordionSummaryy={"Права доступа"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTraning;
