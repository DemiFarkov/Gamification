import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
import classes from "./profil.module.css";

import ColumnContainer1 from "./columnContainer1";
import ColumnContainer2 from "./columnContainer2";
import ColumnContainer3 from "./ColumnContainer3";
import Header from "../../components/general/header";
import Navigation from "../../components/general/navigation";
import ModalNoAccess from "../../components/general/modalNoAccess";
import { getGroupsAuth } from "../../hooks/reduxHooks";
import { instance } from "../../utils/axios";
import { Skeleton } from "@mui/material";
import { isMobile } from "../../hooks/react-responsive";
import { useSearchParams } from "react-router-dom";
// import Background from "../../components/general/backgrounds/snow/background";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addData } from "../../toolkitRedux/profileData";
import Backgrounds from "../changeBackground/backgrounds";
// import Background from "../../components/general/backgrounds/greyClouds/background";

const Profil = () => {
  const [data, setData] = useState({});
  const [load, setLoad] = useState(true);
  const [fullAccess, setFullAccess] = useState(false);
  const [complaintsData, setComplaintsData] = useState([]);
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [DataForSurveyAnswers, setDataForSurveyAnswers] = useState([]);
  const [openBackgroundModal, setOpenBackgroundModal] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState();

  const [allAvatars, setAllAvatars] = useState({});
  const [allBackgrounds, setAllBackgrounds] = useState({});
  const [searchParams] = useSearchParams();

  const user_id = searchParams.get("user_id");
  const myProfile =
    user_id == Cookies.get("employee_id") || searchParams.size == 0
      ? true
      : false;
  const group = getGroupsAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoad(true);
    const runCode = async () => {
      try {
        getData().then(() => {
          getUser().then(() => {
            setLoad(false);
          });
        });
        getBackgroundsData();
        getAvatarsData();
      } catch {}
    };
    runCode();
    myProfile || group == "Администраторы"
      ? setFullAccess(true)
      : setFullAccess(false);
  }, [searchParams]);
  const getUser = async () => {
    await instance
      .get(`get_user/${searchParams.size > 0 ? "?employee_id=" + user_id : ""}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const getData = async () => {
    // Получение истории жалоб
    (myProfile || group == "Администраторы") &&
      (await instance
        .get(
          `get_complaints/${user_id !== null ? "?employee_id=" + user_id : ""}`
        )
        .then((response) => {
          setComplaintsData(response.data);
        })
        .catch((response) => {
          console.log(response);
        }));
    await instance
      .get(`/survey/questions/`)
      .then((response) => {
        setSurveyQuestions(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  function getBackgroundsData() {
    instance
      .get(`backgrounds/available/`)
      .then((response) => {
        console.log(response.data);
        setAllBackgrounds(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  function getAvatarsData() {
    instance
      .get(`avatars/available/`)
      .then((response) => {
        console.log(response.data);
        setAllAvatars(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  useEffect(() => {
    if (Object.keys(data).length !== 0 && !load) {
      if (data.profile.karma < 40) {
        document.querySelector(`.${classes.box2}`).style.boxShadow =
          "30px 30px 255px  #c95243";
      }

      dispatch(
        addData({
          acoin: data.profile.acoin_amount,
          karma: data.profile.karma,
          EXP: data.profile.level,
        })
      );
    }
  }, [load]);
  const isMobileWidth = isMobile();

  const Background = lazy(() =>
    import(
      `../../components/general/backgrounds/${data.profile.selected_background_image}/background.jsx`
    )
  );
  return (
    <>
      <>
        <Header />
        <div className={classes.mainContentBox}>
          {/* {!load && <Background load={load} />} */}
          {!isMobileWidth && <Navigation />}
          {/* <Background /> */}
          <div className={classes.mainContainer}>
            {load ? (
              <>
                <Skeleton
                  variant="rounded"
                  sx={{ gridArea: "box1" }}
                  className={classes.styleSkeleton}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ gridArea: "box2" }}
                  className={classes.styleSkeleton}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ gridArea: "box3" }}
                  className={classes.styleSkeleton}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ gridArea: "box4" }}
                  className={classes.styleSkeleton}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ gridArea: "status" }}
                  className={classes.styleSkeleton}
                />

                <Skeleton
                  variant="rounded"
                  sx={{ gridArea: "box5" }}
                  className={classes.styleSkeleton}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ gridArea: "avations" }}
                  className={classes.styleSkeleton}
                />

                <Skeleton
                  variant="rounded"
                  sx={{ gridArea: "box6" }}
                  className={classes.styleSkeleton}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ gridArea: "box7" }}
                  className={classes.styleSkeleton}
                />
              </>
            ) : (
              <>
                {" "}
                <ColumnContainer1
                  data={data}
                  group={group}
                  searchParams={searchParams}
                  myProfile={myProfile}
                  complaintsData={complaintsData}
                  setOpenBackgroundModal={setOpenBackgroundModal}
                />
                <ColumnContainer2
                  fullAccess={fullAccess}
                  data={data}
                  getData={getData}
                  surveyQuestions={surveyQuestions}
                  setDataForSurveyAnswers={setDataForSurveyAnswers}
                />
                <ColumnContainer3 data={data} />
                <Backgrounds
                  setOpenBackgroundModal={setOpenBackgroundModal}
                  openBackgroundModal={openBackgroundModal}
                  acoin={data.profile.acoin_amount}
                  allBackgrounds={allBackgrounds}
                  allAvatars={allAvatars}
                  getBackgroundsData={getBackgroundsData}
                  getAvatarsData={getAvatarsData}
                  getUser={getUser}
                />
                {Object.keys(data).length !== 0 &&
                  (data.profile.selected_background_is_script ? (
                    <Suspense>
                      <Background />
                    </Suspense>
                  ) : (
                    <div
                      className={classes.backgroundImageBox}
                      style={{
                        backgroundImage: `url(${data.profile.selected_background_image})`,
                      }}
                    ></div>
                  ))}
              </>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default Profil;
