import React, { useEffect, useState } from "react";
import classes from "./creatingAchievements.module.css";
import Header from "../../../components/general/header";
import Navigation from "../../../components/general/navigation";
import Column1 from "./column1";
import Column2 from "./column2";
import Column3 from "./column3";
import { instance } from "../../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  typeAchData,
  newTypeMainData,
  newTypeStyleData,
} from "../../../toolkitRedux/toolkitSlice";
import { getGroupsAuth } from "../../../hooks/reduxHooks";
import Not from "../../404Page/not";
const CreatingAchievements = () => {
  const group = getGroupsAuth();

  const [collectBackgrounds, setCollectBackgrounds] = useState([]);
  const [collectNonBackgrounds, setCollectNonBackgrounds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [oldAchievements, setOldAchievements] = useState();
  const [valueOldAchievements, setValueOldAchievements] = useState(0);

  const [typeAchievements, setTypeAchievements] = useState(0);
  const [urlAvaPhoto, setUrlAvaPhoto] = useState({});
  const [urlItemPhoto, setUrlItemPhoto] = useState("");

  const [achData, setAchData] = useState();
  const [fileBackground, setFileBackground] = useState();
  const [fileImage, setFileImage] = useState();

  const newTypeStyleDataSelector = useSelector(
    (state) => state.auth.newTypeStyleData
  );
  const [backUrl, setBackUrl] = useState();
  const [frontUrl, setFrontUrl] = useState();
  const [nameAchievements, setNameAchievements] = useState("");

  const dispatch = useDispatch();
  const MainDataSelector = useSelector((state) => state.auth.newTypeMainData);

  function dataValidation() {
    // if
  }
  function collectDataRequest() {
    const formData = new FormData();
    let styleCard = {
      border_color: newTypeStyleDataSelector.border_color,
      border_style: newTypeStyleDataSelector.border_style,
      border_width: newTypeStyleDataSelector.border_width,
      textColor: newTypeStyleDataSelector.textColor,
      use_border: newTypeStyleDataSelector.use_border,
    };
    console.log(styleCard);
    let typeAchContent = MainDataSelector.is_award
      ? {}
      : {
          difficulty: "Medium",
          request_type: null,
          required_count: 10,
          type_specific_data: {
            additional_field_1: "value1",
            additional_field_2: "value2",
          },
        };
    let dataRq = {
      image: "http://shaman.pythonanywhere.com/media/achievements/default.jpg",
      background_image:
        "http://shaman.pythonanywhere.com/media/achievement_backgrounds/bg.jpg",
    };
    !MainDataSelector.is_award &&
      formData.append("typeAchContent", JSON.stringify(typeAchContent));
    formData.append("styleCard", JSON.stringify(styleCard));
    formData.append("name", MainDataSelector.name);
    MainDataSelector.description && formData.append("description", MainDataSelector.description);
    !MainDataSelector.is_award && formData.append("type", typeAchievements);
    formData.append("reward_experience", MainDataSelector.reward_experience);
    formData.append("reward_currency", MainDataSelector.reward_currency);
    formData.append("show_name", MainDataSelector.show_name);
    formData.append("is_award", MainDataSelector.is_award);
    formData.append("is_double", MainDataSelector.is_double);
    !fileBackground && formData.append("template_background", urlAvaPhoto.id); // ID шаблона, который используется как фон
    !fileImage &&
      urlItemPhoto &&
      formData.append("template_foreground", urlItemPhoto.id); // ID шаблона, который используется как изображение на переднем плане
    fileBackground && formData.append("background_image", fileBackground);
    fileImage && formData.append("foreground_image", fileImage);

    console.log("typeAchContent", typeAchContent);

    for (let [name, value] of formData.entries()) {
      console.log(name, value);
    }
    return formData;
  }
  useEffect(() => {
    group == "Администраторы" && getData();

    return () => {
      // dispatch(newTypeStyleData({})),
      //   dispatch(typeAchData({})),
      //   dispatch(newTypeMainData({}));
    };
  }, []);
  // useEffect(() => {
  //   group == "Администраторы" && console.log(valueOldAchievements);
  //   valueOldAchievements > 0 &&
  //     (setEXPValue(MainDataSelector.reward_experience),
  //     setAcoinValue(MainDataSelector.reward_currency),
  //     (document.querySelector(`#${"addBackSide"}`).checked =
  //       MainDataSelector.is_double),
  //     setNameAchievements(MainDataSelector.name));
  // }, [valueOldAchievements]);

  function getData() {
    instance.get(`achievements/`).then((response) => {
      console.log(response.data);
      setOldAchievements(response.data);
      // dispatch(oldAchievementsData(response.data));
    });
    instance.get(`users/`).then((response) => {
      console.log(response.data);
      setAllUsers(response.data);
      // dispatch(oldAchievementsData(response.data));
    });
    instance.get(`templates/`).then((response) => {
      console.log(response.data);
      setCollectBackgrounds(response.data.backgrounds);
      setCollectNonBackgrounds(response.data.non_backgrounds);
    });
  }
  function sendData() {
    instance
      .post(`achievements/`, collectDataRequest())
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  useEffect(() => {
    if (group == "Администраторы") {
      if (fileBackground) {
        const file = fileBackground;
        const readerBack = new FileReader();
        readerBack.onloadend = () => {
          setBackUrl(readerBack.result);
        };

        readerBack.readAsDataURL(file);
        dispatch(newTypeMainData({ ...MainDataSelector, back_image:undefined }))

      }
      if (fileImage) {
        const file = fileImage;

        const readerBack = new FileReader();
        readerBack.onloadend = () => {
          setFrontUrl(readerBack.result);
        };

        readerBack.readAsDataURL(file);
        dispatch(newTypeMainData({ ...MainDataSelector, back_image:undefined }))
      }
      let ojbMainData = {
        type: typeAchievements,
        urlAvaPhoto: urlAvaPhoto.url,
        urlItemPhoto: urlItemPhoto.url,
        is_double: document.querySelector(`#addBackSide`).checked,
      };
      dispatch(newTypeMainData({ ...MainDataSelector, ...ojbMainData }));
    }
  }, [fileBackground, fileImage, urlItemPhoto, urlAvaPhoto]);
  // Для фото
  useEffect(() => {
    dispatch(
      newTypeMainData({
        ...MainDataSelector,
        background_image: backUrl,
      })
    );
  }, [backUrl]);
  useEffect(() => {
    dispatch(
      newTypeMainData({
        ...MainDataSelector,
        foreground_image: frontUrl,
      })
    );
  }, [frontUrl]);
  return (
    <div>
      {group == "Администраторы" ? (
        <>
          <Header />
          <div className={classes.mainContainer}>
            <Navigation />{" "}
            <div className={classes.mainContent}>
              <h1 className={classes.H1}>Редактор наград/достижений</h1>

              <div className={classes.mainBlock}>
                <Column1
                  valueOldAchievements={valueOldAchievements}
                  setValueOldAchievements={setValueOldAchievements}
                  nameAchievements={nameAchievements}
                  urlAvaPhoto={urlAvaPhoto}
                  urlItemPhoto={urlItemPhoto}
                  achData={achData}
                  oldAchievements={oldAchievements}
                  fileImage={fileImage}
                  fileBackground={fileBackground}
                />
                <Column2
                  typeAchievements={typeAchievements}
                  setTypeAchievements={setTypeAchievements}
                  setUrlAvaPhoto={setUrlAvaPhoto}
                  setUrlItemPhoto={setUrlItemPhoto}
                  setAchData={setAchData}
                  achData={achData}
                  setFileImage={setFileImage}
                  fileImage={fileImage}
                  setFileBackground={setFileBackground}
                  fileBackground={fileBackground}
                  collectBackgrounds={collectBackgrounds}
                  collectNonBackgrounds={collectNonBackgrounds}
                />
                <Column3
                  sendData={sendData}
                  fileBackground={fileBackground}
                  fileImage={fileImage}
                  valueOldAchievements={valueOldAchievements}
                  allUsers={allUsers}
                />
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

export default CreatingAchievements;
