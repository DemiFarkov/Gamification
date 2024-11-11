import React, { useEffect, useState } from "react";
import classes from "./creatingAchievements.module.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  selecetStyle,
  TextFieldStyle,
} from "../../../components/styles/styles";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Appeals from "./typeAchComponents/appeals";
import Tasks from "./typeAchComponents/tasks";
import Tests from "./typeAchComponents/Tests";
import NewLvl from "./typeAchComponents/newLvl";
import Chart from "./typeAchComponents/chart";
import Indicators from "./typeAchComponents/indicators";
import Avations from "./typeAchComponents/avations";
import Profile from "./typeAchComponents/profile";
import Store from "./typeAchComponents/store";
import Background from "./typeAchComponents/background";
import Rating from "./typeAchComponents/rating";
import News from "./typeAchComponents/news";
import KPI from "./typeAchComponents/KPI";
import Other from "./typeAchComponents/other";
import { useDispatch, useSelector } from "react-redux";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import {
  newTypeMainData,
  newTypeStyleData,
} from "../../../toolkitRedux/toolkitSlice";

const Column2 = (props) => {
  const {
    typeAchievements,
    setTypeAchievements,
    setUrlAvaPhoto,
    achData,
    setAchData,
    setFileImage,
    fileImage,
    setFileBackground,
    fileBackground,
    getFileFromFolder,
    collectBackgrounds,
    collectNonBackgrounds,
    setUrlItemPhoto,
  } = props;
  const newTypeStyleDataSelector = useSelector(
    (state) => state.auth.newTypeStyleData
  );
  console.log(typeAchievements);
  const MainDataSelector = useSelector((state) => state.auth.newTypeMainData);
  const dispatch = useDispatch();
  useEffect(() => {
    MainDataSelector.is_award && setTypeAchievements(0);
  }, [MainDataSelector.is_award]);
  useEffect(() => {
    dispatch(
      newTypeStyleData({
        ...newTypeStyleDataSelector,
        textColor: "#000000",
      })
    );
    return () => {
      document
        .querySelectorAll(`.${classes.titleCardColorPoint}`)
        .forEach((el, i) => el.removeEventListener("click", changeTitleColor));
    };
  }, []);
  console.log(MainDataSelector);
  function changeTitleColor(e) {
    dispatch(
      newTypeStyleData({
        ...newTypeStyleDataSelector,
        textColor: e.target.style.background,
      })
    );
  }
  function changeVisibleTitle() {
    let use = document.querySelector(`#visibleTitle`).checked;
    dispatch(newTypeMainData({ ...MainDataSelector, show_name: use }));
  }
  return (
    <div className={classes.column2}>
      <div className={classes.columnBlock}>
        <div style={{ position: "relative" }}>
          <h3>Название</h3>
          <div className={classes.titleCardColorWrapper}>
            <div
              className={classes.titleCardColorPoint}
              style={{ background: "#fff" }}
              onClick={(e) => {
                changeTitleColor(e);
              }}
            ></div>
            <div
              className={classes.titleCardColorPoint}
              style={{ background: "#000" }}
              onClick={(e) => {
                changeTitleColor(e);
              }}
            ></div>
            <div
              className={classes.titleCardColorPoint}
              style={{ background: "#c12348" }}
              onClick={(e) => {
                changeTitleColor(e);
              }}
            ></div>
            <div
              className={classes.titleCardColorPoint}
              style={{ background: "#1a2fa9" }}
              onClick={(e) => {
                changeTitleColor(e);
              }}
            ></div>
          </div>{" "}
          <input
            type="checkbox"
            id={"visibleTitle"}
            className={classes.mainCheckboxInputDls}
            checked={
              Object.values(MainDataSelector).length > 0
                ? MainDataSelector.show_name
                : false
            }
            onChange={(e) =>
              dispatch(
                newTypeMainData({
                  ...MainDataSelector,
                  show_name: e.target.checked,
                })
              )
            }
          />
          <label
            htmlFor={"visibleTitle"}
            className={classes.mainCheckboxLabelDls}
            style={{
              fontSize: "18px",
              position: "absolute",
              top: "0",
              left: "70%",
              padding: "0",
            }}
          >
            Не отображать
          </label>
        </div>
        <TextField
          fullWidth
          sx={{
            ...TextFieldStyle,
            margin: "1vw 0 0 0",
            "& input": {
              padding: "8px",
              fontSize: ".95vw",
            },
          }}
          focused
          value={
            Object.values(MainDataSelector).length > 0
              ? MainDataSelector.name
              : ""
          }
          onChange={(e) => {
            dispatch(
              newTypeMainData({
                ...MainDataSelector,
                name: e.target.value,
              })
            );
          }}
        />
      </div>
      <div className={classes.columnBlock} mainblock="true">
        {" "}
        <div style={{ position: "relative" }}>
          <h3>Шаблон</h3>
          <CancelRoundedIcon
            fontSize="large"
            sx={{
              fontSize: "30px",
              position: "absolute",
              top: "0",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              dispatch(
                newTypeMainData({
                  ...MainDataSelector,
                  back_image: undefined,
                })
              ),
                setUrlAvaPhoto("");
            }}
          />
        </div>
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          swipe={false}
          animation="slide"
          duration={1000}
          slider-wrapper
        >
          {collectBackgrounds.map((el, i) => (
            <div key={i} style={{ padding: "0 2vw" }}>
              <ItemPoint
                key={i}
                data={el}
                setFile={setFileBackground}
                setUrlPhoto={setUrlAvaPhoto}
                getFileFromFolder={getFileFromFolder}
                background={true}
                MainDataSelector={MainDataSelector}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={classes.columnBlock} mainblock="true">
        {" "}
        <div style={{ position: "relative" }}>
          <h3>Шаблон</h3>
          <CancelRoundedIcon
            fontSize="large"
            sx={{
              fontSize: "30px",
              position: "absolute",
              top: "0",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              setUrlItemPhoto("");
            }}
          />
        </div>
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          swipe={false}
          animation="slide"
          duration={1000}
          slider-wrapper
        >
          {collectNonBackgrounds.map((el, i) => (
            <div key={i} style={{ padding: "0 2vw" }}>
              <ItemPoint
                key={i}
                data={el}
                setFile={setFileBackground}
                setUrlPhoto={setUrlItemPhoto}
                getFileFromFolder={getFileFromFolder}
                background={false}
                MainDataSelector={MainDataSelector}

                // key={i}
                // data={el}
                // setFile={setFileBackground}
                // setUrlPhoto={setUrlAvaPhoto}
                // getFileFromFolder={getFileFromFolder}
                // background={true}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div id={"idfile1Wrapper"} className={classes.columnBlock}>
        <div className={classes.answerInputFileContainer}>
          <label htmlFor={"idfile"} className={classes.answerInputFileText}>
            Выберите файл
          </label>
          <div className={classes.answerInputFileName} id={"idfileColor"}>
            {fileBackground ? fileBackground.name : "Файл не выбран"}
          </div>

          <input
            id={"idfile1"}
            type="file"
            onChange={(e) => {
              setFileBackground(e.target.files[0]);
            }}
            className={classes.answerInputFile}
            accept="image/jpeg,image/png"
          />
          <fieldset className={classes.fieldset}>
            {" "}
            <legend className={classes.legend}>
              Добавить фоновое изображение
            </legend>
          </fieldset>
        </div>
        <div className={classes.answerInputFileContainer}>
          <label htmlFor={"idfile"} className={classes.answerInputFileText}>
            Выберите файл
          </label>
          <div className={classes.answerInputFileName} id={"idfileColor"}>
            {fileImage ? fileImage.name : "Файл не выбран"}
          </div>

          <input
            id={"idfile1"}
            type="file"
            onChange={(e) => {
              setFileImage(e.target.files[0]);
            }}
            className={classes.answerInputFile}
            accept="image/jpeg,image/png"
          />
          <fieldset className={classes.fieldset}>
            {" "}
            <legend className={classes.legend}>Добавить изображение</legend>
          </fieldset>
        </div>
      </div>
      <div className={classes.columnBlock}>
        <h3>Описание</h3>
        <TextField
          disabled={!MainDataSelector.is_double}
          fullWidth
          multiline
          sx={{
            ...TextFieldStyle,
            "& textarea": {
              padding: "0",
              fontSize: ".95vw",
            },
          }}
          value={
            Object.values(MainDataSelector).length > 0
              ? MainDataSelector.description
              : ""
          }
          focused
          label="Сзади"
          onChange={(e) => {
            e.target.value.length < 225 &&
              dispatch(
                newTypeMainData({
                  ...MainDataSelector,
                  description: e.target.value,
                })
              );
          }}
        />
      </div>
      <div className={classes.columnBlock}>
        <TextField
          fullWidth
          sx={{
            ...TextFieldStyle,
            margin: "1vw 0 0 0",
            "& input": {
              padding: "8px",
              fontSize: ".95vw",
            },
          }}
          label="A-coin-ов за достижение..."
          focused
          value={
            Object.values(MainDataSelector).length > 0
              ? MainDataSelector.reward_currency
              : ""
          }
          onChange={(e) => {
            dispatch(
              newTypeMainData({
                ...MainDataSelector,
                reward_currency: e.target.value,
              })
            );
          }}
          type="number"
        />

        <TextField
          fullWidth
          sx={{
            ...TextFieldStyle,
            "& textarea": {
              padding: "0",
              fontSize: ".95vw",
            },
          }}
          type="number"
          focused
          label="Опыт за достижение..."
          onChange={(e) => {
            dispatch(
              newTypeMainData({
                ...MainDataSelector,
                reward_experience: e.target.value,
              })
            );
          }}
          value={
            Object.values(MainDataSelector).length > 0
              ? MainDataSelector.reward_experience
              : ""
          }
        />
      </div>
      <div className={classes.columnBlock}>
        <h3>Тип достижения</h3>
        <Select
          id="valueThemeSelect"
          sx={selecetStyle}
          value={typeAchievements}
          onChange={(e) => {
            setTypeAchievements(e.target.value);
          }}
          disabled={
            Object.values(MainDataSelector).length > 0
              ? MainDataSelector.is_award
              : true
          }
        >
          {" "}
          <MenuItem value={0}>Не выбрано</MenuItem>
          <MenuItem value={1}>Обращения</MenuItem>
          <MenuItem value={2}>Задания</MenuItem>{" "}
          <MenuItem value={3}>Новый уровень, опыт</MenuItem>
          <MenuItem value={4}>График</MenuItem>{" "}
          <MenuItem value={5}>Тесты</MenuItem>
          <MenuItem value={6}>Показатели</MenuItem>{" "}
          <MenuItem value={7}>Комплименты</MenuItem>
          <MenuItem value={8}>Профиль</MenuItem>
          <MenuItem value={9}>Инвентарь/магазин</MenuItem>
          <MenuItem value={10}>Фоны/аватарки</MenuItem>
          <MenuItem value={11}>Рейтинг</MenuItem>
          <MenuItem value={12}>Лента новостей</MenuItem>
          <MenuItem value={13}>KPI</MenuItem>
          <MenuItem value={14}>Другое</MenuItem>
          {/* {allRole.map((el, i) => (
                  <MenuItem key={i} value={el.id}>
                    {el.name}
                  </MenuItem>
                ))} */}
        </Select>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", marginTop: "15px" }}
        >
          <Typography>Достижение</Typography>
          <Switch
            checked={
              Object.values(MainDataSelector).length > 0
                ? MainDataSelector.is_award
                : false
            }
            onChange={(event) => {
              dispatch(
                newTypeMainData({
                  ...MainDataSelector,
                  is_award: event.target.checked,
                })
              );
            }}
            sx={{
              "&.MuiSwitch-root": { width: "80px" },
              "& .MuiButtonBase-root": { top: "-5px" },
              "& .MuiSwitch-thumb": {
                width: "30px",
                height: "30px",
                color: "#464f9c",
                position: "relative",
                "&::before": {
                  content: `"<-"`,
                  transform: "rotate(0deg)",
                  transition: "all 150ms linear",
                  width: "100%",
                  height: "100%",
                  color: "#fff",
                  fontSize: "18px",
                  display: "block",
                  position: "absolute",
                },
              },
              "&.MuiSwitch-root > .Mui-checked": {
                transform: "translateX(35px)",
                color: "#469C9A",
              },
              "&.MuiSwitch-root > .Mui-checked > .MuiSwitch-thumb": {
                color: "#469C9A",
                "&::before": {
                  content: `"<-"`,
                  transform: "rotate(180deg)",
                  transition: "all 150ms linear",
                  width: "100%",
                  height: "100%",
                  color: "#fff",
                  fontSize: "18px",
                  display: "block",
                  position: "absolute",
                },

                // backgroundImage:"url(https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65fbd27490075c6f4ed9f27b_65fbd2aaaf39086e3b64d3d7/scale_1200)",
              },

              "&.MuiSwitch-root > .MuiSwitch-track": {
                backgroundColor: "#469C9A",
              },
            }}
          />
          <Typography>Награда</Typography>
        </Stack>
      </div>
      {typeAchievements == 1 && (
        <Appeals achData={achData} setAchData={setAchData} />
      )}
      {typeAchievements == 2 && <Tasks />}
      {typeAchievements == 3 && <NewLvl />}
      {typeAchievements == 4 && <Chart />}
      {typeAchievements == 5 && <Tests />}
      {typeAchievements == 6 && <Indicators />}
      {typeAchievements == 7 && <Avations />}
      {typeAchievements == 8 && <Profile />}
      {typeAchievements == 9 && <Store />}
      {typeAchievements == 10 && <Background />}
      {typeAchievements == 11 && <Rating />}{" "}
      {typeAchievements == 12 && <News />}
      {typeAchievements == 13 && <KPI />}
      {typeAchievements == 14 && <Other />}
    </div>
  );
};

export default Column2;

const ItemPoint = (props) => {
  const { MainDataSelector, setUrlPhoto } = props;
  const dispatch = useDispatch();

  function chooseTemplate(e, el) {
    props.setUrlPhoto({ url: e.target.src, id: el.id });
    props.setFile(null);
    // let cardBackImage = document.querySelector(`.${classes.cardBack}`).style;

    el.back_image !== null
      ? (dispatch(
          newTypeMainData({
            ...MainDataSelector,
            back_image: el.back_image,
            background_image: null,
          })
        ),
        setUrlPhoto({ url: el.image, id: el.id }))
      : dispatch(
          newTypeMainData({
            ...MainDataSelector,
            back_image: `none`,
            foreground_image: null,
          })
        );
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {props.data.map((el, i) => (
        <img
          key={i}
          src={el.image}
          alt="Х"
          className={classes.avaImg}
          onClick={(e) => {
            chooseTemplate(e, el);
          }}
        />
      ))}
    </div>
  );
};
