import React from "react";
import classes from "../main.module.css";
import Img from "../../img/img_main/obnovlenie-los-santos-drug-wars-the-last-dose.jpg"

const NewsContent = () => {
  return (
    <div className={classes.newsContentBox}>
      <h2 className={classes.newsContentH2}>Title</h2>
      <img src={Img} alt="" className={classes.newsContentImg}/>
      <span className={classes.newsContentSpan}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus dolore
        neque recusandae quis possimus iusto, dolores perspiciatis accusamus
        facere architecto nesciunt libero enim inventore quo unde voluptatum
        minima obcaecati itaque! Quam quas illum, delectus minus expedita
        aspernatur possimus? Soluta obcaecati et natus est unde distinctio ullam
        eum repellendus adipisci? Doloribus, sit vero. Ratione culpa ut vel
        illum vitae numquam obcaecati? Inventore ratione, reprehenderit saepe
        maxime quasi pariatur, harum nam minus aperiam at nihil sint, facere
        sunt possimus repellendus quidem laboriosam culpa rerum temporibus
        maiores soluta dignissimos vitae facilis itaque. Voluptates!
      </span>
    </div>
  );
};

export default NewsContent;
