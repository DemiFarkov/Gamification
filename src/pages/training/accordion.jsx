import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import classes from "./traning.module.css";

const AccordionTraning = (props) => {
  const { AccordionSummaryy } = props;
  return (
    <div className={classes.AccordionContainer}>
      <Accordion style={{ background: "#202833", boxShadow: "none" }}>
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          style={{ background: "#202833", boxShadow: "none" }}
        >
          <div className={classes.AccordionTitle}>{AccordionSummaryy}</div>
        </AccordionSummary>
        <AccordionDetails>
          <table className={classes.AccordionTable} cellspacing="0">
            <thead>
              <tr className={classes.AccordionTR}>
                <th>
                  <strong>Наименование теста</strong>{" "}
                </th>
                <th>
                  <strong>Требования</strong>
                </th>
                <th>
                  <strong>Статус</strong>
                </th>
                <th>
                  <strong>Достижение</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <RowTable
                nameTest={"Права ADRS"}
                carmaValue={100}
                expValue={700}
              />
              <RowTable
                nameTest={"Права 1C"}
                carmaValue={100}
                expValue={800}
              />
            </tbody>
          </table>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionTraning;

const RowTable = (props) => {
  const { nameTest, carmaValue, expValue } = props;
  return (
    <tr className={classes.AccordionTR}>
      <th>{nameTest}</th>
      <th>
        <span>Карма</span> {">"} {carmaValue}
        <span> Опыт</span> {">"} {expValue}
      </th>
      <th></th>
      <th>
        тут иконки {">"}_{"<"}
      </th>
    </tr>
  );
};
