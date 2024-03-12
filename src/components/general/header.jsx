import React, { useState } from "react";
import classes from "./header.module.css";
import Сircle from "../../img/img_profil/Ellipse_7.png";
import strelka from "../../img/Arrow27.svg";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useClickOutside } from "./useClickOutside";
const Header = (props) => {
  const [visibleNav, setVisibleNav] = useState(false);
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
        <div className={visibleNav ? classes.nav : classes.navHidden}>
          <Link className={classes.link} to="../pages/adminPages/changeUsers">
            Изменение пользователей
          </Link>
          <Link className={classes.link} to="../pages/createTest">
            Создать тест
          </Link>
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
        </div>
      </div>
    </div>
  );
};

export default Header;
