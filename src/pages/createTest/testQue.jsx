import React, { useEffect, useState } from "react";
import classes from "./test.module.css";
import CheckBoxDLS from "./checkBoxDLS";

const Input = (props) => {
  return (
    <div className={classes.answerInputContainer}>
      <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите ответ"
        id={props.idInput}
        onChange={() => props.changeArrInput(props.justCount, props.idInput)}
        required
      />{" "}
      {props.customAnswer == false && (
        <TestAnswerCheckbox
          idCheckBox={props.idInput + "checkBox"}
          customAnswer={props.customAnswer}
          changeArrInput={props.changeArrInput}
          idInput={props.idInput}
          justCount={props.justCount}
        />
      )}
    </div>
  );
};

const InputDLS = (props) => {
  return (
    <div className={classes.answerInputContainer}>
      <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите ответ"
        id={props.idInput}
        onChange={() => props.changeArrInput(props.justCount, props.idInput)}
        required
      />{" "}
      {props.customAnswer == false && (
        <TestAnswerCheckbox
          idCheckBox={props.idInput + "checkBox"}
          customAnswer={props.customAnswer}
          changeArrInput={props.changeArrInput}
          idInput={props.idInput}
          justCount={props.justCount}
        />
      )}
    </div>
  );
};

const TestAnswerCheckbox = (props) => {
  return (
    <>
      <input
        type="checkbox"
        id={props.idCheckBox}
        className={classes.testAnswerCheckbox}
        onChange={() =>
          props.changeArrInput(props.justCount, props.idInput, props.idCheckBox)
        }
      />
      <label
        htmlFor={props.idCheckBox}
        className={
          props.customAnswer ? classes.hidden : classes.testAnswerLAbel
        }
      ></label>
    </>
  );
};

