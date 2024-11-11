import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import CarouselPageBackground from "./CarouselPageBackground";
import classes from "./changeBackground.module.css";
import { ButtonStyle, TextFieldStyle } from "../../components/styles/styles";
import { Button, TextField } from "@mui/material";
import { instance } from "../../utils/axios";

const CreateBackground = (props) => {
  const {
    setOpenDialog,
    setUrlImg,
    allBackgrounds,
    allAvatars,
    currentItem,
    setCurrentItem,
    getBackgroundsData,
    getAvatarsData,
  } = props;

  const [fileRequset, setFileRequset] = useState();
  const [avatarFile, setAvatarFile] = useState();
  const [avatarPrice, setAvatarPrice] = useState();
  const [avatarLvl, setAvatarLvl] = useState();
  const [avatarKarma, setAvatarKarma] = useState();

  const [backgroundFile, setBackgroundFile] = useState();
  const [backgroundPrice, setBackgroundPrice] = useState();
  const [backgroundLvl, setBackgroundLvl] = useState();
  const [backgroundKarma, setBackgroundKarma] = useState();

  function createAvatar(id) {
    const formData = new FormData();
    formData.append("name", avatarFile.name);
    formData.append("price", avatarPrice);
    formData.append("level_required", avatarLvl);
    formData.append("karma_required", avatarKarma);
    formData.append("image", avatarFile);

    instance
      .post(`avatars/`, formData)
      .then((response) => {
        console.log(response.data);
        document.querySelector(`#${id}`).style.background = "#2d8939";
      })
      .catch((response) => {
        console.log(response);
      });
  }
  function createBackground(id) {
    const formData = new FormData();
    formData.append("name", backgroundFile.name);
    formData.append("price", backgroundPrice);
    formData.append("level_required", backgroundLvl);
    formData.append("karma_required", backgroundKarma);
    formData.append("image", backgroundFile);

    instance
      .post(`backgrounds/`, formData)
      .then((response) => {
        console.log(response.data);
        document.querySelector(`#${id}`).style.background = "#2d8939";
      })
      .catch((response) => {
        console.log(response);
      });
  }
  return (
    <div>
      <article className={classes.mainBlock}>
        <h2 className={classes.H2}>Все бэкграундсы</h2>
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          swipe={false}
          animation="slide"
          duration={1000}
          slider-wrapper
        >
          {allBackgrounds.map((el, i) => (
            <div key={i} style={{ padding: "0 2vw" }}>
              <CarouselPageBackground
                key={i}
                data={el}
                create={true}
                setCurrentItem={setCurrentItem}
                currentItem={currentItem}
                avatar={false}
                getBackgroundsData={getBackgroundsData}
                getAvatarsData={getAvatarsData}
              />
            </div>
          ))}
        </Carousel>
      </article>
      <article className={classes.mainBlocпk}>
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
            {allAvatars.map((el, i) => (
              <div key={i} style={{ padding: "0 2vw" }}>
                <CarouselPageBackground
                  key={i}
                  data={el}
                  avatar={true}
                  setOpenDialog={setOpenDialog}
                  setUrlImg={setUrlImg}
                  create={true}
                  setCurrentItem={setCurrentItem}
                  currentItem={currentItem}
                  getBackgroundsData={getBackgroundsData}
                  getAvatarsData={getAvatarsData}
                />
              </div>
            ))}
          </Carousel>
        </article>
        <div className={classes.bottomBlocksWrapper}>
          <div className={classes.mainBlock} style={{ width: "45%" }}>
            <div className={classes.answerInputFileContainer}>
              <label htmlFor={"idfile"} className={classes.answerInputFileText}>
                Выберите файл
              </label>
              <div className={classes.answerInputFileName} id={"idfileColor"}>
                {avatarFile ? avatarFile.name : "Файл не выбран"}
              </div>

              <input
                id={"idfile1"}
                type="file"
                onChange={(e) => {
                  setAvatarFile(e.target.files[0]);
                }}
                className={classes.answerInputFile}
                accept="image/jpeg,image/png"
              />
              <fieldset className={classes.fieldset}>
                {" "}
                <legend className={classes.legend}>Добавить аватарку</legend>
              </fieldset>
            </div>

            <TextField
              fullWidth
              sx={TextFieldStyle}
              label={"Введите цену за аватарку"}
              focused
              value={avatarPrice}
              type="number"
              onChange={(e) => {
                setAvatarPrice(e.target.value);
              }}
            />
            <TextField
              fullWidth
              sx={TextFieldStyle}
              label={"Введите уровень, на котором открывается аватарку"}
              focused
              value={avatarLvl}
              type="number"
              onChange={(e) => {
                setAvatarLvl(e.target.value);
              }}
            />
            <TextField
              fullWidth
              sx={TextFieldStyle}
              label={"Введите количетво кармы за аватарку"}
              focused
              value={avatarKarma}
              type="number"
              onChange={(e) => {
                setAvatarKarma(e.target.value);
              }}
            />
            <Button
              sx={{ ...ButtonStyle, padding: "0" }}
              onClick={() => {
                createAvatar("saveBtnText3");
              }}
            >
              <span className={classes.saveBtnText} id="saveBtnText3">
                Сохранить
              </span>
            </Button>
          </div>
          <div className={classes.mainBlock} style={{ width: "45%" }}>
            <div className={classes.answerInputFileContainer}>
              <label htmlFor={"idfile"} className={classes.answerInputFileText}>
                Выберите файл
              </label>
              <div className={classes.answerInputFileName} id={"idfileColor"}>
                {backgroundFile ? backgroundFile.name : "Файл не выбран"}
              </div>

              <input
                id={"idfile1"}
                type="file"
                onChange={(e) => {
                  setBackgroundFile(e.target.files[0]);
                }}
                className={classes.answerInputFile}
                accept="image/jpeg,image/png"
              />
              <fieldset className={classes.fieldset}>
                {" "}
                <legend className={classes.legend}>Добавить фон</legend>
              </fieldset>
            </div>

            <TextField
              fullWidth
              sx={TextFieldStyle}
              label={"Введите цену за фон"}
              focused
              value={backgroundPrice}
              type="number"
              onChange={(e) => {
                setBackgroundPrice(e.target.value);
              }}
            />
            <TextField
              fullWidth
              sx={TextFieldStyle}
              label={"Введите уровень, на котором открывается фон"}
              focused
              value={backgroundLvl}
              type="number"
              onChange={(e) => {
                setBackgroundLvl(e.target.value);
              }}
            />
            <TextField
              fullWidth
              sx={TextFieldStyle}
              label={"Введите количетво кармы за фон"}
              focused
              value={backgroundKarma}
              type="number"
              onChange={(e) => {
                setBackgroundKarma(e.target.value);
              }}
            />
            <Button
              sx={{ ...ButtonStyle, padding: "0" }}
              onClick={() => {
                createBackground("saveBtnText4");
              }}
            >
              <span className={classes.saveBtnText} id="saveBtnText4">
                Сохранить
              </span>
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CreateBackground;
