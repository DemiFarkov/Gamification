import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { instance } from "../../utils/axios";
import { isMobile } from "../../hooks/react-responsive";
import CircularProgress from "@mui/material/CircularProgress";
import { TextFieldStyle } from "../../components/styles/styles";

const ChangeStatusModal = (props) => {
  const {
    visibleChangeStatusModal,
    setVisibleChangeStatusModal,
    getData,
    id,
    data,
  } = props;
  const [status, setStatus] = useState(data);
  const [load, setLoad] = useState(false);
  const isMobileWidth = isMobile();
  function postStatus() {
    setLoad(true);
    instance
      .patch("update_status/", { id: id, status: status })
      .then((response) => {
        getData();
        setLoad(false);
        setVisibleChangeStatusModal(false);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  return (
    <Dialog
      open={visibleChangeStatusModal}
      onClose={() => setVisibleChangeStatusModal(false)}
      fullWidth={true}
      maxWidth={"sm"}
      sx={{
        "& .MuiDialog-paper": {
          background: "#202833",
          position: "relative",
        },
      }}
    >
      <DialogTitle sx={{ color: "#fff" }}>Изменение статуса</DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          multiline
          fullWidth
          InputProps={{
            value: `${status}`,
          }}
          onChange={(event) => {
            event.target.value.toString().length < 100 &&
              setStatus(event.target.value);
          }}
          sx={TextFieldStyle}
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: " #fff" }}
          onClick={() => setVisibleChangeStatusModal(false)}
        >
          Отмена
        </Button>
        <Button
          sx={{ color: " #fff", minWidth: "20%" }}
          onClick={() => postStatus()}
        >
          {load ? (
            <CircularProgress
              sx={{
                width: "0.875rem !important",
                height: "0.875rem !important",
              }}
              color="success"
            />
          ) : (
            "Сохранить"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeStatusModal;
