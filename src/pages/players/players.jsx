import React, { useEffect, useState } from "react";
import Header from "../../components/general/header";
import classes from "./players.module.css";
import Navigation from "../../components/general/navigation";
import CardPlayer from "./cardPlayer";
import ModalNoAccess from "../../components/general/modalNoAccess";
import { getGroupsAuth } from "../../hooks/reduxHooks";
import { isMobile } from "../../hooks/react-responsive";
import { instance } from "../../utils/axios";
import Skelet from "./skelet";
import { Link } from "react-router-dom";

const Players = () => {
  const [mainData, setMainData] = useState();
  const [load, setLoad] = useState(true);

  const group = getGroupsAuth();
  const isMobileWidth = isMobile();
  useEffect(() => {
    instance.get("players/").then(function (response) {
      setMainData(response.data);
      console.log(response.data);
      setLoad(false);
    });
  }, []);
  
  return (
    <>
      {group == "Администраторы" ? (
        <>
          <Header skrol="17" />
          <div className={classes.mainContentBox}>
            {!isMobileWidth && <Navigation />}
            <div className={classes.mainContent}>
              <h1 className={classes.H1}>Игроки</h1>
              <div className={classes.mainContentCards}>
                {load ? (
                  <>
                    <Skelet />
                    <Skelet />
                    <Skelet />
                    <Skelet />
                    <Skelet />
                    <Skelet />
                    <Skelet />
                    <Skelet />
                    <Skelet />
                    <Skelet />
                  </>
                ) : (
                  <>
                   
                    {mainData.map((el, index) => (
                      <Link key={index} className={classes.cardContainer} 
                      to={{
                        pathname: "../pages/profil",
                        search: `user_id=${el.id}`
                    }}
                      >
                        {" "}
                        <CardPlayer  data={el} />
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <ModalNoAccess />
      )}
    </>
  );
};

export default Players;
