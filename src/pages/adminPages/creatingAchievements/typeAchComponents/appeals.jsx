import React, { useEffect, useState } from "react";
import classes from "../creatingAchievements.module.css";
import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import {
  AutocompleteStyle,
  selecetStyle,
  TextFieldStyle,
} from "../../../../components/styles/styles";
import { useDispatch } from "react-redux";
import { typeAchData } from "../../../../toolkitRedux/toolkitSlice";
import { instance } from "../../../../utils/axios";

const Appeals = (props) => {
  const { achData, setAchData } = props;
  const [complexityAch, setСomplexityAch] = useState(0);
  const [selectListExp, setSelectListExp] = useState([]);

  const [requiredRequestsCount, setRequiredRequestsCount] = useState("");
  const [isMassive, setIsMassive] = useState(false);

  const [experienceRequset, setEperienceRequset] =
    useState("Не запускается 1С");
  const dispatch = useDispatch();
  useEffect(() => {
    let ids = [];
    let type_specific_data = {};
    requiredRequestsCount &&
      (type_specific_data.required_requests_count = requiredRequestsCount);
    isMassive && (type_specific_data.is_massive = isMassive);
    ids.length > 0 && (type_specific_data.classification_ids = ids);
    getData();
    if (Array.isArray(experienceRequset)) {
      experienceRequset.map((el) => ids.push(el.id));
      dispatch(
        typeAchData({
          complexityAch: complexityAch,
          type_specific_data: type_specific_data,
        })
      );
    }
  }, [requiredRequestsCount, isMassive, experienceRequset]);
  async function getData() {
    await instance.get(`classifications/leaf_nodes/`).then((response) => {
      setSelectListExp(
        response.data.sort((a, b) => {
          if (a.parent === null) return 1;
          if (b.parent === null) return -1;
          return a.parent - b.parent;
        })
      );
    });
  }
  return (
    <div className={classes.columnBlock}>
      <h3 className={classes.titleMinPlock}>Обращения</h3>
      <div className={classes.AppealsBlock}>
        <div>
          <p className={classes.AppealsP}>Массовость</p>
          <Select
            id="valueThemeSelect"
            sx={{ ...selecetStyle, marginTop: "0" }}
            value={isMassive}
            onChange={(e) => {
              setIsMassive(e.target.value);
            }}
          >
            {" "}
            <MenuItem value={false}>Обычное</MenuItem>
            <MenuItem value={true}>Массовое</MenuItem>
          </Select>
          <div style={{ position: "relative" }}>
            {" "}
            <input
              type="checkbox"
              id={"idCheckAppeals1"}
              className={classes.mainCheckboxInputDls}
              //   onChange={(e) => checkboxChange(i, e)}
              // disabled
            />
            <label
              htmlFor={"idCheckAppeals1"}
              className={classes.mainCheckboxLabelDls}
            >
              Оператор = ответственный
            </label>
          </div>
          <div style={{ position: "relative" }}>
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
              setСomplexityAch(e.target.value)
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
          <p className={classes.AppealsP}>классификация обращения</p>
          <Autocomplete
            sx={{
              ...AutocompleteStyle,
              "& .MuiFormControl-root": {
                margin: " 0  !important",
              },
              "& .MuiInputBase-root ": {
                padding: "0 32px 0 0   !important",
              },
            }}
            multiple
            options={selectListExp}
            groupBy={(option) => option.parentName}
            defaultValue={selectListExp[0]}
            getOptionLabel={(option) => option.name || ""}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.name}
              </Box>
            )}
            onChange={(event, newValue) => {
              setEperienceRequset(newValue);
            }}
            // value={experienceRequset}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  ...TextFieldStyle,
                  "& .MuiAutocomplete-input": {
                    padding: " 8px 32px 8px 8px  !important",
                  },
                }}
                placeholder="Добавить"
              />
            )}

            // sx={{
            //   transition: "all 1s linear",
            //   borderRadius: "10px",
            //   marginTop: "1vw",
            //   "& .MuiOutlinedInput-root": { padding: "0" },
            //   "& .MuiFormControl-root": {
            //     marginTop: "0",
            //     marginBottom: "0",
            //   },
            // }}
          />

          <p className={classes.AppealsP}>К-во закрытых</p>
          <TextField
            fullWidth
            type="number"
            sx={{
              ...TextFieldStyle,
              marginTop: "0",
            }}
            onChange={(e) => {
              setRequiredRequestsCount(e.target.value);
            }}
            value={requiredRequestsCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Appeals;
