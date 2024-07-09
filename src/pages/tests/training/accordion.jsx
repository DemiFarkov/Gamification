import React, { useEffect, useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import classes from "./traning.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

const AccordionTraning = (props) => {
  const {
    AccordionSummaryy,
    que,
    removeTest,
    countTheme,
    removeCuttentTheme,
    theme_id,
    group,
  } = props;
  const ref = useRef(null);
  function removeTheme() {
    removeCuttentTheme(theme_id);
    ref.current.remove();
  }
  return (
    <div className={classes.AccordionContainer}>
      <Accordion ref={ref} style={{ background: "#202833", boxShadow: "none" }}>
        <div className={classes.TitleThemeContiner}>
          {" "}
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            style={{ background: "#202833", boxShadow: "none" }}
          >
            <div className={classes.AccordionTitle}>{AccordionSummaryy}</div>
          </AccordionSummary>
        </div>

        <AccordionDetails>
          {que.length !== 0 ? (
            <table className={classes.AccordionTable} cellSpacing="0">
              <thead>
                <tr className={classes.AccordionTR}>
                  <th className={classes.AccordionThName}>
                    <strong>Наименование теста</strong>{" "}
                  </th>
                  <th className={classes.AccordionThСonditions}>
                    <strong>Требования</strong>
                  </th>
                  <th className={classes.AccordionThStatus}>
                    <strong>Статус</strong>
                  </th>
                  <th className={classes.AccordionThIcon}>
                    <strong>Достижение</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {que.map((que, index) => (
                  <RowTable
                    key={index}
                    id={que.test}
                    nameTest={que.name}
                    carmaValue={que.required_karma}
                    expValue={que.min_exp}
                    removeTest={removeTest}
                    countForID={index}
                    countTheme={countTheme}
                    status={que.status}
                    test_available={que.test_available}
                    remaining_time={que.remaining_time}
                    AccordionSummaryy={AccordionSummaryy}
                    group={group}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <span style={{ color: "#fff" }}>
              {" "}
              <div
                id={"idTest" + 1}
                className={classes.RemoveThemeTestContainer}
              >
                Здесь пусто |
                <div
                  className={classes.changeTestBtns}
                  onClick={() => removeTheme()}
                >
                  Удалить эту тему
                </div>
              </div>
            </span>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionTraning;

const RowTable = (props) => {
  const {
    nameTest,
    carmaValue,
    expValue,
    id,
    removeTest,
    countForID,
    countTheme,
    test_available,
    remaining_time,
    AccordionSummaryy,group,

    status,
  } = props;
  const [visibleRemoveTestDialog, setVisibleRemoveTestDialog] = useState([
    false,
    "",
  ]);
  const [days, setDays] = useState(0);
  const [hour, setHour] = useState(0);
  const [timeSRT, setTimeSRT] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let arrTime = remaining_time.split(" ");
    setDays(arrTime[0]);
    setHour(arrTime[1]);
    let daysEnding = "";
    let hourEnding = "";
    if (arrTime[0] % 10 == 1) {
      daysEnding = "день";
    } else if (arrTime[0] % 10 > 1 && arrTime[0] % 10 < 5) {
      daysEnding = "дня";
    } else if (arrTime[0] % 10 > 4 && arrTime[0] % 10 < 9) {
      daysEnding = "дней";
    }
    if (arrTime[1] % 10 == 1) {
      hourEnding = "час";
    } else if (arrTime[1] % 10 > 1 && arrTime[1] % 10 < 5) {
      hourEnding = "часа";
    } else if (arrTime[1] % 10 > 4 && arrTime[1] % 10 < 9) {
      hourEnding = "часов";
    }
    if (arrTime[0] > 0) {
      setTimeSRT(
        `Тест недоступен ${arrTime[0]} ${daysEnding} и ${arrTime[1]} ${hourEnding}`
      );
    } else if (arrTime[0] == 0) {
      setTimeSRT(`Тест недоступен ${arrTime[1]} ${hourEnding}`);
    }
  }, []);
  function removeRow() {
    removeTest(id);
    document
      .querySelector(`#${"theme" + countTheme + "row" + countForID}`)
      .remove();
  }

  function openSettingsTest() {
    document.querySelector(`#${"idTest" + id}`).style.visibility = "visible";

    document
      .querySelectorAll(`#${"idTest" + id} > .${classes.changeTestBtn}`)
      .forEach((el) => (el.style.left = 0));
  }
  function closeSettingsTest() {
    document.querySelector(`#${"idTest" + id}`).style.visibility = " hidden";

    document
      .querySelectorAll(`#${"idTest" + id} > .${classes.changeTestBtn}  `)
      .forEach((el) => (el.style.left = 100 + "%"));
  }

  const karma = Cookies.get("karma");
  const experience = Cookies.get("experience");
  function changeStyleСonditions() {
    if (karma >= carmaValue && experience >= expValue) {
      navigate({
        pathname: "../pages/tests/traning/test",
        search: `?id=${id}`,
      });
    } else {
      document.querySelector(`#${"Сonditions" + id}`).style.boxShadow =
        "0 0 2vw .5vw rgba(221, 61, 61, 0.436) inset";
      setTimeout(() => {
        document.querySelector(`#${"Сonditions" + id}`).style.boxShadow =
          "none";
      }, 400);
    }
  }
  return (
    <>
      <tr
        id={"theme" + countTheme + "row" + countForID}
        style={{ position: "relative" }}
        className={classes.trTable}
      >
        <th
          className={classes.AccordionThName}
          style={{ position: "relative" }}
          onMouseOver={() => group == "Администраторы" && openSettingsTest()}
          onMouseLeave={() => group == "Администраторы" && closeSettingsTest()}
        >
          {(days > 0 || hour > 0) && (
            <div className={classes.testNoavailable}>{timeSRT}</div>
          )}
          {group == "Администраторы" && (
            <div id={"idTest" + id} className={classes.changeTestContainer}>
              <div className={classes.changeTestBtn}>
                <Link
                  to={{
                    pathname: "../pages/tests/createTest",
                    search: `?id=${id}`,
                  }}
                  style={{ color: "#fff", fontWeight: "400" }}
                >
                  Изменить
                </Link>
              </div>
              <div
                className={classes.changeTestBtn}
                onClick={() => setVisibleRemoveTestDialog([true, nameTest])}
              >
                Удалить
              </div>
            </div>
          )}

          <p
            onClick={() => changeStyleСonditions()}
            className={classes.AccordionLink}
          >
            {nameTest}
          </p>
        </th>
        <th className={classes.AccordionThСonditions} id={"Сonditions" + id}>
          <span
            style={
              karma >= carmaValue
                ? { color: "rgb(77, 209, 47)" }
                : { color: "rgb(181, 52, 29)" }
            }
          >
            Карма
          </span>{" "}
          {">"} {carmaValue}
          <span
            style={
              experience >= expValue
                ? { color: "rgb(77, 209, 47)" }
                : { color: "rgb(181, 52, 29)" }
            }
          >
            {" "}
            Опыт
          </span>{" "}
          {">"} {expValue}
        </th>
        <th className={classes.AccordionThStatus}>
          {status.status == "Не начато" ? (
            <span style={{ color: "#778080" }}>{status.status}</span>
          ) : status.status == "На модерации" ? (
            <span style={{ color: "#b7af3a" }}>На модерации</span>
          ) : status.status == "Failed" ? (
            <span style={{ color: "#b5341d" }}>
              Не пройден <br />
              {status.total_score}/{status.max_score}
            </span>
          ) : (
            status.status == "Passed" && (
              <span style={{ color: "#4dd12f" }}>
                Пройден <br />
                {status.total_score}/{status.max_score}
              </span>
            )
          )}
        </th>
        <th className={classes.AccordionThIcon}>{/* тут иконки */}</th>
      </tr>
      <RemoveTestDialog
        visibleRemoveTestDialog={visibleRemoveTestDialog}
        setVisibleRemoveTestDialog={setVisibleRemoveTestDialog}
        removeRow={removeRow}
      />
    </>
  );
};

const RemoveTestDialog = (props) => {
  const { visibleRemoveTestDialog, removeRow, setVisibleRemoveTestDialog } =
    props;
  return (
    <Dialog
      open={visibleRemoveTestDialog[0]}
      onClose={() => setVisibleRemoveTestDialog([false])}
    >
      <DialogContent>
        Вы действительно хотите удалить тест "{visibleRemoveTestDialog[1]}"
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setVisibleRemoveTestDialog([false])}>Нет</Button>
        <Button
          onClick={() => {
            removeRow(), setVisibleRemoveTestDialog([false]);
          }}
        >
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};
