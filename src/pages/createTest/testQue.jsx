import React, { useEffect, useState } from "react";
import plus from "../../img/img_test/plus.svg";
import dash from "../../img/img_test/dash.svg";
import classes from "./test.module.css";
import CheckBoxDLS from "./checkBoxDLS";

const Input = (props) => {
  return (
    <div className={classes.answerInputContainer}>
      <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите ответ"
      />
    </div>
  );
};

const InputDLS = () => {
  return (
    <div className={classes.answerInputContainer}>
      <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите ответ"
      />
    </div>
  );
};

const TestQue = (test) => {
  const [inputList, setInputList] = useState([<Input key={0} />]);
  function onAddBtnClick() {
    setInputList(inputList.concat(<InputDLS key={inputList.length} />));
  }

  const [fileName, setFileName] = useState("Файл не выбран");

  function handleChange(event) {
    setFileName(event.target.files[0].name);
    document.getElementById(`${test.idfileColor}`).style = "color: #000";
  }
  useEffect(() => {
    const element = document.querySelector(`#${test.idPlus}`);
    console.log(element);
    element.addEventListener("click", onAddBtnClick);
    return () => {
      element.removeEventListener("click", onAddBtnClick);
    };
  });
  return (
    <div className={classes.testBlock}>
      <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите вопрос"
      />

      {inputList}

      <input
        type="number"
        className={classes.answerInput}
        placeholder="Введите баллы за ответ"
      />
      <div className={classes.answerInputFileContainer}>
        <label htmlFor={test.idfile} className={classes.answerInputFileText}>
          Выберите файл
        </label>
        <div className={classes.answerInputFileName} id={test.idfileColor}>
          {fileName}
        </div>
        <input
          id={test.idfile}
          type="file"
          onChange={handleChange}
          className={classes.answerInputFile}
        />
      </div>

      <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите пояснения"
      />
      <CheckBoxDLS id={test.idPlus} />
    </div>
  );
};

export default TestQue;
