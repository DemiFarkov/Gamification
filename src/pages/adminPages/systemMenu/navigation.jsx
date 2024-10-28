import React from "react";
import classes from "./statisticsSystem.module.css";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  const pages = [
    { to: "StatisticsSystem", name: "Статистика системы" },
    { to: "SettingBD", name: "Настройки базы данных" },
    { to: "SettingRequests", name: "Настройка обращений" },
    { to: "Chart", name: "График" },
    { to: "Law", name: "Права" },
    { to: "Security", name: "Безопасность" },
    { to: "Compliments", name: "Комплименты и жалобы" },
    { to: "Tests", name: "Тесты" },
  ];

  return (
    <nav className={classes.nav}>
      <ul className={classes.navList}>
        {pages.map((el, i) => (
          <LiNavigation
            key={i}
            to={el.to}
            name={el.name}
            styleBackground={props.styleBackground}
          />
        ))}
        <li>
          <Link
            className={classes.navListLink}
            to="/"
            style={{ marginTop: "3vw" }}
          >
            Выход
          </Link>{" "}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

const LiNavigation = (props) => {
  const style = {borderRadius: "1vw" };
  return (
    <li>
      <Link
        className={classes.navListLink}
        to={`../pages/adminPages/systemMenu/${props.to}`}
        style={
           props.styleBackground == props.to
            ? { ...style, background: "#30353D",    boxShadow: "inset -.2vw -.1vw 1.3vw #00000079"
            }
            : style
        }
      >
        {props.name}
      </Link>{" "}
    </li>
  );
};
