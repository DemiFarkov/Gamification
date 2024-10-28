import React from "react";
import classes from "../main.module.css";
import NewsContent from "./newsContent";

const News = () => {
  return (
    <div className={classes.newsBox}>
      <NewsContent />
      <NewsContent />
      <NewsContent />
    </div>
  );
};

export default News;
