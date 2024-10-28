import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import classes from "./test.module.css";
import { instance } from "../../../utils/axios/index.js";

const ModuleAddTheme = (props) => {
  const {
    selectOption,
    setSelectOption,
    setVisibleModalAddTheme,
    visibleModalAddTheme,
    setValueSelect,
    refreshThemes,
  } = props;
  const [errorThemeAlradyisCreated, setErrorThemeAlradyisCreated] =
    useState(false);
  const postform = async (e) => {
    e.preventDefault();
    let themeAlradyisCreated = false;
    let name = document.querySelector(`#createNewThemeForTestsInput`).value;

    for (let i = 0; i < selectOption.length; i++) {
      if (selectOption[i].name.toLowerCase() == name.toLowerCase()) {
        themeAlradyisCreated = true;
        break;
      }
    }
    if (!themeAlradyisCreated) {
      const user = await instance
        .post("create_theme/", { name: name })
      setVisibleModalAddTheme(false);
      refreshThemes(name);
    } else {
      setErrorThemeAlradyisCreated(true);
    }
  };
  function goBackCick() {
    setVisibleModalAddTheme(false);
    setErrorThemeAlradyisCreated(false);
  }
  return (
    <Dialog
      open={visibleModalAddTheme}
      onClose={() => setVisibleModalAddTheme(false)}
      fullWidth={true}
      maxWidth={"sm"}
      sx={{
        "& .MuiDialog-paper": {
          background: "#202833",
        },
      }}
    >
      <DialogTitle sx={{color:"#fff"}}>
        <div className={classes.createThemeText}>
          Введите название новой темы теста
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={classes.modalOpen}>
          <form id="createNewThemeForTests" onSubmit={(e) => postform(e)}>
            <input
              type="text"
              id="createNewThemeForTestsInput"
              className={classes.createThemeInput}
            />
            {errorThemeAlradyisCreated && (
              <div className={classes.errorThemeAlradyisCreated}>
                Такая тема уже существует!
              </div>
            )}
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button className={classes.createThemeBtn} onClick={() => goBackCick()}>
          {" "}
          Отмена
        </Button>

        <Button
          className={classes.createThemeBtn}
          type="submit"
          form="createNewThemeForTests"
        >
          Создать тему
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModuleAddTheme;
