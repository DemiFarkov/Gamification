import * as React from "react";
import Dialog from "@mui/material/Dialog";
import classes from "./WindowModal.module.css";

const WindowModal = (props) => {
  return (
    <Dialog  open={props.visible} onClose={() => props.changeVisible(false)}>
      <div className={classes.wrapper}>
        <div>{props.text}</div>
      </div>
    </Dialog>
  );
};

export default WindowModal;
