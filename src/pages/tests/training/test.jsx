import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import TheoryBlock from "./theoryBlock";
import QueBlock from "./queBlock";
import Header from "../../../components/general/header";
import classes from "./traning.module.css";
import Navigation from "../../../components/general/navigation";
import Description from "./description";
import { instance } from "../../../utils/axios/index.js";
import { CircularProgress } from "@mui/material";
import Timer from "./timer";
import MessageError from "../../../components/general/messageError";

import Cookies from "js-cookie";
const CountQue = (count) => {
  return (
    <div className={classes.queCircleContainer}>
      <div className={classes.queCircleCount}>{count.count}</div>
      <div className={classes.queCircle}></div>
    </div>
  );
};
const Test = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countForData, setCountForData] = useState(0);
  const [typeBlock, setTypeBlock] = useState();
  const [countAnswers, setCountAnswers] = useState(0);
  const [list, setList] = useState([]);
  const [countQue, setCountQue] = useState(1);
  const [visibleDescription, setVisibleDescription] = useState(true);
  const [dataForQuery, setDataForQuery] = useState({});
  const [mainData, setMainData] = useState();
  const [load, setLoad] = useState(true);
  const [minutes, setMinutes] = useState(0.2);
  const [seconds, setSeconds] = useState(0);
  const [timerStop, setTimerStop] = useState(false);
  const [timeOver, setTimeOver] = useState(false);
  const [openMessageError, setOpenMessageError] = useState(false);
  const [refTimer, setRefTimer] = useState(0);
  const [timeForTest, setTimeForTest] = useState();

  useEffect(() => {
    if (mainData) {
      if (!mainData.test.unlimited_time) {
        setTimeForTest(
          <Timer
            timeQue={mainData.test.duration_seconds * 60}
            setSeconds={setSeconds}
            setMinutes={setMinutes}
            whichTimer={"forTest"}
            timerStop={timerStop}
            setRefTimer={setRefTimer}
            setTimeOver={setTimeOver}
          />
        );
      }

    }
  }, [mainData]);
  useEffect(() => {
    if (typeBlock == "question" && !mainData.test.unlimited_time) {
      setTimeForTest(
        <Timer
          timeQue={seconds + minutes * 60}
          setSeconds={setSeconds}
          setMinutes={setMinutes}
          whichTimer={"forTest"}
          timerStop={timerStop}
          setRefTimer={setRefTimer}
          setTimeOver={setTimeOver}
        />
      );
    } else {
      clearInterval(refTimer);
    }
  }, [minutes, seconds]);
  useEffect(() => {
    if (timeOver) {
      let clonedObj = structuredClone(dataForQuery);

      let localCountQue = countQue;
      for (let i = countForData; i < mainData.blocks.length; i++) {
        if (mainData.blocks[i].type == "question") {
          {
            if (mainData.blocks[i].content.question_type == "single") {
              clonedObj[localCountQue] = "-1";
            } else if (mainData.blocks[i].content.question_type == "multiple") {
              clonedObj[localCountQue] = [-1];
            }

            localCountQue++;
          }
        }
      }
      setDataForQuery(clonedObj);
    }
  }, [timeOver]);
  const navigate = useNavigate();

  const idTest = searchParams.get("id");
  useEffect(() => {
    const user = instance
      .get(`api/test/${idTest}/`)
      .then(function (response) {
        setMainData(response.data);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);
  useEffect(() => {
    if (!visibleDescription) {
      const user = instance
        .post(`start_test/2/${idTest}/`)
        .then(function (response) {})
        .catch(function (response) {
          setOpenMessageError(true);
        });
    }
  }, [visibleDescription]);
  useEffect(() => {}, [mainData]);

  function dataСollection(data, index) {
    let clonedObj = structuredClone(dataForQuery);
    clonedObj[index + 1] = data;
    setDataForQuery(clonedObj);
  }
  useEffect(() => {
    if (!load) {
      let count = 0;
      for (let i = 0; i < mainData.blocks.length; i++) {
        if (mainData.blocks[i].type == "question") {
          count++;
          setList((prevList) =>
            prevList.concat(<CountQue key={i} count={prevList.length + 1} />)
          );
        }
      }
    }
  }, [mainData]);
  function setType() {
    if (countForData !== mainData.blocks.length - 1) {
      setTypeBlock(mainData.blocks[countForData + 1].type);
    }

    setCountForData(countForData + 1);
  }
  useEffect(() => {
    if (!load) {
      if (countForData !== mainData.blocks.length) {
        setTypeBlock(mainData.blocks[countForData].type);
      }
    }
  }, [mainData]);
  useEffect(() => {
    if (mainData) {
      if (countForData == mainData.blocks.length || timeOver) {
        quaryGo();
      }
    }
  }, [countForData, dataForQuery]);
  const quaryGo = async () => {
    const user = await instance
      .post(
        `complete_test/${Cookies.get("employee_id")}/${idTest}/`,
        dataForQuery
      )
      .then(function (response) {
        mainData.test.show_correct_answers
          ? navigate({
              pathname: "../pages/tests/traning/result",
              search: `?id=${response.data.test_attempt_id}`,
            })
          : navigate({
              pathname: "../pages/tests/traning/final",
            });
      })
      .catch(function (response) {
        setOpenMessageError(true);
      })
      .finally(() => {});
  };
  if (load) {
    return (
      <div className={classes.CircularProgressBox}>
        <CircularProgress />
      </div>
    );
  } else {
    const blocks = mainData.blocks;
    function compareNumbers(a, b) {
      return a.content.position - b.content.position;
    }
    blocks.sort(compareNumbers);
    return (
      <div>
        <Header />
        <MessageError
          openMessageError={openMessageError}
          setOpenMessageError={setOpenMessageError}
        />
        <div className={classes.mainContentBox}>
          <Navigation />
          {visibleDescription ? (
            <Description
              setVisibleDescription={setVisibleDescription}
              text={mainData.test.description}
              img={mainData.test.image}
            />
          ) : countForData !== mainData.blocks.length ? (
            !timeOver ? (
              typeBlock == "theory" ? (
                <TheoryBlock
                  data={mainData.blocks[countForData]}
                  setCountForData={setCountForData}
                  countForData={countForData}
                  blockLength={mainData.blocks.length}
                  setType={setType}
                  timeForTest={timeForTest}
                />
              ) : typeBlock == "question" ? (
                <>
                  <QueBlock
                    setCountQue={setCountQue}
                    countQue={countQue}
                    data={mainData.blocks[countForData]}
                    setCountForData={setCountForData}
                    countForData={countForData}
                    countAnswers={countAnswers}
                    setCountAnswers={setCountAnswers}
                    list={list}
                    blockLength={mainData.blocks.length}
                    setType={setType}
                    dataСollection={dataСollection}
                    timeForTest={timeForTest}
                    setTimerStop={setTimerStop}
                    refTimer={refTimer}
                  />
                </>
              ) : (
                <div>OOps</div>
              )
            ) : (
              <div>Время вышло </div>
            )
          ) : (
            <div className={classes.loadQuery}>
              <CircularProgress /> <div>Отправка данных... </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Test;
