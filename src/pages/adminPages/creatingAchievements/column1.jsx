import React, { useEffect, useRef, useState } from "react";
import classes from "./creatingAchievements.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import {
  selecetStyle,
  TextFieldStyle,
} from "../../../components/styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { ColorPicker, useColor } from "react-color-palette";

import "react-color-palette/css";
import {
  backSideCard,
  typeAchData,
  newTypeMainData,
  newTypeStyleData,
} from "../../../toolkitRedux/toolkitSlice";
import AchievementCard from "../../../components/achievementCard/achievementCard";
const Column1 = (props) => {
  const {
    valueOldAchievements,
    setValueOldAchievements,
    nameAchievements,
    urlAvaPhoto,
    urlItemPhoto,
    achData,
    oldAchievements,
    fileBackground,
    fileImage,
  } = props;
  const backSideCardSelector = useSelector((state) => state.auth.backSideCard);
  const typeAchDataSelector = useSelector((state) => state.auth.typeAchData);

  const newTypeStyleDataSelector = useSelector(
    (state) => state.auth.newTypeStyleData
  );
  const MainDataSelector = useSelector((state) => state.auth.newTypeMainData);

  const [typeBorderCard, setTypeBorderCard] = useState("solid");
  const [widthBorderCard, setWidthBorderCard] = useState(1);
  const [color, setColor] = useColor("");
  const dispatch = useDispatch();

  function changeData(id) {
    let data;
    oldAchievements.map((el) => id == el.id && (data = el));
    let mainData = data;
    dispatch(newTypeStyleData(data.styleCard));
    dispatch(typeAchData(data.typeAchContent));
    dispatch(newTypeMainData(mainData));

    setValueOldAchievements(id);
  }
   function changeBackSide() {
    let use = document.querySelector(`#addBackSide`).checked;
    dispatch(newTypeMainData({ ...MainDataSelector, is_double: use }));

  }
  function changeBorder() {
    let use = document.querySelector(`#addBorder`).checked;
    dispatch(
      newTypeStyleData({ ...newTypeStyleDataSelector, use_border: use })
    );
  }
  // Изменение изображения фона
  // useEffect(() => {
  //   if (backPhoto.current && fileBackground !== null) {
  //     const file = fileBackground;
  //     console.log(fileBackground);

  //     const readerBack = new FileReader();
  //     readerBack.onloadend = () => {
  //       backPhoto.current.src = readerBack.result;
  //     };

  //     readerBack.readAsDataURL(file);
  //   }
  // }, [fileBackground]);
  // Изменение изображения объекта

  useEffect(() => {
    if (fileImage && fileImage !== null) {
      const file = fileImage;
      let f;
      const readerFront = new FileReader();
      readerFront.onloadend = () => {
        f = readerFront.result;
      };
      // dispatch(newTypeMainData({ ...MainDataSelector, is_double: cardBack }));

      readerFront.readAsDataURL(file);
    }
  }, [fileImage]);

  useEffect(() => {
    dispatch(
      newTypeStyleData({
        ...newTypeStyleDataSelector,
        border_color: color.hex,
        border_style: typeBorderCard,
        border_width: widthBorderCard,
        use_border: document.querySelector(`#addBorder`).checked,
      })
    );
  }, [color, typeBorderCard, widthBorderCard]);

  return (
    <div className={classes.column1}>
      <div className={classes.columnBlock}>
        <h3>Выбрать существующее</h3>
        <Select
          id="valueThemeSelect"
          sx={selecetStyle}
          value={valueOldAchievements}
          onChange={(e) => {
            changeData(e.target.value);
          }}
        >
          {" "}
          <MenuItem value={0}>Создать новое</MenuItem>
          {oldAchievements &&
            oldAchievements.map((el, i) => (
              <MenuItem key={i} value={el.id}>
                {el.name}
              </MenuItem>
            ))}
        </Select>
      </div>
      <AchievementCard
        // fileImage={fileImage}
        // urlItemPhoto={urlItemPhoto}
        // fileBackground={fileBackground}
        // urlAvaPhoto={urlAvaPhoto}
        // nameAchievements={nameAchievements}
        MainDataSelector={MainDataSelector}
        typeAchDataSelector={typeAchDataSelector}
        newTypeStyleDataSelector={newTypeStyleDataSelector}
        valueOldAchievements={valueOldAchievements}
      />
      <div className={classes.columnBlock}>
        <div style={{ position: "relative" }}>
          {" "}
          <input
            type="checkbox"
            id={"addBorder"}
            className={classes.mainCheckboxInputDls}
            onChange={() => changeBorder()}
            // disabled
          />
          <label
            htmlFor={"addBorder"}
            className={classes.mainCheckboxLabelDls}
            style={{ fontSize: "18px" }}
          >
            Добавить рамку
          </label>
          <input
            type="checkbox"
            id={"addBackSide"}
            className={classes.mainCheckboxInputDls}
            onChange={(e) => changeBackSide()}
            // disabled
          />
          <label
            htmlFor={"addBackSide"}
            className={classes.mainCheckboxLabelDls}
            style={{ fontSize: "18px" }}
          >
            Добавить 2-ю сторону
          </label>
          <Select
            id="valueThemeSelect"
            sx={selecetStyle}
            value={typeBorderCard}
            onChange={(e) => {
              setTypeBorderCard(e.target.value);
            }}
          >
            {" "}
            <MenuItem value={"solid"}>Сплошлая</MenuItem>
            <MenuItem value={"dashed"}>Пунктирная</MenuItem>
            <MenuItem value={"dotted"}>Точки</MenuItem>
            <MenuItem value={"double"}>Двойная</MenuItem>
            <MenuItem value={"groove "}>Грув</MenuItem>
            <MenuItem value={"ridge"}>Ридж</MenuItem>
          </Select>
          <TextField
            fullWidth
            sx={{
              ...TextFieldStyle,
              margin: "1vw 0 1vw 0",
              "& input": {
                padding: "8px",
                fontSize: ".95vw",
              },
            }}
            focused
            type="number"
            label="Толщина"
            onChange={(e) => {
              e.target.value < 21 && setWidthBorderCard(e.target.value);
            }}
            value={widthBorderCard}
          />
          <ColorPicker color={color} onChange={setColor} />
        </div>
      </div>
    </div>
  );
};

export default Column1;
