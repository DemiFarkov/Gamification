import React, { useEffect, useState } from "react";
import Header from "../../../components/general/header";
import Navigation from "../../../components/general/navigation";
import classes from "./traning.module.css";
import AccordionTraning from "./accordion";
import { Link } from "react-router-dom";
import { instance } from "../../../utils/axios/index.js";
import { CircularProgress, LinearProgress } from "@mui/material";
import Cookies from "js-cookie";
import {
  getEmployee_idUseAuth,
  getTokenUseAuth,
} from "../../../hooks/reduxHooks.js";
import { useSelector } from "react-redux";

const MainTraning = () => {
  const [allThemes, setAllThemes] = useState([]);
  const [load, setLoad] = useState(true);
  document.cookie = "user=John";
  console.log(useSelector((state) => state.auth));
  const [requestSuccessful, setRequestSuccessful] = useState(true);
  const Employee_id = getEmployee_idUseAuth();
  function removeCuttentTheme(theme_id) {
    console.log(theme_id);
    instance
      .delete(`themes/${theme_id}/delete`)
      .then(function (response) {})
      .catch(function (response) {
        console.log(response);
      });
  }
  console.log(allThemes);

  useEffect(() => {
    instance
      .get(`themes-with-tests/`)
      .then((response) => {
        setAllThemes(response.data);
        console.log(response.data);
      })
      .catch((response) => {
        setRequestSuccessful(false);
        console.log(response);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);
  const removeTest = async (id) => {
    await instance
      .delete(`delete_test/${id}/`)
      .then(function (response) {})
      .catch(function (response) {
        console.log(response);
      });
  };
  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        <Navigation />
        <div className={classes.mainContent}>
          <h1 className={classes.H1}>Обучение и тестирование</h1>
          <div className={classes.navTest}>
            <Link to={"../pages/tests/traning"} className={classes.navBtn}>
              <div>Тесты</div>
            </Link>
            <Link
              to={"../pages/tests/moderationTest"}
              className={classes.navBtn}
            >
              <div>Модерация тестов</div>
            </Link>
            <Link to={"../pages/tests/createTest"} className={classes.navBtn}>
              <div>Создать тест</div>
            </Link>
            <Link
              to={"../pages/tests/testsStatistics"}
              className={classes.navBtn}
            >
              <div>Статистика</div>
            </Link>
          </div>

          <div className={classes.mainBlock}>
            {" "}
            {load ? (
              <CircularProgress />
            ) : requestSuccessful ? (
              allThemes.map((theme, index) => (
                <AccordionTraning
                  key={index}
                  AccordionSummaryy={theme.theme}
                  que={theme.tests}
                  removeTest={removeTest}
                  countTheme={index}
                  removeCuttentTheme={removeCuttentTheme}
                  theme_id={theme.theme_id}
                />
              ))
            ) : (
              <div style={{ fontSize: "1.2vw" }}>
                Что-то пошло не так. Пожалуйста, перезагрузите страницу
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTraning;
