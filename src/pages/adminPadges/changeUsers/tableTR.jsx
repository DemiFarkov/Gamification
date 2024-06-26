import React, { useState } from "react";
import classes from "./ChangeUsers.module.css";
import arrow from "../../../img/Arrow27.svg";
import { Menu } from "@mui/base/Menu";
import { Dropdown } from "@mui/base/Dropdown";

import {
  MenuButton,
  MenuItem,
  AnimatedListbox,
} from "../../../components/general/dropDownMui.jsx";
import { Transform } from "@mui/icons-material";
import MakeHangesModal from "./makeСhangesModal.jsx";

const TableTR = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [visibleMenu, setVisibleMenu] = useState(true);
  function visibilityMenu(visibleMenu) {
    let closeMenu = document.querySelectorAll(`.${classes.tableMenuContainer}`);
    for (i = 0; i < closeMenu.length; i++) {
      console.log(i);
    }

    setVisibleMenu(!visibleMenu);
  }
  return (
    <>
      <div className={classes.tableRow}>Джастин Тимберлейк</div>
      <div className={classes.tableRow}>d.timberlake@autotrade.su</div>
      <div className={classes.tableRow}>100</div>
      <div className={classes.tableRow}>1000</div>
      <div className={classes.tableRow}>200xp</div>
      <div className={classes.tableRow}>Певец ТП</div>
      <div className={classes.tableRow}>06.03.2024</div>
      <div className={classes.tableRowFlex}>
        <div className={classes.tableFlexRow}>Администратор </div>
        <Dropdown>
          <MenuButton sx={{ transform: "rotate(90deg)" }}>...</MenuButton>
          <Menu slots={{ listbox: AnimatedListbox }}>
            <MenuItem onClick={() => setModalOpen(true)}>Изменить</MenuItem>
            <MenuItem>Сбросить пароль</MenuItem>
            <MenuItem>Деактивировать</MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <MakeHangesModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default TableTR;
