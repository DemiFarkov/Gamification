import React, { useState } from "react";
import classes from "./profil.module.css";
import ProgressBar from "./progressBar/progressBar";
import Coin from "../../img/img_profil/image_52.png";
import Сharisma from "../../img/img_profil/image_53.png";
import Сircle from "../../img/img_profil/Ellipse_7.png";
import avatar from "../../img/esKzS_xdsog.jpg";
import { isMobile } from "../../hooks/react-responsive";
import AwardsModal from "./awardsModal";
import RecommendIcon from "@mui/icons-material/Recommend";
import AvationModal from "./avationModal";
import cup from "../../img/pngwing53.png";
import cup2 from "../../img/pngwing52.png";
import EditIcon from "@mui/icons-material/Edit";

<link rel="stylesheet" href="carousel.css" />;
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Avatar, Paper } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import HistoryCompliments from "./historyCompliments";
import Tilt from "react-parallax-tilt";
import AchievementsModal from "./achievementsModal";
import AchievementCard from "../../components/achievementCard/achievementCard";

const ColumnContainer1 = (props) => {
  const [openMore, setOpenMore] = useState(false);
  const [openAchievementsModal, setOpenAchievementsModal] = useState(false);

  const [openAwards, setOpenAwards] = useState(false);
  const [openAvationDialog, setOpenAvationDialog] = useState(false);
  const [goodAvation, setGoodAvation] = useState(true);
  const [openHistoryCompliments, setOpenHistoryCompliments] = useState(false);
  const [dataCard, setDataCard] = useState(false);
  const {
    data,
    group,
    searchParams,
    myProfile,
    complaintsData,
    setOpenBackgroundModal,
  } = props;
  const [img] = useState([
    [{ src: cup, name: "title" }],
    [
      { src: cup2, name: "title" },
      { src: cup2, name: "title" },
    ],
    [
      { src: cup, name: "title" },
      { src: cup, name: "title" },
    ],
  ]);

  // данные для progressBar
  const EditIconStyle = {
    position: "absolute",
    right: "10px",
    bottom: "10px",
    fontSize: "15px",
    cursor: "pointer",
    opacity: "0",
    transition: "all .2s",
  };
  const isMobileWidth = isMobile();
  const testData = [{ completed: 1 }];
  if (data.profile) {
    return (
      <>
        <div className={classes.box1} mainblockdiv="true">
          <Avatar
            alt="Аватарка"
            src={data.profile.avatar_url}
            sx={{ width: 70, height: 70, marginRight: "20px" }}
          />
          {/* <img
          src={data.profile.avatar_url}
          alt=""
          className={classes.profileAvatar}
        /> */}

          <div className={classes.buttonText}>
            <div className={classes.box1TextWrapper}>
              <div className={classes.UserName}>
                {data.profile.first_name + " "}
                {data.profile.last_name}
              </div>
              <div className={classes.userPosition}>
                {data.profile.position}
              </div>
            </div>
          </div>
          {myProfile && <EditIcon
            sx={EditIconStyle}
            onClick={() => {
              setOpenBackgroundModal(true);
            }}
          />}
          
        </div>

        <div className={classes.box2}>
          {/* <img
          src={data.profile.avatar_url}
          alt="Тут аватарка"
          style={{
            width: "100%",
            height: "100%",
            // objectFit: "cover",
            borderRadius: "1vw",
          }}
        /> */}
        </div>

        <div className={classes.box3} mainblockdiv="true">
          <h3
            className={classes.box3H3}
            style={{ fontSize: data.level_title.length > 23 ? "20px" : "24px" }}
          >
            {data.level_title}({data.profile.level}lvl)
          </h3>
          {testData.map((item, idx) => (
            <ProgressBar
              key={idx}
              completed={item.completed}
              data={data.profile}
            />
          ))}
          <div className={classes.resurses}>
            <div className={classes.resursesItem}>
              <img src={Coin} alt="" /> {data.profile.acoin_amount}
            </div>
            <div className={classes.resursesItem}>
              <img src={Сharisma} alt="" /> {data.profile.karma}
            </div>
            <div></div>
          </div>
          <div className={classes.RecommendIconWrapper}>
            <div className={classes.RecommendIcon}>
              <RecommendIcon
                className={classes.thumbsIcon}
                sx={
                  myProfile
                    ? {
                        "&:hover": {
                          transform: "none !important",
                          cursor: "default",
                        },
                      }
                    : {}
                }
                color="success"
                onClick={() => {
                  !myProfile &&
                    (setGoodAvation(true), setOpenAvationDialog(true));
                }}
              />
              <nav>{data.profile.praises_count}</nav>
            </div>
            <div className={classes.RecommendIcon}>
              {" "}
              <RecommendIcon
                className={classes.thumbsIconDown}
                sx={
                  myProfile
                    ? {
                        transform: "rotate(180deg)",
                        "&:hover": {
                          cursor: "default",
                          transform: "rotate(180deg) scale(1) !important",
                        },
                      }
                    : { transform: "rotate(180deg)" }
                }
                color="error"
                onClick={() => {
                  !myProfile &&
                    (setGoodAvation(false), setOpenAvationDialog(true));
                }}
              />{" "}
              <nav>
                <nav>{data.profile.complaints_count}</nav>
              </nav>
            </div>

            <div
              style={{ width: "33.3%", margin: "0 auto" }}
              className={classes.historyIcon}
            >
              {" "}
              <ReceiptLongIcon
                className={classes.paperHistoryIcon}
                onClick={() => {
                  setOpenHistoryCompliments(true);
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={classes.box4}
          mainblock="true"
          // onClick={() => {
          //   setOpenAwards(true);
          // }}
        >
          <span className={classes.fieldsetLabel}>Достижения</span>
          <fieldset className={classes.fieldset}>
            {" "}
            <legend className={classes.legend}>Достижения</legend>
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
            {data.achievements.map((item, i) => (
              <Item
                key={i}
                item={item}
                setOpenAchievementsModal={setOpenAchievementsModal}
                setDataCard={setDataCard}
              />
            ))}
          </Carousel>
        </div>
        <AwardsModal setOpenAwards={setOpenAwards} openAwards={openAwards} />
        <AvationModal
          openAvationDialog={openAvationDialog}
          setOpenAvationDialog={setOpenAvationDialog}
          goodAvation={goodAvation}
          id={data.profile.id}
        />
        <HistoryCompliments
          openHistoryCompliments={openHistoryCompliments}
          setOpenHistoryCompliments={setOpenHistoryCompliments}
          complaintsData={complaintsData}
          praisesData={data.praises_details}
          group={group}
          searchParams={searchParams}
        />
        <AchievementsModal
          openAchievementsModal={openAchievementsModal}
          setOpenAchievementsModal={setOpenAchievementsModal}
          dataCard={dataCard}
        />
      </>
    );
  }
};

export default ColumnContainer1;

function Item(props) {
  const { setDataCard } = props;
  return (
    <div
      style={{
        padding: "0 2vw",
        boxShadow: "none !important",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.item.map((el, i) => (
        <div
          className={classes.cardContainerMini}
          key={i}
          onClick={() => {
            props.setOpenAchievementsModal(true);
            setDataCard(el);
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
              <div className={classes.imgCardMini}></div>
              <img src={el.src} alt="" style={{ width: "auto" }} />
            </div>
          </Tilt> */}
        </div>
      ))}
    </div>
  );
}
