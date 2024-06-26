import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import classes from "./moderationTest.module.css";
import React from "react";
import { Link } from "react-router-dom";

const AccordionModeration = (props) => {
  const { test_attempts, theme, indexTheme } = props;
  return (
    <div className={classes.AccordionContainer}>
      <Accordion style={{ background: "#202833", boxShadow: "none" }}>
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          style={{ background: "#202833", boxShadow: "none" }}
        >
          <div className={classes.AccordionTitle}>{theme}</div>
        </AccordionSummary>
        <AccordionDetails>
          <table className={classes.AccordionTable} cellSpacing="0">
            <thead>
              <tr className={classes.AccordionTR}>
                <th className={classes.AccordionThName}>
                  <strong>Сотрудник</strong>{" "}
                </th>
                <th className={classes.AccordionThСonditions}>
                  <strong>Наименование теста</strong>
                </th>
                <th className={classes.AccordionThIcon}>
                  <strong></strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {test_attempts.map((el, index) => (
                <RowTable
                  key={index}
                  id={el.id}
                  test_name={el.test_name}
                  employee_name={el.employee_name}
                  indexTest={index}
                  indexTheme={indexTheme}
                  // test_attempt={test_attempt}
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

export default AccordionModeration;

const RowTable = (props) => {
  const { id, test_name, indexTest, indexTheme,employee_name,test_attempt } = props;

  return (
    <>
      <tr id={"theme" + indexTheme + "row" + indexTest}>
        <th
          className={classes.AccordionThName}
          style={{ position: "relative" }}
        >
         {employee_name}
        </th>
        <th className={classes.AccordionThСonditions}>{test_name}</th>
        <th className={classes.AccordionThIcon}>
          {" "}
          <Link
            to={{
              pathname: "../pages/tests/moderationTest/moderationProces",
              search: `?id=${id}`,
            }}
            className={classes.AccordionLink}
          >
            Модерировать
          </Link>
        </th>
      </tr>
    </>
  );
};
