import React, { useState } from "react";

import classes from "./test.module.css";

const Input = () => {
  return (
    <>
      <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите ответ"
      />
    </>
  );
};

const TestQue = (test) => {
  const [inputList, setInputList] = useState([<Input key={0} />]);
  const [fileName, setFileName] = useState("Файл не выбран");

  const onAddBtnClick = (event) => {
    if (event == "form") {
      setInputList(inputList.concat(<Input key={inputList.length} />));
    }
  };

  function handleChange(event) {
    setFileName(event.target.files[0].name);
    console.log(test.idfileColor);
    document.getElementById(`${test.idfileColor}`).style = "color: #000";
  }
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
    </div>
  );
};

export default TestQue;
