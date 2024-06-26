import React, { useEffect, useState } from "react";
import classes from "./testsStatistics.module.css";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Header from "../../../components/general/header";
import { Link } from "react-router-dom";
import AccordiontStatistics from "./AccordiontStatistics";
import Navigation from "../../../components/general/navigation";
import { instance } from "../../../utils/axios/index.js";
import AccordiontStatisticss from "./AccordiontStatistics";
import StatisticTop from "./statisticTop";
import StatisticAllTop from "./statisticAllTop";
import exp from "../../../img/Vector.svg";
import acoin from "../../../img/image64.svg";
import "../../../components/general/styles.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TestsStatisticss = () => {
  const [allEmployee, setAllEmployee] = useState();
  const [top_participants, setTop_participants] = useState();
  const [load, setLoad] = useState(true);
  const [requestSuccessful, setRequestSuccessful] = useState(true);
  const [openModalAllTop, setOpenModalAllTop] = useState(false);
  const [openModalTop, setOpenModalTop] = useState(false);
  const [contentForModal, setContentForModal] = useState([
    "Топ верных вопросов",
    1,
  ]);
  const [selectEmployee, setSelectEmployee] = useState("");
  const [selectTest, setSelectTest] = useState("");
  const [selectTheme, setSelectTheme] = useState("");
  const [selectStatus, setSelectStatus] = useState("");
  const [questionCorrectStat, setQuestionCorrectStat] = useState();

  const [questionErrorsStat, setQuestionErrorsStat] = useState();

  const [lastAttempt, setLastAttempt] = useState(false);

  const [arrFilter, setArrFilter] = useState("");
  function resetFilter() {
    setSelectEmployee("");
    setSelectTest("");
    setSelectTheme("");
    setSelectStatus("");
    setLastAttempt(false);
    document.querySelector("#lastAttempt").checked = false;
  }
  function filter(el) {
    let good = true;
    if (selectEmployee !== "") {
      if (el.employee_name !== selectEmployee) {
        good = false;
      }
    }
    if (selectTest !== "") {
      if (el.test_name !== selectTest) {
        good = false;
      }
    }
    if (selectTheme !== "") {
      if (el.theme_name !== selectTheme) {
        good = false;
      }
    }
    if (selectStatus !== "") {
      if (el.status !== selectStatus) {
        good = false;
      }
    }
    if (lastAttempt == true) {
      if (el.is_last_attempt !== true) {
        good = false;
      }
    }
    if (!good) {
    }
    return good;
  }
  useEffect(() => {
    if (arrFilter) {
      // allEmployee.statistics.map(
      //   (el) =>
      //     (console.log(el),console.log(filter(el)),
      //     !filter(el) &&
      //     (document.querySelector(
      //       `#${"id" + el.test_name.replace(/[\.]|[\s]|[\,]+/g, '') + el.test_attempt}`
      //     ).className = classes.rowStatisticExit))
      //   : (document.querySelector(`#${"id" + el.test_attempt}`).className =
      //       classes.rowStatistic)
      // );
      setArrFilter(
        allEmployee.statistics.filter(function (el, index) {
          return filter(el);
        })
      );
    }
  }, [selectEmployee, selectTest, selectTheme, selectStatus, lastAttempt]);
  const styleSelect = {
    m: 1,
    minWidth: "24vw",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#469C9A",
      color: "#fff",
    },
    "& .MuiInputLabel-root": {
      color: "#fff ",
    },
    "& .MuiOutlinedInput-root": {
      color: "#fff ",
    },
    "& svg": {
      color: "#fff ",
    },
    "& .MuiOutlinedInput-root:hover": {
      color: "#fff",
      "& > fieldset": {
        borderColor: "#469C9A",
      },
    },
  };
  useEffect(() => {
    const themes_with_tests = instance
      .get("test_statistics/")
      .then((response) => {
        setAllEmployee(response.data);
        setArrFilter(response.data.statistics);
        console.log(response.data);
      })
      .catch((response) => {
        setRequestSuccessful(false);
      });

    instance
      .get("question_correct_stat/")
      .then((response) => {
        setQuestionCorrectStat(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
    instance
      .get("question_errors_stat/")
      .then((response) => {
        setQuestionErrorsStat(response.data);
      })
      .catch((response) => {
        console.log(response);
      });

    instance
      .get("top_participants/")
      .then((response) => {
        setTop_participants(response.data);
      })
      .catch((response) => {
        console.log(response);
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
          <h1 className={classes.H1}>Статистика </h1>
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
          <div className={classes.contentGrid}>
            <div className={classes.mainBlock}>
              {" "}
              <>
                <div>
                  <div className={classes.selectContainer}>
                    <FormControl sx={styleSelect}>
                      <InputLabel id="employee">Сотрудник</InputLabel>
                      <Select
                        labelId="employee"
                        id="demo-simple-select"
                        value={selectEmployee}
                        onChange={(event) => {
                          setSelectEmployee(event.target.value);
                        }}
                        defaultValue={""}
                        label="Сотрудник"
                      >
                        <MenuItem value={""}>Не выбрано</MenuItem>
                        {allEmployee &&
                          allEmployee.employees.map((el, index) => (
                            <MenuItem key={index} value={el}>
                              {el}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={styleSelect}>
                      <InputLabel id="demo-simple-select-label">
                        Тест
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectTest}
                        onChange={(event) => {
                          setSelectTest(event.target.value);
                        }}
                        defaultValue={""}
                        label="Тест"
                      >
                        {" "}
                        <MenuItem value={""}>Не выбрано</MenuItem>
                        {allEmployee &&
                          allEmployee.tests.map((el, index) => (
                            <MenuItem key={index} value={el.test_name}>
                              {el.test_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={styleSelect}>
                      <InputLabel id="demo-simple-select-label">
                        Тема
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectTheme}
                        onChange={(event) => {
                          setSelectTheme(event.target.value);
                        }}
                        label="Тема"
                      >
                        {" "}
                        <MenuItem value={""}>Не выбрано</MenuItem>
                        {allEmployee &&
                          allEmployee.themes.map((el, index) => (
                            <MenuItem key={index} value={el}>
                              {el}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={classes.selectContainer}>
                    <FormControl sx={styleSelect}>
                      <InputLabel id="selectStatus">Статус</InputLabel>
                      <Select
                        labelId="selectStatus"
                        id="demo-simple-select"
                        value={selectStatus}
                        onChange={(event) => {
                          setSelectStatus(event.target.value);
                        }}
                        label="Статус"
                      >
                        {" "}
                        <MenuItem value={""}>Не выбрано</MenuItem>
                        <MenuItem value={"Passed"}>Пройден</MenuItem>
                        <MenuItem value={"Failed"}>Не пройден</MenuItem>
                        <MenuItem value={"На модерации"}>На модерации</MenuItem>
                        <MenuItem value={"In Progress"}>В процессе</MenuItem>
                      </Select>
                    </FormControl>{" "}
                    <div className={classes.selectCheckboxWrapper}>
                      <input
                        type="checkbox"
                        id="lastAttempt"
                        className={classes.selectCheckboxInput}
                        onChange={() => setLastAttempt(!lastAttempt)}
                      />
                      <label
                        htmlFor="lastAttempt"
                        className={classes.selectCheckboxLabel}
                      >
                        Только последние попытки
                      </label>
                    </div>
                    <Button
                      className={classes.selectBtnReset}
                      onClick={() => {
                        resetFilter();
                      }}
                    >
                      Сбросить фильтры
                    </Button>
                  </div>
                  <div className={classes.rowTitle}>
                    <div
                      className={classes.rowTitleItem}
                      style={{ width: "19%" }}
                    >
                      ФИО
                    </div>
                    <div
                      className={classes.rowTitleItem}
                      style={{ width: "19%" }}
                    >
                      Тема
                    </div>
                    <div
                      className={classes.rowTitleItem}
                      style={{ width: "19%" }}
                    >
                      Тесты
                    </div>

                    <div
                      className={classes.rowTitleItem}
                      style={{ width: "7%" }}
                    >
                      Время
                    </div>
                    <div
                      className={classes.rowTitleItem}
                      style={{ width: "10%" }}
                    >
                      Дата
                    </div>
                    <div
                      className={classes.rowTitleItem}
                      style={{ width: "13%" }}
                    >
                      Модератор
                    </div>
                    <div
                      className={classes.rowTitleItem}
                      style={{ width: "10%" }}
                    >
                      Статус
                    </div>
                  </div>
                  {load ? (
                    <CircularProgress sx={{ marginTop: "2vw" }} />
                  ) : requestSuccessful ? (
                    <TransitionGroup>
                      {" "}
                      {arrFilter &&
                        arrFilter.map((el, index) => (
                          <CSSTransition
                            key={index}
                            timeout={1000}
                            className="rowStatistic"
                          >
                            <AccordiontStatisticss
                              employeeName={el.employee_name}
                              themeName={el.theme_name}
                              duration={el.duration}
                              employee_name={el.employee_name}
                              end_time={el.end_time}
                              max_score={el.max_score}
                              score={el.score}
                              status={el.status}
                              test_acoin_reward={el.test_acoin_reward}
                              test_experience_points={el.test_experience_points}
                              test_id={el.test_id}
                              test_name={el.test_name}
                              theme_name={el.theme_name}
                              test_attempt={el.test_attempt}
                              key={index}
                              setArrFilter={setArrFilter}
                              allEmployee={allEmployee}
                            />
                          </CSSTransition>
                        ))}
                    </TransitionGroup>
                  ) : (
                    <div style={{ fontSize: "1.2vw", marginTop: "1.5vw" }}>
                      Что-то пошло не так. Пожалуйста, перезагрузите страницу
                    </div>
                  )}
                </div>
                {allEmployee && (
                  <StatisticAllTop
                    openModalAllTop={openModalAllTop}
                    setOpenModalAllTop={setOpenModalAllTop}
                    top_participants={top_participants}
                    allEmployee={allEmployee.tests}
                  />
                )}
                {allEmployee && (
                  <StatisticTop
                    openModalTop={openModalTop}
                    setOpenModalTop={setOpenModalTop}
                    contentForModal={contentForModal}
                    top_participants={top_participants}
                    allEmployee={allEmployee.tests}
                    questionCorrectStat={questionCorrectStat}
                    questionErrorsStat={questionErrorsStat}
                  />
                )}
              </>
            </div>
            <div>
              <div className={classes.averageScoreContainer}>
                <div className={classes.sideBlockTitle}>Средний балл</div>
                <div className={classes.averageScore}>17,5</div>
              </div>
              <div className={classes.averageScoreContainer}>
                <div className={classes.sideBlockTitle}>Награды</div>
                <div className={classes.sideBlok}>
                  <img src={acoin} alt="" /> <span> A-coin -</span> {" 100"}
                </div>
                <div className={classes.sideBlok}>
                  <img src={exp} alt="" /> <p> Опыт -</p> <p>{"100"}</p>
                </div>
              </div>
              <div
                className={classes.sideBlokTop}
                onClick={() => {
                  setOpenModalTop(true),
                    setContentForModal(["Топ верных вопросов", true]);
                }}
              >
                Топ верных вопросов
              </div>
              <div
                className={classes.sideBlokTop}
                onClick={() => {
                  setOpenModalTop(true),
                    setContentForModal(["Топ не верных вопросов", false]);
                }}
              >
                Топ неверных вопросов
              </div>
              <div
                className={classes.sideBlokTop}
                onClick={() => {
                  setOpenModalAllTop(true);
                }}
              >
                Топ участников
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsStatisticss;
