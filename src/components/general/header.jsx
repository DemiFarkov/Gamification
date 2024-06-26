import React, { useState } from "react";
import classes from "./header.module.css";
import strelka from "../../img/Arrow27.svg";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Transition } from "react-transition-group";
import "./styles.css";
import AndroidIcon from "@mui/icons-material/Android";
const Header = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [pointNav, setpointNav] = useState(false);

  const ref = useRef(null);
  useClickOutside(ref, () => {
    setVisibleNav(false);
  });
  return (
    <div className={classes.mainContainer}>
      <div
        ref={ref}
        className={classes.nameContainer}
        style={{
          marginRight: `calc(3vw)`,
        }}
      >
        <img src="" alt="Ава" className={classes.nameContainerImg} />
        <img
          src={strelka}
          alt=""
          className={classes.nameContainerNavOpen}
          onClick={() => setVisibleNav(!visibleNav)}
        />
        <Transition in={visibleNav} timeout={300} mountOnEnter unmountOnExit>
          {(state) => (
            <div className={`headerNav  ${state}`}>
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
              <div className={classes.link}>
              
                Скоро появится
              </div>
              <Link
                className={classes.link}
                to="../pages/adminPages/changeUsers"
              >
                Изменение пользователей
              </Link>
              <Link
                className={classes.link}
                to="../pages/creatingUser/creatingUser"
              ><AndroidIcon
                  sx={{
                    position: "absolute",
                    bottom: "-.6vw",
                    left: ".5vw",
                    fontSize: "2.3vw",
                  }}
                />
                Создание пользователя
              </Link>
            </div>
          )}
        </Transition>
      </div>
    </div>
  );
};

export default Header;
