import React, { useState } from "react";
import classes from "./profil.module.css";
import WindowModal from "./WindowModal";

const ColumnContainer2 = () => {
  const [openMore, setOpenMore] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <div className={classes.columnContainer2}>
      <div className={classes.box5}>
        {" "}
        <h2 className={classes.titile}>Анкета</h2>
      </div>
      <div className={classes.box6}>
        <div
          className={classes.box6Wrapper}
          onClick={() => setVisible(true)}
          onMouseOver={() => setOpenMore(true)}
          onMouseOut={() => setOpenMore(false)}
        >
          <h2 className={classes.titile}>Статистика</h2>
          <div
            className={
              openMore ? classes.box6ShowMore : classes.box6ShowMoreHidden
            }
          >
            Показать больше
          </div>
        </div>
      </div>
      <WindowModal
        visible={visible}
        changeVisible={setVisible}
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor nesciunt, laboriosam ab ullam consectetur maxime similique. Dolorem rerum sunt itaque fugit ad, repellendus ratione explicabo commodi doloribus, minima asperiores et!"
      />
    </div>
  );
};

export default ColumnContainer2;
