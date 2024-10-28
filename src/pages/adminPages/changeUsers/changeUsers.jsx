import React, { useEffect, useState } from "react";
import Header from "../../../components/general/header";
import Navigation from "../../../components/general/navigation";
import classes from "./ChangeUsers.module.css";
import TableTR from "./tableTR";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Padding } from "@mui/icons-material";
import { instance } from "../../../utils/axios";
import { isMobile } from "../../../hooks/react-responsive";
import { getGroupsAuth } from "../../../hooks/reduxHooks";
import Not from "../../404Page/not";

const ChangeUsers = () => {
  const group = getGroupsAuth();

  const [userData, SetUserData] = useState([]);
  const [userDataFilter, SetUserDataFilter] = useState([]);

  const [roleFilter, SetRoleFilter] = useState("");
  const [postFilter, SetPostFilter] = useState("");
  const [positions, setPositions] = useState([]);
  const [groups, setGroups] = useState([]);
  const isMobileWidth = isMobile();
  function filter(el) {
    let good = true;
    if (postFilter !== "") {
      if (el.position !== postFilter) {
        good = false;
      }
    }
    if (roleFilter !== "") {
      if (el.groups[0] !== roleFilter) {
        good = false;
      }
    }
    return good;
  }
  useEffect(() => {
    if (userDataFilter) {
      SetUserDataFilter(
        userData.filter(function (el, index) {
          return filter(el);
        })
      );
    }
  }, [postFilter, roleFilter]);
  useEffect(() => {
    group == "Администраторы" && getData();
  }, []);
  function getData() {
    instance.get("users/").then(function (response) {
      SetUserData(response.data);
      SetUserDataFilter(response.data);
      console.log(response.data);
    });
    instance.get("positions/").then(function (response) {
      setPositions(response.data.positions);
    });
    instance.get("groups/").then(function (response) {
      setGroups(response.data);
    });
  }
  const styleSelect = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#469C9A",
      color: "#fff",
      borderRadius: "3vw",
    },
    "& label": {
      color: "#fff ",
    },
    "& .MuiOutlinedInput-input": {
      color: "#fff !important",
      minWidth: "12vw",
    },
    "& svg": {
      color: "#fff ",
    },
    "& .MuiOutlinedInput-root:hover": {
      color: "#fff",
      "& > fieldset": {
        borderColor: "#469C9A",
      },
    },
  };
  return (
    <div>
      {group == "Администраторы" ? (
        <>
          <Header />
          <div className={classes.mainContainer}>
            {!isMobileWidth && <Navigation />}
            <div className={classes.mainContent}>
              <h1 className={classes.title}>Редактор пользователей</h1>
              <div className={classes.filter}>
                <input type="text" className={classes.filterInput} />{" "}
                <div className={classes.filterSelectContainer}>
                  <FormControl sx={styleSelect}>
                    <InputLabel id="roleFilter">Роль</InputLabel>
                    <Select
                      id="roleFilter"
                      value={roleFilter}
                      onChange={(event) => {
                        SetRoleFilter(event.target.value);
                      }}
                      label="Роль"
                    >
                      <MenuItem value={""}>Не выбрано</MenuItem>
                      {groups.map((el, index) => (
                        <MenuItem value={el.id} key={index}>
                          {el.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={styleSelect}>
                    <InputLabel id="postFilter">Должность</InputLabel>
                    <Select
                      id="postFilter"
                      value={postFilter}
                      onChange={(event) => {
                        SetPostFilter(event.target.value);
                      }}
                      label="Должность"
                      sx={styleSelect}
                    >
                      <MenuItem value={""}>Не выбрано</MenuItem>

                      {positions.map((el, index) => (
                        <MenuItem value={el} key={index}>
                          {el}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className={classes.tableName}>
                <div className={classes.tableUser}>Пользователей</div>
                <div className={classes.tableLogin}>Логин</div>
                <div className={classes.tableKarma}>Карма</div>
                <div className={classes.tableCoin}>A-coin</div>
                <div className={classes.tableXP}>Опыт</div>
                <div className={classes.tableJob}>Должность</div>
                <div className={classes.tableDate}>День рождения</div>
                <div className={classes.tableRol}>Роль </div>
              </div>
              <div className={classes.tableContainer}>
                <div className={classes.tableContent}>
                  {userDataFilter.map((el, index) => (
                    <TableTR
                      key={index}
                      positions={positions}
                      groups={groups}
                      data={el}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Not />
      )}
    </div>
  );
};

export default ChangeUsers;
