import React from "react";
import classes from "./main.module.css";
import Medal from "../img/img_main/Medal_Kolobanova.png";

const Tasks = () => {
  return (
    <div className={classes.tasksBox}>
      <h2 className={classes.tasksTitle}>Задачи</h2>
      <div className={classes.taskCard}>
        <img src={Medal} alt="" className={classes.taskImg} />
        <div className={classes.taskName}>Выжить в массовой</div>
      </div>

      <div className={classes.taskCard}>
        <img src={Medal} alt="" className={classes.taskImg} />
        <div className={classes.taskName}>Выжить в массовой</div>
      </div>

      <div className={classes.taskCard}>
        <img src={Medal} alt="" className={classes.taskImg} />
        <div className={classes.taskName}>Выжить в массовой</div>
      </div>

      <div className={classes.taskCard}>
        <img src={Medal} alt="" className={classes.taskImg} />
        <div className={classes.taskName}>Выжить в массовой</div>
      </div>
    </div>
  );
};

export default Tasks;
