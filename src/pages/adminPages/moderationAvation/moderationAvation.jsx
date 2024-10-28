import React, { useEffect, useState } from "react";
import Header from "../../../components/general/header";
import classes from "./moderationAvation.module.css";
import { isMobile } from "../../../hooks/react-responsive";
import { Skeleton } from "@mui/material";
import Navigation from "../../../components/general/navigation";
import ReportData from "./reportData";
import ComplimentData from "./complimentData";
import { instance } from "../../../utils/axios";
import Not from "../../404Page/not";
import { getGroupsAuth } from "../../../hooks/reduxHooks";

const ModerationAvation = () => {
  const isMobileWidth = isMobile();
  const [load, setLoad] = useState(true);
  const [requestSuccessful, setRequestSuccessful] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [mainData, setMainData] = useState({});
  const group = getGroupsAuth();

  useEffect(() => {
    group == "Администраторы" &&
      (clickTab1(),
      instance.get("feedbacks/pending/").then(function (response) {
        console.log(response);
        setMainData(response.data);
        setLoad(false);
      }));
  }, []);
  const styleSkeleton = {
    padding: ".25vw .4vw .25vw .4vw",
    margin: "12px 16px",
    bgcolor: "#2d3846",
    height: "2.3vw",
    width: "29%",
    borderRadius: "3vw",
    clear: "both",
  };
  function clickTab1() {
    let el = document.querySelector(`#tab1`).style;
    el.background = "#919fb4";
    el.boxShadow = "inset -.2em -.2em 20px rgb(16, 15, 15)";
    el.borderTop = ".1vw solid #469C9A";

    let el2 = document.querySelector(`#tab2`).style;
    el2.background = "#202833";
    el2.boxShadow = "none";
    el2.borderBottom = "none";

    setShowReport(false);
  }
  function clickTab2() {
    let el = document.querySelector(`#tab2`).style;
    el.background = "#919fb4";
    el.boxShadow = "inset -.2em .2em 20px rgb(16, 15, 15)";
    el.borderBottom = ".1vw solid #ca2727";

    let el2 = document.querySelector(`#tab1`).style;
    el2.background = "#202833";
    el2.boxShadow = "none";
    el2.borderTop = "none";

    setShowReport(true);
  }
  return (
    <div>
      {group == "Администраторы" ? (
        <>
          <Header />
          <div className={classes.mainContainer}>
            {!isMobileWidth && <Navigation />}
            <div className={classes.mainContent}>
              <h1 className={classes.H1}>Модерация отзывов</h1>

              <div className={classes.mainBlock}>
                <div className={classes.tabWrapper}>
                  <div
                    className={classes.tab}
                    id="tab1"
                    onClick={() => {
                      clickTab1();
                    }}
                  >
                    Комплименты
                  </div>
                  <div
                    className={classes.tab}
                    id="tab2"
                    onClick={() => {
                      clickTab2();
                    }}
                  >
                    Жалобы
                  </div>
                </div>{" "}
                {load ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <>
                      <h3 className={classes.H3}>Комплименты</h3>
                      <div className={classes.avationBlock}>
                        {" "}
                        <Skeleton
                          variant="rounded"
                          sx={{
                            padding: ".25vw .4vw .25vw .4vw",
                            margin: "12px 0",
                            bgcolor: "#2d3846",
                            height: "2.3vw",
                            width: "20%",
                            borderRadius: "4px",
                          }}
                        />
                        <Skeleton
                          variant="rounded"
                          sx={{
                            padding: ".25vw .4vw .25vw .4vw",
                            margin: "12px 0",
                            bgcolor: "#2d3846",
                            height: "3vw",
                            width: "100%",
                            borderRadius: "4px",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            width: "60%",
                            justifyContent: "space-between",
                          }}
                        >
                          {" "}
                          <Skeleton
                            variant="rounded"
                            sx={{
                              padding: ".25vw .4vw .25vw .4vw",
                              margin: "12px 0",
                              bgcolor: "#2d3846",
                              height: "2.3vw",
                              width: "45%",
                              borderRadius: "4px",
                            }}
                          />
                          <Skeleton
                            variant="rounded"
                            sx={{
                              padding: ".25vw .4vw .25vw .4vw",
                              margin: "12px 0",
                              bgcolor: "#2d3846",
                              height: "2.3vw",
                              width: "45%",
                              borderRadius: "4px",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "60%",
                            justifyContent: "space-between",
                          }}
                        >
                          {" "}
                          <Skeleton
                            variant="rounded"
                            sx={{
                              padding: ".25vw .4vw .25vw .4vw",
                              margin: "12px 0",
                              bgcolor: "#2d3846",
                              height: "2.3vw",
                              width: "45%",
                              borderRadius: "4px",
                            }}
                          />
                          <Skeleton
                            variant="rounded"
                            sx={{
                              padding: ".25vw .4vw .25vw .4vw",
                              margin: "12px 0",
                              bgcolor: "#2d3846",
                              height: "2.3vw",
                              width: "45%",
                              borderRadius: "4px",
                            }}
                          />
                        </div>
                        <Skeleton
                          variant="rounded"
                          sx={{
                            padding: ".25vw .4vw .25vw .4vw",
                            margin: "12px 0",
                            bgcolor: "#2d3846",
                            height: "3vw",
                            width: "100",
                            borderRadius: "4px",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            padding: "0 3vw",
                            justifyContent: "space-between",
                          }}
                        >
                          {" "}
                          <Skeleton
                            variant="rounded"
                            sx={{
                              padding: ".25vw .4vw .25vw .4vw",
                              margin: "12px 0",
                              bgcolor: "#2d3846",
                              height: "2.3vw",
                              width: "45%",
                              borderRadius: "4px",
                            }}
                          />
                          <Skeleton
                            variant="rounded"
                            sx={{
                              padding: ".25vw .4vw .25vw .4vw",
                              margin: "12px 0",
                              bgcolor: "#2d3846",
                              height: "2.3vw",
                              width: "45%",
                              borderRadius: "4px",
                            }}
                          />
                        </div>
                      </div>
                    </>
                  </div>
                ) : requestSuccessful ? (
                  showReport ? (
                    <ReportData mainData={mainData} />
                  ) : (
                    <ComplimentData mainData={mainData} />
                  )
                ) : (
                  <div style={{ fontSize: "1.2vw" }}>
                    Что-то пошло не так. Пожалуйста, перезагрузите страницу
                  </div>
                )}
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

export default ModerationAvation;
