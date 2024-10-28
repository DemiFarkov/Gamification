import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import classes from "./statisticsSystem.module.css";

import {
  ButtonStyle,
  TextFieldStyle,
} from "../../../components/styles/styles.js";
import Header from "../../../components/general/header.jsx";
import Navigation from "./navigation.jsx";
import { instance } from "../../../utils/axios/index.js";
import { changeColorSelect, changeErrorColorSelect } from "./changeColor.js";
import ModalNoAccess from "../../../components/general/modalNoAccess.jsx";
import { getGroupsAuth } from "../../../hooks/reduxHooks.js";

const Compliments = () => {
  const group = getGroupsAuth();

  const [praiseLvl1, setPraiseLvl1] = useState("");
  const [praiseLvl2, setPraiseLvl2] = useState("");
  const [praiseLvl3, setPraiseLvl3] = useState("");

  const [complaintLvl1, setComplaintLvl1] = useState("");
  const [complaintLvl2, setComplaintLvl2] = useState("");
  const [complaintLvl3, setComplaintLvl3] = useState("");

  const [loader, setLoader] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    instance
      .get(`karma-settings/`)
      .then((response) => {
        console.log(response);
        setPraiseLvl1(response.data[1].karma_change);
        setPraiseLvl2(response.data[2].karma_change);
        setPraiseLvl3(response.data[4].karma_change);

        setComplaintLvl1(response.data[0].karma_change);
        setComplaintLvl2(response.data[3].karma_change);
        setComplaintLvl3(response.data[5].karma_change);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  function postData(theme, id1) {
    let objData;
    theme == "compliment"
      ? ((objData = {
          praise_settings: [
            { level: 1, karma_change: praiseLvl1 },
            { level: 2, karma_change: praiseLvl2 },
            { level: 3, karma_change: praiseLvl3 },
          ],
        }),
        setLoader(1))
      : ((objData = {
          complaint_settings: [
            { level: 1, karma_change: complaintLvl1 },
            { level: 2, karma_change: complaintLvl2 },
            { level: 3, karma_change: complaintLvl3 },
          ],
        }),
        setLoader(2));

    instance
      .post(`update-karma-settings/`, objData)
      .then((response) => {
        console.log(response);
        changeColorSelect(id1);
      })
      .catch((response) => {
        console.log(response);
        changeErrorColorSelect(id1);
      })
      .finally(function () {
        setLoader(null);
      });
  }
  return (
    <div>
      {" "}
      {group == "Администраторы" ? (
        <>
          <Header />
          <section className={classes.mainContainer}>
            <Navigation styleBackground={"Compliments"} />
            <section className={classes.mainContent}>
              <div className={classes.mainContentWrapper}>
                <article
                  className={classes.mainTypeBlocks}
                  id="complimentsWrapper"
                >
                  <h4 className={classes.titleTypeBlocks}>
                    Настройка уровней комплиментов
                  </h4>

                  <TextField
                    type="number"
                    fullWidth
                    sx={TextFieldStyle}
                    focused
                    value={praiseLvl1}
                    onChange={(e) => {
                      setPraiseLvl1(e.target.value);
                    }}
                    label="Карма за 1 уровень"
                  />
                  <TextField
                    type="number"
                    fullWidth
                    sx={TextFieldStyle}
                    focused
                    value={praiseLvl2}
                    onChange={(e) => {
                      setPraiseLvl2(e.target.value);
                    }}
                    label="Карма за 2 уровень"
                  />
                  <TextField
                    type="number"
                    fullWidth
                    sx={TextFieldStyle}
                    focused
                    value={praiseLvl3}
                    onChange={(e) => {
                      setPraiseLvl3(e.target.value);
                    }}
                    label="Карма за 3 уровень"
                  />

                  <article className={classes.btnPlace}>
                    {" "}
                    <Button
                      className={classes.BtnTypeBlocks}
                      sx={ButtonStyle}
                      onClick={() => {
                        postData("compliment", "complimentsWrapper");
                      }}
                    >
                      {loader == 1 ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Сохранить"
                      )}
                    </Button>
                  </article>
                </article>
                <article
                  className={classes.mainTypeBlocks}
                  id="complaintWrapper"
                >
                  <h4 className={classes.titleTypeBlocks}>
                    Настройка уровней жалоб
                  </h4>

                  <TextField
                    type="number"
                    fullWidth
                    sx={TextFieldStyle}
                    focused
                    value={complaintLvl1}
                    onChange={(e) => {
                      setComplaintLvl1(e.target.value);
                    }}
                    label="Карма за 1 уровень"
                  />
                  <TextField
                    type="number"
                    fullWidth
                    sx={TextFieldStyle}
                    focused
                    value={complaintLvl2}
                    onChange={(e) => {
                      setComplaintLvl2(e.target.value);
                    }}
                    label="Карма за 2 уровень"
                  />
                  <TextField
                    type="number"
                    fullWidth
                    sx={TextFieldStyle}
                    focused
                    value={complaintLvl3}
                    onChange={(e) => {
                      setComplaintLvl3(e.target.value);
                    }}
                    label="Карма за 3 уровень"
                  />

                  <article className={classes.btnPlace}>
                    {" "}
                    <Button
                      className={classes.BtnTypeBlocks}
                      sx={ButtonStyle}
                      onClick={() => {
                        postData("complaint", "complaintWrapper");
                      }}
                    >
                      {loader == 2 ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Сохранить"
                      )}
                    </Button>
                  </article>
                </article>
              </div>
            </section>
          </section>
        </>
      ) : (
        <ModalNoAccess />
      )}
    </div>
  );
};

export default Compliments;
