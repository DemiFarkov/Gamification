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
      Что-то пошло не так при отправке запроса. Просьба нажать f12 и перейти в
      консоль, максимально раскрыть все что есть в консоле, сделать скришноты в
      том числе и заполненных вами полей, если такое есть и сообщить об ошибке
      Фаркову Дмитрию
    </Dialog>
  );
};

export default MessageError;
