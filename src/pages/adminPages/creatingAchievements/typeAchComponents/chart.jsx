import React, { useEffect, useState } from "react";
import classes from "../creatingAchievements.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import {
  selecetStyle,
  TextFieldStyle,
} from "../../../../components/styles/styles";
import { useDispatch } from "react-redux";
import { typeAchData } from "../../../../toolkitRedux/toolkitSlice";

const Chart = () => {
  const [complexityAch, setСomplexityAch] = useState(0);
  const [streakDaysRequired, setStreakDaysRequired] = useState("");
  const [totalDaysRequired, setTotalDaysRequired] = useState("");
  const [totalWorkedDaysRequired, setTotalWorkedDaysRequired] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let type_specific_data = {};
    streakDaysRequired &&
      (type_specific_data.streak_days_required = streakDaysRequired);
    totalDaysRequired &&
      (type_specific_data.total_days_required = totalDaysRequired);
    totalWorkedDaysRequired &&
      (type_specific_data.total_worked_days_required = totalWorkedDaysRequired);

    dispatch(
      typeAchData({
        difficulty: complexityAch,
        type_specific_data: type_specific_data,
      })
    );
  }, [streakDaysRequired, totalDaysRequired, totalWorkedDaysRequired]);
  return (
    <div className={classes.columnBlock}>
      <h3 className={classes.titleMinPlock}>Обращения</h3>
      <div className={classes.AppealsBlock}>
        <div>
          <div style={{ position: "relative", marginTop: "32px" }}>
            {" "}
            <input
              type="checkbox"
              id={"idCheckAppeals2"}
              className={classes.mainCheckboxInputDls}
              //   onChange={(e) => checkboxChange(i, e)}
              // disabled
            />
            <label
              htmlFor={"idCheckAppeals2"}
              className={classes.mainCheckboxLabelDls}
            >
              Можно получить один раз
            </label>
          </div>
          <p className={classes.AppealsP}>Сложность</p>
          <Select
            id="valueThemeSelect"
            sx={{ ...selecetStyle, marginTop: "0" }}
            value={complexityAch}
            onChange={(e) => {
              setСomplexityAch(e.target.value),
                dispatch(typeAchData({ complexityAch: e.target.value }));
            }}
          >
            {" "}
            <MenuItem value={0}>Бронза</MenuItem>
            <MenuItem value={1}>Серебро</MenuItem>
            <MenuItem value={2}>Золото</MenuItem>
            <MenuItem value={3}>Платина</MenuItem>
            {/* {allRole.map((el, i) => (
                  <MenuItem key={i} value={el.id}>
                    {el.name}
                  </MenuItem>
                ))} */}
          </Select>
        </div>
        <div>
          <p className={classes.AppealsP}>Не опаздывать к-во дней подряд</p>
          <TextField
            fullWidth
            sx={{
              ...TextFieldStyle,
              margin: "0",
              "& input": {
                padding: "8px",
                fontSize: ".95vw",
              },
            }}
            focused
            type="number"
            onChange={(e) => {
              setStreakDaysRequired(e.target.value);
            }}
            value={streakDaysRequired}
          />
          <p className={classes.AppealsP}> Общее число дней без опозданий</p>
          <TextField
            fullWidth
            sx={{
              ...TextFieldStyle,
              margin: "0",
              "& input": {
                padding: "8px",
                fontSize: ".95vw",
              },
            }}
            focused
            type="number"
            onChange={(e) => {
              setTotalDaysRequired(e.target.value);
            }}
            value={totalDaysRequired}
          />
          <p className={classes.AppealsP}> Общее кол-во отработанных дней </p>
          <TextField
            fullWidth
            sx={{
              ...TextFieldStyle,
              margin: "0",
              "& input": {
                padding: "8px",
                fontSize: ".95vw",
              },
            }}
            focused
            type="number"
            onChange={(e) => {
              setTotalWorkedDaysRequired(e.target.value);
            }}
            value={totalWorkedDaysRequired}
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
