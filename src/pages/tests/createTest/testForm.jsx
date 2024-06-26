import React, { useEffect, useState } from "react";
import classes from "./test.module.css";
import { TextField } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const TestForm = (props) => {
  const {
    idMainBlock,
    setForRemove,
    idfile,
    idfileColor,
    idTitle,
    data,
    setUpOrDown,
    content,countForBlocks,
  } = props;
  const [fileName, setFileName] = useState("Файл не выбран");
  const [collectionForm, setCollectionForm] = useState({});
  const [value, setValue] = useState("");
  useEffect(() => {
    changecollectionQue();
  }, [value]);
  function handleChange(event) {
    setFileName(event.target.files[0].name);
    document.getElementById(`${idfileColor}`).style = "color: #000";
  }
  // Создание объекта с данными из этого вопроса
  function changecollectionQue() {
    let title = document.querySelector(`#${idTitle}`)
      ? document.querySelector(`#${idTitle}`).value
      : "";
    let text = value;
    // let text = document.querySelector(`#${idText}`)
    //   ? document.querySelector(`#${idText}`).value
    //   : "";
    setCollectionForm({
      type: "theory",
      content: { title: title, text: text },
    });
  }
  // Отправка объекта с данными из этой формы в общий массив данных
  useEffect(() => {
    console.log(collectionForm)
    data(collectionForm, idMainBlock);
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

  useEffect(() => {
    if (content) {
      document.querySelector(`#${idTitle}`).value = content.title;
      setValue(content.text);
    }
    changecollectionQue();
  }, []);
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

      {/* <input
        type="text"
        className={classes.answerInput}
        placeholder="Заголовок"
        id={idTitle}
        onChange={() => changecollectionQue()}
        required
      /> */}
      <InputForm
        idText={idTitle}
        changecollectionQue={changecollectionQue}
        placeholder={"Заголовок"}
      />
      <MDEditor
        height={200}
        value={value}
        onChange={setValue}
        style={{
          color: "#fff",
          background: "#202833",
          border: ".1vw solid #fff",
          width: "90%",
          margin: "1vw auto 0 auto",
        }}
      />
      {/* <InputForm
        idText={idText}
        // changecollectionQue={changecollectionQue}
        placeholder={"Введите текст"}
      /> */}
      {/* <input
        type="text"
        className={classes.answerInput}
        placeholder="Введите текст"
        id={idText}
        onChange={() => changecollectionQue()}
        required
      /> */}

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

const InputForm = (props) => {
  const { idText, changecollectionQue, placeholder } = props;
  return (
    <TextField
      id={idText}
      multiline
      autoComplete="none"
      onChange={() => changecollectionQue()}
      placeholder={placeholder}
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
  );
};
