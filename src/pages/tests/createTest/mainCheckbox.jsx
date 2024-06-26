import React, { useEffect } from "react";
import classes from "./test.module.css";

const MainCheckbox = (props) => {
  const { setInputTime, setInputAttemptTwice } = props;
  function onChangeTime() {
    let checkboxTime = document.querySelector("#checkbox1").checked;
    checkboxTime ? setInputTime(false) : setInputTime(true);
  }
  function onChangeAttemptTwice() {
    let checkboxAttemptTwice = document.querySelector("#checkbox3").checked;
    checkboxAttemptTwice
      ? setInputAttemptTwice(false)
      : setInputAttemptTwice(true);
  }
  return (
    <div className={classes.mainCheckbox}>
      <div className={classes.mainCheckboxWrapper}>
        <input
          type="checkbox"
          id="checkbox1"
          className={classes.mainCheckboxInput}
          onChange={() => onChangeTime()}
        />
        <label htmlFor="checkbox1" className={classes.mainCheckboxLabel}>
          Неограниченно по времени
        </label>
      </div>
      <div className={classes.mainCheckboxWrapper}>
        <input
          type="checkbox"
          id="checkbox2"
          className={classes.mainCheckboxInput}
        />
        <label htmlFor="checkbox2" className={classes.mainCheckboxLabel}>
          Показывать верные ответы и пояснения по завершению теста
        </label>
      </div>
      <div className={classes.mainCheckboxWrapper}>
        <input
          type="checkbox"
          id="checkbox3"
          className={classes.mainCheckboxInput}
          onChange={() => onChangeAttemptTwice()}
        />
        <label htmlFor="checkbox3" className={classes.mainCheckboxLabel}>
          Разрешить повторное прохождение
        </label>
      </div>
      <div className={classes.mainCheckboxWrapper}>
        <input
          type="checkbox"
          id="checkbox4"
          className={classes.mainCheckboxInput}
        />
        <label htmlFor="checkbox4" className={classes.mainCheckboxLabel}>
          Отправить результаты на эл. почту руководителю{" "}
        </label>
      </div>     
      
    </div>
  );
};

export default MainCheckbox;
