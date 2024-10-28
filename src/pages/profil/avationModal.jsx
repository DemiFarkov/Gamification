import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { instance } from "../../utils/axios/index.js";
import classes from "./profil.module.css";
import { TextFieldStyle } from "../../components/styles/styles.js";

const AvationModal = (props) => {
  const { setOpenAvationDialog, openAvationDialog, goodAvation, id } = props;
  const [textFieldContent, setTextFieldContent] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const [dialogTitle, setDialogTitle] = useState(
    goodAvation ? "Отправить похвалу" : "Отправить жалобу"
  );

  useEffect(() => {
    setTextFieldContent("");
    setDialogTitle(goodAvation ? "Отправить похвалу" : "Отправить жалобу");
    setError(false);
  }, [goodAvation]);
  function sendingRequest() {
    if (textFieldContent == "") {
      setError(true);
    } else {
      let text = document.querySelector(`.${classes.dialogTitleText}`).style
        .color;
      setLoad(true);

      if (goodAvation) {
        instance
          .post(`create_feedback/praise/${id}/`, { text: textFieldContent })
          .then(function (response) {
            successSendQuery();

            document.querySelector(`.${classes.dialogTitleText}`).style.color =
              "#37b166";
          });
      } else {
        instance
          .post(`create_feedback/complaint/${id}/`, { text: textFieldContent })
          .then(function (response) {
            successSendQuery();
            document.querySelector(`.${classes.dialogTitleText}`).style.color =
              "#37b166";
          });
      }
    }
  }
  function successSendQuery() {
    setDialogTitle("Успешно");
    setLoad(false);
    setError(false);
    setTimeout(() => setOpenAvationDialog(false), 1000);
  }
  return (
    <Dialog
      open={openAvationDialog}
      onClose={() => setOpenAvationDialog(false)}
      fullWidth={true}
      maxWidth={"sm"}
      sx={{
        "& .MuiDialog-paper": {
          background: "#202833",
        },
      }}
    >
      <DialogTitle sx={{color:"#Fff"}}>
        <p className={classes.dialogTitleText}>{dialogTitle}</p>
      </DialogTitle>
      <DialogContent>
        <TextField
          label={
            goodAvation ? "Опишите причину похвалы*" : "Опишите причину жалобы*"
          }
          error={error}
          value={textFieldContent}
          onChange={(e) => {
            setTextFieldContent(e.target.value);
          }}
          multiline
          fullWidth={true}
          sx={TextFieldStyle}
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: " #fff" }}
          onClick={() => {
            setOpenAvationDialog(false);
          }}
        >
          Назад
        </Button>
        <Button
          sx={{ color: " #fff" }}
          onClick={() => {
            sendingRequest();
          }}
        >
          {!load ? (
            "Отправить"
          ) : (
            <CircularProgress
              color="success"
              sx={{
                width: "0.875rem !important",
                height: "0.875rem !important",
              }}
            />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvationModal;
