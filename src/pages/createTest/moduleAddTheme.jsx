import { Dialog } from "@mui/material";
import React from "react";
import classes from "./test.module.css";

const ModuleAddTheme = (props) => {
  return (
    <Dialog
      open={props.visibleModalAddTheme}
      onClose={() => props.setVisibleModalAddTheme(false)}
    >
      <div className={classes.modalOpen}>
        <div>Тут будет что-то для создания тем для тестов</div>
      </div>
    </Dialog>
  );
};

export default ModuleAddTheme;
