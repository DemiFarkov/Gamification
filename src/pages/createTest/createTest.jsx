import React, { useEffect, useState } from "react";
import TestQue from "./testQue";
import TestForm from "./testForm";
import Header from "../../components/general/header";
import classes from "./test.module.css";
import Navigation from "../../components/general/navigation";
import TestSettings from "./testSettings";
import MainCheckbox from "./mainCheckbox";
import CheckBoxDLS from "./checkBoxDLS";

const CreateTest = () => {
  var count = 0;
  const [fileName, setFileName] = useState("Файл не выбран");
  function handleChange(event) {
    setFileName(event.target.files[0].name);
    document.getElementById("logoTestColor").style = "color: #000";
  }

  const [blockList, setBlockList] = useState([
    <TestQue
      key={0}
      idfile={"test" + 0}
      idfileColor={"fileColor" + 0}
      idPlus={"plusTest" + 0}
    />,
    <TestForm
      key={1}
      idfile={"form" + 1}
      idfileColor={"fileTestColor" + 1}
      idPlus={"plusForm" + 1}
    />,
  ]);

  const onAddBtnClick = (name, count) => {
    if (name == "form") {
      setBlockList(
        blockList.concat(
          <TestForm
            key={blockList.length}
            idfile={"form" + count}
            idfileColor={"fileColor" + count}
            idPlus={"plusForm" + blockList.length}
            blockList={blockList}
          />
        )
      );
    }
    if (name == "test") {
      setBlockList(
        blockList.concat(
          <TestQue
            key={blockList.length}
            idfile={"test" + count}
            idfileColor={"fileTestColor" + count}
            idPlus={"plusTest" + blockList.length}
            blockList={blockList}
          />
        )
      );
    }
    count++;
  };
  return (
    <div>
      <Header />
      <div className={classes.testContainer}>
        <Navigation />
        <div className={classes.testMainContent}>
          <h1 className={classes.H1}>Конструктор тестов</h1>
          <div className={classes.mainContentGrid}>
            <div className={classes.sideCheckbox}>
              <MainCheckbox />
            </div>
            <form action="">
              <div className={classes.TestName}>
                <div className={classes.TestNameInputContainer}>
                  <div className={classes.TestNameInputWrapper}>
                    <div className={classes.TestNameInputTitle}>
                      Наименование теста
                    </div>
                    <input
                      type="text"
                      className={classes.TestNameInput}
                      id="TestNameInput"
                      placeholder="Введите наименование теста"
                    />{" "}
                  </div>

                  <div className={classes.TestNameInputWrapper}>
                    <div className={classes.TestNameInputTitle}>Тема</div>
                    <input
                      type="text"
                      className={classes.TestNameInput}
                      id="TestNameSelect"
                      placeholder="Это будет Select"
                    />{" "}
                  </div>
                </div>
                <div className={classes.answerInputFileContainer}>
                  <label
                    htmlFor="logoTest"
                    className={classes.answerInputFileText}
                  >
                    Выберите файл
                  </label>
                  <div
                    className={classes.answerInputFileName}
                    id="logoTestColor"
                  >
                    {fileName}
                  </div>
                  <input
                    id="logoTest"
                    type="file"
                    onChange={handleChange}
                    className={classes.answerInputFile}
                  />
                </div>
              </div>
              <div className={classes.TestSettingsBlock}>
                <TestSettings />
              </div>
              {blockList}
              <div className={classes.btnContainer}>
                <div
                  className={classes.btnContainerBtn}
                  onClick={() => onAddBtnClick("form", count)}
                >
                  Добавить форму
                </div>
                <div
                  className={classes.btnContainerBtn}
                  onClick={() => onAddBtnClick("test", count)}
                >
                  Добавить тест
                </div>
                <button className={classes.btnContainerBtnForm}>
                  Создать тест
                </button>
              </div>
            </form>
            <div className={classes.sideAbout}>
              <div className={classes.textareaContainer}>
                <div className={classes.textareaTitle}>Описание теста</div>
                <textarea
                  name=""
                  id=""
                  cols="40"
                  rows="20"
                  className={classes.textareaCOntent}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
