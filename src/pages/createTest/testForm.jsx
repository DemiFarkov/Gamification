import React, { useEffect, useState } from "react";
import classes from "./test.module.css";

const TestForm = (props) => {
  const {
    idMainBlock,
    setForRemove,
    idfile,
    idfileColor,
    idTitle,
    idText,
    data,
    countForBlocks,blockList
  } = props;
  const [fileName, setFileName] = useState("Файл не выбран");
  const [collectionForm, setCollectionForm] = useState({});

  function handleChange(event) {
    setFileName(event.target.files[0].name);
    document.getElementById(`${idfileColor}`).style = "color: #000";
  }
  // Создание объекта с данными из этого вопроса
  function changecollectionQue() {
    let title = document.querySelector(`#${idTitle}`)
      ? document.querySelector(`#${idTitle}`).value
      : "";
    let text = document.querySelector(`#${idText}`)
      ? document.querySelector(`#${idText}`).value
      : "";
    setCollectionForm({
      type: "form",
      form_title: title,
      form_text: text,
    });
  }
  // Отправка объекта с данными из этой формы в общий массив данных
  useEffect(() => {
    data(collectionForm, countForBlocks);
  }, [collectionForm]);

  // // Изменение вспомогательного state
  // function changeArrInput(index, id, idCheckBox) {
  //   let is_correct_answer = false;
  //   if (idCheckBox) {
  //     if (document.querySelector(`#${idCheckBox}`).checked == true) {
  //       is_correct_answer = true;
  //     }
  //   }
  //   let value = document.querySelector(`#${id}`).value;
  //   setSuppAnswer_options({
  //     option_text: value,
  //     index: index,
  //     is_correct_answer: is_correct_answer,
  //   });
  // }

  // // При изменении вспомогательного state корректируем объект с данными из полей ответа
  // useEffect(() => {
  //   if (suppAnswer_options.option_text !== undefined) {
  //     let clonedObj = structuredClone(answer_options);
  //     clonedObj[suppAnswer_options.index] = {
  //       option_text: suppAnswer_options.option_text,
  //       is_correct: suppAnswer_options.is_correct_answer,
  //     };
  //     setAnswer_options(clonedObj);
  //   }
  // }, [suppAnswer_options]);

  // // При изменении объекта с данными из полей ответа корректируем объект который отправится в общий массив данных
  // useEffect(() => {
  //   changecollectionQue();
  // }, [answer_options]);

  return (
    <div className={classes.testBlock} id={idMainBlock}>
      <h2 className={classes.blockTitle} id="idTitleBlock"></h2>

      <input
        type="text"
        className={classes.answerInput}
        placeholder="Заголовок"
        id={idTitle}
        onChange={() => changecollectionQue()}
      />
      <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите текст"
        id={idText}
        onChange={() => changecollectionQue()}
      />

      <div className={classes.answerInputFileContainer}>
        <label htmlFor={idfile} className={classes.answerInputFileText}>
          Выберите файл
        </label>
        <div className={classes.answerInputFileName} id={idfileColor}>
          {fileName}
        </div>
        <input
          id={idfile}
          type="file"
          onChange={handleChange}
          className={classes.answerInputFile}
        />
      </div>

      <div
        className={classes.BtnRemoveBlock}
        onClick={() => setForRemove(idMainBlock)}
      >
        Удалить
      </div>
    </div>
  );
};

export default TestForm;
