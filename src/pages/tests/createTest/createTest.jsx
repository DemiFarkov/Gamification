import React, { useEffect, useRef, useState } from "react";
import TestQue from "./testQue";
import TestForm from "./testForm";
import Header from "../../../components/general/header";
import classes from "./test.module.css";
import Navigation from "../../../components/general/navigation";
import TestSettings from "./testSettings";
import MainCheckbox from "./mainCheckbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useClickOutside } from "../../../hooks/useClickOutside";
import ModuleAddTheme from "./moduleAddTheme";
import ModalValidTest from "./modalValidTest";
import { instance } from "../../../utils/axios/index.js";
import ArrowUp from "../../../img/up-arrow.svg";
import { useSearchParams } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";

const CreateTest = (props) => {
  var count = 0;
  const [upOrDown, setUpOrDown] = useState([]);
  const [countForBlocks, setCountForBlocks] = useState(0);
  const [fileName, setFileName] = useState("Файл не выбран");
  const [forRemove, setForRemove] = useState();
  const [errorSelect, setErrorSelect] = useState(false);

  const [valueSelect, setValueSelect] = useState("Не выбрано");
  const [visibleModalAddTheme, setVisibleModalAddTheme] = useState(false);
  const [visibleModalValidTest, setVisibleModalValidTest] = useState(false);
  const [ModalValidTestText, setModalValidTestText] = useState(["", false]);
  const [collectionDataBlock, setCollectionDataBlock] = useState([]);
  const [suppCollection, setSuppCollection] = useState([]);
  const [actionForm, setActionForm] = useState();
  const [inputTime, setInputTime] = useState(true);
  const [inputAttemptTwice, setInputAttemptTwice] = useState(false);
  const [valueAchievementSelect, setValueAchievementSelect] = useState(["", 0]);
  const [visibleAchievementSelect, setVisibleAchievementSelect] =
    useState(false);
  const [selectOption, setSelectOption] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [changeQuery, setChangeQuery] = useState(false);
  const [countClickReset, setCountClickReset] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const componentQue = (
    <TestQue
      key={countForBlocks}
      setUpOrDown={setUpOrDown}
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
      changeMinPointsForTest={changeMinPointsForTest}
    />
  );
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 1000) {
      setVisible(true);
    } else if (scrolled <= 1000) {
      setVisible(false);
    }
  };
  window.addEventListener("scroll", toggleVisible);
  const scrollToTop = () => {
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };
  function fillingInTheData(oldData, fromQuary) {
    if (!fromQuary) {
      console.log(oldData);
      oldData = {
        blocks: oldData.blocks,
        test: {
          achievement: oldData.achievement,

          acoin_reward: oldData.acoin_reward,

          can_attempt_twice: oldData.can_attempt_twice,

          description: oldData.description,

          duration_seconds: oldData.duration_seconds,

          experience_points: oldData.experience_points,

          max_score: oldData.max_score,

          min_experience: oldData.min_experience,

          name: oldData.name,

          passing_score: oldData.passing_score,

          required_karma: oldData.required_karma,

          retry_delay_days: oldData.retry_delay_days,

          send_results_to_email: oldData.send_results_to_email,

          show_correct_answers: oldData.show_correct_answers,

          theme: oldData.theme,

          unlimited_time: oldData.unlimited_time,

          without_achievement: oldData.without_achievement,
        },
      };
    } else {
      setChangeQuery(true);
      document.querySelector(
        "#titleTestsCreator"
      ).innerHTML = `Изменение теста \"${oldData.test.name}\"`;
      document.querySelector(
        "#btnContainerBtnForm"
      ).innerHTML = `Сохранить изменения`;
    }
    console.log(oldData);
    if (oldData.test.unlimited_time == true) {
      document.querySelector(`#checkbox1`).checked = true;
    }
    if (oldData.test.show_correct_answers == true) {
      document.querySelector(`#checkbox2`).checked = true;
    }
    if (oldData.test.can_attempt_twice == true) {
      document.querySelector(`#checkbox3`).checked = true;
    }
    if (oldData.test.send_results_to_email == true) {
      document.querySelector(`#checkbox4`).checked = true;
    }

    document.querySelector(`#TestNameInput`).value = oldData.test.name;
    selectOption.map(
      (el) => el.id == oldData.test.theme && setValueSelect(el.id)
    );
    // setValueSelect([data[index].name, data[index].id])

    if (oldData.test.unlimited_time == false) {
      document.querySelector(`#timeForTest`).value =
        oldData.test.duration_seconds;
    } else {
      setInputTime(false);
    }
    if (oldData.test.can_attempt_twice == true) {
      (document.querySelector(`#dayForTest`).value =
        oldData.test.retry_delay_days),
        setInputAttemptTwice(false);
    }

    document.querySelector(`#EXPForTest`).value = oldData.test.min_experience;
    document.querySelector(`#KarmaForTest`).value = oldData.test.required_karma;
    document.querySelector(`#dayForTest`).value = oldData.test.retry_delay_days;
    document.querySelector(`#MinPointsForTest`).value =
      oldData.test.passing_score;
    // document.querySelector(`#ДОСТИЖЕНИЕ`).value = oldData.test.name
    document.querySelector(`#quantityCoins`).value = oldData.test.acoin_reward;
    document.querySelector(`#quantityEXP`).value =
      oldData.test.experience_points;
    document.querySelector(`#testDescription`).value = oldData.test.description;

    selectOption.map((option) => option);
    oldData.blocks.map(
      (el, index) => (
        addInMainData(el, "oldDataMainBlock" + index),
        setBlockList((prevBlockList) =>
          prevBlockList.concat(
            el.type == "theory" ? (
              <TestForm
                key={index + "oldData"}
                countForBlocks={index}
                idfile={"oldDataFormFile" + index}
                idMainBlock={"oldDataMainBlock" + index}
                idTitle={"oldDataTitleForm" + index}
                idText={"oldDataTitleText" + index}
                data={data}
                blockList={blockList}
                setForRemove={setForRemove}
                content={el.content}
                setSuppCollection={setSuppCollection}
                setUpOrDown={setUpOrDown}
              />
            ) : (
              <TestQue
                key={index + "oldData"}
                countForBlocks={index}
                idText={"idText" + index}
                idTime={"idTime" + index}
                idExplanation={"idExplanation" + index}
                idValuePoins={"idValuePoins" + index}
                idfile={"testFile" + index}
                idfileColor={"fileTestColor" + index}
                idPlus={"plusAnswer" + index}
                idPlusRemove={"removeForm" + index}
                idCheckBoxTime={"dlsTime" + index}
                idCheckBoxCustom={"custom" + index}
                idCheckBoxAbout={"about" + index}
                idMainBlock={"mainBlock" + index}
                idcreateTheory={"createTheory" + index}
                setForRemove={setForRemove}
                collectionDataBlock={collectionDataBlock}
                setCollectionDataBlock={setCollectionDataBlock}
                data={data}
                setVisibleModalValidTest={setVisibleModalValidTest}
                setModalValidTestText={setModalValidTestText}
                changeMinPointsForTest={changeMinPointsForTest}
                content={el.content}
                setSuppCollection={setSuppCollection}
                setUpOrDown={setUpOrDown}
              />
            )
          )
        )
      )
    );
    setCollectionDataBlock(oldData.blocks);
    setCountForBlocks(oldData.blocks.length);
  }
  useEffect(() => {
    if (selectOption.length !== 0) {
      let oldData = null;
      const idTest = searchParams.get("id");
      if (idTest) {
        const oldDataAxios = instance
          .get(`api/test/${idTest}/`)
          .then(function (response) {
            fillingInTheData(response.data, true);
          })
          .catch((err) => err);
        console.log(oldData);
        // oldData = oldDataAxios.response.data
      } else if (localStorage.getItem("key") !== null) {
        oldData = JSON.parse(localStorage.getItem("key"));
        fillingInTheData(oldData, false);
      }
    }
  }, [selectOption]);
  // Получаем имеющиеся темы для теста
  function refreshThemes(nameNewTheme) {
    document.querySelector("#checkbox3").checked = true;
    const themes_with_tests = instance.get("themes/").then((response) => {
      let data = [
        { id: 0, setValueSelect: setValueSelect, name: "Создать новую" },
      ];
      let index = 0;
      data = data.concat(response.data);
      setSelectOption(data);
      if (nameNewTheme) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].name == nameNewTheme) {
            index = i;
          }
        }
        setValueSelect([data[index].name, data[index].id]);
      }
    });
  }
  useEffect(() => {
    refreshThemes();
  }, []);
  // Закрытие select при нажатии вне его
  const refBtn = useRef(null);
  useClickOutside(refBtn, () => {
    setCountClickReset(0);
  });
  // Блокировка поля указания времени для теста при необходимости
  useEffect(() => {
    let inputTimeCheck = document.querySelector("#timeForTest");
    inputTime
      ? ((inputTimeCheck.disabled = false),
        (inputTimeCheck.placeholder = "Введите время на прохождение теста..."),
        (inputTimeCheck.type = "number"),
        localStorage.getItem("key") == null && (inputTimeCheck.value = ""))
      : ((inputTimeCheck.disabled = true),
        (inputTimeCheck.type = "text"),
        (inputTimeCheck.value = ""),
        (inputTimeCheck.placeholder = "Время на тест не ограниченно"));
  }, [inputTime]);

  // Блокировка поля указания дней на прохождение теста при необходимости
  useEffect(() => {
    let inputAttemptTwiceCheck = document.querySelector("#dayForTest");
    inputAttemptTwice
      ? ((inputAttemptTwiceCheck.disabled = true),
        (inputAttemptTwiceCheck.placeholder = "Прохождение доступно один раз"),
        (inputAttemptTwiceCheck.type = "text"),
        (inputAttemptTwiceCheck.value = ""))
      : ((inputAttemptTwiceCheck.disabled = false),
        (inputAttemptTwiceCheck.type = "number"),
        (inputAttemptTwiceCheck.placeholder = "Введите кол-во дней..."));
  }, [inputAttemptTwice]);

  useEffect(() => {}, []);
  // Сигнал об отправке формы
  const CreateThisTest = async (e) => {
    e.preventDefault();

    let valid = true;
    let arr_about_error = [];
    // Проверка, чтобы была выбрана тема
    if (valid) {
      if (valueSelect == "Не выбрано") {
        valid = false;
        setErrorSelect(true);

        setVisibleModalValidTest(true);
        let text = `Не выбрана тема теста`;
        setModalValidTestText([text, false]);
      } else {
        setErrorSelect(false);
      }
    }
    // Проверка, чтобы хотя бы 1 ответ в вопросе был выбран правильны
    if (valid) {
      for (let i = 0; i < collectionDataBlock.length; i++) {
        if (collectionDataBlock[i].type == "question") {
          console.log(collectionDataBlock[i].content.question_type);
          if (collectionDataBlock[i].content.question_type == "text") {
            valid = true;
            continue;
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
    if (valid) {
      for (let i = 0; i < collectionDataBlock.length; i++) {
        if (collectionDataBlock[i].type == "theory") {
          if (
            collectionDataBlock[i].content.text == "" ||
            collectionDataBlock[i].content.title == ""
          ) {
            console.log(collectionDataBlock);
            valid = false;
            setVisibleModalValidTest(true);
            let text = `Не все поля заполнены в ${i + 1} блоке`;
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
        "!!!Перед созданем рекомендуется сохранить тест!!!  Вы действительно хотите создать этот тест? ",
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
  function addInMainData(data, id) {
    let p = 0;
    for (let i = 0; i < blockList.length; i++) {
      if (blockList[i].props.idMainBlock == id) {
        p = i;
        break;
      }
    }
    let clonedObj = structuredClone(collectionDataBlock);
    clonedObj[p] = data;
    setCollectionDataBlock(clonedObj);
  }

  useEffect(() => {
    if (suppCollection[0] !== undefined) {
      addInMainData(suppCollection[0], suppCollection[1]);
    }
  }, [suppCollection]);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });
  }
  function objectFormation() {
    

    // collectionDataBlock.forEach((el, index) => {
    //   el.content.image = getBase64(el.content.image);
    // });
    let name = document.querySelector("#TestNameInput").value;
    let description = document.querySelector("#testDescription").value;
    let valueAchievementSelect = document.querySelector(
      "#valueAchievementSelect"
    ).value;
    let duration_seconds = inputTime
      ? Number(document.querySelector("#timeForTest").value)
      : 1;
    let retry_delay_days = !inputAttemptTwice
      ? Number(document.querySelector("#dayForTest").value)
      : null;
    let required_karma = Number(document.querySelector("#KarmaForTest").value);
    let passing_score = Number(
      document.querySelector("#MinPointsForTest").value
    );
    let min_experience = Number(document.querySelector("#EXPForTest").value);
    let acoin_reward = Number(document.querySelector("#quantityCoins").value);
    let experience_points = Number(
      document.querySelector("#quantityEXP").value
    );

    let unlimited_time = document.querySelector("#checkbox1").checked;
    let show_correct_answers = document.querySelector("#checkbox2").checked;
    let can_attempt_twice = document.querySelector("#checkbox3").checked;
    let send_results_to_email = document.querySelector("#checkbox4").checked;
    let value = 0;
    document
      .querySelectorAll(`.divEnterPoints`)
      .forEach(
        (el) =>
          !isNaN(el.children[2].value) &&
          (value = value + Number(el.children[2].value))
      );
    let without_achievement =
      valueAchievementSelect !== "Без достижения" ? false : true;
    let max_score = Number(value);
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("passing_score", passing_score);
    // formData.append("duration_seconds", duration_seconds);
    // formData.append("unlimited_time", unlimited_time);
    // formData.append("show_correct_answers", show_correct_answers);
    // formData.append("theme", valueSelect);
    // formData.append("required_karma", required_karma);
    // formData.append("experience_points", experience_points);
    // formData.append("acoin_reward", acoin_reward);
    // formData.append("min_experience", min_experience);
    // formData.append("can_attempt_twice", can_attempt_twice);
    // formData.append("send_results_to_email", send_results_to_email);
    // formData.append("achievement", 3);
    // formData.append("retry_delay_days", retry_delay_days);
    // formData.append("without_achievement", without_achievement);
    // formData.append("blocks", collectionDataBlock);
    // formData.append("max_score", max_score);

    let dataForTest = {
      name: name,
      description: description,
      passing_score: passing_score,
      duration_seconds: duration_seconds,
      unlimited_time: unlimited_time,
      show_correct_answers: show_correct_answers,
      theme: valueSelect,
      required_karma: required_karma,
      experience_points: experience_points,
      acoin_reward: acoin_reward,
      min_experience: min_experience,
      can_attempt_twice: can_attempt_twice,
      send_results_to_email: send_results_to_email,
      achievement: 3,
      retry_delay_days: retry_delay_days,
      without_achievement:
        valueAchievementSelect !== "Без достижения" ? false : true,
      blocks: collectionDataBlock,
      max_score: max_score,
    };
    console.log(dataForTest);
    return dataForTest;
  }

  // Формирование общего объекта для создания теста
  useEffect(() => {
    if (actionForm) {
      createTest(objectFormation());
    }
  }, [actionForm]);
  const createTest = async (dataForTest) => {
    console.log(dataForTest);
    const idTest = searchParams.get("id");
    changeQuery
      ? await instance
          .put(`update_test_and_content/${idTest}/`, dataForTest)
          .then(function (response) {
            setVisibleModalValidTest(true);
            setModalValidTestText([
              "Тест успешно изменен",
              false,
              "successfulСreation",
            ]);
          })
          .catch(function (response) {
            console.log(response);
            setVisibleModalValidTest(true);
            setActionForm(false);
            setModalValidTestText([
              "Что-то пошло не так... Тест не создан",
              false,
              "",
            ]);
          })
      : await instance
          .post("create_test/", dataForTest)
          .then(function (response) {
            setVisibleModalValidTest(true);
            setModalValidTestText([
              "Тест успешно создан",
              false,
              "successfulСreation",
            ]);
          })
          .catch(function (response) {
            console.log(response);
            setVisibleModalValidTest(true);
            setActionForm(false);
            setModalValidTestText([
              "Что-то пошло не так... Тест не создан",
              false,
              "",
            ]);
          });
  };
  // Изменение цвета названия выбранного файла
  function handleChange(event) {
    setFileName(event.target.files[0].name);
    document.getElementById("logoTestColor").style = "color: #000";
  }
  // Поиск фактического индекса блока
  function findeIndex(clonedObj, count, direction) {
    let res = direction == "up" ? undefined : 0;
    let i = 1;
    while (i < clonedObj.length && !res) {
      if (clonedObj[i].props.countForBlocks == count) {
        res = i;
      }
      i++;
    }
    return res;
  }
  // Измненения блоков на странице и в объекте для отправки в бд
  function changeArrUp(el, currentIndexBlock) {
    el.splice(currentIndexBlock - 1, 0, el[currentIndexBlock]);
    el.splice(currentIndexBlock + 1, 1);
  }
  function changeArrDown(el, currentIndexBlock) {
    el.splice(currentIndexBlock + 2, 0, el[currentIndexBlock]);
    el.splice(currentIndexBlock, 1);
  }
  // Перемещение вопроса вверх/вниз
  useEffect(() => {
    if (upOrDown.length != 0) {
      let direction = upOrDown[0];
      let countForBlockslocal = upOrDown[1];
      let clonedObj = blockList.slice();
      let clonedObj2 = structuredClone(collectionDataBlock);
      console.log(clonedObj2);
      let currentIndexBlock = findeIndex(
        clonedObj,
        countForBlockslocal,
        direction
      );
      if (direction == "up") {
        changeArrUp(clonedObj, currentIndexBlock);
        setBlockList(clonedObj);

        changeArrUp(clonedObj2, currentIndexBlock);
        setCollectionDataBlock(clonedObj2);
      }
      if (direction == "down") {
        changeArrDown(clonedObj, currentIndexBlock);
        setBlockList(clonedObj);

        changeArrDown(clonedObj2, currentIndexBlock);
        setCollectionDataBlock(clonedObj2);
      }
    }
  }, [upOrDown]);
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
            setUpOrDown={setUpOrDown}
          />
        )
      );
    }
    if (name == "test") {
      setBlockList(blockList.concat(componentQue));
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
      if (clonedObj[p].type == "question") {
        changeMinPointsForTest(clonedObj[p].content.points);
      }
      clonedObj.splice(p, 1);
      setCollectionDataBlock(clonedObj);
    }
  }, [forRemove]);
  // Подсчет суммы всех баллов для прохождения теста
  function changeMinPointsForTest(removePoints) {
    let value = 0;
    document
      .querySelectorAll(`.divEnterPoints`)
      .forEach(
        (el) =>
          !isNaN(el.children[2].value) &&
          (value = value + Number(el.children[2].value))
      );
    removePoints && (value = value - removePoints);

    document.querySelector(`#MinPointsForTest`).value = String(value);
  }
  return (
    <div>
      <Header />
      <div className={classes.testContainer}>
        <Navigation />
        <div className={classes.testMainContent}>
          <h1 className={classes.H1} id="titleTestsCreator">
            Конструктор тестов
          </h1>
          <div className={classes.mainContentGrid}>
            <div className={classes.sideCheckbox}>
              <MainCheckbox
                setInputTime={setInputTime}
                setInputAttemptTwice={setInputAttemptTwice}
              />
              <div
                className={classes.saveTestBtn}
                onClick={() =>
                  localStorage.setItem("key", JSON.stringify(objectFormation()))
                }
              >
                Сохранить изменения
              </div>
              <div
                className={classes.saveTestBtn}
                ref={refBtn}
                onClick={() =>
                  countClickReset == 0
                    ? setCountClickReset(1)
                    : (localStorage.removeItem("key"), window.location.reload())
                }
                style={countClickReset == 1 ? { background: "#faea3eca" } : {}}
              >
                {countClickReset == 0
                  ? "Обнулить тест"
                  : "Нажмите для подтверждения"}
              </div>
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
                    <Select
                      id="valueAchievementSelect"
                      value={valueSelect}
                      onChange={(event) => {
                        setValueSelect(event.target.value);
                        setErrorSelect(false);
                      }}
                      error={errorSelect}
                      sx={{
                        borderRadius: "3vw",
                        lineHeight: "normal",
                        "& .MuiSelect-outlined": {
                          padding: ".7vw",
                          fontSize: "1.2vw",
                          background: "#D9D9D9",
                          borderRadius: "3vw",
                          color: "#000",
                          outline: "none",
                          textAlign: "start",
                          display: "flex",
                          alignItems: "center",
                          minHeight: "1em !important",
                        },
                        "& fieldset": {
                          padding: ".7vw",
                          fontSize: ".95vw",
                          borderRadius: "3vw",
                          border: "none",
                          outline: "none",
                        },

                        "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input:focus":
                          {
                            borderRadius: "3vw",
                            outline: "none",
                          },
                        "& .Mui-error": {
                          border: "#d42929 .15vw solid",
                          color: "#d42929",
                        },
                      }}
                    >
                      <MenuItem value={"Не выбрано"}>Не выбрано </MenuItem>
                      {selectOption.map((el, index) => (
                        <MenuItem key={index} value={el.id}>
                          {el.name}
                        </MenuItem>
                      ))}
                    </Select>
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
                    accept="image/jpeg,image/png"
                  />
                </div>
              </div>
              <div className={classes.TestSettingsBlock}>
                <TestSettings
                  setValueAchievementSelect={setValueAchievementSelect}
                  valueAchievementSelect={valueAchievementSelect}
                  visibleAchievementSelect={visibleAchievementSelect}
                  setVisibleAchievementSelect={setVisibleAchievementSelect}
                />
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

                <button
                  className={classes.btnContainerBtnForm}
                  id="btnContainerBtnForm"
                  style={{ fontWeight: "400" }}
                >
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
      {visible && (
        <img
          src={ArrowUp}
          alt=""
          className={classes.BTNscrollToTop}
          onClick={() => {
            scrollToTop();
          }}
        />
      )}
      <ModuleAddTheme
        visibleModalAddTheme={visibleModalAddTheme}
        setVisibleModalAddTheme={setVisibleModalAddTheme}
        selectOption={selectOption}
        setSelectOption={setSelectOption}
        refreshThemes={refreshThemes}
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
