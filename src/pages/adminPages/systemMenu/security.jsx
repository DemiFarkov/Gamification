import React, { useEffect, useState } from "react";
import classes from "./statisticsSystem.module.css";
import Header from "../../../components/general/header.jsx";
import Navigation from "./navigation.jsx";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  selecetStyle,
  TextFieldStyle,
  checkboxStyle,
  ButtonStyle,
} from "../../../components/styles/styles.js";
import { instance } from "../../../utils/axios/index.js";
import {
  getGroupsAuth,
  getPasswordPolicyRegexUseAuth,
} from "../../../hooks/reduxHooks.js";
import { changeColorSelect, changeErrorColorSelect } from "./changeColor.js";
import ModalNoAccess from "../../../components/general/modalNoAccess.jsx";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const Security = () => {
  const group = getGroupsAuth();

  const [loader, setLoader] = useState(null);
  const [gettigettingData, setGettigettingData] = useState(true);

  const [logs, setLogs] = useState();
  const [logsEXPCarmaAc, setLogsEXPCarmaAc] = useState();
  const [passwordPolicy1, setPasswordPolicy1] = useState("");
  const [passwordPolicy2, setPasswordPolicy2] = useState("");
  const [passwordPolicy3, setPasswordPolicy3] = useState("");
  const [passwordPolicy4, setPasswordPolicy4] = useState("");
  const [passwordPolicy5, setPasswordPolicy5] = useState("");
  const [passwordPolicy6, setPasswordPolicy6] = useState("");
  const [passwordPolicy7, setPasswordPolicy7] = useState(false);
  const [allowedSymbols, setAllowedSymbols] = useState();

  const [logsType, setLogsType] = useState(0);
  const [deleteLogType, setDeleteLogType] = useState(0);
  const [deleteLogEmploee, setDeleteLogEmploee] = useState();
  const [allUsers, setAllUsers] = useState([]);
  const passwordPolicyRegex = getPasswordPolicyRegexUseAuth();
  console.log(allUsers);
  useEffect(() => {
    getData().then(() => {
      setGettigettingData(false);
    });
  }, []);
  const getData = async () => {
    await instance.get(`password-policy/get_policy/`).then((response) => {
      setPasswordPolicy1(response.data.min_length);
      setPasswordPolicy2(response.data.max_length);
      setPasswordPolicy3(response.data.min_uppercase);
      setPasswordPolicy4(response.data.min_lowercase);
      setPasswordPolicy5(response.data.min_digits);
      setPasswordPolicy6(response.data.min_symbols);
      setPasswordPolicy7(response.data.no_spaces);
      setAllowedSymbols(response.data.allowed_symbols);
      console.log(response);
    });
    await instance.get(`users/`).then((response) => {
      console.log(response.data);
      setAllUsers(response.data);
      setDeleteLogEmploee(response.data[0].id);
    });
    await instance.get(`logs/`).then((response) => {
      console.log(response);
      setLogs(response.data);
    });
    await instance.get(`currency-logs/`).then((response) => {
      console.log(response);
      setLogsEXPCarmaAc(response.data);
    });
  };
  function postUpdate_policy(id1) {
    setLoader(1);
    instance
      .post(`password-policy/update_policy/`, {
        id: 1,
        min_length: passwordPolicy1 && passwordPolicy1,
        max_length: passwordPolicy2 && passwordPolicy2,
        min_uppercase: passwordPolicy3 && passwordPolicy3,
        min_lowercase: passwordPolicy4 && passwordPolicy4,
        min_digits: passwordPolicy5 && passwordPolicy5,
        min_symbols: passwordPolicy6 && passwordPolicy6,
        allowed_symbols: "~!@#$%^&*()-_=+[{]}|;:'\",<.>/?",
        no_spaces: passwordPolicy7 && passwordPolicy7,
        arabic_only: true,
      })
      .then((response) => {
        console.log(response);
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
  function postDeleteLogs(id1) {
    setLoader(2);
    let action;
    switch (deleteLogType) {
      case 0:
        action = "";
        break;
      case 1:
        action = "?log_type=employee_log";
        break;
      case 2:
        action = "?log_type=employee_action_log";
        break;
      case 3:
        action = `?employee_id=${deleteLogEmploee}`;
        break;
      case 4:
        action = `?employee_id=${deleteLogEmploee}&log_type=employee_action_log`;
        break;
      case 5:
        action = `?employee_id=${deleteLogEmploee}&log_type=employee_log`;
        break;
    }
    instance
      .delete(`delete-logs/${action}`)
      .then((response) => {
        console.log(response);
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
  return (
    <div>
      {group == "Администраторы" ? (
        <>
          <Header />
          <section className={classes.mainContainer}>
            <Navigation styleBackground={"Security"} />
            <section className={classes.mainContent}>
              <div className={classes.mainContentWrapper}>
                <div style={{ width: "48%" }}>
                  <article
                    className={classes.mainTypeBlocks}
                    id="updatePolicyContainer"
                    style={{ width: "100%" }}
                  >
                    <h4 className={classes.titleTypeBlocks}>
                      Требования к паролю
                    </h4>

                    <TextField
                      fullWidth
                      sx={{
                        ...TextFieldStyle,
                        margin: "1.5vw 0 0 0",
                        "& input": {
                          padding: "8px",
                          fontSize: ".95vw",
                        },
                      }}
                      value={passwordPolicy1}
                      onChange={(e) => {
                        setPasswordPolicy1(e.target.value);
                      }}
                      focused
                      label="Минимальное к-во символов"
                      // value={newNameRequset}
                    />
                    <TextField
                      fullWidth
                      sx={{
                        ...TextFieldStyle,
                        margin: "1.5vw 0 0 0",
                        "& input": {
                          padding: "8px",
                          fontSize: ".95vw",
                        },
                      }}
                      value={passwordPolicy2}
                      onChange={(e) => {
                        setPasswordPolicy2(e.target.value);
                      }}
                      focused
                      label="Максимальное к-во символов"
                      // value={newNameRequset}
                    />
                    <TextField
                      fullWidth
                      sx={{
                        ...TextFieldStyle,
                        margin: "1.5vw 0 0 0",
                        "& input": {
                          padding: "8px",
                          fontSize: ".95vw",
                        },
                      }}
                      value={passwordPolicy3}
                      onChange={(e) => {
                        setPasswordPolicy3(e.target.value);
                      }}
                      focused
                      label="Минимальное к-во заглавных букв"
                      // value={newNameRequset}
                    />
                    <TextField
                      fullWidth
                      sx={{
                        ...TextFieldStyle,
                        margin: "1.5vw 0 0 0",
                        "& input": {
                          padding: "8px",
                          fontSize: ".95vw",
                        },
                      }}
                      value={passwordPolicy4}
                      onChange={(e) => {
                        setPasswordPolicy4(e.target.value);
                      }}
                      focused
                      label="Минимальное к-во строчных букв"
                      // value={newNameRequset}
                    />
                    <TextField
                      fullWidth
                      sx={{
                        ...TextFieldStyle,
                        margin: "1.5vw 0 0 0",
                        "& input": {
                          padding: "8px",
                          fontSize: ".95vw",
                        },
                      }}
                      value={passwordPolicy5}
                      onChange={(e) => {
                        setPasswordPolicy5(e.target.value);
                      }}
                      focused
                      label="Минимальное к-во цифр"
                      // value={newNameRequset}
                    />
                    <TextField
                      fullWidth
                      sx={{
                        ...TextFieldStyle,
                        margin: "1.5vw 0 0 0",
                        "& input": {
                          padding: "8px",
                          fontSize: ".95vw",
                        },
                      }}
                      value={passwordPolicy6}
                      onChange={(e) => {
                        setPasswordPolicy6(e.target.value);
                      }}
                      focused
                      label="Другие допустимые символы"
                      // value={newNameRequset}
                    />
                    <p style={{ textAlign: "start" }}>
                      Допустимые символы: {allowedSymbols}
                    </p>
                    <p style={{ position: "relative", marginTop: ".5vw" }}>
                      {" "}
                      <input
                        type="checkbox"
                        forsearch="idCheckBoxOld"
                        id={"idCheckBoxOld"}
                        checked={passwordPolicy7}
                        className={classes.mainCheckboxInputDls}
                        onChange={() => {}}
                      />
                      <label
                        htmlFor={"idCheckBoxOld"}
                        id={"idLabelOld"}
                        className={classes.mainCheckboxLabelDls}
                        onClick={() => setPasswordPolicy7(!passwordPolicy7)}
                      >
                        Без пробелов
                      </label>
                    </p>

                    <article className={classes.btnPlace}>
                      {" "}
                      <Button
                        className={classes.BtnTypeBlocks}
                        style={{ marginTop: "2vw" }}
                        sx={ButtonStyle}
                        onClick={() => {
                          postUpdate_policy("updatePolicyContainer");
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
                    style={{ width: "100%" }}
                    
                    id="deleteLogContainer"
                  >
                    <h4 className={classes.titleTypeBlocks}>Очистка логов</h4>
                    {gettigettingData ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Select
                        id="valueThemeSelect"
                        sx={selecetStyle}
                        value={deleteLogType}
                        onChange={(e) => {
                          setDeleteLogType(e.target.value);
                        }}
                      >
                        {" "}
                        <MenuItem value={0}>Все логи </MenuItem>
                        <MenuItem value={1}>Опыт, карма, акоины</MenuItem>
                        <MenuItem value={2}>Логи действий </MenuItem>
                        <MenuItem value={3}>Все у сотрудника</MenuItem>
                        <MenuItem value={4}>
                          Логи действий у сотрудника{" "}
                        </MenuItem>
                        <MenuItem value={5}>Логи валюты у сотрудника </MenuItem>
                      </Select>
                    )}

                    {deleteLogType > 2 && (
                      <Select
                        id="valueThemeSelect"
                        sx={selecetStyle}
                        value={deleteLogEmploee}
                        onChange={(e) => {
                          setDeleteLogEmploee(e.target.value);
                        }}
                      >
                        {" "}
                        {allUsers &&
                          allUsers.map((el, i) => (
                            <MenuItem value={el.id} key={i}>
                              {el.first_name + " " + el.last_name}{" "}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                    <article className={classes.btnPlace}>
                      {" "}
                      <Button
                        className={classes.BtnTypeBlocks}
                        style={{ marginTop: "2vw" }}
                        sx={ButtonStyle}
                        onClick={() => {
                          postDeleteLogs("deleteLogContainer");
                        }}
                      >
                        {loader == 2 ? (
                          <CircularProgress size={24} />
                        ) : (
                          "Очистить"
                        )}
                      </Button>
                    </article>
                  </article>
                </div>

                <article
                  className={classes.mainTypeBlocks}
                  style={{ paddingBottom: "0" }}
                >
                  {" "}
                  <h4 className={classes.titleTypeBlocks}>Журнал аудита:</h4>
                  <div>
                    <div className={classes.securitySelectWrapper}>
                      <Select
                        id="valueThemeSelect"
                        sx={selecetStyle}
                        value={logsType}
                        onChange={(e) => {
                          setLogsType(e.target.value);
                        }}
                      >
                        {" "}
                        <MenuItem value={0}>Все </MenuItem>
                        <MenuItem value={1}>Опыт, карма, акоины</MenuItem>
                      </Select>
                      <Select
                        id="valueThemeSelect"
                        sx={selecetStyle}
                        value={0}
                        //   onChange={(e) => {
                        //     setSelectRole(e.target.value);
                        //   }}
                      >
                        {" "}
                        <MenuItem value={0}>Не выбрано </MenuItem>
                      </Select>
                    </div>
                  </div>
                  {gettigettingData ? (
                    <CircularProgress size={50} sx={{ marginTop: "5vw" }} />
                  ) : logsType == 0 ? (
                    logs && (
                      <div className={classes.logsContainer}>
                        {logs.map((el, i) => (
                          <LogsPoint key={i} data={el} />
                        ))}
                      </div>
                    )
                  ) : logsType == 1 ? (
                    logsEXPCarmaAc && (
                      <div className={classes.logsContainer}>
                        {logsEXPCarmaAc.map((el, i) => (
                          <LogsEXPCarmaAcPoint key={i} data={el} />
                        ))}
                      </div>
                    )
                  ) : (
                    {}
                  )}
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

export default Security;

const LogsPoint = (props) => {
  const { data } = props;
  return (
    <div className={classes.logsPointWrapper}>
      <p>
        <strong>action_type:</strong> {data.action_type}
      </p>
      <p>
        <strong>created_at:</strong> {data.created_at}
      </p>
      <p>
        <strong>description:</strong> {data.description}
      </p>
      <p>
        <strong>model_name:</strong> {data.model_name}
      </p>
      <p>
        <strong>readable_description:</strong> {data.readable_description}
      </p>
      <p>
        <strong>description:</strong> {data.description}
      </p>
    </div>
  );
};

const LogsEXPCarmaAcPoint = (props) => {
  const { data } = props;
  return (
    <div className={classes.logsPointWrapper}>
      <p>
        <strong>description:</strong> {data.description}
      </p>
      <p>
        <strong>new_value:</strong> {data.new_value}
      </p>
      <p>
        <strong>old_value :</strong> {data.old_value}
      </p>
      <p>
        <strong>source :</strong> {data.source}
      </p>
      <p>
        <strong>timestamp:</strong> {data.timestamp}
      </p>
    </div>
  );
};
