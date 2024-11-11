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
import { instance } from "../../../utils/axios/index.js";
import Cookies from "js-cookie";

const TableTR = (props) => {
  const { positions, groups, data } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(true);
  function visibilityMenu(visibleMenu) {
    let closeMenu = document.querySelectorAll(`.${classes.tableMenuContainer}`);
    // for (i = 0; i < closeMenu.length; i++) {
    //   console.log(i);
    // }

    setVisibleMenu(!visibleMenu);
  }
  function resetPassword(id) {
    instance.post(`admin-change-password/${id}/`).then((response) => {
      alert("Новый пароль: " + response.data.password);
    }).catch((response) => {
      console.log(response)((response) => {
      alert("Новый пароль: " + response.data.password);
    })
    });
  }
  function deactivate(id) {
    instance.post(`users/${id}/deactivate/`).then((response) => {
      alert("Пользователь деактивирован");
    });
  }
  function activate(id) {
    instance.post(`users/${id}/activate/`).then((response) => {
      alert("Пользователь активирован");
    });
  }

  return (
    <>
      <div className={classes.tableRow}>
        {data.last_name + " " + data.first_name}
      </div>
      <div className={classes.tableRow}>{data.username}</div>
      <div className={classes.tableRow}>{data.karma}</div>
      <div className={classes.tableRow}>{data.acoin_amount}</div>
      <div className={classes.tableRow}>{data.experience}xp</div>
      <div className={classes.tableRow}>{data.position}</div>
      <div className={classes.tableRow}>{data.birth_date}</div>
      <div className={classes.tableRowFlex}>
        <div className={classes.tableFlexRow}>
          {groups[data.groups[0] - 1] && groups[data.groups[0] - 1].name}
        </div>
        <Dropdown>
          <MenuButton sx={{ transform: "rotate(90deg)", textAlign: "end" }}>
            ...
          </MenuButton>
          <Menu slots={{ listbox: AnimatedListbox }}>
            <MenuItem onClick={() => setModalOpen(true)}>Изменить</MenuItem>
            <MenuItem>--------</MenuItem>

            <MenuItem onClick={() => resetPassword(data.id)}>
              Сбросить пароль
            </MenuItem>
            <MenuItem
              onClick={() => {
                data.is_active ? deactivate(data.id) : activate(data.id);
              }}
            >
              {data.is_active ? "Деактивировать" : "Активировать"}
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <MakeHangesModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        positions={positions}
        groups={groups}
        data={data}
      />
    </>
  );
};

export default TableTR;
