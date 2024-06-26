// Filename - App.js

import React, { useState, useRef, useEffect } from "react";
import classes from "./traning.module.css";

const Timer = (props) => {
  const {
    timeQue,
    setTimer,
    whichTimer,
    setMinutes,
    setSeconds,
    timerStop,
    setRefTimer,
    setTimeOver,countQue,
  } = props;
  const Ref = useRef(null);
  // The state for our timer
  const [timerValue, setTimerValue] = useState("");
  const [littleTime, setTittleTime] = useState();
  const [timeTime, setTimeTime] = useState(timeQue);
  useEffect(() => {
    if (timerStop) {
      console.log("close");
    }
  }, [timerStop]);
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 60);
    if (whichTimer == "forTest") {
      setMinutes(minutes);
      setSeconds(seconds);
    }
    if (whichTimer == "forTest") {
      setTimeTime(minutes + seconds / 60);
    }
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };
  useEffect(() => {
    if (timerValue == "00:00:00") {
      if (whichTimer == "forQue") {
        setTimer(false);
      } else if (whichTimer == "forTest") {
        setTimeOver(true);
      }
    }
  }, [timerValue]);
  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (seconds < 11) {
      if (whichTimer == "forQue") {
        setTittleTime(true);
      }
    }
    if (total >= 0) {
      setTimerValue(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    let { deadline, time } = e;
    let hours = Math.floor(time / 60 / 60);
    time = time - hours * 60 * 60;

    let minutes = Math.floor(time / 60);
    time = time - minutes * 60;

    let seconds = time;

    let stringTimer = `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${seconds > 9 ? seconds : "0" + seconds}`;
    setTimerValue(stringTimer);
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(deadline);
    }, 1000);
    Ref.current = id;
    console.log(id);
    if (whichTimer == "forTest") {
      setRefTimer(id);
    }
  };

  const getDeadTime = (timeQue) => {
    let deadline = new Date();
    let time = 0;
    if (whichTimer == "forQue") {
      time = timeQue;
    } else if (whichTimer == "forTest") {
      time = timeQue;
    }

    deadline.setSeconds(deadline.getSeconds() + time);

    return { deadline, time };
  };

  useEffect(() => {
    console.log(timeQue);
    if (!timerStop) {
      setTimeTime;

      clearTimer(getDeadTime(timeQue));
      if (whichTimer == "forQue") {
        if (timeQue < 11) {
          setTittleTime(true);
        } else {
          setTittleTime(false);
        }
      } else if (whichTimer == "forTest") {
        if (timeQue * 60 < 11) {
          setTittleTime(true);
        } else {
          setTittleTime(false);
        }
      }
    }
  }, [timerStop,countQue]);

  return (
    <div
      className={
        whichTimer == "forQue"
          ? classes.timerQueContainer
          : classes.timerQueContainertest
      }
      style={
        whichTimer == "forQue"
          ? littleTime
            ? { border: ".1vw solid #c72e26", boxShadow: "0 0 2vw #c72e26" }
            : { border: ".1vw solid #5dd439" }
          : { border: "none" }
      }
    >
      <h3>
        {" "}
        {whichTimer == "forQue" ? "Время на вопрос:" : "Время на тест:"}
      </h3>
      <h2>{timerValue}</h2>
    </div>
  );
};

export default Timer;
