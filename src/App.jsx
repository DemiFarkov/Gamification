import { useState } from "react";
import "./reset.css";
import "./App.css";
// import AutorizationForm from "./components/authorization_form/autorization_form";
// import classes from "./components/autorization_form/autorization_form.module.css";
import { Routes, Route } from "react-router-dom";

import Not from "./not";
import Profil from "./pages/profil/profil";
import AutorizationForm from "./autorization_form";
import Main from "./pages/main/main";
import Players from "./pages/players/players";
import Store from "./pages/store/store";
import ChangeUsers from "./pages/adminPadges/changeUsers/changeUsers";
import CreateTest from "./pages/createTest/createTest";

function App() {
  return (
    <>
      <section className="formContainer">
        <Routes>
          <Route path="/" element={<AutorizationForm />} />
          <Route path="*" element={<Not />} />
          <Route path="pages/profil" element={<Profil />} />
          <Route path="pages/main" element={<Main />} />
          <Route path="pages/players" element={<Players />} />
          <Route path="pages/store" element={<Store />} />
          <Route path="pages/createTest" element={<CreateTest />} />
          <Route
            path="pages/adminPages/changeUsers"
            element={<ChangeUsers />}
          />
        </Routes>
      </section>
    </>
  );
}

export default App;
