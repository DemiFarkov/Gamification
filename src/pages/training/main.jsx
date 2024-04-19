import React, { useEffect, useState } from "react";
import Header from "../../components/general/header";
import Navigation from "../../components/general/navigation";
import classes from "./traning.module.css";
import AccordionTraning from "./accordion";
import { Link } from "react-router-dom";
import { instance } from "../../utils/axios";

const MainTraning = () => {
  const [allThemes, setAllThemes] = useState([]);
  useEffect(() => {
    const themes_with_tests = instance
      .get("themes-with-tests/")
      .then((response) => {
        setAllThemes(response.data);
      });
  }, []);
  console.log(allThemes)
  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        <Navigation />
        <div className={classes.mainContent}>
          <h1 className={classes.H1}>Обучение и тестирование</h1>
          <div className={classes.navTest}>
            <div className={classes.navBtn}> Тесты</div>
            <div className={classes.navBtn}>Модерация тестов</div>
            <Link to={"../pages/createTest"} className={classes.navBtn}>
              <div>Создать тест</div>
            </Link>
            <div className={classes.navBtn}>Статистика</div>
          </div>
          <div className={classes.mainBlock}>
            {allThemes.map((theme, index) => (
             

              <AccordionTraning key={index} AccordionSummaryy={theme.theme} que={theme.tests} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTraning;
