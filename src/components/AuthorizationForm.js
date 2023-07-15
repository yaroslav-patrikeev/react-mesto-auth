import "./styles/AuthorizationForm.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import ApiAuth from "../utils/api-auth";
import { useForm } from "../hooks/useForm";

export default function AuthorizationForm({
  title,
  buttonText,
  returnLink,
  type,
  setOnSubmit,
  setLoggedIn,
  setToken,
}) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (type === "registration") {
      ApiAuth.registration({ values, setOnSubmit })
        .then(() => {
          navigate("/sign-in");
        })
        .catch((err) => {
          console.log(err);
          setOnSubmit("fail");
        });
    } else {
      ApiAuth.authorization(values)
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
        onChange={handleChange}
        value={values["email"]}
      ></input>
      <input
        name="password"
        type="text"
        className="authorization-form__input"
        placeholder="Пароль"
        onChange={handleChange}
        value={values["password"]}
      ></input>
      <button type="submit" className="authorization-form__button button-hover">
        {buttonText}
      </button>
      {returnLink}
    </form>
  );
}
