import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./ModalNoAccess.module.css";
import { useNavigate } from "react-router-dom";
const ModalNoAccess = () => {
  const [openDialog] = useState(true);
  const navigate = useNavigate() 
  return (
    <Dialog
      open={openDialog}
      fullWidth={true}
      maxWidth={"lg"}
      sx={{ background: "#fff" }}
    >
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <div className={classes.dialogContent}>
          <div>Вам сюда нельзя</div>
          <CloseIcon className={classes.animationCross} />
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", marginBottom: "3vw" }}>
        <Button
          className={classes.btn}
          sx={{
            outline: "none !important",
          }}
          onClick={()=>{navigate(-1)}}
        >
          назад
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalNoAccess;
