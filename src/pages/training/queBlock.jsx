import React, { useEffect, useState } from "react";
import classes from "./traning.module.css";
import { Button } from "@mui/material";

const QueBlock = (props) => {
  const {
    data,
    setCountForData,
    countForData,
    countAnswers,
    setCountAnswers,
    list,
    countQue,blockLength,
    setCountQue,
  } = props;
  const [time, setTime] = useState(new Date());
  let e = 11;
  setInterval(() => setTime(new Date()), 1000);
  useEffect(() => {
    let Circle = document.querySelectorAll(`.${classes.queCircle}`);
    for (let i = 0; i < countQue; i++) {
      Circle[i].style.background = "#378b85";
    }
  }, [countQue]);
  function handleClick() {
    setCountForData(countForData + 1);
    setCountQue(countQue + 1);
  }
  return (
    <div className={classes.QueContainer}>
      <div className={classes.countQue}>
        <div className={classes.countQueWrapper}>
          <div className={classes.QueTimer}>{time.toLocaleTimeString()}</div>
          <div className={classes.QueTable}>{list}</div>
        </div>
      </div>
      <div className={classes.ThisQue}>
        <h1 className={classes.numberQue}>Вопрос № {countQue}</h1>
        <div className={classes.ThisQueText}>{data.content.question_text}</div>
        
        <Button
          variant="contained"
          size="large"
          className={classes.theoryBtn}
          onClick={() => {
            handleClick();
          }}
        >
{countForData !== blockLength - 1 ? "Далее" : "Завершить тест"}
          
        </Button>
      </div>
    </div>
  );
};

export default QueBlock;
