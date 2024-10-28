import React from "react";
import classes from "./moderationAvation.module.css";
import AvationBlock from "./avationBlock";
import { Skeleton } from "@mui/material";

const ComplimentData = (props) => {
  const { mainData } = props;
  return (
    <div>
      <h3 className={classes.H3}>Комплименты</h3>

      {mainData.map(
        (el, index) =>
          el.type == "Похвала" && (
            <AvationBlock
              key={index}
              type={"compliment"}
              data={el}
              idInput={"idInput" + index}
              idblock={"idblockCompliment" + index}
            />
          )
      )}
    </div>
  );
};

export default ComplimentData;
