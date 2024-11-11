import React, { useState } from "react";
import classes from "./profil.module.css";
import { Paper } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import cup from "../../img/pngwing53.png";
import cup2 from "../../img/pngwing52.png";
import snickers from "../../img/snickers.png";
import AchievementsModal from "./achievementsModal";
import Tilt from "react-parallax-tilt";
import AchievementCard from "../../components/achievementCard/achievementCard";

const ColumnContainer3 = (props) => {
  const { data } = props;
  const [openAchievementsModal, setOpenAchievementsModal] = useState(false);
  const [dataCard, setDataCard] = useState(false);

  if (data.profile) {
    return (
      <>
        <div className={classes.avations} mainblock="true">
          <span className={classes.fieldsetLabel}>Инвентарь</span>
          <fieldset className={classes.fieldset}>
            {" "}
            <legend className={classes.legend}>Инвентарь</legend>
            <span className={classes.fieldsetBackground}></span>
          </fieldset>{" "}
          <div className={classes.imgContainer}>
            <img src={snickers} alt="" style={{ width: "10%" }} />
            <img src={snickers} alt="" style={{ width: "10%" }} />
            <img src={snickers} alt="" style={{ width: "10%" }} />
          </div>
        </div>

        <div className={classes.box6} mainblock="true">
          <span className={classes.fieldsetLabel}>Статистика</span>
          <fieldset className={classes.fieldset}>
            {" "}
            <legend className={classes.legend}>Статистика</legend>
            <span className={classes.fieldsetBackground}></span>
          </fieldset>{" "}
          <Carousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            className={classes.carousel}
            swipe={false}
            animation="slide"
            duration={1000}
          >
            {data &&
              data.statistics.map((e, i) => <CaruselPage key={i} data={e} />)}
          </Carousel>
        </div>
        <div className={classes.box7} mainblock="true">
          {" "}
          <Carousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            className={classes.carousel}
            swipe={false}
            animation="slide"
            duration={1000}
          >
            {data.achievements.map((items, i) => (
              <Item2
                key={i}
                items={items}
                setOpenAchievementsModal={setOpenAchievementsModal}
                setDataCard={setDataCard}
              />
            ))}
          </Carousel>
          <span className={classes.fieldsetLabel}>Персональные награды</span>
          <fieldset className={classes.fieldset}>
            {" "}
            <legend className={classes.legend}>Персональные награды</legend>
            <span className={classes.fieldsetBackground}></span>
          </fieldset>{" "}
          <AchievementsModal
            openAchievementsModal={openAchievementsModal}
            setOpenAchievementsModal={setOpenAchievementsModal}
            dataCard={dataCard}
          />
        </div>
      </>
    );
  }
};

export default ColumnContainer3;

const CaruselPage = (props) => {
  return (
    <div style={{ overflowY: "scroll" }}>
      {props.data.map((el, i) => (
        <Item key={i} el={el} />
      ))}
    </div>
  );
};

function Item(props) {
  const { el } = props;
  return (
    <Paper
      sx={{
        height: "100% !important",
        padding: "0 1.5vw",
        boxShadow: "none !important",
      }}
    >
      <h2 className={classes.PaperTitle}>{el.titleName}</h2>
      <div className={classes.PaperDescriptionMain}>
        {" "}
        {el.contentPoint &&
          el.contentPoint.map((element, i) =>
            el.titleName == "Сложность обращений" ? (
              <div
                className={classes.PaperDescriptionMainWrapperPiceText}
                key={i}
              >
                <div></div>
                <span>
                  {element.type} : {element.count}
                </span>
              </div>
            ) : (
              <div
                className={classes.PaperDescriptionMainWrapperPiceText}
                key={i}
              >
                <div></div>
                <span>{element}</span>
              </div>
            )
          )}
        {el.titleName == "Сложность обращений" && (
          <div
            className={classes.difficultyScale}
            style={{
              backgroundImage: `linear-gradient(0.25turn, #51b678 0% ${
                el.contentPoint[0].percentage + "%"
              }, #c4c853 ${el.contentPoint[0].percentage + "%"} ${
                el.contentPoint[0].percentage + el.contentPoint[1].percentage !=
                0
                  ? el.contentPoint[0].percentage +
                    el.contentPoint[1].percentage +
                    "%"
                  : "50%"
              }, #c85353 ${
                el.contentPoint[0].percentage +
                el.contentPoint[1].percentage +
                "%"
              } 100%)`,
            }}
          ></div>
        )}
      </div>
      {/* <h3 className={classes.PaperSubTitle}>{props.el.subData.subTitle}12</h3> */}
      {/* <div className={classes.PaperSubDescription}>
        {" "}
        {props.el.subData.description.map((el, i) => (
          <div className={classes.PaperDescriptionMainWrapperPiceText} key={i}>
            <div></div>
            <span>{el}</span>
          </div>
        ))}
      </div> */}
    </Paper>
  );
}

function Item2(props) {
  const { items, setDataCard } = props;
  return (
    <div
      style={{
        padding: "0 2vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {items.map((el, i) => (
        <div
          className={classes.cardContainerMini}
          key={i}
          onClick={() => {
            props.setOpenAchievementsModal(true), setDataCard(el);
          }}
        >
          <AchievementCard
            MainDataSelector={el.achievement}
            typeAchData={el.achievement.typeAchContent}
            newTypeStyleDataSelector={el.achievement.styleCard}
            small={true}
          />
          {/* <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15}>
            <div
              style={{
                width: "81px",
                height: "108px",
                background: "#A8A4A4",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <img src={el.src} alt="" style={{ width: "auto" }} />
            </div>
          </Tilt> */}
        </div>
      ))}
    </div>
  );
}
