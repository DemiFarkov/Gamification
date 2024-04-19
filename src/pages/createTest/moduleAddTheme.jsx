import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import classes from "./test.module.css";
import { instance } from "../../utils/axios";

const ModuleAddTheme = (props) => {
  const postform = async (e) => {
    e.preventDefault();
    let name = document.querySelector(`#createNewThemeForTestsInput`).value;
    const user = await instance
      .post("create_theme/", {name: name})
      .then(function (response) {
        console.log(response);
      });
  };
  return (
    <Dialog
      open={props.visibleModalAddTheme}
      onClose={() => props.setVisibleModalAddTheme(false)}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>
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
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.createThemeBtn}
          onClick={() => props.setVisibleModalAddTheme(false)}
        >
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