const TestQue = (props) => {
  const {
    countForBlocks,
    idfile,
    idText,
    idTime,
    idExplanation,
    idfileColor,
    idPlus,
    idPlusRemove,
    idCheckBoxTime,
    idCheckBoxCustom,
    idMainBlock,
    idCheckBoxAbout,
    setForRemove,
    idValuePoins,
    data,
    blockList,
    idTitleBlock,
  } = props;
  const [justCount, setJustCount] = useState(1);
  const [customAnswer, setcustomAnswer] = useState(false);
  const [limitedTime, setLimitedTime] = useState(false);
  const [annotation, setAnnotation] = useState(false);
  const [fileName, setFileName] = useState("Файл не выбран");
  const [collectionQue, setCollectionQue] = useState({});
  const [answer_options, setAnswer_options] = useState([]);
  const [suppAnswer_options, setSuppAnswer_options] = useState([]);
  const [actualNumberBlock, setActualNumberBlock] = useState();
  const [inputList, setInputList] = useState([
    <Input
      key={0}
      customAnswer={customAnswer}
      justCount={0}
      idCheckBoxCustom={idCheckBoxCustom}
      idInput={idMainBlock + "IdInput" + 0}
      removeInput={removeInput}
      changeArrInput={changeArrInput}
    />,
  ]);

  // Создание объекта с данными из этого вопроса
  function changecollectionQue() {
    let question_type = "error";
    let question_type_counter = 0;
    for (let i = 0; i < answer_options.length; i++) {
      if (answer_options[i].is_correct == true) {
        question_type_counter++;
      }
    }
    if (question_type_counter == 1) {
      question_type = "single";
    } else if (question_type_counter > 1) {
      question_type = "multy";
    }
    let explanationValue = document.querySelector(`#${idExplanation}`)
      ? document.querySelector(`#${idExplanation}`).value
      : "";
    let answerOptions = customAnswer ? answer_options[0] : answer_options;
    let timeValue = document.querySelector(`#${idTime}`)
      ? document.querySelector(`#${idTime}`).value
      : "";
    setCollectionQue({
      type: "question",
      question_text: document.querySelector(`#${idText}`).value,
      question_type: question_type,
      points: document.querySelector(`#${idValuePoins}`).value,
      explanation: explanationValue,
      answer_options: answerOptions,
      time: timeValue,
    });
  }
  // Отправка объекта с данными из этого вопроса в общий массив данных
  useEffect(() => {
    data(collectionQue, countForBlocks);
  }, [collectionQue, answer_options]);

  // Изменение вспомогательного state
  function changeArrInput(index, id, idCheckBox) {
    let is_correct_answer = false;
    if (idCheckBox) {
      if (document.querySelector(`#${idCheckBox}`).checked == true) {
        is_correct_answer = true;
      }
    }
    let value = document.querySelector(`#${id}`).value;
    setSuppAnswer_options({
      option_text: value,
      index: index,
      is_correct_answer: is_correct_answer,
    });
  }

  // При изменении вспомогательного state корректируем объект с данными из полей ответа
  useEffect(() => {
    if (suppAnswer_options.option_text !== undefined) {
      let clonedObj = structuredClone(answer_options);
      clonedObj[suppAnswer_options.index] = {
        option_text: suppAnswer_options.option_text,
        is_correct: suppAnswer_options.is_correct_answer,
      };
      setAnswer_options(clonedObj);
    }
  }, [suppAnswer_options]);

  // При изменении объекта с данными из полей ответа корректируем объект который отправится в общий массив данных
  useEffect(() => {
    changecollectionQue();
  }, [answer_options]);

  // Если ответ кастомный, то прячем первый чекбокс для отметки правильных ответов, остальные отображаются по условию при рендере
  useEffect(() => {
    let testAnswerCheckbox = document.querySelector(
      `#${idMainBlock} > .${classes.answerInputContainer} > .${classes.testAnswerLAbel}`
    );
    if (testAnswerCheckbox.length == 0) {
      testAnswerCheckbox = document.querySelector(
        `#${idMainBlock} > .${classes.answerInputContainer} > .${classes.hidden}`
      );
    }
    testAnswerCheckbox.className = customAnswer
      ? classes.hidden
      : classes.testAnswerLAbel;
  }, [customAnswer]);
  useEffect(() => {
    for (let i = 0; i < blockList.length; i++) {
      if (blockList[i].props.idMainBlock == idMainBlock) {
        setActualNumberBlock(i);
      }
    }
  }, [blockList]);
  // Содание поля для ответа
  function onAddBtnClick() {
    setJustCount(justCount + 1);

    if (customAnswer === false) {
      setInputList(
        inputList.concat(
          <InputDLS
            key={justCount}
            customAnswer={customAnswer}
            justCount={justCount}
            idInput={idMainBlock + "IdInput" + justCount}
            removeInput={removeInput}
            changeArrInput={changeArrInput}
          ></InputDLS>
        )
      );
    }
  }
  //  Удаление поля для ответа со страницы и из массива для отправки данных
  function removeInput() {
    if (customAnswer === false) {
      if (inputList.length > 1) {
        setInputList(
          inputList.filter(function (currentValue, index) {
            return index < inputList.length - 1;
          })
        );
        setAnswer_options(
          answer_options.filter(function (currentValue, index) {
            return index < answer_options.length - 1;
          })
        );
      }
    }
  }
  // Изменение цвета названия файла при выборе файла
  function handleChange(event) {
    setFileName(event.target.files[0].name);
    document.getElementById(`${idfileColor}`).style = "color: #000";
  }

  // Создание прослушивателя событий у кнопки для добавления полей с ответом
  useEffect(() => {
    const element = document.querySelector(`#${idPlus}`);
    element.addEventListener("click", onAddBtnClick);
    return () => {
      element.removeEventListener("click", onAddBtnClick);
    };
  });
  return (
    <div className={classes.testBlock} id={idMainBlock}>
      <h2 className={classes.blockTitle} id="idTitleBlock"></h2>
      <input
        type="text"
        id={idText}
        className={classes.answerInput}
        placeholder="Введите вопрос"
        onChange={(value) => changecollectionQue(value)}
        required
      />
      {customAnswer ? inputList[0] : inputList}

      <input
        type="number"
        className={classes.answerInput}
        placeholder="Введите баллы за правильный ответ"
        max={100}
        id={idValuePoins}
        onChange={(value) => changecollectionQue(value)}
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

      {annotation && (
        <input
          type="text"
          id={idExplanation}
          className={classes.answerInput}
          onChange={(value) => changecollectionQue(value)}
          placeholder="Введите пояснение"
          required
        />
      )}

      {limitedTime && (
        <input
          type="number"
          id={idTime}
          className={classes.answerInput}
          onChange={(value) => changecollectionQue(value)}
          placeholder="Введите время на вопрос в секундах"
          required
        />
      )}

      <div
        className={classes.BtnRemoveBlock}
        onClick={() => setForRemove(idMainBlock)}
      >
        Удалить
      </div>
      <CheckBoxDLS
        id={idPlus}
        idRemove={idPlusRemove}
        idCheckBoxTime={idCheckBoxTime}
        idCheckBoxCustom={idCheckBoxCustom}
        setcustomAnswer={setcustomAnswer}
        customAnswer={customAnswer}
        removeInput={removeInput}
        inputList={inputList}
        idCheckBoxAbout={idCheckBoxAbout}
        setLimitedTime={setLimitedTime}
        setAnnotation={setAnnotation}
      />
    </div>
  );
};

export default TestQue;
