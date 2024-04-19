import React, { useEffect, useRef, useState } from "react";
import TestQue from "./testQue";
import TestForm from "./testForm";
import Header from "../../components/general/header";
import classes from "./test.module.css";
import Navigation from "../../components/general/navigation";
import TestSettings from "./testSettings";
import MainCheckbox from "./mainCheckbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useClickOutside } from "../../hooks/useClickOutside";
import ModuleAddTheme from "./moduleAddTheme";
import ModalValidTest from "./modalValidTest";
import { instance } from "../../utils/axios";

const CreateTest = (props) => {
  var count = 0;
  // const {id} = this.props;
  const [countForBlocks, setCountForBlocks] = useState(0);
  const [fileName, setFileName] = useState("Файл не выбран");
  const [forRemove, setForRemove] = useState();
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [valueSelect, setValueSelect] = useState(["Выберите тему", 0]);
  const [visibleModalAddTheme, setVisibleModalAddTheme] = useState(false);
  const [visibleModalValidTest, setVisibleModalValidTest] = useState(false);
  const [ModalValidTestText, setModalValidTestText] = useState(["", false]);
  const [collectionDataBlock, setCollectionDataBlock] = useState([]);
  const [suppCollection, setSuppCollection] = useState([]);
  const [actionForm, setActionForm] = useState();
  const [selectOption, setSelectOption] = useState([
    {
      key: 0,
      id: 0,
      setValueSelect: setValueSelect,
      name: "Создать новую",
    },
  ]);

  const [blockList, setBlockList] = useState([]);
  // Получаем имеющиеся темы для теста
  useEffect(() => {
    const themes_with_tests = instance.get("themes/").then((response) => {
      setSelectOption(selectOption.concat(response.data));
    });
  }, []);
  // Закрытие select при нажатии вне его
  const ref = useRef(null);
  useClickOutside(ref, () => {
    setVisibleSelect(false);
  });

  // Сигнал об отправке формы
  const CreateThisTest = async (e) => {
    e.preventDefault();

    let valid = true;
    let arr_about_error = [];
    //Проверка, чтобы была выбрана тема
    if (valid) {
      let select = document.querySelector(
        `.${classes.TestNameInputWrapper} > .${classes.TestSettingsDivWrapper}`
      );
      if (valueSelect[0] == "Выберите тему") {
        valid = false;
        select.style.outline = ".2vw #8c2323 solid";
        select.style.borderRadius = "3vw ";
        select.style.boxShadow = "0 0 2vw #8c2323 ";

        setVisibleModalValidTest(true);
        let text = `Не выбрана тема теста`;
        setModalValidTestText([text, false]);
      } else {
        select.style.outline = ".2vw transparent solid";
        select.style.borderRadius = "0 ";
        select.style.boxShadow = "none";
      }
    }
    // Проверка, чтобы хотя бы 1 ответ в вопросе был выбран правильны
    if (valid) {
      for (let i = 0; i < collectionDataBlock.length; i++) {
        if (collectionDataBlock[i].type == "question") {
          console.log(collectionDataBlock[i]);
          if (collectionDataBlock[i].content.question_type == "text") {
            valid = true;
            break;
          } else if (collectionDataBlock[i].content.question_type == "error") {
            valid = false;
            setVisibleModalValidTest(true);
            let text = `Не выбрано ни одного правильного ответа в ${
              i + 1
            } блоке`;
            setModalValidTestText([text, false]);
            break;
          }
        }
      }
    }
    // Проверка, чтобы не были все ответы правильными в вопросе
    if (valid) {
      for (let i = 0; i < collectionDataBlock.length; i++) {
        if (collectionDataBlock[i].type == "question") {
          if (collectionDataBlock[i].content.question_type == "text") {
            valid = true;
            break;
          }
          let currentValid = false;
          for (
            let j = 0;
            j < collectionDataBlock[i].content.answer_options.length;
            j++
          ) {
            if (
              collectionDataBlock[i].content.answer_options[j].is_correct ==
              false
            ) {
              currentValid = true;
            }
          }
          if (!currentValid) {
            valid = false;
            setVisibleModalValidTest(true);
            let text = `Все ответы были выбраны правильными в  ${i + 1} блоке`;
            setModalValidTestText([text, false]);
            break;
          }
        }
        if (!valid) {
          break;
        }
      }
    }

    if (valid) {
      setVisibleModalValidTest(true);
      setModalValidTestText([
        "Вы действительно хотите создать этот тест?",
        true,
        "create test",
      ]);
    }
  };

  // Создание вспомогательного объекта для создания массива данных из блоков
  function data(...props) {
    let supp = [props[0], props[1]];
    setSuppCollection(supp);
  }
  // Добавление данных из блоков в общий массив данных
  useEffect(() => {
    if (suppCollection[0] !== undefined) {
      let p = 0;
      for (let i = 0; i < blockList.length; i++) {
        if (blockList[i].props.idMainBlock == suppCollection[1]) {
          p = i;
        }
      }
      let clonedObj = structuredClone(collectionDataBlock);
      clonedObj[p] = suppCollection[0];
      setCollectionDataBlock(clonedObj);
    }
  }, [suppCollection]);

  // Формирование общего объекта для создания теста
  useEffect(() => {
    if (actionForm) {
      let total_questions = 0;
      for (let i = 0; i < collectionDataBlock.type == "question"; i++) {
        total_questions++;
      }

      let name = document.querySelector("#TestNameInput").value;
      let description = document.querySelector("#testDescription").value;
      let duration_seconds = document.querySelector("#timeForTest").value;
      let required_karma = document.querySelector("#KarmaForTest").value;
      let passing_score = document.querySelector("#MinPointsForTest").value;
      let min_level = document.querySelector("#EXPForTest").value;
      let acoin_reward = document.querySelector("#quantityCoins").value;
      let experience_points = document.querySelector("#quantityEXP").value;

      let unlimited_time = document.querySelector("#checkbox1").checked;
      let show_correct_answers = document.querySelector("#checkbox2").checked;
      let can_attempt_twice = document.querySelector("#checkbox3").checked;
      let send_results_to_email = document.querySelector("#checkbox4").checked;
      let without_achievement = document.querySelector("#checkbox5").checked;

      let dataForTest = {
        name: name,
        description: description,
        passing_score: passing_score,
        duration_seconds: duration_seconds,
        unlimited_time: unlimited_time,
        show_correct_answers: show_correct_answers,
        theme: valueSelect[1],
        required_karma: required_karma,
        experience_points: experience_points,
        acoin_reward: acoin_reward,
        min_level: min_level,
        can_attempt_twice: can_attempt_twice,
        send_results_to_email: send_results_to_email,
        achievement: 3,
        // total_questions: total_questions,
        // without_achievement: without_achievement,
        blocks: collectionDataBlock,
      };
      createTest(dataForTest);

      console.log(dataForTest);
    }
  }, [actionForm]);
  const createTest = async (dataForTest) => {
    const user = await instance
      .post("create_test/", dataForTest)
      .then(function (response) {
        console.log(response);
      });
  };
  // Изменение цвета названия выбранного файла
  function handleChange(event) {
    setFileName(event.target.files[0].name);
    document.getElementById("logoTestColor").style = "color: #000";
  }

  // Создание теории или вопроса
  const onAddBtnClick = (name) => {
    if (name == "theory") {
      setBlockList(
        blockList.concat(
          <TestForm
            key={countForBlocks}
            countForBlocks={countForBlocks}
            idfile={"formFile" + countForBlocks}
            idMainBlock={"mainBlock" + countForBlocks}
            idTitle={"titleForm" + countForBlocks}
            idText={"titleText" + countForBlocks}
            data={data}
            blockList={blockList}
            setForRemove={setForRemove}
          />
        )
      );
    }
    if (name == "test") {
      setBlockList(
        blockList.concat(
          <TestQue
            key={countForBlocks}
            countForBlocks={countForBlocks}
            idText={"idText" + countForBlocks}
            idTime={"idTime" + countForBlocks}
            idExplanation={"idExplanation" + countForBlocks}
            idValuePoins={"idValuePoins" + countForBlocks}
            idfile={"testFile" + countForBlocks}
            idfileColor={"fileTestColor" + countForBlocks}
            idPlus={"plusAnswer" + countForBlocks}
            idPlusRemove={"removeForm" + countForBlocks}
            idCheckBoxTime={"dlsTime" + countForBlocks}
            idCheckBoxCustom={"custom" + countForBlocks}
            idCheckBoxAbout={"about" + countForBlocks}
            idMainBlock={"mainBlock" + countForBlocks}
            idcreateTheory={"createTheory" + countForBlocks}
            setForRemove={setForRemove}
            collectionDataBlock={collectionDataBlock}
            setCollectionDataBlock={setCollectionDataBlock}
            data={data}
            setVisibleModalValidTest={setVisibleModalValidTest}
            setModalValidTestText={setModalValidTestText}
          />
        )
      );
    }
    setCountForBlocks(countForBlocks + 1);
  };
  useEffect(() => {
    if (blockList.length > 0) {
      let allidTitleBlock = document.querySelectorAll("#idTitleBlock");
      for (let i = 0; i < allidTitleBlock.length; i++) {
        allidTitleBlock[i].innerHTML = `${"Блок " + (i + 1)}`;
      }
    }
  }, [blockList]);
  // Удаление из массива блоков выбранного блока
  useEffect(() => {
    if (forRemove) {
      let p = 0;
      setBlockList(
        blockList.filter(function (currentValue, index) {
          if (currentValue.props.idMainBlock == forRemove) {
            p = index;
          }
          return currentValue.props.idMainBlock !== forRemove;
        })
      );

      let clonedObj = structuredClone(collectionDataBlock);
      clonedObj.splice(p, 1);

      setCollectionDataBlock(clonedObj);
    }
  }, [forRemove]);

  //  Анимация появления option для выбора темы
  useEffect(() => {
    if (visibleSelect) {
      let selects = document.querySelectorAll(
        `.${classes.TestSettingsDivTheme}`
      );
      let vw = "vw";
      let count = 2.9;
      document.querySelector(`.${classes.selectOptionWrapper}`).style.display =
        "block";
      setTimeout(() => {
        for (let i = 1; i < selects.length; i++) {
          let final = count + vw;
          selects[i].style.marginTop = final;
          count = count + 2.9;
        }
      }, 5);
    } else {
      document.querySelector(`.${classes.selectOptionWrapper}`).style.display =
        "none";
    }
  }, [visibleSelect]);
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
            <form action="" onSubmit={(e) => CreateThisTest(e)}>
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
                      required
                    />{" "}
                  </div>

                  <div className={classes.TestNameInputWrapper}>
                    <div className={classes.TestNameInputTitle}>Тема</div>

                    <div
                      className={classes.TestSettingsDivWrapper}
                      ref={ref}
                      onClick={() => setVisibleSelect(!visibleSelect)}
                    >
                      <div className={classes.TestSettingsSelectTheme}>
                        <span>{valueSelect[0]}</span>
                        <ExpandMoreIcon
                          color="action"
                          sx={{ fontSize: "1.5vw" }}
                        />
                      </div>
                      <div className={classes.selectOptionWrapper}>
                        {visibleSelect &&
                          selectOption.map((option) => (
                            <SelectFromTestSettings
                              key={option.id}
                              id={option.id}
                              setValueSelect={setValueSelect}
                              text={option.name}
                              setVisibleModalAddTheme={setVisibleModalAddTheme}
                            />
                          ))}
                      </div>
                    </div>
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
                  onClick={() => onAddBtnClick("theory", count)}
                >
                  Добавить теорию
                </div>
                <div
                  className={classes.btnContainerBtn}
                  onClick={() => onAddBtnClick("test", count)}
                >
                  Добавить вопрос
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
                  cols="30"
                  rows="20"
                  className={classes.textareaCOntent}
                  id="testDescription"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModuleAddTheme
        visibleModalAddTheme={visibleModalAddTheme}
        setVisibleModalAddTheme={setVisibleModalAddTheme}
      />
      {visibleModalValidTest && (
        <ModalValidTest
          visibleModalValidTest={visibleModalValidTest}
          setVisibleModalValidTest={setVisibleModalValidTest}
          setModalValidTestText={setModalValidTestText}
          ModalValidTestText={ModalValidTestText}
          setActionForm={setActionForm}
          setForRemove={setForRemove}
        />
      )}
    </div>
  );
};

export default CreateTest;

const SelectFromTestSettings = (props) => {
  const { text, id, setValueSelect, setVisibleModalAddTheme } = props;
  return (
    <div
      className={classes.TestSettingsDivTheme}
      onClick={() =>
        text == "Создать новую"
          ? setVisibleModalAddTheme(true)
          : setValueSelect([text, id])
      }
    >
      <span className={classes.TestSettingsDivText}>{text}</span>
      {text == "Создать новую" && (
        <AddCircleOutlineIcon sx={{ fontSize: "1.5vw" }} />
      )}
    </div>
  );
};
