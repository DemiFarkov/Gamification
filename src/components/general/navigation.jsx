import React, { useState } from "react";
import classes from "./navigation.module.css";
import Logo from "../../img/img_navigation/image_77.png";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [ProfileOpen, setProfilOpen] = useState(false);
  const [StoreOpen, setStoreOpen] = useState(false);
  const [FriendsOpen, setFriendsOpen] = useState(false);
  const [InventoryOpen, setInventoryOpen] = useState(false);
  return (
    <div className={classes.mainContainer}>
      <Link
        to="../pages/main"
        className={classes.button}
        onMouseOver={() => setInventoryOpen(true)}
        onMouseOut={() => setInventoryOpen(false)}
      >
        <img src={Logo} alt="" className={classes.mainContainerImg} />
        <div
          className={
            InventoryOpen
              ? classes.menuContainerOpen
              : classes.menuContainerClose
          }
        >
          <div
            className={
              InventoryOpen ? classes.menuNameOpen : classes.menuNameClose
            }
          >
            Главная
          </div>
        </div>
      </Link>
      <Link
        to="../pages/profil"
        className={classes.button}
        onMouseOver={() => setProfilOpen(true)}
        onMouseOut={() => setProfilOpen(false)}
      >
        <img src={Logo} alt="" className={classes.mainContainerImg} />
        <div
          className={
            ProfileOpen ? classes.menuContainerOpen : classes.menuContainerClose
          }
        >
          <div
            className={
              ProfileOpen ? classes.menuNameOpen : classes.menuNameClose
            }
          >
            Профиль
          </div>
        </div>
      </Link>

      <Link
        to="../pages/store"
        className={classes.button}
        onMouseOver={() => setStoreOpen(true)}
        onMouseOut={() => setStoreOpen(false)}
      >
        <img src={Logo} alt="" className={classes.mainContainerImg} />
        <div
          className={
            StoreOpen ? classes.menuContainerOpen : classes.menuContainerClose
          }
        >
          <div
            className={StoreOpen ? classes.menuNameOpen : classes.menuNameClose}
          >
            Магазин
          </div>
        </div>
      </Link>
      <Link
        to="../pages/players"
        className={classes.button}
        onMouseOver={() => setFriendsOpen(true)}
        onMouseOut={() => setFriendsOpen(false)}
      >
        <img src={Logo} alt="" className={classes.mainContainerImg} />
        <div
          className={
            FriendsOpen ? classes.menuContainerOpen : classes.menuContainerClose
          }
        >
          <div
            className={
              FriendsOpen ? classes.menuNameOpen : classes.menuNameClose
            }
          >
            Игроки
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navigation;
