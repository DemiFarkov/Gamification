import classes from "./autorization_form.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AutorizationForm() {
  const [visible, setVisible] = useState(false);
  return (
    <div className={classes.mainContainer}>
      <section className={classes.formContainer}>
        <form action="" className={classes.form_container}>
          <input type="text" className={classes.formInput} />
          <input type="password" className={classes.formInput} />
          <Link to="./pages/profil" className={classes.button}>
            Войти
          </Link>
          {/* <button className={classes.button}>Войти</button> */}
        </form>
      </section>      
    </div>
  );
}
