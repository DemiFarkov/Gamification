import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import classes from "./traning.module.css";
import { Link } from "react-router-dom";

const AccordionTraning = (props) => {
  const { AccordionSummaryy, que } = props;
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
          <table className={classes.AccordionTable} cellSpacing="0">
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
              {que.map((que, index) => (
                <RowTable
                  key={index}
                  nameTest={que.name}
                  carmaValue={que.required_karma}
                  expValue={que.min_level}
                />
              ))}
              {/* <RowTable
                nameTest={"Права ADRS"}
                carmaValue={100}
                expValue={700}
              /> */}
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
    <tr>
      <th>
        <Link
          to={{
            pathname: "../pages/traning/test",
            search: "?id=14",
          }}
          className={classes.AccordionLink}
        >
          {nameTest}
        </Link>
      </th>
      <th>
        <span>Карма</span> {">"} {carmaValue}
        <span> Опыт</span> {">"} {expValue}
      </th>
      <th></th>
      <th>тут иконки</th>
    </tr>
  );
};
