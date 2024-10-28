import { colors, Dialog, DialogContent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./profil.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { instance } from "../../utils/axios";

const SurveyModal = (props) => {
  const {
    setVisibleSurveyModal,
    visibleSurveyModal,
    setDataForSurveyAnswers,
    surveyQuestions,
    survey_answers,
    fullAccess,
    getData,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [emptyData, setEmptyData] = useState(true);

  const [newData, setNewData] = useState({ answers: [] });
  function sendData() {
    let correctData = structuredClone(newData);
    correctData.answers.shift();
    correctData.answers = [...correctData.answers].map((el, i) =>
      !el
        ? (el = {
            question_id: i + 1,
            answer_text: "",
          })
        : el
    );
    instance
      .post(`/survey/answers/`, correctData)
      .then((response) => {
        getData();
      })
      .catch((response) => {
        console.log(response);
      });
  }
  useEffect(() => {
    let oldData = structuredClone(newData);
    survey_answers.map(
      (el) => (
        (oldData.answers[el.question_id] = {
          answer_text: el.answer_text,
          question_id: el.question_id,
        })
      )
    );

    setNewData(oldData);
  }, []);
  useEffect(() => {
    !visibleSurveyModal && setEditMode(false);
  }, [visibleSurveyModal]);
  function newDataCollect(id, text) {
    let clone = structuredClone(newData);
    clone.answers[id] = {
      question_id: id,
      answer_text: text,
    };
    setNewData(clone);
  }
  const EditIconStyle = {
    marginLeft: "2vw",
    fontSize: "25px",
    cursor: "pointer",
    color: "#fff",
  };
  return (
    <Dialog
      open={visibleSurveyModal}
      onClose={() => {
        !editMode && setVisibleSurveyModal(false);
      }}
      fullWidth={true}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          background: "#202833",
          position: "relative",
          overflow: "visible",
        },
      }}
    >
      <div
        className={classes.surveySideBtn}
        style={{ top: "10%", width: "25%" }}
        onClick={() => {
          setVisibleSurveyModal(false);
        }}
      >
        Закрыть
      </div>
      {fullAccess && (
        <>
          <div
            className={classes.surveySideBtn}
            onClick={() => {
              setEditMode(!editMode);
            }}
            style={
              editMode
                ? {
                    background: "#346966",
                    boxShadow: "inset 15px 0 35px #1b3331",
                  }
                : {}
            }
          >
            Редактировать
          </div>
          <div
            className={classes.surveySideBtn}
            style={{ top: "23%", width: "25%" }}
            onClick={() => {
              setVisibleSurveyModal(false), sendData();
            }}
          >
            Сохранить и закрыть
          </div>
        </>
      )}
      <DialogContent>
        {emptyData && !fullAccess && (
          <span style={{ color: "#fff", fontSize: "20px" }}>
            Пользователь еще не отвечал на вопросы
          </span>
        )}
        {survey_answers.map((el, i) =>
          fullAccess ? (
            <SurveyModalBlock
              data={el}
              key={i}
              fullAccess={fullAccess}
              editMode={editMode}
              newDataCollect={newDataCollect}
              setEmptyData={setEmptyData}
            />
          ) : (
            el.answer_text !== "" && (
              <SurveyModalBlock
                data={el}
                key={i}
                fullAccess={fullAccess}
                setEmptyData={setEmptyData}
              />
            )
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SurveyModal;

const SurveyModalBlock = (props) => {
  const { data, editMode, newDataCollect, setEmptyData } = props;
  const [textValue, setTextValue] = useState(data.answer_text);

  const TextFieldStyle = {
    width: "100%",
    margin: editMode ? "1vw 0" : "0",
    borderRadius: "3vw",
    "& svg": {
      color: "#fff ",
    },
    "& .MuiInputBase-fullWidth .MuiFormControl-root": {
      width: "100% !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: editMode ? "1px solid #fff" : "none",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
        border: editMode ? "1px solid #fff" : "none",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff ",
    },
    "& .MuiInputLabel-root": {
      color: "#fff ",
    },
    "& .MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": { color: "#fff" },
    "& .MuiOutlinedInput-root:active": { color: "#fff" },
    "& .MuiOutlinedInput-root:hover": {
      color: "#fff",
      "& > fieldset": {
        border: editMode ? "1px solid #fff" : "none",
      },
    },
  };
  useEffect(() => {
    if (newDataCollect && textValue !== "") {
      newDataCollect(data.question_id, textValue);
    }
  }, [textValue]);
  useEffect(() => {
    setTextValue(data.answer_text);
    if (setEmptyData) {
      if (data.answer_text !== "") {
        setEmptyData(false);
      }
    }
  }, [data]);
  return (
    <div
      className={classes.SurveyModalBlock}
      style={
        editMode
          ? {}
          : {
              borderImage: `linear-gradient(90deg, #fff, #202833 ${Math.floor(
                Math.random() * (100 - 50) + 50
              )}%)`,
              marginBottom: "10px",
            }
      }
    >
      <span className={classes.surveyQuestions}>{data.question_text}</span>{" "}
      <TextField
        value={textValue}
        placeholder="Пусто"
        fullWidth={true}
        multiline={true}
        InputProps={{
          readOnly: editMode ? false : true,
        }}
        sx={TextFieldStyle}
        onChange={(e) => {
          setTextValue(e.target.value);
        }}
      />
    </div>
  );
};
