import Header from "./Header";
import "./styles/Header.css";
import AuthorizationForm from "./AuthorizationForm";
import { NavLink } from "react-router-dom";
import React from "react";

export default function Register({ setOnSubmit }) {
  return (
    <>
      <Header
        headerRightElement={
          <NavLink to="/sign-in" className="header__link">
            Войти
          </NavLink>
        }
      />
      <AuthorizationForm
        type="registration"
        title={"Регистрация"}
        buttonText={"Зарегистрироваться"}
        returnLink={
          <NavLink to="/sign-in" className="authorization-form__return-link">
            Уже зарегистрированы? Войти
          </NavLink>
        }
        setOnSubmit={setOnSubmit}
      />
    </>
  );
}
