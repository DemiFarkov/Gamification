import classes from "./autorization_form.module.css";
import { useState } from "react";
import { instance } from "./utils/axios";
import LoginForm from "./components/general/loginForm";
import RegistForm from "./components/general/registForm";
import { useDispatch } from "react-redux";
import { login } from "./toolkitRedux/toolkitSlice";
import { useAuth } from "./hooks/reduxHooks";
import { Navigate, useNavigate } from "react-router-dom";
import PrivateRoute from "./components/general/PrivateRoute";

export default function AutorizationForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        const user = await instance.post("api/login/", {
          username,
          password,
        });
        dispatch(login(user.data));
        navigate("pages/profil");
      } catch (e) {
        return e;
      }
    }
  
  return (
    <div className={classes.mainContainer}>
      <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={(e) => handleSubmit(e)}
      />
    </div>
  );
}
