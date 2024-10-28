import { useState } from "react";
import "./reset.css";
import "./App.css";
// import AutorizationForm from "./components/authorization_form/autorization_form";
// import classes from "./components/autorization_form/autorization_form.module.css";
import { Routes, Route } from "react-router-dom";
import { microProfile, passwordPolicyRegex } from "./toolkitRedux/toolkitSlice";

import Not from "./pages/404Page/not";
import Profil from "./pages/profil/profile";
import AutorizationForm from "./autorization_form";
import MainPage from "./mainPage";
import Players from "./pages/players/players";
import Store from "./pages/store/store";
import ChangeUsers from "./pages/adminPages/changeUsers/changeUsers";
import CreateTest from "./pages/tests/createTest/createTest";
import PrivateRoute from "./components/general/PrivateRoute";
import MainTraning from "./pages/tests/training/main";
import Test from "./pages/tests/training/test";
import Results from "./pages/tests/training/results";
import ModerationTest from "./pages/tests/moderationTest/moderationTest";
import ModerationProcess from "./pages/tests/moderationTest/moderationProcess";
import TestsStatistics from "./pages/tests/testsStatistics/testsStatistics";
import Final from "./pages/tests/training/final";
import ModerationAvation from "./pages/adminPages/moderationAvation/moderationAvation";
import StatisticsSystem from "./pages/adminPages/systemMenu/statisticsSystem";
import CreatingUser from "./pages/adminPages/creatingUser/creatingUser";
import { instance } from "./utils/axios";
import { useDispatch } from "react-redux";

import Cookies from "js-cookie";
import SettingRequests from "./pages/adminPages/systemMenu/settingRequests";
import Chart from "./pages/adminPages/systemMenu/chart";
import Law from "./pages/adminPages/systemMenu/law";
import Tests from "./pages/adminPages/systemMenu/tests";
import Compliments from "./pages/adminPages/systemMenu/compliments";
import Security from "./pages/adminPages/systemMenu/security";
import SettingBD from "./pages/adminPages/systemMenu/settingBD";
import CreatingAchievements from "./pages/adminPages/creatingAchievements/creatingAchievements";
function App() {
  // const [passwordPolicyRegex, setPasswordPolicyRegex] = useState();
  const dispatch = useDispatch();


  function getRegForPass() {
    instance
      .get(`password-policy/get_password_policy_regex/`)
      .then((response) => {
        console.log(response.data)
        // setPasswordPolicyRegex(response.data);
        dispatch(passwordPolicyRegex(response.data));
      });
  }
  function getMicroProfile() {
    instance
      .get(`micro-profile/`)
      .then((response) => {
        dispatch(microProfile(response.data));
      });
  }
  useState(() => {
    if (Cookies.get("userToken")) {
      getRegForPass();
      getMicroProfile()
    }
  }, []);
  return (
    <>
      <section className="formContainer">
        <Routes>
          <Route path="/autorization_form.jsx" element={<AutorizationForm />} />
          <Route element={<PrivateRoute />}>
            <Route path="*" element={<Not />} />
            {/* Общие страницы Общие страницы Общие страницы Общие страницы Общие страницы Общие страницы Общие страницы */}
            <Route path="/" element={<Profil />} />
            <Route path="mainPage" element={<MainPage />} />

            <Route path="pages/profil" element={<Profil />} />
            <Route path="pages/players" element={<Players />} />
            <Route path="pages/store" element={<Store />} />

            {/* Тесты Тесты Тесты Тесты Тесты Тесты Тесты Тесты Тесты Тесты Тесты Тесты Тесты Тесты Тесты Тесты Тесты */}
            <Route path="pages/tests/createTest" element={<CreateTest />} />
            <Route path="pages/tests/traning" element={<MainTraning />} />
            <Route path="pages/tests/traning/test" element={<Test />}></Route>
            <Route
              path="pages/tests/traning/result"
              element={<Results />}
            ></Route>
            <Route path="pages/tests/traning/final" element={<Final />} />
            <Route
              path="pages/tests/moderationTest"
              element={<ModerationTest />}
            />
            <Route
              path="pages/tests/moderationTest/moderationProces"
              element={<ModerationProcess />}
            />
            <Route
              path="pages/tests/testsStatistics"
              element={<TestsStatistics />}
            />
            {/* Системное меню Системное меню Системное меню Системное меню Системное меню Системное меню Системное меню */}
            <Route
              path="pages/adminPages/systemMenu/statisticsSystem"
              element={<StatisticsSystem />}
            />
            <Route
              path="pages/adminPages/systemMenu/settingRequests"
              element={<SettingRequests />}
            />
            <Route
              path="pages/adminPages/systemMenu/chart"
              element={<Chart />}
            />
            <Route path="pages/adminPages/systemMenu/law" element={<Law />} />
            <Route
              path="pages/adminPages/systemMenu/tests"
              element={<Tests />}
            />{" "}
            <Route
              path="pages/adminPages/systemMenu/compliments"
              element={<Compliments />}
            />
            
            <Route
              path="pages/adminPages/systemMenu/security"
              element={<Security />}
            /><Route
            path="pages/adminPages/systemMenu/settingBD"
            element={<SettingBD />}
          />
            {/* Для админа Для админа Для админа Для админа Для админа Для админа Для админа Для админа Для админа Для админа */}
            <Route
              path="pages/creatingUser/creatingUser"
              element={<CreatingUser />}
            />
            <Route
              path="pages/creatingUser/creatingUser"
              element={<CreatingUser />}
            />
            <Route
              path="pages/adminPages/changeUsers"
              element={<ChangeUsers />}
            />
            <Route
              path="pages/adminPages/moderationAvation/moderationAvation"
              element={<ModerationAvation />}
            />
            <Route
              path="pages/adminPages/creatingAchievements/creatingAchievements"
              element={<CreatingAchievements />}
            />
          </Route>
        </Routes>
      </section>
    </>
  );
}

export default App;
