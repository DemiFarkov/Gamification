import React, { useEffect, useState } from "react";
import classes from "./test.module.css";
import CheckBoxDLS from "./checkBoxDLS";
import { TextField } from "@mui/material";
import {
  StyledInputRoot,
  StyledInputElement,
  StyledButton,
} from "./inputComponent";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  Unstable_NumberInput as BaseNumberInput
} from "@mui/base/Unstable_NumberInput";
const Input = (props) => {
  const { content, idInput, countForAnswer } = props;
  useEffect(() => {
    if (content) {
      document.querySelector(`#${idInput}`).value = content.option_text;
    }
  }, []);
  return (
    <div className={classes.answerInputContainer}>
      <TextField
        id={idInput}
        multiline
        autoComplete="none"
        onChange={() => props.changeArrInput(countForAnswer, idInput, "input")}
        required
        placeholder="Введите ответ"
        sx={{
          padding: "0 1vw",
          background: "#D9D9D9",
          borderRadius: "3vw",
          width: "90%",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
            borderRadius: "3vw",
          },
          "& .MuiOutlinedInput-notchedOutline:hover": {
            border: "99px solid #fff",
          },
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderColor: "#fff",
            },
          },
          "& .MuiInputBase-root-MuiOutlinedInput-root.": {
            color: "#fff",
          },
          "& .MuiOutlinedInput-root": {
            padding: ".7vw 1vw",
            color: "#000",
            fontSize: "1.2vw",
          },
        }}
      />
      {/* <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите ответ"
        id={idInput}
        onChange={() =>
          props.changeArrInput(countForAnswer, idInput, "input")
        }
        required
      />{" "} */}
      {props.customAnswer == false && (
        <TestAnswerCheckbox
          idCheckBox={idInput + "checkBox"}
          customAnswer={props.customAnswer}
          changeArrInput={props.changeArrInput}
          idInput={idInput}
          countForAnswer={countForAnswer}
          content={content && content.is_correct}
        />
      )}
    </div>
  );
};

const InputDLS = (props) => {
  return (
    <div className={classes.answerInputContainer}>
      <TextField
        multiline
        cols={30}
        id={props.idInput}
        onChange={() => props.changeArrInput(countForAnswer, idInput, "input")}
        required
        placeholder="Введите ответ"
        sx={{
          background: "#D9D9D9",
          borderRadius: "3vw",
          width: "90%",
          "& .MuiFormControl-root": {
            borderRadius: "1vw",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #fff",
            borderRadius: "3vw",
          },
          "& .MuiInputLabel-root": {
            color: "#fff",
            fontSize: "1.2vw",
          },
          "& .MuiInputBase-root-MuiOutlinedInput-root.": {
            color: "#fff",
          },
          "& .MuiOutlinedInput-root": {
            padding: ".7vw",
            color: "#000",
            fontSize: "1.2vw",
          },
        }}
      />
      {/* <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите ответ"
        id={props.idInput}
        onChange={() =>
          props.changeArrInput(props.countForAnswer, props.idInput, "input")
        }
        required
      />{" "} */}
      {props.customAnswer == false && (
        <TestAnswerCheckbox
          idCheckBox={props.idInput + "checkBox"}
          customAnswer={props.customAnswer}
          changeArrInput={props.changeArrInput}
          idInput={props.idInput}
          countForAnswer={props.countForAnswer}
        />
      )}
    </div>
  );
};

