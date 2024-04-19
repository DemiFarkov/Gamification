import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import classes from "./test.module.css";

const ModalValidTest = (props) => {
  const {
    visibleModalValidTest,
    setVisibleModalValidTest,
    setModalValidTestText,
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
  // const ref = useRef(null);
  // useEffect(() => {
  //   console.log(ref);
  // });
  // function asd() {
  //   {
  //     console.log(ref);
  //   }
  //   let modal = ref.current.children[2].children[0];
  //   modal.style.borderRadius = "1.5vw";
  //   modal.style.borderRadius = "1.5vw";
  // }

  return (
    <Dialog
      // ref={ref}
      open={visibleModalValidTest}
      onClose={() => setVisibleModalValidTest(false)}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>
        <div className={classes.validDialogTitle}>Внимание!</div>{" "}
      </DialogTitle>
      <DialogContent
      // onClick={() => asd()}
      >
        <div className={classes.validDialog}>{text}</div>
      </DialogContent>

      {needConfirm && (
        <DialogActions>
          <Button onClick={() => ClickCancel()}>Cancel</Button>
          <Button onClick={() => ClickOk()}>Ok</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ModalValidTest;
