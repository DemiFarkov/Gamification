import React, { useEffect, useRef, useState } from "react";
import classes from "./achievementCard.module.css";

import Tilt from "react-parallax-tilt";
import CurrencyBitcoinRoundedIcon from "@mui/icons-material/CurrencyBitcoinRounded";

import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import gsap from "https://cdn.skypack.dev/gsap@3.12.0";

const AchievementCard = (props) => {
  const {
    fileBackground,

    MainDataSelector,
    typeAchData,
    newTypeStyleDataSelector,
    valueOldAchievements,
    small,
  } = props;
  const [borderStyle, setBorderStyle] = useState({});
  const backPhoto = useRef(undefined);
  const frontPhoto = useRef(undefined);
  const cardInnerRef = useRef(undefined);
  const cardBackRef = useRef(undefined);
  const assetsRef = useRef(undefined);
  const cardDemoContentRef = useRef(undefined);

  const fontSizeValue = small ? 0 : MainDataSelector.name > 27 ? 14 : 18;
  const cardBack = MainDataSelector.is_double;
  const urlItemPhoto = MainDataSelector.urlItemPhoto;
  const urlAvaPhoto = MainDataSelector.urlAvaPhoto;
  console.log(backPhoto.current);
  useEffect(() => {
    if (small) {
      {
        frontPhoto.current && (frontPhoto.current.style.objectPosition = "0 0");
        frontPhoto.current && (frontPhoto.current.style.translate = "0 0");
        document.querySelectorAll(`.${classes.cardDemo}`).forEach((e) => {
          (e.style.height = "108px"), (e.style.width = "81px");
        });
        document.querySelectorAll(`.${classes.cardFront}`).forEach((e) => {
          (e.style.height = "108px"), (e.style.width = "81px");
        });
        document.querySelectorAll(`.${classes.article}`).forEach((e) => {
          (e.style.height = "108px"), (e.style.width = "81px");
        });

        // cardDemo.height = "108px";
        // cardDemo.width = "81px";
        cardInnerRef.current.style.height = "108px";
        cardInnerRef.current.style.width = "81px";
        // let cardFront = document.querySelector(`.${classes.cardFront}`).style;
        // cardFront.height = "108px";
        // cardFront.width = "81px";
        // let article = document.querySelector(`.${classes.article}`).style;

        // article.height = "108px";
        // article.width = "81px";
      }
    }
  }, []);
  // Двжение изображения
  const UPDATE = ({ x, y }) => {
    gsap.set(assetsRef.current, {
      "--x": gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
      "--y": gsap.utils.mapRange(0, window.innerHeight, -1, 1, y),
    });
  };

  useEffect(() => {
    if (newTypeStyleDataSelector.use_border && !small) {
      setBorderStyle({
        outline: `${
          newTypeStyleDataSelector.border_width +
          "px " +
          newTypeStyleDataSelector.border_color +
          " " +
          newTypeStyleDataSelector.border_style
        }`,
      });
    } else {
      setBorderStyle({ outline: `${"none"}` });
    }
  }, [newTypeStyleDataSelector]);
  useEffect(() => {
    const cardDemo = cardDemoContentRef.current;
    cardDemo.addEventListener("mousemove", UPDATE);
    backPhoto.current &&
      MainDataSelector.background_image &&
      (backPhoto.current.src = MainDataSelector.background_image);
    frontPhoto.current &&
      MainDataSelector.foreground_image &&
      (frontPhoto.current.src = MainDataSelector.foreground_image);
    MainDataSelector.back_image &&
      ((cardBackRef.current.style.backgroundImage = `url("${MainDataSelector.back_image}")`),
      (document.querySelector(`.${classes.cardBack}`).style.boxShadow =
        "none"));
    !MainDataSelector.back_image &&
      ((cardBackRef.current.style.backgroundImage = ``),
      (document.querySelector(`.${classes.cardBack}`).style.boxShadow =
        "inset 0px 0px 200px rgb(0 0 0 / 83%)"));
    return () => {
      cardDemo.removeEventListener("mousemove", UPDATE);
    };
  }, [MainDataSelector]);
  useEffect(() => {
    !cardBack &&
      (document.querySelector(
        `.${classes.cardInner}`
      ).style.transform = `rotateY(0deg)`);
  }, [cardBack]);
  function rotateCard(deg) {
    cardInnerRef.current.style.transform = `rotateY(${deg}deg)`;
  }
  const cardBackground =
    typeAchData &&
    (typeAchData.complexityAch == 0
      ? { background: "#cd7f32 " }
      : typeAchData.complexityAch == 1
      ? { background: "#A8A4A4" }
      : typeAchData.complexityAch == 2
      ? { background: "#ffd60a" }
      : typeAchData.complexityAch == 3
      ? { background: "#b7c8d9" }
      : {});
  // Использование данных существующего шаблона
  useEffect(() => {
    if (Object.keys(newTypeStyleDataSelector).length !== 0) {
      // document.querySelector(`#addBorder`).checked =
      //   newTypeStyleDataSelector.use_border;
      // setTypeBorderCard(newTypeStyleDataSelector.border_style);
      // setWidthBorderCard(newTypeStyleDataSelector.border_width);
      // setColor({ ...color, hex: newTypeStyleDataSelector.border_color });
    }
    if (Object.keys(MainDataSelector).length !== 0) {
      // setСardBack(MainDataSelector.is_double);
      if (backPhoto.current && frontPhoto.current) {
        backPhoto.current.src = MainDataSelector.background_image;
        frontPhoto.current.src = MainDataSelector.foreground_image;
      }
    }
  }, [valueOldAchievements]);
  return (
    <div className={classes.cardDemo}>
      <Tilt tiltReverse={false} tiltMaxAngleX={7} tiltMaxAngleY={7}>
        <div className={classes.cardInner} ref={cardInnerRef}>
          <div className={classes.cardFront}>
            <div
              className={classes.cardDemoContent}
              ref={cardDemoContentRef}
              style={{
                ...cardBackground,
                ...borderStyle,
              }}
            >
              <article className={classes.article}>
                <div className={classes.assets} ref={assetsRef}>
                  {(urlItemPhoto || MainDataSelector.foreground_image) && (
                    <img
                      className={classes.cardImgFront}
                      ref={frontPhoto}
                      src={urlItemPhoto && urlItemPhoto}
                      // https://avatars.mds.yandex.net/i?id=96e356caf917ef8eea0524b2fc12f1d1_l-6249527-images-thumbs&n=13
                      alt="Фото предмета"
                    />
                  )}
                  {(urlAvaPhoto || MainDataSelector.background_image) && (
                    <img
                      className={classes.cardImgBack}
                      ref={backPhoto}
                      src={urlAvaPhoto && urlAvaPhoto}
                      // https://assets.codepen.io/605876/do-not-copy-osaka-tower.png
                      alt="Фото фона"
                    />
                  )}
                  {/* <PrintRoundedIcon className={classes.cardItem} /> */}
                </div>
              </article>
              {/* <img src={urlAvaPhoto} alt="" /> */}
              {cardBack && !small && (
                <ReplyRoundedIcon
                  className={classes.rotateCard}
                  onClick={() => {
                    rotateCard(180);
                  }}
                />
              )}{" "}
              {!MainDataSelector.show_name && (
                <TextField
                  multiline
                  value={MainDataSelector.name}
                  inputProps={{ readOnly: true }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  sx={{
                    position: "absolute",
                    top: "0%",
                    left: "0",
                    width: "100%",
                    zIndex: "2",

                    cursor: "default",
                    "& div": {
                      cursor: "default",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                    "& .MuiInputBase-root": {
                      padding: small && "0",
                    },
                    "& .MuiInputBase-input": {
                      cursor: "default",
                      fontSize: fontSizeValue,
                      color: newTypeStyleDataSelector.textColor
                        ? newTypeStyleDataSelector.textColor
                        : "#fff !important",
                      textAlign: "center !important",
                      fontFamily: '"Tektur", "Arkial", sayns-serif',
                    },
                  }}
                />
              )}
            </div>
          </div>
          {!small && (
            <div
              className={classes.cardBack}
              ref={cardBackRef}
              style={{
                ...cardBackground,
                ...borderStyle,
              }}
            >
              {cardBack && (
                <ReplyRoundedIcon
                  className={classes.rotateCard}
                  onClick={() => {
                    rotateCard(0);
                  }}
                />
              )}
              <p className={classes.date}>03.05.2001</p>
              <TextField
                multiline
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                value={MainDataSelector.description}
                inputProps={{
                  readOnly: true,
                }}
                sx={{
                  position: "absolute",
                  top: "15%",
                  left: "10%",
                  width: "80%",
                  zIndex: "2",
                  borderTop: "1px #fff solid",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none !important",
                  },
                  "& div": {
                    cursor: "default",
                  },
                  "& .MuiInputBase-input": {
                    fontSize: fontSizeValue,
                    color: newTypeStyleDataSelector.textColor
                      ? newTypeStyleDataSelector.textColor
                      : "#fff !important",
                    textAlign: "center !important",
                    cursor: "default",

                    userSelect: "none",
                    fontFamily: '"Tektur", "Arkial", sayns-serif',
                  },
                }}
              />
              <div className={classes.resursesCard}>
                <span>
                  {" "}
                  <span style={{ color: "blue" }}>exp:</span>{" "}
                  {MainDataSelector.reward_experience}
                </span>
                <span style={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <CurrencyBitcoinRoundedIcon
                    sx={{ fontSize: "30px", color: "yellow" }}
                  />
                  : {MainDataSelector.reward_currency}
                </span>
              </div>
            </div>
          )}
        </div>
      </Tilt>
    </div>
  );
};

export default AchievementCard;
