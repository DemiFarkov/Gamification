import React, { useEffect, useState } from "react";

import classes from "./statisticsSystem.module.css";
import Header from "../../../components/general/header";
import Navigation from "./navigation";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  colors,
  FormControl,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { instance } from "../../../utils/axios";
import {
  selecetStyle,
  TextFieldStyle,
  ButtonStyle,
} from "../../../components/styles/styles.js";
import { changeColorSelect, changeErrorColorSelect } from "./changeColor.js";
import { getGroupsAuth } from "../../../hooks/reduxHooks.js";
import ModalNoAccess from "../../../components/general/modalNoAccess.jsx";
const SettingRequests = () => {
  const group = getGroupsAuth();

  const [classificationsCollection, setClassificationsCollection] = useState(
    []
  );
  const [changeNameRequset, setChangeNameRequset] = useState(0);
  const [newNameRequset, setNewNameRequset] = useState("");

  const [experienceRequset, setEperienceRequset] =
    useState("Не запускается 1С");
  const [inputValue, setInputValue] = React.useState("");
  const [valueExperienceRequset, setValueExperienceRequset] =
    useState("Не выбрано");
  const [selectListExp, setSelectListExp] = useState([]);

  const [bonusResponsibility, setBonusResponsibility] = useState("");
  const [multiplierForMass, setMultiplierForMass] = useState("");

  const [fileRequset, setFileRequset] = useState();
  const [fileMass, setFileMass] = useState();

  const [loader, setLoader] = useState(null);
  const [requestSimple, setRequestSimple] = useState(0);
  const [requestMedium, setRequestMedium] = useState(0);
  const [requestHard, setRequestHard] = useState(0);

  console.log(experienceRequset);
  // Поле изменения имени классификации
  useEffect(() => {
    let value = "";
    classificationsCollection.map(
      (el) => el.id == changeNameRequset && (value = el.name)
    );
    setNewNameRequset(value);
  }, [changeNameRequset]);
  function postNameRequset(id1) {
    setLoader(1);
    instance
      .patch(`classifications/${changeNameRequset}/`, {
        id: changeNameRequset,
        name: newNameRequset,
        parent: null,
      })
      .then((response) => {
        console.log(response);
        changeColorSelect(id1);

        getСlassifications();
      })
      .catch((response) => {
        console.log(response);
        changeErrorColorSelect(id1);
      })
      .finally(function () {
        setLoader(null);
      });
  }
  function postEXPRequset(id1, id2, id3) {
    setLoader(2);
    instance
      .patch(`classifications/${experienceRequset.id}/`, {
        id: experienceRequset.id,
        experience_points: valueExperienceRequset,
      })
      .then((response) => {
        console.log(response);
        changeColorSelect(id1, id2, id3);

        getСlassifications();
      })
      .catch((response) => {
        console.log(response);
        changeErrorColorSelect(id1, id2, id3);
      })
      .finally(function () {
        setLoader(null);
      });
  }

  // Поле изменения опыта за классификацию
  useEffect(() => {
    let value = "";
    selectListExp.map(
      (el) =>
        // console.log(selectListExp),
        experienceRequset &&
        el.parentName == experienceRequset.parentName &&
        el.name == experienceRequset.name &&
        ((value = el.experience_points),
        console.log(
          "GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOD",
          el.experience_points,
          el
        ))
    );
    setValueExperienceRequset(value);
  }, [experienceRequset]);

  // Опыт за закрытие обращения
  function postExperienceMultipliers(id1) {
    setLoader(3);
    instance
      .patch(`experience-multipliers/1/`, {
        name: "operator_responsible_multiplier",
        multiplier: bonusResponsibility,
      })
      .then((response) => {
        changeColorSelect(id1);
        console.log(response.data);
      })
      .catch((response) => {
        console.log(response);
        changeErrorColorSelect(id1);
      })
      .finally(function () {
        setLoader(null);
      });
  }
  // Множитель опыта за массовые
  function postExperienceMultipliersMass(id1) {
    setLoader(4);
    instance
      .put(`experience-multipliers/2/`, {
        name: "massive_request_multiplier",
        multiplier: multiplierForMass,
      })
      .then((response) => {
        changeColorSelect(id1);
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
        changeErrorColorSelect(id1);
      })
      .finally(function () {
        setLoader(null);
      });
  }

  // отправка файла с обращениями
  function postfileRequset(type, id1) {
    const formData = new FormData();
    if (type == "Requset") {
      setLoader(5);
      formData.append("file", fileRequset, "1 линия. Тип обращений.xlsx");
    } else if (type == "Mass") {
      setLoader(6);
      formData.append("file", fileMass, "1 линия. Тип обращений Массовые.xlsx");
    }
    formData.forEach((value, key) => {
      if (value instanceof Blob) {
        console.log(`${key}:`, value);
      } else {
        console.log(`${key}:`, value);
      }
    });
    instance
      .post(`upload-and-analyze/`, formData)
      .then((response) => {
        console.log(response.data);
        changeColorSelect(id1);
      })
      .catch((response) => {
        console.log(response);
        changeErrorColorSelect(id1);
      })
      .finally(function () {
        setLoader(null);
      });
  }
    // Отправка сложности обращений
    function postСomplexity(id1) {
      setLoader(7);
      instance
        .post(`complexity-thresholds/update_thresholds/`, {
          simple: requestSimple,
          medium: requestMedium,
          hard: requestHard,
        })
        .then((response) => {
          changeColorSelect(id1);
          console.log(response);
        })
        .catch((response) => {
          console.log(response);
          changeErrorColorSelect(id1);
        })
        .finally(function () {
          setLoader(null);
        });
    }
  async function getData() {
    await instance.get("classifications/tree/").then((response) => {
      console.log(response.data);
      setClassificationsCollection(response.data);
    });

    await instance.get(`experience-multipliers/1/`).then((response) => {
      console.log(response.data);
      setBonusResponsibility(response.data.multiplier);
    });

    await instance.get(`experience-multipliers/2/`).then((response) => {
      console.log(response.data);
      setMultiplierForMass(response.data.multiplier);
    });
    await instance.get(`complexity-thresholds/current/`).then((response) => {
      console.log(response.data);
      setRequestSimple(response.data.simple);
      setRequestMedium(response.data.medium);
      setRequestHard(response.data.hard);

      // setMultiplierForMass(response.data.multiplier);
    });

    await instance.get(`classifications/leaf_nodes/`).then((response) => {
      console.log(response.data);
      setSelectListExp(
        response.data.sort((a, b) => {
          if (a.parent === null) return 1;
          if (b.parent === null) return -1;
          return a.parent - b.parent;
        })
      );
      response.data.map(
        (el) => el.name == "Проблемы на локальном компьютере" && console.log(el)
      );
    });
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {" "}
      {group == "Администраторы" ? (
        <>
          <Header />
          <section className={classes.mainContainer}>
            <Navigation styleBackground={"SettingRequests"} />
            <section className={classes.mainContent}>
              <div className={classes.mainContentWrapper}>
                <article
                  className={classes.mainTypeBlocks}
                  id="nameChangeSelect"
                >
                  <h4 className={classes.titleTypeBlocks}>
                    Изменение названия классификации
                  </h4>
                  <h5 className={classes.subTitleTypeBlocks}>
                    Выберите классификацию
                  </h5>
                  <Select
                    sx={selecetStyle}
                    value={changeNameRequset}
                    onChange={(e) => {
                      console.log(e.target.value),
                        setChangeNameRequset(e.target.value);
                    }}
                  >
                    {" "}
                    <MenuItem value={0}>Не выбрано </MenuItem>
                    {classificationsCollection &&
                      classificationsCollection.map((el, i) => (
                        <MenuItem key={i} value={el.id}>
                          {el.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <TextField
                    fullWidth
                    id="nameChangeTextField"
                    sx={TextFieldStyle}
                    focused
                    value={newNameRequset}
                    label="Название классификации"
                    onChange={(e) => {
                      setNewNameRequset(e.target.value);
                    }}
                  />
                  <article className={classes.btnPlace}>
                    {" "}
                    <Button
                      sx={ButtonStyle}
                      id="nameChangeTextBtn"
                      className={classes.BtnTypeBlocks}
                      onClick={() => {
                        loader === null && postNameRequset("nameChangeSelect");
                      }}
                    >
                      {loader == 1 ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Сохранить"
                      )}
                    </Button>
                  </article>
                </article>
                <article
                  className={classes.mainTypeBlocks}
                  id="changeValueExpSelect"
                >
                  <h4 className={classes.titleTypeBlocks}>
                    Изменение опыта за классификации
                  </h4>
                  <h5 className={classes.subTitleTypeBlocks}>
                    Выберите классификацию
                  </h5>
                  {selectListExp && (
                    <Autocomplete
                      options={selectListExp}
                      groupBy={(option) => option.parentName}
                      defaultValue={selectListExp[0]}
                      getOptionLabel={(option) => option.name || ""}
                      renderOption={(props, option) => (
                        <Box component="li" {...props}>
                          {option.name}
                        </Box>
                      )}
                      onChange={(event, newValue) => {
                        setEperienceRequset(newValue);
                      }}
                      value={experienceRequset}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            ...TextFieldStyle,
                            "& .MuiAutocomplete-input": {
                              padding: " 8px 32px 8px 8px  !important",
                              "&::placeholder": {
                                opacity: 1,
                              },
                            },
                          }}
                          placeholder="Не выбрано"
                        />
                      )}
                      sx={{
                        transition: "all 1s linear",
                        borderRadius: "10px",
                        marginTop: "1vw",
                        "& .MuiOutlinedInput-root": { padding: "0" },
                        "& .MuiFormControl-root": {
                          marginTop: "0",
                          marginBottom: "0",
                        },
                      }}
                    />
                  )}

                  <TextField
                    fullWidth
                    id="changeValueExpTextField"
                    sx={TextFieldStyle}
                    value={valueExperienceRequset}
                    label="Сейчас опыта"
                    type="number"
                    focused
                    onChange={(e) => {
                      setValueExperienceRequset(e.target.value);
                    }}
                  />
                  <article className={classes.btnPlace}>
                    {" "}
                    <Button
                      id="changeValueExpTextBtn"
                      sx={ButtonStyle}
                      className={classes.BtnTypeBlocks}
                      onClick={() => {
                        loader === null &&
                          postEXPRequset("changeValueExpSelect");
                      }}
                    >
                      {loader == 2 ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Сохранить"
                      )}
                    </Button>
                  </article>
                </article>
                <article className={classes.mainTypeBlocks}>
                  <div
                    className={classes.inputWrapper}
                    id="BonusResponsibilityTextField"
                  >
                    <TextField
                      fullWidth
                      sx={TextFieldStyle}
                      label={
                        "Множитель опыта за закрытое обращение, если оператор = отвественный"
                      }
                      focused
                      value={bonusResponsibility}
                      type="number"
                      onChange={(e) => {
                        setBonusResponsibility(e.target.value);
                      }}
                    />
                    <article className={classes.btnPlace}>
                      {" "}
                      <Button
                        id="BonusResponsibilityBtn"
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        onClick={() => {
                          loader === null &&
                            postExperienceMultipliers(
                              "BonusResponsibilityTextField"
                            );
                        }}
                      >
                        {loader == 3 ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Сохранить"
                        )}
                      </Button>
                    </article>
                  </div>
                  <div
                    className={classes.inputWrapper}
                    id="MultiplierForMassTextField"
                  >
                    <TextField
                      fullWidth
                      // id="MultiplierForMassTextField"
                      sx={TextFieldStyle}
                      label={"Множитель опыта за массовое обращение"}
                      focused
                      value={multiplierForMass}
                      type="number"
                      onChange={(e) => {
                        setMultiplierForMass(e.target.value);
                      }}
                    />
                    <article className={classes.btnPlace}>
                      {" "}
                      <Button
                        id="MultiplierForMassBtn"
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        onClick={() => {
                          loader === null &&
                            postExperienceMultipliersMass(
                              "MultiplierForMassTextField"
                            );
                        }}
                      >
                        {loader == 4 ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Сохранить"
                        )}
                      </Button>
                    </article>
                  </div>
                </article>
                <article className={classes.mainTypeBlocks}>
                  <div id={"idfile1Wrapper"}>
                    <div className={classes.answerInputFileContainer}>
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
                      <fieldset className={classes.fieldset}>
                        {" "}
                        <legend className={classes.legend}>
                          Добавить файл отчета об обращениях
                        </legend>
                      </fieldset>
                    </div>
                    <article className={classes.btnPlace}>
                      {" "}
                      <Button
                        id="answerInputFileBtn"
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        onClick={() => {
                          loader === null &&
                            postfileRequset("Requset", "idfile1Wrapper");
                        }}
                      >
                        {loader == 5 ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Сохранить"
                        )}
                      </Button>
                    </article>
                  </div>
                  <div id={"idfile2Wrapper"}>
                    <div className={classes.answerInputFileContainer}>
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
                        {fileMass ? fileMass.name : "Файл не выбран"}
                      </div>
                      <input
                        id={"idfile2"}
                        type="file"
                        onChange={(e) => {
                          setFileMass(e.target.files[0]);
                        }}
                        className={classes.answerInputFile}
                        accept=".xlsx"
                      />
                      <fieldset className={classes.fieldset}>
                        {" "}
                        <legend className={classes.legend}>
                          Добавить файл отчета о массовых
                        </legend>
                      </fieldset>
                    </div>
                    <article className={classes.btnPlace}>
                      {" "}
                      <Button
                        id="answerInputFileBtn2"
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        onClick={() => {
                          loader === null &&
                            postfileRequset("Mass", "idfile2Wrapper");
                        }}
                      >
                        {loader == 6 ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Сохранить"
                        )}
                      </Button>
                    </article>
                  </div>
                </article>
                <article className={classes.mainTypeBlocks}id="complexity">
                  <h2>Сложность обращений</h2>
                    <TextField
                      fullWidth
                      sx={{ ...TextFieldStyle, margin: ".5vw 0" }}
                      label={"Легкое"}
                      focused
                      value={requestSimple}
                      type="number"
                      onChange={(e) => {
                        setRequestSimple(e.target.value);
                      }}
                    />
                  
                    <TextField
                      fullWidth
                      // id="MultiplierForMassTextField"
                      sx={{ ...TextFieldStyle, margin: ".5vw 0" }}
                      label={"Среднее"}
                      focused
                      value={requestMedium}
                      type="number"
                      onChange={(e) => {
                        setRequestMedium(e.target.value);
                      }}
                    />
                    <TextField
                      fullWidth
                      // id="MultiplierForMassTextField"
                      sx={{ ...TextFieldStyle, margin: ".5vw 0" }}
                      label={"Сложное"}
                      focused
                      value={requestHard}
                      type="number"
                      onChange={(e) => {
                        setRequestHard(e.target.value);
                      }}
                    />
                    <article className={classes.btnPlace}>
                      {" "}
                      <Button
                        id="MultiplierForMassBtn"
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        onClick={() => {
                          loader === null &&
                          postСomplexity(
                              "complexity"
                            );
                        }}
                      >
                        {loader == 7 ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Сохранить"
                        )}
                      </Button>
                    </article>
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

export default SettingRequests;
