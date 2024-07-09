import classes from "./autorization_form.module.css";
import { useEffect, useState } from "react";
import { instancee } from "./utils/axios/index.js";
import LoginForm from "./components/general/loginForm";
import { useDispatch } from "react-redux";
import { login } from "./toolkitRedux/toolkitSlice";
import { Navigate, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/general/PrivateRoute";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

export default function AutorizationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = instancee
        .post("api/login/", {
          username,
          password,
        })

        .then(function (response) {
          Cookies.set("userToken", response.data.token);
          Cookies.set("acoin", response.data.acoin);
          Cookies.set("experience", response.data.experience);
          Cookies.set("groups", response.data.groups);
          Cookies.set("karma", response.data.karma);
          Cookies.set("employee_id", response.data.employee_id);
          Cookies.set("first_name", response.data.first_name);
          Cookies.set("last_name", response.data.last_name);
          localStorage.setItem("userToken", response.data.token);

          dispatch(login(response.data));

          navigate("pages/tests/traning");
        })
        .catch(function (response) {
          response.response.data.message == "Invalid username or password" &&
            setLoginError(true);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    Cookies.remove("userToken", { path: "" });
    Cookies.remove("acoin", { path: "" });
    Cookies.remove("experience", { path: "" });
    Cookies.remove("groups", { path: "" });
    Cookies.remove("karma", { path: "" });
    Cookies.remove("employee_id", { path: "" });
  }, []);
  return (
    <div className={classes.mainContainer}>
      <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={(e) => handleSubmit(e)}
        loginError={loginError}
      />
    </div>
  );
}
