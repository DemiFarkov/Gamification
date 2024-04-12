import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import classes from "./test.module.css";

const ModalValidTest = (props) => {
  function closeDialog() {
    props.setVisibleModalValidTest(false);
    props.setModalValidTestText(false)
  }
  return (
    <Dialog
      open={props.visibleModalValidTest}
      onClose={() => closeDialog()}
      style={{ maxWidth: "none", maxHeight: "none" }}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle><div className={classes.validDialogTitle}>Внимание!</div> </DialogTitle>
      <DialogContent>
        <div className={classes.validDialog}>{props.ModalValidTestText}</div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalValidTest;
