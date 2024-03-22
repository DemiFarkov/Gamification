import React from "react";
import classes from "./test.module.css";

const CheckBoxDLS = (id) => {
  return (
    <div className={classes.mainCheckboxDLS}>
      {" "}
      
        <input
          type="checkbox"
          id="checkboxDLS1"
          className={classes.mainCheckboxInputDls}
        />
        <label htmlFor="checkboxDLS1" className={classes.mainCheckboxLabelDls}>
          Ограничить время вопроса
        </label>
      
      
        <input
          type="checkbox"
          id="checkboxDLS2"
          className={classes.mainCheckboxInputDls}
        />
        <label htmlFor="checkboxDLS2" className={classes.mainCheckboxLabelDls}>
          Свой ответ
        </label>
      
      <div className={classes.addBtn} id={id.id}>Добавить свой ответ</div>
      {/* <div className={classes.addBtn}>Добавить фото</div> */}
      <div className={classes.addBtn}>Добавить пояснение</div>
    </div>
  );
};

export default CheckBoxDLS;
