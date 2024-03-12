import React, { useState } from "react";
import classes from "./test.module.css";

const TestForm = (form) => {
  const [fileName, setFileName] = useState("Файл не выбран");
  function handleChange(event) {
    setFileName(event.target.files[0].name);
    document.getElementById(`${form.idfileColor}`).style = "color: #000";
  }
  return (
    <div className={classes.testBlock}>
      <input
        type="text"
        className={classes.answerInput}
        placeholder="Заголовок"
      />
      <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите текст"
      />

      <div className={classes.answerInputFileContainer}>
        <label htmlFor={form.idfile} className={classes.answerInputFileText}>
          Выберите файл
        </label>
        <div className={classes.answerInputFileName} id={form.idfileColor}>
          {fileName}
        </div>
        <input
          id={form.idfile}
          type="file"
          onChange={handleChange}
          className={classes.answerInputFile}
        />
      </div>
    </div>
  );
};

export default TestForm;
