import { useState } from "react";
import "./reset.css";
import "./App.css";
// import AutorizationForm from "./components/authorization_form/autorization_form";
// import classes from "./components/autorization_form/autorization_form.module.css";
import { Routes, Route } from "react-router-dom";

import Not from "./not";
import Profil from "./pages/profil/profile";
import AutorizationForm from "./autorization_form";
import Main from "./pages/main/main";
import Players from "./pages/players/players";
import Store from "./pages/store/store";
import ChangeUsers from "./pages/adminPadges/changeUsers/changeUsers";
import CreateTest from "./pages/tests/createTest/createTest";
import PrivateRoute from "./components/general/PrivateRoute";
import MainTraning from "./pages/tests/training/main";
import Test from "./pages/tests/training/test";
import Results from "./pages/tests/training/results";
import ModerationTest from "./pages/tests/moderationTest/moderationTest";
import ModerationProcess from "./pages/tests/moderationTest/moderationProcess";
import TestsStatistics from "./pages/tests/testsStatistics/testsStatistics";
import CreatingUser from "./pages/creatingUser/creatingUser";
import Final from "./pages/tests/training/final";

function App() {
  return (
    <>
      <section className="formContainer">
        <Routes>
          <Route path="/" element={<AutorizationForm />} />
          <Route element={<PrivateRoute />}>
            {" "}
            <Route path="pages/main" element={<Main />} />{" "}
            <Route path="pages/profil" element={<Profil />} />
            <Route path="*" element={<Not />} />
            <Route path="pages/players" element={<Players />} />
            <Route path="pages/store" element={<Store />} />
            <Route path="pages/tests/createTest" element={<CreateTest />} />
            <Route path="pages/tests/traning" element={<MainTraning />} />
            <Route path="pages/tests/traning/test" element={<Test />}></Route>
            <Route path="pages/tests/traning/result" element={<Results />}></Route>
            <Route path="pages/tests/traning/final" element={<Final/>} />                   
            <Route path="pages/tests/moderationTest" element={<ModerationTest />} />  
            <Route path="pages/tests/moderationTest/moderationProces" element={<ModerationProcess />} />  
            <Route path="pages/tests/testsStatistics" element={<TestsStatistics/>} />   
            <Route path="pages/creatingUser/creatingUser" element={<CreatingUser/>} />   
        
        
        
     
      

          </Route>
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
