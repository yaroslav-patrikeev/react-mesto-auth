import "./styles/AuthorizationForm.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import ApiAuth from "../utils/api-auth";

export default function AuthorizationForm({
  title,
  buttonText,
  returnLink,
  type,
  setOnSubmit,
  setLoggedIn,
  setToken,
}) {
  const [registerData, setRegisterData] = React.useState({
    email: "",
    password: "",
  });

  const [authorizationData, setAuthorizationData] = React.useState({
    email: "",
    password: "",
  });

  const apiAuth = new ApiAuth();
  const navigate = useNavigate();

  function handleEdit(e) {
    const { name, value } = e.target;
    type === "registration"
      ? setRegisterData({
          ...registerData,
          [name]: value,
        })
      : setAuthorizationData({
          ...authorizationData,
          [name]: value,
        });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (type === "registration") {
      apiAuth
        .registration({ registerData, setOnSubmit })
        .then(() => {
          navigate("/sign-in");
        })
        .catch((err) => {
          console.log(err);
          setOnSubmit("fail");
        });
    } else {
      apiAuth
        .authorization(authorizationData)
        .then((res) => {
          setLoggedIn(true);
          setToken(res.token);
          navigate("/");
          localStorage.setItem("token", res.token);
        })
        .catch(console.error);
    }
  }

  return (
    <form className="authorization-form" onSubmit={handleSubmit}>
      <h1 className="authorization-form__title">{title}</h1>
      <input
        type="email"
        name="email"
        className="authorization-form__input"
        placeholder="Email"
        onChange={handleEdit}
      ></input>
      <input
        name="password"
        type="text"
        className="authorization-form__input"
        placeholder="Пароль"
        onChange={handleEdit}
      ></input>
      <button type="submit" className="authorization-form__button button-hover">
        {buttonText}
      </button>
      {returnLink}
    </form>
  );
}
