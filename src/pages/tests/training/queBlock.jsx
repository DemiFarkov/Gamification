import React, { useEffect, useRef, useState } from "react";
import classes from "./traning.module.css";
import {
  Button,
  FormControl,
  FormHelperText,
  TextField,
  colors,
  useFormControl,
} from "@mui/material";
import Timer from "./timer";

const QueBlock = (props) => {
  const {
    data,
    setCountForData,
    countForData,
    countAnswers,
    setCountAnswers,
    list,
    countQue,
    blockLength,
    setCountQue,
    setType,
    dataСollection,
    timeForTest,
    setTimerStop,
  } = props;
  const [answersValue, setAnswersValue] = useState([]);
  const [customAnswer, setCustomAnswer] = useState(false);
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(true);
  const duration_seconds = data.content.duration_seconds;
  const [timerComponent, setTimerComponent] = useState();
  const [refTimer, setRefTimer] = useState(0);

  const [timerForСontinue, setTimerForСontinue] = useState(5);
  const [textValue, setTextValue] = useState("");
  const typeQue = data.content.question_type;

  useEffect(() => {
    if (!timer) {
      let timerId = setInterval(
        () =>
          setTimerForСontinue(
            (prevTimerForСontinue) => prevTimerForСontinue - 1
          ),
        1000
      );
      setTimeout(() => {
        clearInterval(timerId), handleClick();
      }, 5000);
    }
  }, [timer]);
  useEffect(() => {
    console.log(countQue);
    if (data.content.duration_seconds > 0) {
      setTimerComponent(
        <Timer
          countQue={countQue}
          timeQue={data.content.duration_seconds}
          setTimer={setTimer}
          whichTimer={"forQue"}
          setRefTimer={setRefTimer}
        />
      );
    }

    setAnswersValue([]);
    setCustomAnswer(false);
    setTimer(true);
    setTimerStop(false);
    setTimerForСontinue(5);
    if (data.content.question_type == "text") {
      setCustomAnswer(true);
      setAnswersValue("ww");
    }
    let checkboxes = document.querySelectorAll(
      `.${classes.checkboxLabelCheckError}`
    );
    checkboxes.forEach(
      (element) => (element.classList = classes.checkboxLabelCheck)
    );

    let clonedObj = [];
    for (let i = 0; i < data.content.answer_options.length; i++) {
      clonedObj[i] = false;
    }
    let checkboxs = document.querySelectorAll(`.${classes.checkboxInput}`);
    for (let i = 0; i < checkboxs.length; i++) {
      checkboxs[i].checked = false;
    }
    document.querySelector("#idInput") && (document.querySelector("#idInput").value = "")
    setAnswersValue(clonedObj);
    setError(false);
  }, [data]);

  function clickAnswer(index, id, type) {
    if (typeQue == "multiple") {
      let checked = document.querySelector(`#${id}`).checked;
      let clonedObj = structuredClone(answersValue);
      clonedObj[index] = checked;
      setAnswersValue(clonedObj);
    }
  }

  useEffect(() => {
    let Circle = document.querySelectorAll(`.${classes.queCircle}`);
    for (let i = 0; i < countQue; i++) {
      Circle[i].style.background = "#378b85";
    }
  }, [countQue]);
  function timeOut() {
    dataСollection(-1, countQue - 1);
    setType();
    setCountQue(countQue + 1);
  }
  function handleClick() {
    clearInterval(refTimer);
    let clonedObj = structuredClone(answersValue);
    let suppArr = [];
    if (typeQue == "single") {
      let answerNumber = document.querySelector(
        'input[name="Answer_optionsInput"]:checked'
      );

      if (answerNumber) {
        dataСollection(answerNumber.value, countQue - 1);
        setType();
        setCountQue(countQue + 1);
        setTimerStop(true);
      } else {
        let checkboxes = document.querySelectorAll(
          `.${classes.checkboxLabelCheck}`
        );
        timer
          ? (setError([true, "Выберите ответ прежде, чем продолжить"]),
            checkboxes.forEach(
              (element) => (element.classList = classes.checkboxLabelCheckError)
            ))
          : timeOut();
      }
    } else if (typeQue == "multiple") {
      for (let i = 0; i < clonedObj.length; i++) {
        if (clonedObj[i] == true) {
          suppArr[suppArr.length] = i + 1;
        }
      }
      if (suppArr.length !== 0) {
        dataСollection(suppArr, countQue - 1);
        setType();
        setCountQue(countQue + 1);
        setTimerStop(true);
      } else {
        let checkboxes = document.querySelectorAll(
          `.${classes.checkboxLabelCheck}`
        );
        timer
          ? (setError([
              true,
              "Выберите один или несколько ответов прежде, чем продолжить",
            ]),
            checkboxes.forEach(
              (element) => (element.classList = classes.checkboxLabelCheckError)
            ))
          : timeOut();
      }
    } else if (typeQue == "text") {
      if (answersValue.length !== 0) {
        dataСollection(answersValue, countQue - 1);
        setType();
        setCountQue(countQue + 1);
      } else {
        timer
          ? setError([true, "Введите ответ прежде, чем продолжить"])
          : timeOut();
      }
    }
  }
  useEffect(() => {
    console.log(duration_seconds);
  }, []);

  return (
    <div className={classes.QueContainer}>
      <div className={classes.countQue}>
        <div className={classes.countQueWrapper}>
          <div className={classes.QueTimer}>{timeForTest}</div>
          <div className={classes.QueTable}>{list}</div>
        </div>
      </div>
      <div className={classes.ThisQue}>
        {" "}
        {timer ? (
          <div>
            <div className={classes.QueTitleCOntainer}>
              <div className={classes.TimeDuration}>
                {duration_seconds > 0 && timerComponent}
              </div>
              <h1
                className={classes.numberQue}
                style={
                  duration_seconds > 0
                    ? { marginLeft: "5vw" }
                    : { marginLeft: "calc(5vw+30%" }
                }
              >
                Вопрос № {countQue}
              </h1>
            </div>

            <div className={classes.queContent}>
              <div className={classes.ThisQueText}>
                {data.content.question_text}
              </div>

              <div className={classes.answersContainer}>
                {customAnswer ? (
                  <div>
                    <TextField
                      multiline
                      fullWidth
                      label={"Ваш ответ"}
                      id="idInput"
                      onChange={(event) => setAnswersValue(event.target.value)}
                      sx={{
                        marginTop: "2vw",
                        borderRadius: "3vw",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "1px solid #fff !important",
                        },
                        "& .MuiInputLabel-root": {
                          color: "#fff !important",
                        },
                        "& .MuiInputBase-root-MuiOutlinedInput-root.": {
                          color: "#fff",
                          fontSize: "1.2vw",
                        },
                        "& .MuiOutlinedInput-root": { color: "#fff" },
                        "& .MuiOutlinedInput-root:hover": {
                          color: "#fff",
                          "& > fieldset": {
                            borderColor: "#fff",
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  data.content.answer_options.map((option, index) => (
                    <Answer_options
                      type={typeQue == "single" ? "radio" : "checkbox"}
                      index={index}
                      typeQue={typeQue}
                      key={index}
                      option_text={option.option_text}
                      id={"id" + countForData + "CheckBoxAnswer" + index}
                      clickAnswer={clickAnswer}
                    />
                  ))
                )}
              </div>
              <div className={classes.warningText}>
                {error[0] && `${error[1]}`}
              </div>
            </div>

            <Button
              variant="contained"
              size="large"
              className={classes.theoryBtn}
              onClick={() => {
                handleClick();
              }}
            >
              {countForData !== blockLength - 1 ? "Далее" : "Завершить тест"}
            </Button>
          </div>
        ) : (
          <div className={classes.timeOut}>
            Время на вопрос вышло. <br /> Переход далее через:{" "}
            {timerForСontinue}{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueBlock;

const Answer_options = (props) => {
  const { index, option_text, countForData, typeQue, id, clickAnswer, type } =
    props;
  return (
    <div className={classes.answerParticular}>
      <input
        name="Answer_optionsInput"
        type={type}
        id={id}
        className={classes.checkboxInput}
        onChange={() => {
          clickAnswer(index, id, type);
        }}
        value={index + 1}
      />
      <label htmlFor={id} className={classes.checkboxLabel} id="checkboxLabel">
        <span
          className={classes.checkboxLabelCheck}
          style={
            typeQue == "single"
              ? { borderRadius: "50%" }
              : { borderRadius: "0.25em" }
          }
        ></span>
        <span>{option_text}</span>
      </label>
    </div>
  );
};
