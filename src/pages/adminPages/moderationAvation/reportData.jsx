import React from "react";
import classes from "./moderationAvation.module.css";
import AvationBlock from "./avationBlock";

const ReportData = (props) => {
  const { mainData } = props;
  return (
    <div>
      <h3 className={classes.H3} style={{ borderBottom: ".1vw #ca2727 solid" }}>
        Жалобы
      </h3>
      {mainData.map(
        (el, index) =>
          el.type == "Жалоба" && (
            <AvationBlock
              key={index}
              type={"report"}
              data={el}
              idInput={"idInput" + index}
              idblock={"idblockReport" + index}

            /> 
          )
      )}
    </div>
  );
};

export default ReportData;
