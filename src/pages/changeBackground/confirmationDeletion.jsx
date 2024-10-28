import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { ButtonStyle } from "../../components/styles/styles";

const ConfirmationDeletion = (props) => {
  const { openDialog, setOpenDialog, removeItem } = props;
  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        setOpenDialog(false);
      }}
      sx={{
        "& .MuiDialog-paper": {
          background: "#202833",
          position: "relative",
        },
      }}
      maxWidth="md"
    >
      <DialogContent sx={{ color: "#fff", width: "500px" }}>
        {" "}
        Удалить?{" "}
      </DialogContent>
      <DialogActions>
        <Button
          sx={ButtonStyle}
          onClick={() => {
            setOpenDialog(false);
          }}
        >
          Отмена
        </Button>
        <Button
          sx={ButtonStyle}
          onClick={() => {
            removeItem(), setOpenDialog(false);
          }}
        >
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDeletion;
