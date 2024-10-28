import { Dialog } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialorBackground } from "../../toolkitRedux/toolkitSlice";

const BackgroundModal = (props) => {
  const { openDialog, setOpenDialog, url } = props;
  const modalData = useSelector((state) => state.background);
  
  const dispatch = useDispatch();
  return (
    <Dialog
      open={modalData.dialogIsOpen}
      maxWidth="xl"
      onClose={() => {
        dispatch(openDialorBackground(false));
      }}
    >
      <img src={modalData.urlBackground} alt="xcxvx" />
    </Dialog>
  );
};

export default BackgroundModal;
