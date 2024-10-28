import React from "react";
import classes from "../main.module.css";
import History from "./history";
import News from "./news";
import AddCircleIcon from '@mui/icons-material/AddCircle';
const CenterBox = () => {
  return (
    <div>
      <History />
      <h1 className={classes.Lenta}>Лента
        <AddCircleIcon className={classes.addNews} sx={{}}/>
      </h1>
      <News />
    </div>
  );
};

export default CenterBox;
