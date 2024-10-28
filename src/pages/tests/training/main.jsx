import React, { useEffect, useState } from "react";
import Header from "../../../components/general/header";
import Navigation from "../../../components/general/navigation";
import classes from "./traning.module.css";
import AccordionTraning from "./accordion";
import { Link } from "react-router-dom";
import { instance } from "../../../utils/axios/index.js";
import { Skeleton } from "@mui/material";
import {
  getEmployee_idUseAuth,
  getGroupsAuth,
} from "../../../hooks/reduxHooks.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { isMobile } from "../../../hooks/react-responsive.js";

const MainTraning = () => {
  const [allThemes, setAllThemes] = useState([]);
  const [load, setLoad] = useState(true);
  const [dataUser, setDataUser] = useState({});

  const isMobileWidth = isMobile();
  const [requestSuccessful, setRequestSuccessful] = useState(true);
  const group = getGroupsAuth();
  const styleSkeleton = {
    padding: ".25vw .4vw .25vw .4vw",
    margin: "12px 16px",
    bgcolor: "#2d3846",
    height: "2.3vw",
    width: "29%",
    borderRadius: "3vw",
    clear: "both",
  };
  function removeCuttentTheme(theme_id) {
    instance.delete(`themes/${theme_id}/delete`);
  }

  useEffect(() => {
    getData().then(() => {
      setLoad(false);
    });
  }, []);
  const getData = async () => {
    await instance
      .get(`themes-with-tests/`)
      .then((response) => {
        setAllThemes(response.data);
        console.log(response.data);
      })
      .catch(() => {
        setRequestSuccessful(false);
      })
    await instance.get(`get-exp-karma/`).then((response) => {
      setDataUser(response.data);
      console.log(response.data);
    });
  };
  const removeTest = async (id) => {
    await instance.delete(`delete_test/${id}/`);
  };
  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        {!isMobileWidth && <Navigation />}
        <div className={classes.mainContent}>
          <h1 className={classes.H1}>Обучение и тестирование</h1>
          <div className={classes.navTest}>
            {(group == "Администраторы" || group == "Модераторы") && (
              <>
                <Link to={"../pages/tests/traning"} className={classes.navBtn}>
                  <div>Тесты</div>
                </Link>
              </>
            )}
            {(group == "Администраторы" || group == "Модераторы") && (
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Skeleton variant="rounded" sx={styleSkeleton} />
                <Skeleton variant="rounded" sx={styleSkeleton} />
                <Skeleton variant="rounded" sx={styleSkeleton} />
                <Skeleton variant="rounded" sx={styleSkeleton} />
                <Skeleton variant="rounded" sx={styleSkeleton} />
              </div>
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
                  group={group}
                  dataUser={dataUser}
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
