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
import Navigation from "../../../components/general/navigation";
import { instance } from "../../../utils/axios/index.js";
import AccordiontStatisticss from "./AccordiontStatistics";
import StatisticTop from "./statisticTop";
import StatisticAllTop from "./statisticAllTop";
import exp from "../../../img/Vector.svg";
import acoin from "../../../img/image64.svg";
import "../../../components/general/styles.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getGroupsAuth } from "../../../hooks/reduxHooks.js";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

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
  const [averageScore, setAverageScore] = useState();
  const [sortMode, setSortMode] = useState([]);

  const [acoins, setAcoins] = useState("");
  const [expV, setExp] = useState("");

  const [lastAttempt, setLastAttempt] = useState(false);
  const group = getGroupsAuth();
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
      });
    instance
      .get("question_errors_stat/")
      .then((response) => {
        setQuestionErrorsStat(response.data);
      })
      .catch((response) => {
      });

    instance
      .get("top_participants/")
      .then((response) => {
        setTop_participants(response.data);
      })
      .catch((response) => {
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);
  useEffect(() => {
    if (arrFilter) {
      let score = 0;
      let maxScore = 0;
      let acoin = 0;
      let exp = 0;
      arrFilter.map(
        (el) => (
          (score = score + el.score),
          (maxScore = maxScore + el.max_score),
          (acoin = acoin + el.test_acoin_reward),
          (exp = exp + el.test_experience_points)
        )
      );
      setAverageScore(((score / maxScore) * 100).toFixed(0));
      setAcoins(acoin);
      setExp(exp);
    }
  }, [arrFilter]);
  useEffect(() => {
    if (sortMode.length > 0) {
      if (sortMode[0] == "test") {
        let sortArr = structuredClone(arrFilter).sort((a, b) =>
          a.test_name == b.test_name
            ? 0
            : a.test_name > b.test_name
            ? 1
            : a.test_name < b.test_name && -1
        );
        if (sortMode[1] == 1) {
          setArrFilter(sortArr);
        } else if (sortMode[1] == 2) {
          setArrFilter(sortArr.reverse());
        }
      }
      if (sortMode[0] == "theme") {
        let sortArr = structuredClone(arrFilter).sort((a, b) =>
          a.theme_name == b.theme_name
            ? 0
            : a.theme_name > b.theme_name
            ? 1
            : a.theme_name < b.theme_name && -1
        );
        if (sortMode[1] == 1) {
          setArrFilter(sortArr);
        } else if (sortMode[1] == 2) {
          setArrFilter(sortArr.reverse());
        }
      }
      if (sortMode[0] == "FIO") {
        let sortArr = structuredClone(arrFilter).sort((a, b) =>
          a.employee_name == b.employee_name
            ? 0
            : a.employee_name > b.employee_name
            ? 1
            : a.employee_name < b.employee_name && -1
        );
        if (sortMode[1] == 1) {
          setArrFilter(sortArr);
        } else if (sortMode[1] == 2) {
          setArrFilter(sortArr.reverse());
        }
      }
      if (sortMode[0] == "moder") {
        let sortArr = structuredClone(arrFilter).sort((a, b) =>
          a.moderator == b.moderator
            ? 0
            : a.moderator > b.moderator
            ? 1
            : a.moderator < b.moderator && -1
        );
        if (sortMode[1] == 1) {
          setArrFilter(sortArr);
        } else if (sortMode[1] == 2) {
          setArrFilter(sortArr.reverse());
        }
      }
      if (sortMode[0] == "date") {
        let sortArr = structuredClone(arrFilter).sort((a, b) =>
          a.end_time.slice(0, a.end_time.indexOf(" ")).replaceAll("-", "") == b.end_time.slice(0, b.end_time.indexOf(" ")).replaceAll("-", "")
            ? 0
            : a.end_time.slice(0, a.end_time.indexOf(" ")).replaceAll("-", "") > b.end_time.slice(0, b.end_time.indexOf(" ")).replaceAll("-", "")
            ? 1
            : a.end_time.slice(0, a.end_time.indexOf(" ")).replaceAll("-", "") < b.end_time.slice(0, b.end_time.indexOf(" ")).replaceAll("-", "") && -1
        );
        if (sortMode[1] == 1) {
          setArrFilter(sortArr);
        } else if (sortMode[1] == 2) {
          setArrFilter(sortArr.reverse());
        }
      }
    }
  }, [sortMode]);
  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        <Navigation />
        <div className={classes.mainContent}>
          <h1 className={classes.H1}>Статистика </h1>
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
                      <ArrowBlock
                        name={"FIO"}
                        sortMode={sortMode}
                        setSortMode={setSortMode}
                      />
                    </div>
                    <div
                      className={classes.rowTitleItem}
                      style={{ width: "19%" }}
                    >
                      Тема
                      <ArrowBlock
                        name={"theme"}
                        sortMode={sortMode}
                        setSortMode={setSortMode}
                      />
                    </div>
                    <div
                      className={classes.rowTitleItem}
                      style={{ width: "19%" }}
                    >
                      Тесты
                      <ArrowBlock
                        name={"test"}
                        sortMode={sortMode}
                        setSortMode={setSortMode}
                      />
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
                      <ArrowBlock
                        name={"date"}
                        sortMode={sortMode}
                        setSortMode={setSortMode}
                      />
                    </div>
                    <div
                      className={classes.rowTitleItem}
                      style={{ width: "13%" }}
                    >
                      Модератор
                      <ArrowBlock
                        name={"moder"}
                        sortMode={sortMode}
                        setSortMode={setSortMode}
                      />
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
                <div className={classes.sideBlockTitle}>% прохождения</div>
                <div className={classes.averageScore}>
                  {averageScore !== "Infinity" ? (
                    averageScore
                  ) : (
                    <CloseRoundedIcon sx={{ fontSize: "2.5vw" }} />
                  )}
                </div>
              </div>
              <div className={classes.averageScoreContainer}>
                <div className={classes.sideBlockTitle}>Награды</div>
                <div className={classes.sideBlok}>
                  <img src={acoin} alt="" /> <p> A-coin - </p> <p>{acoins}</p>
                </div>
                <div className={classes.sideBlok}>
                  <img src={exp} alt="" /> <p> Опыт -</p> <p>{expV}</p>
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

const ArrowBlock = (props) => {
  const { name, sortMode, setSortMode } = props;
  const arrowUp = {
    position: "absolute",
    right: ".5vw",
    top: "0",
    fontSize: "1vw",
    transform: "rotate(90deg)",
    cursor: "pointer",
  };
  const arrowDown = {
    position: "absolute",
    right: ".5vw",
    bottom: "0",
    fontSize: "1vw",
    transform: "rotate(-90deg)",
    cursor: "pointer",
  };
  return (
    <div
      onClick={() => {
        sortMode[0] == name && sortMode[1] == 1
          ? setSortMode([name, 2])
          : setSortMode([name, 1]);
      }}
    >
      {((sortMode[0] == name && sortMode[1] !== 1) || sortMode[0] !== name) && (
        <ArrowBackIosNewRoundedIcon sx={arrowUp} />
      )}
      {((sortMode[0] == name && sortMode[1] !== 2) || sortMode[0] !== name) && (
        <ArrowBackIosNewRoundedIcon sx={arrowDown} />
      )}
    </div>
  );
};
