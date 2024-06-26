import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import classes from "./moderationTest.module.css";

const ModalModeration = (props) => {
    const {modalOpen, setModalOpen} = props
  return (
    <Dialog
      open={modalOpen}
      fullWidth
      maxWidth={"sm"}
      sx={{
        "& .MuiDialog-paper": {
          height: "20vh !important",
        },
      }}
    >
      <DialogContent>Модерация завершена</DialogContent>
      <DialogActions>
        <Button>
          <Link
            to="../pages/tests/moderationTest"
            className={classes.dialogLink}
          >
            Перейти к другим тестам для модерации
          </Link>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalModeration;
