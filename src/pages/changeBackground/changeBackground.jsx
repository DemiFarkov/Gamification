import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import CarouselPageBackground from "./CarouselPageBackground";
import classes from "./changeBackground.module.css";
import Background from "../../components/general/backgrounds/rotatingSquares/background";
import blurredСircles2 from "../../img/backgroundsData/blurredСircles2.gif";
import fleeingParticles from "../../img/backgroundsData/fleeingParticles.gif";
import geometricShapes from "../../img/backgroundsData/geometricShapes.gif";
import { Button, CircularProgress, Skeleton } from "@mui/material";
import { ButtonStyle } from "../../components/styles/styles";
import { instance } from "../../utils/axios";
import { microProfile } from "../../toolkitRedux/toolkitSlice";
import { useDispatch, useSelector } from "react-redux";

const ChangeBackground = (props) => {
  const {
    setOpenDialog,
    setUrlImg,
    allBackgrounds,
    allAvatars,
    currentBackgrounds,
    setCurrentBackgrounds,
    setCurrentAvatar,
    currentAvatar,
    currentItem,
    setCurrentItem,
    load,
    acoin,
    getBackgroundsData,
    getAvatarsData,        getUser

  } = props;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(0);
  const skelet = [[1, 2, 3]];
  const skeletA = [[1, 2, 3, 4, 5, 6, 7, 8]];
  const userData = useSelector((state) => state.userData);
  console.log(userData);
  function getMicroProfile() {
    instance.get(`micro-profile/`).then((response) => {
      dispatch(microProfile(response.data));
    });
  }
  const disabledBuy = () => {
    if (
      !currentItem ||
      userData.EXP < currentItem.level_required ||
      userData.karma < currentItem.karma_required ||
      userData.acoin < currentItem.price ||
      currentItem.is_owned
    ) {
      return true;
    } else {
      return false;
    }
  };
  const disabledSave = () => {
    if (
      !currentItem ||
      userData.karma < currentItem.karma_required ||
      !currentItem.is_owned
    ) {
      return true;
    } else {
      return false;
    }
  };
  function equipAvatar(id) {
    setLoader(2);
    instance
      .post(
        `${currentItem.avatar ? "avatars" : "backgrounds"}/${
          currentItem.id
        }/equip/`
      )
      .then((response) => {
        console.log(response.data);
        changeColor(id);
        getMicroProfile();
        getUser()

      })
      .catch((response) => {
        console.log(response);
      })
      .finally(function () {
        setLoader(0);
      });
  }
  function changeColor(id) {
    document.querySelector(`#${id}`).style.background = "#2d8939";
    setTimeout(() => {
      document.querySelector(`#${id}`).style.background = "transparent";
    }, 2000);
  }
  function buyAvatar(id) {
    setLoader(1);
    instance
      .post(
        `${currentItem.avatar ? "avatars" : "backgrounds"}/${
          currentItem.id
        }/buy/`
      )
      .then((response) => {
        console.log(response.data);
        currentItem.avatar ? getAvatarsData() : getBackgroundsData();
        changeColor(id);
      })
      .catch((response) => {
        console.log(response);
      })
      .finally(function () {
        setLoader(0);
      });
  }
  return (
    <div>
      <article
        className={classes.mainBlock}
        style={{ minHeight: "350px", minWidth: "100%" }}
      >
        <h2 className={classes.H2}>Фоны</h2>
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          swipe={false}
          animation="slide"
          duration={1000}
          slider-wrapper
        >
          {load
            ? skelet.map((el, i) => (
                <CarouselPageBackground
                  key={i}
                  data={el}
                  avatar={false}
                  skelet={true}
                />
              ))
            : allBackgrounds.map((el, i) => (
                <CarouselPageBackground
                  key={i}
                  data={el}
                  currentBackgrounds={currentBackgrounds}
                  setCurrentBackgrounds={setCurrentBackgrounds}
                  avatar={false}
                  setCurrentItem={setCurrentItem}
                  setCurrentAvatar={setCurrentAvatar}
                />
              ))}
        </Carousel>
      </article>
      <article className={classes.mainBlock}>
        <h2 className={classes.H2}>Аватарки</h2>

        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          swipe={false}
          animation="slide"
          duration={1000}
          slider-wrapper
        >
          {load
            ? skeletA.map((el, i) => (
                <CarouselPageBackground
                  key={i}
                  data={el}
                  avatar={true}
                  skelet={true}
                />
              ))
            : allAvatars.map((el, i) => (
                <div key={i} style={{ padding: "0 2vw" }}>
                  <CarouselPageBackground
                    key={i}
                    data={el}
                    avatar={true}
                    setOpenDialog={setOpenDialog}
                    setUrlImg={setUrlImg}
                    setCurrentAvatar={setCurrentAvatar}
                    currentAvatar={currentAvatar}
                    setCurrentItem={setCurrentItem}
                    setCurrentBackgrounds={setCurrentBackgrounds}

                    // setFile={setFileBackground}
                    // setUrlPhoto={setUrlAvaPhoto}
                    // getFileFromFolder={getFileFromFolder}
                    // background={true}
                    // MainDataSelector={MainDataSelector}
                  />
                </div>
              ))}
        </Carousel>
      </article>
      <div className={classes.btnContainer}>
        <div className={classes.btnWrapper}>
          <>
            {currentItem &&
              userData.karma > currentItem.karma_required &&
              currentItem.is_owned && <div style={{ width: "62.5%" }}></div>}
            {!currentItem && <div style={{ width: "62.5%" }}></div>}
            {currentItem &&
              (!currentItem.is_owned ||
                userData.karma < currentItem.karma_required) && (
                <span
                  className={classes.price}
                  style={
                    userData.karma < currentItem.karma_required &&
                    currentItem.is_owned
                      ? {
                          color: "red",
                          width: "62.5%",
                        }
                      : {}
                  }
                >
                  {"Необходимая карма: " + currentItem.karma_required}
                </span>
              )}

            {currentItem && !currentItem.is_owned && (
              <>
                <span
                  className={classes.price}
                  style={{
                    color: userData.EXP < currentItem.level_required && "red",
                  }}
                >
                  {"Необходимый уровень: " + currentItem.level_required}
                </span>

                <span
                  className={classes.price}
                  style={{ color: userData.acoin < currentItem.price && "red" }}
                >
                  {"Цена: " + currentItem.price}
                </span>
              </>
            )}
          </>

          <Button
            sx={{ ...ButtonStyle, width: "20%" }}
            className={classes.saveBtn}
            disabled={disabledBuy()}
            onClick={() => {
              buyAvatar("saveBtnText1");
            }}
          >
            <span className={classes.saveBtnText} id="saveBtnText1">
              {loader == 1 ? (
                <CircularProgress
                  sx={{ width: "35px !important", height: "35px !important" }}
                />
              ) : (
                "Купить"
              )}
            </span>
          </Button>
          <Button
            sx={{ ...ButtonStyle, width: "15%" }}
            className={classes.saveBtn}
            disabled={disabledSave()}
            onClick={() => {
              equipAvatar("saveBtnText2");
            }}
          >
            <span className={classes.saveBtnText} id="saveBtnText2">
              {loader == 2 ? (
                <CircularProgress
                  sx={{ width: "35px !important", height: "35px !important" }}
                />
              ) : (
                "Сохранить"
              )}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeBackground;
