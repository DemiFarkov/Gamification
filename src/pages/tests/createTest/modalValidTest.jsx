import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import classes from "./test.module.css";
import { Link } from "react-router-dom";

const ModalValidTest = (props) => {
  const {
    visibleModalValidTest,
    setVisibleModalValidTest,
    ModalValidTestText,
    setActionForm,
    setForRemove,
  } = props;
  const text = ModalValidTestText[0];
  const needConfirm = ModalValidTestText[1];
  const whatDo = ModalValidTestText[2];   

  const idForRemove = ModalValidTestText[3];
  function ClickOk() {
    setVisibleModalValidTest(false);
    if (whatDo == "create test") {
      setActionForm(true);
    } else if (whatDo == "remove block") {
      setForRemove(idForRemove);
    }
  }
  function ClickCancel() {
    setVisibleModalValidTest(false);
  }

  return (
    <Dialog
      open={visibleModalValidTest}
      onClose={() => setVisibleModalValidTest(false)}
      fullWidth={true}
      maxWidth={"sm"}
      sx={{
        "& .MuiDialog-paper": {
          background: "#202833",
        },
      }}
    >
      <DialogTitle>
        <div className={classes.validDialogTitle}>Внимание!</div>{" "}
      </DialogTitle>
      <DialogContent
      >
        <div className={classes.validDialog}>{text}</div>
      </DialogContent>

      {needConfirm && (
        <DialogActions>
          <Button className={classes.dialogBtn} onClick={() => ClickCancel()}>Cancel</Button>
          <Button className={classes.dialogBtn} onClick={() => ClickOk()}>Ok</Button>
        </DialogActions>
      )}
      {whatDo == "successfulСreation" &&
       <DialogActions>
          <Button><Link to="../pages/tests/traning" className={classes.dialogLink}>Перейти к тестам</Link></Button>
        </DialogActions>
        }
    </Dialog>
  );
};

export default ModalValidTest;
