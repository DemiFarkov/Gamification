import React from "react";
import classes from "./traning.module.css";
import { Button } from "@mui/material";

const TheoryBlock = (props) => {
  const { data, setCountForData, countForData, blockLength } = props;
  return (
    <div className={classes.theoryContainer}>
      <h2 className={classes.theoryTitle}>{data.content.title}</h2>
      <div className={classes.theoryText}>{data.content.text}</div>
      <Button
        variant="contained"
        size="large"
        className={classes.theoryBtn}
        onClick={() => {
          setCountForData(countForData + 1);
        }}
      >
        {countForData !== blockLength - 1 ? "Далее" : "Завершить тест"}
      </Button>
    </div>
  );
};

export default TheoryBlock;
