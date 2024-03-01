import * as React from "react";
import Dialog from "@mui/material/Dialog";

const WindowModal = (props) => {
  return (
    <Dialog open={props.visible} onClose={() => props.changeVisible(false)}>
      <div>{props.text}</div>
    </Dialog>
  );
};

export default WindowModal;
