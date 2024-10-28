import React, { useEffect, useState } from "react";
import classes from "./statisticsSystem.module.css";
import Header from "../../../components/general/header";
import Navigation from "./navigation";
import {
  Button,
  Checkbox,
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
import { changeColorSelect, changeErrorColorSelect } from "./changeColor.js";
import ModalNoAccess from "../../../components/general/modalNoAccess.jsx";
import { getGroupsAuth } from "../../../hooks/reduxHooks.js";

const Law = () => {
  const group = getGroupsAuth();

  const [allRole, setAllRole] = useState([]);
  const [allRghts, setAllRghts] = useState([]);

  const [selectRole, setSelectRole] = useState(0);
  const [arrNewRole, setArrNewRole] = useState([]);
  const [nameNewRole, setNameNewRole] = useState("");
  useEffect(() => {
    let selectedRole;
    console.log(allRole);

    allRole.map((el) => el.id == selectRole && (selectedRole = el));
    console.log(selectedRole);
    allRghts.map(() =>
      document
        .querySelectorAll(`[forsearch="idCheckBoxOld"]`)
        .forEach((el) => (el.checked = false))
    );
    selectedRole &&
      selectedRole.permissions_info.map(
        (el) =>
          (document.querySelector(`#${"idCheckBoxOld" + el.id}`).checked = true)
      );
  }, [selectRole]);
  useEffect(() => {
    let input = document.querySelectorAll(`.${classes.mainCheckboxInputDls}`);
    input.forEach(
      (el, i) =>
        el.disabled &&
        (document.querySelector(`#${"idLabelOld" + (i + 1)}`).classList =
          classes.idLabelOldDisabled)
    );
  }, [allRghts]);

  useEffect(() => {
    getData();
  }, []);
  function getData() {
    instance.get(`groups/`).then((response) => {
      console.log(response);
      setAllRole(response.data);
    });
    instance.get(`permissions/list_permissions/`).then((response) => {
      setAllRghts(response.data);
      console.log(response);
    });
  }
  function checkboxChange(i, e) {
    let clon = arrNewRole.map((arrNewRole) => arrNewRole);
    clon[i] = e.target.checked;
    setArrNewRole(clon);
  }
  function changeRole(id1) {
    let data = [];
    document
      .querySelectorAll(`[forsearch="idCheckBoxOld"]`)
      .forEach((el, i) => (el.checked ? (data[i] = true) : (data[i] = false)));

    data.map((el, i) => el && (data[i] = i + 1));
    data = data.filter(
      (item) =>
        item !== null && item !== undefined && item !== "" && item !== false
    );
    let nameRole;
    allRole.map((el) => el.id == selectRole && (nameRole = el.name));
    console.log(nameRole);

    instance
      .put(`groups/${selectRole}/`, {
        name: nameRole,
        permissions: data,
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
  function createRole(id1) {
    let clon = arrNewRole.map((arrNewRole) => arrNewRole);
    clon.map((el, i) => el && (clon[i] = i + 1));
    clon = clon.filter(
      (item) =>
        item !== null && item !== undefined && item !== "" && item !== false
    );
    instance
      .post(`groups/`, {
        name: nameNewRole,
        permissions: clon,
      })
      .then((response) => {
        console.log(response);
        changeColorSelect(id1);
        changeColorSelect(id1);
      })
      .catch((response) => {
        console.log(response);
        changeErrorColorSelect(id1);
      });
  }
  return (
    <div>
      {" "}
      {group == "Администраторы" ? (
        <>
          <Header />
          <section className={classes.mainContainer}>
            <Navigation styleBackground={"Law"} />
            <section className={classes.mainContent}>
              <div className={classes.mainContentWrapper}>
                <article className={classes.mainTypeBlocks} id="changeRole">
                  <h4 className={classes.titleTypeBlocks}>
                    Редактирование ролей{" "}
                  </h4>

                  <Select
                    id="valueThemeSelect"
                    sx={selecetStyle}
                    value={selectRole}
                    onChange={(e) => {
                      setSelectRole(e.target.value);
                    }}
                  >
                    {" "}
                    <MenuItem value={0}>Не выбрано </MenuItem>
                    {allRole.map((el, i) => (
                      <MenuItem key={i} value={el.id}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <div
                    style={{
                      transition: "all 1s linear",
                      borderRadius: "10px",
                    }}
                  >
                    <article className={classes.lawContainer}>
                      {" "}
                      <h5 className={classes.TitleH5}>Выбранные права:</h5>
                      <div className={classes.lawCollection}>
                        {allRghts.map((el, i) => (
                          <div
                            key={i}
                            style={{ position: "relative", width: "50%" }}
                          >
                            {" "}
                            <input
                              type="checkbox"
                              forsearch="idCheckBoxOld"
                              id={"idCheckBoxOld" + (i + 1)}
                              className={classes.mainCheckboxInputDls}
                              onChange={(e) => checkboxChange(i, e)}
                              // disabled
                            />
                            <label
                              htmlFor={"idCheckBoxOld" + (i + 1)}
                              id={"idLabelOld" + (i + 1)}
                              className={classes.mainCheckboxLabelDls}
                            >
                              {el.translated_name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>
                  <article className={classes.btnPlace}>
                    {" "}
                    <Button
                      className={classes.BtnTypeBlocks}
                      sx={ButtonStyle}
                      style={{ marginTop: "2vw" }}
                      onClick={() => {
                        changeRole("changeRole");
                      }}
                    >
                      Сохранить
                    </Button>
                  </article>
                </article>

                <article className={classes.mainTypeBlocks} id="newRole">
                  {" "}
                  <h4 className={classes.titleTypeBlocks}>
                    Название новой роли{" "}
                  </h4>
                  <TextField
                    fullWidth
                    sx={{
                      ...TextFieldStyle,
                      margin: "1vw 0 0 0",
                      "& input": {
                        padding: "8px",
                        fontSize: ".95vw",
                      },
                    }}
                    focused
                    onChange={(e) => {
                      setNameNewRole(e.target.value);
                    }}
                    value={nameNewRole}
                  />
                  <div
                    style={{
                      transition: "all 1s linear",
                      borderRadius: "10px",
                    }}
                  >
                    <article className={classes.lawContainer}>
                      <h5 className={classes.TitleH5}>Выбранные права:</h5>
                      <div className={classes.lawCollection}>
                        {allRghts.map((el, i) => (
                          <div
                            key={i}
                            style={{ position: "relative", width: "50%" }}
                          >
                            {" "}
                            <input
                              type="checkbox"
                              id={"idCheckBoxNewRol" + i}
                              className={classes.mainCheckboxInputDls}
                              onChange={(e) => checkboxChange(i, e)}
                            />
                            <label
                              htmlFor={"idCheckBoxNewRol" + i}
                              className={classes.mainCheckboxLabelDls}
                            >
                              {el.translated_name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>
                  <article className={classes.btnPlace}>
                    {" "}
                    <Button
                      className={classes.BtnTypeBlocks}
                      sx={ButtonStyle}
                      style={{ marginTop: "2vw" }}
                      onClick={() => {
                        createRole("newRole");
                      }}
                    >
                      Сохранить
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

export default Law;
