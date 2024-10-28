import React, { useState } from "react";
import classes from "./moderationAvation.module.css";
import {
  Button,
  colors,
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { instance } from "../../../utils/axios";

import { Slider, SliderValueLabel } from "../../../components/range";
import { getGroupsAuth } from "../../../hooks/reduxHooks";
import Not from "../../404Page/not";

const AvationBlock = (props) => {
  const group = getGroupsAuth();

  const { type, idInput, data, idblock } = props;
  const [carmaValue, setCarmaValue] = useState(2);
  const [commentaryValue, setCommentaryValue] = useState("");
  const [customKarma, setCustomKarma] = useState("");
  const [karmaLvl, setkarmaLvl] = useState();
  console.log(commentaryValue);
  const [customKarmaDisable, setCustomKarmaDisable] = useState(true);
  const textFieldStyle = {
    width: "100%",
    borderRadius: "3vw",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #fff ",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
        border: "1px solid #fff !important",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#fff !important",
    },
    "& .MuiInputLabel-root:focused": {
      color: "#fff ",
    },
    "& .MuiInputBase-root-MuiOutlinedInput-root.": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": { color: "#fff" },
    "& .MuiOutlinedInput-root:hover": {
      color: "#fff",
      "& > fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiOutlinedInput-root:active": {
      color: "#fff",
      "& > fieldset": {
        borderColor: "#fff",
      },
    },
  };
  const inputStyle = {
    "& label": {
      color: "#fff !important",
    },
    "& input": {
      color: "#fff !important",
      "-webkit-text-fill-color": "#fff !important",
    },
    "& .MuiOutlinedInput-root:hover": {
      color: "#fff",
      "& > fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiOutlinedInput-root:active": {
      color: "#fff",
      "& > fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& > fieldset": {
        borderColor: "#fff !important",
      },
    },
    "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
      {
        borderColor: "#a3a3a3 !important",
      },
  };
  function sendData(approve) {
    let dataFotQuery;
    console.log(customKarmaDisable);
    if (customKarmaDisable) {
      dataFotQuery = {
        action: approve ? "approve" : "reject",
        level: carmaValue,
        moderation_comment: commentaryValue,
      };
    } else {
      dataFotQuery = {
        action: approve ? "approve" : "reject",
        karma_change: Number(customKarma),
        moderation_comment: commentaryValue,
      };
    }
    console.log(dataFotQuery);
    if (dataFotQuery.moderation_comment !== null) {
      instance
        .post(`moderate_feedback/${data.id}/`, dataFotQuery)
        .then(function (response) {
          console.log(response);
          document.querySelector(`#${idblock}`).remove();
        })
        .catch(function (response) {
          console.log(response);
        });
    } else {
      console.log("HELP");
    }
  }
  return (
    <div className={classes.avationBlock} id={idblock}>
      {group == "Администраторы" ? (
        <>
          <h4 className={classes.H4}>
            {type == "report" ? "Жалоба на " : "Комплимент для "}{" "}
            {data.target_employee.full_name}
          </h4>
          <TextField
            sx={textFieldStyle}
            multiline
            InputProps={{
              readOnly: true,
              value: data.text,
            }}
          />
          <div className={classes.changeCarmaWrapper}>
            <p className={classes.pChangeKarma}>
              Выберите уровень изменения кармы
            </p>{" "}
            <Slider
              defaultValue={2}
              // getAriaValueText={carmaValue}
              step={1}
              marks
              min={0}
              max={3}
              aria-label="Temperature"
              slots={{ valueLabel: SliderValueLabel }}
              onChange={(e) => {
                setCarmaValue(e.target.value);
              }}
              sx={{ width: "40%" }}
            />
          </div>
          <div className={classes.customChangeKarmaWrapper}>
            <input
              type="checkbox"
              id={idInput}
              className={classes.mainCheckboxInputDls}
              onChange={() => {
                setCustomKarmaDisable(!customKarmaDisable);
              }}
            />
            <label htmlFor={idInput} className={classes.mainCheckboxLabelDls}>
              Изменить количество вручную
            </label>
            <FormControl sx={inputStyle}>
              <InputLabel htmlFor="karmaInput">Карма</InputLabel>
              <OutlinedInput
                type="number"
                label="Карма"
                id="karmaInput"
                disabled={customKarmaDisable ? true : false}
                value={customKarma}
                onChange={(event) => {
                  setCustomKarma(event.target.value);
                }}
              />
            </FormControl>
          </div>
          <TextField
            multiline
            value={commentaryValue}
            onChange={(e) => {
              setCommentaryValue(e.target.value);
            }}
            label="Укажите комментарий"
            sx={textFieldStyle}
          />
          <div className={classes.actionWrapper}>
            <Button
              className={classes.button}
              onClick={() => {
                sendData(false);
              }}
            >
              Отклонить
            </Button>{" "}
            <Button
              className={classes.button}
              onClick={() => {
                sendData(true);
              }}
            >
              Подтвердить
            </Button>
          </div>
        </>
      ) : (
<Not />      )}
    </div>
  );
};

export default AvationBlock;
