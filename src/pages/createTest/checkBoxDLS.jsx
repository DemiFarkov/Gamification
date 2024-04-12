import React from "react";
import classes from "./test.module.css";

const CheckBoxDLS = (props) => {
  const {
    id,
    idRemove,
    idCheckBoxTime,
    idCheckBoxCustom,
    setcustomAnswer,
    customAnswer,
    removeInput,
    inputList,
    idCheckBoxAbout,
    setLimitedTime,
    setAnnotation,
  } = props;
  return (
    <div className={classes.mainCheckboxDLS}>
      {" "}
      <input
        type="checkbox"
        id={idCheckBoxTime}
        className={classes.mainCheckboxInputDls}
        onClick={(e) =>
          e.target.checked ? setLimitedTime(true) : setLimitedTime(false)
        }
      />
      <label htmlFor={idCheckBoxTime} className={classes.mainCheckboxLabelDls}>
        Ограничить время вопроса
      </label>
      <input
        type="checkbox"
        id={idCheckBoxAbout}
        className={classes.mainCheckboxInputDls}
        onClick={(e) =>
          e.target.checked ? setAnnotation(true) : setAnnotation(false)
        }
      />
      <label htmlFor={idCheckBoxAbout} className={classes.mainCheckboxLabelDls}>
        Нужно пояснение
      </label>
      <input
        type="checkbox"
        id={idCheckBoxCustom}
        className={classes.mainCheckboxInputDls}
        onClick={(e) =>
          e.target.checked ? setcustomAnswer(true) : setcustomAnswer(false)
        }
      />
      <label
        htmlFor={idCheckBoxCustom}
        className={classes.mainCheckboxLabelDls}
      >
        Свой ответ
      </label>
      <div
        className={customAnswer ? classes.addBtnNoActive : classes.addBtn}
        id={id}
      >
        Добавить ответ
      </div>
      <div
        className={
          inputList.length < 2
            ? classes.addBtnNoActive
            : customAnswer
            ? classes.addBtnNoActive
            : classes.addBtn
        }
        id={idRemove}
        onClick={() => {
          removeInput();
        }}
      >
        Удалить ответ
      </div>
      {/* <div className={classes.addBtn}>Добавить фото</div> */}
    </div>
  );
};

export default CheckBoxDLS;
