import React from "react";
import classes from "./test.module.css";

const TestSettingsInput = (props) => {
  return (
    <div className={classes.TestSettingsinputWrapper}>
      <div className={classes.TestSettingsinputName}>{props.title}</div>
      <input
        type={props.type}
        className={classes.TestSettingsinput}
        placeholder={props.text}
      />
    </div>
  );
};

export default TestSettingsInput;
