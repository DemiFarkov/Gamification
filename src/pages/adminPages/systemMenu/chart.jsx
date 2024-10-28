import React, { useEffect, useState } from "react";
import classes from "./statisticsSystem.module.css";
import { Button, TextField } from "@mui/material";
import Header from "../../../components/general/header";
import Navigation from "./navigation";
import { instance } from "../../../utils/axios";
import {
  ButtonStyle,
  selecetStyle,
  TextFieldStyle,
} from "../../../components/styles/styles.js";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { changeColorSelect, changeErrorColorSelect } from "./changeColor.js";
import ModalNoAccess from "../../../components/general/modalNoAccess.jsx";
import { getGroupsAuth } from "../../../hooks/reduxHooks.js";

const Chart = () => {
  const group = getGroupsAuth();

  dayjs.locale("ru");
  const [lateArrivalValue1, setLateArrivalValue1] = useState("");
  const [lateArrivalValue2, setLateArrivalValue2] = useState("");
  const [lateArrivalValue3, setLateArrivalValue3] = useState("");
  const [lateArrivalValue4, setLateArrivalValue4] = useState("");
  const [lateArrivalValue5, setLateArrivalValue5] = useState("");

  const [dataDelays, setDataDelays] = useState();
  const [shiftKarma, setShiftKarma] = useState("");
  const [shiftExp, setShiftExp] = useState("");
  const [valueDate, setValueDate] = useState(dayjs("01-01-2024"));
  const [fileRequset, setFileRequset] = useState();

  const StyleTextField = {
    margin: "1vw",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #fff ",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
        border: "fff !important",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#cbd5dcd0 ",
    },
    "& .MuiInputBase-root-MuiOutlinedInput-root": {
      color: "#e3f2fd",
    },
    "& input": {
      color: "#e3f2fd",
    },
    "& .MuiOutlinedInput-root": { color: "#e3f2fd" },
    textAlign: "start",
    "& .MuiOutlinedInput-root:hover": {
      color: "#e3f2fd",
      "& > fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiInput-input": {
      color: "#e3f2fd",
      textAlign: "start",
    },
    "& button": {
      color: "#e3f2fd",
      marginRight: "1vw",
    },
    "& .MuiSelect-icon": {
      marginRight: "calc(1vw + 8px)",
      color: "#e3f2fd",
    },
  };
  function patchChangeExpAndKarma(id1) {
    instance
      .patch(`karma-settings/7/`, {
        karma_change: shiftKarma,
        experience_change: shiftExp,
      })
      .then((response) => {
        console.log(response);
        changeColorSelect(id1);
      })
      .catch((response) => {
        console.log(response);
        changeErrorColorSelect(id1);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    instance.get(`karma-settings/7/`).then((response) => {
      console.log(response);
      setShiftKarma(response.data.karma_change);
      setShiftExp(response.data.experience_change);
    });
    instance.get(`late-penalty-settings/`).then((response) => {
      console.log(response);
      setLateArrivalValue1(response.data[1].karma_change);
      setLateArrivalValue2(response.data[2].karma_change);
      setLateArrivalValue3(response.data[3].karma_change);
      setLateArrivalValue4(response.data[4].karma_change);
      setLateArrivalValue5(response.data[5].karma_change);
    });
  }
  function postLateArrivalValue(id1) {
    instance
      .post(`update-late-penalty-settings/`, {
        late_penalty_settings: [
          { level: 1, karma_change: lateArrivalValue1 },
          { level: 2, karma_change: lateArrivalValue2 },
          { level: 3, karma_change: lateArrivalValue3 },
          { level: 4, karma_change: lateArrivalValue4 },
          { level: 5, karma_change: lateArrivalValue5 },
        ],
      })
      .then((response) => {
        console.log(response);
        changeColorSelect(id1);
      })
      .catch((response) => {
        console.log(response);
        changeErrorColorSelect(id1);
      });
  }
  function postСhart(id1) {
    console.log(1);
    let file;
    console.log(valueDate);
    let date = `${valueDate.$D < 10 ? "0" + valueDate.$D : valueDate.$D}.${
      valueDate.$M + 1 < 10 ? "0" + (valueDate.$M + 1) : valueDate.$M + 1
    }.${valueDate.$y}`;

    if (date !== "01.01.2024") {
      console.log(date);

      file = new File([fileRequset], `${date + ".xlsx"}`, {
        type: "xlsx",
      });
      const formData = new FormData();

      formData.append("file", file);
      for (var pair of formData.entries()) {
        console.log(pair[1]);
      }
      instance
        .post(`upload-and-analyze/`, formData)
        .then((response) => {
          console.log(response);
          changeColorSelect(id1);
        })
        .catch((response) => {
          console.log(response);
          changeErrorColorSelect(id1);
        });
    }
  }
  return (
    <div>
      {" "}
      {group == "Администраторы" ? (
        <>
          <Header />
          <section className={classes.mainContainer}>
            <Navigation styleBackground={"Chart"} />
            <section className={classes.mainContent}>
              <div className={classes.mainContentWrapper}>
                <article
                  className={classes.mainTypeBlocks}
                  id="lateArrivalWrapper"
                >
                  <h4 className={classes.titleTypeBlocks}>
                    Сумма вычета кармы за опоздание
                  </h4>
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    onChange={(e) => {
                      setLateArrivalValue1(e.target.value);
                    }}
                    focused
                    value={lateArrivalValue1}
                    type="number"
                    label="Опоздание до 5 минут"
                  />
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    onChange={(e) => {
                      setLateArrivalValue2(e.target.value);
                    }}
                    focused
                    value={lateArrivalValue2}
                    type="number"
                    label="Опоздание до 10 минут"
                  />
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    onChange={(e) => {
                      setLateArrivalValue3(e.target.value);
                    }}
                    focused
                    value={lateArrivalValue3}
                    type="number"
                    label="Опоздание до 20 минут"
                  />
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    onChange={(e) => {
                      setLateArrivalValue4(e.target.value);
                    }}
                    focused
                    value={lateArrivalValue4}
                    type="number"
                    label="Опоздание до 30 минут"
                  />
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    onChange={(e) => {
                      setLateArrivalValue5(e.target.value);
                    }}
                    value={lateArrivalValue5}
                    focused
                    type="number"
                    label="Опоздание более 30  минут"
                  />
                  <article className={classes.btnPlace}>
                    {" "}
                    <Button
                      className={classes.BtnTypeBlocks}
                      sx={ButtonStyle}
                      onClick={() => {
                        postLateArrivalValue("lateArrivalWrapper");
                      }}
                    >
                      Сохранить
                    </Button>
                  </article>
                </article>
                <article className={classes.mainTypeBlocks}>
                  <h4 className={classes.titleTypeBlocks}>Загрузка графика</h4>
                  <div id="datafile">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Конечная дата для изменения в этом месяце"
                        value={valueDate}
                        id="birthday"
                        sx={{
                          ...TextFieldStyle,
                          "& .MuiInputLabel-root": {
                            top: "0",
                            color: "#fff ",
                          },
                        }}
                        onChange={(newValue) => setValueDate(newValue)}
                      />
                    </LocalizationProvider>
                    <div className={classes.answerInputFileContainer}>
                      <fieldset className={classes.fieldset}>
                        {" "}
                        <legend className={classes.legend}>
                          Загрузите файл
                        </legend>
                      </fieldset>
                      <label
                        htmlFor={"idfile"}
                        className={classes.answerInputFileText}
                      >
                        Выберите файл
                      </label>
                      <div
                        className={classes.answerInputFileName}
                        id={"idfileColor"}
                      >
                        {fileRequset ? fileRequset.name : "Файл не выбран"}
                      </div>
                      <input
                        id={"idfile1"}
                        type="file"
                        onChange={(e) => {
                          setFileRequset(e.target.files[0]);
                        }}
                        className={classes.answerInputFile}
                        accept=".xlsx"
                      />
                    </div>
                    <article className={classes.btnPlace}>
                      {" "}
                      <Button
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        onClick={() => {
                          postСhart("datafile");
                        }}
                      >
                        Сохранить
                      </Button>
                    </article>
                  </div>
                  <div
                    style={{
                      marginTop: "1.5vw",
                      paddingTop: ".5vw",
                      borderImage: "linear-gradient(90deg, #fff, #4B515A 80%)",
                      borderTop: "1px solid transparent",
                      borderImageSlice: "1",
                    }}
                  >
                    <div id="karmAndexp">
                      <TextField
                        fullWidth
                        sx={TextFieldStyle}
                        focused
                        type="number"
                        value={shiftExp}
                        onChange={(e) => {
                          setShiftExp(e.target.value);
                        }}
                        // value={newNameRequset}
                        label="Сумма опыта за смену"
                      />
                      <TextField
                        fullWidth
                        sx={TextFieldStyle}
                        value={shiftKarma}
                        type="number"
                        onChange={(e) => {
                          setShiftKarma(e.target.value);
                        }}
                        focused
                        // value={newNameRequset}
                        label="Сумма кармы за смену"
                      />
                      <article className={classes.btnPlace}>
                        {" "}
                        <Button
                          sx={ButtonStyle}
                          className={classes.BtnTypeBlocks}
                          onClick={() => {
                            patchChangeExpAndKarma("karmAndexp");
                          }}
                        >
                          Сохранить
                        </Button>
                      </article>{" "}
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </section>
        </>
      ) : (
        <ModalNoAccess />
      )}
    </div>
  );
};

export default Chart;
