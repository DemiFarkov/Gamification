import React, { useEffect, useState } from "react";
import classes from "./navigation.module.scss";
import Logo from "../../img/img_navigation/image_77.png";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";
import { getGroupsAuth } from "../../hooks/reduxHooks";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import { isMobile } from "../../hooks/react-responsive";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
const Navigation = () => {
  const [MainOpen, setMainOpen] = useState(false);
  const [ProfileOpen, setProfileOpen] = useState(false);
  const [StoreOpen, setStoreOpen] = useState(false);
  const [PlayersOpen, setPlayersOpen] = useState(false);
  const [TestOpen, setTestOpen] = useState(false);

  // Состояния для управлением отображения разделов меню
  const [MainVisible, setMainVisible] = useState(false);
  const [ProfileVisible, setProfileVisible] = useState(false);
  const [StoreVisible, setStoreVisible] = useState(false);
  const [PlayersVisible, setPlayersVisible] = useState(false);
  const [TestVisible, setTestVisible] = useState(true);
  const group = getGroupsAuth();
  const isMobileWidth = isMobile();
  useEffect(() => {
    if (group == "Администраторы") {
      setProfileVisible(true);
      setPlayersVisible(true);
      setStoreVisible(true);
      setMainVisible(true);
      setTestVisible(true);
    }
  }, []);

  function hover(id) {
    !isMobileWidth &&
      ((document.querySelector(`#${id}`).className = ""),
      (document.querySelectorAll(`nav li`)[`${id.slice(2) - 1}`].className =
        classes.hover));
  }
  function over(id) {
    !isMobileWidth &&
      (document.querySelectorAll(`nav li`)[`${id.slice(2) - 1}`].className =
        "");
  }
  return (
    <div className={classes.mainContainer}>
      <nav className={classes.nav}>
        {!isMobileWidth && (
          <aside className={classes.goo}>
            <ul className={classes.ul}>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </aside>
        )}

        <div style={{ position: "absolute", height: "inherit" }}>
          {" "}
          <ul className={classes.menu}>
            
            <li
              style={{ top: "0" }}
              id="li1"
              onMouseOver={() => {
                hover("li1");
              }}
              onMouseOut={() => {
                over("li1");
              }}
            >
              <a href="#/pages/profil">
                <Person2RoundedIcon
                  sx={{ fontSize: "35px" }}
                  className={classes.svg}
                />
              </a>
            </li>
            <li
              style={{ top: "80px" }}
              id="li2"
              onMouseOver={() => {
                hover("li2");
              }}
              onMouseOut={() => {
                over("li2");
              }}
            >
              <a href="#/mainPage">
                <HomeRoundedIcon
                  sx={{ fontSize: "35px" }}
                  className={classes.svg}
                />
              </a>
            </li>
            <li
              style={{ top: "160px" }}
              id="li3"
              onMouseOver={() => {
                hover("li3");
              }}
              onMouseOut={() => {
                over("li3");
              }}
            >
              <a href="#/pages/store">
                <StoreRoundedIcon
                  sx={{ fontSize: "35px" }}
                  className={classes.svg}
                />
              </a>
            </li>
            <li
              style={{ top: "240px" }}
              id="li4"
              onMouseOver={() => {
                hover("li4");
              }}
              onMouseOut={() => {
                over("li4");
              }}
            >
              <a href="#/pages/players">
                <PeopleAltRoundedIcon
                  sx={{ fontSize: "35px" }}
                  className={classes.svg}
                />
              </a>
            </li>
            <li
              style={{ top: "320px" }}
              id="li5"
              onMouseOver={() => {
                hover("li5");
              }}
              onMouseOut={() => {
                over("li5");
              }}
            >
              <a href="#/pages/tests/traning">
                <QuizRoundedIcon
                  sx={{ fontSize: "35px" }}
                  className={classes.svg}
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {!isMobileWidth && (
        <svg viewBox="0 0 24 24">
          <filter id="schlurp">
            <feGaussianBlur id="SourceGraphic" stdDeviation="10" />
            <feColorMatrix
              values="
       1 0 0 0 0
       0 1 0 0 0
       0 0 1 0 0 
       0 0 0 20 -10
    "
            />
          </filter>

          <defs>
            <g id="home">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </g>
            <g id="heart">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </g>
            <g id="bag">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </g>
          </defs>
        </svg>
      )}

      {/* {MainVisible && (
        <Link
          to="/"
          className={classes.button}
          onMouseOver={() => !isMobileWidth && setMainOpen(true)}
          onMouseOut={() => !isMobileWidth && setMainOpen(false)}
        >
          <img src={Logo} alt="" className={classes.mainContainerImg} />
          <Transition in={MainOpen} timeout={200} mountOnEnter unmountOnExit>
            {(state) => (
              <div className={`menuContainer ${state}`}>
                <div className={`menuName ${state}`}>Главная </div>
              </div>
            )}
          </Transition>
        </Link>
      )}
      {ProfileVisible && (
        <Link
          to={{
            pathname: "../pages/profil",
          }}
          className={classes.button}
          onMouseOver={() => !isMobileWidth && setProfileOpen(true)}
          onMouseOut={() => !isMobileWidth && setProfileOpen(false)}
        >
          <img src={Logo} alt="" className={classes.mainContainerImg} />
          <Transition in={ProfileOpen} timeout={200} mountOnEnter unmountOnExit>
            {(state) => (
              <div className={`menuContainer ${state}`}>
                <div className={`menuName ${state}`}>Профиль</div>
              </div>
            )}
          </Transition>
        </Link>
      )}
      {StoreVisible && (
        <Link
          to="../pages/store"
          className={classes.button}
          onMouseOver={() => !isMobileWidth && setStoreOpen(true)}
          onMouseOut={() => !isMobileWidth && setStoreOpen(false)}
        >
          <img src={Logo} alt="" className={classes.mainContainerImg} />
          <Transition in={StoreOpen} timeout={200} mountOnEnter unmountOnExit>
            {(state) => (
              <div className={`menuContainer ${state}`}>
                <div className={`menuName ${state}`}>Магазин</div>
              </div>
            )}
          </Transition>
        </Link>
      )}
      {PlayersVisible && (
        <Link
          to="../pages/players"
          className={classes.button}
          onMouseOver={() => !isMobileWidth && setPlayersOpen(true)}
          onMouseOut={() => !isMobileWidth && setPlayersOpen(false)}
        >
          <img src={Logo} alt="" className={classes.mainContainerImg} />
          <Transition in={PlayersOpen} timeout={200} mountOnEnter unmountOnExit>
            {(state) => (
              <div className={`menuContainer ${state}`}>
                <div className={`menuName ${state}`}>Игроки</div>
              </div>
            )}
          </Transition>
        </Link>
      )}
      {TestVisible && (
        <Link
          to="../pages/tests/traning"
          className={classes.button}
          onMouseOver={() => !isMobileWidth && setTestOpen(true)}
          onMouseOut={() => !isMobileWidth && setTestOpen(false)}
        >
          <ChecklistRoundedIcon
            sx={{
              fontSize: isMobileWidth ? "50px" : "2.4vw",
              margin: "1vw 0 .5vw 0",
              color: "#fff",
            }}
          />

          <Transition in={TestOpen} timeout={200} mountOnEnter unmountOnExit>
            {(state) => (
              <div className={`menuContainer ${state}`}>
                <div className={`menuName ${state}`}>Тесты</div>
              </div>
            )}
          </Transition>
        </Link>
      )} */}
    </div>
  );
};

export default Navigation;
