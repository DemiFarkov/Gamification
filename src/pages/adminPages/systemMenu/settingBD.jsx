import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./statisticsSystem.module.css";

import {
  ButtonStyle,
  TextFieldStyle,
} from "../../../components/styles/styles.js";
import Header from "../../../components/general/header.jsx";
import Navigation from "./navigation.jsx";
import { instance } from "../../../utils/axios/index.js";
import { changeColorSelect, changeErrorColorSelect } from "./changeColor.js";
import { getGroupsAuth } from "../../../hooks/reduxHooks.js";
import ModalNoAccess from "../../../components/general/modalNoAccess.jsx";

const SettingBD = () => {
  const group = getGroupsAuth();

  const [maxActiveSession, setMaxActiveSession] = useState("");
  const [maxSessionDuration, setMaxSessionDuration] = useState("");
  const [maxUploadSize, setMaxUploadSize] = useState("");
  const [maxActiveSession1, setMaxActiveSession1] = useState("");
  const [maxActiveSession2, setMaxActiveSession2] = useState("");
  const [maxActiveSession3, setMaxActiveSession3] = useState("");

  useEffect(() => {
    getData();
  }, []);
  function getData() {
    instance.get(`system-settings/`).then((response) => {
      console.log(response.data);
      setMaxActiveSession(response.data[0].value);
      setMaxSessionDuration(response.data[1].value);
      setMaxUploadSize(response.data[2].value);
    });
  }
  function postData(key, id1) {
    let data;
    key == "max_active_sessions" &&
      (data = {
        key: "max_active_sessions",
        value: maxActiveSession,
      });
    key == "max_session_duration" &&
      (data = {
        key: "max_session_duration",
        value: maxSessionDuration,
      });
    key == "max_upload_size" &&
      (data = {
        key: "max_upload_size",
        value: maxUploadSize,
      });
    instance
      .post(`system-settings/`, data)
      .then((response) => {
        console.log(response);
        changeColorSelect(id1);
      })
      .catch((response) => {
        console.log(response);
        changeErrorColorSelect(id1);
      });
  }
  return (
    <div>
      {group == "Администраторы" ? (
        <>
          <Header />
          <section className={classes.mainContainer}>
            <Navigation styleBackground={"SettingBD"} />
            <section className={classes.mainContent}>
              <div className={classes.mainContentWrapper}>
                <article className={classes.mainTypeBlocks}>
                  <div
                    className={classes.inputWrapper}
                    id="max_active_sessionsWR"
                  >
                    <TextField
                      fullWidth
                      sx={TextFieldStyle}
                      label={"Введите максимальное к-во активных сессий..."}
                      focused
                      value={maxActiveSession}
                      type="number"
                      onChange={(e) => {
                        setMaxActiveSession(e.target.value);
                      }}
                    />
                    <article className={classes.btnPlace}>
                      {" "}
                      <Button
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        onClick={() => {
                          postData(
                            "max_active_sessions",
                            "max_active_sessionsWR"
                          );
                        }}
                      >
                        Сохранить
                      </Button>
                    </article>
                  </div>
                  <div className={classes.inputWrapper}>
                    <TextField
                      disabled
                      fullWidth
                      sx={TextFieldStyle}
                      label={"Введите максимальное к-во неактивных сессий..."}
                      focused
                      //   value={bonusResponsibility}
                      type="number"
                      //   onChange={(e) => {
                      //     setBonusResponsibility(e.target.value);
                      //   }}
                    />
                    <div className={classes.btnPlace}>
                      {" "}
                      <Button
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        // onClick={() => {
                        //   postExperienceMultipliers();
                        // }}
                      >
                        Сохранить
                      </Button>
                    </div>
                  </div>
                  <div className={classes.inputWrapper}>
                    <TextField
                      disabled
                      fullWidth
                      sx={TextFieldStyle}
                      label={
                        "Введите максимальное ожидание при подключении к БД..."
                      }
                      focused
                      //   value={bonusResponsibility}
                      type="number"
                      //   onChange={(e) => {
                      //     setBonusResponsibility(e.target.value);
                      //   }}
                    />
                    <div className={classes.btnPlace}>
                      {" "}
                      <Button
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        // onClick={() => {
                        //   postExperienceMultipliers();
                        // }}
                      >
                        Сохранить
                      </Button>
                    </div>
                  </div>
                </article>
                <article className={classes.mainTypeBlocks}>
                  <div className={classes.inputWrapper} id="max_upload_sizeWR">
                    <FormControl sx={TextFieldStyle} focused>
                      <InputLabel htmlFor="outlined-adornment-password">
                        Введите максимальное значение загружаемого файла...
                      </InputLabel>
                      <OutlinedInput
                        onChange={(e) => {
                          setMaxUploadSize(e.target.value);
                        }}
                        label={
                          "Введите максимальное значение загружаемого файла..."
                        }
                        id="outlined-adornment-weight"
                        endAdornment={
                          <InputAdornment position="end">mb</InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "weight",
                          value: maxUploadSize,
                        }}
                      />
                    </FormControl>

                    <article className={classes.btnPlace}>
                      {" "}
                      <Button
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        onClick={() => {
                          postData("max_upload_size", "max_upload_sizeWR");
                        }}
                      >
                        Сохранить
                      </Button>
                    </article>
                  </div>
                  <div
                    className={classes.inputWrapper}
                    id="max_session_durationWR"
                  >
                    <TextField
                      fullWidth
                      sx={TextFieldStyle}
                      label={
                        "Введите максимальное время сессии пользователя..."
                      }
                      focused
                      value={maxSessionDuration}
                      type="number"
                      onChange={(e) => {
                        setMaxSessionDuration(e.target.value);
                      }}
                    />
                    <article className={classes.btnPlace}>
                      {" "}
                      <Button
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        onClick={() => {
                          postData(
                            "max_session_duration",
                            "max_session_durationWR"
                          );
                        }}
                      >
                        Сохранить
                      </Button>
                    </article>
                  </div>
                  <div className={classes.inputWrapper}>
                    <TextField
                      disabled
                      fullWidth
                      sx={TextFieldStyle}
                      label={
                        "Директория в которую будут размещаться изображения и файлы."
                      }
                      focused
                      //   value={bonusResponsibility}
                      //   onChange={(e) => {
                      //     setBonusResponsibility(e.target.value);
                      //   }}
                    />
                    <div className={classes.btnPlace}>
                      {" "}
                      <Button
                        sx={ButtonStyle}
                        className={classes.BtnTypeBlocks}
                        // onClick={() => {
                        //   postExperienceMultipliers();
                        // }}
                      >
                        Сохранить
                      </Button>
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

export default SettingBD;
