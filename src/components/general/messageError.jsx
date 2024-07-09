import { Dialog } from "@mui/material";
import React from "react";

const MessageError = (props) => {
    const {openMessageError, setOpenMessageError} = props
  return (
    <Dialog
      open={openMessageError}
      onClose={() => setOpenMessageError(false)}
      fullWidth={true}
      maxWidth={"sm"}
    >
      Что-то пошло не так при отправке запроса
    </Dialog>
  );
};

export default MessageError;
