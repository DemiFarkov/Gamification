import React from "react";
import classes from "./testsStatistics.module.css";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import {
  MenuButton,
  MenuItem,
  AnimatedListbox,
} from "../../../components/general/dropDownMui.jsx";
import "../../../components/general/styles.css";
import { instance } from "../../../utils/axios/index.js";
const AccordiontStatisticss = (props) => {
  const {
    duration,
    employee_name,
    end_time,
    max_score,
    score,
    status,
    test_acoin_reward,
    test_experience_points,
    test_id,
    test_name,
    theme_name,
    test_attempt,
    allEmployee,
    data,
  } = props;
  const navigate = useNavigate();
  function resetAttempt() {
    instance
      .delete(`attempts/delete/${test_attempt}/`)
      .then(function (response) {
        document.querySelector(`#${"id" + test_attempt}`).remove();
      });
  }
  return (
    <div className={classes.rowStatistic} id={"id" + test_attempt}>
      <div className={classes.rowcontainer}>
        <div className={classes.rowItem} style={{ width: "19%" }}>
          {data.full_name}
        </div>
        <div className={classes.rowItem} style={{ width: "19%" }}>
          {data.test__theme__name}
        </div>
        <div className={classes.rowItem} style={{ width: "19%" }}>
          {data.test__name}
        </div>

        <div className={classes.rowItem} style={{ width: "7%" }}>
          {data.duration_seconds}
        </div>
        <div className={classes.rowItem} style={{ width: "10%" }}>
          {data.end_time && end_time.slice(0, end_time.indexOf("T"))}
        </div>
        <div className={classes.rowItem} style={{ width: "13%" }}>
          {data.full_name}
        </div>
        <div className={classes.rowItem} style={{ width: "10%" }}>
          {status == "Не начато" ? (
            <span style={{ color: "#778080" }}>{status}</span>
          ) : status == "На модерации" ? (
            <span style={{ color: "#b7af3a" }}>На модерации</span>
          ) : status == "Failed" ? (
            <span style={{ color: "#b5341d" }}>
              Не пройден <br /> {score}/{max_score}
            </span>
          ) : status == "Passed" ? (
            <span style={{ color: "#4dd12f" }}>
              Пройден <br /> {score}/{max_score}
            </span>
          ) : (
            status == "In Progress" && (
              <span style={{ color: "#586577" }}>
                В процессе <br />
              </span>
            )
          )}
        </div>
      </div>
      <div className={classes.btnMoreContainer}>
        <div className={classes.btnMore}>
          <Dropdown>
            <MenuButton>...</MenuButton>
            <Menu slots={{ listbox: AnimatedListbox }}>
              <MenuItem
                onClick={() =>
                  navigate({
                    pathname: "../pages/tests/traning/result",
                    search: `?id=${test_attempt}`,
                  })
                }
              >
                Показать результат
              </MenuItem>
              <MenuItem>Дополнительно</MenuItem>
              <MenuItem onClick={() => resetAttempt()}>
                Cбросить попытку
              </MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default AccordiontStatisticss;
