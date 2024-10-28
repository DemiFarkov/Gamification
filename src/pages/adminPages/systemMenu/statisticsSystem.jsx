import React, { useEffect, useState } from "react";
import classes from "./statisticsSystem.module.css";
import Header from "../../../components/general/header";
import Navigation from "./navigation";
import { Button } from "@mui/material";
import { instance } from "../../../utils/axios";
import { ButtonStyle } from "../../../components/styles/styles.js";
import { getGroupsAuth } from "../../../hooks/reduxHooks.js";
import Not from "../../404Page/not.jsx";

const StatisticsSystem = () => {
  const group = getGroupsAuth();

  const [mainData, setMainData] = useState();

  function getData() {
    instance.get(`system-statistics/`).then((response) => {
      setMainData(response.data);
      console.log(response);
    });
  }
  console.log(mainData);

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {" "}
      {group == "Администраторы" ? (
        <>
          <Header />
          <section className={classes.mainContainer}>
            <Navigation styleBackground={"StatisticsSystem"} />
            <section className={classes.mainContent}>
              <div className={classes.blocksFlex}>
                <article>
                  <h3 className={classes.blockTitle}>
                    Всего активных пользователей:{" "}
                    {mainData && mainData.active_users_count}
                  </h3>
                  <div className={classes.blockDataWrapper}>
                    <ol className={classes.blockDataList}>
                      {mainData &&
                        mainData.active_users.map((el, i) => (
                          <li
                            style={{ width: "50%", textAlign: "start" }}
                            key={i}
                          >
                            {el}
                          </li>
                        ))}
                    </ol>
                  </div>{" "}
                </article>
                <article>
                  <h3 className={classes.blockTitle}>
                    Пользователей зарегистрировано:{" "}
                    {mainData && mainData.total_users_count}
                  </h3>
                  <div className={classes.blockDataWrapper}>
                    {mainData &&
                      mainData.users.map((el, i) => (
                        <div key={i} style={{ width: "100%", display: "flex" }}>
                          <div
                            style={{ width: "50%", textAlign: "start" }}
                            key={i}
                          >
                            {el.username}
                          </div>
                          <div style={{ width: "50%", textAlign: "end" }}>
                            {el.date_joined.slice(0, 10)}
                          </div>
                        </div>
                      ))}
                  </div>
                </article>
                <div className={classes.setBlocks}>
                  <article>
                    <h3 className={classes.blockTitle}>
                      Количество созданных тестов:{" "}
                      {mainData && mainData.tests.length}
                    </h3>
                    <div className={classes.blockDataPointWrapper}>
                      {mainData &&
                        mainData.tests.map((el, i) => (
                          <div className={classes.blockDataPoint} key={i}>
                            {el.name}
                          </div>
                        ))}
                    </div>
                  </article>
                  <article>
                    <h3 className={classes.blockTitle}>
                      Пользователей деактивировано:{" "}
                      {mainData && mainData.deactivated_users_count}
                    </h3>
                    <div className={classes.blockDataWrapper}>
                      {mainData && mainData.deactivated_users}
                    </div>
                  </article>
                  <article style={{ marginTop: "1vw" }}>
                    <h3 className={classes.blockTitle}>
                      Тестов пройдено:{" "}
                      {mainData && mainData.successful_tests.length} (сколько
                      раз)
                    </h3>
                    {mainData &&
                      mainData.successful_tests.map((el, i) => (
                        <div className={classes.blockDataPoint} key={i}>
                          <span>{el.name}</span>{" "}
                          <span>({el.passed_attempts})</span>
                        </div>
                      ))}
                  </article>
                  <article style={{ marginTop: "1vw" }}>
                    <h3 className={classes.blockTitle}>
                      Модерировано тестов:{" "}
                      {mainData && mainData.moderated_tests.length}
                    </h3>
                    {mainData &&
                      mainData.moderated_tests.map((el, i) => (
                        <div className={classes.blockDataPoint} key={i}>
                          <span>{el.name}</span>{" "}
                          <span>({el.moderated_attempts})</span>
                        </div>
                      ))}
                  </article>
                </div>
              </div>
            </section>
          </section>
        </>
      ) : (

        <Not />
      )}

    </div>
  );
};

export default StatisticsSystem;
