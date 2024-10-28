import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import classes from "./profil.module.css";

const AwardsModal = (props) => {
  const { setOpenAwards, openAwards } = props;
  return (
    <Dialog
      open={openAwards}
      onClose={() => {
        setOpenAwards(false);
      }}
      maxWidth={"md"}
    >
      <DialogTitle>
        <div className={classes.DialogTitleWrapper}>
          <h3>Персональные награды </h3>
          <CancelOutlinedIcon
            onClick={() => {
              setOpenAwards(false);
            }}
            className={classes.CancelIcon}
          />
        </div>
      </DialogTitle>
      <DialogContent>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis
        facilis tempora veniam ullam maxime molestias, magnam repellat non?
        Deleniti placeat asperiores, nisi ratione fuga nostrum autem. Rerum
        excepturi eveniet in. Magni deleniti suscipit possimus reprehenderit
        delectus illum provident aperiam, maiores sint. Velit nesciunt veniam
        consectetur soluta. Necessitatibus, voluptate molestiae fugiat officiis
        quo corrupti? Aliquam corporis laboriosam aspernatur. Ratione, quidem
        dicta? Eaque, fuga vel repudiandae laboriosam in minus cumque dolore
        temporibus delectus facilis. Inventore nemo quidem facere, architecto
        dolor commodi quia eum nihil. Beatae iste inventore veritatis odio!
        Tenetur, placeat cum.
      </DialogContent>
    </Dialog>
  );
};

export default AwardsModal;
