import { Dialog } from "@mui/material";
import React from "react";
import classes from "./profil.module.css";

import Tilt from "react-parallax-tilt";
import AchievementCard from "../../components/achievementCard/achievementCard";
const AchievementsModal = (props) => {
  const { openAchievementsModal, setOpenAchievementsModal, dataCard } = props;
  return (
    <Dialog
      open={openAchievementsModal}
      onClose={() => {
        setOpenAchievementsModal(false);
      }}
      sx={{
        "& .MuiPaper-root": {
          background: "none",
          width: ".1px",
          height: ".1px",
          overflow: "visible",
          boxShadow: "0 0 300px 200px #a9dad4",
          background: " #47E0CC",
        },
      }}
    >
      <div
        style={{
          width: "390px",
          height: "520px",
          position: "relative",
          top: "-235px",
          left: "-195px",
        }}
      >
        {dataCard && (
          <AchievementCard
            // fileImage={dataCard.achievement.background_image}
            // urlItemPhoto={dataCard.achievement.background_image}
            // fileBackground={dataCard.achievement.background_image}
            // urlAvaPhoto={dataCard.achievement.background_image}
            MainDataSelector={dataCard.achievement}
            typeAchData={dataCard.achievement.typeAchContent}
            newTypeStyleDataSelector={dataCard.achievement.styleCard}
          />
        )}
      </div>
    </Dialog>
  );
};

export default AchievementsModal;
