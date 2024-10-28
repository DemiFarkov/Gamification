import React from "react";
import classes from "./players.module.css";
import ProgressBar from "../profil/progressBar/progressBar";
import Coin from "../../img/img_profil/image_52.png";
import Сharisma from "../../img/img_profil/image_53.png";
import Сircle from "../../img/img_profil/Ellipse_7.png";
import main from "../../img/pngwing2.png";
import Avatar from "@mui/material/Avatar";


import { StyledBadge } from "../../components/styles/StyledBadge";
const CardPlayer = (props) => {
  const { data } = props;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
      }}
    >
      <div className={classes.cardInner}>
        <div className={classes.cardFront}>
          <div className={classes.title}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt="Remy Sharp" src={data.avatar_url} sx={{ width: 50, height: 50 }}/>
            </StyledBadge>
            {/* <img src={Сircle} alt="" className={classes.titleImg} /> */}
            <div className={classes.titleName}>
              {data.first_name + " " + data.last_name}
            </div>
          </div>

          <img src={data.avatar_url} alt="" className={classes.mainImg} />
        </div>
        <div className={classes.cardBack}>
          <div className={classes.status}>{data.level_title}</div>
          <ProgressBar data={data} />

          <div className={classes.resurses}>
            <div className={classes.resursesItem}>
              <img src={Coin} alt="" /> {data.acoin_amount}
            </div>
            <div className={classes.resursesItem}>
              <img src={Сharisma} alt="" /> {data.karma
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPlayer;


