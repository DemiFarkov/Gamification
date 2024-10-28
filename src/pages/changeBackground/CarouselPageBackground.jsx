import React, { useState } from "react";
import classes from "./changeBackground.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUrl,
  openDialorBackground,
} from "../../toolkitRedux/toolkitSlice";
import { Avatar, Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationDeletion from "./confirmationDeletion";
import { instance } from "../../utils/axios";
const CarouselPageBackground = (props) => {
  const {
    avatar,
    data,
    currentBackgrounds,
    setCurrentBackgrounds,
    skelet,
    setCurrentAvatar,
    currentAvatar,
    create,
    setCurrentItem,
    getBackgroundsData,
    getAvatarsData,
    currentItem,
  } = props;
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const styleSkeleton = {
    padding: ".25vw .4vw .25vw .4vw",
    margin: "12px 16px",
    bgcolor: "#2d3846",
    height: avatar ? "80px" : "200px",
    width: avatar ? "80px" : "380px",
    borderRadius: avatar ? "50%" : "3vw",
    clear: "both",
  };

  function removeItem() {
    instance
      .delete(
        `${currentItem.avatar ? "avatars" : "backgrounds"}/${currentItem.id}/`
      )
      .then((response) => {
        console.log(response);
        currentItem.avatar ? getAvatarsData() : getBackgroundsData();
      })
      .catch((response) => {
        console.log(response);
      });
  }
  return (
    <div className={classes.CarouselPageBackground}>
      {data.map(
        (el, i) =>
          skelet ? (
            <Skeleton key={i} variant="rounded" sx={styleSkeleton} />
          ) : (
            <div
              key={i}
              className={classes.imgWrapper}
              onClick={() => {
                // dispatch(openDialorBackground(true));
                // dispatch(changeUrl(el.image));
                setCurrentItem({ ...el, avatar: avatar });
                create && setOpenDialog(true);
                !create &&
                  (avatar
                    ? (setCurrentAvatar(el), setCurrentBackgrounds(null))
                    : (setCurrentBackgrounds(el), setCurrentAvatar(null)));
              }}
              style={
                currentBackgrounds && currentBackgrounds.id == el.id && !avatar
                  ? {
                      outline: "2px solid #469c6d",
                      boxShadow: "0 0 15px #469c6d",
                    }
                  : avatar
                  ? currentAvatar && currentAvatar.id == el.id
                    ? {
                        width: "70px",
                        outline: "2px solid #469c6d",
                        boxShadow: "0 0 15px #469c6d",
                        borderRadius: "50%",
                      }
                    : { width: "70px" }
                  : {}
              }
            >
              {create && (
                <div className={classes.CarouselRemoveItem}>
                  <CloseIcon sx={{ fontSize: "15px" }} />
                </div>
              )}
              {avatar ? (
                <Avatar
                  alt="Avatar"
                  src={el.image}
                  sx={{ width: 70, height: 70 }}
                />
              ) : (
                <img
                  src={el.image}
                  className={classes.CarouselBackgroundPoint}
                  style={{
                    width: "100%",
                    borderRadius: "1vw",
                  }}
                ></img>
              )}
            </div>
          )
        // ) : (
        //   <div style={{position:"relative", width:"300px", height:"300px",overflow:"hidden"}}><div style={{position:"relative", width:"300px", height:"300px",overflow:"hidden"}}>{el.url}</div></div>
        // )
      )}
      <ConfirmationDeletion
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        removeItem={removeItem}
      />
    </div>
  );
};

export default CarouselPageBackground;
