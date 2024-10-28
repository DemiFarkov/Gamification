import React, { useEffect, useState } from "react";
import classes from "../creatingAchievements.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import {
  selecetStyle,
  TextFieldStyle,
} from "../../../../components/styles/styles";
import { useDispatch } from "react-redux";
import { typeAchData } from "../../../../toolkitRedux/toolkitSlice";

const NewLvl = () => {
  const [complexityAch, setСomplexityAch] = useState("Easy");
  const [requiredLevel, setRequiredLevel] = useState("");
  const [expEarned, setExpEarned] = useState("");
  const [disposable, setDisposable] = useState(false);
  const [expEarnedWeek, setExpEarnedWeek] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      typeAchData({
        difficulty: complexityAch,
        type_specific_data: {
          required_level: requiredLevel,
          exp_earned: expEarned,
          exp_earned_week: expEarnedWeek,
        },
      })
    );
  }, [requiredLevel, expEarned, expEarnedWeek]);
  return (
    <div className={classes.columnBlock}>
      <h3 className={classes.titleMinPlock}>Обращения</h3>
      <div className={classes.AppealsBlock}>
        <div>
          <div style={{ position: "relative", marginTop: "32px" }}>
            {" "}
            <input
              type="checkbox"
              id={"disposable"}
              className={classes.mainCheckboxInputDls}
              onChange={(e) => setDisposable(e.target.checked)}
              checked={disposable}
            />
            <label
              htmlFor={"disposable"}
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
                dispatch(newAchData({ complexityAch: e.target.value }));
            }}
          >
            {" "}
            <MenuItem value={"Easy"}>Бронза</MenuItem>
            <MenuItem value={"Medium"}>Серебро</MenuItem>
            <MenuItem value={"Hard"}>Золото</MenuItem>
            <MenuItem value={"Expert"}>Платина</MenuItem>
            {/* {allRole.map((el, i) => (
                  <MenuItem key={i} value={el.id}>
                    {el.name}
                  </MenuItem>
                ))} */}
          </Select>
        </div>
        <div>
          <p className={classes.AppealsP}>Получить уровень</p>
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
              setRequiredLevel(e.target.value);
            }}
            value={requiredLevel}
          />
          <p className={classes.AppealsP}>Заработать опыта всего</p>
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
              setExpEarned(e.target.value);
            }}
            value={expEarned}
          />
          <p className={classes.AppealsP}>Заработать опыта за неделю</p>
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
              setExpEarnedWeek(e.target.value);
            }}
            value={expEarnedWeek}
          />
        </div>
      </div>
    </div>
  );
};

export default NewLvl;
