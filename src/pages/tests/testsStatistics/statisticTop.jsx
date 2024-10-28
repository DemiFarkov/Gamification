import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import classes from "./testsStatistics.module.css";
const StatisticTop = (props) => {
  const {
    openModalTop,
    setOpenModalTop,
    contentForModal,
    top_participants,
    allEmployee,questionErrorsStat,questionCorrectStat
    // questionStat,
  } = props;
  const [topParticipantsLocal, setTop_participantsocal] =
    useState(top_participants);
  const [questionStat, setQuestionStat] = useState();
  const [selectTest, setSelectTest] = useState("");
  useEffect(() => {
    if (openModalTop) {
      contentForModal[1]
        ? setQuestionStat(questionCorrectStat)
        : setQuestionStat(questionErrorsStat)
    }
  }, [openModalTop]);

  return (
    <Dialog
      open={openModalTop}
      onClose={() => setOpenModalTop(false)}
      fullWidth={true}
      maxWidth={"xl"}
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
        {contentForModal[0]}
      </DialogTitle>
      <DialogContent>
        {questionStat && (
          <>
            <div className={classes.rowTitle}>
              <div className={classes.rowTitleItem} style={{ width: "35%" }}>
                <p>Вопрос</p>
                
              </div>
              <div className={classes.rowTitleItem} style={{ width: "21%" }}>
                                <p>Всего ответов</p>

              </div>
              <div className={classes.rowTitleItem} style={{ width: "21%" }}>
                <p>{contentForModal[1]
                  ? "Правильных ответов"
                  : "Не правильных ответов"}</p>
              </div>
              <div className={classes.rowTitleItem} style={{ width: "19%" }}>
                <p>{contentForModal[1]
                  ? "% правильных ответов"
                  : "% не правильных ответов"}</p>
              </div>
            </div>
            
            {questionStat.most_common.map((el, index) => (
              <div key={index} className={classes.modalRow}>
                <TextField
                  InputProps={{
                    readOnly: true,
                    value: `${el.question_text}`,
                  }}
                  multiline
                  sx={{
                    width: "35%",
                    borderRadius: "1vw",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        border: "none !important",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "aliceblue ",
                    },
                    "& .MuiInputBase-root-MuiOutlinedInput-root.": {
                      color: "aliceblue",
                    },
                    "& .MuiOutlinedInput-root": {
                      cursor: "default !important",
                      color: "aliceblue",
                      background: "#131820",
                      borderRadius: "1vw",
                    },
                    "& textarea": {
                      textAlign: "center",
                      cursor: "auto !important",
                    },
                    "& .MuiOutlinedInput-root:hover": {
                      color: "aliceblue",
                      "& > fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
                <div className={classes.rowItem} style={{ width: "21%" }}>
                  {el.total_answers}{" "}
                </div>
                <div className={classes.rowItem} style={{ width: "21%" }}>
                  {el.count}{" "}
                </div>
                <div className={classes.rowItem} style={{ width: "19%" }}>
                  {el.ratio}{" "}
                </div>
              </div>
            ))}
          </>
        )}{" "}
      </DialogContent>
    </Dialog>
  );
};

export default StatisticTop;
