import React, { useEffect, useState } from "react";
import classes from "./header.module.css";
import strelka from "../../img/Arrow27.svg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Transition } from "react-transition-group";
import "./styles.css";
import AndroidIcon from "@mui/icons-material/Android";
import { getGroupsAuth, getMicroProfile } from "../../hooks/reduxHooks";
import gif from "../../img/480.gif";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../toolkitRedux/toolkitSlice";
import { isMobile } from "../../hooks/react-responsive";
import Navigation from "./navigation";
import ChangePassword from "../../pages/changePassword/changePassword";
import { StyledBadge } from "../styles/StyledBadge";
import { Avatar, MenuItem, Select } from "@mui/material";
import { selecetStyle } from "../styles/styles";
import { BorderColor, Margin, Padding } from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";

const Header = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [pointNav, setpointNav] = useState(false);
  const [selectStateValue, setSelectStateValue] = useState(`В сети`);

  const [openChangePassword, setOpenChangePassword] = useState(false);
  const urlProfile = getMicroProfile();
  const group = getGroupsAuth();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const isMobileWidth = isMobile();
  const styleSelect = {
    margin: "0",
    position: "absolute",
    right: "10%",
    bottom: "0",
    width: "12px",
    height: "12px",
    zIndex: "1",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      width: "150px",
    },
    "& svg": { display: "none" },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
    "&.MuiOutlinedInput-notchedOutline:hover": {
      border: "none",
      outline: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
    "& .MuiSelect-select": {
      minHeight: "1px !important",
      height: "12px !important",
      width: "12px !important",
      boxShadow: "0 0 0 2px #13151d",
      padding: "0 !important",
      color: "#fff",
      borderRadius: "50% !important",
      backgroundColor: selectStateValue == "В сети" ? "#44b700" : "#dbd936",
      color: selectStateValue == "В сети" ? "#44b700" : "#dbd936",
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
      "@keyframes ripple": {
        "0%": {
          transform: "scale(.8)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(2.4)",
          opacity: 0,
        },
      },
    },
  };
  useClickOutside(ref, () => {
    setVisibleNav(false);
    // setOpenState(false)
    let hamburger = document.getElementById("hamburger");
    if (hamburger.classList.contains("isOpen")) {
      hamburger.classList.remove("isOpen");
      hamburger.classList.add("isClosed");
    }
  });

  function exit() {
    console.log(    Cookies.get("userToken"))
    Cookies.remove("userToken");
    console.log(    Cookies.get("userToken"))
    window.location.reload();
  }
  function menuBarOpen() {
    let hamburger = document.getElementById("hamburger");
    if (hamburger.classList.contains("isOpen")) {
      hamburger.classList.remove("isOpen");
      hamburger.classList.add("isClosed");
    } else {
      hamburger.classList.remove("isClosed");
      hamburger.classList.add("isOpen");
    }
    setVisibleNav(!visibleNav);
  }
  function openStatemenu() {
    console.log(openState);
    setVisibleNav(false);
  }
  useEffect(() => {
    document
      .querySelector(`.MuiBadge-badge`)
      .addEventListener("click", () => openStatemenu());
  }, []);
  return (
    <div className={classes.mainContainer}>
      {isMobileWidth && <Navigation />}
      <div
        ref={ref}
        className={classes.nameContainer}
        style={{
          marginRight: `calc(3vw)`,
        }}
      >
        <div className={classes.avatarContainer}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            sx={{
              "& .MuiBadge-badge": {
                cursor: "pointer",
                backgroundColor:
                  selectStateValue == "В сети" ? "#44b700" : "#dbd936",
                color: selectStateValue == "В сети" ? "#44b700" : "#dbd936",
              },
            }}
          >
            <Select
              sx={{
                ...selecetStyle,
                ...styleSelect,
              }}
              value={selectStateValue}
              onChange={(e) => {
                setSelectStateValue(e.target.value);
              }}
            >
              <MenuItem value={"В сети"}>В сети</MenuItem>
              <MenuItem value={"Нет на месте"}>Нет на месте</MenuItem>
            </Select>
            <Avatar
              alt="Remy Sharp"
              src={urlProfile.avatar_url}
              sx={{ width: 56, height: 56 }}
            />
          </StyledBadge>
        </div>
        {/* <img src={urlProfile.avatar_url} alt="" className={classes.nameContainerImg} /> */}
        {/* <div className={classes.nameContainerImg}></div> */}
        <div
          className="container"
          id="hamburger"
          onClick={() => {
            menuBarOpen();
          }}
        >
          <div className="menuBar"></div>
          <div className="menuBar"></div>
          <div className="menuBar"></div>
        </div>
        {/* <img
          src={strelka}
          alt=""
          className={classes.nameContainerNavOpen}
          onClick={() => setVisibleNav(!visibleNav)}
        /> */}
        <Transition in={visibleNav} timeout={300} mountOnEnter unmountOnExit>
          {(state) => (
            <div className={`headerNav  ${state}`}>
              <img src={gif} alt="" className={classes.gif} />
              {pointNav && (
                <>
                  <Link className={classes.link} to="../pages/profil">
                    Создать награду
                  </Link>
                  <Link className={classes.link} to="../pages/profil">
                    Заводилка
                  </Link>
                  <Link className={classes.link} to="../pages/profil">
                    Редактор магазина
                  </Link>
                  <Link className={classes.link} to="../pages/profil">
                    Редактор аватарок
                  </Link>
                  <Link className={classes.link} to="../pages/profil">
                    Редактор фона
                  </Link>
                  <Link className={classes.link} to="../pages/profil">
                    Системное меню
                  </Link>
                </>
              )}

              { (
                <>
                  <Link
                    className={classes.link}
                    to="../pages/adminPages/changeUsers"
                  >
                    Изменение пользователей
                  </Link>
                  <Link
                    className={classes.link}
                    to="../pages/creatingUser/creatingUser"
                  >
                    Создание пользователя
                  </Link>
                  <Link
                    className={classes.link}
                    to="../pages/adminPages/creatingAchievements/creatingAchievements"
                  >
                    Создание достижений
                  </Link>
                  <Link
                    className={classes.link}
                    to="../pages/adminPages/moderationAvation/moderationAvation"
                  >
                    Модерация аваций
                  </Link>
                  <Link
                    className={classes.link}
                    to="../pages/adminPages/systemMenu/StatisticsSystem"
                  >
                    Системное меню
                  </Link>
                </>
              )}
              {/* <article>
                <Link className={classes.link} to="../pages/game/game">
                  Игра
                </Link>
              </article> */}
              <article
                className={classes.link}
                onClick={() => {
                  setOpenChangePassword(true);
                }}
              >
                Изменить пароль
              </article>
              <div
                className={classes.link}
                onClick={() => {
                  exit();
                }}
              >
                Выход
              </div>
            </div>
          )}
        </Transition>
        <ChangePassword
          setOpenChangePassword={setOpenChangePassword}
          openChangePassword={openChangePassword}
        />
      </div>
    </div>
  );
};

export default Header;
