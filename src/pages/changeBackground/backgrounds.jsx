import React, { useEffect, useState } from "react";
import classes from "./changeBackground.module.css";
import { getGroupsAuth } from "../../hooks/reduxHooks";
import Header from "../../components/general/header";
import Navigation from "../../components/general/navigation";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Skeleton,
  Tab,
  Tabs,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { ButtonStyle } from "../../components/styles/styles";
import CreateBackground from "./createBackground";
import PropTypes from "prop-types";
import ChangeBackground from "./changeBackground";
import BackgroundModal from "./backgroundModal";
import { instance } from "../../utils/axios";
const Backgrounds = (props) => {
  const {
    acoin,
    allBackgrounds,
    allAvatars,
    getBackgroundsData,
    getAvatarsData,
    getUser,
    openBackgroundModal,
    setOpenBackgroundModal,
  } = props;
  const group = getGroupsAuth();
  const [load, setLoad] = useState(false);
  const [TabsValue, setTabsValue] = useState(0);
  const [requestSuccessful, setRequestSuccessful] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [urlImg, setUrlImg] = useState("");
  const [currentBackgrounds, setCurrentBackgrounds] = useState();
  const [currentAvatar, setCurrentAvatar] = useState();
  const [currentItem, setCurrentItem] = useState();

  useEffect(() => {
    let a;
    let b = {};
    Object.keys(allAvatars).length !== 0 &&
      currentItem &&
      ((a = allAvatars.find((el) => {
        return el.find((e) => {
          {
            return e.id == currentItem.id;
          }
        });
      })),
      (a &&
        (b = Object.values(a).find((e) => {
          {
            return e.id == currentItem.id;
          }
        })),
      setCurrentItem({ ...b, avatar: true })));
  }, [allAvatars]);
  useEffect(() => {
    let a;
    let b = {};
    Object.keys(allAvatars).length !== 0 &&
      currentItem &&
      ((a = allBackgrounds.find((el) => {
        return el.find((e) => {
          {
            return e.id == currentItem.id;
          }
        });
      })),
      (a &&
        (b = Object.values(a).find((e) => {
          {
            return e.id == currentItem.id;
          }
        })),
      setCurrentItem({ ...b, avatar: false })));
  }, [allBackgrounds]);
  const handleChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  const styleSkeleton = {
    padding: ".25vw .4vw .25vw .4vw",
    margin: "12px 16px",
    bgcolor: "#2d3846",
    height: "200px",
    width: "300px",
    borderRadius: "3vw",
    clear: "both",
  };
  return (
    <Dialog
      open={openBackgroundModal}
      onClose={() => {
        setOpenBackgroundModal(false);
      }}
      maxWidth="xl"
      sx={{ "& .MuiPaper-root": { background: "#58626f", boxShadow: "none" } }}
      style={{ backgroundColor: "transparent", maxWidth: "100%" }}
    >
      {" "}
      <DialogTitle>
        {group == "Администраторы" && !load && (
          <Tabs
            onChange={handleChange}
            value={TabsValue}
            sx={{
              "& .MuiButtonBase-root": {
                color: "#fff",
                fontSize: "20px",
              },
              "& .MuiTabs-indicator": { backgroundColor: "#fff" },

              "& .Mui-selected": { color: "#ffffff !important" },
            }}
          >
            <Tab label="Выбрать" {...a11yProps(0)} />
            <Tab label="Создать" {...a11yProps(1)} />
            <span className={classes.tabsAcoin}>Монет: {acoin}</span>
          </Tabs>
        )}
      </DialogTitle>
      <DialogContent>
        {requestSuccessful ? (
          <>
            <CustomTabPanel value={TabsValue} index={0}>
              <ChangeBackground
                setOpenDialog={setOpenDialog}
                setUrlImg={setUrlImg}
                allBackgrounds={allBackgrounds}
                allAvatars={allAvatars}
                setCurrentBackgrounds={setCurrentBackgrounds}
                setCurrentAvatar={setCurrentAvatar}
                currentAvatar={currentAvatar}
                currentBackgrounds={currentBackgrounds}
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
                load={load}
                acoin={acoin}
                getBackgroundsData={getBackgroundsData}
                getAvatarsData={getAvatarsData}
                getUser={getUser}
              />
            </CustomTabPanel>
            <CustomTabPanel value={TabsValue} index={1}>
              <CreateBackground
                setOpenDialog={setOpenDialog}
                setUrlImg={setUrlImg}
                setCurrentBackgrounds={setCurrentBackgrounds}
                setCurrentAvatar={setCurrentAvatar}
                currentAvatar={currentAvatar}
                currentBackgrounds={currentBackgrounds}
                allBackgrounds={allBackgrounds}
                allAvatars={allAvatars}
                currentItem={currentItem}
                setCurrentItem={setCurrentItem}
                getBackgroundsData={getBackgroundsData}
                getAvatarsData={getAvatarsData}
              />
            </CustomTabPanel>
          </>
        ) : (
          <div style={{ fontSize: "1.2vw" }}>
            Что-то пошло не так. Пожалуйста, перезагрузите страницу
          </div>
        )}
      </DialogContent>
      <BackgroundModal
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        urlImg={urlImg}
      />
    </Dialog>
  );
};

export default Backgrounds;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
