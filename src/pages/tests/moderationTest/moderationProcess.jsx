import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/general/header";
import Navigation from "../../../components/general/navigation";
import { Button, CircularProgress, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import classes from "./moderationTest.module.css";
import { useSearchParams } from "react-router-dom";
import ArrowUp from "../../../img/up-arrow.svg";
import NumberInputIntroduction from "./inputComponent.jsx";
import { instance } from "../../../utils/axios/index.js";
import ModalModeration from "./modalModeration";

const ModerationProcess = () => {
  const [load, setLoad] = useState(true);
  const [testData, setTestData] = useState();
  const [searchParams] = useSearchParams();
  const idTest = searchParams.get("id");

  useEffect(() => {
    const themes_with_tests = instance
      .get(`test_moderation_result/${idTest}/`)
      .then((response) => {
        setTestData(response.data);
        setLoad(false);
      })
      .catch((response) => {
        setRequestSuccessful(false);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className={classes.mainContainer}>
        <Navigation />
        {load ? (
          <div className={classes.loadQuery}>
            <CircularProgress /> <div>Получение данных... </div>
          </div>
        ) : (
          <div className={classes.mainContent}>
            <Content testData={testData} idTest={idTest} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModerationProcess;

const Content = (props) => {
  const { testData, idTest } = props;
  const [dataForRequest, setDataForRequest] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);


  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 1000) {
      setVisible(true);
    } else if (scrolled <= 1000) {
      setVisible(false);
    }
  };
  window.addEventListener("scroll", toggleVisible);
  const scrollToTop = () => {
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };
  function changeDataForRequest(
    index,
    idpoint,
    idexplanation,
    question_number
  ) {
    let clonedObj = structuredClone(dataForRequest);
    let localModeration_comment = {
      question_number: "",
      moderation_score: "",
      moderation_comment: "",
    };
    localModeration_comment.question_number = question_number;
    localModeration_comment.moderation_score = Number(
      document.querySelector(`#${idpoint}`).value
    );
    localModeration_comment.moderation_comment = document.querySelector(
      `#${idexplanation}`
    ).value;

    clonedObj[index - 1] = localModeration_comment;

    setDataForRequest(clonedObj);
  }
  const qwerty = useRef(null);
  const createTest = async (e) => {
    e.preventDefault();
    let data = { moderated_questions: dataForRequest, moderator_id: "1" };
    await instance
      .post(`test_attempts/${Number(idTest)}/moderate/`, data)
      .then(function (response) {
        setModalOpen(true);
      })
      .catch(function (response) {
      });
  };

  return (
    <div>
      <>
        <h1 className={classes.H1}>{testData.test}</h1>
        <div className={classes.contentContainer}>
          <form
            onSubmit={() => {
              createTest(event);
            }}
          >
            {testData.answers_info.map(
              (el, index) => (
                (
                  <ModerationQues
                    key={index}
                    max_question_score={el.max_question_score}
                    question_text={el.question_text}
                    text_answer={el.text_answer}
                    arrIndex={index + 1}
                    LastIndex={
                      index + 1 == testData.answers_info.length
                        ? index
                        : undefined
                    }
                    idAnswer={"idInputAnswer" + index}
                    idpoint={"idInputpoint" + index}
                    idexplanation={"idInputexplanation" + index}
                    changeDataForRequest={changeDataForRequest}
                    question_number={el.question_number}
                  />
                )
              )
            )}

            <div className={classes.BTNEndModerationContainer}>
              <Button type="submit" className={classes.BTNEndModeration}>
                Завершить модерацию
              </Button>
            </div>
          </form>
          <ModalModeration modalOpen={modalOpen} />
          {visible && (
            <img
              src={ArrowUp}
              alt=""
              className={classes.BTNscrollToTop}
              onClick={() => {
                scrollToTop();
              }}
            />
          )}
          <div className={classes.btnGoTestsContainer}></div>
        </div>
      </>
    </div>
  );
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: red[900],
    },
  },
});

const ModerationQues = (props) => {
  const {
    LastIndex,
    idAnswer,
    question_text,
    idpoint,
    idexplanation,
    text_answer,
    arrIndex,
    question_number,
    max_question_score,
    changeDataForRequest,
  } = props;
  const refPoits = useRef(null);
  const refExplanation = useRef(null);

  useEffect(() => {
    changeDataForRequest(arrIndex, idpoint, idexplanation, question_number);
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
  }, []);
  const errorStyle = {
    marginTop: "2vw",
    borderRadius: "1vw",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #d50000",
    },
    "& .MuiInputLabel-root": {
      color: "#d50000",
    },
    "& .MuiInputBase-root-MuiOutlinedInput-root.": {
      color: "#d50000",
    },
    "& .MuiOutlinedInput-root": { color: "#FFF" },
    "& .MuiOutlinedInput-root:hover": {
      color: "#FFF",
      "& > fieldset": {
        borderColor: "#d50000",
      },
    },
    "& .MuiFormHelperText-root": { color: "#d50000" },
  };
  return (
    <div
      className={classes.ModerationQuesContainer}
      style={
        LastIndex !== undefined ? {} : { borderBottom: ".1vw solid #469C9A" }
      }
    >
      <h2 className={classes.ModerationQueNumbercontainer}>
        <div className={classes.ModerationQueNumberFlex}>
          <div className={classes.ModerationQueCircle}>
            <div>{arrIndex}</div>
          </div>
        </div>
      </h2>
      <div className={classes.ModerationQueText}>{question_text}</div>
      <ThemeProvider theme={theme}>
        <TextField
          multiline
          cols={30}
          fullWidth
          id={idAnswer}
          label="Ответ сотрудника"
          InputProps={{
            readOnly: true,
            value: `${text_answer}`,
          }}
          sx={{
            marginTop: "2vw",
            borderRadius: "3vw",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #fff ",
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": {
                border: "fff !important",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#fff ",
            },
            "& .MuiInputBase-root-MuiOutlinedInput-root.": {
              color: "#fff",
            },
            "& .MuiOutlinedInput-root": { color: "#fff" },
            "& .MuiOutlinedInput-root:hover": {
              color: "#fff",
              "& > fieldset": {
                borderColor: "#fff",
              },
            },
          }}
        ></TextField>
        {NumberInputIntroduction(
          max_question_score,
          idpoint,
          changeDataForRequest,
          idexplanation,
          arrIndex,
          question_number,
          refPoits
        )}
        <div className={classes.maxPointText}>
          Максимум {max_question_score} баллов
        </div>
        <TextField
          ref={refExplanation}
          multiline
          cols={30}
          color="primary"
          fullWidth
          required
          id={idexplanation}
          onChange={() => {
            changeDataForRequest(
              arrIndex,
              idpoint,
              idexplanation,
              question_number
            );
          }}
          label="Пояснение к оценке"
          sx={
            {
              marginTop: "2vw",
              borderRadius: "1vw",

              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #fff",
              },
              "& .MuiInputLabel-root": {
                color: "#fff",
              },
              "& .MuiInputBase-root-MuiOutlinedInput-root.": {
                color: "#fff",
              },
              "& .MuiOutlinedInput-root": { color: "#fff" },
              "& .MuiFormHelperText-root": { color: "#fff" },
              "& .MuiOutlinedInput-root:hover": {
                color: "#fff",
                "& > fieldset": {
                  borderColor: "#fff",
                },
              },
            }
            // : errorStyle
          }
        />
      </ThemeProvider>
    </div>
  );
};
