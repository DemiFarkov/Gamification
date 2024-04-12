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

const CreateTest = () => {
  var count = 0;
  const [countForBlocks, setCountForBlocks] = useState(0);
  const [fileName, setFileName] = useState("Файл не выбран");
  const [forRemove, setForRemove] = useState();
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [valueSelect, setValueSelect] = useState("Выберите достижение");
  const [visibleModalAddTheme, setVisibleModalAddTheme] = useState(false);
  const [visibleModalValidTest, setVisibleModalValidTest] = useState(false);
  const [ModalValidTestText, setModalValidTestText] = useState();
  const [collectionDataBlock, setCollectionDataBlock] = useState([]);
  const [suppCollection, setSuppCollection] = useState([]);
  const [actionForm, setActionForm] = useState();
  const [selectOption, setSelectOption] = useState([
    <SelectFromTestSettings
      key={0}
      setValueSelect={setValueSelect}
      text={"Создать новую"}
      setVisibleModalAddTheme={setVisibleModalAddTheme}
      visibleModalAddTheme={visibleModalAddTheme}
    />,
    <SelectFromTestSettings
      key={1}
      setValueSelect={setValueSelect}
      text={"Права доступа"}
    />,
    <SelectFromTestSettings
      key={2}
      setValueSelect={setValueSelect}
      text={"1С 7.7ТиС"}
    />,
    <SelectFromTestSettings
      key={3}
      setValueSelect={setValueSelect}
      text={"Програмное обеспечение"}
    />,
    <SelectFromTestSettings
      key={4}
      setValueSelect={setValueSelect}
      text={"Массовые проблемы"}
    />,
  ]);
  const [blockList, setBlockList] = useState([]);

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
    // Проверка, чтобы хотя бы 1 ответ в вопросе был выбран правильны
    if (valid) {
      for (let i = 0; i < collectionDataBlock.length; i++) {
        if (collectionDataBlock[i].type == "question") {
          if (collectionDataBlock[i].question_type == "error") {
            valid = false;
            arr_about_error[0] = "no correct answers";
            arr_about_error[1] = i;
            break;
          }
        }
      }
    }
    // Проверка, чтобы не были все ответы правильными в вопросе
    if (valid) {
      for (let i = 0; i < collectionDataBlock.length; i++) {
        if (collectionDataBlock[i].type == "question") {
          let currentValid = false;
          for (
            let j = 0;
            j < collectionDataBlock[i].answer_options.length;
            j++
          ) {
            if (collectionDataBlock[i].answer_options[j].is_correct == false) {
              currentValid = true;
            }
          }
          if (!currentValid) {
            valid = false;
            arr_about_error[0] = "all the answers are correct";
            arr_about_error[1] = i;
            break;
          }
        }
        if (!valid) {
          break;
        }
      }
    }

    if (valid) {
      setActionForm(true);
    } else {
      setVisibleModalValidTest(true);
      if (arr_about_error[0] == "no correct answers") {
        setModalValidTestText(
          `Не выбрано ни одного правильного ответа в ${
            arr_about_error[1] + 1
          } блоке`
        );
      } else if (arr_about_error[0] == "all the answers are correct") {
        setModalValidTestText(
          `Все ответы были выбраны правильными в  ${
            arr_about_error[1] + 1
          } блоке`
        );
      }
      return false;
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
      let clonedObj = structuredClone(collectionDataBlock);
      clonedObj[suppCollection[1]] = suppCollection[0];
      setCollectionDataBlock(clonedObj);
    }
  }, [suppCollection]);

  // Формирование общего объекта для создания теста
  useEffect(() => {
    if (actionForm) {
      let name = document.querySelector("#TestNameInput").value;
      let description = document.querySelector("#testDescription").value;
      let duration_seconds = document.querySelector("#timeForTest").value;
      let required_karma = document.querySelector("#KarmaForTest").value;
      let passing_score = document.querySelector("#MinPointsForTest").value;
      let experience_points = document.querySelector("#KarmaForTest").value;
      let acoin_reward = document.querySelector("#quantityCoins").value;
      let exp_reward = document.querySelector("#quantityEXP").value;

      let unlimited_time = document.querySelector("#checkbox1").checked;
      let show_correct_answers = document.querySelector("#checkbox2").checked;
      let allow_retake = document.querySelector("#checkbox3").checked;
      let send_by_email = document.querySelector("#checkbox4").checked;
      let without_achievement = document.querySelector("#checkbox5").checked;

      let dataForTest = {
        name: name,
        description: description,
        duration_seconds: duration_seconds,
        unlimited_time: unlimited_time,
        show_correct_answers: show_correct_answers,
        allow_retake: allow_retake,
        send_by_email: send_by_email,
        without_achievement: without_achievement,
        theme: valueSelect,
        required_karma: required_karma,
        passing_score: passing_score,
        experience_points: experience_points,
        acoin_reward: acoin_reward,
        exp_reward: exp_reward,
        questions: collectionDataBlock,
      };
      console.log(dataForTest);
    }
  }, [actionForm]);

  // Изменение цвета названия выбранного файла
  function handleChange(event) {
    setFileName(event.target.files[0].name);
    document.getElementById("logoTestColor").style = "color: #000";
  }

  // Создание теории или вопроса
  const onAddBtnClick = (name) => {
    if (name == "form") {
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
            setForRemove={setForRemove}
            collectionDataBlock={collectionDataBlock}
            setCollectionDataBlock={setCollectionDataBlock}
            data={data}
            blockList={blockList}
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
      setBlockList(
        blockList.filter(function (currentValue) {
          return currentValue.props.idMainBlock !== forRemove;
        })
      );
      let idBlock = forRemove.slice(9);
      let clonedObj = structuredClone(collectionDataBlock);
      clonedObj.splice(idBlock, 1);
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
      let count = 3.2;
      setTimeout(() => {
        for (let i = 1; i < selects.length; i++) {
          let final = count + vw;
          selects[i].style.top = final;
          count = count + 3.2;
        }
      }, 1);
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
                    />{" "}
                  </div>

                  <div className={classes.TestNameInputWrapper}>
                    <div className={classes.TestNameInputTitle}>Тема</div>

                    <div
                      className={classes.TestSettingsDivWrapper}
                      ref={ref}
                      onClick={() => setVisibleSelect(!visibleSelect)}
                    >
                      <div className={classes.TestSettingsDivTheme}>
                        <span>{valueSelect}</span>
                        <ExpandMoreIcon
                          color="action"
                          sx={{ fontSize: "1.5vw" }}
                        />
                      </div>
                      {visibleSelect && selectOption}
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
      <ModalValidTest
        visibleModalValidTest={visibleModalValidTest}
        setVisibleModalValidTest={setVisibleModalValidTest}
        setModalValidTestText={setModalValidTestText}
        ModalValidTestText={ModalValidTestText}
      />
    </div>
  );
};

export default CreateTest;

const SelectFromTestSettings = (props) => {
  const {
    text,
    setValueSelect,
    visibleModalAddTheme,
    setVisibleModalAddTheme,
  } = props;
  return (
    <div
      className={classes.TestSettingsDivTheme}
      onClick={() =>
        text == "Создать новую"
          ? setVisibleModalAddTheme(true)
          : setValueSelect(`${text}`)
      }
    >
      <span className={classes.TestSettingsDivText}>{text}</span>
      {text == "Создать новую" && (
        <AddCircleOutlineIcon sx={{ fontSize: "1.5vw" }} />
      )}
    </div>
  );
};
