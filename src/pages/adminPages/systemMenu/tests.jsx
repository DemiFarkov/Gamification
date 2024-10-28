import { Button, TextField } from "@mui/material";
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
import { getGroupsAuth } from "../../../hooks/reduxHooks.js";
import ModalNoAccess from "../../../components/general/modalNoAccess.jsx";

const Tests = () => {
  const group = getGroupsAuth();

  const [expForModer, setExpForModer] = useState("");
  function poseExpForModer(id1) {
    instance
      .patch(`karma-settings/9/`, {
        id: 9,
        operation_type: "test_moderation",
        level: null,
        karma_change: null,
        experience_change: expForModer,
      })
      .then((response) => {
        console.log(response);
        changeColorSelect(id1);
      })
      .catch((response) => {
        console.log(response);
        changeErrorColorSelect(id1);
      });
  }
  useEffect(() => {
    instance.get(`karma-settings/9/`).then((response) => {
      console.log(response);
      setExpForModer(response.data.experience_change);
    });
  }, []);
  return (
    <div>
      {" "}
      {group == "Администраторы" ? (
        <>
          <Header />
          <section className={classes.mainContainer}>
            <Navigation styleBackground={"Tests"} />
            <section className={classes.mainContent}>
              <div className={classes.mainContentWrapper}>
                <article
                  className={classes.mainTypeBlocks}
                  id="moderTestWrapper"
                >
                  {" "}
                  <TextField
                    fullWidth
                    label="Опыт за модерацию тестов"
                    type="number"
                    value={expForModer}
                    onChange={(e) => {
                      setExpForModer(e.target.value);
                    }}
                    sx={{
                      ...TextFieldStyle,
                      margin: "1vw 0 0 0",
                      "& input": {
                        padding: "8px",
                        fontSize: ".95vw",
                      },
                    }}
                    focused

                    // value={newNameRequset}
                  />
                  <article className={classes.btnPlace}>
                    {" "}
                    <Button
                      className={classes.BtnTypeBlocks}
                      style={{ marginTop: "2vw" }}
                      onClick={() => {
                        poseExpForModer("moderTestWrapper");
                      }}
                      sx={ButtonStyle}
                    >
                      Сохранить
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

export default Tests;
