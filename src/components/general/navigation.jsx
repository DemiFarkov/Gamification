import React, { useEffect, useState } from "react";
import classes from "./navigation.module.css";
import Logo from "../../img/img_navigation/image_77.png";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";
import { getGroupsAuth } from "../../hooks/reduxHooks";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";

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
  useEffect(() => {
    if (group == "Администраторы") {
      setProfileVisible(true),
        setStoreVisible(true),
        setPlayersVisible(true),
        setMainVisible(true);
      setTestVisible(true);
    }
  }, []);
  return (
    <div className={classes.mainContainer}>
      {MainVisible && (
        <Link
          to="../pages/main"
          className={classes.button}
          onMouseOver={() => setMainOpen(true)}
          onMouseOut={() => setMainOpen(false)}
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
          to="../pages/profil"
          className={classes.button}
          onMouseOver={() => setProfileOpen(true)}
          onMouseOut={() => setProfileOpen(false)}
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
          onMouseOver={() => setStoreOpen(true)}
          onMouseOut={() => setStoreOpen(false)}
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
          onMouseOver={() => setPlayersOpen(true)}
          onMouseOut={() => setPlayersOpen(false)}
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
          onMouseOver={() => setTestOpen(true)}
          onMouseOut={() => setTestOpen(false)}
        >
          <ChecklistRoundedIcon sx={{ fontSize: "2.4vw", margin: "1vw 0 .5vw 0", color:"#fff" }} />

          <Transition in={TestOpen} timeout={200} mountOnEnter unmountOnExit>
            {(state) => (
              <div className={`menuContainer ${state}`}>
                <div className={`menuName ${state}`}>Тесты</div>
              </div>
            )}
          </Transition>
        </Link>
      )}
    </div>
  );
};

export default Navigation;
