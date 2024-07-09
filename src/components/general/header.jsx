import React, { useState } from "react";
import classes from "./header.module.css";
import strelka from "../../img/Arrow27.svg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Transition } from "react-transition-group";
import "./styles.css";
import AndroidIcon from "@mui/icons-material/Android";
import { getGroupsAuth } from "../../hooks/reduxHooks";
import gif from "../../img/480.gif";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../toolkitRedux/toolkitSlice";

const Header = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [pointNav, setpointNav] = useState(false);
  const group = getGroupsAuth();
  const dispatch = useDispatch();
  const ref = useRef(null);
  useClickOutside(ref, () => {
    setVisibleNav(false);
  });
  function exit() {
    Cookies.remove("userToken", { path: "" });
    window.location.reload();
  }
  return (
    <div className={classes.mainContainer}>
      <div
        ref={ref}
        className={classes.nameContainer}
        style={{
          marginRight: `calc(3vw)`,
        }}
      >
        <div></div>
        {/* <img src="" alt="" className={classes.nameContainerImg} /> */}
        <div className={classes.nameContainerImg}></div>
        <img
          src={strelka}
          alt=""
          className={classes.nameContainerNavOpen}
          onClick={() => setVisibleNav(!visibleNav)}
        />
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
              <div className={classes.link}>
                Пока пусто{" "}
                <AndroidIcon
                  sx={{
                    position: "absolute",
                    top: "-.6vw",
                    right: ".5vw",
                    transform: "rotate(180deg)",
                    fontSize: "2.3vw",
                  }}
                />
              </div>
              <div className={classes.link}>Скоро появится</div>
              {group == "Администраторы" && (
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
                </>
              )}
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
      </div>
    </div>
  );
};

export default Header;
