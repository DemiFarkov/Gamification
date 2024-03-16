import React from "react";
import classes from "./test.module.css";

const MainCheckbox = () => {
  return (
    <div className={classes.mainCheckbox}>
      <div className={classes.mainCheckboxWrapper}>
        <input
          type="checkbox"
          id="checkbox1"
          className={classes.mainCheckboxInput}
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
      <div className={classes.mainCheckboxWrapper}>
        <input
          type="checkbox"
          id="checkbox5"
          className={classes.mainCheckboxInput}
        />
        <label htmlFor="checkbox5" className={classes.mainCheckboxLabel}>
          Не выдавать достижение
        </label>
      </div>
    </div>
  );
};

export default MainCheckbox;
