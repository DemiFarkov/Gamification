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
        min={props.min ? props.min : undefined}
        max={props.max ? props.max : undefined}
        id={props.id}
      />
    </div>
  );
};

export default TestSettingsInput;
