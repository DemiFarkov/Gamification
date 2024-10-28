import React, { useEffect, useState } from "react";
import classes from "../creatingAchievements.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import {
  selecetStyle,
  TextFieldStyle,
} from "../../../../components/styles/styles";
import { useDispatch } from "react-redux";
import { typeAchData } from "../../../../toolkitRedux/toolkitSlice";

const Other = () => {
  const [complexityAch, setСomplexityAch] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(typeAchData({ complexityAch: complexityAch }));
    // setAchData({ mainData: {}, typeAchData: { complexityAch: complexityAch } });
  }, []);
  return (
    <div className={classes.columnBlock}>
      <h3 className={classes.titleMinPlock}>Комплименты</h3>
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
          <TextField
            active
            fullWidth
            multiline
            sx={{
              ...TextFieldStyle,
              marginTop: "0",
            }}
            focused
            label="Введите число, которое должно быть меньше этого показателя..."
            //   onChange={(e) => {
            //     setNameAchievements(e.target.value);
            //   }}
            //   value={nameAchievements}
          />
          <TextField
            active
            fullWidth
            multiline
            sx={{
              ...TextFieldStyle,
              marginTop: "0",
            }}
            focused
            label="Введите число, которое должно быть меньше этого показателя..."
            //   onChange={(e) => {
            //     setNameAchievements(e.target.value);
            //   }}
            //   value={nameAchievements}
          />
          <TextField
            active
            fullWidth
            multiline
            sx={{
              ...TextFieldStyle,
              marginTop: "0",
            }}
            focused
            label="Введите к-во принятых звонков..."
            //   onChange={(e) => {
            //     setNameAchievements(e.target.value);
            //   }}
            //   value={nameAchievements}
          />
        </div>
      </div>
    </div>
  );
};

export default Other;
