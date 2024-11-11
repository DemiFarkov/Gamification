import React, { useEffect, useState } from "react";
import classes from "../creatingAchievements.module.css";
import {
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  selecetStyle,
  TextFieldStyle,
} from "../../../../components/styles/styles";
import { useDispatch } from "react-redux";
import { typeAchData } from "../../../../toolkitRedux/toolkitSlice";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

import Fade from "@mui/material/Fade";

const Tests = () => {
  const [complexityAch, setСomplexityAch] = useState(0);
  const [forTests, setForTests] = useState(false);
  const [totalTestsRequired, setTotalTestsRequired] = useState("");
  const [successfulTestsRequired, setSuccessfulTestsRequired] = useState("");
  const [perfectScoreTestsRequired, setPerfectScoreTestsRequired] =
    useState("");
  const [moderationTestsRequired, setModerationTestsRequired] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    let type_specific_data = {};
    totalTestsRequired &&
      (type_specific_data.total_tests_required = totalTestsRequired);
    successfulTestsRequired &&
      (type_specific_data.successful_tests_required = successfulTestsRequired);
    perfectScoreTestsRequired &&
      (type_specific_data.perfect_score_tests_required =
        perfectScoreTestsRequired);
    moderationTestsRequired &&
      (type_specific_data.streak_days_required = moderationTestsRequired);

    dispatch(
      typeAchData({
        difficulty: complexityAch,
        type_specific_data: type_specific_data,
      })
    );
  }, [
    totalTestsRequired,
    successfulTestsRequired,
    perfectScoreTestsRequired,
    moderationTestsRequired,
  ]);
  return (
    <div className={classes.columnBlock}>
      <h3 className={classes.titleMinBlock}>
        <div>Обращения</div>
        <Tooltip
          PopperProps={{
            sx: {
              " .MuiTooltip-tooltipPlacementBottom": {
                fontSize: "18px !important",
                maxWidth: "500px",
              },
            },
          }}
          arrow
          TransitionComponent={Fade}
          title="Чтобы условие не учитывалось, поле необходимо оставить полностью пустым"
          sx={{
            color: "#fff",
            fontSize: "20px !important",
          }}
        >
          <IconButton>
            <HelpRoundedIcon />
          </IconButton>
        </Tooltip>
      </h3>
      <div className={classes.AppealsBlock}>
        <div>
          <div style={{ position: "relative", marginTop: "32px" }}>
            {" "}
            <input
              type="checkbox"
              id={"idCheckTests"}
              className={classes.mainCheckboxInputDls}
              //   onChange={(e) => checkboxChange(i, e)}
              // disabled
            />
            <label
              htmlFor={"idCheckTests"}
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
          <div style={{ position: "relative", marginTop: "32px" }}>
            {" "}
            <input
              type="checkbox"
              id={"idCheckTests2"}
              className={classes.mainCheckboxInputDls}
              onChange={(e) => setForTests(e.target.checked)}
              // disabled
            />
            <label
              htmlFor={"idCheckTests2"}
              className={classes.mainCheckboxLabelDls}
            >
              Достижение для тестов
            </label>
          </div>
        </div>
        <div>
          <p className={classes.AppealsP}>Выполнено тестов всего</p>
          <TextField
            fullWidth
            type="number"
            disabled={forTests}
            sx={{
              ...TextFieldStyle,
              marginTop: "0",
            }}
            onChange={(e) => {
              setTotalTestsRequired(e.target.value);
            }}
            value={totalTestsRequired}
          />
          <p className={classes.AppealsP}>Выполнено тестов успешно</p>
          <TextField
            fullWidth
            type="number"
            disabled={forTests}
            sx={{
              ...TextFieldStyle,
              marginTop: "0",
            }}
            onChange={(e) => {
              setSuccessfulTestsRequired(e.target.value);
            }}
            value={successfulTestsRequired}
          />
          <p className={classes.AppealsP}>Выполнено тестов на 100%</p>
          <TextField
            fullWidth
            type="number"
            disabled={forTests}
            sx={{
              ...TextFieldStyle,
              marginTop: "0",
            }}
            onChange={(e) => {
              setPerfectScoreTestsRequired(e.target.value);
            }}
            value={perfectScoreTestsRequired}
          />
          <p className={classes.AppealsP}>Выполнено модераций тестов</p>
          <TextField
            fullWidth
            type="number"
            disabled={forTests}
            sx={{
              ...TextFieldStyle,
              marginTop: "0",
            }}
            onChange={(e) => {
              setModerationTestsRequired(e.target.value);
            }}
            value={moderationTestsRequired}
          />
        </div>
      </div>
    </div>
  );
};

export default Tests;
