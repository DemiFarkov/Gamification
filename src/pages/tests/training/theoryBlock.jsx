import React from "react";
import classes from "./traning.module.css";
import { Button, TextField } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

const TheoryBlock = (props) => {
  const {
    data,
    setCountForData,
    countForData,
    blockLength,
    setType,
    timeForTest,
  } = props;
  return (
    <div className={classes.theoryContainer}>
      <h2 className={classes.theoryTitle}>{data.content.title}</h2>
      <div className={classes.theoryText}>
      <MDEditor.Markdown source={data.content.text} style={{ whiteSpace: "pre-wrap", background:"#202833",color:"#fff" }} />

        {/* <TextField
          multiline
          fullWidth
          InputProps={{
            readOnly: true,
            value: `${data.content.text}`,
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-root": { color: "#fff" },
          }}
        /> */}
      </div>
      <Button
        variant="contained"
        size="large"
        className={classes.theoryBtn}
        onClick={() => {
          setType();
        }}
      >
        {countForData !== blockLength - 1 ? "Далее" : "Завершить тест"}
      </Button>
    </div>
  );
};

export default TheoryBlock;
