import { NavLink } from "react-router-dom";
import Header from "./Header";
import "./styles/Header.css";
import AuthorizationForm from "./AuthorizationForm";

export default function Login({ setLoggedIn, setToken }) {
  return (
    <>
      <Header
        headerRightElement={
          <NavLink to="/sign-up" className="header__link button-hover">
            Регистрация
          </NavLink>
        }
      />
      <AuthorizationForm
        title={"Вход"}
        buttonText={"Войти"}
        setLoggedIn={setLoggedIn}
        setToken={setToken}
      />
    </>
  );
}
