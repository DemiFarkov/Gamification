import React, { useEffect, useState } from "react";
import Header from "../../../components/general/header";
import Navigation from "../../../components/general/navigation";
import classes from "./traning.module.css";
import achievement from "../../../img/pngwing6.png";
import { instance } from "../../../utils/axios/index.js";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
const Results = () => {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const idTest = searchParams.get("id");

  useEffect(() => {
    const user = instance
      .get(`test_attempt/test_results/${idTest}`)
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (response) {
        console.log(response);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  return (
    <div id="pdf-content">
      <Header />
      <div className={classes.mainContainer}>
        <Navigation />
        {load ? (
          <div className={classes.loadQuery}>
            <CircularProgress /> <div>Получение данных... </div>
          </div>
        ) : (
          <div className={classes.mainContent}>
            <Content data={data} />
          </div>
        )}
      </div>
    </div>
  );
};
// };

export default Results;

const Content = (props) => {
  const [titleText, setTitleText] = useState("");
  const [achievementId, setAchievementId] = useState();
  const [timeDuration, setTimeDuration] = useState();

  const { data } = props;
  const handleDownloadPDF = async () => {
    window.print();
  };
  useEffect(() => {
    let time = data.duration_seconds;
    let hours = Math.floor(time / 60 / 60);
    time = time - hours * 60 * 60;

    let minutes = Math.floor(time / 60);
    time = time - minutes * 60;

    let seconds = Math.floor(time);
    let stringTimer = `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${seconds > 9 ? seconds : "0" + seconds}`;
    setTimeDuration(stringTimer);

    let el = document.querySelector(`.${classes.achievementText}`);
    if (data.status == "Passed") {
      setTitleText("Поздравляем с успешным прохождением теста!");
      el.style.color = "#FFE500";
      el.style.textShadow = "rgb(0, 0, 0) 1px 0 10px";
    } else if (data.status == "Failed") {
      el.style.color = "#a50f07";
      el.style.textShadow = "rgb(167, 39, 39) 1px 0 10px";

      setTitleText("Тест не пройден!");
    }
  }, []);

  return (
    <div>
      {data.status == "На модерации" ? (
        <>
          {" "}
          <div className={classes.moderationTest}>
            Тест отправлен на модерацию
          </div>
          <div className={classes.btnGoTestsContainer}>
            <Button className={classes.btnGoTests}>
              <Link to="../pages/tests/traning">Вернуться к тестам</Link>{" "}
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1 className={classes.H1}>Итоги теста</h1>
          <div className={classes.contentContainer}>
            <div className={classes.achievementContainer}>
              {data.status == "Passed" && (
                <img
                  src={achievement}
                  alt=""
                  className={classes.achievementImg}
                />
              )}
              <p className={classes.achievementText}>
                {titleText}{" "}
                <span className={classes.achievementName}>
                  {achievementId && "Получено достижение “Первые шаги”!"}
                </span>
              </p>
              {data.status == "Passed" && (
                <img
                  src={achievement}
                  alt=""
                  className={classes.achievementImg}
                />
              )}
            </div>
            <div
              className={classes.ResultsBlockContainer}
              style={{ textAlign: "start", paddingLeft: "2vw" }}
            >

              <div>Дата прохождения теста: {data.test_end_date} </div>
              <div>Тестируемый: {data.employee.name}</div>{" "}
              <div>Модератор теста: {data.moderator}</div>{" "}
              <div>Время прохождения: {timeDuration}</div>
              <Button
                className={classes.saveInPdf}
                onClick={() => {
                  handleDownloadPDF();
                }}
              >
                Сохранить в pdf
              </Button>
            </div>
            {data.answers_info.map((el, index) => (
              <ResultsBlock
                key={index}
                score={index == 0 && data.score}
                sumScore={data.max_score}
                index={index + 1}
                answer_options={el.answer_options}
                text={el.question_text}
                explanation={el.explanation}
                question_score={el.question_score}
                is_correct={el.is_correct}
                is_partially_true={el.is_partially_true}
                type={el.type}
                text_answer={el.type == "text" && el.text_answer}
                moderation_comment={el.type == "text" && el.moderation_comment}
              />
            ))}
            <div className={classes.btnGoTestsContainer}>
              <Button className={classes.btnGoTests}>
                <Link to="../pages/tests/traning">Вернуться к тестам</Link>{" "}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ResultsBlock = (props) => {
  const {
    score,
    sumScore,
    index,
    text,
    explanation,
    answer_options,
    question_score,
    is_correct,
    type,
    text_answer,
    moderation_comment,is_partially_true,
  } = props;
  let stylyTextField = {
    marginTop: "1vw",

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      background: "#D9D9D9",
      borderRadius: "1vw",
      fontSize: "1.2vw",
      padding: "1vw",
    },
    "& .MuiFormHelperText-root": { color: "#fff", fontSize: "1.2vw" },
  };
  return (
    <div className={classes.ResultsBlockContainer} id="sdf">
      <div className={classes.ResultsBlockContent}>
        {score !== false && (
          <div className={classes.ResultsBlockScore}>
            Количество баллов {score} / {sumScore}{" "}
          </div>
        )}
        <div className={classes.titleBlockWrapper}>
          <h2>Вопрос №{index}</h2>
          <div
            className={classes.titleBlockScores}
            style={is_correct ? { color: "#00FF38" } : (is_partially_true ? { color: "#f0df4a" } : { color: "#FF0000" })}
          >
            {question_score} Баллов
          </div>
        </div>

        <div className={classes.ResultsBlockQueText}>{text}</div>
        <div className={classes.ResultsBlockQue}>
          {type == "text" ? (
            <>
            <TextField
                  multiline
                  fullWidth
                  helperText="Пояснение модератора"
                  InputProps={{
                    readOnly: true,
                    value: `${text_answer}`,
                  }}
                  sx={stylyTextField}
                />
              {moderation_comment && (
                <TextField
                  multiline
                  fullWidth
                  helperText="Пояснение модератора"
                  InputProps={{
                    readOnly: true,
                    value: `${moderation_comment}`,
                  }}
                  sx={stylyTextField}
                />
              )}
              {explanation && (
                <TextField
                  multiline
                  fullWidth
                  helperText="Пояснение к вопросу"
                  InputProps={{
                    readOnly: true,
                    value: `${explanation}`,
                  }}
                  sx={stylyTextField}
                />
              )}
            </>
          ) : (
            answer_options.map((el, index) => (
              <ResultsQues
                key={index}
                submitted_answer={el.submitted_answer}
                correct_options={el.correct_options}
                text={el.option_text}
                type={type}
              />
            ))
          )}
        </div>
        {explanation && type !== "text" && (
          <TextField
            multiline
            fullWidth
            helperText="Пояснение к вопросу"
            InputProps={{
              readOnly: true,
              value: `${explanation}`,
            }}
            sx={stylyTextField}
          />
        )}
      </div>
    </div>
  );
};

const ResultsQues = (props) => {
  const { submitted_answer, correct_options, text, type } = props;
  return (
    <div className={classes.ResultsQuesContainer}>
      {submitted_answer && <div className={classes.ResultsQuesAnswer}></div>}

      <div
        className={
          correct_options
            ? classes.ResultsQuesCorrectAnswerTrue
            : classes.ResultsQuesCorrectAnswerFalse
        }
        style={
          !submitted_answer
            ? type == "single"
              ? { marginLeft: "1.1vw", borderRadius: "50%" }
              : { marginLeft: "1.1vw", borderRadius: "0.25em" }
            : type == "single"
            ? { borderRadius: "50%" }
            : { borderRadius: "0.25em" }
        }
      ></div>
      <div className={classes.ResultsQuesText}>{text}</div>
    </div>
  );
};
