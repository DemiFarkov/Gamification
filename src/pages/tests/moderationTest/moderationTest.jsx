import React, { useEffect, useState } from "react";

import Header from "../../../components/general/header";
import classes from "./moderationTest.module.css";
import Navigation from "../../../components/general/navigation";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { instance } from "../../../utils/axios/index.js";
import AccordionModeration from "./accordionModeration";
import { getGroupsAuth } from "../../../hooks/reduxHooks.js";

const ModerationTest = () => {
  const [allThemes, setAllThemes] = useState([]);
  const [load, setLoad] = useState(true);
  const [requestSuccessful, setRequestSuccessful] = useState(true);
  const group = getGroupsAuth();
  useEffect(() => {
    instance
      .get("test_attempts/moderation/")
      .then((response) => {
        setAllThemes(response.data);
      })
      .catch((response) => {
        setRequestSuccessful(false);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);
  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        <Navigation />
        <div className={classes.mainContent}>
          <h1 className={classes.H1}>Модерация тестов</h1>
          <div className={classes.navTest}>
            {(group == "Администраторы" || group == "М") && (
              <>
                <Link to={"../pages/tests/traning"} className={classes.navBtn}>
                  <div>Тесты</div>
                </Link>
              </>
            )}
            {(group == "Администраторы" || group == "М") && (
              <>
                <Link
                  to={"../pages/tests/moderationTest"}
                  className={classes.navBtn}
                >
                  <div>Модерация тестов</div>
                </Link>
              </>
            )}
            {group == "Администраторы" && (
              <>
                <Link
                  to={"../pages/tests/createTest"}
                  className={classes.navBtn}
                >
                  <div>Создать тест</div>
                </Link>
                <Link
                  to={"../pages/tests/testsStatistics"}
                  className={classes.navBtn}
                >
                  <div>Статистика</div>
                </Link>
              </>
            )}
          </div>

          <div className={classes.mainBlock}>
            {" "}
            {load ? (
              <CircularProgress />
            ) : requestSuccessful ? (
              allThemes.map((theme, index) => (
                <AccordionModeration
                  key={index}
                  test_attempts={theme.test_attempts}
                  theme={theme.theme}
                  indexTheme={index}
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

export default ModerationTest;
