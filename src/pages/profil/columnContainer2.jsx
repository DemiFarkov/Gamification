import React, { useEffect, useState } from "react";
import classes from "./profil.module.css";
import EditIcon from "@mui/icons-material/Edit";
import ChangeStatusModal from "./changeStatusModal";
import { TextField } from "@mui/material";
import { isMobile } from "../../hooks/react-responsive";
import SurveyModal from "./surveyModal";

const ColumnContainer2 = (props) => {
  const {
    data,
    getData,
    surveyQuestions,
    setDataForSurveyAnswers,
    fullAccess,
  } = props;
  const [visibleSurveyModal, setVisibleSurveyModal] = useState(false);

  const [visibleChangeStatusModal, setVisibleChangeStatusModal] =
    useState(false);
  const isMobileWidth = isMobile();
  const EditIconStyle = {
    position: "absolute",
    right: "10px",
    bottom: "10px",
    fontSize: "15px",
    cursor: "pointer",
    opacity: "0",
    transition: "all .2s",
  };
  if (data.profile) {return (
    <>
      <div className={classes.status} mainblockdiv="true">
        <TextField
          multiline
          InputProps={{
            readOnly: true,
            value: `${data.profile.status}`,
          }}
          sx={{
            width: "100%",
            height: "100%",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "1vw",
              padding: "1vw",
            },
            "& textArea": isMobileWidth
              ? {
                  fontSize: "35px",
                  lineHeight: "40px",
                }
              : { fontSize: "16px" },
            "& .MuiOutlinedInput-root": { color: "#fff" },
            "& .MuiFormHelperText-root": { color: "#fff" },
          }}
        />
        {fullAccess && (
          <EditIcon
            sx={EditIconStyle}
            onClick={() => {
              setVisibleChangeStatusModal(true);
            }}
          />
        )}
      </div>
      <div className={classes.box5} mainblock="true">
        {" "}
        <span className={classes.fieldsetLabel}>Анкета</span>
        <fieldset className={classes.fieldset}>
          {" "}
          <legend className={classes.legend}>Анкета</legend>
          <span className={classes.fieldsetBackground}></span>
        </fieldset>{" "}
        <div className={classes.box5TextWrapper}>
          {data.answers.map((el, i) => (
            <div key={i} className={classes.surveyAnswers}>
              {" "}
              <span>{el.question_text}</span>
              <TextField
                multiline
                fullWidth
                value={el.answer_text}
                inputProps={{ readOnly: true }}
                sx={{
                  margin: "0",
                  border: "none",
                  "& .MuiOutlinedInput-root": {
                    padding: "0",
                    color: "#fff",
                    "& > fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
            </div>
          ))}
        </div>
        <div className={classes.openMoreSurveyWrapper}>
          {" "}
          <div
            className={classes.openMoreSurveyBtn}
            onClick={() => {
              setVisibleSurveyModal(true);
            }}
          >
            <span>Показать больше</span>{" "}
          </div>
        </div>
      </div>

      
      <SurveyModal
        setVisibleSurveyModal={setVisibleSurveyModal}
        visibleSurveyModal={visibleSurveyModal}
        setDataForSurveyAnswers={setDataForSurveyAnswers}
        surveyQuestions={surveyQuestions}
        survey_answers={data.answers}
        fullAccess={fullAccess}
        getData={getData}
      />
      <ChangeStatusModal
        visibleChangeStatusModal={visibleChangeStatusModal}
        setVisibleChangeStatusModal={setVisibleChangeStatusModal}
        data={data.profile.status}
        id={data.profile.id}
        getData={getData}
      />
    </>
  );}

  
};

export default ColumnContainer2;
