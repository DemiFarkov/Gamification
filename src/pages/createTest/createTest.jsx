import React, { useState } from "react";
import TestQue from "./testQue";
import TestForm from "./testForm";
import Header from "../../components/general/header";
import classes from "./test.module.css";
import Navigation from "../../components/general/navigation";

const CreateTest = () => {
  const [blockList, setBlockList] = useState([
    <TestQue key={0} idfile={"test" + 0} idfileColor={"fileColor" + 0} />,
    <TestForm key={1} idfile={"form" + 1} idfileColor={"fileColor" + 1} />,
  ]);

  const onAddBtnClick = (event) => {
    if (event == "form") {
      setBlockList(
        blockList.concat(
          <TestForm
            key={blockList.length}
            idfile={"form" + blockList.length}
            idfileColor={"fileColor" + blockList.length}
          />
        )
      );
    }
    if (event == "test") {
      setBlockList(
        blockList.concat(
          <TestQue
            key={blockList.length}
            idfile={"test" + blockList.length}
            idfileColor={"fileColor" + blockList.length}
          />
        )
      );
    }
    console.log(blockList);
  };

  return (
    <div>
      <Header />
      <div className={classes.testContainer}>
        <Navigation />
        <div className={classes.testMainContent}>
          <h1 className={classes.H1}>Конструктор тестов</h1>
          <form action="">
            {blockList}
            <div className={classes.btnContainer}>
              <div
                className={classes.btnContainerBtn}
                onClick={() => onAddBtnClick("form")}
              >
                Добавить форму
              </div>
              <div
                className={classes.btnContainerBtn}
                onClick={() => onAddBtnClick("test")}
              >
                Добавить тест
              </div>
              <button className={classes.btnContainerBtnForm}>
                Создать тест
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