const TestAnswerCheckbox = (props) => {
  const { content, idCheckBox } = props;
  useEffect(() => {
    if (content == true) {
      document.querySelector(`#${idCheckBox}`).checked = true;
    }
  }, []);
  return (
    <>
      <input
        type="checkbox"
        id={idCheckBox}
        className={classes.testAnswerCheckbox}
        onChange={() => {
          props.changeArrInput(
            props.countForAnswer,
            props.idInput,
            "check",
            idCheckBox
          );
        }}
      />
      <label
        htmlFor={idCheckBox}
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
    changeMinPointsForTest,
    idPlusRemove,
    idCheckBoxTime,
    idCheckBoxCustom,
    idMainBlock,
    idCheckBoxAbout,
    setForRemove,
    idValuePoins,
    getBase64,
    content,
    setUpOrDown,
    data,
    setModalValidTestText,
    setVisibleModalValidTest,
  } = props;
  const [countForAnswer, setCountForAnswer] = useState(1);
  const [customAnswer, setCustomAnswer] = useState(false);
  const [limitedTime, setLimitedTime] = useState(false);
  const [annotation, setAnnotation] = useState(false);
  const [df, setDf] = useState(1);
  const [fileImg, setFileImg] = useState("");

  const [fileName, setFileName] = useState();
  const [collectionQue, setCollectionQue] = useState({});
  const [answer_options, setAnswer_options] = useState([
    {
      option_text: "",
      is_correct: false,
    },
  ]);

  const [suppAnswer_options, setSuppAnswer_options] = useState([]);
  const [inputList, setInputList] = useState([
    <Input
      key={0}
      customAnswer={customAnswer}
      countForAnswer={0}
      idCheckBoxCustom={idCheckBoxCustom}
      idInput={idMainBlock + "IdInput" + 0}
      removeInput={removeInput}
      changeArrInput={changeArrInput}
    />,
  ]);

  // Вывод сохранненого вопроса
  useEffect(() => {
    if (content) {
      document.querySelector(`#${idText}`).value = content.question_text;
      setDf(content.points);
      document.querySelector(`#${idValuePoins}`).value = Number(content.points);

      if (content.answer_options.length > 0) {
        setAnswer_options(content.answer_options);
      } else {
        setAnswer_options([
          {
            option_text: "",
            is_correct: false,
          },
        ]);
      }

      let collectionInputList = [];

      for (let i = 0; i < content.answer_options.length; i++) {
        collectionInputList[i] = (
          <Input
            key={i + 1}
            customAnswer={customAnswer}
            countForAnswer={i}
            idCheckBoxCustom={idCheckBoxCustom}
            idInput={idMainBlock + "IdInput" + i}
            removeInput={removeInput}
            changeArrInput={changeArrInput}
            content={content.answer_options[i]}
            points={content}
          />
        );
      }
      if (content.question_type == "text") {
        setCustomAnswer(true);
        collectionInputList[0] = (
          <Input
            key={0}
            customAnswer={customAnswer}
            countForAnswer={0}
            idCheckBoxCustom={idCheckBoxCustom}
            idInput={idMainBlock + "IdInput" + 0}
            removeInput={removeInput}
            changeArrInput={changeArrInput}
            content={content.answer_options[0]}
          />
        );
        document.querySelector(`#${idCheckBoxCustom}`).checked = true;
      }
      if (content.explanation) {
        setAnnotation(true);
        document.querySelector(`#${idCheckBoxAbout}`).checked = true;
      }
      if (content.duration_seconds) {
        setLimitedTime(true);
        document.querySelector(`#${idCheckBoxTime}`).checked = true;
      }

      setCountForAnswer(
        content.answer_options.length == 0 ? 1 : content.answer_options.length
      );
      setInputList(collectionInputList);
    }
    changecollectionQue();
    document
      .querySelectorAll(".base-NumberInput-incrementButton")
      .forEach((el) => {
        el.type = "button";
      });
    document
      .querySelectorAll(".base-NumberInput-decrementButton")
      .forEach((el) => {
        el.type = "button";
      });
    changeMinPointsForTest();
  }, []);
  useEffect(() => {
    if (content) {
      if (annotation) {
        document.querySelector(`#${idExplanation}`).value = content.explanation;
      }
      if (limitedTime) {
        document.querySelector(`#${idTime}`).value = content.duration_seconds;
      }
    }
    changecollectionQue();
  }, [annotation, limitedTime, fileImg]);

  // Создание объекта с данными из этого вопроса
  function changecollectionQue() {
    let question_type = "error";
    let question_type_counter = 0;

    for (let i = 0; i < answer_options.length; i++) {
      if (answer_options[i].is_correct == true) {
        question_type_counter++;
      }
    }
    if (customAnswer) {
      question_type = "text";
    } else if (question_type_counter == 1) {
      question_type = "single";
    } else if (question_type_counter > 1) {
      question_type = "multiple";
    }
    let explanationValue = document.querySelector(`#${idExplanation}`)
      ? document.querySelector(`#${idExplanation}`).value
      : "";
    let answerOptions = customAnswer ? answer_options[0] : answer_options;
    let timeValue = document.querySelector(`#${idTime}`)
      ? Number(document.querySelector(`#${idTime}`).value)
      : 0;
      console.log(fileName)
    setCollectionQue({
      type: "question",
      content: {
        image: null,
        question_text: document.querySelector(`#${idText}`).value,
        question_type: question_type,
        points: Number(document.querySelector(`#${idValuePoins}`).value),
        explanation: explanationValue,
        answer_options: question_type !== "text" ? answerOptions : [],
        duration_seconds: timeValue,
      },
    });
  }
  // Отправка объекта с данными из этого вопроса в общий массив данных
  useEffect(() => {
    data(collectionQue, idMainBlock);
  }, [collectionQue]);

  // Изменение вспомогательного state
  function changeArrInput(index, id, who, idCheckBox) {
    if (who == "check") {
      let is_correct_answer = false;
      if (document.querySelector(`#${idCheckBox}`).checked == true) {
        is_correct_answer = true;
      } else {
        is_correct_answer = false;
      }
      setSuppAnswer_options(["check", is_correct_answer, index]);
    } else if (who == "input") {
      let value = document.querySelector(`#${id}`).value;
      setSuppAnswer_options(["input", value, index]);
    }
  }
  // При изменении вспомогательного state корректируем объект с данными из полей ответа
  useEffect(() => {
    if (suppAnswer_options[0] !== undefined) {
      let clonedObj = structuredClone(answer_options);
      if (suppAnswer_options[0] == "check") {
        clonedObj[suppAnswer_options[2]].is_correct = suppAnswer_options[1];
      } else if (suppAnswer_options[0] == "input") {
        clonedObj[suppAnswer_options[2]].option_text = suppAnswer_options[1];
      }
      setAnswer_options(clonedObj);
      changecollectionQue();
    }
  }, [suppAnswer_options]);

  // При изменении объекта с данными из полей ответа корректируем объект который отправится в общий массив данных
  useEffect(() => {
    changecollectionQue();
  }, [answer_options, fileName]);

  // Если ответ кастомный, то прячем первый чекбокс для отметки правильных ответов, остальные отображаются по условию при рендере
  useEffect(() => {
    if (customAnswer) {
      let testAnswerCheckbox = document.querySelector(
        `#${idMainBlock} > .${classes.answerInputContainer} > .${classes.testAnswerLAbel}`
      );
      if (testAnswerCheckbox !== null) {
        if (testAnswerCheckbox.length == 0) {
          testAnswerCheckbox = document.querySelector(
            `#${idMainBlock} > .${classes.answerInputContainer} > .${classes.hidden}`
          );
        }
        testAnswerCheckbox.className = customAnswer
          ? classes.hidden
          : classes.testAnswerLAbel;
        let input = document.querySelector(`#${idMainBlock + "IdInput" + 0}`);
        input.value = "Данный ответ введет тестируемый";
        input.disabled = true;
      }
    }
    changecollectionQue();
  }, [customAnswer]);

  function removeThisBlock(id) {
    setVisibleModalValidTest(true);
    setModalValidTestText([
      "Вы действительно хотите удалить этот блок?",
      true,
      "remove block",
      id,
    ]);
  }
  // Содание поля для ответа
  function onAddBtnClick() {
    setCountForAnswer(countForAnswer + 1);

    if (customAnswer === false) {
      setInputList(
        inputList.concat(
          <Input
            key={countForAnswer + 1}
            customAnswer={customAnswer}
            countForAnswer={countForAnswer}
            idInput={idMainBlock + "IdInput" + countForAnswer}
            removeInput={removeInput}
            changeArrInput={changeArrInput}
          ></Input>
        )
      );
      let clonedObj = structuredClone(answer_options);
      clonedObj.push({ option_text: "", is_correct: false });
      setAnswer_options(clonedObj);
    }
    changecollectionQue();
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
      setCountForAnswer(countForAnswer - 1);
    }
  }
  // Изменение цвета названия файла при выборе файла
  function handleChange(event) {
    setFileName(event.target.files[0]);
    getBase64(event.target.files[0]).then((value) => setFileImg(value));
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
    <div className={classes.MainBlock} id={idMainBlock}>
      <div className={classes.titleContainer}>
        <h2 className={classes.blockTitle} id="idTitleBlock"></h2>
        <div className={classes.arrowsContainer}>
          <div
            className={classes.arrowUp}
            onClick={() => {
              setUpOrDown(["up", countForBlocks]);
            }}
          >
            <ArrowBackIosNewIcon
              sx={{ transform: "rotate(90deg)" }}
              className={classes.arrow}
            />
          </div>
          <div
            className={classes.arrowDown}
            onClick={() => {
              setUpOrDown(["down", countForBlocks]);
            }}
          >
            <ArrowBackIosNewIcon
              sx={{ transform: "rotate(-90deg)" }}
              className={classes.arrow}
            />
          </div>
        </div>
      </div>

      <div className={classes.firstAnswerInputWrapper}>
        <input
          type="text"
          id={idText}
          className={classes.answerInput}
          placeholder="Введите вопрос"
          onChange={() => changecollectionQue()}
          required
        />
      </div>

      {customAnswer ? inputList[0] : inputList}
      <CustomNumberInput
        min={1}
        id={idValuePoins}
        required
        value={df}
        onInputChange={(event) => {
          setDf(Number(event.target.value)),
            changeMinPointsForTest(),
            changecollectionQue();
        }}
        className="divEnterPoints"
        onChange={(event, val) => {
          setDf(val), changeMinPointsForTest(), changecollectionQue();
        }}
        aria-label="Demo number input"
        placeholder="Баллы за ответ"
      />
      {/* <input
        type="number"
        className={classes.answerInput}
        placeholder="Введите баллы за правильный ответ"
        max={100}
        min={1}
        name="pointsForQue"
        onFocus={(e) =>
          e.target.addEventListener(
            "wheel",
            function (e) {
              e.preventDefault();
            },
            { passive: false }
          )
        }
        id={idValuePoins}
        onChange={(value) => {
          changecollectionQue();
          changeMinPointsForTest();
        }}
        required
      /> */}
      <div className={classes.answerInputFileContainer}>
        <label htmlFor={idfile} className={classes.answerInputFileText}>
          Выберите файл
        </label>
        <div className={classes.answerInputFileName} id={idfileColor}>
          {fileName ? fileName.name : "Файл не выбран"}
        </div>
        <input
          id={idfile}
          type="file"
          onChange={handleChange}
          className={classes.answerInputFile}
          accept="image/jpeg,image/png"
        />
      </div>

      {annotation && (
        <TextField
          id={idExplanation}
          multiline
          autoComplete="none"
          onChange={() => changecollectionQue()}
          required
          placeholder="Введите пояснение"
          sx={{
            padding: "0 1vw",
            marginTop: "1vw",
            background: "#D9D9D9",
            borderRadius: "3vw",
            width: "90%",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
              borderRadius: "3vw",
            },
            "& .MuiOutlinedInput-notchedOutline:hover": {
              border: "99px solid #fff",
            },
            "& .MuiOutlinedInput-root:hover": {
              "& > fieldset": {
                borderColor: "#fff",
              },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                border: "none",
              },
            },
            "& .MuiInputBase-root-MuiOutlinedInput-root.": {
              color: "#fff",
            },
            "& .MuiOutlinedInput-root": {
              padding: ".7vw",
              color: "#000",
              fontSize: "1.2vw",
            },
          }}
        />
      )}

      {limitedTime && (
        <input
          type="number"
          id={idTime}
          className={classes.answerInput}
          min={1}
          max={100000}
          onChange={() => changecollectionQue()}
          placeholder="Введите время на вопрос в секундах"
          required
        />
      )}

      <div
        className={classes.BtnRemoveBlock}
        onClick={() => removeThisBlock(idMainBlock)}
      >
        Удалить
      </div>
      <CheckBoxDLS
        id={idPlus}
        idRemove={idPlusRemove}
        idCheckBoxTime={idCheckBoxTime}
        idCheckBoxCustom={idCheckBoxCustom}
        setCustomAnswer={setCustomAnswer}
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

const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props,
  ref
) {
  return (
    <BaseNumberInput
      required
      slots={{
        root: StyledInputRoot,

        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: "▴",
        },
        decrementButton: {
          children: "▾",
        },
      }}
      {...props}
      ref={ref}
    />
  );
});
