import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import classes from "./testsStatistics.module.css";
import { instance } from "../../../utils/axios/index.js";
const StatisticAllTop = (props) => {
  const { openModalAllTop, setOpenModalAllTop, top_participants, allEmployee } =
    props;
  const [topParticipantsLocal, setTop_participantsocal] =
    useState(top_participants);
  const [selectTest, setSelectTest] = useState("");
useEffect(()=>{},[])
  useEffect(() => {
    if (selectTest == "") {
      setTop_participantsocal(top_participants);
    } else
        instance
          .get(`top_participants/?test_id=${selectTest} `)
          .then((response) => {
            console.log(response.data);
            setTop_participantsocal(response.data);
          });
  }, [selectTest]);
  if (top_participants) {
    return (
      <Dialog
        open={openModalAllTop}
        onClose={() => setOpenModalAllTop(false)}
        fullWidth={true}
        maxWidth={"md"}
        sx={{
          "& .MuiDialog-paper": {
            maxHeight: "80vh",
            minHeight: "30vh",
            background: "#202833",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#fff",
          }}
        >
          Топ участников
          <FormControl
            sx={{
              m: 1,
              minWidth: "17vw",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#469C9A",
                color: "#000 ",
              },
              "& .MuiInputLabel-root": {
                color: "#fff ",
              },
              "& .MuiOutlinedInput-root": {
                color: "#fff ",
              },
              "& svg": {
                color: "#fff ",
              },
              "& .MuiOutlinedInput-root:hover": {
                color: "#fff",
                "& > fieldset": {
                  borderColor: "#469C9A",
                },
              },
            }}
          >
            <InputLabel id="modalTest">Выберите тест</InputLabel>
            <Select
              labelId="modalTest"
              value={selectTest}
              onChange={(event) => {
                setSelectTest(event.target.value);
              }}
              label="Выберите тест"
            >
              {" "}
              <MenuItem value={""}>Не выбрано</MenuItem>
              {allEmployee.map((el, index) => (
                <MenuItem value={el.test_id} key={index}>
                  {el.test_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogTitle>
        <DialogContent>
          <div className={classes.rowTitle} style={{ width: "100%" }}>
            <div className={classes.rowTitleItem} style={{ width: "35%" }}>
              Сотрудник
            </div>
            <div className={classes.rowTitleItem} style={{ width: "21%" }}>
              Среднее кол-во баллов
            </div>
            <div className={classes.rowTitleItem} style={{ width: "21%" }}>
              Всего набрано баллов
            </div>
            <div className={classes.rowTitleItem} style={{ width: "19%" }}>
              Всего попыток
            </div>
          </div>
          {topParticipantsLocal &&
            topParticipantsLocal.map((el, index) => (
              <div
                key={index}
                className={classes.modalRow}
                style={{ width: "100%", color: "#fff" }}
              >
                <div className={classes.rowItem} style={{ width: "35%" }}>
                  {el.employee_name}
                </div>
                <div className={classes.rowItem} style={{ width: "21%" }}>
                  {el.average_score}
                </div>
                <div className={classes.rowItem} style={{ width: "21%" }}>
                  {el.total_score}
                </div>
                <div className={classes.rowItem} style={{ width: "19%" }}>
                  {el.total_attempts}
                </div>
              </div>
            ))}
        </DialogContent>
      </Dialog>
    );
  }
};

export default StatisticAllTop;
