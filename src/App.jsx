import { useState } from "react";
import "./reset.css";
import "./App.css";
// import AutorizationForm from "./components/authorization_form/autorization_form";
// import classes from "./components/autorization_form/autorization_form.module.css";
import {  Routes, Route } from "react-router-dom";

import Not from "./not";
import Profil from "./pages/profil/profil";
import AutorizationForm from "./autorization_form";
import Main from "./pages/main/main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section className="formContainer">
        <Routes>
          <Route path="/" element={<AutorizationForm />} />
          <Route path="pages/profil" element={<Profil />} />
          <Route path="pages/main" element={<Main />} />
          <Route path="*" element={<Not />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
